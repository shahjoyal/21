import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CRAFT_MAKING_IMAGE } from '../data/products';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenWorkshops?: () => void;
  language: 'en' | 'mr';
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenWorkshops, language }) => {
  const isMarathi = language === 'mr';

  const scrollToWorkshops = () => {
    if (onOpenWorkshops) {
      onOpenWorkshops();
    } else {
      const el = document.getElementById('workshops');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[640px] flex items-center py-28 lg:py-36 text-white">
      {/* Full-bleed Background Photograph */}
      <div className="absolute inset-0">
        <img
          src={CRAFT_MAKING_IMAGE}
          alt="Handcrafted 21 Kalya Ukadiche Modak"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Brand-Teal Wash for Legibility */}
        <div className="absolute inset-0 bg-[#0f3c36]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f3c36]/95 via-[#0f3c36]/70 to-[#0f3c36]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center flex flex-col items-center">

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center px-5 py-2 rounded-full border border-[#E89A25]/50 mb-8">
          <span className="text-[#E89A25] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
            {isMarathi ? 'अस्सल पाककृती वैशिष्ट्ये' : 'Authentic Culinary Specialties'}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-devanagari font-bold leading-[1.1] tracking-tight">
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-white">
            २१ कळ्या
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl text-[#E89A25] italic mt-2 sm:mt-3">
            {isMarathi ? '२१ Kalya — स्वादः परमानन्दः' : '21 Kalya — स्वादः परमानन्दः'}
          </span>
        </h1>

        {/* Narrative Paragraph */}
        <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mt-6 sm:mt-8 font-normal">
          {isMarathi
            ? 'खऱ्या पाककलेच्या आनंदाचा अनुभव घ्या. २१ अचूक कळ्यांनी हाताने बनवलेले, घरगुती पद्धतीने वाफवलेले अस्सल उकडीचे मोदक चाखा, पारंपरिक मिठाईची शतकानुशतके जुनी कला शिका आणि स्वतःच्या पाककला प्रवासाला सुरुवात करा.'
            : <>Experience pure culinary ecstasy. Indulge in authentic home-cooked steamed <span className="font-semibold text-white">Ukadiche Modaks</span> handcrafted with <span className="font-semibold text-white">21 precise folds</span>, master the time-honored art of traditional sweets, and launch your own culinary journey.</>}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span>{isMarathi ? 'मिठाई ऑर्डर करा' : 'Order Sweets'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={scrollToWorkshops}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 border border-white/40 text-white font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>{isMarathi ? 'कार्यशाळा बुक करा' : 'Book Workshops'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};