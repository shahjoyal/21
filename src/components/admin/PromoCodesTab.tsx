import React, { useEffect, useState } from 'react';
import { PromoCode } from '../../types';
import { adminApi } from '../../api/adminApi';
import { Tag, Plus, Trash2, Loader2, Check, X, Percent } from 'lucide-react';

export const PromoCodesTab: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // New promo code form
  const [newCode, setNewCode] = useState('');
  const [newPercent, setNewPercent] = useState('');
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadPromoCodes = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await adminApi.getPromoCodes();
      setPromoCodes(data);
    } catch (err: any) {
      setLoadError(err.message || 'Could not load promo codes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPromoCodes();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const code = newCode.trim().toUpperCase();
    const percent = Number(newPercent);

    if (!code) {
      setFormError('Enter a promo code, e.g. FIRST50');
      return;
    }
    if (!Number.isFinite(percent) || percent < 1 || percent > 100) {
      setFormError('Enter a percent off between 1 and 100');
      return;
    }

    setIsSaving(true);
    try {
      const created = await adminApi.createPromoCode(code, percent);
      setPromoCodes(prev => [created, ...prev]);
      setNewCode('');
      setNewPercent('');
    } catch (err: any) {
      setFormError(err.message || 'Could not create promo code.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (promo: PromoCode) => {
    try {
      const updated = await adminApi.updatePromoCode(promo.id, { active: !promo.active });
      setPromoCodes(prev => prev.map(p => (p.id === promo.id ? updated : p)));
    } catch (err: any) {
      alert(err.message || 'Could not update promo code.');
    }
  };

  const handleDelete = async (promo: PromoCode) => {
    if (!confirm(`Delete promo code "${promo.code}"? This can't be undone.`)) return;
    try {
      await adminApi.deletePromoCode(promo.id);
      setPromoCodes(prev => prev.filter(p => p.id !== promo.id));
    } catch (err: any) {
      alert(err.message || 'Could not delete promo code.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Create Form */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-black text-[#18564D] flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-[#EDA124]" />
          Add a New Promo Code
        </h3>
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-gray-500 mb-1">Code</label>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="e.g. FIRST50"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold uppercase tracking-wide focus:outline-none focus:border-[#18564D]"
            />
          </div>
          <div className="sm:w-40">
            <label className="block text-[11px] font-bold text-gray-500 mb-1">Percent Off</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={100}
                value={newPercent}
                onChange={(e) => setNewPercent(e.target.value)}
                placeholder="50"
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:border-[#18564D]"
              />
              <Percent className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white font-bold text-sm shadow-sm active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>Add Code</span>
          </button>
        </form>
        {formError && <p className="text-xs font-semibold text-red-600 mt-2">{formError}</p>}
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-gray-200">
          <h3 className="text-sm font-black text-[#18564D]">Active & Past Promo Codes ({promoCodes.length})</h3>
        </div>

        {isLoading ? (
          <div className="p-8 flex items-center justify-center text-gray-400 gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading promo codes...
          </div>
        ) : loadError ? (
          <div className="p-8 text-center text-sm text-red-600 font-semibold">{loadError}</div>
        ) : promoCodes.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            No promo codes yet — add one above to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {promoCodes.map((promo) => (
              <div key={promo.id} className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    promo.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-black text-sm text-gray-900 block truncate">{promo.code}</span>
                    <span className="text-xs text-gray-500 font-semibold">{promo.percentOff}% off</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleActive(promo)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors ${
                      promo.active
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {promo.active ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {promo.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleDelete(promo)}
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                    aria-label={`Delete ${promo.code}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
