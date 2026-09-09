import PromoCode from '../models/PromoCode.js';

// Guarantees a starter "FIRST50" code (50% off) exists so it works out of the
// box. Safe to run on every server start — it only creates the code if it's
// not already there, and never overwrites an admin's later edits to it.
export async function seedPromoCodes() {
  const existing = await PromoCode.findOne({ code: 'FIRST50' });
  if (!existing) {
    await PromoCode.create({ code: 'FIRST50', percentOff: 50, active: true });
    console.log('✅ Promo code FIRST50 (50% off) created');
  }
}
