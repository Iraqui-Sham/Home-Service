import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageCircle, ChevronDown, ChevronUp, Headphones,
  Zap, Shield,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  'General Enquiry',
  'Booking Support',
  'Service Quality Issue',
  'Billing / Refund',
  'Become a Professional',
  'Partnership / Business',
  'Other',
];

const CONTACT_CHANNELS = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    desc: 'Fastest response — usually under 5 minutes.',
    value: '+91 98765 43210',
    action: 'https://wa.me/919876543210?text=Hi!%20I%20need%20help%20with%20HomeServe.',
    actionLabel: 'Chat Now',
    color: 'bg-green-50 text-green-600',
    badge: 'Fastest',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    icon: Phone,
    title: 'Call Us',
    desc: 'Available Mon–Sat, 8 AM to 8 PM.',
    value: '+91 98765 43210',
    action: 'tel:+919876543210',
    actionLabel: 'Call Now',
    color: 'bg-blue-50 text-blue-600',
    badge: null,
    badgeColor: '',
  },
  {
    icon: Mail,
    title: 'Email Us',
    desc: 'We reply within 4 business hours.',
    value: 'hello@homeserve.in',
    action: 'mailto:hello@homeserve.in',
    actionLabel: 'Send Email',
    color: 'bg-indigo-50 text-indigo-600',
    badge: null,
    badgeColor: '',
  },
];

const OFFICES = [
  {
    city: 'Bengaluru',
    label: 'Headquarters',
    address: '4th Floor, Prestige Tech Park, Outer Ring Road, Marathahalli, Bengaluru – 560 103',
    hours: 'Mon–Sat: 9 AM – 7 PM',
    phone: '+91 80 4567 8900',
  },
  {
    city: 'Mumbai',
    label: 'Regional Office',
    address: '12th Floor, One BKC, Bandra Kurla Complex, Mumbai – 400 051',
    hours: 'Mon–Sat: 9 AM – 7 PM',
    phone: '+91 22 4567 8900',
  },
  {
    city: 'Delhi NCR',
    label: 'Regional Office',
    address: 'Tower B, DLF Cyber City, Phase 2, Gurugram, Haryana – 122 002',
    hours: 'Mon–Sat: 9 AM – 7 PM',
    phone: '+91 11 4567 8900',
  },
];

