import { useState, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  User, Mail, Phone, MapPin, ArrowLeft,
  Camera, CheckCircle, X, Save,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Full name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email.';
  if (data.phone && !/^\+?[0-9\s\-]{8,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  return errors;
}

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune'];

export default function ProfileEditPage() {
  const { user, isLoggedIn, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    city: user?.city ?? 'Bengaluru',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  if (!isLoggedIn || !user) return <Navigate to="/login" replace />;

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      updateUser({ ...form, avatar: avatarPreview });
      setLoading(false);
      setToast(true);
      setTimeout(() => { setToast(false); navigate('/profile'); }, 2000);
    }, 1000);
  };

  const initials = form.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Edit Profile — HomeServe</title>
        <meta name="description" content="Update your HomeServe profile information." />
      </Helmet>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold"
          >
            <CheckCircle size={16} /> Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] pt-10 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to Profile
          </Link>
          <h1 className="text-2xl font-extrabold text-white mb-1">Edit Profile</h1>
          <p className="text-indigo-300 text-sm">Update your personal information and profile photo.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
        >
          {/* Avatar section */}
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-7 flex items-center gap-6">
            <div className="relative">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-xl font-extrabold text-white">{initials}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-white flex items-center justify-center transition-colors shadow-md"
              >
                <Camera size={13} className="text-white" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">Profile Photo</p>
              <p className="text-xs text-gray-500 mb-2">JPG, PNG or GIF. Max 5MB.</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Upload photo
                </button>
                {avatarPreview && (
                  <>
                    <span className="text-gray-300">·</span>
                    <button
                      type="button"
                      onClick={() => setAvatarPreview(null)}
                      className="text-xs text-red-500 font-semibold hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      <X size={11} /> Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                    errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                      errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                      errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="42, 3rd Cross, Koramangala"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">City</label>
              <select
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white appearance-none cursor-pointer"
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-blue-200"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <><Save size={15} /> Save Changes</>
                )}
              </button>
              <Link
                to="/profile"
                className="px-7 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
