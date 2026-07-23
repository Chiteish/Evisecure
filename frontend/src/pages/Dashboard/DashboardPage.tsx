import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FiFolder, FiFileText, FiCheckCircle, FiAlertTriangle, FiFile } from 'react-icons/fi';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { cases, role, setRole, evidence } = useAppStore();
  const navigate = useNavigate();

  const storageData = [
    { name: 'Jan', gb: 120 },
    { name: 'Feb', gb: 180 },
    { name: 'Mar', gb: 240 },
    { name: 'Apr', gb: 310 },
    { name: 'May', gb: 380 },
    { name: 'Jun', gb: 412 },
  ];

  const categoryData = [
    { name: 'Cyber Crime', value: 45 },
    { name: 'Financial Fraud', value: 30 },
    { name: 'AI Deepfakes', value: 15 },
    { name: 'Hardware Forensics', value: 10 },
  ];

  const COLORS = ['#0c94e8', '#06b6d4', '#f59e0b', '#ef4444'];

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as any);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Security Command Center</h2>
          <p className="text-slate-400 text-sm">
            Agency Evidence Integrity Dashboard / Real-Time Auditing
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Simulate Role:</span>
          <select
            value={role}
            onChange={handleRoleChange}
            className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="police_officer">Police Officer</option>
            <option value="forensic_analyst">Forensic Analyst</option>
            <option value="judge">Judge</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <FiFolder className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Total Active Cases</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">32</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <FiFileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Evidence Records</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{evidence.length + 840}</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Blockchain Anchored</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">100%</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Tamper Detections</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="glass-card p-6 rounded-3xl lg:col-span-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Agency Storage Growth (GB)</h3>
              <p className="text-xs text-slate-500">Secure immutable block storage usage over time</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">412 GB / 1 TB</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="gb" stroke="#0c94e8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl lg:col-span-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Cases by Threat Vector</h3>
          <p className="text-xs text-slate-500 mb-6">Threat classifications distribution matrix</p>
          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">100+</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total Cases</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            {categoryData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Cryptographic Cases</h3>
            <p className="text-xs text-slate-500">Double-signed cases active for digital forensics and judicial validation</p>
          </div>
          <button 
            onClick={() => navigate('/app/cases')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            Manage Cases
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <th className="py-3 px-4">Case Details</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Evidence Records</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm font-medium">
              {cases.slice(0, 3).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{c.title}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{c.caseNumber}</div>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={c.priority} />
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{c.assignedOfficer}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <FiFile className="w-4 h-4 text-slate-400" />
                      <span>{c.evidenceCount} Files</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
