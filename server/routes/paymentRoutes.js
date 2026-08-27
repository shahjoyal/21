import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';
import { generateOrderNumber } from './orderRoutes.js';

const router = express.Router();

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// Step 1: create a Razorpay order for the given cart total (amount in rupees)
router.post('/create-order', protect, async (req, res) => {
  try {
    const client = getRazorpayClient();
    if (!client) {
      return res.status(503).json({
        message: 'Online payments are not configured yet. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to the server .env file.',
      });
    }

    const { amount } = req.body || {};
    const amountInRupees = Number(amount);
    if (!amountInRupees || amountInRupees <= 0) {
      return res.status(400).json({ message: 'A valid order amount is required.' });
    }

    const razorpayOrder = await client.orders.create({
      amount: Math.round(amountInRupees * 100), // paise
      currency: 'INR',
      receipt: generateOrderNumber(),
      notes: { userId: req.user._id.toString() },
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Create Razorpay order error:', err);
    res.status(500).json({ message: 'Could not initiate payment. Please try again.' });
  }
});

// Step 2: verify the payment signature and only then persist the order in MongoDB
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment verification details.' });
    }
    if (!orderData || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Order details are missing.' });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(503).json({ message: 'Payments are not configured on the server.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed. Signature mismatch.' });
    }

    const items = orderData.items;
    const subtotal = orderData.subtotal ?? items.reduce((acc, it) => acc + (it.unitPrice || 0) * (it.quantity || 0), 0);
    const deliveryFee = orderData.deliveryFee ?? 0;
    const total = orderData.total ?? subtotal + deliveryFee;

    const order = new Order({
      orderNumber: generateOrderNumber(),
      customer: req.user._id,
      customerName: orderData.customerName || req.user.name,
      phone: orderData.phone || req.user.phone || '',
      email: orderData.email || req.user.email,
      address: orderData.address || '',
      city: orderData.city || '',
      pincode: orderData.pincode || '',
      occasion: orderData.occasion || '',
      deliveryDate: orderData.deliveryDate || '',
      deliverySlot: orderData.deliverySlot || '',
      items,
      subtotal,
      deliveryFee,
      total,
      notes: orderData.notes || '',
      paymentMethod: 'razorpay',
      paymentStatus: 'paid',
      status: 'confirmed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await order.save();

    res.status(201).json(order.toClient());
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ message: 'Payment succeeded but we could not save your order. Please contact support with your payment ID.' });
  }
});

export default router;
