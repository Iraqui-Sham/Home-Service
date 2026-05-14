import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search, MapPin, ChevronDown, Star, Clock, ArrowRight,
  Shield, Zap, DollarSign, Headphones, Navigation,
  CheckCircle, Users, Phone
} from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  { name: 'Electrician', count: 48, color: 'bg-yellow-50', iconBg: 'bg-yellow-100', textColor: 'text-yellow-700', icon: '⚡' },
  { name: 'Plumbing', count: 36, color: 'bg-blue-50', iconBg: 'bg-blue-100', textColor: 'text-blue-700', icon: '🔧' },
  { name: 'AC Repair', count: 29, color: 'bg-cyan-50', iconBg: 'bg-cyan-100', textColor: 'text-cyan-700', icon: '❄️' },
  { name: 'Painting', count: 42, color: 'bg-purple-50', iconBg: 'bg-purple-100', textColor: 'text-purple-700', icon: '🎨' },
  { name: 'Carpenter', count: 31, color: 'bg-amber-50', iconBg: 'bg-amber-100', textColor: 'text-amber-700', icon: '🪚' },
  { name: 'Cleaning', count: 55, color: 'bg-green-50', iconBg: 'bg-green-100', textColor: 'text-green-700', icon: '🧹' },
];

const services = [
  {
    id: 1,
    name: 'AC Deep Clean & Service',
    category: 'AC Repair',
    categoryColor: 'bg-cyan-100 text-cyan-700',
    price: '₹799',
    priceType: 'per unit',
    duration: '2-3 hrs',
    rating: 4.9,
    reviews: 1240,
    description: 'Complete AC deep cleaning, filter wash, gas check & performance optimization by certified technicians.',
    image: '/assets/ac.jpg',
    whatsapp: '9570393020',
  },
  {
    id: 2,
    name: 'Electrical Wiring & Repair',
    category: 'Electrician',
    categoryColor: 'bg-yellow-100 text-yellow-700',
    price: '₹499',
    priceType: 'starting',
    duration: '1-2 hrs',
    rating: 4.8,
    reviews: 876,
    description: 'Safe wiring, switch board repair, MCB fitting, fan installation by licensed electricians.',
    image: '/assets/electrical.jpg',
    whatsapp: '9570393020',
  },
  {
    id: 3,
    name: 'Bathroom Plumbing Fix',
    category: 'Plumbing',
    categoryColor: 'bg-blue-100 text-blue-700',
    price: '₹399',
    priceType: 'starting',
    duration: '1-3 hrs',
    rating: 4.7,
    reviews: 654,
    description: 'Tap repair, pipe leakage fix, toilet installation, drainage cleaning by expert plumbers.',
    image: '/assets/plumbing.jpg',
    whatsapp: '9570393020',
  },
  {
    id: 4,
    name: 'Interior Wall Painting',
    category: 'Painting',
    categoryColor: 'bg-purple-100 text-purple-700',
    price: '₹12/sq ft',
    priceType: 'per sq ft',
    duration: '1-3 days',
    rating: 4.8,
    reviews: 432,
    description: 'Premium quality interior painting with Asian Paints / Berger. Includes wall prep & 2 coats.',
    image: '/assets/panting.jpg',
    whatsapp: '9570393020',
  },
  {
    id: 5,
    name: 'Furniture Assembly',
    category: 'Carpenter',
    categoryColor: 'bg-amber-100 text-amber-700',
    price: '₹599',
    priceType: 'starting',
    duration: '2-4 hrs',
    rating: 4.6,
    reviews: 318,
    description: 'Wardrobe, bed, sofa, shelf assembly. Bring your own flat-pack or we source the material.',
    image: '/assets/carpenter.jpg',
    whatsapp: '9570393020',
  },
  {
    id: 6,
    name: 'Home Deep Cleaning',
    category: 'Cleaning',
    categoryColor: 'bg-green-100 text-green-700',
    price: '₹1,499',
    priceType: 'per visit',
    duration: '4-6 hrs',
    rating: 4.9,
    reviews: 2100,
    description: 'Full home deep clean — kitchen, bathrooms, bedrooms, balcony. Eco-friendly products used.',
    image: '/assets/cleaner.jpg',
    whatsapp: '9570393020',
  },
];

const steps = [
  { step: '01', icon: Search, title: 'Browse Services', desc: 'Explore 200+ home services across 6 categories. Filter by location, price & rating.' },
  { step: '02', icon: MapPin, title: 'Enter Address', desc: 'Share your location so we match you with the nearest verified professionals.' },
  { step: '03', icon: Clock, title: 'Schedule Time', desc: 'Pick a date and time that works for you. Same-day slots available in most cities.' },
  { step: '04', icon: Phone, title: 'WhatsApp Booking', desc: 'Confirm your booking via WhatsApp. Get real-time updates and provider contact.' },
];


