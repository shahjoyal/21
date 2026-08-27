import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle,
  MapPin,
  Phone,
  User,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Reveal } from '../components/Reveal';
import { OutletContextType } from './Layout';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const ctx = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, deliveryDate, selectedDeliverySlot, onClearCart, language } = ctx;
  const isMarathi = language === 'mr';

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: 'Pune',
    pincode: '411030',
    deliveryNotes: 'Please call before delivery. Keep fresh.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        phone: prev.phone || user.phone || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  // Redirect home if someone lands on /checkout with an empty cart (and no
  // order has just been placed, in which case step will be 'success').
  useEffect(() => {
    if (cart.length === 0 && step !== 'success') {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]);

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 799 ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  const buildOrderData = () => ({
    customerName: formData.name || user?.name || 'Valued Customer',
    phone: formData.phone || user?.phone || '',
    email: formData.email || user?.email || '',
    address: `${formData.address}${formData.landmark ? `, Near ${formData.landmark}` : ''}`,
    city: formData.city || 'Pune',
    pincode: formData.pincode || '411030',
    occasion: 'Festive Pooja Order',
    deliveryDate,
    deliverySlot: selectedDeliverySlot,
    items: cart.map((item) => ({
      productId: item.productId,
      name: item.name,
      marathiName: item.marathiName,
      image: item.image,
      tier: item.tier,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      customNotes: item.customNotes,
    })),
    subtotal,
    deliveryFee,
    total: grandTotal,
    notes: formData.deliveryNotes,
  });

  const celebrate = () => {
    try {
      confetti({ particleCount: 130, spread: 90, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }
  };

  const handleCodOrder = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const res = await fetch('/api/orders/cod', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrderData()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not place order.');
      setOrderId(data.orderNumber);
      setStep('success');
      onClearCart();
      celebrate();
    } catch (err: any) {
      setError(err.message || 'Something went wrong placing your order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpayOrder = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Could not load the payment gateway. Please check your internet connection.');
      }

      const createRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.message || 'Could not initiate payment.');

      const orderData = buildOrderData();

      const rzp = new window.Razorpay({
        key: createData.keyId,
        amount: createData.amount,
        currency: createData.currency,
        name: '21 Kalya Modak Studio',
        description: 'Artisan Modak Order',
        order_id: createData.orderId,
        prefill: {
          name: orderData.customerName,
          email: orderData.email,
          contact: orderData.phone,
        },
        theme: { color: '#18564D' },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.message || 'Payment verification failed.');
            setOrderId(verifyData.orderNumber);
            setStep('success');
            onClearCart();
            celebrate();
          } catch (err: any) {
            setError(err.message || 'Payment succeeded but order could not be saved. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      });

      rzp.on('payment.failed', (resp: any) => {
        setError(resp?.error?.description || 'Payment failed. Please try again.');
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Could not start payment.');
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'cod') {
      handleCodOrder();
    } else {
      handleRazorpayOrder();
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return null; // redirect effect above will kick in
  }

  return (
    <div className="min-h-[70vh] bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="bg-white flex flex-col rounded-3xl border-2 border-[#E89A25]/50 shadow-xl overflow-hidden relative">

            {/* Page Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#134e48] to-[#18564D] text-white flex items-center justify-between border-b border-[#E89A25]/30 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E89A25] text-[#134e48] flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#E89A25] uppercase block">
                    २१ कळ्या • Express Checkout
                  </span>
                  <h1 className="font-devanagari text-base sm:text-lg font-bold text-[#F5EEDB]">
                    {step === 'details' && (isMarathi ? 'डिलिव्हरी पत्ता व संपर्क' : 'Delivery Address & Contact Details')}
                    {step === 'payment' && (isMarathi ? 'देयक पद्धत निवडा (Payment)' : 'Instant Secure Payment')}
                    {step === 'success' && (isMarathi ? 'ऑर्डर निश्चित झाली!' : 'Order Placed Successfully!')}
                  </h1>
                </div>
              </div>

              {step !== 'success' && (
                <button
                  onClick={() => (step === 'payment' ? setStep('details') : navigate(-1))}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-xs font-semibold"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">

              {step === 'details' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep('payment');
                  }}
                  className="space-y-4"
                >
                  {/* Order Summary Strip */}
                  <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-gray-200 flex items-center justify-between text-xs font-semibold shadow-xs">
                    <div>
                      <span className="text-gray-700 block font-bold">
                        {cart.reduce((a, b) => a + b.quantity, 0)} {isMarathi ? 'पेटी / पदार्थ' : 'Items in Bag'}
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal">
                        {deliveryDate} • {selectedDeliverySlot.split('(')[0]}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-normal">{isMarathi ? 'एकूण देय:' : 'Total:'}</span>
                      <span className="text-base font-black text-[#134e48]">₹{grandTotal}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#134e48] block pt-1">
                    {isMarathi ? 'डिलिव्हरी माहिती भरा:' : 'Customer Information:'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {isMarathi ? 'पूर्ण नाव (Full Name)' : 'Full Name'} *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Joshi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {isMarathi ? 'मोबाईल नंबर (WhatsApp)' : 'Mobile Phone (WhatsApp)'} *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9822121021"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {isMarathi ? 'डिलिव्हरी पत्ता (Complete Street Address)' : 'Complete Street Address'} *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <textarea
                        required
                        rows={2}
                        placeholder="House/Flat No., Building Name, Street..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {isMarathi ? 'शहर (City)' : 'City'} *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none font-medium"
                      >
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Thane">Thane</option>
                        <option value="Navi Mumbai">Navi Mumbai</option>
                        <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        {isMarathi ? 'पिनकोड (Pincode)' : 'Pincode'} *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="411030"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] hover:bg-[#d98c1a] text-[#134e48] font-black text-sm shadow-xl flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98 transition-all"
                  >
                    <span>{isMarathi ? 'पुढील पायरी: पेमेंट निवडा' : 'Proceed to Payment (देयक)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-gray-200 flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-700">
                      {isMarathi ? 'देय एकूण रक्कम:' : 'Total Payable Amount:'}
                    </span>
                    <span className="text-lg text-[#134e48]">₹{grandTotal}</span>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="space-y-2.5">
                    <label
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'razorpay'
                          ? 'border-[#134e48] bg-[#134e48]/10 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#134e48]">
                            Pay Online (Razorpay — UPI, Cards, Netbanking)
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            {isMarathi ? 'सुरक्षित व झटपट पेमेंट' : 'Secure checkout • Instant order confirmation'}
                          </p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-[#134e48] bg-[#134e48]' : 'border-gray-300'}`}>
                        {paymentMethod === 'razorpay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#134e48] bg-[#134e48]/10 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#134e48]">
                            Cash on Delivery (घरपोच पैसे द्या)
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            {isMarathi ? 'डिलिव्हरीच्या वेळी रोख किंवा UPI ने द्या' : 'Pay via cash or UPI upon delivery'}
                          </p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#134e48] bg-[#134e48]' : 'border-gray-300'}`}>
                        {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      disabled={isProcessing}
                      className="w-1/3 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold text-xs disabled:opacity-50"
                    >
                      {isMarathi ? 'मागे' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-2/3 py-3.5 rounded-2xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] hover:bg-[#d98c1a] text-[#134e48] font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all disabled:opacity-60"
                    >
                      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                      <span>
                        {isProcessing
                          ? (isMarathi ? 'प्रक्रिया सुरू आहे...' : 'Processing...')
                          : (isMarathi ? `₹${grandTotal} निश्चित करा` : `Confirm Order (₹${grandTotal})`)}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#E89A25] uppercase tracking-wider block">
                      {isMarathi ? 'धन्यवाद! ऑर्डर नोंदवली गेली' : 'Order Confirmed!'}
                    </span>
                    <h2 className="font-devanagari text-2xl font-black text-[#134e48] mt-0.5">
                      {isMarathi ? 'बाप्पाच्या प्रसादाची ऑर्डर निश्चित!' : 'Your Modak Order is Confirmed!'}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                      {isMarathi
                        ? `ऑर्डर क्रमांक #${orderId}. ताजी वाफवलेली बॅच ${deliveryDate} रोजी वेळेत पोहोचेल.`
                        : `Order ID #${orderId}. Freshly steamed batches will be dispatched on ${deliveryDate}.`}
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-gray-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                    <div className="flex justify-between text-gray-600">
                      <span>Customer:</span>
                      <strong className="text-gray-900">{formData.name}</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phone:</span>
                      <strong className="text-gray-900">{formData.phone}</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Slot:</span>
                      <strong className="text-gray-900">{selectedDeliverySlot}</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Amount:</span>
                      <strong className="text-[#E89A25] font-black">₹{grandTotal}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate('/')}
                      className="px-8 py-3 rounded-xl bg-[#134e48] text-[#FAF7F2] font-black text-xs shadow-md hover:bg-[#0f3c36] transition-all"
                    >
                      {isMarathi ? 'मुख्य पानावर परत जा' : 'Continue Exploring Studio'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
