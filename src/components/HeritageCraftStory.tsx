import React from 'react';
import { CRAFT_MAKING_IMAGE } from '../data/products';
import { ChefHat } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';

interface HeritageCraftStoryProps {
  language: 'en' | 'mr';
}

export const HeritageCraftStory: React.FC<HeritageCraftStoryProps> = ({ language }) => {
  const isMarathi = language === 'mr';
  const { get } = useSiteContent();

  const craftPillars = [
    {
      num: '01',
      title: isMarathi ? get('craft_pillar1_title_mr') : get('craft_pillar1_title_en'),
      desc: isMarathi ? get('craft_pillar1_desc_mr') : get('craft_pillar1_desc_en'),
    },
    {
      num: '02',
      title: isMarathi ? get('craft_pillar2_title_mr') : get('craft_pillar2_title_en'),
      desc: isMarathi ? get('craft_pillar2_desc_mr') : get('craft_pillar2_desc_en'),
    },
    {
      num: '03',
      title: isMarathi ? get('craft_pillar3_title_mr') : get('craft_pillar3_title_en'),
      desc: isMarathi ? get('craft_pillar3_desc_mr') : get('craft_pillar3_desc_en'),
    },
    {
      num: '04',
      title: isMarathi ? get('craft_pillar4_title_mr') : get('craft_pillar4_title_en'),
      desc: isMarathi ? get('craft_pillar4_desc_mr') : get('craft_pillar4_desc_en'),
    }
  ];

  return (
    <section id="craft-story" className="py-16 sm:py-24 bg-[#134e48] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#E89A25_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E89A25]/20 border border-[#E89A25]/30 text-[#E89A25] text-xs font-bold uppercase tracking-wider">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{isMarathi ? get('craft_eyebrow_mr') : get('craft_eyebrow_en')}</span>
          </div>

          <h2 className="font-devanagari text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF7F2]">
            {isMarathi ? get('craft_heading_mr') : get('craft_heading_en')}
          </h2>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {isMarathi ? get('craft_subheading_mr') : get('craft_subheading_en')}
          </p>
        </div>

        {/* 2-Column Story & Visual Craft Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left: Artisan Craft Image with Seal */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#E89A25]/40 shadow-2xl bg-[#0f3c36]">
              <img
                src={CRAFT_MAKING_IMAGE}
                alt="Master chef hand-sculpting 21 pleats into Modak"
                className="w-full h-96 sm:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f3c36] via-transparent to-transparent opacity-70" />

              {/* Bottom Quote inside Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0f3c36]/90 backdrop-blur-md border border-[#E89A25]/30">
                <span className="font-devanagari text-xs text-[#E89A25] font-bold block mb-1">
                  {isMarathi ? get('craft_quote_label_mr') : get('craft_quote_label_en')}
                </span>
                <p className="text-xs text-white/90 italic">
                  &ldquo;{isMarathi ? get('craft_quote_text_mr') : get('craft_quote_text_en')}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: The 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {craftPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0f3c36] border border-[#E89A25]/25 hover:border-[#E89A25] transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#E89A25] font-serif-luxury">
                      {pillar.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E89A25] group-hover:scale-150 transition-transform" />
                  </div>
                  <h4 className="font-bold text-base text-[#FAF7F2] font-devanagari group-hover:text-[#E89A25] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Purity Guarantee Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#185c54] to-[#0f3c36] border border-[#E89A25]/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E89A25] text-[#134e48] flex items-center justify-center font-black text-lg shrink-0">
                २१
              </div>
              <div className="space-y-0.5">
                <h5 className="font-bold text-sm text-[#F5EEDB]">
                  {isMarathi ? get('craft_pledge_title_mr') : get('craft_pledge_title_en')}
                </h5>
                <p className="text-xs text-white/80">
                  {isMarathi ? get('craft_pledge_desc_mr') : get('craft_pledge_desc_en')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
