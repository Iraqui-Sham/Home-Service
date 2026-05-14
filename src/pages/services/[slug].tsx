import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Star, Clock, MapPin, CheckCircle, ArrowRight, ChevronLeft,
  Share2, Heart, Shield, Zap, Users,
} from 'lucide-react';
import { SERVICES, CATEGORY_META, type Service } from '@/lib/services-data';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
      ))}
    </div>
  );
}

function RelatedCard({ service }: { service: Service }) {
  const meta = CATEGORY_META[service.category] ?? { color: 'bg-gray-100 text-gray-700', icon: '🔨' };
  return (
    <Link to={`/services/${service.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-36 overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${meta.color}`}>{meta.icon} {service.category}</span>
        <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">{service.name}</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm font-extrabold text-gray-900">{service.price}</span>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{service.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Service not found</h2>
        <p className="text-gray-500 text-sm mb-6">The service you're looking for doesn't exist or has been removed.</p>
        <Link to="/services" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
          Browse All Services
        </Link>
      </div>
    );
  }

  const meta = CATEGORY_META[service.category] ?? { color: 'bg-gray-100 text-gray-700', icon: '🔨' };
  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 4);
  const bookingMsg = encodeURIComponent(`Hi! I'd like to book "${service.name}" (${service.price} ${service.priceType}). Please share available slots.`);

  return (
    <>
      <Helmet>
        <title>{service.name} — HomeServe</title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{service.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left / Main ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back button (mobile) */}
            <button
              onClick={() => navigate(-1)}
              className="lg:hidden flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden aspect-video shadow-lg"
            >
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              {service.isFeatured && (
                <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow">
                  <Zap size={11} /> Featured
                </span>
              )}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'}`}
                >
                  <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md text-gray-600 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </motion.div>

            {/* Title & Meta */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${meta.color}`}>{meta.icon} {service.category}</span>
                {service.status === 'active' && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">● Available</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">{service.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <StarRow rating={service.rating} />
                  <span className="font-bold text-gray-900">{service.rating}</span>
                  <span className="text-gray-400">({service.totalReviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} className="text-indigo-400" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} className="text-indigo-400" />
                  <span>{service.location.slice(0, 3).join(', ')}{service.location.length > 3 ? ` +${service.location.length - 3} more` : ''}</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <h2 className="text-base font-bold text-gray-900 mb-3">About This Service</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </motion.div>

            {/* Features Checklist */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <h2 className="text-base font-bold text-gray-900 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-3">
                    <CheckCircle size={16} className="text-indigo-600 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Shield, label: 'Verified Pro', sub: 'Background checked', color: 'text-blue-600', bg: 'bg-blue-50' },
                  { icon: Users, label: 'Experienced', sub: '5+ years avg.', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: CheckCircle, label: 'Guaranteed', sub: '100% satisfaction', color: 'text-green-600', bg: 'bg-green-50' },
                ].map((b) => (
                  <div key={b.label} className={`${b.bg} rounded-2xl p-4 text-center`}>
                    <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                      <b.icon size={18} className={b.color} />
                    </div>
                    <div className="text-xs font-bold text-gray-900">{b.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{b.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <h2 className="text-base font-bold text-gray-900 mb-4">Availability</h2>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className={`rounded-xl px-3 py-2.5 text-center text-xs font-semibold ${i === 6 ? 'bg-red-50 text-red-400 line-through' : 'bg-white border border-gray-200 text-gray-700'}`}>
                      {day}
                      {i !== 6 && <div className="text-indigo-500 font-normal mt-0.5">8am–8pm</div>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-500" />
                  Same-day slots available in most cities. Book before 2 PM.
                </p>
              </div>
            </motion.div>

            {/* Related Services */}
            {related.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-gray-900">Related Services</h2>
                  <Link to="/services" className="text-sm text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {related.map((s) => <RelatedCard key={s.slug} service={s} />)}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right: Sticky Booking Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
              >
                {/* Price Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-extrabold">{service.price}</span>
                    <span className="text-indigo-200 text-sm mb-1">{service.priceType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-200 text-sm">
                    <Clock size={13} />
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <StarRow rating={service.rating} />
                      <span className="text-sm font-bold text-gray-900">{service.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{service.totalReviews.toLocaleString()} reviews</span>
                  </div>

                  {/* Checklist summary */}
                  <div className="space-y-2">
                    {service.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                    {service.features.length > 4 && (
                      <div className="text-xs text-indigo-600 font-medium pl-5">+{service.features.length - 4} more included</div>
                    )}
                  </div>

                  {/* Book via WhatsApp */}
                  <a
                    href={`https://wa.me/919876543210?text=${bookingMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-green-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Book via WhatsApp
                  </a>

                  {/* Step Booking CTA */}
                  <Link
                    to={`/book?service=${service.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-indigo-200 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors"
                  >
                    Schedule a Booking <ArrowRight size={14} />
                  </Link>

                  <p className="text-center text-xs text-gray-400">No payment required to book. Pay after service.</p>
                </div>
              </motion.div>

              {/* Help Card */}
              <div className="mt-4 bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-xs font-semibold text-indigo-700 mb-1">Need help choosing?</p>
                <p className="text-xs text-indigo-500 mb-3">Chat with us and we'll recommend the right service for your needs.</p>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20need%20help%20choosing%20a%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Chat with us <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
