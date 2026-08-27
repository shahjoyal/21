import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    singletonKey: { type: String, default: 'store_settings', unique: true },
    storeName: String,
    marathiStoreName: String,
    tagline: String,
    marathiTagline: String,
    whatsappNumber: String,
    supportPhone: String,
    supportEmail: String,
    storeAddress: String,
    upiId: String,
    announcementBanner: {
      enabled: Boolean,
      textEn: String,
      textMr: String,
      linkUrl: String,
    },
    deliveryCharge: Number,
    freeDeliveryThreshold: Number,
    deliveryCities: [String],
    freshBatchesCapacityPerSlot: Number,
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model('Settings', settingsSchema);
