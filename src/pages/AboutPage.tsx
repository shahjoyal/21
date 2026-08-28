import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Heart, Hand, Award, Leaf, Instagram } from 'lucide-react';
import { Reveal, RevealGroup, revealItemVariants } from '../components/Reveal';
import { motion } from 'motion/react';
import { CRAFT_MAKING_IMAGE } from '../data/products';
import { OutletContextType } from './Layout';

/**
 * Standalone "About Us" page — reachable from the navbar. Mirrors the
 * story / heritage / values / team layout supplied as reference, but
 * reuses the storefront's existing palette, type system, and animation
 * primitives so it feels native to the rest of the site.
 */
export default function AboutPage() {
  const ctx = useOutletContext<OutletContextType>();
  const isMarathi = ctx.language === 'mr';

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: isMarathi ? 'प्रेमाने बनवलेले' : 'Made with Love',
      desc: isMarathi
        ? 'प्रत्येक मोदकात घराची ऊब आणि पिढ्यानपिढ्याचे प्रेम असते.'
        : 'Every modak carries the warmth of home and generations of love.'
    },
    {
      icon: <Hand className="w-6 h-6" />,
      title: isMarathi ? 'हस्तकलेतील उत्कृष्टता' : 'Handcrafted Excellence',
      desc: isMarathi
        ? 'यंत्रांचा वापर नाही — दशकांचा अनुभव असलेल्या कुशल हातांनीच घडवलेले.'
        : 'No machines — only skilled hands that have perfected the art over decades.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: isMarathi ? 'गुणवत्ता प्रथम' : 'Quality First',
      desc: isMarathi
        ? 'साहित्य किंवा प्रक्रियेत कधीही तडजोड नाही. फक्त सर्वोत्तम.'
        : 'We never compromise on ingredients or process. Only the best for our customers.'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: isMarathi ? 'शुद्ध व नैसर्गिक' : 'Pure & Natural',
      desc: isMarathi
        ? 'कोणतेही प्रिझर्व्हेटिव्ह्ज नाही, कृत्रिम स्वाद नाही — फक्त शुद्ध, सात्त्विक चव.'
        : 'No preservatives, no artificial flavors — just pure, wholesome goodness.'
    }
  ];

  const team = [
    { initials: 'AK', handle: '@heyyakshataaa', role: isMarathi ? 'संस्थापक' : 'Founder' },
    { initials: 'RB', handle: '@rajbhatia13', role: isMarathi ? 'व्यवस्थापन' : 'Managed by' }
  ];

  return (
    <div className="w-full">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#134e48] to-[#0d3834] pt-16 pb-20 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#E89A25_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E89A25]">
              {isMarathi ? 'आमच्याविषयी' : 'About Us'}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-3">
              <span className="text-white">
                {isMarathi ? 'आमची कहाणी, तुमची ' : 'Our Story, Your '}
              </span>
              <span className="text-[#E89A25]">{isMarathi ? 'परंपरा' : 'Tradition'}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-5 max-w-xl mx-auto">
              {isMarathi
                ? 'मुंबईतील एका छोट्या स्वयंपाकघरापासून ते संपूर्ण भारतातील घराघरांपर्यंत — आमचा प्रवास अस्सलपणा, गुणवत्ता आणि परंपरेशी असलेल्या अतूट बांधिलकीत रुजलेला आहे.'
                : 'From a small kitchen in Mumbai to homes across India — our journey is rooted in authenticity, quality, and an unwavering commitment to tradition.'}
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
              {isMarathi ? 'आमचा वारसा' : 'Our Heritage'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#134e48] leading-tight">
              {isMarathi ? '२१ कळ्यांच्या मोदककलेचा वारसा' : 'A Legacy of 21-Pleat Modak Making'}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi ? (
                <>
                  <span className="font-devanagari font-semibold text-[#134e48]">२१ कळ्या</span> म्हणजे &lsquo;२१ कळ्या&rsquo; — गणेश चतुर्थीच्या वेळी अर्पण केल्या जाणाऱ्या २१ प्रकारच्या मोदकांचे प्रतीक. अन्न प्रेमाने बनवले की त्याची चव अधिक चांगली लागते या साध्या श्रद्धेने आमचा प्रवास सुरू झाला.
                </>
              ) : (
                <>
                  <strong className="text-[#134e48]">२१ कळ्या</strong> means &lsquo;21 buds&rsquo; — symbolizing the 21 varieties of modaks traditionally offered during Ganesh Chaturthi. Our journey began with a simple belief: that food made with love tastes better.
                </>
              )}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi
                ? 'भाटिया कुटुंबाने स्थापन केलेली २१ कळ्या ही अस्सल महाराष्ट्रीयन मिठाईंच्या आवडीतून जन्मली. काही काळातच आम्ही अस्सल उकडीच्या मोदकांची अस्सल चव प्रेमाने आणि समर्पणाने संपूर्ण भारतातील घराघरांपर्यंत पोहोचवली आहे.'
                : "Founded by the Bhatia family, २१ कळ्या was born from a passion for authentic Maharashtrian sweets. In a short time, we've brought the traditional taste of Ukadiche Modaks to homes across India with love and dedication."}
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {isMarathi
                ? 'आज, आम्ही सर्वोत्तम साहित्य वापरून प्रत्येक मोदक काळजीपूर्वक तयार करतो, परंपरा आणि गुणवत्तेची सांगड घालतो — कारण प्रत्येक घास हा उत्सवासारखा वाटला पाहिजे.'
                : "Today, we continue to craft every modak with the finest ingredients, blending tradition with quality — because every bite should feel like a celebration."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
              {isMarathi ? 'आमची मूल्ये' : 'Our Values'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48]">
              {isMarathi ? 'आम्हाला प्रेरणा देणारी तत्त्वे' : 'What Drives Us'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {isMarathi
                ? 'साहित्य निवडण्यापासून ते तुमची ऑर्डर पॅक करण्यापर्यंत — ही तत्त्वे आमच्या प्रत्येक कृतीला मार्गदर्शन करतात.'
                : 'These principles guide everything we do, from sourcing ingredients to packaging your order.'}
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
              {isMarathi ? 'आमची टीम' : 'Our Team'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48]">
              {isMarathi ? 'प्रत्येक उत्तम मोदकामागे' : 'Behind Every Great Modak'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {isMarathi
                ? '२१ कळ्या शक्य करणाऱ्या समर्पित माणसांना भेटा.'
                : 'Meet the passionate people who make २१ कळ्या possible.'}
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