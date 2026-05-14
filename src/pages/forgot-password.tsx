import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password — HomeServe</title>
        <meta name="description" content="Reset your HomeServe account password. Enter your email and we'll send you a reset link." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-16">
        {/* Logo */}
        <Link to="/" className="mb-10">
          <img src="/airo-assets/images/logo/horizontal" alt="HomeServe" className="h-9 w-auto" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {sent ? (
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
                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle size={32} className="text-blue-600" />
              </motion.div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-500 text-sm mb-2 max-w-xs mx-auto">
                We've sent a password reset link to
              </p>
              <p className="font-semibold text-gray-800 text-sm mb-6">{email}</p>
              <p className="text-xs text-gray-400 mb-8">
                Didn't receive it? Check your spam folder or try again in a few minutes.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Try a different email
                </button>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Back to Login <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
              {/* Back link */}
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 font-medium transition-colors mb-7"
              >
                <ArrowLeft size={13} /> Back to Login
              </Link>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                <Mail size={22} className="text-blue-600" />
              </div>

              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Forgot your password?</h1>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                No worries — enter your registered email and we'll send you a secure reset link.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-3.5 text-blue-400 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                      className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ${
                        error
                          ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                          : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-blue-200"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending reset link...
                    </>
                  ) : (
                    <>Send Reset Link <ArrowRight size={15} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-6">
                Remember your password?{' '}
                <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
