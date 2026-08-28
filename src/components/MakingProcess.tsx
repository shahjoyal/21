import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Reveal, RevealGroup, revealItemVariants } from './Reveal';
import { HERO_IMAGE, UKADICHE_STEAMING_IMAGE, CRAFT_MAKING_IMAGE, ASSORTED_BOX_IMAGE } from '../data/products';

interface MakingProcessProps {
  language: 'en' | 'mr';
}

export const MakingProcess: React.FC<MakingProcessProps> = ({ language }) => {
  const isMarathi = language === 'mr';

  const steps = [
    {
      num: '1',
      image: HERO_IMAGE,
      title: isMarathi ? 'सामग्रीची निवड' : 'Selecting Ingredients',
      desc: isMarathi
        ? 'ताजा नारळ, आंबेमोहर तांदूळ व सेंद्रिय गूळ यांची काळजीपूर्वक निवड.'
        : 'Sourcing farm-fresh coconut, Ambemohar rice & organic jaggery.',
    },
    {
      num: '2',
      image: UKADICHE_STEAMING_IMAGE,
      title: isMarathi ? 'उकड शिजवणे' : 'Steaming the Ukad',
      desc: isMarathi
        ? 'तांदळाच्या पिठाची मऊ, मुलायम उकड मंद वाफेवर तयार केली जाते.'
        : 'Rice flour is kneaded and steamed into a soft, silky dough.',
    },
    {
      num: '3',
      image: CRAFT_MAKING_IMAGE,
      title: isMarathi ? '२१ कळ्यांची हाताने घडण' : 'Hand-Pleating 21 Folds',
      desc: isMarathi
        ? 'आमचे मास्टर कारागीर हाताने अस्सल २१ कळ्या घडवतात.'
        : 'Master halwais hand-craft each of the signature 21 pleats.',
    },
    {
      num: '4',
      image: ASSORTED_BOX_IMAGE,
      title: isMarathi ? 'ताजे पॅक, उबदार डिलिव्हरी' : 'Packed Fresh & Delivered',
      desc: isMarathi
        ? 'प्रीमियम पॅकेजिंगमध्ये बंद करून थेट तुमच्या दारी पोहोचवले जाते.'
        : 'Boxed in premium packaging and rushed straight to your doorstep.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Subtle premium background texture, consistent with the craft-story section above */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#134e48_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#E89A25]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#134e48]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            <Sparkles className="w-3.5 h-3.5" />
            {isMarathi ? 'निर्मिती प्रक्रिया' : 'The Making Process'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight">
            {isMarathi ? <>स्वयंपाकघरापासून तुमच्या दारापर्यंत</> : <>From Kitchen to Your Doorstep</>}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {isMarathi
              ? 'प्रत्येक मोदक काटेकोर प्रक्रियेतून जातो, जेणेकरून प्रत्येक घासात परिपूर्णता मिळेल.'
              : 'Every modak goes through a meticulous process to ensure perfection in every bite.'}
          </p>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting progress line — desktop only */}
          <div className="hidden lg:block absolute top-[19px] left-[12.5%] right-[12.5%] h-[2px] bg-[#134e48]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#E89A25] via-[#F0B94A] to-[#E89A25] rounded-full"
              style={{ transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8" stagger={0.12}>
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={revealItemVariants}
                className="relative flex flex-col items-center"
              >
                {/* Numbered badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 + idx * 0.12 }}
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  className="relative z-10 w-10 h-10 rounded-full bg-[#E89A25] text-[#134e48] font-black text-sm flex items-center justify-center shadow-lg shadow-[#E89A25]/30 ring-4 ring-[#FAF7F2] mb-4 cursor-default select-none"
                >
                  {step.num}
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#134e48]/10 transition-shadow duration-500 border border-[#134e48]/5 bg-white group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#134e48]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#134e48]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                  </div>

                  <div className="p-4 sm:p-5 bg-[#FBEEDA]">
                    <h4 className="font-serif-luxury font-bold text-sm sm:text-base text-[#134e48] mb-1 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

      </div>
    </section>
  );
};