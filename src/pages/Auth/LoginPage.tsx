import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { useAppStore } from '../../store/useAppStore';
import type { Role } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('s.vance@metropolice.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<Role>('police_officer');
  
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 items-center justify-center text-white shadow-lg shadow-brand-500/20 mb-2">
            <FiShield className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Evi<span className="text-brand-500">Secure</span> Portal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Government Digital Evidence Locker Authentication
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Select Authentication Profile
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
                {(['police_officer', 'forensic_analyst', 'judge', 'admin'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 px-3 rounded-lg capitalize transition-all ${
                      selectedRole === r
                        ? 'bg-brand-500 text-white shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Official Agency Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  placeholder="officer@agency.gov"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Security Passcode / CAC Token
                </label>
                <a href="#forgot" className="text-xs text-brand-500 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Authenticate Session</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need new credentials?{' '}
              <Link to="/register" className="text-brand-500 font-semibold hover:underline">
                Register Agency Device
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
