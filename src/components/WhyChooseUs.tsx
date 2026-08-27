import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Hand, Package, Heart } from 'lucide-react';
import { RevealGroup, revealItemVariants, Reveal } from './Reveal';

interface WhyChooseUsProps {
  language: 'en' | 'mr';
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const isMarathi = language === 'mr';

  const points = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: isMarathi ? '१००% ताजी सामग्री' : '100% Fresh Ingredients',
      desc: isMarathi
        ? 'शेतातून थेट आणलेली सर्वोत्तम नैसर्गिक सामग्री.'
        : 'We source the finest natural ingredients directly from farms.',
    },
    {
      icon: <Hand className="w-5 h-5" />,
      title: isMarathi ? 'दररोज हाताने बनवलेले' : 'Handmade Daily',
      desc: isMarathi
        ? 'प्रत्येक मोदक दररोज सकाळी प्रेमाने हाताने बनवला जातो.'
        : 'Every modak is handcrafted fresh every morning with love.',
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: isMarathi ? 'प्रीमियम पॅकेजिंग' : 'Premium Packaging',
      desc: isMarathi
        ? 'ताजेपणा टिकवणारे पर्यावरणपूरक लक्झरी पॅकेजिंग.'
        : 'Eco-friendly luxury packaging that preserves freshness.',
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: isMarathi ? 'अस्सल चव' : 'Authentic Taste',
      desc: isMarathi
        ? 'उत्तम नैसर्गिक घटकांसह बनवलेल्या पारंपरिक कौटुंबिक पाककृती.'
        : 'Traditional family recipes crafted with the finest natural ingredients.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FBEEDA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
            {isMarathi ? 'आम्हाला का निवडावे' : 'Why Choose Us'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight">
            {isMarathi ? (
              <>श्रद्धेने बनवलेले, अभिमानाने पोहोचवलेले</>
            ) : (
              <>Crafted With Passion, Delivered With Pride</>
            )}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {isMarathi
              ? 'आम्ही फक्त मोदक बनवत नाही — आम्ही तुम्हाला तुमच्या मुळांशी जोडणारे अनुभव तयार करतो.'
              : "We don't just make modaks — we create experiences that connect you to your roots."}
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
