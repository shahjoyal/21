import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Quote } from 'lucide-react';
import { UKADICHE_STEAMING_IMAGE } from '../data/products';
import { Reveal } from './Reveal';
import { useSiteContent } from '../hooks/useSiteContent';

interface FounderStoryProps {
  language: 'en' | 'mr';
}

/**
 * "Crafted with Devotion, Shared with Pride" — founder bio, community stats,
 * and a signature quote. Uses an existing studio image as a placeholder;
 * swap FOUNDER_STORY_IMAGE in data/products.ts whenever a dedicated photo
 * is ready.
 */
export const FounderStory: React.FC<FounderStoryProps> = ({ language }) => {
  const isMarathi = language === 'mr';
  const { get } = useSiteContent();

  return (
    <section className="py-14 sm:py-20 bg-[#FBEEDA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? get('founder_eyebrow_mr') : get('founder_eyebrow_en')}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#134e48]">
              {isMarathi ? get('founder_heading1_mr') : get('founder_heading1_en')}
            </span>
            <span className="text-[#E89A25]">
              {isMarathi ? get('founder_heading2_mr') : get('founder_heading2_en')}
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left: Photo */}
          <Reveal y={26} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/5">
              <img
                src={UKADICHE_STEAMING_IMAGE}
                alt={isMarathi ? 'हाताने बनवलेला मोदक' : 'Handcrafted modak, made with devotion'}
                className="w-full h-72 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>

          {/* Right: Copy + Stats + Quote */}
          <Reveal y={26} delay={0.1} className="space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p>
                {isMarathi ? get('founder_paragraph1_mr') : get('founder_paragraph1_en')}
              </p>
              <p>
                {isMarathi ? get('founder_paragraph2_mr') : get('founder_paragraph2_en')}
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 text-center space-y-1.5"
              >
                <Users className="w-5 h-5 text-[#E89A25] mx-auto" />
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#134e48]">{get('founder_stat1_number')}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold">
                  {isMarathi ? get('founder_stat1_label_mr') : get('founder_stat1_label_en')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white rounded-2xl border border-black/5 shadow-sm p-5 text-center space-y-1.5"
              >
                <Heart className="w-5 h-5 text-[#E89A25] mx-auto" />
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#134e48]">{get('founder_stat2_number')}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold">
                  {isMarathi ? get('founder_stat2_label_mr') : get('founder_stat2_label_en')}
                </p>
              </motion.div>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="relative bg-white rounded-2xl border-l-4 border-[#E89A25] shadow-sm p-5 sm:p-6"
            >
              <Quote className="w-6 h-6 text-[#E89A25]/30 absolute top-4 right-4" />
              <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed pr-6">
                {isMarathi ? get('founder_quote_mr') : get('founder_quote_en')}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#134e48] mt-2">
                {get('founder_quote_attribution')}
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
