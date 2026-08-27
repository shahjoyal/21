import User from '../models/User.js';
import { verifyToken, COOKIE_NAME, ADMIN_COOKIE_NAME } from '../utils/token.js';

export async function protect(req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: 'Please log in to continue.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }
    const user = await User.findById(decoded.sub);
    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'Please log in to continue.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Please log in to continue.' });
  }
}

export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
}

// Separate session cookie for the hidden admin portal, so an admin login
// never collides with (or overwrites) a customer session in the same browser.
export async function protectAdmin(req, res, next) {
  try {
    const token = req.cookies?.[ADMIN_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: 'Admin session required.' });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Admin session expired. Please log in again.' });
    }
    const user = await User.findById(decoded.sub);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Admin session required.' });
  }
}
