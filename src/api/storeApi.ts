import { ModakProduct, StoreSettings, DeliverySlot } from '../types';
import { PRODUCTS, DELIVERY_SLOTS } from '../data/products';

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: '21 Kalya Modak',
  marathiStoreName: '२१ कळ्या मोदक',
  tagline: 'Authentic 21-fold Handcrafted Modaks & Gifting',
  marathiTagline: 'स्वादः परमानन्दः • अस्सल २१ कळ्यांची कलाकृती',
  whatsappNumber: '+919822121021',
  supportPhone: '+91 98221 21021',
  supportEmail: 'orders@21kalyamodak.com',
  storeAddress: 'Sadashiv Peth, Near Shanivar Wada, Pune, Maharashtra 411030',
  upiId: '21kalya@icici',
  announcementBanner: {
    enabled: true,
    textEn: '🕉️ Pre-Bookings Open for Next Sankashti Chaturthi & Daily Fresh Morning Steaming Batches!',
    textMr: '🕉️ आगामी संकष्टी चतुर्थी व दैनंदिन पहाटेच्या ताज्या उकडीच्या मोदकांसाठी बुकिंग सुरू आहे!'
  },
  deliveryCharge: 60,
  freeDeliveryThreshold: 799,
  deliveryCities: ['Pune', 'Pimpri-Chinchwad', 'Mumbai', 'Thane', 'Navi Mumbai'],
  freshBatchesCapacityPerSlot: 150
};

// Public, read-only client for the customer-facing storefront.
// All product/settings/slot management now lives on the real MongoDB-backed
// API and is edited only via the hidden /admin-portal (see api/adminApi.ts).
export const storeApi = {
  async getProducts(): Promise<ModakProduct[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // fall back to bundled sample data if the API isn't reachable yet
    }
    return PRODUCTS;
  },

  async getSettings(): Promise<StoreSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) return await res.json();
    } catch {
      // pass
    }
    return DEFAULT_SETTINGS;
  },

  async getSlots(): Promise<DeliverySlot[]> {
    try {
      const res = await fetch('/api/slots');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // pass
    }
    return DELIVERY_SLOTS;
  }
};
