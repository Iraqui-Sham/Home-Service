import { Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  User, Mail, Phone, MapPin, Calendar, Edit3,
  Lock, CheckCircle, Clock, Star, ChevronRight,
  Shield, Zap,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function StatCard({ icon: Icon, label, value, color }: { icon: typeof User; label: string; value: number | string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-xl font-extrabold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) return <Navigate to="/login" replace />;

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Helmet>
        <title>My Profile — HomeServe</title>
        <meta name="description" content="View and manage your HomeServe profile, bookings, and account settings." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#0F172A] via-indigo-950 to-[#0F172A] pt-12 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center sm:items-end gap-6"
          >
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20 shadow-xl" />
              ) : (
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-white/20 shadow-xl">
                  <span className="text-2xl font-extrabold text-white">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                <CheckCircle size={12} className="text-white" />
              </div>
            </div>

            {/* Name + meta */}
            <div className="text-center sm:text-left pb-1">
              <h1 className="text-2xl font-extrabold text-white mb-1">{user.name}</h1>
              <p className="text-indigo-300 text-sm">{user.email}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-indigo-300">
                  <Calendar size={11} /> Member since {user.joinedDate}
                </span>
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <Shield size={11} /> Verified
                </span>
              </div>
            </div>

            {/* Edit button */}
            <div className="sm:ml-auto">
              <Link
                to="/profile/edit"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Edit3 size={14} /> Edit Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <StatCard icon={Calendar}     label="Total Bookings"     value={user.totalBookings}     color="bg-blue-50 text-blue-600" />
          <StatCard icon={CheckCircle}  label="Completed"          value={user.completedBookings} color="bg-green-50 text-green-600" />
          <StatCard icon={Clock}        label="Upcoming"           value={user.upcomingBookings}  color="bg-amber-50 text-amber-600" />
          <StatCard icon={Star}         label="Avg. Rating Given"  value="4.8★"                   color="bg-purple-50 text-purple-600" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-extrabold text-gray-900">Personal Information</h2>
              <Link
                to="/profile/edit"
                className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                <Edit3 size={12} /> Edit
              </Link>
            </div>
            <InfoRow icon={User}     label="Full Name"     value={user.name} />
            <InfoRow icon={Mail}     label="Email Address" value={user.email} />
            <InfoRow icon={Phone}    label="Phone Number"  value={user.phone} />
            <InfoRow icon={MapPin}   label="Address"       value={user.address} />
            <InfoRow icon={Calendar} label="Member Since"  value={user.joinedDate} />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Account Actions */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-extrabold text-gray-900 mb-4">Account</h2>
              <div className="space-y-2">
                {[
                  { to: '/profile/edit',            icon: Edit3,    label: 'Update Profile',   desc: 'Edit your personal details' },
                  { to: '/profile/change-password', icon: Lock,     label: 'Change Password',  desc: 'Update your password' },
                  { to: '/bookings',                icon: Calendar, label: 'My Bookings',       desc: 'View all your bookings' },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <item.icon size={15} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-3xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-blue-200" />
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Verified Account</span>
              </div>
              <p className="text-sm font-bold mb-1">Your account is verified</p>
              <p className="text-xs text-blue-200 leading-relaxed">
                You get priority booking slots and exclusive offers as a verified member.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Zap size={13} className="text-amber-300" />
                <span className="text-xs text-blue-100 font-medium">Priority booking enabled</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
