import React from 'react';
import { DELIVERY_SLOTS } from '../data/products';
import { Sun, Flame, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface FreshnessDeliverySlotProps {
  language: 'en' | 'mr';
  onSelectSlot?: (slotId: string) => void;
}

export const FreshnessDeliverySlot: React.FC<FreshnessDeliverySlotProps> = ({ language }) => {
  const isMarathi = language === 'mr';

  return (
    <section id="freshness-slots" className="py-12 sm:py-16 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#134e48]/10 text-[#134e48] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#E89A25]" />
            <span>{isMarathi ? 'ताजी बॅच व कार्यशाळा वेळापत्रक' : 'Studio Batches & Express Delivery'}</span>
          </div>

          <h2 className="font-devanagari text-2xl sm:text-3xl lg:text-4xl font-black text-[#134e48]">
            {isMarathi ? 'दररोज ताज्या वाफवलेल्या बॅचेस व कार्यशाळा स्लॉट्स' : 'Daily Fresh Steaming Schedule & Studio Delivery Slots'}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'आम्ही आदल्या दिवशीचे उरलेले मोदक कधीही देत नाही. कार्यशाळा आणि थेट ग्राहकांसाठी सकाळी, दुपारी व संध्याकाळी स्वतंत्र ताज्या बॅचेस वाफवल्या जातात.'
              : 'Zero frozen or leftover inventory. We steam in 3 dedicated daily batches for our studio workshops and express deliveries so you enjoy peak softness.'}
          </p>
        </div>

        {/* 3 Delivery Slots Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERY_SLOTS.map((slot, idx) => {
            const icons = [
              <Sun className="w-6 h-6 text-[#E89A25]" key="sun" />,
              <Flame className="w-6 h-6 text-amber-500" key="flame" />,
              <Sparkles className="w-6 h-6 text-[#E89A25]" key="sparkle" />
            ];

            return (
              <div
                key={slot.id}
                className="bg-white p-6 rounded-3xl border border-[#E89A25]/30 shadow-sm hover:shadow-xl hover:border-[#134e48] transition-all space-y-4 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#134e48] flex items-center justify-center">
                  {icons[idx]}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#E89A25] uppercase tracking-wider block">
                    {slot.timeRange}
                  </span>
                  <h3 className="font-devanagari text-xl font-bold text-[#134e48] mt-1">
                    {isMarathi ? slot.marathiTitle : slot.title}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-gray-200">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    {isMarathi ? 'या वेळेसाठी सर्वोत्तम:' : 'Recommended For:'}
                  </span>
                  <p className="text-xs font-bold text-[#134e48] mt-0.5">
                    {slot.idealFor}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isMarathi ? 'स्लॉट बुकिंग चालू आहे' : 'Batch Slots Open'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
