import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  CheckCircle, Clock, MapPin, Calendar, User, Phone,
  ChevronRight, ChevronLeft, Star, ArrowRight,
} from 'lucide-react';
import { SERVICES } from '@/lib/services-data';

// ── Types ─────────────────────────────────────────────────────────────────────
interface BookingData {
  serviceSlug: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const CITIES = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad', 'Pune'];

const TIME_SLOTS = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  '6:00 PM – 8:00 PM',
];

function getNext7Days(): { label: string; value: string; day: string }[] {
  const days: { label: string; value: string; day: string }[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      value: d.toISOString().split('T')[0],
      day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[d.getDay()],
    });
  }
  return days;
}

// ── Step Indicator ─────────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ['Select Service', 'Your Details', 'Date & Time', 'Confirm'];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <CheckCircle size={14} /> : step}
              </div>
              <span className={`text-xs mt-1.5 font-medium hidden sm:block ${active ? 'text-indigo-600' : done ? 'text-gray-500' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < total - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-1 mb-5 transition-colors duration-300 ${done ? 'bg-indigo-600' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Select Service ─────────────────────────────────────────────────────
function Step1({ data, onChange, onNext }: { data: BookingData; onChange: (k: keyof BookingData, v: string) => void; onNext: () => void }) {
  return (
    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="text-xl font-extrabold text-gray-900 mb-1">Select a Service</h2>
      <p className="text-sm text-gray-500 mb-6">Choose the service you'd like to book.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {SERVICES.filter((s) => s.status === 'active').map((s) => (
          <button
            key={s.slug}
            onClick={() => { onChange('serviceSlug', s.slug); }}
            className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
              data.serviceSlug === s.slug
                ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
                : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm leading-snug truncate">{s.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.category}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm font-extrabold text-indigo-600">{s.price}</span>
                  <div className="flex items-center gap-0.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-600 font-semibold">{s.rating}</span>
                  </div>
                </div>
              </div>
              {data.serviceSlug === s.slug && (
                <CheckCircle size={18} className="text-indigo-600 shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!data.serviceSlug}
        className="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        Continue <ChevronRight size={16} />
      </button>
    </motion.div>
  );
}

// ── Step 2: Address & Contact ──────────────────────────────────────────────────
function Step2({ data, onChange, onNext, onBack }: { data: BookingData; onChange: (k: keyof BookingData, v: string) => void; onNext: () => void; onBack: () => void }) {
  const valid = data.address && data.city && data.name && data.phone.length >= 10;
  return (
    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="text-xl font-extrabold text-gray-900 mb-1">Your Details</h2>
      <p className="text-sm text-gray-500 mb-6">Enter your address and contact information.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Address *</label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-3.5 text-indigo-400" />
            <input
              type="text"
              placeholder="House no., Street, Area..."
              value={data.address}
              onChange={(e) => onChange('address', e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Landmark (optional)</label>
          <input
            type="text"
            placeholder="Near landmark..."
            value={data.landmark}
            onChange={(e) => onChange('landmark', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">City *</label>
            <select
              value={data.city}
              onChange={(e) => onChange('city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white appearance-none cursor-pointer"
            >
              <option value="">Select city</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pincode</label>
            <input
              type="text"
              placeholder="560001"
              value={data.pincode}
              onChange={(e) => onChange('pincode', e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>
        <hr className="border-gray-100" />
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Name *</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-3.5 text-indigo-400" />
            <input
              type="text"
              placeholder="Full name"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-3.5 text-indigo-400" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex items-center gap-1.5 px-5 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors">
          <ChevronLeft size={15} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Step 3: Date & Time ────────────────────────────────────────────────────────
function Step3({ data, onChange, onNext, onBack }: { data: BookingData; onChange: (k: keyof BookingData, v: string) => void; onNext: () => void; onBack: () => void }) {
  const dates = getNext7Days();
  const valid = data.date && data.timeSlot;
  return (
    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      <h2 className="text-xl font-extrabold text-gray-900 mb-1">Choose Date & Time</h2>
      <p className="text-sm text-gray-500 mb-6">Pick a convenient slot for your service.</p>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Calendar size={13} className="text-indigo-400" /> Select Date
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => onChange('date', d.value)}
              className={`flex flex-col items-center px-4 py-3 rounded-2xl border-2 min-w-[70px] transition-all duration-200 ${
                data.date === d.value
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'border-gray-100 bg-white text-gray-700 hover:border-indigo-200'
              }`}
            >
              <span className={`text-xs font-semibold ${data.date === d.value ? 'text-indigo-200' : 'text-gray-400'}`}>{d.day}</span>
              <span className="text-sm font-extrabold mt-0.5">{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
          <Clock size={13} className="text-indigo-400" /> Select Time Slot
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => onChange('timeSlot', slot)}
              className={`py-3 px-3 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${
                data.timeSlot === slot
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-100 bg-white text-gray-600 hover:border-indigo-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="flex items-center gap-1.5 px-5 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors">
          <ChevronLeft size={15} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          Review Booking <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Step 4: Confirmation ───────────────────────────────────────────────────────
function Step4({ data }: { data: BookingData }) {
  const service = SERVICES.find((s) => s.slug === data.serviceSlug);
  if (!service) return null;

  const msg = encodeURIComponent(
    `Hi! I'd like to confirm my booking:\n\n` +
    `Service: ${service.name}\n` +
    `Date: ${data.date}\n` +
    `Time: ${data.timeSlot}\n` +
    `Address: ${data.address}, ${data.city} ${data.pincode}\n` +
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n\n` +
    `Please confirm my booking. Thank you!`
  );

  return (
    <motion.div key="step4" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle size={32} className="text-green-600" />
        </motion.div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-1">Almost There!</h2>
        <p className="text-sm text-gray-500">Review your booking details and confirm via WhatsApp.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{service.name}</div>
            <div className="text-xs text-gray-500">{service.category}</div>
            <div className="text-sm font-extrabold text-indigo-600 mt-1">{service.price} <span className="font-normal text-gray-400 text-xs">{service.priceType}</span></div>
          </div>
        </div>
        <hr className="border-gray-200" />
        {[
          { icon: Calendar, label: 'Date', value: data.date },
          { icon: Clock, label: 'Time', value: data.timeSlot },
          { icon: MapPin, label: 'Address', value: `${data.address}${data.landmark ? ', ' + data.landmark : ''}, ${data.city} ${data.pincode}` },
          { icon: User, label: 'Name', value: data.name },
          { icon: Phone, label: 'Phone', value: data.phone },
        ].map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
              <row.icon size={13} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-xs text-gray-400">{row.label}</div>
              <div className="text-sm font-semibold text-gray-800">{row.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Confirm */}
      <a
        href={`https://wa.me/919876543210?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-green-200 mb-3"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Confirm Booking on WhatsApp
      </a>
      <p className="text-center text-xs text-gray-400">You'll receive a confirmation message on WhatsApp within minutes.</p>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function BookPage() {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('service') ?? '';

  const [step, setStep] = useState(preselectedSlug ? 2 : 1);
  const [data, setData] = useState<BookingData>({
    serviceSlug: preselectedSlug,
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
  });

  const update = (key: keyof BookingData, value: string) => setData((prev) => ({ ...prev, [key]: value }));

  const selectedService = SERVICES.find((s) => s.slug === data.serviceSlug);

  return (
    <>
      <Helmet>
        <title>Book a Service — HomeServe</title>
        <meta name="description" content="Book a professional home service in 4 easy steps. Enter your address, choose a time, and confirm via WhatsApp." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link to="/services" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
              <ChevronLeft size={16} /> Back to Services
            </Link>
            <span className="text-sm font-semibold text-gray-900">Book a Service</span>
            <div className="w-20" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <StepIndicator current={step} total={4} />

          {/* Booking Summary Strip (steps 2–4) */}
          {step > 1 && selectedService && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">{selectedService.name}</div>
                <div className="text-xs text-indigo-600 font-semibold">{selectedService.price} {selectedService.priceType}</div>
              </div>
              {step < 4 && (
                <button onClick={() => setStep(1)} className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-0.5">
                  Change <ArrowRight size={11} />
                </button>
              )}
            </motion.div>
          )}

          {/* Step Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && <Step1 data={data} onChange={update} onNext={() => setStep(2)} />}
              {step === 2 && <Step2 data={data} onChange={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
              {step === 3 && <Step3 data={data} onChange={update} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
              {step === 4 && <Step4 data={data} />}
            </AnimatePresence>
          </div>

          {/* Trust Row */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            {['Verified Professionals', 'No Hidden Charges', '100% Satisfaction'].map((t) => (
              <div key={t} className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
