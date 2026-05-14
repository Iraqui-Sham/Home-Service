import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Shield, Zap, Users, Star, CheckCircle, ArrowRight,
  Target, Heart, Award, MapPin, Phone, Mail,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '50,000+', label: 'Happy Customers', icon: Heart },
  { value: '500+',    label: 'Verified Pros',   icon: Shield },
  { value: '4.9★',    label: 'Avg. Rating',     icon: Star },
  { value: '6',       label: 'Cities Covered',  icon: MapPin },
];

const TEAM = [
  {
    name: 'Arjun Mehta',
    role: 'Co-Founder & CEO',
    bio: 'Ex-Swiggy product lead. Obsessed with making home services as easy as ordering food.',
    initials: 'AM',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Priya Sharma',
    role: 'Co-Founder & COO',
    bio: 'Former Urban Company city head. Built operations across 4 metros from scratch.',
    initials: 'PS',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Rohan Verma',
    role: 'Head of Technology',
    bio: 'Full-stack engineer with 10 years building marketplace platforms at scale.',
    initials: 'RV',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Sneha Iyer',
    role: 'Head of Quality',
    bio: 'Ensures every professional meets our 50-point verification standard before joining.',
    initials: 'SI',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Karan Nair',
    role: 'Head of Growth',
    bio: 'Scaled HomeServe from 0 to 50,000 customers in 18 months through community-led growth.',
    initials: 'KN',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Divya Rao',
    role: 'Customer Experience Lead',
    bio: 'Runs our 24/7 WhatsApp support team. Every customer complaint resolved in under 2 hours.',
    initials: 'DR',
    color: 'bg-rose-100 text-rose-700',
  },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Trust First',
    desc: 'Every professional is background-checked, skill-tested, and identity-verified before their first booking.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Zap,
    title: 'Speed & Simplicity',
    desc: 'Book in under 60 seconds via WhatsApp. No app download, no long forms, no friction.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Target,
    title: 'Transparent Pricing',
    desc: 'You see the full price before confirming. No hidden charges, no surprise bills.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Heart,
    title: 'Customer Obsession',
    desc: 'We measure success by your satisfaction, not just bookings. 100% satisfaction guarantee on every job.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Users,
    title: 'Pro Empowerment',
    desc: 'We treat our service professionals as partners — fair pay, flexible hours, and career growth.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    desc: 'Not happy? We re-do the job for free or give you a full refund. No questions asked.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const MILESTONES = [
  { year: '2021', title: 'Founded in Bengaluru', desc: 'Started with 12 electricians and a WhatsApp group.' },
  { year: '2022', title: 'Expanded to 3 cities', desc: 'Mumbai and Delhi NCR added. Crossed 5,000 bookings.' },
  { year: '2023', title: '500 verified professionals', desc: 'Launched quality certification program. 4.8★ avg rating.' },
  { year: '2024', title: '50,000 happy customers', desc: 'Added Hyderabad, Chennai, Pune. Launched 6 service categories.' },
  { year: '2025', title: 'Same-day service guarantee', desc: 'Introduced 2-hour emergency slots across all cities.' },
  { year: '2026', title: 'India\'s most trusted platform', desc: 'Targeting 1 lakh customers and 10 new cities.' },
];

// ── Fade-in wrapper ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — HomeServe</title>
        <meta
          name="description"
          content="HomeServe is India's most trusted home services marketplace. Learn about our mission, team, and why 50,000+ customers choose us for electricians, plumbers, AC repair, and more."
        />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] overflow-hidden pt-16 pb-20">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest rounded-full mb-5 border border-indigo-500/30">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Making Home Services<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Simple, Safe & Reliable
              </span>
            </h1>
            <p className="text-indigo-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We started HomeServe because finding a trustworthy electrician or plumber shouldn't feel like a gamble.
              Today, 50,000+ Indian families trust us to send the right professional to their door.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 text-center">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon size={18} className="text-indigo-300" />
                </div>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-indigo-300 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="/assets/about.jpg"
                  alt="HomeServe professional at work"
                  className="w-full h-full object-cover"
                />
                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                      <CheckCircle size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">50-Point Verification</div>
                      <div className="text-xs text-gray-500">Every professional is rigorously vetted before joining</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                A Trustworthy Pro for<br />Every Indian Home
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-5">
                India has millions of skilled tradespeople — electricians, plumbers, carpenters — but finding one you can trust has always been word-of-mouth or luck. We're changing that.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-7">
                HomeServe is a curated marketplace where every professional has been background-checked, skill-tested, and rated by real customers. You get the right person, at the right price, at the right time — booked in seconds via WhatsApp.
              </p>
              <div className="space-y-3">
                {[
                  'Background-checked & identity-verified professionals',
                  'Transparent, upfront pricing — no hidden charges',
                  'Same-day slots available in most cities',
                  '100% satisfaction guarantee on every booking',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Why HomeServe
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Built on 6 Core Values</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Everything we do — from how we vet professionals to how we handle complaints — flows from these principles.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${v.color.split(' ')[0]}`}>
                    <v.icon size={20} className={v.color.split(' ')[1]} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Journey ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">From a WhatsApp Group to India's Most Trusted Platform</h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-indigo-100 -translate-x-1/2" />

            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-md z-10 mt-1" />

                    {/* Content */}
                    <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                      <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-2">{m.year}</span>
                      <h3 className="font-bold text-gray-900 text-base mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              The Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Meet the People Behind HomeServe</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              A team of operators, engineers, and customer champions who've built and scaled marketplaces across India.
            </p>
          </FadeIn>

          {/* Team photo */}
          <FadeIn className="mb-12">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/6]">
              <img
                src="/assets/largeAbout.jpg"
                alt="HomeServe team"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-extrabold shrink-0 ${member.color}`}>
                      {member.initials}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{member.name}</div>
                      <div className="text-xs text-indigo-600 font-semibold mt-0.5">{member.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: MapPin, label: 'Headquarters', value: 'Bengaluru, Karnataka, India', color: 'text-indigo-600 bg-indigo-50' },
              { icon: Mail,   label: 'Email Us',     value: 'hello@homeserve.in',          color: 'text-purple-600 bg-purple-50' },
              { icon: Phone,  label: 'WhatsApp',     value: '+91 98765 43210',              color: 'text-green-600 bg-green-50' },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 ${c.color}`}>
                  <c.icon size={18} />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{c.label}</div>
                <div className="text-sm font-bold text-gray-900">{c.value}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to Experience HomeServe?</h2>
            <p className="text-indigo-200 text-sm mb-8 max-w-lg mx-auto">
              Join 50,000+ happy customers who trust HomeServe for every home service need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/services"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Browse Services <ArrowRight size={15} />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20book%20a%20home%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book via WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
