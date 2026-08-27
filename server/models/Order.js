import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    marathiName: String,
    image: String,
    tier: {
      quantity: Number,
      label: String,
      price: Number,
    },
    unitPrice: Number,
    quantity: Number,
    customNotes: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    occasion: { type: String, default: '' },
    deliveryDate: { type: String, default: '' },
    deliverySlot: { type: String, default: '' },
    items: { type: [orderItemSchema], required: true, validate: (v) => v.length > 0 },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['razorpay', 'cod'], default: 'razorpay' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

orderSchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    orderNumber: this.orderNumber,
    createdAt: this.createdAt,
    customerName: this.customerName,
    phone: this.phone,
    email: this.email,
    address: this.address,
    city: this.city,
    pincode: this.pincode,
    occasion: this.occasion,
    deliveryDate: this.deliveryDate,
    deliverySlot: this.deliverySlot,
    items: this.items,
    subtotal: this.subtotal,
    deliveryFee: this.deliveryFee,
    total: this.total,
    paymentMethod: this.paymentMethod,
    paymentStatus: this.paymentStatus,
    status: this.status,
    notes: this.notes,
  };
};

export default mongoose.model('Order', orderSchema);
