import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storeApi } from '../api/storeApi';
import { CustomerOrder } from '../types';
import { OutletContextType } from './Layout';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { Reveal } from '../components/Reveal';
import {
  PackageSearch,
  ChevronDown,
  Loader2,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  Tag,
  ShoppingBag,
} from 'lucide-react';

const statusPillClasses: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  packed: 'bg-orange-100 text-orange-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  out_for_delivery: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<string, string> = {
  pending: 'Order Received',
  confirmed: 'Confirmed',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function MyOrdersPage() {
  const ctx = useOutletContext<OutletContextType>();
  const { language } = ctx;
  const isMarathi = language === 'mr';
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/');
      return;
    }

    (async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const data = await storeApi.getMyOrders();
        setOrders(data);
      } catch (err: any) {
        setLoadError(err.message || 'Could not load your orders.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, authLoading, navigate]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#134e48]" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-1">
            <PackageSearch className="w-6 h-6 text-[#E89A25]" />
            <h1 className="font-devanagari text-2xl sm:text-3xl font-black text-[#134e48]">
              {isMarathi ? 'माझ्या ऑर्डर्स' : 'My Orders'}
            </h1>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            {isMarathi
              ? 'तुमच्या सर्व ऑर्डर्सचा इतिहास आणि सद्यस्थिती इथे पहा.'
              : 'Track live order status and browse your full order history.'}
          </p>
        </Reveal>

        {isLoading ? (
          <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-semibold">
              {isMarathi ? 'ऑर्डर्स लोड होत आहेत...' : 'Loading your orders...'}
            </span>
          </div>
        ) : loadError ? (
          <div className="py-16 text-center">
            <p className="text-sm font-semibold text-red-600 mb-3">{loadError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#134e48] text-white text-xs font-bold"
            >
              {isMarathi ? 'पुन्हा प्रयत्न करा' : 'Retry'}
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-[#E89A25]/30 space-y-3">
            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="text-sm font-bold text-gray-700">
              {isMarathi ? 'अजून कोणतीही ऑर्डर नाही' : "You haven't placed any orders yet"}
            </h3>
            <button
              onClick={() => navigate('/shop')}
              className="px-5 py-2.5 rounded-xl bg-[#E89A25] text-[#134e48] text-xs font-black shadow-sm"
            >
              {isMarathi ? 'खरेदी सुरू करा' : 'Start Shopping'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isOpen = expandedId === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* Header row — always visible */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : order.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-extrabold text-[#134e48]">
                          #{order.orderNumber}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            statusPillClasses[order.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {statusLabels[order.status] || order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        • {order.items.length} item(s) • ₹{order.total}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-gray-100 pt-4">
                      {/* Status Tracker */}
                      <OrderStatusTracker status={order.status} />

                      {/* Delivery Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-gray-200 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                            <Calendar className="w-3.5 h-3.5 text-[#E89A25]" />
                            {isMarathi ? 'डिलिव्हरी' : 'Delivery'}
                          </div>
                          <p className="text-gray-700">{order.deliveryDate} • {order.deliverySlot}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-gray-200 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-gray-600 font-bold">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            {isMarathi ? 'पत्ता' : 'Address'}
                          </div>
                          <p className="text-gray-700 leading-tight">
                            {order.address}, {order.city} - {order.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden border border-gray-200 shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-xs font-bold text-gray-900 truncate">{item.name}</h5>
                                <p className="text-[11px] text-gray-500">{item.tier.label} × {item.quantity}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-gray-900 shrink-0">
                              ₹{item.unitPrice * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Payment Summary */}
                      <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-gray-200 space-y-1.5 text-xs">
                        <div className="flex justify-between text-gray-600">
                          <span>{isMarathi ? 'उपएकूण' : 'Subtotal'}</span>
                          <span className="font-bold text-gray-900">₹{order.subtotal}</span>
                        </div>
                        {order.discountAmount ? (
                          <div className="flex justify-between text-emerald-700">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" /> {order.promoCode}
                            </span>
                            <span className="font-bold">−₹{order.discountAmount}</span>
                          </div>
                        ) : null}
                        <div className="flex justify-between text-gray-600">
                          <span>{isMarathi ? 'डिलिव्हरी शुल्क' : 'Delivery Fee'}</span>
                          <span className="font-bold text-gray-900">
                            {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-[#134e48] pt-1.5 border-t border-gray-200">
                          <span>{isMarathi ? 'एकूण' : 'Total'}</span>
                          <span>₹{order.total}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 pt-1">
                          <CreditCard className="w-3 h-3" />
                          <span className="uppercase font-bold">{order.paymentMethod}</span>
                          <span>•</span>
                          <span className="capitalize">{order.paymentStatus}</span>
                        </div>
                      </div>

                      {order.phone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Phone className="w-3 h-3" /> {order.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
