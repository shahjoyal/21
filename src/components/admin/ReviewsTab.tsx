import React, { useEffect, useState } from 'react';
import { Review } from '../../types';
import { adminApi } from '../../api/adminApi';
import { Star, Loader2, CheckCircle2, EyeOff, Trash2, Clock, MapPin } from 'lucide-react';

type Filter = 'pending' | 'published' | 'all';

export const ReviewsTab: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState<Filter>('pending');
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadReviews = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await adminApi.getAllReviews();
      setReviews(data);
    } catch (err: any) {
      setLoadError(err.message || 'Could not load reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSetVerified = async (review: Review, verified: boolean) => {
    setBusyId(review.id);
    try {
      const updated = await adminApi.setReviewVerified(review.id, verified);
      setReviews((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err: any) {
      alert(err.message || 'Could not update review.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (review: Review) => {
    if (!confirm(`Delete this review by ${review.author}? This can't be undone.`)) return;
    setBusyId(review.id);
    try {
      await adminApi.deleteReview(review.id);
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
    } catch (err: any) {
      alert(err.message || 'Could not delete review.');
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = reviews.filter((r) => !r.verified).length;
  const publishedCount = reviews.filter((r) => r.verified).length;

  const visible = reviews.filter((r) => {
    if (filter === 'pending') return !r.verified;
    if (filter === 'published') return r.verified;
    return true;
  });

  const filterButtons: { key: Filter; label: string; count: number }[] = [
    { key: 'pending', label: 'Pending Approval', count: pendingCount },
    { key: 'published', label: 'Published', count: publishedCount },
    { key: 'all', label: 'All', count: reviews.length },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-black text-[#18564D] flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-[#EDA124]" />
          Customer Reviews
        </h3>
        <p className="text-xs text-gray-500">
          New reviews stay hidden until you approve them here. Only published reviews appear on your website.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filter === btn.key
                ? 'bg-[#18564D] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {btn.label}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                filter === btn.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {btn.count}
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="p-10 flex items-center justify-center text-gray-400 gap-2 text-sm bg-white rounded-3xl border border-gray-200">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading reviews...
        </div>
      ) : loadError ? (
        <div className="p-10 text-center text-sm text-red-600 font-semibold bg-white rounded-3xl border border-gray-200">
          {loadError}
        </div>
      ) : visible.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300">
          {filter === 'pending' ? 'No reviews waiting for approval.' : 'No reviews here yet.'}
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-gray-900">{review.author}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${
                        review.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {review.verified ? (
                        <><CheckCircle2 className="w-3 h-3" /> Published</>
                      ) : (
                        <><Clock className="w-3 h-3" /> Pending</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 flex-wrap">
                    {review.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {review.city}
                      </span>
                    )}
                    <span>{review.date}</span>
                    {review.productName && <span className="truncate">• {review.productName}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= review.rating ? 'fill-[#E89A25] text-[#E89A25]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed bg-[#FAF7F2] rounded-xl p-3 border border-gray-100">
                {review.comment}
              </p>

              <div className="flex items-center gap-2 justify-end">
                {review.verified ? (
                  <button
                    onClick={() => handleSetVerified(review, false)}
                    disabled={busyId === review.id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {busyId === review.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <EyeOff className="w-3.5 h-3.5" />}
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => handleSetVerified(review, true)}
                    disabled={busyId === review.id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors disabled:opacity-50"
                  >
                    {busyId === review.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    Verify & Publish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review)}
                  disabled={busyId === review.id}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors disabled:opacity-50"
                  aria-label={`Delete review by ${review.author}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
