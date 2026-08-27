import React, { useState } from 'react';
import brandLogoImg from '../../assets/images/regenerated_image_1787347112518.png';
import { ModakProduct, CustomerOrder, StoreSettings, DeliverySlot } from '../../types';
import { ProductFormModal } from './ProductFormModal';
import { OrderDetailsModal } from './OrderDetailsModal';
import { StoreSettingsTab } from './StoreSettingsTab';
import {
  Package,
  ShoppingBag,
  Clock,
  Settings,
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  ChefHat,
  Sparkles,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  Eye,
  Layers
} from 'lucide-react';

interface AdminDashboardProps {
  products: ModakProduct[];
  orders: CustomerOrder[];
  settings: StoreSettings;
  slots: DeliverySlot[];
  adminName?: string;
  onSaveProduct: (product: Partial<ModakProduct>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: CustomerOrder['status'], paymentStatus?: CustomerOrder['paymentStatus']) => void;
  onSaveSettings: (settings: Partial<StoreSettings>) => void;
  onUpdateSlots: (slots: DeliverySlot[]) => void;
  onResetDefaults: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  settings,
  slots,
  adminName,
  onSaveProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onSaveSettings,
  onUpdateSlots,
  onResetDefaults,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'slots' | 'settings'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ModakProduct | null>(null);

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Metrics
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, curr) => acc + (curr.total || 0), 0);
  
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
  const inTransitCount = orders.filter(o => ['packed', 'shipped', 'out_for_delivery'].includes(o.status)).length;

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.marathiName.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const matchesSearch = o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ModakProduct) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  const handleDuplicateProduct = (prod: ModakProduct) => {
    const copy: Partial<ModakProduct> = {
      ...prod,
      id: `modak-${Date.now()}`,
      name: `${prod.name} (Copy)`,
      marathiName: `${prod.marathiName} (प्रत)`
    };
    onSaveProduct(copy);
  };

  const handleToggleSlotAvailability = (slotId: string) => {
    const updated = slots.map(s => s.id === slotId ? { ...s, available: !s.available } : s);
    onUpdateSlots(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-900 flex flex-col font-sans">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#18564D] border-b border-[#EDA124]/30 shadow-md text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18564D] border border-[#EDA124]/50 flex items-center justify-center p-1 shadow-inner">
              <img src={brandLogoImg} alt="21 Kalya Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-devanagari font-black text-lg sm:text-xl text-[#F8EDE0]">
                  २१ कळ्या Modak
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#EDA124] text-gray-950 text-[10px] font-extrabold tracking-wider uppercase">
                  Admin CMS
                </span>
              </div>
              <span className="text-[10px] text-[#EDA124] font-semibold tracking-wider font-devanagari-body block">
                व्यवस्थापन केंद्र • स्वादः परमानन्दः
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              REST API Connected
            </div>

            {adminName && (
              <span className="hidden sm:inline text-xs font-bold text-[#F8EDE0]/80">
                {adminName}
              </span>
            )}

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#F8EDE0] rounded-xl text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Storefront</span>
            </a>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EDA124] hover:bg-[#ffb03a] text-gray-950 rounded-xl text-xs font-extrabold shadow-md transition-all"
            >
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Menu Items</span>
              <span className="text-2xl sm:text-3xl font-black text-[#18564D] mt-1 block">{products.length}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">Active & Customizable</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#EDA124] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Pending / Confirmed</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">{pendingOrdersCount}</span>
              <span className="text-[11px] text-gray-500">Pooja Orders in Queue</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Packed / Shipped / Out for Delivery</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-600 mt-1 block">{inTransitCount}</span>
              <span className="text-[11px] text-orange-600 font-semibold">In the Dispatch Pipeline</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Total Store Revenue</span>
              <span className="text-2xl sm:text-3xl font-black text-[#18564D] mt-1 block">₹{totalRevenue.toLocaleString()}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">From {orders.length} order(s)</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-[#18564D] text-[#F8EDE0] shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Menu ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#18564D] text-[#F8EDE0] shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#EDA124] text-gray-950 text-[10px] font-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'slots'
                ? 'bg-[#18564D] text-[#F8EDE0] shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Steaming Slots & Batches</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#18564D] text-[#F8EDE0] shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings & WhatsApp</span>
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Action Bar */}
            <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    placeholder="Search modak menu..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#18564D]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-[#18564D]"
                >
                  <option value="all">All Categories</option>
                  <option value="ukadiche">Steamed Ukadiche</option>
                  <option value="dryfruit_mawa">Dryfruit & Mawa</option>
                  <option value="sugarfree">Sugar-Free</option>
                </select>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#18564D] text-[#F8EDE0] rounded-xl text-xs font-bold shadow-md hover:bg-[#13443d] transition-all"
              >
                <Plus className="w-4 h-4 text-[#EDA124]" /> Add New Modak Item
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => {
                const lowestTier = product.priceTiers[0];
                const highestTier = product.priceTiers[product.priceTiers.length - 1];

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#EDA124]/60 transition-all group"
                  >
                    <div>
                      {/* Image & Tags */}
                      <div className="relative h-44 bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          {product.isSignature21Kalya && (
                            <span className="px-2 py-0.5 bg-[#18564D] text-[#EDA124] text-[10px] font-black rounded-md border border-[#EDA124]/40 shadow-sm">
                              २१ कळ्या Signature
                            </span>
                          )}
                          {product.isBestseller && (
                            <span className="px-2 py-0.5 bg-[#EDA124] text-gray-950 text-[10px] font-extrabold rounded-md shadow-sm">
                              Bestseller
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                          {product.pleatCount} Folds
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#EDA124] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h4 className="text-base font-bold text-gray-900 leading-snug">
                            {product.name}
                          </h4>
                          <span className="text-xs text-[#18564D] font-devanagari font-bold block">
                            {product.marathiName}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Price Tiers Preview */}
                        <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
                          <span className="font-semibold text-gray-600">
                            {lowestTier?.quantity} to {highestTier?.quantity} Pcs
                          </span>
                          <span className="font-extrabold text-[#18564D]">
                            ₹{lowestTier?.price} – ₹{highestTier?.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleDuplicateProduct(product)}
                        className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200/60 transition-colors"
                        title="Duplicate Modak"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProduct(product)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#18564D] text-[#F8EDE0] text-xs font-bold rounded-lg hover:bg-[#13443d] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#EDA124]" /> Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                              onDeleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Tab 2: Orders & Inquiries */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    placeholder="Search by customer name, phone..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#18564D]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-[#18564D]"
                >
                  <option value="all">All Order Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <span className="text-xs font-bold text-gray-500">
                Showing {filteredOrders.length} order(s)
              </span>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <h4 className="text-base font-bold text-gray-700">No orders found</h4>
                <p className="text-xs text-gray-500">New customer orders and pre-bookings will show up here automatically.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-amber-50/20 transition-colors">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#18564D] font-mono">#{order.orderNumber}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-gray-300">•</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                          {order.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-gray-900">
                        {order.customerName} <span className="text-xs text-gray-500 font-normal">({order.phone})</span>
                      </h4>

                      <p className="text-xs text-gray-600">
                        <strong>Pooja Slot:</strong> {order.deliverySlot} • {order.deliveryDate}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded-md font-medium">
                            {it.name} ({it.tier.label}) × {it.quantity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                      <div className="text-right">
                        <span className="text-base font-black text-gray-900">₹{order.total}</span>
                        <span className="block text-[10px] text-gray-500 uppercase font-semibold">{order.paymentMethod}</span>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 bg-[#18564D] text-[#F8EDE0] rounded-xl text-xs font-bold hover:bg-[#13443d] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#EDA124]" /> Manage
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Steaming Slots & Capacity */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#18564D]">Fresh Steaming Batch Slots (उकडीचे मोदक बॅचेस)</h3>
                <p className="text-xs text-gray-500">Enable or disable morning, afternoon, and evening live steaming slots according to kitchen capacity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slots.map(slot => (
                  <div
                    key={slot.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      slot.available
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-gray-100 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#18564D] uppercase tracking-wider font-devanagari">
                        {slot.marathiTitle}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleSlotAvailability(slot.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          slot.available
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}
                      >
                        {slot.available ? 'Active & Open' : 'Full / Closed'}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900">{slot.title}</h4>
                    <p className="text-xs font-semibold text-amber-900 bg-white/80 p-2 rounded-lg border border-amber-100">
                      ⏰ {slot.timeRange}
                    </p>
                    <p className="text-xs text-gray-600">{slot.idealFor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Store Settings & WhatsApp */}
        {activeTab === 'settings' && (
          <StoreSettingsTab
            settings={settings}
            onSaveSettings={onSaveSettings}
            onResetDefaults={onResetDefaults}
          />
        )}

      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={onSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(id, status, paymentStatus) => {
          onUpdateOrderStatus(id, status, paymentStatus);
          if (selectedOrder) {
            setSelectedOrder({ ...selectedOrder, status, paymentStatus: paymentStatus || selectedOrder.paymentStatus });
          }
        }}
      />

    </div>
  );
};
