import express from 'express';
import Order from '../models/Order.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

function generateOrderNumber() {
  return `21K-${Math.floor(100000 + Math.random() * 900000)}`;
}

function buildOrderPayload(body, user) {
  const items = Array.isArray(body.items) ? body.items : [];
  const subtotal = body.subtotal ?? items.reduce((acc, it) => acc + (it.unitPrice || 0) * (it.quantity || 0), 0);
  const deliveryFee = body.deliveryFee ?? 0;
  const total = body.total ?? subtotal + deliveryFee;

  return {
    orderNumber: generateOrderNumber(),
    customer: user._id,
    customerName: body.customerName || user.name,
    phone: body.phone || user.phone || '',
    email: body.email || user.email,
    address: body.address || '',
    city: body.city || '',
    pincode: body.pincode || '',
    occasion: body.occasion || '',
    deliveryDate: body.deliveryDate || '',
    deliverySlot: body.deliverySlot || '',
    items,
    subtotal,
    deliveryFee,
    total,
    notes: body.notes || '',
  };
}

// Customer: place a Cash on Delivery order (no payment gateway needed)
router.post('/cod', protect, async (req, res) => {
  try {
    const body = req.body || {};
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }
    if (!body.address || !body.city || !body.pincode) {
      return res.status(400).json({ message: 'Delivery address, city and pincode are required.' });
    }

    const payload = buildOrderPayload(body, req.user);
    const order = new Order({
      ...payload,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'pending',
    });
    await order.save();

    res.status(201).json(order.toClient());
  } catch (err) {
    console.error('Create COD order error:', err);
    res.status(500).json({ message: 'Could not place order. Please try again.' });
  }
});

// Customer: view their own orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json(orders.map((o) => o.toClient()));
  } catch (err) {
    console.error('Fetch my orders error:', err);
    res.status(500).json({ message: 'Could not load your orders.' });
  }
});

// Admin: view all orders
router.get('/', protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders.map((o) => o.toClient()));
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ message: 'Could not load orders.' });
  }
});

// Admin: update order status / payment status (packed, shipped, out for delivery, delivered, etc.)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body || {};

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    const validStatuses = ['pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid order status.' });
      }
      order.status = status;
    }
    if (paymentStatus) {
      if (!['pending', 'paid', 'failed'].includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status.' });
      }
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    res.json(order.toClient());
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ message: 'Could not update order.' });
  }
});

// Admin: delete an order
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete order error:', err);
    res.status(500).json({ message: 'Could not delete order.' });
  }
});

export default router;
export { buildOrderPayload, generateOrderNumber };
