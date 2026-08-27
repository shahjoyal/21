import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true, maxlength: 20 },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    isVerified: { type: Boolean, default: false },
    otpHash: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    otpAttempts: { type: Number, default: 0, select: false },
    addresses: [
      {
        label: String,
        address: String,
        city: String,
        pincode: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving, only if it was modified
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.setOtp = async function setOtp(rawOtp, ttlMinutes = 10) {
  const salt = await bcrypt.genSalt(10);
  this.otpHash = await bcrypt.hash(rawOtp, salt);
  this.otpExpires = new Date(Date.now() + ttlMinutes * 60 * 1000);
  this.otpAttempts = 0;
};

userSchema.methods.verifyOtp = async function verifyOtp(candidate) {
  if (!this.otpHash || !this.otpExpires) return false;
  if (this.otpExpires.getTime() < Date.now()) return false;
  return bcrypt.compare(candidate, this.otpHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    phone: this.phone,
    role: this.role,
  };
};

export default mongoose.model('User', userSchema);
