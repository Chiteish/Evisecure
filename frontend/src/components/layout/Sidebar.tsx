import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiShield, 
  FiGrid, 
  FiFolder, 
  FiFileText, 
  FiCpu, 
  FiPieChart, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const { role, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: FiGrid },
    { label: 'Cases', path: '/app/cases', icon: FiFolder },
    { label: 'Evidence Locker', path: '/app/evidence', icon: FiFileText },
    { label: 'AI Forensic Engine', path: '/app/ai-analysis', icon: FiCpu },
    { label: 'Reports & Custody', path: '/app/reports', icon: FiPieChart },
    { label: 'Notifications', path: '/app/notifications', icon: FiBell },
    { label: 'Profile', path: '/app/profile', icon: FiUser },
    { label: 'Settings', path: '/app/settings', icon: FiSettings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-30 transition-colors">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <FiShield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white">
              Evi<span className="text-brand-500">Secure</span>
            </h1>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-semibold block">
              Gov Digital Locker
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 dark:bg-brand-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Role & Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="bg-slate-100 dark:bg-slate-800/80 p-3 rounded-xl mb-3 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate capitalize">
              Role: {role.replace('_', ' ')}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Level 4 Clearance</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <FiLogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
