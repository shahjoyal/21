import express from 'express';
import OurProduct from '../models/OurProduct.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: list all pantry products
router.get('/', async (req, res) => {
  try {
    const products = await OurProduct.find().sort({ createdAt: 1 });
    res.json(products.map((p) => p.toClient()));
  } catch (err) {
    console.error('Fetch our-products error:', err);
    res.status(500).json({ message: 'Could not load products.' });
  }
});

// Admin: create a new pantry product
router.post('/', protectAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const id = body.id || `our-product-${Date.now()}`;

    if (!body.name || !body.price) {
      return res.status(400).json({ message: 'Name and price are required.' });
    }

    const product = new OurProduct({
      id,
      name: body.name,
      marathiName: body.marathiName || body.name,
      description: body.description || '',
      marathiDescription: body.marathiDescription || '',
      unit: body.unit || '',
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      image: body.image || '',
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
    });

    await product.save();
    res.status(201).json(product.toClient());
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'A product with this ID already exists.' });
    }
    console.error('Create our-product error:', err);
    res.status(500).json({ message: 'Could not save product.' });
  }
});

// Admin: update a pantry product
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await OurProduct.findOne({ id });
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const updatable = [
      'name', 'marathiName', 'description', 'marathiDescription',
      'unit', 'price', 'originalPrice', 'image', 'inStock',
    ];
    for (const key of updatable) {
      if (req.body[key] !== undefined) product[key] = req.body[key];
    }

    await product.save();
    res.json(product.toClient());
  } catch (err) {
    console.error('Update our-product error:', err);
    res.status(500).json({ message: 'Could not update product.' });
  }
});

// Admin: delete a pantry product
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await OurProduct.deleteOne({ id });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete our-product error:', err);
    res.status(500).json({ message: 'Could not delete product.' });
  }
});

export default router;
