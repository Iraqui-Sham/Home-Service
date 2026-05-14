import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Search, MapPin, Star, Clock, SlidersHorizontal, X,
  ChevronDown, ArrowRight, Zap,
} from 'lucide-react';
import { SERVICES, CATEGORIES, CITIES, CATEGORY_META, type Service } from '@/lib/services-data';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'reviews', label: 'Most Reviewed' },
];

function parsePrice(p: string): number {
  return parseInt(p.replace(/[^0-9]/g, ''), 10) || 0;
}

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const meta = CATEGORY_META[service.category] ?? { color: 'bg-gray-100 text-gray-700', icon: '🔨' };
  const msg = encodeURIComponent(`Hi! I'd like to book "${service.name}". Please share availability.`);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        {service.isFeatured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow">
            <Zap size={10} /> Featured
          </span>
        )}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.color}`}>
          {meta.icon} {service.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5">{service.name}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-2">{service.description}</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <StarRow rating={service.rating} />
            <span className="text-xs font-semibold text-gray-700 ml-1">{service.rating}</span>
            <span className="text-xs text-gray-400">({service.totalReviews.toLocaleString()})</span>
          </div>
          <span className="text-gray-200">|</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={11} /> {service.duration}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-extrabold text-gray-900">{service.price}</span>
            <span className="text-xs text-gray-400 ml-1">{service.priceType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/services/${service.slug}`}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Details
            </Link>
            <a
              href={`https://wa.me/919876543210?text=${msg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCity, setActiveCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...SERVICES];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') list = list.filter((s) => s.category === activeCategory);
    if (activeCity !== 'All Cities') list = list.filter((s) => s.location.includes(activeCity));
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price_asc') list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sortBy === 'reviews') list.sort((a, b) => b.totalReviews - a.totalReviews);
    else list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, activeCategory, activeCity, sortBy]);

  const featured = SERVICES.filter((s) => s.isFeatured);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveCity('All Cities');
    setSortBy('featured');
  };

  const hasFilters = search || activeCategory !== 'All' || activeCity !== 'All Cities';

  return (
    <>
      <Helmet>
        <title>All Services — HomeServe</title>
        <meta name="description" content="Browse 200+ professional home services. Filter by category, location, and price. Book electricians, plumbers, AC repair, painters, carpenters & cleaners." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">200+ Services</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Find the Right Service</h1>
            <p className="text-indigo-300 text-sm max-w-lg">Verified professionals, transparent pricing, WhatsApp booking — all in one place.</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-7 flex flex-col sm:flex-row gap-3"
          >
            <div className="flex items-center gap-2 flex-1 bg-white rounded-xl px-4 py-3 shadow-lg">
              <Search size={16} className="text-indigo-400 shrink-0" />
              <input
                type="text"
                placeholder="Search services, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
              <MapPin size={15} className="text-indigo-400 shrink-0" />
              <select
                value={activeCity}
                onChange={(e) => setActiveCity(e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={13} className="text-gray-400 shrink-0" />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="sm:hidden flex items-center justify-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg text-sm font-semibold text-gray-700"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {meta && <span>{meta.icon}</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{filtered.length}</span> services found
            </span>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white cursor-pointer hover:border-indigo-300 transition-colors"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Featured Strip */}
        {activeCategory === 'All' && !search && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" /> Featured Services
              </h2>
              <Link to="#" className="text-sm text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
            <hr className="mt-10 border-gray-100" />
          </div>
        )}

        {/* All Services Grid */}
        <div>
          {activeCategory !== 'All' || search ? (
            <h2 className="text-lg font-extrabold text-gray-900 mb-5">
              {activeCategory !== 'All' ? activeCategory : 'Search Results'}
            </h2>
          ) : (
            <h2 className="text-lg font-extrabold text-gray-900 mb-5">All Services</h2>
          )}

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {filtered.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500 text-sm mb-5">Try adjusting your search or filters.</p>
                <button onClick={clearFilters} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 pb-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-gray-900">Filters & Sort</h3>
                <button onClick={() => setFilterOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort By</p>
                <div className="grid grid-cols-2 gap-2">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setSortBy(o.value)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        sortBy === o.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
