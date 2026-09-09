// Commits an uploaded image straight to your GitHub repo using the REST
// "Contents API" — a plain authenticated HTTPS call, no local git checkout,
// no SSH keys, no git CLI required on the server. This matches:
//   GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH, GITHUB_IMAGE_DIR
//
// GITHUB_TOKEN needs "repo" (or fine-grained "Contents: Read and write")
// permission on GITHUB_OWNER/GITHUB_REPO.

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_IMAGE_DIR = (process.env.GITHUB_IMAGE_DIR || 'public/uploads').replace(/^\/|\/$/g, '');

function isConfigured() {
  return Boolean(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);
}

/**
 * Commits `buffer` to {GITHUB_IMAGE_DIR}/{filename} in your repo on
 * GITHUB_BRANCH. Returns { committed: boolean, pushed: boolean, message }.
 * Never throws — the caller should already have the file servable locally
 * regardless of whether this succeeds.
 */
export async function commitImageToGithub(filename, buffer, commitMessage) {
  if (!isConfigured()) {
    return {
      committed: false,
      pushed: false,
      message: 'GitHub commit skipped: set GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO in your .env to enable this.',
    };
  }

  const repoPath = `${GITHUB_IMAGE_DIR}/${filename}`;
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${repoPath}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // The Contents API needs the current file's `sha` to update an existing
    // file (uploading a same-named file twice). A 404 here just means it's
    // brand new — that's expected and not an error.
    let existingSha;
    const existingRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, { headers });
    if (existingRes.ok) {
      const existingData = await existingRes.json();
      existingSha = existingData.sha;
    } else if (existingRes.status !== 404) {
      const errText = await existingRes.text();
      return { committed: false, pushed: false, message: `GitHub lookup failed: ${existingRes.status} ${errText}` };
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: commitMessage,
        content: buffer.toString('base64'),
        branch: GITHUB_BRANCH,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return { committed: false, pushed: false, message: `GitHub commit failed: ${putRes.status} ${errText}` };
    }

    return {
      committed: true,
      pushed: true,
      message: `Committed to ${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}: ${repoPath}`,
    };
  } catch (err) {
    return { committed: false, pushed: false, message: `GitHub commit error: ${err.message || String(err)}` };
  }
}
