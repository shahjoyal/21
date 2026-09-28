import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    city: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    occasion: { type: String, default: '' },
    comment: { type: String, required: true },
    productName: { type: String, default: '' },
    // A newly submitted review is unpublished until an admin approves it —
    // this is the "verify and publish" workflow. Only `verified: true`
    // reviews are ever returned by the public GET endpoint.
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reviewSchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    author: this.author,
    city: this.city,
    rating: this.rating,
    date: new Date(this.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    occasion: this.occasion,
    comment: this.comment,
    verified: this.verified,
    productName: this.productName,
  };
};

export default mongoose.model('Review', reviewSchema);
