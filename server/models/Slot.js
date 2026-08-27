import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    marathiTitle: String,
    timeRange: String,
    icon: String,
    idealFor: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Slot', slotSchema);
