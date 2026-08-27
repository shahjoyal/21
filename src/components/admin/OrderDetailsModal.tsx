import React from 'react';
import { CustomerOrder } from '../../types';
import { X, MessageSquare, Printer, CheckCircle2, Clock, Truck, ChefHat, AlertCircle } from 'lucide-react';

interface OrderDetailsModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: CustomerOrder['status'], paymentStatus?: CustomerOrder['paymentStatus']) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  const handleWhatsAppCustomer = () => {
    const text = `*🌺 २१ कळ्या Modak (21 Kalya) - Order Update 🌺*\n\nNamaskar *${order.customerName}* ji,\nYour Order *#${order.orderNumber}* status is: *${order.status.toUpperCase()}*.\n\n*Pooja Slot:* ${order.deliverySlot}\n*Date:* ${order.deliveryDate}\n*Items Total:* ₹${order.total}\n\nOur authentic 21-pleat modaks are handcrafted with pure sacred ingredients. For any queries, contact our support team. ॐ गं गणपतये नमः`;
    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Order Received</span>;
      case 'confirmed':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
      case 'packed':
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5" /> Packed</span>;
      case 'shipped':
        return <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Shipped</span>;
      case 'out_for_delivery':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Out for Delivery</span>;
      case 'delivered':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case 'cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Cancelled</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EDA124]/30 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#18564D] p-5 text-white flex items-center justify-between border-b border-[#EDA124]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#EDA124] tracking-widest uppercase">Order #{order.orderNumber}</span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-white/80">{new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#F8EDE0] mt-0.5">
              {order.customerName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">Current Status</span>
              {getStatusBadge(order.status)}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => onUpdateStatus(order.id, 'confirmed', 'paid')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'packed')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-colors"
              >
                Packed
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'shipped')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Shipped
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'out_for_delivery')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-purple-500 hover:text-purple-600 transition-colors"
              >
                Out for Delivery
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'delivered', 'paid')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#18564D] text-[#F8EDE0] hover:bg-[#13443d] transition-colors"
              >
                Delivered ✓
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 hover:border-red-500 hover:text-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-[#18564D] uppercase tracking-wider">Pooja Delivery Details</h4>
              <p className="text-xs text-gray-700"><strong>Slot:</strong> {order.deliverySlot}</p>
              <p className="text-xs text-gray-700"><strong>Date:</strong> {order.deliveryDate}</p>
              <p className="text-xs text-gray-700"><strong>Occasion:</strong> {order.occasion || 'Ganesh Pooja'}</p>
              {order.notes && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <strong>Notes:</strong> {order.notes}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <h4 className="text-xs font-bold text-[#18564D] uppercase tracking-wider">Customer & Address</h4>
              <p className="text-xs text-gray-700"><strong>Phone:</strong> {order.phone}</p>
              {order.email && <p className="text-xs text-gray-700"><strong>Email:</strong> {order.email}</p>}
              <p className="text-xs text-gray-700"><strong>Address:</strong> {order.address}, {order.city} - {order.pincode}</p>
              <p className="text-xs text-gray-700"><strong>Payment:</strong> <span className="uppercase font-bold">{order.paymentMethod}</span> ({order.paymentStatus})</p>
            </div>
          </div>

          {/* Ordered Items List */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Ordered Modak Items ({order.items.length})
            </h4>
            <div className="border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden border border-gray-200 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-900">{item.name}</h5>
                      <span className="text-xs text-[#18564D] font-devanagari font-semibold">{item.marathiName}</span>
                      <p className="text-xs text-gray-500">{item.tier.label} × {item.quantity} Box(es)</p>
                      {item.customNotes && (
                        <p className="text-[11px] text-amber-700 italic mt-0.5">Note: {item.customNotes}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-gray-900">₹{item.unitPrice * item.quantity}</span>
                    <span className="block text-[10px] text-gray-400">₹{item.unitPrice} each</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="mt-3 p-3.5 bg-gray-50 rounded-xl flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">Grand Total</span>
              <span className="text-lg font-black text-[#18564D]">₹{order.total}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrintSlip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Pooja Dispatch Slip
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCustomer}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20ba5a] transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Send WhatsApp Update to Customer
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
