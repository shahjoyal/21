import express from 'express';
import multer from 'multer';
import path from 'path';
import { protectAdmin } from '../middleware/auth.js';
import { commitImageToGithub, purgeJsdelivrCache } from '../utils/githubImageCommit.js';

const router = express.Router();

// No local disk writes here — this route runs both on a normal persistent
// server (server.ts) AND as a Vercel serverless function (api/index.js),
// and Vercel's filesystem is read-only. Instead, the image is committed
// straight to your public GitHub repo and served back via jsDelivr's CDN,
// which works identically in both environments with zero extra config.
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, WEBP or GIF images are allowed.'));
    }
    cb(null, true);
  },
});

function buildFilename(originalname) {
  const ext = path.extname(originalname).toLowerCase() || '.jpg';
  const safeBase = path
    .basename(originalname, ext)
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .slice(0, 40);
  return `${Date.now()}-${safeBase}${ext}`;
}

// Admin: upload an image. Commits it to your GitHub repo via the Contents
// API (GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO / GITHUB_BRANCH /
// GITHUB_IMAGE_DIR from .env) and returns a jsDelivr CDN URL that serves it
// — requires the repo to be public, since jsDelivr/raw GitHub URLs can't
// carry auth for private repos.
router.post('/image', protectAdmin, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Upload failed.' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const filename = buildFilename(req.file.originalname);

    const githubResult = await commitImageToGithub(
      filename,
      req.file.buffer,
      `chore: add uploaded image ${filename}`
    );

    if (!githubResult.committed) {
      // Without a successful GitHub commit there's nowhere to serve this
      // image from — surface the real reason (bad token, wrong repo, etc.)
      // so it's obvious what to fix in .env.
      return res.status(502).json({ message: githubResult.message });
    }

    // Best-effort: don't block the response on this.
    purgeJsdelivrCache(filename).catch(() => {});

    res.status(201).json({
      url: githubResult.url,
      filename,
      git: githubResult,
    });
  });
});

export default router;
