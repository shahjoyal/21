import mongoose from 'mongoose';

const ourProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    marathiName: { type: String, default: '' },
    description: { type: String, default: '' },
    marathiDescription: { type: String, default: '' },
    unit: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

ourProductSchema.methods.toClient = function toClient() {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

export default mongoose.model('OurProduct', ourProductSchema);
