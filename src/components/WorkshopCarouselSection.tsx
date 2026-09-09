import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { WorkshopSession, CartItem } from '../types';
import { revealItemVariants } from './Reveal';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Ticket,
  ChefHat,
  BookOpen,
  Info,
  X,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

const levelBadgeClasses: Record<string, string> = {
  'Masterclass': 'bg-[#134e48] text-[#F5EEDB]',
  'Beginner': 'bg-[#134e48] text-[#F5EEDB]',
  'Family & Kids': 'bg-[#134e48] text-[#F5EEDB]',
  'Chef Intensive': 'bg-[#134e48] text-[#F5EEDB]'
};

interface WorkshopCarouselSectionProps {
  /** Section heading shown above the carousel, e.g. "Online Workshops" */
  title: string;
  marathiTitle?: string;
  /** Optional one-line subtitle under the heading */
  subtitle?: string;
  marathiSubtitle?: string;
  icon?: React.ReactNode;
  sessions: WorkshopSession[];
  isMarathi: boolean;
  onAddToCart: (item: CartItem) => void;
  /** Shown when this section currently has no matching sessions */
  emptyLabel?: string;
  marathiEmptyLabel?: string;
}

/**
 * Self-contained "row" of workshop cards: its own heading, its own
 * horizontally-scrolling carousel, and its own prev/next arrow buttons.
 * Drop as many of these on the page as needed (Online / Offline / Type 3 /
 * future categories) — each one scales automatically as more cards are
 * added to its `sessions` array, no changes needed here.
 *
 * Cards mirror the Modak product cards: just a photo + date on the card
 * itself (no hover reveal), a "Know More" tap opens a full detail modal,
 * and "Book Seat" is always visible to add straight to cart.
 */
