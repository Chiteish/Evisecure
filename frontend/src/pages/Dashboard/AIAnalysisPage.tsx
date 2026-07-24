import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FiCpu, FiAlertTriangle, FiCheck } from 'react-icons/fi';

export const AIAnalysisPage: React.FC = () => {
  const { evidence } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FiCpu className="w-6 h-6 text-brand-500 animate-spin" />
            AI Forensics & Deepfake Detection
          </h2>
          <p className="text-slate-400 text-sm">
            Neural voice profiling, metadata anomaly tracking, and image tampering verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Forensic Scan Records</h3>
          
          {evidence.map((item) => {
            const ai = item.aiAnalysis;
            if (!ai) return null;

            return (
              <div key={item.id} className="glass-card p-6 rounded-3xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{item.caseNumber}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={`Risk: ${ai.riskLevel}`} />
                    <StatusBadge status={ai.status} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Confidence Score</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{ai.confidenceScore}%</span>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Deepfake Verification</span>
                    <span className={`text-sm font-extrabold flex items-center justify-center gap-1.5 mt-1.5 ${ai.deepfakeDetected ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {ai.deepfakeDetected ? <FiAlertTriangle /> : <FiCheck />}
                      {ai.deepfakeDetected ? 'Detected / Tampered' : 'Clean / Safe'}
                    </span>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Scan Date</span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 block mt-2">
                      {new Date(ai.analysisDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Neural Network Recommendations:</span>
                  <ul className="text-xs text-slate-500 space-y-1 pl-4 list-disc">
                    {ai.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-3xl">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Detection Capabilities</h3>
            <p className="text-xs text-slate-500 mb-4">Core deep neural network scan models active on local node.</p>
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>JPEG Double Quantization Check</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Spectral Vocal Discontinuity</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>C2PA Metadata Chain Validation</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Wav2Vec 2.0 Voice Match Engine</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
