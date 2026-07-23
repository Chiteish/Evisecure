import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Audit & Security Alerts
        </h2>
        <p className="text-slate-500 text-sm">
          System events, verification flags, and court schedule notifications.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6 space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationAsRead(n.id);
              if (n.link) navigate(n.link);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              n.read
                ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-70'
                : 'bg-brand-500/5 dark:bg-brand-500/10 border-brand-500/30 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500 shrink-0 mt-0.5">
                <FiBell className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{n.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{n.message}</p>
                <span className="text-[10px] text-slate-400 font-mono block pt-1">{n.timestamp}</span>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
