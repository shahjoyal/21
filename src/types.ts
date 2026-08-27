export type ModakCategory = 'all' | 'ukadiche' | 'dryfruit_mawa' | 'sugarfree' | 'workshops_kits';

export interface ProductPriceTier {
  quantity: number; // 7, 11, 21, 51 or 1 (for kits/passes)
  label: string;
  price: number;
  originalPrice?: number;
}

export interface ModakProduct {
  id: string;
  name: string;
  marathiName: string;
  category: 'ukadiche' | 'dryfruit_mawa' | 'sugarfree' | 'workshops_kits';
  tagline: string;
  description: string;
  marathiDescription: string;
  image: string;
  priceTiers: ProductPriceTier[];
  selectedTierIndex?: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isWorkshopFavorite?: boolean;
  isSignature21Kalya?: boolean;
  pleatCount: number; // e.g. 21
  ingredients: string[];
  shelfLife: string;
  servingSuggestion: string;
  dietary: ('100% Vegetarian' | 'Pure Ghee' | 'Organic Jaggery' | 'No Added Sugar' | 'Gluten Free' | 'Artisan Crafted' | 'Studio Fresh')[];
  caloriesPerPiece?: number;
}

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  name: string;
  marathiName: string;
  image: string;
  tier: ProductPriceTier;
  unitPrice: number;
  quantity: number; // how many boxes or seats
  customNotes?: string;
  giftRibbon?: string;
  giftMessage?: string;
  isWorkshopPass?: boolean;
  workshopDate?: string;
}

export interface DeliverySlot {
  id: string;
  title: string;
  marathiTitle: string;
  timeRange: string;
  icon: string;
  idealFor: string;
  available: boolean;
}

export interface WorkshopSession {
  id: string;
  title: string;
  marathiTitle: string;
  level: 'Beginner' | 'Masterclass' | 'Chef Intensive' | 'Family & Kids';
  date: string;
  day: string;
  timeRange: string;
  duration: string;
  location: string;
  instructor: string;
  pricePerSeat: number;
  originalPrice?: number;
  totalSeats: number;
  bookedSeats: number;
  description: string;
  highlights: string[];
  syllabus: string[];
  includesKit: boolean;
  urgency?: 'high' | 'medium' | 'normal';
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  occasion: string;
  comment: string;
  verified: boolean;
  productName: string;
}

// Full order lifecycle used by the admin dispatch board
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  occasion: string;
  deliveryDate: string;
  deliverySlot: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: OrderStatus;
  notes?: string;
  isWorkshopBooking?: boolean;
}

export interface StoreSettings {
  storeName: string;
  marathiStoreName: string;
  tagline: string;
  marathiTagline: string;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  storeAddress: string;
  upiId: string;
  announcementBanner: {
    enabled: boolean;
    textEn: string;
    textMr: string;
    linkUrl?: string;
  };
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  deliveryCities: string[];
  freshBatchesCapacityPerSlot: number;
}

// ---- Auth ----
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
}
