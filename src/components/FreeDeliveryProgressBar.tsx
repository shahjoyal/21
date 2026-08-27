import React from 'react';
import { Sparkles, Truck, Gift } from 'lucide-react';

interface FreeDeliveryProgressBarProps {
  currentAmount: number;
  threshold?: number;
  language: 'en' | 'mr';
  compact?: boolean;
}

export const FreeDeliveryProgressBar: React.FC<FreeDeliveryProgressBarProps> = ({
  currentAmount,
  threshold = 799,
  language,
  compact = false,
}) => {
  const isMarathi = language === 'mr';
  const remaining = Math.max(0, threshold - currentAmount);
  const percentage = Math.min(100, Math.round((currentAmount / threshold) * 100));
  const isUnlocked = remaining === 0;

  if (compact) {
    return (
      <div className="w-full bg-[#134e48]/90 text-white p-2 rounded-lg border border-[#E89A25]/40 text-xs">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#E89A25]" />
            {isUnlocked
              ? (isMarathi ? '🎉 मोफत एक्सप्रेस डिलिव्हरी लागू!' : '🎉 FREE Express Delivery Unlocked!')
              : (isMarathi ? `मोफत डिलिव्हरीसाठी आणखी ₹${remaining}` : `Add ₹${remaining} for FREE Delivery`)}
          </span>
          <span className="text-[#E89A25] font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E89A25] to-[#f5b842] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#134e48] to-[#18564D] text-white border border-[#E89A25]/50 shadow-md">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E89A25]/20 border border-[#E89A25]/50 flex items-center justify-center text-[#E89A25] shrink-0">
            {isUnlocked ? <Gift className="w-4 h-4 text-[#E89A25]" /> : <Truck className="w-4 h-4 text-[#E89A25]" />}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold font-devanagari text-[#FAF7F2] leading-tight">
              {isUnlocked ? (
                <span className="text-[#E89A25] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 inline" />
                  {isMarathi
                    ? 'अभिनंदन! मोफत वातानुकूलित डिलिव्हरी व शुद्ध साजूक तूप पाऊच अनलॉक झाले.'
                    : '🎉 Congratulations! You have unlocked FREE Express Delivery & Royal Gift Box!'}
                </span>
              ) : (
                <span>
                  {isMarathi ? (
                    <>मोफत एक्सप्रेस डिलिव्हरीसाठी फक्त <strong className="text-[#E89A25]">₹{remaining}</strong> ची खरेदी बाकी आहे.</>
                  ) : (
                    <>Add <strong className="text-[#E89A25]">₹{remaining}</strong> more to unlock <strong className="text-[#E89A25]">FREE Express Delivery</strong></>
                  )}
                </span>
              )}
            </p>
            <p className="text-[10px] text-white/75 mt-0.5">
              {isMarathi
                ? '₹७९९+ च्या ऑर्डरवर मोफत इन्सुलेटेड डिलिव्हरी व साजूक तूप'
                : 'Free insulated temperature-controlled dispatch across Mumbai & Pune on orders over ₹799'}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#E89A25] text-[#134e48]">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-black/30 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
        <div
          className={`h-full rounded-full transition-all duration-500 shadow-sm ${
            isUnlocked
              ? 'bg-gradient-to-r from-[#22c55e] to-[#4ade80] animate-pulse'
              : 'bg-gradient-to-r from-[#E89A25] via-[#f5b842] to-[#E89A25]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
