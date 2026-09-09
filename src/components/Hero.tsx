import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CRAFT_MAKING_IMAGE } from '../data/products';
import { useSiteContent } from '../hooks/useSiteContent';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenWorkshops?: () => void;
  language: 'en' | 'mr';
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenWorkshops, language }) => {
  const isMarathi = language === 'mr';
  const { get } = useSiteContent();

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
            {isMarathi ? get('hero_eyebrow_mr') : get('hero_eyebrow_en')}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-devanagari font-bold leading-[1.1] tracking-tight">
          <span className="block text-4xl sm:text-5xl lg:text-6xl text-white">
            २१ कळ्या
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl text-[#E89A25] italic mt-2 sm:mt-3">
            {isMarathi ? get('hero_headline_mr') : get('hero_headline_en')}
          </span>
        </h1>

        {/* Narrative Paragraph */}
        <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mt-6 sm:mt-8 font-normal">
          {isMarathi ? get('hero_paragraph_mr') : get('hero_paragraph_en')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span>{isMarathi ? get('hero_cta1_mr') : get('hero_cta1_en')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={scrollToWorkshops}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 border border-white/40 text-white font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>{isMarathi ? get('hero_cta2_mr') : get('hero_cta2_en')}</span>
          </button>
        </div>

      </div>
    </section>
  );
};