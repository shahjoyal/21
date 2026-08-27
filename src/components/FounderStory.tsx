import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Quote } from 'lucide-react';
import { UKADICHE_STEAMING_IMAGE } from '../data/products';
import { Reveal } from './Reveal';

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

  return (
    <section className="py-14 sm:py-20 bg-[#FBEEDA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? 'आमचा प्रवास' : 'Our Journey'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#134e48]">
              {isMarathi ? 'श्रद्धेने बनवलेले, ' : 'Crafted with Devotion, '}
            </span>
            <span className="text-[#E89A25]">
              {isMarathi ? 'अभिमानाने वाटलेले' : 'Shared with Pride'}
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
                {isMarathi ? (
                  <>
                    गृह शेफ आणि पाककला मार्गदर्शक <strong className="text-[#134e48]">अक्षता भाटिया केदारी</strong> यांनी स्थापन केलेले{' '}
                    <strong className="text-[#134e48]">“२१ कळ्या — 21 Kalya™”</strong> हे पिढ्यानपिढ्या जपलेल्या पारंपरिक महाराष्ट्रीयन मिठाई कलेचा कळस आहे.
                  </>
                ) : (
                  <>
                    Founded by home chef and culinary mentor <strong className="text-[#134e48]">Akshata Bhatia Kedari</strong>,{' '}
                    <strong className="text-[#134e48]">“२१ कळ्या — 21 Kalya™”</strong> represents the culmination of generations of traditional Maharashtrian sweets-making expertise.
                  </>
                )}
              </p>
              <p>
                {isMarathi
                  ? 'मुंबईतील एका छोट्या स्वयंपाकघरातून सुरू झालेला हा प्रवास आज एका मोठ्या ऑनलाइन समुदायात व पाककला ब्रँडमध्ये रूपांतरित झाला आहे. आज आम्ही सणांसाठी अस्सल उकडीचे मोदक पुरवतो, प्रत्यक्ष पाककला वर्ग आयोजित करतो आणि घरगुती शेफना स्वतःचा शाश्वत पाककला ब्रँड सुरू करण्यास मदत करतो.'
                  : 'What started as a kitchen-laboratory in Mumbai has expanded into a massive online community and culinary brand. Today, we specialize in supplying authentic melt-in-mouth steamed Ukadiche Modaks for festivals, organizing hands-on cooking classes, and helping domestic cooks launch their own sustainable culinary labels.'}
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
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#134e48]">78K+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold">
                  {isMarathi ? 'समुदाय सदस्य' : 'Community Members'}
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
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#134e48]">10K+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-semibold">
                  {isMarathi ? 'ब्रँड फॉलोअर्स' : 'Brand Followers'}
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
                {isMarathi
                  ? '“स्वयंपाक फक्त पाककृतींबद्दल नसतो; तो शुद्ध प्रेम वाटण्याबद्दल असतो.”'
                  : '“Cooking isn’t just about recipes; it’s about sharing pure love.”'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#134e48] mt-2">
                — Akshata Bhatia Kedari
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
