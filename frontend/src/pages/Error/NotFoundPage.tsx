import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col justify-center items-center px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6">
        <FiAlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">404 - Restricted Area</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm text-sm">
        The requesting node does not have authorization to view this endpoint or the resource is non-existent.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 transition-all"
      >
        Return to Landing
      </Link>
    </div>
  );
};
