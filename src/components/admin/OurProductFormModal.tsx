import React, { useState, useEffect } from 'react';
import { OurProduct } from '../../types';
import { X } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface OurProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<OurProduct>) => void;
  initialProduct?: OurProduct | null;
}

export const OurProductFormModal: React.FC<OurProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const [name, setName] = useState('');
  const [marathiName, setMarathiName] = useState('');
  const [description, setDescription] = useState('');
  const [marathiDescription, setMarathiDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(199);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setMarathiName(initialProduct.marathiName || '');
      setDescription(initialProduct.description || '');
      setMarathiDescription(initialProduct.marathiDescription || '');
      setUnit(initialProduct.unit || '');
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice ?? '');
      setImage(initialProduct.image || '');
      setInStock(initialProduct.inStock);
    } else {
      setName('');
      setMarathiName('');
      setDescription('');
      setMarathiDescription('');
      setUnit('500g');
      setPrice(199);
      setOriginalPrice('');
      setImage('');
      setInStock(true);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    onSave({
      id: initialProduct?.id,
      name,
      marathiName: marathiName || name,
      description,
      marathiDescription,
      unit,
      price: Number(price),
      originalPrice: originalPrice === '' ? undefined : Number(originalPrice),
      image,
      inStock,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-black text-[#18564D]">
            {initialProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-4">

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Name (English)</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)} required
                placeholder="e.g. Ambemohar Rice Flour"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Name (Marathi)</label>
              <input
                type="text" value={marathiName} onChange={(e) => setMarathiName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
          </div>

          {/* Image */}
          <ImageUploadField label="Product Photo" value={image} onChange={setImage} />

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description (English)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description (Marathi)</label>
            <textarea value={marathiDescription} onChange={(e) => setMarathiDescription(e.target.value)} rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none" />
          </div>

          {/* Unit / Price / Original Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Unit / Size</label>
              <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="500g"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Price (₹)</label>
              <input type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Original Price</label>
              <input type="number" min={0} value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4 accent-[#18564D]" />
            In stock
          </label>

        </form>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
          <button onClick={onClose} type="button" className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} type="button" className="px-6 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-sm font-bold shadow-sm transition-colors">
            {initialProduct ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};
