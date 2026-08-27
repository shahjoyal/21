import express from 'express';
import Settings from '../models/Settings.js';
import Slot from '../models/Slot.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

const DEFAULT_SETTINGS = {
  storeName: '21 Kalya Modak & Culinary Studio',
  marathiStoreName: '२१ कळ्या मोदक व पाककला स्टुडिओ',
  tagline: 'Artisan 21-Pleat Modaks, Masterclasses & Culinary Workshops',
  marathiTagline: 'स्वादः परमानन्दः • अस्सल २१ कळ्यांची कार्यशाळा व मोदक कला',
  whatsappNumber: '+917304472460',
  supportPhone: '+91 73044 72460',
  supportEmail: 'workshops@21kalyamodak.com',
  storeAddress: 'Sadashiv Peth / Prabhat Road, Pune, Maharashtra 411030',
  upiId: '21kalya@icici',
  announcementBanner: {
    enabled: true,
    textEn: '👨‍🍳 Weekend 21-Pleat Masterclasses & Daily Fresh Morning Steaming Batches are Open for Booking!',
    textMr: '👨‍🍳 विकेंड २१ कळ्या मास्टरक्लास कार्यशाळा आणि दैनंदिन ताज्या उकडीच्या मोदकांसाठी नोंदणी सुरू!',
  },
  deliveryCharge: 60,
  freeDeliveryThreshold: 799,
  deliveryCities: ['Pune', 'Pimpri-Chinchwad', 'Mumbai', 'Thane', 'Navi Mumbai'],
  freshBatchesCapacityPerSlot: 150,
};

const DEFAULT_SLOTS = [
  { id: 'slot-morning', title: 'Morning Fresh Steam Batch (Studio & Delivery)', marathiTitle: 'सकाळ ताजी वाफवलेली बॅच', timeRange: '6:30 AM – 9:00 AM', icon: 'Sun', idealFor: 'Morning Breakfast, Studio Pickups & Express Deliveries', available: true },
  { id: 'slot-afternoon', title: 'Afternoon Masterclass Batch', marathiTitle: 'दुपारची मास्टरक्लास बॅच', timeRange: '11:30 AM – 2:00 PM', icon: 'Flame', idealFor: 'Midday Culinary Workshops & Lunch Dessert Orders', available: true },
  { id: 'slot-evening', title: 'Evening Sunset Batch', marathiTitle: 'सायंकाळ फ्रेश बॅच', timeRange: '5:00 PM – 7:30 PM', icon: 'Sparkles', idealFor: 'Evening Tea-Time, Corporate Events & Dinner Treats', available: true },
];

router.get('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne({ singletonKey: 'store_settings' });
    if (!settings) {
      settings = await Settings.create({ singletonKey: 'store_settings', ...DEFAULT_SETTINGS });
    }
    const obj = settings.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.singletonKey;
    res.json(obj);
  } catch (err) {
    console.error('Fetch settings error:', err);
    res.status(500).json({ message: 'Could not load settings.' });
  }
});

router.put('/settings', protectAdmin, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { singletonKey: 'store_settings' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    const obj = settings.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.singletonKey;
    res.json(obj);
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ message: 'Could not update settings.' });
  }
});

router.get('/slots', async (req, res) => {
  try {
    let slots = await Slot.find();
    if (slots.length === 0) {
      slots = await Slot.insertMany(DEFAULT_SLOTS);
    }
    res.json(slots.map((s) => ({ id: s.id, title: s.title, marathiTitle: s.marathiTitle, timeRange: s.timeRange, icon: s.icon, idealFor: s.idealFor, available: s.available })));
  } catch (err) {
    console.error('Fetch slots error:', err);
    res.status(500).json({ message: 'Could not load slots.' });
  }
});

router.put('/slots', protectAdmin, async (req, res) => {
  try {
    const incoming = Array.isArray(req.body) ? req.body : [];
    for (const slot of incoming) {
      await Slot.findOneAndUpdate({ id: slot.id }, { $set: slot }, { upsert: true });
    }
    const slots = await Slot.find();
    res.json(slots.map((s) => ({ id: s.id, title: s.title, marathiTitle: s.marathiTitle, timeRange: s.timeRange, icon: s.icon, idealFor: s.idealFor, available: s.available })));
  } catch (err) {
    console.error('Update slots error:', err);
    res.status(500).json({ message: 'Could not update slots.' });
  }
});

export default router;
