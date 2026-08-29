import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { ModakProduct } from '../types';
import { Reveal } from './Reveal';

interface SignatureCollectionCarouselProps {
  language: 'en' | 'mr';
}

// Premium fade + rise + scale-in reveal — replays every time the row
// re-enters the viewport (scrolling up OR down), for that "alive" feel.
const cardRevealVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Homepage teaser for the shop menu — a compact, centered 4-card showcase
 * (image, badge, rating, name, tagline, "Want to Buy" CTA). Clicking a
 * card, or its button, takes the visitor to the full shop page.
 */
export const SignatureCollectionCarousel: React.FC<SignatureCollectionCarouselProps> = ({ language }) => {
  const isMarathi = language === 'mr';
  const navigate = useNavigate();

  // Signature + bestsellers first, then take the top 4 for a tight showcase.
  const featuredProducts: ModakProduct[] = [...PRODUCTS]
    .sort((a, b) => {
      if (a.isSignature21Kalya && !b.isSignature21Kalya) return -1;
      if (b.isSignature21Kalya && !a.isSignature21Kalya) return 1;
      if (a.isBestseller && !b.isBestseller) return -1;
      if (b.isBestseller && !a.isBestseller) return 1;
      return 0;
    })
    .slice(0, 4);

  const goToShop = () => {
    navigate('/shop');
  };

  const getBadge = (product: ModakProduct) => {
    if (product.isSignature21Kalya) {
      return { label: isMarathi ? 'सिग्नेचर' : 'Signature', className: 'bg-[#134e48] text-[#F3D48A]' };
    }
    if (product.isBestseller) {
      return { label: isMarathi ? 'सर्वाधिक पसंती' : 'Bestseller', className: 'bg-[#E89A25] text-[#134e48]' };
    }
    if (product.dietary.some((d) => /sugar[- ]free|no added sugar/i.test(d))) {
      return { label: isMarathi ? 'साखरमुक्त' : 'Sugar-Free', className: 'bg-emerald-600 text-white' };
    }
    if (product.isNew) {
      return { label: isMarathi ? 'नवीन' : 'New', className: 'bg-rose-500 text-white' };
    }
    return { label: isMarathi ? 'पारंपारिक' : 'Traditional', className: 'bg-white/90 text-[#134e48]' };
  };

  return (
    <section id="signature-collection" className="py-10 sm:py-16 bg-[#FAF7F2] relative w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">

        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? 'सिग्नेचर संकलन' : 'Signature Collection'}
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight">
            {isMarathi ? 'आमचे सर्वोत्तम मोदक' : 'Our Finest Modaks'}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'प्रत्येक प्रकार पारंपरिक पाककृती व भारतभरातून आणलेल्या उत्तम घटकांसह काळजीपूर्वक तयार केला जातो.'
              : 'Each variant is crafted with care, using time-honored recipes and the finest ingredients sourced from across India.'}
          </p>
        </Reveal>

        {/* Centered 4-card showcase */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-7 justify-items-center max-w-5xl mx-auto">
          {featuredProducts.map((product, index) => {
            const badge = getBadge(product);
            const roundedRating = Math.round(product.rating);

            return (
              <motion.div
                key={product.id}
                custom={index}
                variants={cardRevealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.35 }}
                whileHover={{ y: -6 }}
                onClick={() => goToShop()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') goToShop();
                }}
                className="w-full max-w-[270px] bg-white rounded-2xl overflow-hidden group relative cursor-pointer transition-shadow duration-500 shadow-[0_1px_2px_rgba(19,78,72,0.06),0_1px_10px_rgba(19,78,72,0.05)] hover:shadow-[0_20px_45px_-16px_rgba(19,78,72,0.35)] ring-1 ring-black/[0.06] hover:ring-[#E89A25]/50"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={isMarathi ? product.marathiName : product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge — top-left pill */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-[0_1px_4px_rgba(0,0,0,0.15)] ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1.5">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < roundedRating ? 'fill-[#E89A25] text-[#E89A25]' : 'fill-transparent text-gray-300'}`}
                      />
                    ))}
                  </div>

                  <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-[#134e48] leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-devanagari-body text-[13px] text-gray-500 leading-snug line-clamp-1">
                    {product.marathiName}
                  </p>

                  <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-2 min-h-[36px]">
                    {isMarathi ? product.marathiDescription : product.tagline}
                  </p>

                  {/* Want to Buy Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToShop();
                    }}
                    className="w-full mt-2 py-3 px-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97] bg-[#134e48] text-white hover:bg-[#0f3c36] shadow-[0_10px_24px_-10px_rgba(19,78,72,0.6)] hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E89A25]" />
                    <span>{isMarathi ? 'खरेदी करा' : 'Want to Buy'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Menu link */}
        <div className="text-center mt-8 sm:mt-10">
          <button
            type="button"
            onClick={() => goToShop()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#134e48] text-[#134e48] font-bold text-xs sm:text-sm uppercase tracking-wide hover:bg-[#134e48] hover:text-white transition-all cursor-pointer active:scale-[0.97]"
          >
            <span>{isMarathi ? 'संपूर्ण मेन्यू पहा' : 'View Full Menu'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};