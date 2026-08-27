import User from '../models/User.js';

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin account will be created. Set them in .env to access /admin-portal.');
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  let admin = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!admin) {
    admin = new User({
      name: process.env.ADMIN_NAME || 'Store Admin',
      email: normalizedEmail,
      phone: process.env.ADMIN_PHONE || '',
      password,
      role: 'admin',
      isVerified: true,
    });
    await admin.save();
    console.log(`✅ Admin account created for ${normalizedEmail}`);
  } else if (admin.role !== 'admin') {
    admin.role = 'admin';
    admin.isVerified = true;
    await admin.save();
    console.log(`✅ Existing account ${normalizedEmail} promoted to admin`);
  }
}
