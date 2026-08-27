import React from 'react';
import { Leaf, Flame, MapPin, Zap, ShieldCheck, Gift } from 'lucide-react';

interface TrustBadgesBarProps {
  language: 'en' | 'mr';
  variant?: 'banner' | 'card' | 'grid';
}

export const TrustBadgesBar: React.FC<TrustBadgesBarProps> = ({ language, variant = 'banner' }) => {
  const isMarathi = language === 'mr';

  const badges = [
    {
      icon: <Flame className="w-5 h-5 text-[#E89A25]" />,
      title: isMarathi ? 'दररोज ताजे वाफवलेले' : 'Freshly Steamed Daily',
      desc: isMarathi ? 'शून्य शिळे साठे • सकाळी व संध्याकाळी ताजी बॅच' : 'Zero frozen stock • 3 fresh studio batches daily',
    },
    {
      icon: <Leaf className="w-5 h-5 text-[#22c55e]" />,
      title: isMarathi ? '१००% शुद्ध शाकाहारी' : '100% Pure Vegetarian',
      desc: isMarathi ? 'अस्सल सात्विक घटक • नो जिलेटिन, नो प्रिझर्व्हेटिव्ह' : 'Sattvic ingredients • No preservatives or chemicals',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#E89A25]" />,
      title: isMarathi ? 'मुंबई व पुणे स्टुडिओ किचन' : 'Made in Mumbai & Pune',
      desc: isMarathi ? 'सदाशिव पेठ व दादर कारागिरांची निर्मिती' : 'Artisanal kitchens in Dadar & Sadashiv Peth',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#f59e0b]" />,
      title: isMarathi ? 'सेम-डे एक्सप्रेस डिलिव्हरी' : 'Same Day Express Delivery',
      desc: isMarathi ? 'इन्सुलेटेड बॉक्समध्ये गरम व सुरक्षित पोहोच' : 'Insulated royal packaging for pooja freshness',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#3b82f6]" />,
      title: isMarathi ? 'अस्सल आंबेमोहर व साजूक तूप' : 'A2 Gir Cow Ghee & Saffron',
      desc: isMarathi ? 'कोल्हापुरी सेंद्रिय गूळ व काश्मिरी केशर' : 'Organic Kolhapuri jaggery & pure saffron',
    },
  ];

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 my-6">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E89A25]/30 shadow-xs hover:shadow-md hover:border-[#134e48] transition-all flex flex-col items-start gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-[#134e48]/10 flex items-center justify-center">
              {b.icon}
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#134e48] font-devanagari leading-tight">
                {b.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-snug">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-[#134e48] via-[#18564D] to-[#0f3c36] text-[#FAF7F2] py-4 sm:py-5 border-y border-[#E89A25]/40 shadow-inner w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 sm:p-0 rounded-xl sm:rounded-none bg-white/5 sm:bg-transparent border sm:border-0 border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-black/25 border border-[#E89A25]/40 flex items-center justify-center shrink-0 shadow-sm">
                {b.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-[#F5EEDB] font-devanagari leading-tight">
                  {b.title}
                </h4>
                <p className="text-[10px] text-white/75 truncate mt-0.5 font-medium">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
