import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Calendar, Clock, MapPin, CheckCircle, XCircle,
  RotateCcw, MessageCircle, ChevronRight, Star,
  Package, ArrowRight,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  serviceName: string;
  category: string;
  image: string;
  price: string;
  date: string;
  timeSlot: string;
  address: string;
  city: string;
  providerName: string;
  providerPhone: string;
  status: BookingStatus;
  rating?: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'BK-2024-001',
    serviceName: 'AC Deep Clean & Service',
    category: 'AC Repair',
    image: '/assets/ac.jpg',
    price: '₹799',
    date: '2026-05-16',
    timeSlot: '10:00 AM – 12:00 PM',
    address: '42, 3rd Cross, Koramangala',
    city: 'Bengaluru',
    providerName: 'Rajan Kumar',
    providerPhone: '919876543210',
    status: 'upcoming',
  },
  {
    id: 'BK-2024-002',
    serviceName: 'Home Deep Cleaning',
    category: 'Cleaning',
    image: '/assets/cleaner.jpg',
    price: '₹1,499',
    date: '2026-05-18',
    timeSlot: '8:00 AM – 10:00 AM',
    address: '15, MG Road, Indiranagar',
    city: 'Bengaluru',
    providerName: 'Sunita Devi',
    providerPhone: '919876543211',
    status: 'upcoming',
  },
  {
    id: 'BK-2024-003',
    serviceName: 'Electrical Wiring & Repair',
    category: 'Electrician',
    image: '/assets/electrical.jpg',
    price: '₹650',
    date: '2026-05-08',
    timeSlot: '2:00 PM – 4:00 PM',
    address: '7, HSR Layout, Sector 2',
    city: 'Bengaluru',
    providerName: 'Mohan Singh',
    providerPhone: '919876543212',
    status: 'completed',
    rating: 5,
  },
  {
    id: 'BK-2024-004',
    serviceName: 'Bathroom Plumbing Fix',
    category: 'Plumbing',
    image: '/assets/plumbing.jpg',
    price: '₹499',
    date: '2026-05-01',
    timeSlot: '12:00 PM – 2:00 PM',
    address: '22, Whitefield Main Road',
    city: 'Bengaluru',
    providerName: 'Arun Patel',
    providerPhone: '919876543213',
    status: 'completed',
    rating: 4,
  },
  {
    id: 'BK-2024-005',
    serviceName: 'Interior Wall Painting',
    category: 'Painting',
    image: '/assets/panting.jpg',
    price: '₹8,400',
    date: '2026-04-22',
    timeSlot: '8:00 AM – 10:00 AM',
    address: '5, BTM Layout, Stage 1',
    city: 'Bengaluru',
    providerName: 'Ramesh Yadav',
    providerPhone: '919876543214',
    status: 'cancelled',
  },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  upcoming: { label: 'Upcoming', color: 'text-blue-700', bg: 'bg-blue-50', icon: Calendar },
  completed: { label: 'Completed', color: 'text-green-700', bg: 'bg-green-50', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
      ))}
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const cfg = STATUS_CONFIG[booking.status];
  const rescheduleMsg = encodeURIComponent(`Hi! I'd like to reschedule my booking ${booking.id} for "${booking.serviceName}". Please share available slots.`);
  const supportMsg = encodeURIComponent(`Hi! I need help with my booking ${booking.id} for "${booking.serviceName}".`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-start gap-4 p-5">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img src={booking.image} alt={booking.serviceName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{booking.serviceName}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{booking.category} · {booking.id}</p>
            </div>
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${cfg.bg} ${cfg.color}`}>
              <cfg.icon size={11} />
              {cfg.label}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Calendar size={11} className="text-indigo-400" />{formatDate(booking.date)}</span>
            <span className="flex items-center gap-1"><Clock size={11} className="text-indigo-400" />{booking.timeSlot}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={11} className="text-indigo-400 shrink-0" />
            <span className="truncate">{booking.address}, {booking.city}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-50 mx-5" />

      {/* Card Footer */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-3">
        <div>
          <span className="text-base font-extrabold text-gray-900">{booking.price}</span>
          {booking.status === 'completed' && booking.rating && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={booking.rating} />
              <span className="text-xs text-gray-400">Your rating</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {booking.status === 'upcoming' && (
            <>
              <a
                href={`https://wa.me/${booking.providerPhone}?text=${rescheduleMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw size={12} /> Reschedule
              </a>
              <a
                href={`https://wa.me/${booking.providerPhone}?text=${supportMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </>
          )}
          {booking.status === 'completed' && (
            <>
              {!booking.rating && (
                <button className="flex items-center gap-1.5 px-3 py-2 border border-amber-200 text-amber-600 text-xs font-semibold rounded-lg hover:bg-amber-50 transition-colors">
                  <Star size={12} /> Rate Service
                </button>
              )}
              <Link
                to={`/services/${booking.serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Book Again <ChevronRight size={12} />
              </Link>
            </>
          )}
          {booking.status === 'cancelled' && (
            <Link
              to="/services"
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Book Again <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'all' | BookingStatus>('all');

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('hs_bookings');

    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      setBookings(DEFAULT_BOOKINGS);
      localStorage.setItem('hs_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    }
  }, []);

  const tabs: { key: 'all' | BookingStatus; label: string; count: number }[] = [
    { key: 'all', label: 'All Bookings', count: bookings.length },
    { key: 'upcoming', label: 'Upcoming', count: bookings.filter((b) => b.status === 'upcoming').length },
    { key: 'completed', label: 'Completed', count: bookings.filter((b) => b.status === 'completed').length },
    { key: 'cancelled', label: 'Cancelled', count: bookings.filter((b) => b.status === 'cancelled').length },
  ];

  const filtered = activeTab === 'all' ? bookings : bookings.filter((b) => b.status === activeTab);

  return (
    <>
      <Helmet>
        <title>My Bookings — HomeServe</title>
        <meta name="description" content="View and manage your HomeServe bookings. Track upcoming services, view completed bookings, and reschedule via WhatsApp." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">My Account</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">My Bookings</h1>
            <p className="text-indigo-300 text-sm">Track and manage all your service bookings.</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mt-6"
          >
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'text-white' },
              { label: 'Upcoming', value: bookings.filter((b) => b.status === 'upcoming').length, color: 'text-blue-300' },
              { label: 'Completed', value: bookings.filter((b) => b.status === 'completed').length, color: 'text-green-300' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-2xl px-4 py-3 text-center">
                <div className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-indigo-300 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeTab === tab.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Booking List */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="space-y-4">
              {filtered.map((b) => <BookingCard key={b.id} booking={b} />)}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Package size={28} className="text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500 text-sm mb-6">You don't have any {activeTab !== 'all' ? activeTab : ''} bookings yet.</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Browse Services <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Banner */}
        <div className="mt-8 bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-indigo-900 mb-0.5">Need help with a booking?</p>
            <p className="text-xs text-indigo-500">Our support team is available 24/7 via WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20need%20help%20with%20my%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Chat Support
          </a>
        </div>
      </div>
    </>
  );
}
