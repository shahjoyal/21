import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { protectAdmin } from '../middleware/auth.js';
import { commitImageToGithub } from '../utils/githubImageCommit.js';

const router = express.Router();

// Files under public/ are served as-is at the site root by Vite, both in
// dev and in the production build — so a file saved to
// "public/uploads/foo.jpg" is reachable at "/uploads/foo.jpg" immediately,
// regardless of whether the GitHub commit below succeeds or how long it takes.
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Memory storage — we need the raw buffer both to write it to disk
// ourselves (with a sanitized filename) and to send its base64 to GitHub.
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

// Admin: upload an image. Saves it to /public/uploads (servable immediately
// on this running server) then commits the same file to your GitHub repo
// via the Contents API, using GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO /
// GITHUB_BRANCH / GITHUB_IMAGE_DIR from your .env.
router.post('/image', protectAdmin, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Upload failed.' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const filename = buildFilename(req.file.originalname);
    const localPath = path.join(UPLOAD_DIR, filename);

    try {
      fs.writeFileSync(localPath, req.file.buffer);
    } catch (writeErr) {
      console.error('Failed to save uploaded image locally:', writeErr);
      return res.status(500).json({ message: 'Could not save image on the server.' });
    }

    const githubResult = await commitImageToGithub(
      filename,
      req.file.buffer,
      `chore: add uploaded image ${filename}`
    );

    res.status(201).json({
      url: `/uploads/${filename}`,
      filename,
      git: githubResult,
    });
  });
});

export default router;
