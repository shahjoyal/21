import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema(
  {
    // Always stored/matched in uppercase so "first50", "First50", "FIRST50"
    // all work the same way when a customer types it in.
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    percentOff: { type: Number, required: true, min: 1, max: 100 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

promoCodeSchema.methods.toClient = function () {
  return {
    id: this._id.toString(),
    code: this.code,
    percentOff: this.percentOff,
    active: this.active,
    createdAt: this.createdAt,
  };
};

export default mongoose.model('PromoCode', promoCodeSchema);
