import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ChefHat,
  ChevronRight,
  Users,
  Hand,
  Home as HomeIcon,
  Award,
  ArrowRight,
  Gift,
  RotateCcw,
  UserCog,
  ShieldCheck
} from 'lucide-react';
import { WorkshopCalendar } from '../components/WorkshopCalendar';
import { Reveal } from '../components/Reveal';
import { HERO_IMAGE } from '../data/products';
import { OutletContextType } from './Layout';

export default function WorkshopsPage() {
  const ctx = useOutletContext<OutletContextType>();
  const isMarathi = ctx.language === 'mr';

  const heroFeatures = [
    {
      icon: <Users className="w-5 h-5 text-[#E89A25]" />,
      label: isMarathi ? 'गुरुंकडून शिका' : 'Learn from\nMaster Artisans'
    },
    {
      icon: <Hand className="w-5 h-5 text-[#E89A25]" />,
      label: isMarathi ? 'प्रत्यक्ष अनुभव' : 'Hands-on\nExperience'
    },
    {
      icon: <HomeIcon className="w-5 h-5 text-[#E89A25]" />,
      label: isMarathi ? '२१ मोदक न्या' : 'Take Home\n21 Handmade Modaks'
    },
    {
      icon: <Award className="w-5 h-5 text-[#E89A25]" />,
      label: isMarathi ? 'सहभाग प्रमाणपत्र' : 'Certificate of\nParticipation'
    }
  ];

  const trustItems = [
    {
      icon: <Gift className="w-5 h-5 text-[#134e48]" />,
      title: isMarathi ? 'सुरक्षित बुकिंग' : 'Secure Booking',
      desc: isMarathi ? '१००% सुरक्षित पेमेंट' : '100% secure payments'
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#134e48]" />,
      title: isMarathi ? 'सोपे पुनर्नियोजन' : 'Easy Reschedule',
      desc: isMarathi ? 'लवचिक तारीख बदल' : 'Flexible date changes'
    },
    {
      icon: <UserCog className="w-5 h-5 text-[#134e48]" />,
      title: isMarathi ? 'तज्ज्ञ मार्गदर्शन' : 'Expert Guidance',
      desc: isMarathi ? 'गुरुंकडून शिका' : 'Learn from masters'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#134e48]" />,
      title: isMarathi ? 'स्वच्छ व सुरक्षित' : 'Hygienic & Safe',
      desc: isMarathi ? 'निर्जंतुक स्टुडिओ व साधने' : 'Sanitized studio & tools'
    }
  ];

  return (
    <div className="w-full max-w-full">
      {/* Full-Bleed Split Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f3c36] via-[#134e48] to-[#0f3c36] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-stretch py-8 sm:py-10 lg:pt-8 lg:pb-12">

            {/* Left: Content */}
            <Reveal className="space-y-4 sm:space-y-5 order-2 lg:order-1 flex flex-col justify-center">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white/70">
                <Link to="/" className="text-[#E89A25] hover:text-[#f5b455] transition-colors">
                  {isMarathi ? 'मुख्यपृष्ठ' : 'Home'}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/80">{isMarathi ? 'कार्यशाळा व मास्टरक्लास' : 'Workshops & Masterclasses'}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E89A25]/50 bg-[#E89A25]/10">
                <ChefHat className="w-3.5 h-3.5 text-[#E89A25]" />
                <span className="text-[#F5EEDB] text-[10px] sm:text-xs font-bold tracking-wider uppercase font-devanagari-body">
                  {isMarathi ? 'सत्र आरक्षण' : 'Session Booking'}
                </span>
              </div>

              <h1 className="font-devanagari text-3xl sm:text-4xl lg:text-[3.1rem] font-extrabold leading-[1.08] tracking-tight">
                <span className="block text-[#FAF7F2] uppercase">
                  {isMarathi ? 'कार्यशाळा किंवा' : 'Book a Workshop or'}
                </span>
                <span className="block text-[#E89A25] uppercase">
                  {isMarathi ? 'मास्टरक्लास बुक करा' : 'Masterclass'}
                </span>
              </h1>

              <p className="text-white/75 text-sm sm:text-base max-w-md leading-relaxed">
                {isMarathi
                  ? 'आमच्या अनुभवी शेफकडून थेट शिका आणि तुमची जागा आताच आरक्षित करा.'
                  : 'Reserve your seat in a hands-on 21-pleat masterclass, taught live by our master artisans.'}
              </p>

              {/* Feature Row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2 max-w-md">
                {heroFeatures.map((f, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E89A25]/50 flex items-center justify-center shrink-0 bg-white/5">
                      {f.icon}
                    </div>
                    <p className="text-[9.5px] sm:text-[10.5px] font-semibold text-white/85 leading-tight whitespace-pre-line">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: Image */}
            <Reveal y={0} delay={0.1} className="relative order-1 lg:order-2 -mx-4 sm:mx-0 lg:h-full">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-full w-full overflow-hidden sm:rounded-3xl">
                <img
                  src={HERO_IMAGE}
                  alt="Freshly steamed 21-pleat modaks on a decorated brass thali"
                  className="w-full h-full object-cover object-[center_28%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f3c36]/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#0f3c36]/30 sm:via-transparent sm:to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Decorative wave transition into content section */}
        <div className="absolute -bottom-px left-0 right-0 h-10 sm:h-14 pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,60 L0,30 C250,60 450,0 600,0 C750,0 950,60 1200,30 L1200,60 Z"
              fill="#FBF6EA"
            />
          </svg>
        </div>
      </section>

      <WorkshopCalendar
        onAddToCart={ctx.onAddToCart}
        onOpenBulkInquiry={ctx.onOpenBulkInquiry}
        language={ctx.language}
      />

      {/* Corporate / Group Booking Nudge */}
      <div className="bg-[#FBF6EA]">
        <Reveal y={0} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#0f3c36] via-[#134e48] to-[#0f3c36] px-5 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 rounded-full border border-[#E89A25]/50 text-[#E89A25] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-devanagari text-lg sm:text-xl font-bold">
                  {isMarathi ? 'ग्रुपसाठी नियोजन करताय?' : 'Planning for a Group?'}
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5">
                  {isMarathi
                    ? 'कस्टम कार्यशाळा, कॉर्पोरेट कार्यक्रम, वाढदिवस व शालेय उपक्रमांसाठी चौकशी करा.'
                    : 'Enquire for custom workshops, corporate events, birthday celebrations & school activities.'}
                </p>
              </div>
            </div>
            <button
              onClick={ctx.onOpenBulkInquiry}
              className="shrink-0 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-[#E89A25] text-[#E89A25] text-sm font-bold hover:bg-[#E89A25] hover:text-[#134e48] transition-colors"
            >
              {isMarathi ? 'चौकशी करा' : 'Enquire Now'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>

        {/* Bottom Trust Strip */}
        <Reveal y={0} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="rounded-2xl border border-[#E89A25]/30 bg-white/60 px-5 sm:px-8 py-5 sm:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FBEEDA] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#134e48] leading-tight">{item.title}</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}