export const WorkshopCarouselSection: React.FC<WorkshopCarouselSectionProps> = ({
  title,
  marathiTitle,
  subtitle,
  marathiSubtitle,
  icon,
  sessions,
  isMarathi,
  onAddToCart,
  emptyLabel,
  marathiEmptyLabel
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [detailSession, setDetailSession] = useState<WorkshopSession | null>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-workshop-card]');
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  const handleBookSeat = (session: WorkshopSession) => {
    const cartItem: CartItem = {
      id: `workshop-pass-${session.id}-${Date.now()}`,
      productId: session.id,
      name: isMarathi ? `कार्यशाळा प्रवेश: ${session.marathiTitle}` : `Workshop Seat: ${session.title}`,
      marathiName: `कार्यशाळा प्रवेश: ${session.marathiTitle}`,
      image: session.image || '',
      tier: {
        quantity: 1,
        label: `${session.day} (${session.timeRange})`,
        price: session.pricePerSeat,
        originalPrice: session.originalPrice
      },
      unitPrice: session.pricePerSeat,
      quantity: 1,
      isWorkshopPass: true,
      workshopDate: `${session.date} • ${session.timeRange}`
    };

    onAddToCart(cartItem);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleBookSeatFromModal = (session: WorkshopSession) => {
    handleBookSeat(session);
    setDetailSession(null);
  };

  return (
    <div className="mb-10 sm:mb-12">
      {/* Section Heading */}
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h3 className="font-devanagari text-lg sm:text-xl font-black text-[#134e48]">
          {isMarathi && marathiTitle ? marathiTitle : title}
        </h3>
        <span className="text-[10px] font-bold text-gray-400">({sessions.length})</span>

        {/* Mobile prev/next controls — the side-overlay arrows below are desktop-only
            (they'd overlap the near-full-width cards on small screens), so mobile
            gets its own compact pair up in the heading row instead. */}
        {sessions.length > 1 && (
          <div className="flex sm:hidden items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => scrollByCard('left')}
              aria-label={isMarathi ? 'मागील' : 'Previous'}
              className="w-7 h-7 rounded-full bg-white border border-[#E89A25]/40 shadow-sm flex items-center justify-center text-[#134e48] active:bg-[#134e48] active:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard('right')}
              aria-label={isMarathi ? 'पुढील' : 'Next'}
              className="w-7 h-7 rounded-full bg-white border border-[#E89A25]/40 shadow-sm flex items-center justify-center text-[#134e48] active:bg-[#134e48] active:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {(subtitle || marathiSubtitle) && (
        <p className="text-gray-500 text-xs sm:text-[13px] mb-4">
          {isMarathi && marathiSubtitle ? marathiSubtitle : subtitle}
        </p>
      )}
      {!(subtitle || marathiSubtitle) && <div className="mb-4" />}

      {/* Carousel */}
      <div className="relative">
        {sessions.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm bg-white/50 rounded-2xl border border-dashed border-[#E89A25]/30">
            {isMarathi && marathiEmptyLabel
              ? marathiEmptyLabel
              : emptyLabel || (isMarathi ? 'सध्या कोणतीही कार्यशाळा उपलब्ध नाही.' : 'No sessions here yet — check back soon.')}
          </div>
        ) : (
          <>
            {/* Prev / Next Arrows */}
            <button
              type="button"
              onClick={() => scrollByCard('left')}
              aria-label={isMarathi ? 'मागील' : 'Previous'}
              className="hidden sm:flex absolute -left-4 lg:-left-5 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E89A25]/40 shadow-md items-center justify-center text-[#134e48] hover:bg-[#134e48] hover:text-white hover:border-[#134e48] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard('right')}
              aria-label={isMarathi ? 'पुढील' : 'Next'}
              className="hidden sm:flex absolute -right-4 lg:-right-5 top-[40%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#E89A25]/40 shadow-md items-center justify-center text-[#134e48] hover:bg-[#134e48] hover:text-white hover:border-[#134e48] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.div
              ref={scrollerRef}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ staggerChildren: 0.08 }}
              className="flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-4 sm:scroll-px-0 px-4 sm:px-0 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sessions.map((session) => {
                const seatsRemaining = session.totalSeats - session.bookedSeats;

                return (
                  <motion.div
                    key={session.id}
                    data-workshop-card
                    variants={revealItemVariants}
                    className="shrink-0 snap-start w-[78vw] sm:w-[220px] lg:w-[240px] max-w-[240px] bg-white rounded-2xl border border-[#E89A25]/25 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Photo — plain, no hover reveal. Tap opens the detail modal. */}
                    <div
                      onClick={() => setDetailSession(session)}
                      className="relative h-[150px] sm:h-[165px] cursor-pointer select-none shrink-0 bg-gray-900"
                    >
                      <img
                        src={session.image}
                        alt={session.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      {/* Level & Urgency Badges */}
                      <div className="absolute top-2 left-2 flex flex-wrap items-center gap-1 z-10">
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shadow-sm ${levelBadgeClasses[session.level] || 'bg-[#134e48] text-white'}`}>
                          {session.level}
                        </span>
                        {session.urgency === 'high' && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#E89A25] text-[#134e48] text-[8px] font-black uppercase tracking-wider shadow-sm">
                            {isMarathi ? 'मर्यादित जागा' : 'Fast Filling'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title, Date & Actions — always visible, nothing hidden behind hover */}
                    <div className="p-2.5 sm:p-3 flex flex-col gap-1.5 flex-1">
                      <h3 className="font-devanagari text-[12.5px] sm:text-[13px] font-bold text-[#134e48] leading-snug line-clamp-2">
                        {isMarathi ? session.marathiTitle : session.title}
                      </h3>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-semibold">
                        <span className="flex items-center gap-1 truncate">
                          <Calendar className="w-3 h-3 text-[#E89A25] shrink-0" />
                          <span className="truncate">{session.date}</span>
                        </span>
                        <span className={`shrink-0 font-bold ${seatsRemaining <= 6 ? 'text-red-500' : 'text-emerald-600'}`}>
                          {seatsRemaining} {isMarathi ? 'शिल्लक' : 'left'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setDetailSession(session)}
                        className="self-start flex items-center gap-1 text-[10px] font-bold text-[#134e48] hover:text-[#B45309] transition-colors"
                      >
                        <Info className="w-3 h-3 text-[#E89A25]" />
                        <span className="underline underline-offset-2">
                          {isMarathi ? 'अधिक माहिती' : 'Know More'}
                        </span>
                      </button>

                      {/* Footer Price & Booking CTA — always visible */}
                      <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[8px] text-gray-500 block uppercase font-bold tracking-wide">
                            {isMarathi ? 'प्रवेश शुल्क:' : 'Pass:'}
                          </span>
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <span className="text-sm sm:text-base font-black text-[#134e48]">
                              ₹{session.pricePerSeat}
                            </span>
                            {session.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                ₹{session.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleBookSeat(session)}
                          className="shrink-0 px-3 py-1.5 rounded-lg bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-black text-[10px] shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1"
                        >
                          <Ticket className="w-3 h-3" />
                          <span>{isMarathi ? 'आरक्षित करा' : 'Book Seat'}</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>

      {/* Full Detail Modal — opened by tapping the photo or "Know More" */}
      {detailSession && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setDetailSession(null)}
        >
          <div
            className="bg-[#FAF7F2] w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border-2 border-[#E89A25]/50 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setDetailSession(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow"
              aria-label="Close workshop details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-12">

              {/* Media Column */}
              <div className="sm:col-span-5 relative h-56 sm:h-auto bg-gray-900">
                <img
                  src={detailSession.image}
                  alt={detailSession.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${levelBadgeClasses[detailSession.level] || 'bg-[#134e48] text-white'}`}>
                    {detailSession.level}
                  </span>
                  {detailSession.urgency === 'high' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#E89A25] text-[#134e48] text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {isMarathi ? 'मर्यादित जागा' : 'Fast Filling'}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#E89A25]" />
                    <span>{detailSession.date}</span>
                  </div>
                  <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        Math.round((detailSession.bookedSeats / detailSession.totalSeats) * 100) >= 80
                          ? 'bg-red-400'
                          : 'bg-[#E89A25]'
                      }`}
                      style={{ width: `${Math.round((detailSession.bookedSeats / detailSession.totalSeats) * 100)}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 block ${
                    detailSession.totalSeats - detailSession.bookedSeats <= 6 ? 'text-red-300' : 'text-emerald-300'
                  }`}>
                    {detailSession.totalSeats - detailSession.bookedSeats} {isMarathi ? 'जागा शिल्लक' : 'seats left'}
                  </span>
                </div>
              </div>

              {/* Details Column */}
              <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#FAF7F2]">

                <div className="space-y-3">
                  <div>
                    <h3 className="font-devanagari text-xl sm:text-2xl font-black text-[#134e48] leading-tight pr-6">
                      {isMarathi ? detailSession.marathiTitle : detailSession.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed">
                    {detailSession.description}
                  </p>

                  <div className="space-y-1 text-[11px] text-gray-700 bg-white p-2.5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E89A25] shrink-0" />
                      <span className="font-semibold">{detailSession.timeRange} • {detailSession.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5 text-[#134e48] shrink-0" />
                      <span>{detailSession.instructor}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{detailSession.location}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#134e48] flex items-center gap-1 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#E89A25]" />
                      {isMarathi ? 'अभ्यासक्रम' : 'Syllabus'}
                    </span>
                    <ul className="space-y-1 text-[11px] text-gray-700">
                      {detailSession.syllabus.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-[#E89A25]" />
                      {isMarathi ? 'समाविष्ट' : 'Included'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {detailSession.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#FAF7F2] text-[10px] font-semibold text-gray-700 border border-gray-200"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Book Seat */}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">
                      {isMarathi ? 'प्रवेश शुल्क:' : 'Pass:'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#134e48]">
                        ₹{detailSession.pricePerSeat}
                      </span>
                      {detailSession.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{detailSession.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookSeatFromModal(detailSession)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E89A25] to-[#f5b842] hover:from-[#d98c1a] hover:to-[#e89a25] text-[#134e48] font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isMarathi ? 'आरक्षित करा' : 'Book Seat'}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
