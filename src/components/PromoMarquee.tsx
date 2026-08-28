import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromoMarqueeProps {
  language: 'en' | 'mr';
}

/**
 * Thin, continuously-scrolling promo strip shown above the main nav bar.
 * It lives inside the same sticky <header> wrapper as <Navbar>, so it
 * scrolls with the nav and never overlaps page content — it simply adds
 * a little extra height to the sticky header, same as the nav itself does.
 * The message repeats several times in one flex track that is duplicated
 * once and animated by -50%, giving a seamless, edge-to-edge loop that
 * works identically on mobile and desktop.
 */
export const PromoMarquee: React.FC<PromoMarqueeProps> = ({ language }) => {
  const message =
    language === 'mr'
      ? 'पहिल्या खरेदीवर २०% सूट — कोड वापरा: FIRST20'
      : 'GET 20% OFF ON YOUR FIRST PURCHASE — USE CODE: FIRST20';

  // Repeat the message a few times so the track has enough width to loop
  // seamlessly even on very wide desktop screens.
  const items = Array.from({ length: 6 });

  const renderItems = () =>
    items.map((_, idx) => (
      <span
        key={idx}
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 whitespace-nowrap text-[10px] sm:text-xs font-bold tracking-wide uppercase text-[#134e48]"
      >
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
        {message}
      </span>
    ));

  return (
    <div
      className="w-full overflow-hidden bg-[#EDA124] border-b border-[#c9860f] select-none"
      role="marquee"
      aria-label={
        language === 'mr'
          ? 'पहिल्या खरेदीवर २०% सूट, कोड FIRST20 वापरा'
          : 'Get 20% off your first purchase, use code FIRST20'
      }
    >
      <div className="py-1 sm:py-1.5">
        <div className="promo-marquee-track">
          {/* Two identical copies back-to-back; animating the whole track
              by -50% of its width loops it perfectly with no visible seam. */}
          <div className="flex items-center shrink-0">{renderItems()}</div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {renderItems()}
          </div>
        </div>
      </div>
    </div>
  );
};