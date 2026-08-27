import express from 'express';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/mailer.js';
import { signToken, setAuthCookie, clearAuthCookie, setAdminAuthCookie, clearAdminAuthCookie } from '../utils/token.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting for sensitive auth routes to slow down brute-force / spam
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again later.' },
});

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many OTP requests. Please wait a few minutes and try again.' },
});

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// ---------------- SIGNUP ----------------
router.post('/signup', otpLimiter, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Name, email, phone and password are all required.' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail }).select('+otpHash +otpExpires +otpAttempts');

    if (user && user.isVerified) {
      return res.status(409).json({ message: 'An account with this email already exists. Please log in.' });
    }

    const otp = generateOtp();

    if (user && !user.isVerified) {
      // Re-issuing signup for an unverified account — refresh their details + OTP
      user.name = name;
      user.phone = phone;
      user.password = password; // will be re-hashed by pre-save hook
      await user.setOtp(otp);
      await user.save();
    } else {
      user = new User({ name, email: normalizedEmail, phone, password, isVerified: false });
      await user.setOtp(otp);
      await user.save();
    }

    await sendOtpEmail(normalizedEmail, name, otp);

    return res.status(201).json({ message: 'OTP sent to your email. Please verify to complete sign up.', email: normalizedEmail });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Could not process sign up. Please try again.' });
  }
});

// ---------------- VERIFY OTP ----------------
router.post('/verify-otp', authLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+otpHash +otpExpires +otpAttempts');

    if (!user) {
      return res.status(404).json({ message: 'No pending sign up found for this email.' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'This account is already verified. Please log in.' });
    }
    if ((user.otpAttempts || 0) >= 6) {
      return res.status(429).json({ message: 'Too many incorrect attempts. Please request a new OTP.' });
    }

    const valid = await user.verifyOtp(String(otp));
    if (!valid) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otpHash = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    return res.json({ message: 'Email verified successfully.', user: user.toSafeJSON() });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ message: 'Could not verify OTP. Please try again.' });
  }
});

// ---------------- RESEND OTP ----------------
router.post('/resend-otp', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+otpHash +otpExpires +otpAttempts');

    if (!user) {
      return res.status(404).json({ message: 'No pending sign up found for this email.' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'This account is already verified. Please log in.' });
    }

    const otp = generateOtp();
    await user.setOtp(otp);
    await user.save();
    await sendOtpEmail(normalizedEmail, user.name, otp);

    return res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (err) {
    console.error('Resend OTP error:', err);
    return res.status(500).json({ message: 'Could not resend OTP. Please try again.' });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email with the OTP sent to you before logging in.' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id.toString());
    setAuthCookie(res, token);

    return res.json({ user: user.toSafeJSON() });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Could not log in. Please try again.' });
  }
});

// ---------------- LOGOUT ----------------
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ message: 'Logged out.' });
});

// ---------------- ME ----------------
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

// ---------------- ADMIN LOGIN (separate hidden-portal session) ----------------
router.post('/admin-login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const token = signToken(user._id.toString());
    setAdminAuthCookie(res, token);

    return res.json({ user: user.toSafeJSON() });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ message: 'Could not log in. Please try again.' });
  }
});

router.post('/admin-logout', (req, res) => {
  clearAdminAuthCookie(res);
  res.json({ message: 'Logged out.' });
});

router.get('/admin-me', protectAdmin, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

export default router;
