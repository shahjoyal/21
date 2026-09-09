import React, { useState } from 'react';
import { CartItem, AppliedPromo } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Check,
  Tag,
  Loader2,
} from 'lucide-react';
import { FreeDeliveryProgressBar } from './FreeDeliveryProgressBar';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  selectedDeliverySlot: string;
  onSelectDeliverySlot: (slotId: string) => void;
  deliveryDate: string;
  onChangeDeliveryDate: (date: string) => void;
  language: 'en' | 'mr';
  appliedPromo: AppliedPromo | null;
  onApplyPromoCode: (code: string) => void;
  onRemovePromoCode: () => void;
  promoError: string;
  isApplyingPromo: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  selectedDeliverySlot,
  onSelectDeliverySlot,
  deliveryDate,
  onChangeDeliveryDate,
  language,
  appliedPromo,
  onApplyPromoCode,
  onRemovePromoCode,
  promoError,
  isApplyingPromo,
}) => {
  const isMarathi = language === 'mr';
  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryThreshold = 799;
  const deliveryFee = subtotal >= deliveryThreshold ? 0 : 60;
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.percentOff) / 100) : 0;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  const handleApplyClick = () => {
    if (!promoInput.trim()) return;
    onApplyPromoCode(promoInput.trim());
  };

  // Quick cross-sell add-ons
  const addOns = [
    {
      id: 'quick-a2-ghee',
      name: 'A2 Gir Cow Ghee Drizzle Jar (150ml)',
      marathiName: 'गिर गायीचे साजूक तूप (१५० मिली)',
      price: 249,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'quick-kashmiri-kesar',
      name: 'Kashmiri Saffron Vial (1g)',
      marathiName: 'काश्मिरी केशर अर्क (१ ग्रॅम)',
      price: 349,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80',
    }
  ];

  const handleQuickAdd = (addon: typeof addOns[0]) => {
    const item: CartItem = {
      id: `${addon.id}-${Date.now()}`,
      productId: addon.id,
      name: isMarathi ? addon.marathiName : addon.name,
      marathiName: addon.marathiName,
      image: addon.image,
      tier: { quantity: 1, label: 'Add-on Pack', price: addon.price },
      unitPrice: addon.price,
      quantity: 1,
    };
    onUpdateQuantity(item.id, 1);
  };

  const handleWhatsAppOrder = () => {
    const itemsSummary = cart
      .map(
        (item) =>
          `• ${item.name} (${item.tier.quantity} pcs) x ${item.quantity} = ₹${
            item.unitPrice * item.quantity
          }`
      )
      .join('\n');

    const promoLine = appliedPromo
      ? `\n*Promo Applied:* ${appliedPromo.code} (${appliedPromo.percentOff}% off, -₹${discountAmount})`
      : '';

    const message = `*🌺 २१ कळ्या Modak Studio - Direct Order 🌺*\n\n*Order Items:*\n${itemsSummary}\n\n*Preferred Date:* ${
      deliveryDate || 'Tomorrow Morning'
    }\n*Delivery Slot:* ${selectedDeliverySlot}${promoLine}\n*Order Value:* ₹${grandTotal} (${
      deliveryFee === 0 ? 'FREE Delivery' : 'Standard Insulated Delivery'
    })\n\nPlease confirm availability and payment link. ॐ गं गणपतये नमः`;

    const url = `https://wa.me/919822121021?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-hidden border-l-2 border-[#E89A25]/40">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#134e48] to-[#18564D] text-white flex items-center justify-between border-b border-[#E89A25]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E89A25] text-[#134e48] flex items-center justify-center font-black">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-devanagari font-bold text-lg text-[#F5EEDB] leading-tight">
                  {isMarathi ? 'तुमची मोदक थाळी (Cart)' : 'Your Shopping Bag'}
                </h2>
                <span className="text-[11px] text-white/70">
                  {cart.reduce((a, b) => a + b.quantity, 0)} {isMarathi ? 'पदार्थ' : 'Items'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#134e48]/10 text-[#134e48] mx-auto flex items-center justify-center text-3xl font-devanagari font-black border-2 border-[#E89A25]/40">
                  २१
                </div>
                <h3 className="font-devanagari font-bold text-xl text-[#134e48]">
                  {isMarathi ? 'तुमची थाळी रिकामी आहे' : 'Your cart is empty'}
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  {isMarathi
                    ? 'अस्सल उकडीचे मोदक, मास्टरक्लास किट्स आणि राजेशाही गिफ्ट पेट्या निवडा.'
                    : 'Add freshly steamed 21-fold modaks or masterclass kits to enjoy supreme festive bliss.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#E89A25] text-[#134e48] font-bold text-xs shadow-md"
                >
                  {isMarathi ? 'मोदक मेनू पहा' : 'Explore Modak Menu'}
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Progress Bar */}
                <FreeDeliveryProgressBar
                  currentAmount={subtotal}
                  threshold={deliveryThreshold}
                  language={language}
                />

                {/* Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3 relative group hover:border-[#E89A25]/50 transition-all"
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-bold text-xs sm:text-sm text-[#134e48] truncate font-devanagari">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#B45309] font-medium block">
                          {item.tier.label}
                        </span>

                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-baseline gap-1">
                            <span className="font-black text-sm sm:text-base text-[#134e48]">
                              ₹{item.unitPrice * item.quantity}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-gray-400">
                                (₹{item.unitPrice} each)
                              </span>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-1 bg-[#FAF7F2] p-0.5 rounded-lg border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 shadow-xs active:scale-95"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-black text-[#134e48]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-[#134e48] hover:bg-[#0f3c36] text-white flex items-center justify-center shadow-xs active:scale-95"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

              </>
            )}
          </div>

          {/* Drawer Footer Summary & Checkout CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-gray-200 space-y-3 shrink-0 shadow-lg">

              {/* Promo Code */}
              {appliedPromo ? (
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Tag className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="text-xs font-bold text-emerald-800 truncate">
                      {appliedPromo.code} — {appliedPromo.percentOff}% {isMarathi ? 'सूट लागू' : 'off applied'}
                    </span>
                  </div>
                  <button
                    onClick={onRemovePromoCode}
                    className="text-[10px] font-bold text-red-600 hover:text-red-700 shrink-0"
                  >
                    {isMarathi ? 'काढा' : 'Remove'}
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyClick()}
                        placeholder={isMarathi ? 'प्रोमो कोड टाका' : 'Enter promo code'}
                        className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-gray-300 bg-[#FAF7F2] font-bold tracking-wide uppercase placeholder:normal-case placeholder:font-normal placeholder:text-gray-400 focus:ring-2 focus:ring-[#134e48] outline-none"
                      />
                    </div>
                    <button
                      onClick={handleApplyClick}
                      disabled={isApplyingPromo || !promoInput.trim()}
                      className="shrink-0 px-4 py-2 rounded-xl bg-[#134e48] hover:bg-[#0f3c36] text-white font-bold text-xs shadow-sm active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isApplyingPromo ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        isMarathi ? 'लागू करा' : 'Apply'
                      )}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] font-semibold text-red-600 pl-1">{promoError}</p>
                  )}
                </div>
              )}

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{isMarathi ? 'उपएकूण (Subtotal)' : 'Subtotal'}</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                {appliedPromo && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{isMarathi ? `सूट (${appliedPromo.code})` : `Discount (${appliedPromo.code})`}</span>
                    <span className="font-bold">−₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{isMarathi ? 'इन्सुलेटेड वातानुकूलित डिलिव्हरी' : 'Insulated Fresh Delivery'}</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#E89A25]" /> FREE
                      </span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#134e48] pt-2 border-t border-gray-100">
                  <span>{isMarathi ? 'एकूण देय रक्कम' : 'Grand Total'}</span>
                  <span className="text-xl font-black text-[#E89A25]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E89A25] via-[#f5b842] to-[#E89A25] hover:from-[#d98c1a] hover:to-[#e89a25] text-[#134e48] font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                >
                  <span>{isMarathi ? 'सुरक्षित चेकआऊट सुरू करा' : 'PROCEED TO CHECKOUT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{isMarathi ? 'व्हॉट्सॲपवर १-क्लिक ऑर्डर' : 'Instant 1-Click WhatsApp Order'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
