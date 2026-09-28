import express from 'express';
import Review from '../models/Review.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: only ever returns approved (verified) reviews — this is what
// the storefront's Testimonials section displays.
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ verified: true }).sort({ createdAt: -1 });
    res.json(reviews.map((r) => r.toClient()));
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ message: 'Could not load reviews.' });
  }
});

// Public: a customer submits a review. It starts unpublished (verified:
// false) and stays invisible on the storefront until an admin approves it.
router.post('/', async (req, res) => {
  try {
    const { author, city, rating, occasion, comment, productName } = req.body || {};

    if (!author || !comment || !rating) {
      return res.status(400).json({ message: 'Name, rating and comment are required.' });
    }
    const numericRating = Number(rating);
    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const review = await Review.create({
      author: String(author).slice(0, 80),
      city: city ? String(city).slice(0, 60) : '',
      rating: numericRating,
      occasion: occasion ? String(occasion).slice(0, 120) : '',
      comment: String(comment).slice(0, 1000),
      productName: productName ? String(productName).slice(0, 120) : '',
      verified: false,
    });

    res.status(201).json({
      message: 'Thank you! Your review has been submitted and will appear once approved.',
      review: review.toClient(),
    });
  } catch (err) {
    console.error('Submit review error:', err);
    res.status(500).json({ message: 'Could not submit your review.' });
  }
});

// Admin: every review, pending and approved, newest first.
router.get('/admin/all', protectAdmin, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews.map((r) => r.toClient()));
  } catch (err) {
    console.error('Fetch all reviews error:', err);
    res.status(500).json({ message: 'Could not load reviews.' });
  }
});

// Admin: approve/publish or unpublish a review.
router.patch('/:id/verify', protectAdmin, async (req, res) => {
  try {
    const { verified } = req.body || {};
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: { verified: Boolean(verified) } },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json(review.toClient());
  } catch (err) {
    console.error('Verify review error:', err);
    res.status(500).json({ message: 'Could not update review.' });
  }
});

// Admin: delete/reject a review.
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ message: 'Could not delete review.' });
  }
});

export default router;
