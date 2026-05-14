import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface FormData {
  current: string;
  next: string;
  confirm: string;
}

interface FormErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

function getStrength(password: string): { score: number; label: string; color: string; barColor: string } {
  if (!password) return { score: 0, label: '', color: '', barColor: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 1, label: 'Weak',   color: 'text-red-500',   barColor: 'bg-red-500' },
    { score: 2, label: 'Fair',   color: 'text-amber-500', barColor: 'bg-amber-500' },
    { score: 3, label: 'Good',   color: 'text-blue-500',  barColor: 'bg-blue-500' },
    { score: 4, label: 'Strong', color: 'text-green-600', barColor: 'bg-green-500' },
  ];
  return levels[score - 1] ?? { score: 0, label: '', color: '', barColor: '' };
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.current) errors.current = 'Current password is required.';
  if (!data.next) errors.next = 'New password is required.';
  else if (data.next.length < 8) errors.next = 'Password must be at least 8 characters.';
  else if (data.next === data.current) errors.next = 'New password must differ from current password.';
  if (!data.confirm) errors.confirm = 'Please confirm your new password.';
  else if (data.next !== data.confirm) errors.confirm = 'Passwords do not match.';
  return errors;
}

function PasswordInput({
  label, placeholder, value, onChange, error, show, onToggle,
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string;
  show: boolean; onToggle: () => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Lock size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-9 pr-10 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
            error ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
          }`}
        />
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors">
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function ChangePasswordPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleShow = (key: keyof typeof show) => setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setToast(true);
      setTimeout(() => { setToast(false); navigate('/profile'); }, 2500);
    }, 1200);
  };

  const strength = getStrength(form.next);

  const requirements = [
    { label: 'At least 8 characters',       met: form.next.length >= 8 },
    { label: 'One uppercase letter',         met: /[A-Z]/.test(form.next) },
    { label: 'One number',                   met: /[0-9]/.test(form.next) },
    { label: 'One special character',        met: /[^A-Za-z0-9]/.test(form.next) },
  ];

  return (
    <>
      <Helmet>
        <title>Change Password — HomeServe</title>
        <meta name="description" content="Update your HomeServe account password securely." />
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
            <CheckCircle size={16} /> Password changed successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] pt-10 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to Profile
          </Link>
          <h1 className="text-2xl font-extrabold text-white mb-1">Change Password</h1>
          <p className="text-indigo-300 text-sm">Keep your account secure with a strong password.</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {success ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
              >
                <ShieldCheck size={32} className="text-green-600" />
              </motion.div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Password Updated!</h2>
              <p className="text-gray-500 text-sm mb-6">Your password has been changed successfully. Redirecting you to your profile...</p>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
              >
                Go to Profile
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              {/* Security notice */}
              <div className="bg-blue-50 border-b border-blue-100 px-8 py-4 flex items-center gap-3">
                <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700 font-medium">
                  For your security, you'll need to enter your current password before setting a new one.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="p-8 space-y-5">
                <PasswordInput
                  label="Current Password"
                  placeholder="Enter your current password"
                  value={form.current}
                  onChange={(v) => update('current', v)}
                  error={errors.current}
                  show={show.current}
                  onToggle={() => toggleShow('current')}
                />

                <div className="border-t border-gray-100 pt-5">
                  <PasswordInput
                    label="New Password"
                    placeholder="Min. 8 characters"
                    value={form.next}
                    onChange={(v) => update('next', v)}
                    error={errors.next}
                    show={show.next}
                    onToggle={() => toggleShow('next')}
                  />

                  {/* Strength bar */}
                  {form.next && (
                    <div className="mt-3">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength.score ? strength.barColor : 'bg-gray-100'
                            }`}
                          />
                        ))}
                      </div>
                      {strength.label && (
                        <p className={`text-xs font-semibold ${strength.color}`}>{strength.label} password</p>
                      )}
                    </div>
                  )}

                  {/* Requirements checklist */}
                  {form.next && (
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      {requirements.map((req) => (
                        <div key={req.label} className={`flex items-center gap-1.5 text-xs transition-colors ${req.met ? 'text-green-600' : 'text-gray-400'}`}>
                          <CheckCircle size={11} className={req.met ? 'text-green-500' : 'text-gray-300'} />
                          {req.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Re-enter new password"
                  value={form.confirm}
                  onChange={(v) => update('confirm', v)}
                  error={errors.confirm}
                  show={show.confirm}
                  onToggle={() => toggleShow('confirm')}
                />

                {/* Match indicator */}
                {form.confirm && form.next === form.confirm && !errors.confirm && (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium -mt-2">
                    <CheckCircle size={12} /> Passwords match
                  </div>
                )}

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
                        Updating...
                      </>
                    ) : (
                      <><Lock size={14} /> Update Password</>
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
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
