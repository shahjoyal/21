import express from 'express';
import Product from '../models/Product.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products.map((p) => p.toClient()));
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ message: 'Could not load products.' });
  }
});

// Admin: create product
router.post('/', protectAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const id = body.id || `modak-${Date.now()}`;

    const product = new Product({
      id,
      name: body.name || 'New Artisan Modak',
      marathiName: body.marathiName || '',
      category: body.category || 'ukadiche',
      tagline: body.tagline || '',
      description: body.description || '',
      marathiDescription: body.marathiDescription || '',
      image: body.image || '',
      priceTiers:
        Array.isArray(body.priceTiers) && body.priceTiers.length > 0
          ? body.priceTiers
          : [{ quantity: 7, label: 'Pack of 7', price: 349 }],
      rating: body.rating ?? 5.0,
      reviewCount: body.reviewCount ?? 1,
      isBestseller: Boolean(body.isBestseller),
      isNew: Boolean(body.isNew),
      isWorkshopFavorite: Boolean(body.isWorkshopFavorite),
      isSignature21Kalya: Boolean(body.isSignature21Kalya),
      pleatCount: Number(body.pleatCount) || 21,
      ingredients: body.ingredients || [],
      shelfLife: body.shelfLife || '',
      servingSuggestion: body.servingSuggestion || '',
      dietary: body.dietary || [],
      caloriesPerPiece: body.caloriesPerPiece,
    });

    await product.save();
    res.status(201).json(product.toClient());
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ message: 'Could not save product.' });
  }
});

// Admin: update product
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const updatable = [
      'name', 'marathiName', 'category', 'tagline', 'description', 'marathiDescription',
      'image', 'priceTiers', 'rating', 'reviewCount', 'isBestseller', 'isNew',
      'isWorkshopFavorite', 'isSignature21Kalya', 'pleatCount', 'ingredients',
      'shelfLife', 'servingSuggestion', 'dietary', 'caloriesPerPiece',
    ];
    for (const key of updatable) {
      if (req.body[key] !== undefined) product[key] = req.body[key];
    }

    await product.save();
    res.json(product.toClient());
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Could not update product.' });
  }
});

// Admin: delete product
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ id });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Could not delete product.' });
  }
});

export default router;
