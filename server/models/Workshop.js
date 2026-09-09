import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    marathiTitle: { type: String, default: '' },
    mode: { type: String, enum: ['online', 'offline', 'type3'], default: 'offline' },
    level: {
      type: String,
      enum: ['Beginner', 'Masterclass', 'Chef Intensive', 'Family & Kids'],
      default: 'Beginner',
    },
    date: { type: String, default: '' },
    day: { type: String, default: '' },
    timeRange: { type: String, default: '' },
    duration: { type: String, default: '' },
    location: { type: String, default: '' },
    instructor: { type: String, default: '' },
    pricePerSeat: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    totalSeats: { type: Number, default: 20, min: 1 },
    bookedSeats: { type: Number, default: 0, min: 0 },
    description: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    syllabus: { type: [String], default: [] },
    includesKit: { type: Boolean, default: false },
    urgency: { type: String, enum: ['high', 'medium', 'normal'], default: 'normal' },
    image: { type: String, default: '' },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

workshopSchema.methods.toClient = function toClient() {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

export default mongoose.model('Workshop', workshopSchema);
