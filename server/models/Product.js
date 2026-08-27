import mongoose from 'mongoose';

const priceTierSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    label: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    marathiName: { type: String, default: '' },
    category: {
      type: String,
      enum: ['ukadiche', 'dryfruit_mawa', 'sugarfree', 'workshops_kits'],
      required: true,
    },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    marathiDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    priceTiers: { type: [priceTierSchema], required: true, validate: (v) => v.length > 0 },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    isBestseller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isWorkshopFavorite: { type: Boolean, default: false },
    isSignature21Kalya: { type: Boolean, default: false },
    pleatCount: { type: Number, default: 21 },
    ingredients: { type: [String], default: [] },
    shelfLife: { type: String, default: '' },
    servingSuggestion: { type: String, default: '' },
    dietary: { type: [String], default: [] },
    caloriesPerPiece: { type: Number },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

productSchema.methods.toClient = function toClient() {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

export default mongoose.model('Product', productSchema);
