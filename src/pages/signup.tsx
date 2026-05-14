import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  Mail, Lock, Eye, EyeOff, User, Phone,
  CheckCircle, ArrowRight, Shield, Star, Users,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 1, label: 'Weak', color: 'bg-red-500' },
    { score: 2, label: 'Fair', color: 'bg-amber-500' },
    { score: 3, label: 'Good', color: 'bg-blue-500' },
    { score: 4, label: 'Strong', color: 'bg-green-500' },
  ];
  return levels[score - 1] ?? { score: 0, label: '', color: '' };
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Full name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email.';
  if (!data.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^\+?[0-9\s\-]{8,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number.';
  if (!data.password) errors.password = 'Password is required.';
  else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (!data.confirmPassword) errors.confirmPassword = 'Please confirm your password.';
  else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.name);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 1000);

    }, 1400);
  };

  const strength = getPasswordStrength(form.password);

  return (
    <>
      <Helmet>
        <title>Create Account — HomeServe</title>
        <meta name="description" content="Sign up for HomeServe and book trusted home service professionals in seconds. Free to join — no hidden charges." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex">
        {/* ── Left Panel ── */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] relative overflow-hidden flex-col justify-between p-12">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <Link to="/" className="relative z-10">
            <img src="/airo-assets/images/logo/horizontal" alt="HomeServe" className="h-9 w-auto" />
          </Link>

          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                Join 50,000+<br />Happy Homeowners
              </h2>
              <p className="text-indigo-300 text-sm leading-relaxed max-w-xs">
                Create your free account and get access to India's most trusted network of home service professionals.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'All professionals are background-verified' },
                { icon: Star, text: 'Transparent pricing — no hidden charges' },
                { icon: Users, text: 'Book in 60 seconds via WhatsApp' },
                { icon: CheckCircle, text: '100% satisfaction or money back' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <item.icon size={15} className="text-indigo-300" />
                  </div>
                  <span className="text-indigo-200 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '50K+', label: 'Customers' },
                { value: '500+', label: 'Pros' },
                { value: '4.9★', label: 'Rating' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center">
                  <div className="text-lg font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-indigo-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-indigo-500 text-xs">© 2026 HomeServe. All rights reserved.</p>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden mb-8">
            <img src="/airo-assets/images/logo/horizontal" alt="HomeServe" className="h-8 w-auto" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle size={32} className="text-green-600" />
                </motion.div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-2">Account Created!</h2>
                <p className="text-gray-500 text-sm mb-2">
                  Welcome to HomeServe, <span className="font-semibold text-gray-700">{form.name.split(' ')[0]}</span>!
                </p>
                <p className="text-gray-400 text-xs mb-7">
                  We've sent a confirmation to <span className="font-medium text-gray-600">{form.email}</span>.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/services"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors"
                  >
                    Browse Services <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
                <div className="mb-7">
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create your account</h1>
                  <p className="text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                      Log in
                    </Link>
                  </p>
                </div>

                {/* Social signup */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    {
                      label: 'Google',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                      ),
                    },
                    {
                      label: 'Phone',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      ),
                    },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.name ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                            }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.phone ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                            }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={(e) => update('password', e.target.value)}
                        className={`w-full pl-9 pr-10 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.password ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-gray-100'
                                }`}
                            />
                          ))}
                        </div>
                        {strength.label && (
                          <p className={`text-xs font-medium ${strength.score <= 1 ? 'text-red-500' : strength.score === 2 ? 'text-amber-500' : strength.score === 3 ? 'text-blue-500' : 'text-green-600'
                            }`}>
                            {strength.label} password
                          </p>
                        )}
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={(e) => update('confirmPassword', e.target.value)}
                        className={`w-full pl-9 pr-10 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${errors.confirmPassword ? 'border-red-400 focus:ring-2 focus:ring-red-100' : form.confirmPassword && form.password === form.confirmPassword ? 'border-green-400 focus:ring-2 focus:ring-green-100' : 'border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      {form.confirmPassword && form.password === form.confirmPassword && (
                        <CheckCircle size={15} className="absolute right-9 top-3.5 text-green-500" />
                      )}
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-indigo-600 cursor-pointer shrink-0"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
                      I agree to HomeServe's{' '}
                      <Link to="/terms" className="text-indigo-600 hover:underline font-medium">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-indigo-600 hover:underline font-medium">Privacy Policy</Link>.
                      I consent to receiving booking updates via WhatsApp.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-indigo-200 mt-1"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      <>Create Free Account <ArrowRight size={15} /></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