const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'Bengaluru',
    rating: 5,
    quote: 'Booked an AC service via WhatsApp in literally 2 minutes. The technician arrived on time and did an excellent job. HomeServe is my go-to now!',
    avatar: 'PS',
    avatarColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Rahul Mehta',
    city: 'Mumbai',
    rating: 5,
    quote: 'Had a plumbing emergency at midnight. HomeServe connected me with a plumber within the hour. Transparent pricing, no surprises. Highly recommend!',
    avatar: 'RM',
    avatarColor: 'bg-green-100 text-green-700',
  },
  {
    name: 'Ananya Krishnan',
    city: 'Chennai',
    rating: 5,
    quote: 'Got my entire 2BHK painted at a very reasonable price. The painters were professional, clean, and finished ahead of schedule. Amazing experience!',
    avatar: 'AK',
    avatarColor: 'bg-purple-100 text-purple-700',
  },
];

const faqs = [
  {
    q: 'How do I book a service on HomeServe?',
    a: 'Simply browse our services, select what you need, and click "Book via WhatsApp". You\'ll be connected to our booking team on WhatsApp where you can confirm your address, preferred time, and get an instant quote.',
  },
  {
    q: 'Are all service providers verified?',
    a: 'Yes! Every professional on HomeServe goes through a rigorous 3-step verification: government ID check, skill assessment test, and background verification. Only top-rated providers are listed on our platform.',
  },
  {
    q: 'What are the pricing and payment options?',
    a: 'All prices are displayed upfront with no hidden charges. You can pay via UPI, cash, or card after the service is completed. We also offer service packages at discounted rates.',
  },
  {
    q: 'What if I\'m not satisfied with the service?',
    a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with the service, contact us within 24 hours and we\'ll arrange a free re-service or full refund — no questions asked.',
  },
  {
    q: 'Which cities does HomeServe operate in?',
    a: 'We currently operate in Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, and Pune. We\'re rapidly expanding to more cities. Enter your pincode to check availability in your area.',
  },
  {
    q: 'How quickly can I get a service?',
    a: 'Most services can be booked for same-day or next-day slots. Emergency services like plumbing and electrical repairs are available within 2-4 hours in most service areas.',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const msg = encodeURIComponent(`Hi! I'd like to book "${service.name}". Please share availability and confirm the price.`);
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${service.categoryColor}`}>
          {service.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-1.5 leading-snug">{service.name}</h3>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed flex-1">{service.description}</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <StarRating rating={service.rating} />
            <span className="text-xs font-semibold text-gray-700 ml-1">{service.rating}</span>
            <span className="text-xs text-gray-400">({service.reviews.toLocaleString()})</span>
          </div>
          <span className="text-gray-200">|</span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={11} />
            <span>{service.duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">{service.price}</span>
            <span className="text-xs text-gray-400 ml-1">{service.priceType}</span>
          </div>
          <a
            href={`https://wa.me/${service.whatsapp}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <span className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} className="text-gray-400" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">{a}</p>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  return (
    <>
      <Helmet>
        <title>HomeServe — Professional Home Services, Booked in Minutes</title>
        <meta name="description" content="India's most trusted home service marketplace. Book electricians, plumbers, AC repair, painters, carpenters & cleaners via WhatsApp. 500+ verified professionals." />
      </Helmet>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/60 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-3">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-semibold text-blue-700">Now available in 6 cities across India</span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-5"
                >
                  Professional Home Services,{' '}
                  <span className="text-blue-600">Booked in Minutes</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
                  Connect with 500+ verified home service professionals near you. Instant WhatsApp booking, transparent pricing, and guaranteed satisfaction.
                </motion.p>

                {/* Search Bar */}
                <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col sm:flex-row gap-2 mb-8 max-w-2xl">
                  <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 rounded-xl">
                    <MapPin size={16} className="text-blue-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter your location..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 rounded-xl">
                    <Search size={16} className="text-blue-500 shrink-0" />
                    <select
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-700 outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      {categories.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm whitespace-nowrap">
                    <Search size={15} />
                    Search
                  </button>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Explore Services <ArrowRight size={15} />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-semibold text-sm rounded-xl transition-all"
                  >
                    How It Works
                  </a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
                  {[
                    { icon: Users, label: '10,000+', sub: 'Happy Customers' },
                    { icon: Shield, label: '500+', sub: 'Verified Providers' },
                    { icon: Star, label: '4.8★', sub: 'Average Rating' },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <t.icon size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{t.label}</div>
                        <div className="text-xs text-gray-500">{t.sub}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.2 }}
              className="lg:col-span-2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/assets/hero.jpg"
                  alt="Professional home service technician"
                  className="w-full h-full object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle size={18} className="text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Booking Confirmed!</div>
                      <div className="text-xs text-gray-500">AC Service · Today 3:00 PM · ₹799</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating rating card */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-lg p-3.5 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-xs font-bold text-gray-900">4.9</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">2,100+ reviews</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">What We Offer</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">Browse by Category</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 max-w-xl mx-auto">Find the right professional for every home need — from quick fixes to complete renovations.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`${cat.color} rounded-2xl p-5 text-center cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-200 group`}
              >
                <div className={`${cat.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <div className={`font-bold text-sm ${cat.textColor}`}>{cat.name}</div>
                <div className="text-xs text-gray-400 mt-1">{cat.count} services</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. FEATURED SERVICES ────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Top Picks</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">Popular Services Near You</motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View all services <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. ABOUT / WHY CHOOSE US ────────────────────────────────────────── */}
      <section id="about" className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">About HomeServe</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-5 leading-tight">
                Trusted by 10,000+ Homeowners Across India
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                HomeServe was built with a simple mission: make home maintenance stress-free. We connect you with background-verified, skilled professionals who treat your home like their own. No more chasing unreliable contractors — just seamless service, every time.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5">
                {[
                  {
                    icon: Shield,
                    color: 'bg-blue-100 text-blue-600',
                    title: 'Verified Professionals',
                    desc: 'Every provider is ID-verified, skill-tested, and background-checked before onboarding.',
                  },
                  {
                    icon: DollarSign,
                    color: 'bg-green-100 text-green-600',
                    title: 'Transparent Pricing',
                    desc: 'See the full price before you book. No surprise charges, no hidden fees — ever.',
                  },
                  {
                    icon: () => (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    ),
                    color: 'bg-green-100 text-green-600',
                    title: 'WhatsApp Convenience',
                    desc: 'Book, track, and communicate with your provider — all through WhatsApp. No app needed.',
                  },
                ].map((benefit) => (
                  <motion.div key={benefit.title} variants={fadeUp} className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl ${benefit.color} flex items-center justify-center shrink-0`}>
                      <benefit.icon />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-1">{benefit.title}</div>
                      <div className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Learn More About Us <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
                <img
                  src="/assets/about.jpg"
                  alt="HomeServe professional with homeowner"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '10K+', label: 'Happy Customers' },
                    { value: '500+', label: 'Professionals' },
                    { value: '6', label: 'Cities' },
                    { value: '4.8★', label: 'Avg Rating' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-lg font-extrabold text-[#0F172A]">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Simple Process</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">How It Works</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500 max-w-lg mx-auto">Book a professional home service in 4 easy steps — no app download required.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="relative z-10 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-200">
                  <step.icon size={22} />
                </div>
                <div className="absolute top-4 right-4 text-4xl font-black text-gray-50 select-none">{step.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <ArrowRight size={18} className="text-blue-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. FEATURES (BENTO) ─────────────────────────────────────────────── */}
      <section id="features" className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Why HomeServe</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">Built for Your Peace of Mind</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* Large card */}
            <motion.div
              variants={fadeUp}
              className="lg:row-span-2 bg-[#0F172A] text-white rounded-3xl p-8 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-5">
                  <Shield size={22} />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Professionals</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every HomeServe professional undergoes a rigorous 3-step vetting process — government ID verification, skill assessment, and background check. Only the top 15% of applicants make it onto our platform.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-amber-400'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white`}>
                      {['R', 'A', 'S', 'M'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">500+ verified pros</span>
              </div>
            </motion.div>

            {/* Medium card: Fast Booking */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
                <Zap size={22} className="text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Booking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Book in under 60 seconds via WhatsApp. No app download, no long forms — just a quick message and you're confirmed.</p>
            </motion.div>

            {/* Medium card: Transparent Pricing */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                <DollarSign size={22} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">See the full price breakdown before you confirm. No hidden charges, no surprise bills — what you see is what you pay.</p>
            </motion.div>

            {/* Small card: 24/7 Support */}
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <Headphones size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
              <p className="text-sm text-blue-100 leading-relaxed">Round-the-clock customer support via chat, call, or WhatsApp. We're always here when you need us.</p>
            </motion.div>

            {/* Small card: Location-Based */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                <Navigation size={22} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location-Based Matching</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Hyper-local matching connects you with professionals within 5 km of your home for faster response times.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Customer Stories</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">What Our Customers Say</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-500">Real reviews from real homeowners across India.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F8FAFC] rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Got Questions?</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold text-[#0F172A]">Frequently Asked Questions</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FaqItem
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 9. CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-16 lg:py-24 overflow-hidden relative">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-16 -translate-y-1/2 w-32 h-32 rounded-3xl bg-blue-600/20 rotate-12 hidden lg:block" />
        <div className="absolute top-1/4 right-32 w-16 h-16 rounded-2xl bg-orange-500/20 rotate-45 hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Get Started Today</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Ready to Book Your First Service?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-8 leading-relaxed">
              Join 10,000+ happy homeowners. Book via WhatsApp in under 60 seconds — no app download, no hassle.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/9570393020?text=Hi!%20I%20want%20to%20book%20a%20home%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-green-900/30"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Get Started on WhatsApp
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 hover:border-white/40 text-white font-bold text-sm rounded-xl transition-all"
              >
                View All Services <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
