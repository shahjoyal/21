import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { CartItem, ModakProduct, StoreSettings, DeliverySlot } from './types';
import { PRODUCTS, DELIVERY_SLOTS } from './data/products';
import { storeApi } from './api/storeApi';
import { Layout, OutletContextType } from './pages/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import WorkshopsPage from './pages/WorkshopsPage';
import CheckoutPage from './pages/CheckoutPage';

const INITIAL_SETTINGS: StoreSettings = {
  storeName: '21 Kalya Modak & Culinary Studio',
  marathiStoreName: '२१ कळ्या मोदक व पाककला स्टुडिओ',
  tagline: 'Artisan 21-Pleat Modaks, Masterclasses & Culinary Workshops',
  marathiTagline: 'स्वादः परमानन्दः • अस्सल २१ कळ्यांची कार्यशाळा व मोदक कला',
  whatsappNumber: '+919822121021',
  supportPhone: '+91 98221 21021',
  supportEmail: 'workshops@21kalyamodak.com',
  storeAddress: 'Sadashiv Peth / Prabhat Road, Pune, Maharashtra 411030',
  upiId: '21kalya@icici',
  announcementBanner: {
    enabled: true,
    textEn: '👨‍🍳 Weekend 21-Pleat Masterclasses & Daily Fresh Morning Steaming Batches are Open for Booking!',
    textMr: '👨‍🍳 विकेंड २१ कळ्या मास्टरक्लास कार्यशाळा आणि दैनंदिन ताज्या उकडीच्या मोदकांसाठी नोंदणी सुरू!'
  },
  deliveryCharge: 60,
  freeDeliveryThreshold: 799,
  deliveryCities: ['Pune', 'Pimpri-Chinchwad', 'Mumbai', 'Thane', 'Navi Mumbai'],
  freshBatchesCapacityPerSlot: 150
};

function AppShell() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'mr' | 'en'>('en');

  const [products, setProducts] = useState<ModakProduct[]>(PRODUCTS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [slots, setSlots] = useState<DeliverySlot[]>(DELIVERY_SLOTS);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('21kalya_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ModakProduct | null>(null);
  const [isBulkInquiryOpen, setIsBulkInquiryOpen] = useState(false);

  // Delivery configuration
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState(
    'Morning Studio & Fresh Batch (8:30 AM – 11:00 AM)'
  );

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const [deliveryDate, setDeliveryDate] = useState<string>(getTomorrowDate);

  // Fetch live product/settings/slot data from the public API
  useEffect(() => {
    async function loadData() {
      const [fetchedProducts, fetchedSettings, fetchedSlots] = await Promise.all([
        storeApi.getProducts(),
        storeApi.getSettings(),
        storeApi.getSlots()
      ]);
      setProducts(fetchedProducts);
      setSettings(fetchedSettings);
      setSlots(fetchedSlots);
    }
    loadData();
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('21kalya_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart Operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.productId === newItem.productId && item.tier.quantity === newItem.tier.quantity && !item.isWorkshopPass
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prevCart, newItem];
    });

    // Smooth "Added to Cart" feedback: button state + global toast + cart
    // badge bump. The cart drawer itself only opens when the person taps
    // the cart icon — it should never pop open automatically.
    showToast(
      language === 'mr' ? 'थाळीत जोडले गेले!' : 'Added to Cart!',
      newItem.name,
      newItem.image
    );
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const handleExploreMenu = () => {
    navigate('/shop');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    if (!user) {
      // Require login/signup before checkout, as requested.
      setIsAuthOpen(true);
      return;
    }
    navigate('/checkout');
  };

  const outletContext: OutletContextType = {
    language,
    onToggleLanguage: handleToggleLanguage,
    products,
    settings,
    cart,
    onAddToCart: handleAddToCart,
    onOpenQuickView: (p) => setQuickViewProduct(p),
    onOpenBulkInquiry: () => setIsBulkInquiryOpen(true),
    selectedDeliverySlot,
    onSelectDeliverySlot: setSelectedDeliverySlot,
    deliveryDate,
    onChangeDeliveryDate: setDeliveryDate,
    onClearCart: handleClearCart,
    onProceedToCheckout: handleProceedToCheckout,
    onUpdateQuantity: handleUpdateQuantity,
    onRemoveItem: handleRemoveItem,
  };

  return (
    <Routes>
      <Route
        element={
          <Layout
            ctx={outletContext}
            isCartOpen={isCartOpen}
            onCloseCart={() => setIsCartOpen(false)}
            onOpenCart={() => setIsCartOpen(true)}
            isAuthOpen={isAuthOpen}
            onCloseAuth={() => setIsAuthOpen(false)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onAuthenticated={() => navigate('/checkout')}
            isBulkInquiryOpen={isBulkInquiryOpen}
            onCloseBulkInquiry={() => setIsBulkInquiryOpen(false)}
            quickViewProduct={quickViewProduct}
            onCloseQuickView={() => setQuickViewProduct(null)}
            onExploreMenu={handleExploreMenu}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="workshops" element={<WorkshopsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </BrowserRouter>
  );
}