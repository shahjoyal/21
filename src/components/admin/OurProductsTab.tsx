import React, { useEffect, useState } from 'react';
import { OurProduct } from '../../types';
import { adminApi } from '../../api/adminApi';
import { OurProductFormModal } from './OurProductFormModal';
import { Plus, Edit2, Trash2, Loader2, IndianRupee, PackageX } from 'lucide-react';

export const OurProductsTab: React.FC = () => {
  const [products, setProducts] = useState<OurProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<OurProduct | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await adminApi.getOurProducts();
      setProducts(data);
    } catch (err: any) {
      setLoadError(err.message || 'Could not load products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: OurProduct) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSave = async (product: Partial<OurProduct>) => {
    try {
      if (editingProduct) {
        const updated = await adminApi.updateOurProduct(editingProduct.id, product);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await adminApi.createOurProduct(product);
        setProducts((prev) => [...prev, created]);
      }
    } catch (err: any) {
      alert(err.message || 'Could not save product.');
    }
  };

  const handleDelete = async (p: OurProduct) => {
    if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    try {
      await adminApi.deleteOurProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err: any) {
      alert(err.message || 'Could not delete product.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#18564D]">Our Products ({products.length})</h3>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="p-10 flex items-center justify-center text-gray-400 gap-2 text-sm bg-white rounded-3xl border border-gray-200">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading products...
        </div>
      ) : loadError ? (
        <div className="p-10 text-center text-sm text-red-600 font-semibold bg-white rounded-3xl border border-gray-200">{loadError}</div>
      ) : products.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300">
          No products in the database yet. Note: the site is currently showing bundled sample products (flour, kesar, rose syrup) —
          add your real ones here and they'll replace those automatically.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-32 bg-gray-100 relative">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">No Image</div>
                )}
                {!p.inStock && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase flex items-center gap-1">
                    <PackageX className="w-3 h-3" /> Out of Stock
                  </span>
                )}
              </div>
              <div className="p-3.5 flex flex-col gap-2 flex-1">
                <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{p.name}</h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{p.price}</span>
                  {p.unit && <span>{p.unit}</span>}
                  {p.originalPrice && <span className="line-through text-gray-400">₹{p.originalPrice}</span>}
                </div>
                <div className="mt-auto pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold transition-colors"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    aria-label={`Delete ${p.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <OurProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialProduct={editingProduct}
      />
    </div>
  );
};
