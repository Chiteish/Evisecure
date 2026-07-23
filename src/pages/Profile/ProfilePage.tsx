import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const ProfilePage: React.FC = () => {
  const { user } = useAppStore();

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Personnel Identity Credentials
        </h2>
        <p className="text-slate-500 text-sm">
          Clearance tier, biometric signature key, and active security sessions.
        </p>
      </div>

      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-xl"
          />
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-sm font-semibold text-brand-500">{user.department}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 text-xs text-slate-500 font-mono">
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Badge: {user.badgeNumber}</span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg font-sans font-semibold">Active Clearance</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">Official Agency Email</label>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{user.email}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">Assigned System Role</label>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm capitalize">{user.role.replace('_', ' ')}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">Last Authenticated Session</label>
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm font-mono">{new Date(user.lastLogin).toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold uppercase">FIPS PKI Signature Key</label>
            <p className="font-mono text-xs text-cyan-500 truncate">0x92f8a...4b12c8</p>
          </div>
        </div>
      </div>
    </div>
  );
};
