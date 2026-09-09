import express from 'express';
import Workshop from '../models/Workshop.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: list all workshop sessions
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ createdAt: 1 });
    res.json(workshops.map((w) => w.toClient()));
  } catch (err) {
    console.error('Fetch workshops error:', err);
    res.status(500).json({ message: 'Could not load workshops.' });
  }
});

// Admin: create a new workshop session
router.post('/', protectAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const id = body.id || `workshop-${Date.now()}`;

    if (!body.title || !body.pricePerSeat) {
      return res.status(400).json({ message: 'Title and price per seat are required.' });
    }

    const workshop = new Workshop({
      id,
      title: body.title,
      marathiTitle: body.marathiTitle || '',
      mode: body.mode || 'offline',
      level: body.level || 'Beginner',
      date: body.date || '',
      day: body.day || '',
      timeRange: body.timeRange || '',
      duration: body.duration || '',
      location: body.location || '',
      instructor: body.instructor || '',
      pricePerSeat: Number(body.pricePerSeat),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      totalSeats: Number(body.totalSeats) || 20,
      bookedSeats: Number(body.bookedSeats) || 0,
      description: body.description || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      syllabus: Array.isArray(body.syllabus) ? body.syllabus : [],
      includesKit: Boolean(body.includesKit),
      urgency: body.urgency || 'normal',
      image: body.image || '',
    });

    await workshop.save();
    res.status(201).json(workshop.toClient());
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A workshop with this ID already exists.' });
    }
    console.error('Create workshop error:', err);
    res.status(500).json({ message: 'Could not save workshop.' });
  }
});

// Admin: update a workshop session
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findOne({ id });
    if (!workshop) return res.status(404).json({ message: 'Workshop not found.' });

    const updatable = [
      'title', 'marathiTitle', 'mode', 'level', 'date', 'day', 'timeRange', 'duration',
      'location', 'instructor', 'pricePerSeat', 'originalPrice', 'totalSeats', 'bookedSeats',
      'description', 'highlights', 'syllabus', 'includesKit', 'urgency', 'image',
    ];
    for (const key of updatable) {
      if (req.body[key] !== undefined) workshop[key] = req.body[key];
    }

    await workshop.save();
    res.json(workshop.toClient());
  } catch (err) {
    console.error('Update workshop error:', err);
    res.status(500).json({ message: 'Could not update workshop.' });
  }
});

// Admin: delete a workshop session
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Workshop.deleteOne({ id });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete workshop error:', err);
    res.status(500).json({ message: 'Could not delete workshop.' });
  }
});

export default router;
