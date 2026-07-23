import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FiSun, FiMoon, FiBell, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme, user, notifications } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 px-6 glass-nav flex items-center justify-between sticky top-0 z-20 transition-all">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        )}
        <div className="hidden md:flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase">
            Federal Evidence Custody Registry
          </span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Node Status: Operational / Synchronized
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
        </button>

        {/* Notifications Icon */}
        <Link
          to="/app/notifications"
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 transition-colors relative"
        >
          <FiBell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Card */}
        {user && (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/25"
            />
            <div className="hidden lg:block overflow-hidden max-w-[120px]">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.department}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
