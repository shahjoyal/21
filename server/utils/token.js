import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'token';
const ADMIN_COOKIE_NAME = 'admin_token';

export function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured on the server.');
  }
  return jwt.sign({ sub: userId }, secret, { expiresIn: '30d' });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

export function setAdminAuthCookie(res, token) {
  res.cookie(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 12 * 60 * 60 * 1000, // 12 hours — shorter-lived admin session
    path: '/',
  });
}

export function clearAdminAuthCookie(res) {
  res.clearCookie(ADMIN_COOKIE_NAME, { path: '/' });
}

export { COOKIE_NAME, ADMIN_COOKIE_NAME };
