import React, { useState } from 'react';
import { CartItem, ModakProduct, ProductPriceTier } from '../types';
import { Plus, Check, ShoppingBag, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BundleItem {
  id: string;
  name: string;
  marathiName: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  tier: ProductPriceTier;
  category: string;
}

interface FrequentlyBoughtTogetherProps {
  mainProduct?: ModakProduct;
  onAddToCart: (item: CartItem) => void;
  language: 'en' | 'mr';
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  mainProduct,
  onAddToCart,
  language,
}) => {
  const isMarathi = language === 'mr';

  // Default bundle items
  const bundleItems: BundleItem[] = [
    {
      id: mainProduct?.id || 'signature-21-kalya-ukadiche',
      name: mainProduct?.name || 'Signature 21 Kalya Ukadiche Modak (11 Pcs)',
      marathiName: mainProduct?.marathiName || '२१ कळ्यांचे अस्सल उकडीचे मोदक (११ नग)',
      image: mainProduct?.image || 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=400&q=80',
      price: mainProduct?.priceTiers[1]?.price || 549,
      originalPrice: mainProduct?.priceTiers[1]?.originalPrice || 599,
      description: isMarathi ? 'अस्सल उकडीचे मोदक' : 'Freshly steamed 21-fold modaks',
      tier: mainProduct?.priceTiers[1] || { quantity: 11, label: 'Family Box (11 Pcs)', price: 549, originalPrice: 599 },
      category: 'modak'
    },
    {
      id: 'addon-pure-a2-ghee-pot',
      name: 'Pure Gir Cow A2 Sajuk Ghee Drizzle Jar (150ml)',
      marathiName: 'अस्सल गिर गायीचे साजूक तूप (१५० मिली)',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
      price: 249,
      originalPrice: 299,
      description: isMarathi ? 'मोदकांवर ओतण्यासाठी सुगंधी तूप' : 'Bilona method pure cow ghee for warm modak drizzle',
      tier: { quantity: 1, label: '150ml Glass Jar', price: 249, originalPrice: 299 },
      category: 'addon'
    },
    {
      id: 'addon-kashmiri-saffron-vial',
      name: 'Kashmiri Mogra Saffron & Cardamom Spice Vial (1g)',
      marathiName: 'काश्मिरी मोगरा केशर व वेलची अर्क (१ ग्रॅम)',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
      price: 349,
      originalPrice: 399,
      description: isMarathi ? 'अस्सल काश्मिरी केशर' : 'Grade A1 pure saffron strands for royal pooja aroma',
      tier: { quantity: 1, label: '1g Royal Vial', price: 349, originalPrice: 399 },
      category: 'addon'
    }
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>(bundleItems.map((b) => b.id));

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const selectedItems = bundleItems.filter((b) => selectedIds.includes(b.id));
  const bundleTotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const bundleOriginalTotal = selectedItems.reduce((acc, item) => acc + item.originalPrice, 0);
  const savings = bundleOriginalTotal - bundleTotal;

  const handleAddBundle = () => {
    selectedItems.forEach((item) => {
      const cartItem: CartItem = {
        id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: item.id,
        name: isMarathi ? item.marathiName : item.name,
        marathiName: item.marathiName,
        image: item.image,
        tier: item.tier,
        unitPrice: item.price,
        quantity: 1,
      };
      onAddToCart(cartItem);
    });

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E89A25]/40 p-4 sm:p-7 shadow-lg relative overflow-hidden my-8 w-full max-w-full">
      {/* Decorative Gold Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#134e48] text-[#E89A25] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'वारंवार एकत्र खरेदी केले जाणारे' : 'Frequently Bought Together'}</span>
          </div>
          <h3 className="font-devanagari text-lg sm:text-xl font-bold text-[#134e48]">
            {isMarathi ? 'अस्सल पूजा व नैवेद्य कॉम्बो बंडल' : 'The Royal Modak Connoisseur Bundle'}
          </h3>
        </div>

        {savings > 0 && (
          <span className="px-3 py-1 rounded-full bg-[#E89A25] text-[#134e48] text-xs font-black uppercase tracking-wider shadow-xs">
            {isMarathi ? `बंडल बचत: ₹${savings}` : `Bundle Savings: ₹${savings} OFF`}
          </span>
        )}
      </div>

      {/* Bundle Product Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-5">
        
        {/* Products Visual Chain */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 overflow-x-auto pb-2 w-full max-w-full">
          {bundleItems.map((item, idx) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <div className="w-7 h-7 rounded-full bg-[#134e48]/10 text-[#134e48] flex items-center justify-center font-bold text-xs shrink-0 self-center my-1 sm:my-0">
                    <Plus className="w-4 h-4" />
                  </div>
                )}

                <div
                  onClick={() => toggleItem(item.id)}
                  className={`w-full sm:w-52 p-3 rounded-2xl border-2 transition-all cursor-pointer flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 relative group min-w-0 ${
                    isSelected
                      ? 'bg-white border-[#134e48] shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-full sm:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute top-2 left-2 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#134e48] text-[#FAF7F2]' : 'bg-white border border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-devanagari font-bold text-xs text-[#134e48] line-clamp-2 leading-tight">
                      {isMarathi ? item.marathiName : item.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-black text-sm text-[#134e48]">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Pricing Summary & Add Button */}
        <div className="lg:col-span-4 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E89A25]/40 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[11px] text-gray-600 font-semibold block uppercase tracking-wider">
              {isMarathi ? `एकूण किंमत (${selectedItems.length} घटक):` : `Bundle Price (${selectedItems.length} items):`}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-[#134e48]">
                ₹{bundleTotal}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{bundleOriginalTotal}
              </span>
            </div>
            {savings > 0 && (
              <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMarathi ? `तुम्ही वाचवले ₹${savings}!` : `You Save ₹${savings} with this bundle!`}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full py-3.5 px-4 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-black text-sm shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isMarathi ? 'सर्व बंडल थाळीत जोडा' : 'Add Bundle to Cart'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
