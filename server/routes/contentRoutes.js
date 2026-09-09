import express from 'express';
import SiteContent from '../models/SiteContent.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

async function getOrCreateDoc() {
  let doc = await SiteContent.findOne({ singletonKey: 'site_content' });
  if (!doc) {
    doc = await SiteContent.create({ singletonKey: 'site_content', values: {} });
  }
  return doc;
}

// Public: every overridden text key, as a flat object. Any key not present
// here simply means the frontend's hardcoded default is used instead.
router.get('/', async (req, res) => {
  try {
    const doc = await getOrCreateDoc();
    res.json(Object.fromEntries(doc.values));
  } catch (err) {
    console.error('Fetch site content error:', err);
    res.status(500).json({ message: 'Could not load site content.' });
  }
});

// Admin: merge-update any number of keys at once.
// Body: { updates: { key1: "new text", key2: "" , ... } }
// An empty string clears the override (falls back to the default again).
router.put('/', protectAdmin, async (req, res) => {
  try {
    const updates = req.body?.updates;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ message: 'Expected a body of { updates: { key: value } }' });
    }

    const doc = await getOrCreateDoc();
    for (const [key, value] of Object.entries(updates)) {
      if (value === '' || value === null || value === undefined) {
        doc.values.delete(key);
      } else {
        doc.values.set(key, String(value));
      }
    }
    doc.markModified('values');
    await doc.save();

    res.json(Object.fromEntries(doc.values));
  } catch (err) {
    console.error('Update site content error:', err);
    res.status(500).json({ message: 'Could not save site content.' });
  }
});

export default router;
