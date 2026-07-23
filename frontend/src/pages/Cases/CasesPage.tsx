import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FiSearch, FiFilter, FiPlus, FiFolder } from 'react-icons/fi';
import type { CaseItem } from '../../types';

export const CasesPage: React.FC = () => {
  const { cases, addCase } = useAppStore();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');

  const filteredCases = cases.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.caseNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const createdCase: CaseItem = {
      id: `case-${Date.now()}`,
      caseNumber: `CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      description: newDesc,
      status: 'Open',
      priority: newPriority,
      assignedOfficer: 'Det. Sarah Vance',
      department: 'Cyber Crime Division',
      evidenceCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['New Case', 'Investigative'],
    };
    addCase(createdCase);
    setShowModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Case Registry Management
          </h2>
          <p className="text-slate-500 text-sm">
            List of active and archived agency investigations with double-signed legal ledger metadata.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create New Case</span>
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases by title, case number, or tags..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
          <FiFilter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <th className="py-4 px-6">Case Info</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Assigned Lead</th>
                <th className="py-4 px-6">Evidence Artifacts</th>
                <th className="py-4 px-6">Created Date</th>
                <th className="py-4 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm font-medium">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-navy-900/40 transition-colors cursor-pointer">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FiFolder className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{c.title}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5 pl-6">{c.caseNumber}</div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={c.priority} />
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{c.assignedOfficer}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{c.evidenceCount} Files</td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-6 rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Initiate New Case Docket</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Case Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Unauthorized Ransomware Payload Execution"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Case Priority</label>
                <select
                  value={newPriority}
                  onChange={(e: any) => setNewPriority(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Detailed summary of incident..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/20"
                >
                  Save & Anchor Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
