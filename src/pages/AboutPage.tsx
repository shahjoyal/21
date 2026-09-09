import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Heart, Hand, Award, Leaf, Instagram } from 'lucide-react';
import { Reveal, RevealGroup, revealItemVariants } from '../components/Reveal';
import { motion } from 'motion/react';
import { CRAFT_MAKING_IMAGE } from '../data/products';
import { OutletContextType } from './Layout';
import { useSiteContent } from '../hooks/useSiteContent';

/**
 * Standalone "About Us" page — reachable from the navbar. Mirrors the
 * story / heritage / values / team layout supplied as reference, but
 * reuses the storefront's existing palette, type system, and animation
 * primitives so it feels native to the rest of the site.
 */
export default function AboutPage() {
  const ctx = useOutletContext<OutletContextType>();
  const isMarathi = ctx.language === 'mr';
  const { get } = useSiteContent();

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: isMarathi ? get('about_value1_title_mr') : get('about_value1_title_en'),
      desc: isMarathi ? get('about_value1_desc_mr') : get('about_value1_desc_en'),
    },
    {
      icon: <Hand className="w-6 h-6" />,
      title: isMarathi ? get('about_value2_title_mr') : get('about_value2_title_en'),
      desc: isMarathi ? get('about_value2_desc_mr') : get('about_value2_desc_en'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: isMarathi ? get('about_value3_title_mr') : get('about_value3_title_en'),
      desc: isMarathi ? get('about_value3_desc_mr') : get('about_value3_desc_en'),
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: isMarathi ? get('about_value4_title_mr') : get('about_value4_title_en'),
      desc: isMarathi ? get('about_value4_desc_mr') : get('about_value4_desc_en'),
    }
  ];

  const team = [
    { initials: 'AK', handle: '@heyyakshataaa', role: isMarathi ? 'संस्थापक' : 'Founder' },
    { initials: 'RB', handle: '@rajbhatia13', role: isMarathi ? 'व्यवस्थापन' : 'Managed by' }
  ];

  return (
    <div className="w-full">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-[#134e48] pt-16 pb-20 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#E89A25_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E89A25]">
              {isMarathi ? get('about_hero_eyebrow_mr') : get('about_hero_eyebrow_en')}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-3">
              <span className="text-white">
                {isMarathi ? get('about_hero_heading1_mr') : get('about_hero_heading1_en')}
              </span>
              <span className="text-[#E89A25]">{isMarathi ? get('about_hero_heading2_mr') : get('about_hero_heading2_en')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-5 max-w-xl mx-auto">
              {isMarathi ? get('about_hero_paragraph_mr') : get('about_hero_paragraph_en')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Heritage ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FBEEDA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal y={26}>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/5">
              <img
                src={CRAFT_MAKING_IMAGE}
                alt={isMarathi ? 'हाताने मोदक घडवताना' : 'Hand-crafting modaks, the traditional way'}
                className="w-full h-80 sm:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </Reveal>

          <Reveal y={26} delay={0.1} className="space-y-4">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
              {isMarathi ? get('about_heritage_eyebrow_mr') : get('about_heritage_eyebrow_en')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#134e48] leading-tight">
              {isMarathi ? get('about_heritage_heading_mr') : get('about_heritage_heading_en')}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi ? get('about_heritage_p1_mr') : get('about_heritage_p1_en')}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi ? get('about_heritage_p2_mr') : get('about_heritage_p2_en')}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi ? get('about_heritage_p3_mr') : get('about_heritage_p3_en')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
              {isMarathi ? get('about_values_eyebrow_mr') : get('about_values_eyebrow_en')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48]">
              {isMarathi ? get('about_values_heading_mr') : get('about_values_heading_en')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {isMarathi ? get('about_values_subheading_mr') : get('about_values_subheading_en')}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                variants={revealItemVariants}
                className="p-6 sm:p-7 rounded-2xl bg-[#FBEEDA] border border-black/5 hover:border-[#E89A25]/40 hover:shadow-lg transition-all text-center space-y-3"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#134e48]/10 text-[#E89A25] flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="font-bold text-base text-[#134e48]">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FBEEDA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal className="max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
              {isMarathi ? get('about_team_eyebrow_mr') : get('about_team_eyebrow_en')}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48]">
              {isMarathi ? get('about_team_heading_mr') : get('about_team_heading_en')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {isMarathi ? get('about_team_subheading_mr') : get('about_team_subheading_en')}
            </p>
          </Reveal>

          <RevealGroup className="flex flex-wrap justify-center gap-10 sm:gap-16">
            {team.map((member, idx) => (
              <motion.a
                key={idx}
                href={`https://instagram.com/${member.handle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                variants={revealItemVariants}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#EDA124] to-[#c9800f] text-[#134e48] flex items-center justify-center font-serif-luxury font-black text-2xl sm:text-3xl shadow-lg border-4 border-white group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1.5 font-serif-luxury font-bold text-[#134e48] text-base">
                    <Instagram className="w-3.5 h-3.5 text-[#E89A25]" />
                    {member.handle}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {member.role}
                  </div>
                </div>
              </motion.a>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}