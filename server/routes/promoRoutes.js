import express from 'express';
import PromoCode from '../models/PromoCode.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: customer enters a code at checkout — we just tell them whether
// it's valid and what discount it carries. No auth required, same as
// browsing the cart itself.
router.post('/validate', async (req, res) => {
  try {
    const raw = (req.body?.code || '').trim();
    if (!raw) {
      return res.status(400).json({ message: 'Please enter a promo code.' });
    }

    const promo = await PromoCode.findOne({ code: raw.toUpperCase() });
    if (!promo || !promo.active) {
      return res.status(404).json({ message: 'Invalid or expired promo code.' });
    }

    res.json({ code: promo.code, percentOff: promo.percentOff });
  } catch (err) {
    console.error('Validate promo code error:', err);
    res.status(500).json({ message: 'Could not validate promo code.' });
  }
});

// Admin: list all promo codes
router.get('/', protectAdmin, async (req, res) => {
  try {
    const promos = await PromoCode.find().sort({ createdAt: -1 });
    res.json(promos.map((p) => p.toClient()));
  } catch (err) {
    console.error('Fetch promo codes error:', err);
    res.status(500).json({ message: 'Could not load promo codes.' });
  }
});

// Admin: create a new promo code
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { code, percentOff, active } = req.body || {};
    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      return res.status(400).json({ message: 'Promo code is required.' });
    }
    const pct = Number(percentOff);
    if (!Number.isFinite(pct) || pct < 1 || pct > 100) {
      return res.status(400).json({ message: 'Percent off must be a number between 1 and 100.' });
    }

    const existing = await PromoCode.findOne({ code: cleanCode });
    if (existing) {
      return res.status(409).json({ message: 'A promo code with this name already exists.' });
    }

    const promo = await PromoCode.create({
      code: cleanCode,
      percentOff: pct,
      active: active !== undefined ? Boolean(active) : true,
    });

    res.status(201).json(promo.toClient());
  } catch (err) {
    console.error('Create promo code error:', err);
    res.status(500).json({ message: 'Could not create promo code.' });
  }
});

// Admin: update an existing promo code (percent, active state, or the code itself)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { code, percentOff, active } = req.body || {};
    const update = {};

    if (code !== undefined) {
      const cleanCode = (code || '').trim().toUpperCase();
      if (!cleanCode) {
        return res.status(400).json({ message: 'Promo code is required.' });
      }
      update.code = cleanCode;
    }
    if (percentOff !== undefined) {
      const pct = Number(percentOff);
      if (!Number.isFinite(pct) || pct < 1 || pct > 100) {
        return res.status(400).json({ message: 'Percent off must be a number between 1 and 100.' });
      }
      update.percentOff = pct;
    }
    if (active !== undefined) {
      update.active = Boolean(active);
    }

    const promo = await PromoCode.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!promo) return res.status(404).json({ message: 'Promo code not found.' });

    res.json(promo.toClient());
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A promo code with this name already exists.' });
    }
    console.error('Update promo code error:', err);
    res.status(500).json({ message: 'Could not update promo code.' });
  }
});

// Admin: delete a promo code
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete promo code error:', err);
    res.status(500).json({ message: 'Could not delete promo code.' });
  }
});

export default router;