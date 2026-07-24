import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FiSun, FiMoon } from 'react-icons/fi';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useAppStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Agency System Preferences
        </h2>
        <p className="text-slate-500 text-sm">
          Platform dark mode, cryptographic node preferences, and security protocols.
        </p>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Interface Appearance</h4>
            <p className="text-xs text-slate-500">Switch between High-Contrast Dark Cybersecurity mode & Light mode</p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
            <span>Active: {theme.toUpperCase()}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Automatic SHA-256 Ledger Anchor</h4>
            <p className="text-xs text-slate-500">Automatically post every ingested evidence file hash to private law enforcement blockchain</p>
          </div>
          <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-500 rounded cursor-pointer" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">System Language / Jurisdiction</h4>
            <p className="text-xs text-slate-500">Legal terminology and court document formatting standard</p>
          </div>
          <select className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold px-3 py-2 rounded-xl">
            <option>English (US Federal Standards)</option>
            <option>English (UK Crown Prosecution)</option>
            <option>Spanish (Interpol Standard)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
