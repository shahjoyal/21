import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CartItem } from '../types';
import { ShoppingBag, ArrowRight, Sparkles, Truck } from 'lucide-react';

interface MobileStickyCartBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onExploreMenu: () => void;
  language: 'en' | 'mr';
  freeDeliveryThreshold?: number;
}

export const MobileStickyCartBar: React.FC<MobileStickyCartBarProps> = ({
  cart,
  onOpenCart,
  onExploreMenu,
  language,
  freeDeliveryThreshold = 799,
}) => {
  const isMarathi = language === 'mr';
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const isFreeDelivery = remainingForFreeDelivery === 0;

  // Smooth "bump" feedback on the item count / total whenever the cart changes.
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(totalCount);
  useEffect(() => {
    if (totalCount !== prevCountRef.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 420);
      prevCountRef.current = totalCount;
      return () => window.clearTimeout(t);
    }
  }, [totalCount]);

  return (
    <motion.aside
      aria-label="Mobile Shopping Actions"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="block sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#134e48] text-white border-t-2 border-[#E89A25] shadow-2xl px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      {totalCount > 0 ? (
        <div className="flex flex-col gap-1.5">
          {/* Micro Free Delivery Indicator */}
          <div className="flex items-center justify-between text-[10px] text-white/90 font-medium px-1">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#E89A25]" />
              {isFreeDelivery
                ? (isMarathi ? '🎉 मोफत एक्सप्रेस डिलिव्हरी लागू!' : '🎉 FREE Express Delivery Unlocked!')
                : (isMarathi ? `मोफत डिलिव्हरीसाठी आणखी ₹${remainingForFreeDelivery}` : `Add ₹${remainingForFreeDelivery} for FREE Delivery`)}
            </span>
            <motion.span
              key={totalCount}
              initial={{ scale: 1.3, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="text-[#E89A25] font-bold"
            >
              {totalCount} {isMarathi ? 'नग' : 'items'}
            </motion.span>
          </div>

          {/* Main Action Strip */}
          <div className="flex items-center justify-between gap-2.5">
            <motion.div
              animate={bump ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col cursor-pointer"
              onClick={onOpenCart}
            >
              <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider leading-none">
                {isMarathi ? 'एकूण रक्कम' : 'Total'}
              </span>
              <span className="text-lg font-black text-[#E89A25] leading-tight">
                ₹{subtotal}
              </span>
            </motion.div>

            <button
              onClick={onOpenCart}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] hover:bg-[#d98c1a] text-[#134e48] font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isMarathi ? 'थाळी उघडा व चेकआऊट' : 'View Cart & Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F5EEDB]">
            <Sparkles className="w-4 h-4 text-[#E89A25]" />
            <span>{isMarathi ? 'ताजे २१ कळ्यांचे मोदक' : 'Fresh 21-Pleat Modaks'}</span>
          </div>

          <button
            onClick={onExploreMenu}
            className="py-2.5 px-5 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-black text-xs shadow-md flex items-center gap-1.5 active:scale-98 transition-all"
          >
            <span>{isMarathi ? 'आता ऑर्डर करा' : 'Order Fresh Modaks'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </motion.aside>
  );
};
