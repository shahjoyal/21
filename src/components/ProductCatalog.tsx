import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ModakProduct, CartItem } from '../types';
import {
  Eye,
  ShoppingBag,
  ChefHat,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { revealItemVariants, Reveal } from './Reveal';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface ProductCatalogProps {
  products?: ModakProduct[];
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onOpenQuickView: (product: ModakProduct) => void;
  language: 'en' | 'mr';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = PRODUCTS,
  cart,
  onAddToCart,
  onOpenQuickView,
  language,
}) => {
  const isMarathi = language === 'mr';

  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Signature items first, then bestsellers — curated single-row showcase order.
  const sortedProducts = [...products].sort((a, b) => {
    if (a.isSignature21Kalya && !b.isSignature21Kalya) return -1;
    if (b.isSignature21Kalya && !a.isSignature21Kalya) return 1;
    if (a.isBestseller && !b.isBestseller) return -1;
    if (b.isBestseller && !a.isBestseller) return 1;
    return 0;
  });

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  // Check on mount / whenever the product list changes whether the row is
  // actually wide enough to need arrows at all.
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  const scrollByCards = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.clientWidth || 260;
    const amount = (cardWidth + 20) * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
    // Re-check button state shortly after the smooth scroll settles.
    window.setTimeout(updateScrollButtons, 350);
  };

  const handleSelectTier = (productId: string, tierIndex: number) => {
    setSelectedTiers((prev) => ({
      ...prev,
      [productId]: tierIndex,
    }));
  };

  const handleAddToCart = (product: ModakProduct) => {
    const tierIdx = selectedTiers[product.id] || 0;
    const tier = product.priceTiers[tierIdx] || product.priceTiers[0];

    const cartItem: CartItem = {
      id: `${product.id}-${tier.quantity}-${Date.now()}`,
      productId: product.id,
      name: isMarathi ? product.marathiName : product.name,
      marathiName: product.marathiName,
      image: product.image,
      tier: tier,
      unitPrice: tier.price,
      quantity: 1,
    };

    onAddToCart(cartItem);

    try {
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="menu" className="py-10 sm:py-16 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? 'सिग्नेचर संकलन' : 'Signature Collection'}
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight">
            {isMarathi ? 'आमचे सर्वोत्तम मोदक' : 'Our Finest Modaks'}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'प्रत्येक प्रकार पारंपरिक पाककृती व भारतभरातून आणलेल्या उत्तम घटकांसह काळजीपूर्वक तयार केला जातो.'
              : 'Each variant is crafted with care, using time-honored recipes and the finest ingredients sourced from across India.'}
          </p>
        </Reveal>

        {/* Single-Row Horizontal Carousel with Arrow Controls */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByCards('left')}
              aria-label="Scroll modaks left"
              className="hidden sm:flex absolute -left-4 lg:-left-5 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-[#134e48] hover:bg-[#134e48] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollByCards('right')}
              aria-label="Scroll modaks right"
              className="hidden sm:flex absolute -right-4 lg:-right-5 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-[#134e48] hover:bg-[#134e48] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <motion.div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.08 }}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 scrollbar-none -mx-1 px-1 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)] sm:[mask-image:none]"
          >
            {sortedProducts.map((product) => {
              const selectedTierIdx = selectedTiers[product.id] || 0;
              const currentTier = product.priceTiers[selectedTierIdx] || product.priceTiers[0];
              // Reflects real cart state: stays "Added" until the person
              // actually removes this exact pack size from the cart.
              const isAdded = cart.some(
                (item) =>
                  item.productId === product.id &&
                  item.tier.quantity === currentTier.quantity &&
                  !item.isWorkshopPass
              );

              // Price & Discount Math
              const price = currentTier.price;
              const originalPrice = currentTier.originalPrice || Math.round(price * 1.15);
              const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

              const badge = product.isSignature21Kalya
                ? { label: isMarathi ? '२१ कळ्या सिग्नेचर' : 'Signature', dot: 'bg-[#134e48]', text: 'text-[#134e48]' }
                : product.isBestseller
                ? { label: isMarathi ? 'सर्वाधिक पसंती' : 'Bestseller', dot: 'bg-[#E89A25]', text: 'text-[#8a5a10]' }
                : product.dietary.some((d) => /sugar[- ]free|no added sugar/i.test(d))
                ? { label: isMarathi ? 'साखरमुक्त' : 'Sugar-free', dot: 'bg-emerald-600', text: 'text-emerald-800' }
                : { label: isMarathi ? 'पारंपारिक' : 'Traditional', dot: 'bg-stone-400', text: 'text-stone-600' };

              return (
                <motion.div
                  key={product.id}
                  data-card
                  variants={revealItemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`shrink-0 snap-start w-[158px] sm:w-[196px] lg:w-[214px] bg-white rounded-[20px] overflow-hidden group relative transition-shadow duration-500 shadow-[0_1px_2px_rgba(19,78,72,0.06),0_1px_10px_rgba(19,78,72,0.05)] hover:shadow-[0_20px_45px_-16px_rgba(19,78,72,0.35)] ${
                    product.isSignature21Kalya
                      ? 'ring-1 ring-[#E89A25]/50 hover:ring-[#E89A25]'
                      : 'ring-1 ring-black/[0.06] hover:ring-[#134e48]/20'
                  }`}
                >
                  {/* Image Container — badges, hover description overlay */}
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 cursor-pointer"
                    onClick={() => onOpenQuickView(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Single Primary Badge — glass pill, top-left */}
                    <div className="absolute top-2 left-2">
                      <span className={`flex items-center gap-1 pl-1.5 pr-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md shadow-[0_1px_4px_rgba(0,0,0,0.12)] text-[9px] font-bold uppercase tracking-wider ${badge.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#134e48] text-[#F3D48A] text-[9px] font-bold tracking-wide shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                        {discountPercent}% off
                      </span>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuickView(product);
                      }}
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#134e48] shadow-[0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-10"
                      title="Quick View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Description reveal on hover */}
                    <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-[#134e48] via-[#134e48]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-white/95 text-[10.5px] leading-relaxed line-clamp-5">
                        {isMarathi ? product.marathiDescription : product.description}
                      </p>
                    </div>
                  </div>

                  {/* Name, Price & Add to Cart */}
                  <div className="p-3 space-y-1.5">
                    <h3 className="font-serif-luxury font-bold text-[13px] sm:text-[14.5px] text-[#134e48] leading-snug line-clamp-1 group-hover:text-[#B45309] transition-colors">
                      {isMarathi ? product.marathiName : product.name}
                    </h3>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#134e48] tracking-tight">
                        ₹{price}
                      </span>
                      {originalPrice > price && (
                        <span className="text-[11px] text-stone-400 line-through">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2 px-3 rounded-full font-bold text-[12px] tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.97] ${
                        isAdded
                          ? 'bg-[#134e48] text-white ring-1 ring-[#E89A25]/50'
                          : 'bg-gradient-to-r from-[#B45309] to-[#E89A25] text-white shadow-[0_10px_24px_-8px_rgba(180,83,9,0.55)] hover:shadow-[0_14px_30px_-8px_rgba(180,83,9,0.7)] hover:-translate-y-0.5'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#E89A25]" />
                          <span>{isMarathi ? 'जोडले गेले' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isMarathi ? 'थाळीत जोडा' : 'Add to cart'}</span>
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};