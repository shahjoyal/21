import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { ChevronRight, ShoppingBag, PackageX, Check, Wheat } from 'lucide-react';
import { Reveal, RevealGroup, revealItemVariants } from '../components/Reveal';
import { storeApi } from '../api/storeApi';
import { OurProduct, CartItem } from '../types';
import { OutletContextType } from './Layout';

export default function OurProductsPage() {
  const ctx = useOutletContext<OutletContextType>();
  const isMarathi = ctx.language === 'mr';

  const [products, setProducts] = useState<OurProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    storeApi.getOurProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  const handleAddToCart = (product: OurProduct, e: React.MouseEvent) => {
    if (!product.inStock) return;

    const cartItem: CartItem = {
      id: `our-product-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      marathiName: product.marathiName,
      image: product.image,
      tier: {
        quantity: 1,
        label: product.unit,
        price: product.price,
        originalPrice: product.originalPrice,
      },
      unitPrice: product.price,
      quantity: 1,
    };

    ctx.onAddToCart(cartItem);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1500);

    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: rect.left / window.innerWidth, y: rect.top / window.innerHeight },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="w-full max-w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3c36] via-[#134e48] to-[#0f3c36] text-white pt-10 sm:pt-14 pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white/70 mb-3">
            <Link to="/" className="text-[#E89A25] hover:text-[#f5b455] transition-colors">
              {isMarathi ? 'मुख्यपृष्ठ' : 'Home'}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">{isMarathi ? 'आमची उत्पादने' : 'Our Products'}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E89A25]/50 bg-[#E89A25]/10 mb-4">
            <Wheat className="w-3.5 h-3.5 text-[#E89A25]" />
            <span className="text-[#F5EEDB] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              {isMarathi ? 'पँट्री आवश्यक वस्तू' : 'Pantry Essentials'}
            </span>
          </div>

          <h1 className="font-devanagari text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {isMarathi ? 'आमची उत्पादने' : 'Our Products'}
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            {isMarathi
              ? 'तेच शुद्ध साहित्य जे आम्ही आमच्या स्वयंपाकघरात वापरतो — आता तुमच्या घरच्या स्वयंपाकघरासाठी.'
              : 'The same pure ingredients we use in our own kitchen — now for yours. Flour, saffron, syrups, and more.'}
          </p>
        </div>

        <div className="absolute -bottom-px left-0 right-0 h-14 sm:h-20 lg:h-28 pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,60 L0,30 C250,60 450,0 600,0 C750,0 950,60 1200,30 L1200,60 Z"
              fill="#FBF6EA"
            />
          </svg>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-[#FBF6EA] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {isMarathi ? 'उत्पादने लोड होत आहेत...' : 'Loading products...'}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {isMarathi ? 'सध्या कोणतीही उत्पादने उपलब्ध नाहीत.' : 'No products available right now.'}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.08 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={revealItemVariants}
                  className="bg-white rounded-2xl border border-[#E89A25]/20 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-36 sm:h-44 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-white text-[#134e48] text-[10px] font-black uppercase flex items-center gap-1">
                          <PackageX className="w-3 h-3" /> {isMarathi ? 'स्टॉक संपला' : 'Out of Stock'}
                        </span>
                      </div>
                    )}
                    {product.originalPrice && product.inStock && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#E89A25] text-[#134e48] text-[9px] font-black uppercase shadow-sm">
                        {isMarathi ? 'सवलत' : 'Sale'}
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1">
                    <h3 className="font-devanagari text-xs sm:text-sm font-bold text-[#134e48] leading-snug line-clamp-2">
                      {isMarathi ? product.marathiName : product.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-2 leading-snug">
                      {isMarathi ? product.marathiDescription : product.description}
                    </p>

                    <div className="mt-auto pt-2.5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        {product.unit && (
                          <span className="text-[9px] text-gray-400 font-bold uppercase block">{product.unit}</span>
                        )}
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-sm sm:text-base font-black text-[#134e48]">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all active:scale-90 ${
                          !product.inStock
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : addedId === product.id
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48]'
                        }`}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {addedId === product.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
