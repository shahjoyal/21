import React, { useState } from 'react';
import { ModakProduct, CartItem, ProductPriceTier } from '../types';
import { X, Star, Sparkles, ShieldCheck, Flame, ShoppingBag, Clock, Heart, CheckCircle2, Leaf, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductDetailModalProps {
  product: ModakProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  language: 'en' | 'mr';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  language,
}) => {
  if (!product) return null;

  const isMarathi = language === 'mr';
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(0);
  const currentTier = product.priceTiers[selectedTierIdx] || product.priceTiers[0];

  const price = currentTier.price;
  const originalPrice = currentTier.originalPrice || Math.round(price * 1.15);
  const savings = originalPrice - price;

  const handleAdd = () => {
    const item: CartItem = {
      id: `${product.id}-${currentTier.quantity}-${Date.now()}`,
      productId: product.id,
      name: isMarathi ? product.marathiName : product.name,
      marathiName: product.marathiName,
      image: product.image,
      tier: currentTier,
      unitPrice: currentTier.price,
      quantity: 1,
    };
    onAddToCart(item);
    onClose();

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF7F2] w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border-2 border-[#E89A25]/50 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-12">
          
          {/* Product Media Column */}
          <div className="sm:col-span-5 relative h-64 sm:h-auto bg-gray-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-[#E89A25] text-[#134e48] inline-block mb-1.5 shadow-sm">
                {product.pleatCount} {isMarathi ? 'अचूक कळ्या' : 'Sacred Pleats'}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <Star className="w-4 h-4 fill-[#E89A25] text-[#E89A25]" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-white/70 text-[10px]">({product.reviewCount} {isMarathi ? 'समीक्षा' : 'reviews'})</span>
              </div>
            </div>
          </div>

          {/* Product Details Column */}
          <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#FAF7F2]">
            
            <div className="space-y-3">
              <div>
                <h3 className="font-devanagari text-xl sm:text-2xl font-black text-[#134e48] leading-tight">
                  {isMarathi ? product.marathiName : product.name}
                </h3>
                <p className="text-xs font-semibold text-[#B45309] mt-0.5">
                  {isMarathi ? product.tagline : product.name}
                </p>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                {isMarathi ? product.marathiDescription : product.description}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-[#134e48] bg-white p-2.5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Pure Vegetarian</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E89A25] shrink-0" />
                  <span>Freshly Steamed Daily</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Pure Gir Cow A2 Ghee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Same Day Express Slot</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  {isMarathi ? 'मुख्य सात्विक साहित्य (Ingredients):' : 'Key Sattvic Ingredients:'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-gray-200 text-gray-700 text-[10px] font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Serving & Shelf Life Note */}
              <div className="text-[11px] text-gray-600 space-y-1 bg-[#134e48]/5 p-2.5 rounded-xl border border-[#134e48]/15">
                <div className="flex items-start gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E89A25] shrink-0 mt-0.5" />
                  <span>
                    <strong>{isMarathi ? 'वाफवण्याची पद्धत:' : 'Serving Tip:'}</strong> {product.servingSuggestion}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#134e48] shrink-0 mt-0.5" />
                  <span>
                    <strong>{isMarathi ? 'टिकण्याची मुदत:' : 'Shelf Life:'}</strong> {product.shelfLife}
                  </span>
                </div>
              </div>

              {/* Tier Selector */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  {isMarathi ? 'पेटीचा आकार निवडा:' : 'Choose Pack Size:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.priceTiers.map((tier, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTierIdx(idx)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedTierIdx === idx
                          ? 'border-[#134e48] bg-[#134e48] text-[#FAF7F2] font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="block text-xs">{tier.quantity} {isMarathi ? 'मोदक' : 'pcs'}</span>
                      <span className={`block text-xs font-extrabold ${selectedTierIdx === idx ? 'text-[#E89A25]' : 'text-[#134e48]'}`}>
                        ₹{tier.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart with High Visibility Pricing */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold block">
                  {currentTier.label}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#134e48]">
                    ₹{price}
                  </span>
                  {originalPrice > price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Save ₹{savings}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] hover:from-[#d98c1a] hover:to-[#e89a25] text-[#134e48] font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isMarathi ? 'थाळीत जोडा' : 'Add to Cart'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
