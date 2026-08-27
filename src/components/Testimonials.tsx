import React, { useState, useRef } from 'react';
import { REVIEWS } from '../data/products';
import { Review } from '../types';
import {
  Star,
  CheckCircle,
  Heart,
  GraduationCap,
  Sparkles,
  MessageSquarePlus,
  X,
  Send,
  ShieldCheck,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestimonialsProps {
  language: 'en' | 'mr';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const isMarathi = language === 'mr';

  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [productName, setProductName] = useState('Signature 21 Kalya Ukadiche Modak');
  const [comment, setComment] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    const step = card ? card.offsetWidth + 14 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      author,
      city: city || 'Pune',
      rating,
      date: 'Just now',
      occasion: productName,
      comment,
      verified: true,
      productName,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setAuthor('');
    setCity('');
    setComment('');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'workshop') return r.occasion.toLowerCase().includes('masterclass') || r.occasion.toLowerCase().includes('workshop');
    if (filterCategory === 'delivery') return !r.occasion.toLowerCase().includes('workshop');
    return true;
  });

  return (
    <section id="reviews" className="py-8 sm:py-14 bg-[#FAF7F2] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#134e48] text-[#E89A25] text-[10px] font-bold uppercase tracking-wider shadow-xs">
            <Star className="w-3 h-3 fill-[#E89A25]" />
            <span>{isMarathi ? 'ग्राहक व कार्यशाळा विद्यार्थी अनुभव' : 'Verified Reviews & Customer Love'}</span>
          </div>

          <h2 className="font-devanagari text-2xl sm:text-3xl lg:text-4xl font-black text-[#134e48] leading-tight">
            {isMarathi ? 'हजारो तृप्त खवय्ये व शिकणाऱ्यांचे अभिप्राय' : 'Loved by Over 10,000+ Modak Connoisseurs'}
          </h2>

          <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">
            {isMarathi
              ? 'मुंबई, पुणे व महाराष्ट्रातील भाविक आणि खवय्यांनी अनुभवलेली २१ कळ्यांची पवित्र परंपरा व अप्रतिम चव.'
              : 'Real verified reviews from pooja orders, festive celebrations, and culinary workshop participants.'}
          </p>
        </div>

        {/* Aggregate Ratings & Trust Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#E89A25]/40 p-4 sm:p-5 shadow-sm mb-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Big Score */}
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-5">
              <div className="flex items-baseline justify-center md:justify-start gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#134e48]">4.9</span>
                <span className="text-base text-gray-400 font-bold">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-[#E89A25] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E89A25]" />
                ))}
              </div>
              <p className="text-[11px] font-bold text-gray-600">
                {isMarathi ? '१,२५०+ सत्यापित ग्राहकांचे रेटिंग' : 'Based on 1,280+ Verified Reviews'}
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>100% Genuine Food Lovers</span>
              </div>
            </div>

            {/* Rating Bars Breakdown */}
            <div className="md:col-span-5 space-y-1 text-[11px] text-gray-600 font-medium">
              {[
                { stars: '5 Star', pct: 92 },
                { stars: '4 Star', pct: 6 },
                { stars: '3 Star', pct: 2 },
                { stars: '2 Star', pct: 0 },
                { stars: '1 Star', pct: 0 },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-10 text-right text-[10px] font-semibold">{row.stars}</span>
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#E89A25] h-full rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-7 text-[10px] text-gray-400 font-bold">{row.pct}%</span>
                </div>
              ))}
            </div>

            {/* CTA: Write a Review */}
            <div className="md:col-span-3 text-center md:text-right flex flex-col items-center md:items-end justify-center space-y-1.5">
              <span className="text-[11px] text-gray-500 font-medium">
                {isMarathi ? 'तुमचा अनुभव शेअर करा:' : 'Tried our 21-fold modaks?'}
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#134e48] hover:bg-[#0f3c36] text-[#FAF7F2] font-black text-[11px] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#E89A25]" />
                <span>{isMarathi ? 'अभिप्राय लिहा' : 'Write a Review'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Filter Pills */}
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 mb-4 overflow-x-auto">
          {[
            { id: 'all', label: isMarathi ? 'सर्व अभिप्राय (All Reviews)' : 'All Reviews' },
            { id: 'delivery', label: isMarathi ? 'घरपोच डिलिव्हरी व चव' : 'Fresh Modak Delivery' },
            { id: 'workshop', label: isMarathi ? 'कार्यशाळा व मास्टरक्लास' : 'Workshops & Masterclasses' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-[#134e48] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Nav Arrows */}
          <button
            type="button"
            onClick={() => scrollByCard('left')}
            aria-label="Previous reviews"
            className="hidden sm:flex items-center justify-center absolute -left-4 lg:-left-11 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md text-[#134e48] hover:bg-[#134e48] hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard('right')}
            aria-label="Next reviews"
            className="hidden sm:flex items-center justify-center absolute -right-4 lg:-right-11 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md text-[#134e48] hover:bg-[#134e48] hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-3.5 w-max max-w-none mx-auto px-1">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  data-review-card
                  className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[#E89A25]/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-3 shrink-0 snap-start w-[78vw] xs:w-[280px] sm:w-[240px] lg:w-[260px]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#E89A25] text-[#E89A25]" />
                        ))}
                      </div>
                      <span className="text-[9.5px] text-gray-400 font-medium">
                        {rev.date}
                      </span>
                    </div>

                    <div className="px-1.5 py-0.5 rounded-md bg-[#FAF7F2] text-[9.5px] font-bold text-[#134e48] inline-block border border-[#E89A25]/30">
                      {rev.occasion}
                    </div>

                    <p className="text-[11px] text-gray-700 leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[11.5px] text-[#134e48]">
                        {rev.author}
                      </h4>
                      <span className="text-[9.5px] text-gray-500 block">
                        {rev.city}
                      </span>
                    </div>

                    {rev.verified && (
                      <div className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>{isMarathi ? 'सत्यापित' : 'Verified'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl border-2 border-[#E89A25]/50 shadow-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-devanagari text-xl font-bold text-[#134e48] mb-1">
              {isMarathi ? 'तुमचा अभिप्राय नोंदवा' : 'Write a Customer Review'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {isMarathi ? '२१ कळ्यांच्या चवीबद्दल व अनुभवाबद्दल लिहा.' : 'Share your thoughts on the taste, pleats, and delivery.'}
            </p>

            <form onSubmit={handleAddReview} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 cursor-pointer ${
                          s <= rating ? 'fill-[#E89A25] text-[#E89A25]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#134e48] ml-2">{rating} Star Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swati K."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">City / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Kothrud"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Product / Occasion</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white"
                >
                  <option value="Signature 21 Kalya Ukadiche Modak">Signature 21 Kalya Ukadiche Modak</option>
                  <option value="The 21-Fold Masterclass Participant">The 21-Fold Masterclass Participant</option>
                  <option value="DIY Modak Masterclass Kit">DIY Modak Masterclass Kit</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How were the 21 pleats, freshness, coconut filling, and aroma?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#134e48] hover:bg-[#0f3c36] text-[#FAF7F2] font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#E89A25]" />
                <span>{isMarathi ? 'अभिप्राय सबमिट करा' : 'Submit Verified Review'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};