import React from 'react';
import { CRAFT_MAKING_IMAGE } from '../data/products';
import { ChefHat } from 'lucide-react';

interface HeritageCraftStoryProps {
  language: 'en' | 'mr';
}

export const HeritageCraftStory: React.FC<HeritageCraftStoryProps> = ({ language }) => {
  const isMarathi = language === 'mr';

  const craftPillars = [
    {
      num: '01',
      title: isMarathi ? 'अचूक २१ कळ्यांची हस्तकला' : 'Exact 21 Handcrafted Pleats',
      desc: isMarathi
        ? 'प्रत्येक मोदकात आमच्या कार्यशाळेत शिकवल्याप्रमाणे २१ सुरेख पाकळ्या समान अंतरावर बोटांच्या टोकाने कोरल्या जातात.'
        : 'Our master halwais skillfully teach the pinching sequence of exactly 21 distinct folds before encasing the sweet coconut core.'
    },
    {
      num: '02',
      title: isMarathi ? 'सुगंधी आंबेमोहर तांदळाची उकड' : 'Aromatic Ambemohar Dough Science',
      desc: isMarathi
        ? 'मूळ कोकणातील आंबेमोहर तांदळाच्या पिठाची गरम पाण्याची मंद आचेवर मऊ लुसलुशीत उकड व लवचिकता तंत्र.'
        : 'Stone-ground fragrant Ambemohar rice flour steamed with precise hydration to achieve a delicate, crack-free silky shell.'
    },
    {
      num: '03',
      title: isMarathi ? 'सेंद्रिय गूळ व ओल्या नारळाचे सारण' : 'Fresh Coconut & Organic Jaggery',
      desc: isMarathi
        ? 'ताज्या ओल्या नारळाचा चव, कोल्हापुरी रसायनमुक्त गूळ, वेलची व जायफळाचा मनमोहक नैसर्गिक सुगंध.'
        : 'Freshly grated Konkan coconut slow-braised with organic chemical-free Kolhapuri jaggery, green cardamom, and fresh nutmeg.'
    },
    {
      num: '04',
      title: isMarathi ? 'साजूक तूप व काश्मिरी केशर' : 'Pure A2 Cow Ghee & Kashmiri Saffron',
      desc: isMarathi
        ? 'शुद्ध साजूक तुपाची धार आणि अस्सल काश्मिरी केशर मोदकाच्या शिखरावर.'
        : 'Finished with authentic golden A2 cow ghee and hand-plucked Kashmiri saffron strands on the modak peak.'
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
            <span>{isMarathi ? 'पाककला रहस्य व तंत्र' : 'Artisan Craft & Studio Secrets'}</span>
          </div>

          <h2 className="font-devanagari text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF7F2]">
            {isMarathi ? '२१ कळ्यांचे अचूक तंत्र आणि स्टुडिओ कारागिरी' : 'The Secret Science of 21 Pleats: Master Halwai Technique'}
          </h2>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {isMarathi
              ? 'शतकानुशतके जपलेली पारंपरिक कारागिरी आणि आधुनिक पाककला स्टुडिओचे परिपूर्ण संयोजन — स्वादः परमानन्दः'
              : 'Combining centuries-old Maharashtrian confectionery heritage with modern culinary workshop precision for the ultimate taste.'}
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
                  {isMarathi ? '२१ कळ्यांचे सूत्र' : 'The 21-Pleat Mastery'}
                </span>
                <p className="text-xs text-white/90 italic">
                  &ldquo;{isMarathi ? 'अचूक २१ कळ्यांची घडी, प्रत्येक तुकड्यात शुद्ध चवीची गोडी.' : 'Twenty-one precise folds crafted with rhythm, balance, and pure organic ingredients.'}&rdquo;
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
                  {isMarathi ? '१००% शून्य भेसळ हमीपत्र' : '100% Zero-Adulteration Culinary Pledge'}
                </h5>
                <p className="text-xs text-white/80">
                  {isMarathi
                    ? 'कृत्रिम रंग, प्रिझर्व्हेटिव्ह्ज किंवा रिफाइंड साखरेचा शून्य वापर. केवळ शुद्ध घटक.'
                    : 'No artificial flavors, zero chemical preservatives, no palm oil. Pure heirloom ingredients prepared in our sanitized culinary studio kitchen.'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
