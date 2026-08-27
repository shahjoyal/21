import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
  language: 'en' | 'mr';
}

type Mode = 'login' | 'signup' | 'otp';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthenticated, language }) => {
  const { login, signup, verifyOtp, resendOtp } = useAuth();
  const isMarathi = language === 'mr';

  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isOpen) return null;

  const resetMessages = () => {
    setError('');
    setInfo('');
  };

  const startCooldown = () => {
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    try {
      await login(form.email, form.password);
      onAuthenticated && onAuthenticated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    try {
      const res = await signup(form);
      setInfo(res.message || 'OTP sent to your email.');
      setMode('otp');
      startCooldown();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);
    try {
      await verifyOtp(form.email, otp);
      onAuthenticated && onAuthenticated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    resetMessages();
    try {
      const res = await resendOtp(form.email);
      setInfo(res.message || 'OTP resent.');
      startCooldown();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF7F2] w-full max-w-md rounded-3xl border-2 border-[#E89A25]/50 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#134e48] to-[#18564D] text-white flex items-center justify-between border-b border-[#E89A25]/30">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#E89A25] uppercase block">
              २१ कळ्या Modak Studio
            </span>
            <h3 className="font-devanagari text-base sm:text-lg font-bold text-[#F5EEDB]">
              {mode === 'login' && (isMarathi ? 'लॉगिन करा' : 'Login to your account')}
              {mode === 'signup' && (isMarathi ? 'नवीन खाते तयार करा' : 'Create a new account')}
              {mode === 'otp' && (isMarathi ? 'OTP सत्यापन' : 'Verify your email')}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}
          {info && !error && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              {info}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                    placeholder="you@example.com"
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
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                <span>{isMarathi ? 'लॉगिन करा' : 'Login'}</span>
              </button>
              <p className="text-xs text-center text-gray-600">
                {isMarathi ? 'खाते नाही?' : "Don't have an account?"}{' '}
                <button type="button" onClick={() => { setMode('signup'); resetMessages(); }} className="font-bold text-[#134e48] underline">
                  {isMarathi ? 'साइन अप करा' : 'Sign up'}
                </button>
              </p>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                    placeholder="e.g. Priyanka Deshmukh"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                    placeholder="9822121021"
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
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                    placeholder="Minimum 8 characters"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] text-[#134e48] font-black text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                <span>{isMarathi ? 'OTP पाठवा' : 'Send OTP & Sign up'}</span>
              </button>
              <p className="text-xs text-center text-gray-600">
                {isMarathi ? 'आधीच खाते आहे?' : 'Already have an account?'}{' '}
                <button type="button" onClick={() => { setMode('login'); resetMessages(); }} className="font-bold text-[#134e48] underline">
                  {isMarathi ? 'लॉगिन करा' : 'Login'}
                </button>
              </p>
            </form>
          )}

          {mode === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {isMarathi
                    ? `आम्ही ${form.email} वर एक ६ अंकी OTP पाठवला आहे.`
                    : `We've sent a 6-digit OTP to ${form.email}.`}
                </span>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Enter OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-3 text-center text-lg tracking-[0.5em] font-black rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                  placeholder="------"
                />
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] text-[#134e48] font-black text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isMarathi ? 'सत्यापित करा व लॉगिन' : 'Verify & Continue'}</span>
              </button>
              <p className="text-xs text-center text-gray-600">
                {resendCooldown > 0 ? (
                  <span>{isMarathi ? `पुन्हा पाठवा (${resendCooldown}s)` : `Resend available in ${resendCooldown}s`}</span>
                ) : (
                  <button type="button" onClick={handleResend} className="font-bold text-[#134e48] underline">
                    {isMarathi ? 'OTP पुन्हा पाठवा' : 'Resend OTP'}
                  </button>
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
