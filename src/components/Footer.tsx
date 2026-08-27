import React from 'react';
import brandLogoImg from '../assets/images/regenerated_image_1787347112518.png';
import { Phone, MapPin, ShieldCheck, Clock, Award, MessageCircle, ChefHat } from 'lucide-react';

interface FooterProps {
  onOpenBulkInquiry: () => void;
  language: 'en' | 'mr';
}

export const Footer: React.FC<FooterProps> = ({ onOpenBulkInquiry, language }) => {
  const isMarathi = language === 'mr';

  return (
    <footer className="bg-[#0b2b27] text-white pt-16 pb-12 relative overflow-hidden">
      
      {/* Decorative Gold Sheen Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#E89A25] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Certification Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & Philosophy (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#18564D] border border-[#EDA124]/50 flex items-center justify-center p-1.5 shadow-lg shrink-0">
                <img
                  src={brandLogoImg}
                  alt="२१ कळ्या Modak Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-devanagari font-black text-2xl sm:text-3xl text-[#F8EDE0] tracking-wider leading-tight">
                  २१ कळ्या <span className="text-[#EDA124] text-lg font-sans font-extrabold">MODAK & WORKSHOP</span>
                </h3>
                <p className="text-xs font-bold text-[#F8EDE0]/90 tracking-widest uppercase mt-0.5 font-devanagari-body">
                  — स्वादः परमानन्दः —
                </p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              {isMarathi
                ? 'महाराष्ट्राची अस्सल पाककला ओळख असलेले २१ कळ्यांचे उकडीचे मोदक, शेफ मास्टरक्लास कार्यशाळा आणि DIY किट्स. आंबेमोहर तांदूळ, सेंद्रिय गूळ आणि १००% शुद्ध साजूक तूप.'
                : 'Dedicated to the culinary art of handcrafting genuine 21-pleated Ukadiche Modaks, live masterclasses, and gourmet DIY artisan kits.'}
            </p>

            {/* Certifications Badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[11px] font-bold text-[#E89A25]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Pure Veg (FSSAI)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[11px] font-bold text-[#E89A25]">
                <ChefHat className="w-4 h-4 text-[#E89A25]" />
                <span>Master Chef Certified</span>
              </div>
            </div>
          </div>

          {/* Outlets & Studios (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-devanagari font-bold text-base text-[#E89A25] tracking-wider uppercase">
              {isMarathi ? 'आमचे प्रमुख स्टुडिओ व स्वयंपाकघर' : 'Culinary Studios & Outlets'}
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E89A25] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Pune Studio:</strong> Prabhat Road, Lane 4, Deccan Gymkhana, Pune – 411004.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E89A25] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Mumbai Kitchen & Studio:</strong> Ranade Road, Dadar West, Mumbai – 400028.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E89A25] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Thane Workshop Counter:</strong> Naupada, Gokhale Road, Thane – 400602.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contacts & Helpline (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-devanagari font-bold text-base text-[#E89A25] tracking-wider uppercase">
              {isMarathi ? 'कार्यशाळा नोंदणी व ग्राहक सेवा' : 'Workshop & Order Helpline'}
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <a
                href="tel:+917304472460"
                className="flex items-center gap-2 hover:text-[#E89A25] transition-colors font-bold text-sm text-white"
              >
                <Phone className="w-4 h-4 text-[#E89A25]" />
                <span>+91 73044 72460</span>
              </a>

              <a
                href="https://wa.me/917304472460"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-[#E89A25]" />
                <span>Studio Hours: 9:00 AM – 8:00 PM</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBulkInquiry}
                  className="px-4 py-2 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] text-xs font-bold transition-all shadow flex items-center gap-1.5"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{isMarathi ? 'कॉर्पोरेट कार्यशाळा चौकशी' : 'Corporate Workshop Inquiry'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="flex items-center gap-1.5 font-devanagari font-medium text-white/80">
            <span>👨‍🍳 २१ कळ्या पाककला स्टुडिओ</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} २१ कळ्या Modak & Workshops™</span>
            <span>•</span>
            <span className="text-[#E89A25]">स्वादः परमानन्दः</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>100% Handcrafted 21 Pleats</span>
            <span>•</span>
            <span>Live Interactive Cooking Studios</span>
          </div>
        </div>

      </div>
    </footer>
  );
};