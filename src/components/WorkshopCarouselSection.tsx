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
  Info
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
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSession(prev => (prev === id ? null : id));
  };

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
                const isExpanded = expandedSession === session.id;
                const seatsRemaining = session.totalSeats - session.bookedSeats;
                const fillPercentage = Math.round((session.bookedSeats / session.totalSeats) * 100);

                return (
                  <motion.div
                    key={session.id}
                    data-workshop-card
                    variants={revealItemVariants}
                    whileHover={{ y: -4 }}
                    className="group shrink-0 snap-start w-[78vw] sm:w-[220px] lg:w-[240px] max-w-[240px] bg-white rounded-2xl border border-[#E89A25]/25 shadow-sm hover:shadow-xl hover:border-[#134e48] transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Header zone: image + compact info. This whole area doubles as the
                        hover/tap trigger — the full-detail overlay below is sized to match it. */}
                    <div
                      onClick={() => toggleExpand(session.id)}
                      className="relative h-[170px] sm:h-[190px] cursor-pointer select-none shrink-0"
                    >
                      {/* Image */}
                      <div className="absolute inset-0 overflow-hidden bg-gray-900">
                        <img
                          src={session.image}
                          alt={session.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/10" />
                      </div>

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

                      {/* Tap-for-details hint (fades once hovered / expanded) */}
                      <div
                        className={`absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#134e48] transition-opacity duration-200 sm:group-hover:opacity-0 ${
                          isExpanded ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        <Info className="w-3 h-3" />
                      </div>

                      {/* Compact title + seats, pinned to bottom of the image */}
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 z-10">
                        <h3 className="font-devanagari text-[12px] sm:text-[12.5px] font-bold text-white leading-snug line-clamp-2 drop-shadow-sm">
                          {isMarathi ? session.marathiTitle : session.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1 text-[9px] text-white/85 font-semibold">
                          <span className="flex items-center gap-1 truncate">
                            <Calendar className="w-2.5 h-2.5 text-[#E89A25] shrink-0" />
                            <span className="truncate">{session.date}</span>
                          </span>
                          <span className={`shrink-0 font-bold ${seatsRemaining <= 6 ? 'text-red-300' : 'text-emerald-300'}`}>
                            {seatsRemaining} {isMarathi ? 'शिल्लक' : 'left'}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              fillPercentage >= 80 ? 'bg-red-400' : 'bg-[#E89A25]'
                            }`}
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Full-detail overlay — shown on hover (desktop) or tap (mobile) */}
                      <div
                        className={`absolute inset-0 z-20 bg-white p-3 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 ease-out ${
                          isExpanded
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-1.5 pointer-events-none'
                        } sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:pointer-events-auto`}
                      >
                        <h3 className="font-devanagari text-[12.5px] font-bold text-[#134e48] leading-snug mb-1 pr-1">
                          {isMarathi ? session.marathiTitle : session.title}
                        </h3>
                        <p className="text-[10px] text-gray-600 leading-relaxed mb-2 line-clamp-3">
                          {session.description}
                        </p>

                        <div className="space-y-1 text-[10px] text-gray-700 mb-2">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#E89A25] shrink-0" />
                            <span className="font-semibold truncate">{session.timeRange} • {session.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ChefHat className="w-3 h-3 text-[#134e48] shrink-0" />
                            <span className="truncate">{session.instructor.split('(')[0]}</span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3 h-3 text-red-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{session.location}</span>
                          </div>
                        </div>

                        <div className="mb-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#134e48] flex items-center gap-1 mb-1">
                            <BookOpen className="w-3 h-3 text-[#E89A25]" />
                            {isMarathi ? 'अभ्यासक्रम' : 'Syllabus'}
                          </span>
                          <ul className="space-y-1 text-[9.5px] text-gray-700">
                            {session.syllabus.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1 mb-1">
                            <Award className="w-3 h-3 text-[#E89A25]" />
                            {isMarathi ? 'समाविष्ट' : 'Included'}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {session.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[8.5px] font-semibold text-gray-700 border border-gray-200"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Price & Booking CTA — always visible, never covered by the overlay above */}
                    <div className="p-2.5 sm:p-3 border-t border-gray-100 flex items-center justify-between gap-2 bg-white">
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
                        onClick={(e) => { e.stopPropagation(); handleBookSeat(session); }}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-black text-[10px] shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1"
                      >
                        <Ticket className="w-3 h-3" />
                        <span>{isMarathi ? 'आरक्षित करा' : 'Book Seat'}</span>
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};