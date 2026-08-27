import React, { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Leaf,
  ChefHat,
  Hand,
  ShieldCheck,
  Eye,
  ShoppingBag,
  Check,
  Flower2,
  SlidersHorizontal,
} from 'lucide-react';
import { Reveal, revealItemVariants } from '../components/Reveal';
import { HERO_IMAGE } from '../data/products';
import { CartItem, ModakProduct } from '../types';
import { OutletContextType } from './Layout';

type CategoryFilter = 'all' | 'signature' | 'bestsellers' | 'sugarfree' | 'ukadiche' | 'dryfruit_mawa';
type SortOption = 'popularity' | 'price_low' | 'price_high' | 'newest';

const PAGE_SIZE = 12;

export default function ShopPage() {
  const ctx = useOutletContext<OutletContextType>();
  const isMarathi = ctx.language === 'mr';

  // ---- Filter State ----
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [dietary, setDietary] = useState({ sugarFree: false, noPreservatives: false, glutenFree: false });
  const [sort, setSort] = useState<SortOption>('popularity');
  const [page, setPage] = useState(1);
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>({});

  const [openSections, setOpenSections] = useState({ category: true, price: true, dietary: true });
  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const priceBounds = useMemo(() => {
    const allPrices = ctx.products.flatMap((p) => p.priceTiers.map((t) => t.price));
    return {
      min: allPrices.length ? Math.min(...allPrices) : 200,
      max: allPrices.length ? Math.max(...allPrices) : 1200,
    };
  }, [ctx.products]);

  const [priceMax, setPriceMax] = useState<number>(priceBounds.max);
  useEffect(() => setPriceMax(priceBounds.max), [priceBounds.max]);

  const t = {
    home: isMarathi ? 'मुख्यपृष्ठ' : 'Home',
    shop: isMarathi ? 'आमचे मोदक' : 'Our Modaks',
    eyebrow: isMarathi ? 'सिग्नेचर संकलन' : 'Signature Collection',
    title: isMarathi ? 'आमचे सर्वोत्तम मोदक' : 'Our Finest Modaks',
    subtitle: isMarathi
      ? 'अस्सल घटक व पारंपरिक पाककृतींनी बनवलेल्या आमच्या उत्कृष्ट मोदकांचा संग्रह पाहा.'
      : 'Discover our exquisite range of handcrafted modaks made with authentic ingredients and traditional recipes.',
    filterBy: isMarathi ? 'फिल्टर करा' : 'Filter By',
    categories: isMarathi ? 'प्रकार' : 'Categories',
    priceRange: isMarathi ? 'किंमत श्रेणी' : 'Price Range',
    dietaryPref: isMarathi ? 'आहार प्राधान्य' : 'Dietary Preference',
    sortBy: isMarathi ? 'क्रमवारी' : 'Sort By',
    clearAll: isMarathi ? 'सर्व फिल्टर काढा' : 'Clear all filters',
    addToCart: isMarathi ? 'थाळीत जोडा' : 'Add to cart',
    added: isMarathi ? 'जोडले गेले' : 'Added',
    noResults: isMarathi ? 'कोणतेही मोदक जुळत नाहीत' : 'No modaks match your filters',
  };

  const categoryOptions: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: isMarathi ? 'सर्व मोदक' : 'All Modaks' },
    { key: 'signature', label: isMarathi ? 'सिग्नेचर मोदक' : 'Signature Modaks' },
    { key: 'bestsellers', label: isMarathi ? 'सर्वाधिक पसंती' : 'Bestsellers' },
    { key: 'sugarfree', label: isMarathi ? 'साखरमुक्त' : 'Sugar-Free' },
    { key: 'ukadiche', label: isMarathi ? 'उकडीचे मोदक' : 'Ukadiche Modaks' },
    { key: 'dryfruit_mawa', label: isMarathi ? 'ड्रायफ्रूट व मावा' : 'Dry Fruit & Mawa' },
  ];

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'popularity', label: isMarathi ? 'लोकप्रियता' : 'Popularity' },
    { key: 'price_low', label: isMarathi ? 'किंमत: कमी ते जास्त' : 'Price: Low to High' },
    { key: 'price_high', label: isMarathi ? 'किंमत: जास्त ते कमी' : 'Price: High to Low' },
    { key: 'newest', label: isMarathi ? 'नवीनतम' : 'Newest First' },
  ];

  // ---- Filtering + Sorting ----
  const filteredProducts = useMemo(() => {
    let list = [...ctx.products];

    if (category === 'signature') list = list.filter((p) => p.isSignature21Kalya);
    else if (category === 'bestsellers') list = list.filter((p) => p.isBestseller);
    else if (category === 'sugarfree')
      list = list.filter((p) => p.category === 'sugarfree' || p.dietary.includes('No Added Sugar'));
    else if (category === 'ukadiche') list = list.filter((p) => p.category === 'ukadiche');
    else if (category === 'dryfruit_mawa') list = list.filter((p) => p.category === 'dryfruit_mawa');

    if (dietary.sugarFree) list = list.filter((p) => p.dietary.includes('No Added Sugar'));
    if (dietary.noPreservatives) list = list.filter((p) => p.dietary.includes('Studio Fresh'));
    if (dietary.glutenFree) list = list.filter((p) => p.dietary.includes('Gluten Free'));

    list = list.filter((p) => (p.priceTiers[0]?.price ?? 0) <= priceMax);

    list.sort((a, b) => {
      const priceA = a.priceTiers[0]?.price ?? 0;
      const priceB = b.priceTiers[0]?.price ?? 0;
      if (sort === 'price_low') return priceA - priceB;
      if (sort === 'price_high') return priceB - priceA;
      if (sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.rating * b.reviewCount - a.rating * a.reviewCount;
    });

    return list;
  }, [ctx.products, category, dietary, priceMax, sort]);

  // Reset to page 1 whenever the result set changes shape.
  useEffect(() => setPage(1), [category, dietary, priceMax, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

  const clearAllFilters = () => {
    setCategory('all');
    setDietary({ sugarFree: false, noPreservatives: false, glutenFree: false });
    setPriceMax(priceBounds.max);
    setSort('popularity');
  };

  const activeFilterCount =
    (category !== 'all' ? 1 : 0) +
    (dietary.sugarFree ? 1 : 0) +
    (dietary.noPreservatives ? 1 : 0) +
    (dietary.glutenFree ? 1 : 0) +
    (priceMax < priceBounds.max ? 1 : 0);

  // ---- Add to Cart ----
  const handleAddToCart = (product: ModakProduct) => {
    const tierIdx = selectedTiers[product.id] || 0;
    const tier = product.priceTiers[tierIdx] || product.priceTiers[0];

    const cartItem: CartItem = {
      id: `${product.id}-${tier.quantity}-${Date.now()}`,
      productId: product.id,
      name: isMarathi ? product.marathiName : product.name,
      marathiName: product.marathiName,
      image: product.image,
      tier,
      unitPrice: tier.price,
      quantity: 1,
    };

    ctx.onAddToCart(cartItem);

    try {
      confetti({ particleCount: 45, spread: 50, origin: { y: 0.8 } });
    } catch {
      // safe fallback
    }
  };

  const featureRow = [
    { icon: <Leaf className="w-5 h-5 text-[#134e48]" />, label: isMarathi ? '१००% नैसर्गिक घटक' : '100% Natural\nIngredients' },
    { icon: <ChefHat className="w-5 h-5 text-[#134e48]" />, label: isMarathi ? 'पारंपरिक पाककृती' : 'Traditional\nRecipes' },
    { icon: <Hand className="w-5 h-5 text-[#134e48]" />, label: isMarathi ? 'प्रेमाने हाताने बनवलेले' : 'Handcrafted\nwith Love' },
    { icon: <ShieldCheck className="w-5 h-5 text-[#134e48]" />, label: isMarathi ? 'स्वच्छ व ताजे पॅकिंग' : 'Hygienic &\nFreshly Packed' },
  ];

  return (
    <div className="w-full max-w-full bg-[#FBF6EA]">
      {/* ================= Hero Banner ================= */}
      <section className="relative overflow-hidden bg-[#FBF6EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#134e48]/60 mb-6">
            <Link to="/" className="hover:text-[#E89A25] transition-colors">
              {t.home}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#134e48]">{t.shop}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left: Text */}
            <Reveal className="space-y-4 sm:space-y-5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E89A25]">
                {t.eyebrow}
              </span>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#134e48] leading-tight uppercase">
                {t.title}
              </h1>

              <div className="flex items-center gap-3 text-[#E89A25]">
                <span className="h-px w-10 bg-[#E89A25]/50" />
                <Flower2 className="w-4 h-4" />
                <span className="h-px w-10 bg-[#E89A25]/50" />
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">{t.subtitle}</p>

              <div className="grid grid-cols-4 gap-3 pt-2 max-w-md">
                {featureRow.map((f, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-11 h-11 rounded-full bg-white border border-[#134e48]/10 flex items-center justify-center shrink-0 shadow-sm">
                      {f.icon}
                    </div>
                    <p className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#134e48]/80 leading-tight whitespace-pre-line">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: Image */}
            <Reveal y={0} delay={0.1} className="relative -mx-4 sm:mx-0">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={HERO_IMAGE}
                  alt="Freshly steamed 21-pleat modaks on a decorated brass thali"
                  className="w-full h-full object-cover object-[center_28%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= Filters + Grid ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* ---------- Sidebar ---------- */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal className="w-4 h-4 text-[#134e48]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[#134e48]">{t.filterBy}</h2>
            </div>

            {/* Categories */}
            <div className="border-b border-black/10 pb-5 mb-5">
              <button
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between mb-3 cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#134e48]">{t.categories}</span>
                {openSections.category ? (
                  <ChevronUp className="w-4 h-4 text-[#134e48]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#134e48]/60" />
                )}
              </button>
              {openSections.category && (
                <div className="space-y-2.5">
                  {categoryOptions.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === opt.key}
                        onChange={() => setCategory(opt.key)}
                        className="w-4 h-4 accent-[#134e48] cursor-pointer"
                      />
                      <span
                        className={`text-sm transition-colors ${
                          category === opt.key ? 'text-[#134e48] font-semibold' : 'text-gray-600 group-hover:text-[#134e48]'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="border-b border-black/10 pb-5 mb-5">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between mb-3 cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#134e48]">{t.priceRange}</span>
                {openSections.price ? (
                  <ChevronUp className="w-4 h-4 text-[#134e48]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#134e48]/60" />
                )}
              </button>
              {openSections.price && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={10}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#134e48] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-xs font-bold text-[#134e48]">
                    <span>₹{priceBounds.min}</span>
                    <span>₹{priceMax}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dietary Preference */}
            <div className="border-b border-black/10 pb-5 mb-5">
              <button
                onClick={() => toggleSection('dietary')}
                className="w-full flex items-center justify-between mb-3 cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#134e48]">{t.dietaryPref}</span>
                {openSections.dietary ? (
                  <ChevronUp className="w-4 h-4 text-[#134e48]/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#134e48]/60" />
                )}
              </button>
              {openSections.dietary && (
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dietary.sugarFree}
                      onChange={(e) => setDietary((prev) => ({ ...prev, sugarFree: e.target.checked }))}
                      className="w-4 h-4 accent-[#134e48] cursor-pointer rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#134e48]">
                      {isMarathi ? 'साखरमुक्त' : 'Sugar-Free'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dietary.noPreservatives}
                      onChange={(e) => setDietary((prev) => ({ ...prev, noPreservatives: e.target.checked }))}
                      className="w-4 h-4 accent-[#134e48] cursor-pointer rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#134e48]">
                      {isMarathi ? 'प्रिझर्वेटिव्ह्जमुक्त' : 'No Preservatives'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dietary.glutenFree}
                      onChange={(e) => setDietary((prev) => ({ ...prev, glutenFree: e.target.checked }))}
                      className="w-4 h-4 accent-[#134e48] cursor-pointer rounded"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#134e48]">
                      {isMarathi ? 'ग्लूटेनमुक्त' : 'Gluten-Free'}
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Sort By (also mirrored at top of grid) */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#134e48] block mb-3">{t.sortBy}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="w-full px-3 py-2 rounded-lg border border-black/10 bg-white text-sm text-[#134e48] font-medium focus:outline-none focus:ring-2 focus:ring-[#E89A25]/40 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="mt-5 text-xs font-bold text-[#E89A25] hover:text-[#B45309] underline underline-offset-2 cursor-pointer"
              >
                {t.clearAll} ({activeFilterCount})
              </button>
            )}
          </aside>

          {/* ---------- Product Grid ---------- */}
          <div className="flex-1 min-w-0">
            {/* Result count + sort (desktop) */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <p className="text-sm text-gray-600">
                {isMarathi ? 'दाखवत आहे' : 'Showing'}{' '}
                <span className="font-bold text-[#134e48]">
                  {filteredProducts.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filteredProducts.length)}
                </span>{' '}
                {isMarathi ? 'पैकी' : 'of'} <span className="font-bold text-[#134e48]">{filteredProducts.length}</span>{' '}
                {isMarathi ? 'उत्पादने' : 'products'}
              </p>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="hidden sm:block px-3 py-2 rounded-lg border border-black/10 bg-white text-xs sm:text-sm text-[#134e48] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E89A25]/40 cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {isMarathi ? opt.label : `Sort by: ${opt.label}`}
                  </option>
                ))}
              </select>
            </div>

            {pageItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-[#134e48] font-bold">{t.noResults}</p>
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-bold text-[#E89A25] hover:text-[#B45309] underline underline-offset-2 cursor-pointer"
                >
                  {t.clearAll}
                </button>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                transition={{ staggerChildren: 0.05 }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {pageItems.map((product) => {
                  const selectedTierIdx = selectedTiers[product.id] || 0;
                  const currentTier = product.priceTiers[selectedTierIdx] || product.priceTiers[0];
                  const isAdded = ctx.cart.some(
                    (item) =>
                      item.productId === product.id &&
                      item.tier.quantity === currentTier.quantity &&
                      !item.isWorkshopPass
                  );

                  const price = currentTier.price;
                  const originalPrice = currentTier.originalPrice || Math.round(price * 1.15);
                  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

                  const badge = product.isSignature21Kalya
                    ? { label: isMarathi ? '२१ कळ्या सिग्नेचर' : 'Signature', dot: 'bg-[#134e48]', text: 'text-[#134e48]' }
                    : product.isBestseller
                    ? { label: isMarathi ? 'सर्वाधिक पसंती' : 'Bestseller', dot: 'bg-[#E89A25]', text: 'text-[#8a5a10]' }
                    : product.isNew
                    ? { label: isMarathi ? 'नवीन' : 'New', dot: 'bg-emerald-600', text: 'text-emerald-800' }
                    : product.dietary.some((d) => /sugar[- ]free|no added sugar/i.test(d))
                    ? { label: isMarathi ? 'साखरमुक्त' : 'Sugar-Free', dot: 'bg-emerald-600', text: 'text-emerald-800' }
                    : { label: isMarathi ? 'पारंपारिक' : 'Traditional', dot: 'bg-stone-400', text: 'text-stone-600' };

                  return (
                    <motion.div
                      key={product.id}
                      variants={revealItemVariants}
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className={`bg-white rounded-[20px] overflow-hidden group relative transition-shadow duration-500 shadow-[0_1px_2px_rgba(19,78,72,0.06),0_1px_10px_rgba(19,78,72,0.05)] hover:shadow-[0_20px_45px_-16px_rgba(19,78,72,0.35)] ${
                        product.isSignature21Kalya
                          ? 'ring-1 ring-[#E89A25]/50 hover:ring-[#E89A25]'
                          : 'ring-1 ring-black/[0.06] hover:ring-[#134e48]/20'
                      }`}
                    >
                      <div
                        className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 cursor-pointer"
                        onClick={() => ctx.onOpenQuickView(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />

                        <div className="absolute top-2 left-2">
                          <span
                            className={`flex items-center gap-1 pl-1.5 pr-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md shadow-[0_1px_4px_rgba(0,0,0,0.12)] text-[9px] font-bold uppercase tracking-wider ${badge.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </div>

                        {discountPercent > 0 && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#134e48] text-[#F3D48A] text-[9px] font-bold tracking-wide shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                            {discountPercent}% off
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            ctx.onOpenQuickView(product);
                          }}
                          className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#134e48] shadow-[0_1px_4px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-10"
                          title="Quick View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-3 space-y-1.5">
                        <h3 className="font-serif-luxury font-bold text-[13px] sm:text-[14.5px] text-[#134e48] leading-snug line-clamp-1 group-hover:text-[#B45309] transition-colors">
                          {isMarathi ? product.marathiName : product.name}
                        </h3>

                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif-luxury text-lg sm:text-xl font-bold text-[#134e48] tracking-tight">
                            ₹{price}
                          </span>
                          {originalPrice > price && (
                            <span className="text-[11px] text-stone-400 line-through">₹{originalPrice}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-2 px-3 rounded-full font-bold text-[12px] tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.97] ${
                            isAdded
                              ? 'bg-[#134e48] text-white ring-1 ring-[#E89A25]/50'
                              : 'bg-gradient-to-r from-[#B45309] to-[#E89A25] text-white shadow-[0_10px_24px_-8px_rgba(180,83,9,0.55)] hover:shadow-[0_14px_30px_-8px_rgba(180,83,9,0.7)] hover:-translate-y-0.5'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#E89A25]" />
                              <span>{t.added}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{t.addToCart}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#134e48] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#134e48] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-colors cursor-pointer ${
                      num === currentPage
                        ? 'bg-[#134e48] text-white'
                        : 'bg-white border border-black/10 text-[#134e48] hover:bg-[#134e48]/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center text-[#134e48] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#134e48] hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}