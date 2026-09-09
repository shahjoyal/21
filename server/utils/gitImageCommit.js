import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const REPO_PATH = process.env.GIT_REPO_PATH || process.cwd();
const GIT_BRANCH = process.env.GIT_BRANCH || 'main';
const GIT_AUTO_PUSH = (process.env.GIT_AUTO_PUSH || 'true').toLowerCase() !== 'false';
const GIT_USER_NAME = process.env.GIT_COMMIT_USER_NAME;
const GIT_USER_EMAIL = process.env.GIT_COMMIT_USER_EMAIL;

async function runGit(args) {
  return execFileAsync('git', args, { cwd: REPO_PATH });
}

/**
 * Stages, commits (and optionally pushes) a single uploaded file.
 * `relativeFilePath` must be relative to the repo root, e.g. "public/uploads/foo.jpg".
 *
 * Requires:
 *  - `git` available on PATH in this environment
 *  - GIT_REPO_PATH pointing at a working git checkout (defaults to cwd)
 *  - Git remote + push credentials already configured on the server
 *    (SSH deploy key or a credential helper) — this function does not
 *    handle authentication itself.
 *
 * Returns { committed: boolean, pushed: boolean, message: string }.
 * Never throws — upload should still succeed even if git fails, since the
 * file is already saved to disk and servable immediately either way.
 */
export async function commitImageToGit(relativeFilePath, commitMessage) {
  try {
    // Optional per-commit identity override, useful if the server's global
    // git config has no user.name/user.email set.
    if (GIT_USER_NAME) await runGit(['config', 'user.name', GIT_USER_NAME]);
    if (GIT_USER_EMAIL) await runGit(['config', 'user.email', GIT_USER_EMAIL]);

    await runGit(['add', relativeFilePath]);

    // Nothing to commit (e.g. re-uploading an identical file) isn't an error.
    try {
      await runGit(['commit', '-m', commitMessage]);
    } catch (commitErr) {
      const out = `${commitErr.stdout || ''}${commitErr.stderr || ''}`;
      if (/nothing to commit/i.test(out)) {
        return { committed: false, pushed: false, message: 'No changes to commit.' };
      }
      throw commitErr;
    }

    if (!GIT_AUTO_PUSH) {
      return { committed: true, pushed: false, message: 'Committed locally. Auto-push is disabled (GIT_AUTO_PUSH=false).' };
    }

    await runGit(['push', 'origin', GIT_BRANCH]);
    return { committed: true, pushed: true, message: 'Committed and pushed to the repository.' };
  } catch (err) {
    const detail = err.stderr || err.message || String(err);
    console.error('Git commit/push error:', detail);
    return { committed: false, pushed: false, message: `Git commit/push failed: ${detail}` };
  }
}
