import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Hand, Package, Heart } from 'lucide-react';
import { RevealGroup, revealItemVariants, Reveal } from './Reveal';
import { useSiteContent } from '../hooks/useSiteContent';

interface WhyChooseUsProps {
  language: 'en' | 'mr';
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const isMarathi = language === 'mr';
  const { get } = useSiteContent();

  const points = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: isMarathi ? get('why_card1_title_mr') : get('why_card1_title_en'),
      desc: isMarathi ? get('why_card1_desc_mr') : get('why_card1_desc_en'),
    },
    {
      icon: <Hand className="w-5 h-5" />,
      title: isMarathi ? get('why_card2_title_mr') : get('why_card2_title_en'),
      desc: isMarathi ? get('why_card2_desc_mr') : get('why_card2_desc_en'),
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: isMarathi ? get('why_card3_title_mr') : get('why_card3_title_en'),
      desc: isMarathi ? get('why_card3_desc_mr') : get('why_card3_desc_en'),
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: isMarathi ? get('why_card4_title_mr') : get('why_card4_title_en'),
      desc: isMarathi ? get('why_card4_desc_mr') : get('why_card4_desc_en'),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FBEEDA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? get('why_eyebrow_mr') : get('why_eyebrow_en')}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight">
            {isMarathi ? get('why_heading_mr') : get('why_heading_en')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {isMarathi ? get('why_subheading_mr') : get('why_subheading_en')}
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {points.map((p, idx) => (
            <motion.div
              key={idx}
              variants={revealItemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-lg transition-shadow p-5 sm:p-6 flex flex-col items-center text-center gap-2.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#FBEEDA] text-[#E89A25] flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-[#134e48] leading-snug">
                {p.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
