import React, { useEffect, useState, useCallback } from 'react';
import { ModakProduct, CustomerOrder, StoreSettings, DeliverySlot } from './types';
import { adminApi } from './api/adminApi';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC<{ onLoggedIn: (name: string) => void }> = ({ onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await adminApi.login(email, password);
      onLoggedIn(user.name);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b2b27] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#FAF7F2] rounded-3xl border-2 border-[#E89A25]/40 shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 rounded-2xl bg-[#18564D] flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-7 h-7 text-[#EDA124]" />
          </div>
          <h1 className="text-lg font-black text-[#18564D]">Store Admin Portal</h1>
          <p className="text-xs text-gray-500">Restricted access — authorized staff only.</p>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                placeholder="admin@21kalyamodak.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] text-[#134e48] font-black text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Login to Admin CMS</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminApp: React.FC = () => {
  const [checkingSession, setCheckingSession] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);

  const [products, setProducts] = useState<ModakProduct[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [slots, setSlots] = useState<DeliverySlot[]>([]);

  const loadAll = useCallback(async () => {
    const [p, o, s, sl] = await Promise.all([
      adminApi.getProducts(),
      adminApi.getOrders(),
      adminApi.getSettings(),
      adminApi.getSlots(),
    ]);
    setProducts(p);
    setOrders(o);
    setSettings(s);
    setSlots(sl);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { user } = await adminApi.me();
        setAdminName(user.name);
        await loadAll();
      } catch {
        setAdminName(null);
      } finally {
        setCheckingSession(false);
      }
    })();
  }, [loadAll]);

  const handleLoggedIn = async (name: string) => {
    setAdminName(name);
    await loadAll();
  };

  const handleLogout = async () => {
    await adminApi.logout();
    setAdminName(null);
  };

  const handleSaveProduct = async (product: Partial<ModakProduct>) => {
    const exists = product.id && products.some((p) => p.id === product.id);
    const saved = exists
      ? await adminApi.updateProduct(product.id as string, product)
      : await adminApi.createProduct(product);
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx === -1) return [...prev, saved];
      const next = [...prev];
      next[idx] = saved;
      return next;
    });
  };

  const handleDeleteProduct = async (id: string) => {
    await adminApi.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = async (
    id: string,
    status: CustomerOrder['status'],
    paymentStatus?: CustomerOrder['paymentStatus']
  ) => {
    const updated = await adminApi.updateOrderStatus(id, status, paymentStatus);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const handleSaveSettings = async (partial: Partial<StoreSettings>) => {
    const updated = await adminApi.updateSettings(partial);
    setSettings(updated);
  };

  const handleUpdateSlots = async (newSlots: DeliverySlot[]) => {
    const updated = await adminApi.updateSlots(newSlots);
    setSlots(updated);
  };

  const handleResetDefaults = async () => {
    await loadAll();
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#0b2b27] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#EDA124] animate-spin" />
      </div>
    );
  }

  if (!adminName || !settings) {
    return <AdminLogin onLoggedIn={handleLoggedIn} />;
  }

  return (
    <AdminDashboard
      products={products}
      orders={orders}
      settings={settings}
      slots={slots}
      adminName={adminName}
      onSaveProduct={handleSaveProduct}
      onDeleteProduct={handleDeleteProduct}
      onUpdateOrderStatus={handleUpdateOrderStatus}
      onSaveSettings={handleSaveSettings}
      onUpdateSlots={handleUpdateSlots}
      onResetDefaults={handleResetDefaults}
      onLogout={handleLogout}
    />
  );
};
