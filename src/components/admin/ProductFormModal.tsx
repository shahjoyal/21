import React, { useState, useEffect } from 'react';
import { ModakProduct, ProductPriceTier } from '../../types';
import { X, Plus, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<ModakProduct>) => void;
  initialProduct?: ModakProduct | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct
}) => {
  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [category, setCategory] = useState<'ukadiche' | 'workshops_kits' | 'dryfruit_mawa' | 'sugarfree'>('ukadiche');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [marathiDescription, setMarathiDescription] = useState('');
  const [image, setImage] = useState('');
  const [pleatCount, setPleatCount] = useState(21);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isWorkshopFavorite, setIsWorkshopFavorite] = useState(false);
  const [isSignature21Kalya, setIsSignature21Kalya] = useState(false);
  const [shelfLife, setShelfLife] = useState('Fresh: 24 hours');
  const [servingSuggestion, setServingSuggestion] = useState('Serve hot with pure warm Sajuk Toop.');
  const [ingredientsText, setIngredientsText] = useState('Ambemohar Rice Flour, Fresh Coconut, Organic Jaggery, Pure Cow Ghee, Green Cardamom');
  const [caloriesPerPiece, setCaloriesPerPiece] = useState(145);
  
  const [priceTiers, setPriceTiers] = useState<ProductPriceTier[]>([
    { quantity: 7, label: 'Taster Box (7 Pcs)', price: 349, originalPrice: 385 },
    { quantity: 11, label: 'Family Box (11 Pcs)', price: 549, originalPrice: 599 },
    { quantity: 21, label: 'Signature 21 Box (21 Pcs)', price: 999, originalPrice: 1150 }
  ]);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setMarathiName(initialProduct.marathiName);
      setCategory(initialProduct.category);
      setTagline(initialProduct.tagline || '');
      setDescription(initialProduct.description || '');
      setMarathiDescription(initialProduct.marathiDescription || '');
      setImage(initialProduct.image || '');
      setPleatCount(initialProduct.pleatCount || 21);
      setIsBestseller(Boolean(initialProduct.isBestseller));
      setIsWorkshopFavorite(Boolean(initialProduct.isWorkshopFavorite));
      setIsSignature21Kalya(Boolean(initialProduct.isSignature21Kalya));
      setShelfLife(initialProduct.shelfLife || '');
      setServingSuggestion(initialProduct.servingSuggestion || '');
      setIngredientsText(initialProduct.ingredients ? initialProduct.ingredients.join(', ') : '');
      setCaloriesPerPiece(initialProduct.caloriesPerPiece || 145);
      setPriceTiers(initialProduct.priceTiers || []);
    } else {
      // Default blank template for new item
      setName('');
      setMarathiName('');
      setCategory('ukadiche');
      setTagline('');
      setDescription('');
      setMarathiDescription('');
      setImage('https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800');
      setPleatCount(21);
      setIsBestseller(false);
      setIsWorkshopFavorite(true);
      setIsSignature21Kalya(false);
      setShelfLife('Fresh: Consume within 24 hours.');
      setServingSuggestion('Serve warm with generous Sajuk Toop (pure ghee).');
      setIngredientsText('Ambemohar Rice Flour, Fresh Grated Coconut, Organic Kolhapuri Jaggery, Cardamom, A2 Cow Ghee');
      setCaloriesPerPiece(150);
      setPriceTiers([
        { quantity: 7, label: 'Taster Box (7 Pcs)', price: 349, originalPrice: 380 },
        { quantity: 11, label: 'Family Box (11 Pcs)', price: 549, originalPrice: 600 },
        { quantity: 21, label: 'Signature 21 Box (21 Pcs)', price: 999, originalPrice: 1150 }
      ]);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleTierChange = (index: number, field: keyof ProductPriceTier, value: any) => {
    const updated = [...priceTiers];
    updated[index] = { ...updated[index], [field]: value };
    setPriceTiers(updated);
  };

  const handleAddTier = () => {
    setPriceTiers([
      ...priceTiers,
      { quantity: 51, label: 'Party Box (51 Pcs)', price: 2200, originalPrice: 2500 }
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setPriceTiers(priceTiers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const ingredients = ingredientsText
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    onSave({
      id: initialProduct?.id,
      name,
      marathiName: marathiName || name,
      category,
      tagline,
      description,
      marathiDescription: marathiDescription || description,
      image: image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
      pleatCount: Number(pleatCount) || 21,
      isBestseller,
      isWorkshopFavorite,
      isSignature21Kalya,
      shelfLife,
      servingSuggestion,
      ingredients,
      caloriesPerPiece: Number(caloriesPerPiece) || 145,
      priceTiers
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EDA124]/30 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#18564D] p-5 sm:p-6 text-white flex items-center justify-between border-b border-[#EDA124]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDA124]/20 border border-[#EDA124]/50 flex items-center justify-center text-[#EDA124]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F8EDE0]">
                {initialProduct ? 'Edit Menu Item / Workshop Kit' : 'Add New Gourmet Modak / Workshop Kit'}
              </h2>
              <p className="text-xs text-[#EDA124] font-devanagari-body">
                २१ कळ्या मेनू, किट व किंमत व्यवस्थापन (Product & Workshop CMS)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                English Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Signature 21 Kalya Ukadiche Modak"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] focus:ring-1 focus:ring-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-devanagari">
                मराठी नाव (Marathi Name) *
              </label>
              <input
                type="text"
                required
                value={marathiName}
                onChange={e => setMarathiName(e.target.value)}
                placeholder="उदा. २१ कळ्यांचे अस्सल उकडीचे मोदक"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] focus:ring-1 focus:ring-[#18564D] text-sm font-devanagari font-bold"
              />
            </div>
          </div>

          {/* Category & Pleats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm bg-white font-semibold"
              >
                <option value="ukadiche">Steamed Ukadiche (उकडीचे)</option>
                <option value="workshops_kits">Workshops & DIY Kits (कार्यशाळा व किट्स)</option>
                <option value="dryfruit_mawa">Dryfruit & Mawa (खवा / ड्रायफ्रूट)</option>
                <option value="sugarfree">Sugar-Free (बिनसाखरेचे)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Pleat Folds Count (कळ्यांची संख्या)
              </label>
              <input
                type="number"
                value={pleatCount}
                onChange={e => setPleatCount(Number(e.target.value))}
                min={7}
                max={51}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Calories Per Piece
              </label>
              <input
                type="number"
                value={caloriesPerPiece}
                onChange={e => setCaloriesPerPiece(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Short Tagline / Catchphrase
            </label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="e.g. Hand-pleated with exactly 21 artisan folds. Steamed fresh every morning."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
            />
          </div>

          {/* Image URL with Preview */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Product Image URL
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
                />
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
              {image && (
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                English Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detailed craft narrative and flavor profile..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-devanagari">
                मराठी वर्णन (Marathi Description)
              </label>
              <textarea
                rows={3}
                value={marathiDescription}
                onChange={e => setMarathiDescription(e.target.value)}
                placeholder="मोदकाची चव आणि वैशिष्ट्य..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-devanagari resize-none"
              />
            </div>
          </div>

          {/* Pricing Tiers Table */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-[#18564D]">Price & Quantity Tiers</h4>
                <p className="text-xs text-amber-800">Set pack sizes (7, 11, 21, 51 pcs or DIY kits) and pricing</p>
              </div>
              <button
                type="button"
                onClick={handleAddTier}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#18564D] text-white rounded-lg text-xs font-bold hover:bg-[#13443d] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tier
              </button>
            </div>

            <div className="space-y-2">
              {priceTiers.map((tier, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-100 shadow-sm">
                  <div className="w-16">
                    <input
                      type="number"
                      value={tier.quantity}
                      onChange={e => handleTierChange(idx, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-center font-bold"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={tier.label}
                      onChange={e => handleTierChange(idx, 'label', e.target.value)}
                      placeholder="Label (e.g. Signature 21 Pcs Box)"
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={tier.price}
                      onChange={e => handleTierChange(idx, 'price', Number(e.target.value))}
                      placeholder="₹ Price"
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-[#18564D]"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={tier.originalPrice || ''}
                      onChange={e => handleTierChange(idx, 'originalPrice', Number(e.target.value))}
                      placeholder="₹ MRP (Opt)"
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500"
                    />
                  </div>
                  {priceTiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTier(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Ingredients (Comma separated)
              </label>
              <input
                type="text"
                value={ingredientsText}
                onChange={e => setIngredientsText(e.target.value)}
                placeholder="Ambemohar Rice Flour, Fresh Coconut, Pure Ghee..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Shelf Life
              </label>
              <input
                type="text"
                value={shelfLife}
                onChange={e => setShelfLife(e.target.value)}
                placeholder="Fresh: 24 hours / 7 days / 45 days (Kits)..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
          </div>

          {/* Highlight Badges Toggles */}
          <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSignature21Kalya}
                onChange={e => setIsSignature21Kalya(e.target.checked)}
                className="w-4 h-4 rounded text-[#18564D] focus:ring-[#18564D]"
              />
              <span className="text-xs font-bold text-gray-800">२१ कळ्या Signature Flag</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={e => setIsBestseller(e.target.checked)}
                className="w-4 h-4 rounded text-[#18564D] focus:ring-[#18564D]"
              />
              <span className="text-xs font-bold text-gray-800">Bestseller Badge</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isWorkshopFavorite}
                onChange={e => setIsWorkshopFavorite(e.target.checked)}
                className="w-4 h-4 rounded text-[#18564D] focus:ring-[#18564D]"
              />
              <span className="text-xs font-bold text-gray-800">Workshop & Masterclass Badge</span>
            </label>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#18564D] text-[#F8EDE0] text-sm font-bold shadow-lg hover:bg-[#13443d] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#EDA124]" />
              {initialProduct ? 'Update Item' : 'Create Item'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
