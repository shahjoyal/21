import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { WorkshopSession, CartItem } from '../types';
import { revealItemVariants } from './Reveal';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Ticket,
  ChefHat,
  BookOpen
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
              className="flex flex-nowrap gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-[10vw] sm:scroll-px-0 px-[10vw] sm:px-0 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    whileHover={{ y: -3 }}
                    className="shrink-0 snap-center w-[78vw] sm:w-[320px] lg:w-[350px] max-w-[350px] bg-white rounded-2xl border border-[#E89A25]/25 shadow-sm hover:shadow-lg hover:border-[#134e48] transition-shadow flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Top Image & Badges Banner */}
                      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-900">
                        <img
                          src={session.image}
                          alt={session.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5" />

                        {/* Level & Urgency Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${levelBadgeClasses[session.level] || 'bg-[#134e48] text-white'}`}>
                            {session.level}
                          </span>
                          {session.urgency === 'high' && (
                            <span className="px-2 py-0.5 rounded-full bg-[#E89A25] text-[#134e48] text-[9px] font-black uppercase tracking-wider shadow-sm">
                              {isMarathi ? 'मर्यादित जागा' : 'Fast Filling'}
                            </span>
                          )}
                        </div>

                        {/* Duration & Date overlay at bottom of image */}
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px]">
                          <div className="flex items-center gap-1 font-bold">
                            <Calendar className="w-3 h-3 text-[#E89A25]" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-semibold">
                            <Clock className="w-2.5 h-2.5 text-[#E89A25]" />
                            <span>{session.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="p-3.5 sm:p-4 space-y-2.5">

                        <div>
                          <h3 className="font-devanagari text-sm sm:text-[1.05rem] font-bold text-[#134e48] group-hover:text-[#E89A25] transition-colors leading-snug">
                            {isMarathi ? session.marathiTitle : session.title}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2">
                            {session.description}
                          </p>
                        </div>

                        {/* Quick Specs Grid */}
                        <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-[#FAF7F2] p-2 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <Clock className="w-3 h-3 text-[#E89A25] shrink-0" />
                            <span className="font-semibold">{session.timeRange}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <ChefHat className="w-3 h-3 text-[#134e48] shrink-0" />
                            <span className="truncate">{session.instructor.split('(')[0]}</span>
                          </div>
                          <div className="col-span-2 flex items-start gap-1.5 text-gray-700 pt-1 border-t border-gray-200/60">
                            <MapPin className="w-3 h-3 text-red-600 shrink-0 mt-0.5" />
                            <span className="text-[10px] leading-tight text-gray-600 truncate">{session.location}</span>
                          </div>
                        </div>

                        {/* Seats Availability Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-bold gap-1">
                            <span className="text-gray-600 flex items-center gap-1 shrink-0">
                              <Users className="w-3 h-3 text-[#134e48]" />
                              {isMarathi ? 'जागा:' : 'Seats:'}
                            </span>
                            <span className={`truncate ${seatsRemaining <= 6 ? 'text-red-600 font-extrabold' : 'text-emerald-700'}`}>
                              {seatsRemaining} {isMarathi ? 'शिल्लक' : 'left'} ({session.bookedSeats}/{session.totalSeats})
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                fillPercentage >= 80 ? 'bg-red-500' : 'bg-[#E89A25]'
                              }`}
                              style={{ width: `${fillPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Expandable Syllabus & Highlights */}
                        <div className="pt-0.5">
                          <button
                            onClick={() => toggleExpand(session.id)}
                            className="text-[10px] font-bold text-[#134e48] hover:text-[#E89A25] flex items-center gap-1 transition-colors"
                          >
                            <span>{isExpanded ? (isMarathi ? 'तपशील लपवा' : 'Hide Details') : (isMarathi ? 'अभ्यासक्रम पहा' : 'View Syllabus')}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          {isExpanded && (
                            <div className="mt-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E89A25]/30 space-y-2 animate-in fade-in duration-200">
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#134e48] block mb-1 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3 text-[#E89A25]" />
                                  {isMarathi ? 'कार्यशाळेत काय शिकाल?' : 'Syllabus & Techniques:'}
                                </span>
                                <ul className="space-y-1 text-[10px] text-gray-700">
                                  {session.syllabus.map((item, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="pt-2 border-t border-gray-200">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600 block mb-1 flex items-center gap-1">
                                  <Award className="w-3 h-3 text-[#E89A25]" />
                                  {isMarathi ? 'समाविष्ट फायदे:' : 'Included in Pass:'}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {session.highlights.map((h, i) => (
                                    <span
                                      key={i}
                                      className="px-1.5 py-0.5 rounded bg-white text-[9px] font-semibold text-gray-700 border border-gray-200"
                                    >
                                      {h}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* Footer Price & Booking CTA */}
                    <div className="p-3.5 sm:p-4 pt-3 border-t border-gray-100 mt-2 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-wide">
                          {isMarathi ? 'प्रवेश शुल्क:' : 'Pass:'}
                        </span>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-base sm:text-lg font-black text-[#134e48]">
                            ₹{session.pricePerSeat}
                          </span>
                          {session.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{session.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookSeat(session)}
                        className="shrink-0 px-4 py-2 rounded-xl bg-[#E89A25] hover:bg-[#d98c1a] text-[#134e48] font-black text-[11px] shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Ticket className="w-3.5 h-3.5" />
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