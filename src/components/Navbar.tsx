import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import brandLogoImg from '../assets/images/regenerated_image_1787347112518.png';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Phone, Clock, Menu, X, Gift, MapPin, User, LogOut } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { PromoMarquee } from './PromoMarquee';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenBulkInquiry: () => void;
  onOpenAuth?: () => void;
  language: 'en' | 'mr';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenBulkInquiry,
  onOpenAuth,
  language,
  onToggleLanguage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Smooth "bump" animation on the cart badge whenever the item count changes.
  const [cartBump, setCartBump] = useState(false);
  const prevCountRef = useRef(totalCartCount);
  useEffect(() => {
    if (totalCartCount !== prevCountRef.current) {
      setCartBump(true);
      const t = window.setTimeout(() => setCartBump(false), 420);
      prevCountRef.current = totalCartCount;
      return () => window.clearTimeout(t);
    }
  }, [totalCartCount]);

  const t = {
    home: language === 'mr' ? 'मुख्यपृष्ठ' : 'Home',
    shop: language === 'mr' ? 'मोदक खरेदी करा' : 'Shop Modak',
    workshops: language === 'mr' ? 'कार्यशाळा बुक करा' : 'Book Workshop',
    bulkInquiry: language === 'mr' ? 'कॉर्पोरेट कार्यशाळा नोंदणी' : 'Group & Corporate Booking',
    preOrderBtn: language === 'mr' ? 'मोदक बुक करा' : 'Order Modaks',
    langToggle: language === 'mr' ? 'English' : 'मराठी',
  };

  // Primary nav: Home / Shop Modak / Book Workshop. The active route is
  // highlighted so people always know where they are in the app.
  const navLinks = [
    { label: t.home, path: '/' },
    { label: t.shop, path: '/shop' },
    { label: t.workshops, path: '/workshops' },
  ];

  const isLinkActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Continuous scrolling promo strip — sits above the nav, inside the
          same sticky header, so it scrolls with the nav and never overlaps
          the rest of the page on desktop or mobile. */}
      <PromoMarquee language={language} />

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#134e48]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-[#E89A25]/20'
            : 'bg-[#134e48] py-3.5 border-b border-[#1A5E57]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none cursor-pointer"
            aria-label="21 Kalya Modak Home"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#18564D] border border-[#EDA124]/40 flex items-center justify-center overflow-hidden p-1 shadow-md group-hover:border-[#EDA124] transition-all">
              <img
                src={brandLogoImg}
                alt="२१ कळ्या Modak Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-xl sm:text-2xl text-[#F8EDE0] tracking-tight sm:tracking-normal leading-none group-hover:text-[#EDA124] transition-colors font-devanagari">
                  {language === 'mr' ? '२१ कळ्या' : '21 Kalya'}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#EDA124] tracking-widest uppercase">
                  MODAK
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#F8EDE0]/90 uppercase mt-0.5 font-devanagari-body">
                — स्वादः परमानन्दः —
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={idx}
                  onClick={() => navigate(link.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#E89A25]/15 text-[#E89A25] border border-[#E89A25]/40 hover:bg-[#E89A25] hover:text-[#134e48] font-semibold'
                      : 'text-[#F5EEDB]/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account: Login / Logout */}
            {user ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[#F5EEDB] border border-white/10 text-xs font-bold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#EDA124]" />
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5EEDB] border border-white/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-lg bg-[#EDA124] hover:bg-[#ffb03a] text-[#18564D] text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Login / Sign Up</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Language Switcher (desktop/tablet only — moved into the mobile dropdown below) */}
            <button
              onClick={onToggleLanguage}
              className="hidden sm:flex px-2.5 py-1 rounded-lg bg-black/25 text-[#F5EEDB] hover:text-[#E89A25] border border-white/10 hover:border-[#E89A25]/40 text-xs font-bold transition-colors items-center gap-1"
              title="Switch Language"
            >
              <span className="w-2 h-2 rounded-full bg-[#E89A25]" />
              {t.langToggle}
            </button>


            {/* Cart Drawer Trigger */}
            <motion.button
              onClick={onOpenCart}
              animate={cartBump ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.42, ease: 'easeInOut' }}
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F5EEDB] border border-[#E89A25]/30 transition-colors flex items-center justify-center group active:scale-95 cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#E89A25] group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {totalCartCount > 0 && (
                  <motion.span
                    key={totalCartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E89A25] text-[#134e48] font-black text-xs rounded-full flex items-center justify-center shadow-lg"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F5EEDB] hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E89A25]/20 bg-[#0f3c36] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(link.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    active ? 'bg-[#E89A25] text-[#134e48] font-bold' : 'text-[#F5EEDB] hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={onToggleLanguage}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#F5EEDB] hover:bg-white/10 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#E89A25]" />
                {t.langToggle}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBulkInquiry();
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#F5EEDB] hover:bg-white/10 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#E89A25]" />
                  {t.bulkInquiry}
                </span>
              </button>

              <a
                href="tel:+917304472460"
                className="w-full text-center py-2.5 rounded-xl bg-white/10 text-[#F5EEDB] text-sm font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <Phone className="w-4 h-4 text-[#E89A25]" />
                <span>Call Hotline: +91 73044 72460</span>
              </a>

              {user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-white/10 text-[#F5EEDB] text-sm font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-[#E89A25]" />
                  <span>Logout ({user.name.split(' ')[0]})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};