const FAQS = [
  {
    q: 'How quickly can I get a professional at my home?',
    a: 'In most cities, same-day slots are available if you book before 2 PM. Emergency slots (within 2–4 hours) are available for select services like plumbing and electrical.',
  },
  {
    q: 'How do I reschedule or cancel a booking?',
    a: 'Simply WhatsApp us with your booking ID and we\'ll reschedule or cancel at no charge, as long as it\'s at least 2 hours before the scheduled time.',
  },
  {
    q: 'Are your professionals background-checked?',
    a: 'Yes — every professional on HomeServe goes through a 50-point verification: identity check, police verification, skill test, and customer rating review before joining.',
  },
  {
    q: 'What if I\'m not satisfied with the service?',
    a: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll re-do the job for free or issue a full refund — no questions asked.',
  },
  {
    q: 'How do I become a HomeServe professional?',
    a: 'Fill out the contact form above with subject "Become a Professional" or WhatsApp us. Our onboarding team will guide you through the verification process.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email.';
  if (data.phone && !/^\+?[0-9\s\-]{8,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 20) errors.message = 'Please write at least 20 characters.';
  return errors;
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">{q}</span>
        {open
          ? <ChevronUp size={16} className="text-indigo-500 shrink-0" />
          : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' as const }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', subject: SUBJECTS[0], message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — HomeServe</title>
        <meta
          name="description"
          content="Get in touch with HomeServe. WhatsApp support, call, email, or fill our contact form. We're available 24/7 to help with bookings, complaints, and enquiries."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] overflow-hidden pt-16 pb-20">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest rounded-full mb-5 border border-indigo-500/30">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              We're Here to Help,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Always
              </span>
            </h1>
            <p className="text-indigo-200 text-base max-w-xl mx-auto leading-relaxed">
              Have a question, complaint, or just want to say hi? Reach us on WhatsApp for the fastest response, or fill the form below.
            </p>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {[
              { icon: Zap, label: '< 5 min WhatsApp response' },
              { icon: Headphones, label: '24/7 support available' },
              { icon: Shield, label: '100% satisfaction guarantee' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-indigo-200 text-sm">
                <item.icon size={14} className="text-indigo-400" />
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact Channels ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONTACT_CHANNELS.map((ch, i) => (
              <FadeIn key={ch.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${ch.color}`}>
                      <ch.icon size={20} />
                    </div>
                    {ch.badge && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ch.badgeColor}`}>
                        {ch.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{ch.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 flex-1">{ch.desc}</p>
                  <p className="text-sm font-bold text-gray-800 mb-4">{ch.value}</p>
                  <a
                    href={ch.action}
                    target={ch.action.startsWith('http') ? '_blank' : undefined}
                    rel={ch.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    {ch.actionLabel}
                  </a>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Fill in the form and we'll get back to you within 4 hours on business days.</p>
              </FadeIn>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="bg-green-50 border border-green-100 rounded-3xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle size={32} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                    Thanks, <span className="font-semibold text-gray-700">{form.name}</span>! We've received your message and will reply to <span className="font-semibold text-gray-700">{form.email}</span> within 4 hours.
                  </p>
                  <a
                    href="https://wa.me/919876543210?text=Hi!%20I%20just%20submitted%20a%20contact%20form%20on%20HomeServe."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Also reach us on WhatsApp
                  </a>
                </motion.div>
              ) : (
                <FadeIn delay={0.1}>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          placeholder="Rahul Sharma"
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                            errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          placeholder="rahul@example.com"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                            errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                            errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                        <select
                          value={form.subject}
                          onChange={(e) => update('subject', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white appearance-none cursor-pointer"
                        >
                          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all resize-none ${
                          errors.message ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                        }`}
                      />
                      <div className="flex items-center justify-between mt-1">
                        {errors.message
                          ? <p className="text-xs text-red-500">{errors.message}</p>
                          : <span />}
                        <span className="text-xs text-gray-400">{form.message.length} chars</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-indigo-200"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} /> Send Message
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      For urgent issues, WhatsApp us directly — we respond in under 5 minutes.
                    </p>
                  </form>
                </FadeIn>
              )}
            </div>

            {/* Info — 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Hours */}
              <FadeIn delay={0.1}>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Clock size={15} className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Support Hours</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { day: 'Monday – Friday', hours: '8:00 AM – 9:00 PM' },
                      { day: 'Saturday',         hours: '9:00 AM – 7:00 PM' },
                      { day: 'Sunday',            hours: '10:00 AM – 5:00 PM' },
                    ].map((row) => (
                      <div key={row.day} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{row.day}</span>
                        <span className="font-semibold text-gray-800">{row.hours}</span>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        WhatsApp support available 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Offices */}
              <FadeIn delay={0.15}>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <MapPin size={15} className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Our Offices</h3>
                  </div>
                  <div className="space-y-5">
                    {OFFICES.map((office) => (
                      <div key={office.city} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-bold text-gray-900">{office.city}</span>
                          <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 font-semibold rounded-full">{office.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-1.5">{office.address}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock size={10} /> {office.hours}</span>
                          <span className="flex items-center gap-1"><Phone size={10} /> {office.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* WhatsApp CTA */}
              <FadeIn delay={0.2}>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20need%20help%20with%20HomeServe."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-green-600 hover:bg-green-700 transition-colors rounded-2xl p-5 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm">Chat on WhatsApp</div>
                    <div className="text-green-100 text-xs mt-0.5">Fastest support — under 5 minutes</div>
                  </div>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Banner ── */}
      <section className="h-56 sm:h-72 relative overflow-hidden">
        <img
          src="/airo-assets/images/pages/contact/map"
          alt="HomeServe Bengaluru office location"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
              <MapPin size={15} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">HomeServe HQ</div>
              <div className="text-xs text-gray-500">Prestige Tech Park, Marathahalli, Bengaluru</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Quick answers to the most common questions we receive.</p>
          </FadeIn>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.06}>
                <FaqItem q={faq.q} a={faq.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
