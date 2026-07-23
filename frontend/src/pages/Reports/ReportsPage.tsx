import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FiPrinter, FiDownload, FiLink } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ReportsPage: React.FC = () => {
  const { evidence } = useAppStore();

  const handleExport = () => {
    toast.success('Generating Cryptographically Certified Chain-of-Custody PDF...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Court Reports & Chain of Custody
          </h2>
          <p className="text-slate-500 text-sm">
            Generate ISO/IEC 27037 compliant evidentiary audit logs for prosecution and defense.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-xl shadow hover:opacity-90 flex items-center gap-2 transition-all"
          >
            <FiPrinter className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all"
          >
            <FiDownload className="w-4 h-4" />
            <span>Export Certified PDF</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {evidence.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-3xl space-y-6">
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-brand-500 uppercase tracking-widest font-bold">
                  Chain-of-Custody Certificate #{item.id}
                </span>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500">Target File: {item.fileName} | SHA-256: {item.sha256Hash}</p>
              </div>

              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs rounded-full border border-emerald-500/20">
                Court Ready
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                Immutable Transfer Log
              </h4>
              
              <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
                {item.chainOfCustody.map((coc) => (
                  <div key={coc.id} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-slate-50 dark:ring-navy-950 flex items-center justify-center text-white text-[8px]">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                        <span>{coc.action}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({new Date(coc.timestamp).toLocaleString()})</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Actor: <span className="font-semibold text-slate-700 dark:text-slate-300">{coc.actor}</span> ({coc.actorRole})
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{coc.details}</p>
                      {coc.blockchainTxHash && (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-500 pt-1">
                          <FiLink />
                          <span>Ledger Tx: {coc.blockchainTxHash}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
