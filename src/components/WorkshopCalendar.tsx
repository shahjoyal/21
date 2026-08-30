import React, { useMemo, useState } from 'react';
import { WORKSHOP_SESSIONS } from '../data/products';
import { CartItem } from '../types';
import { Reveal } from './Reveal';
import { WorkshopCarouselSection } from './WorkshopCarouselSection';
import {
  Wifi,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  Leaf,
  ChefHat,
  Home as HomeIcon,
  BadgeCheck
} from 'lucide-react';

interface WorkshopCalendarProps {
  onAddToCart: (item: CartItem) => void;
  onOpenBulkInquiry: () => void;
  language: 'en' | 'mr';
}

type SortOption = 'upcoming' | 'price-low' | 'price-high' | 'seats';

export const WorkshopCalendar: React.FC<WorkshopCalendarProps> = ({
  onAddToCart,
  onOpenBulkInquiry: _onOpenBulkInquiry,
  language
}) => {
  const isMarathi = language === 'mr';

  const [typeFilter, setTypeFilter] = useState<string>('All Types');
  const [dateFilter, setDateFilter] = useState<string>('All Dates');
  const [locationFilter, setLocationFilter] = useState<string>('All Locations');
  const [sortBy, setSortBy] = useState<SortOption>('upcoming');

  const typeOptions = useMemo(
    () => ['All Types', ...Array.from(new Set(WORKSHOP_SESSIONS.map(s => s.level)))],
    []
  );
  const dateOptions = useMemo(
    () => ['All Dates', ...Array.from(new Set(WORKSHOP_SESSIONS.map(s => s.day)))],
    []
  );
  const locationOptions = useMemo(() => {
    const cities = ['Pune', 'Mumbai', 'Thane'];
    return ['All Locations', ...cities.filter(city => WORKSHOP_SESSIONS.some(s => s.location.includes(city)))];
  }, []);

  // Apply the shared filter/sort controls first, then split the result into
  // the three carousel sections by `mode`. Add more sessions with
  // mode: 'online' | 'offline' | 'type3' in data/products.ts and each
  // carousel below picks them up automatically — no other changes needed.
  const visibleSessions = useMemo(() => {
    let list = WORKSHOP_SESSIONS.filter(s => {
      const matchesType = typeFilter === 'All Types' || s.level === typeFilter;
      const matchesDate = dateFilter === 'All Dates' || s.day === dateFilter;
      const matchesLocation = locationFilter === 'All Locations' || s.location.includes(locationFilter);
      return matchesType && matchesDate && matchesLocation;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerSeat - b.pricePerSeat;
      if (sortBy === 'price-high') return b.pricePerSeat - a.pricePerSeat;
      if (sortBy === 'seats') {
        const aFill = a.bookedSeats / a.totalSeats;
        const bFill = b.bookedSeats / b.totalSeats;
        return bFill - aFill;
      }
      return 0; // upcoming = default dataset order
    });

    return list;
  }, [typeFilter, dateFilter, locationFilter, sortBy]);

  const onlineSessions = useMemo(
    () => visibleSessions.filter(s => s.mode === 'online'),
    [visibleSessions]
  );
  const offlineSessions = useMemo(
    () => visibleSessions.filter(s => s.mode === 'offline'),
    [visibleSessions]
  );
  // Placeholder third section - rename the title/subtitle in the JSX below
  // once this format is finalized.
  const type3Sessions = useMemo(
    () => visibleSessions.filter(s => s.mode === 'type3'),
    [visibleSessions]
  );

  const featureStrip = [
    {
      icon: <SlidersHorizontal className="w-4 h-4 text-[#134e48]" />,
      title: isMarathi ? 'लहान गट' : 'Small Batch',
      desc: isMarathi ? 'वैयक्तिक लक्ष' : 'Personal Attention'
    },
    {
      icon: <Leaf className="w-4 h-4 text-[#134e48]" />,
      title: isMarathi ? 'प्रिमियम साहित्य' : 'Premium',
      desc: isMarathi ? 'दर्जेदार घटक' : 'Ingredients'
    },
    {
      icon: <ChefHat className="w-4 h-4 text-[#134e48]" />,
      title: isMarathi ? 'स्टुडिओ किचन' : 'Studio Kitchen',
      desc: isMarathi ? 'प्रत्यक्ष अनुभव' : 'Experience'
    },
    {
      icon: <HomeIcon className="w-4 h-4 text-[#134e48]" />,
      title: isMarathi ? 'सोबत न्या' : 'Take Home',
      desc: isMarathi ? '२१ मोदक' : '21 Modaks'
    },
    {
      icon: <BadgeCheck className="w-4 h-4 text-[#134e48]" />,
      title: isMarathi ? 'प्रमाणपत्र' : 'Certificate',
      desc: isMarathi ? 'समाविष्ट' : 'Included'
    }
  ];

  return (
    <section id="workshops" className="pt-10 pb-8 sm:pt-14 sm:pb-12 bg-[#FBF6EA] relative w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-6 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FBEEDA] border border-[#E89A25]/40 text-[#134e48] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
            <ChefHat className="w-3.5 h-3.5 text-[#E89A25]" />
            <span>{isMarathi ? 'अस्सल मोदक • थेट मास्टरक्लास' : 'All About Modak • Live Masterclasses'}</span>
          </div>

          <h2 className="font-devanagari text-2xl sm:text-3xl lg:text-[2.6rem] font-black text-[#134e48]">
            {isMarathi ? '२१ कळ्यांच्या मोदक कार्यशाळा' : 'Hands-on 21-Pleat Modak Workshops'}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'आमच्या अनुभवी शेफकडून शिका — अचूक २१ कळ्यांची कला, मऊ उकड, पारंपारिक सारण आणि स्वतः बनवलेले २१ मोदक घरी घेऊन जा!'
              : 'Learn directly from master artisans in our studio kitchen: pinch exact 21 pleats, master dough elasticity, and take home 21 handmade modaks with a certificate.'}
          </p>
        </Reveal>

        {/* Feature Strip */}
        <Reveal className="mb-8 sm:mb-9">
          <div className="flex flex-wrap sm:flex-nowrap items-stretch justify-center gap-0 rounded-2xl border border-[#E89A25]/30 bg-white/70 overflow-hidden max-w-4xl mx-auto">
            {featureStrip.map((f, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-3 flex-1 min-w-[47%] sm:min-w-0 justify-center sm:justify-start ${
                  idx !== 0 ? 'sm:border-l border-[#E89A25]/25' : ''
                } ${idx < 2 ? 'border-b sm:border-b-0 border-[#E89A25]/25' : ''}`}
              >
                <div className="w-8 h-8 rounded-full border border-[#134e48]/30 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] font-bold text-[#134e48] whitespace-nowrap">{f.title}</p>
                  <p className="text-[10px] text-gray-500 whitespace-nowrap">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Filter / Sort Bar - applies across all three sections below */}
        <Reveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-black text-[#134e48] uppercase tracking-wider mr-1">
              {isMarathi ? 'फिल्टर:' : 'Filter By'}
            </span>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="text-xs font-semibold text-[#134e48] bg-white border border-[#E89A25]/40 rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#E89A25]/50 cursor-pointer"
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="text-xs font-semibold text-[#134e48] bg-white border border-[#E89A25]/40 rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#E89A25]/50 cursor-pointer"
            >
              {dateOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="text-xs font-semibold text-[#134e48] bg-white border border-[#E89A25]/40 rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#E89A25]/50 cursor-pointer"
            >
              {locationOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-[#134e48] uppercase tracking-wider">
              {isMarathi ? 'क्रमवारी:' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="text-xs font-semibold text-[#134e48] bg-white border border-[#E89A25]/40 rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#E89A25]/50 cursor-pointer"
            >
              <option value="upcoming">{isMarathi ? 'आगामी प्रथम' : 'Upcoming First'}</option>
              <option value="price-low">{isMarathi ? 'किंमत: कमी ते जास्त' : 'Price: Low to High'}</option>
              <option value="price-high">{isMarathi ? 'किंमत: जास्त ते कमी' : 'Price: High to Low'}</option>
              <option value="seats">{isMarathi ? 'वेगाने भरणारे' : 'Filling Fast'}</option>
            </select>
          </div>
        </Reveal>

        {/* Online Workshops */}
        <Reveal>
          <WorkshopCarouselSection
            title="Online Workshops"
            marathiTitle="ऑनलाइन कार्यशाळा"
            subtitle="Join live from anywhere over video call"
            marathiSubtitle="कुठूनही थेट व्हिडिओ कॉलद्वारे सहभागी व्हा"
            icon={<Wifi className="w-4 h-4 text-[#E89A25]" />}
            sessions={onlineSessions}
            isMarathi={isMarathi}
            onAddToCart={onAddToCart}
          />
        </Reveal>

        {/* Offline Workshops */}
        <Reveal>
          <WorkshopCarouselSection
            title="Offline Workshops"
            marathiTitle="ऑफलाइन कार्यशाळा"
            subtitle="In-person, hands-on sessions at our studios"
            marathiSubtitle="आमच्या स्टुडिओमध्ये प्रत्यक्ष उपस्थित राहून सत्र"
            icon={<MapPin className="w-4 h-4 text-[#E89A25]" />}
            sessions={offlineSessions}
            isMarathi={isMarathi}
            onAddToCart={onAddToCart}
          />
        </Reveal>

        {/* Type 3 (placeholder - rename once this format is finalized) */}
        <Reveal>
          <WorkshopCarouselSection
            title="Type 3"
            marathiTitle="टाईप ३"
            icon={<Sparkles className="w-4 h-4 text-[#E89A25]" />}
            sessions={type3Sessions}
            isMarathi={isMarathi}
            onAddToCart={onAddToCart}
          />
        </Reveal>

      </div>
    </section>
  );
};