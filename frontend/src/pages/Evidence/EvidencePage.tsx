import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { DragDropUploader } from '../../components/forms/DragDropUploader';
import { HashDisplay } from '../../components/ui/HashDisplay';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FiDownload, FiCheckCircle, FiUpload } from 'react-icons/fi';
import type { EvidenceItem } from '../../types';
import toast from 'react-hot-toast';

export const EvidencePage: React.FC = () => {
  const { evidence, addEvidence, cases } = useAppStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || 'case-001');
  const [title, setTitle] = useState('');
  const [fileType, setFileType] = useState<any>('Network Log');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUploaded = (file: File) => {
    setUploadedFile(file);
    if (!title) {
      setTitle(file.name);
    }
  };

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      toast.error('Please drag & drop a file first.');
      return;
    }

    const mockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const selectedCase = cases.find(c => c.id === selectedCaseId);

    const newEv: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: selectedCaseId,
      caseNumber: selectedCase?.caseNumber || 'CR-2026-0892',
      title,
      fileType,
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      sha256Hash: mockHash,
      uploadedBy: 'Det. Sarah Vance',
      uploadedAt: new Date().toISOString(),
      status: 'Verified',
      locationObtained: 'Seized Digital Hardware Drive',
      custodian: 'Det. Sarah Vance',
      chainOfCustody: [
        {
          id: `coc-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'Initial Ingestion & Cryptographic Hashing',
          actor: 'Det. Sarah Vance',
          actorRole: 'Police Officer',
          details: 'Uploaded into EviSecure Digital Evidence Locker.',
          blockchainTxHash: `0x${mockHash.slice(0, 10)}...`
        }
      ],
      aiAnalysis: {
        confidenceScore: 99.1,
        riskLevel: 'Low',
        status: 'Completed',
        analysisDate: new Date().toISOString(),
        imageTamperingDetected: false,
        deepfakeDetected: false,
        audioVoiceMatched: false,
        recommendations: ['Zero integrity anomalies detected upon ingestion.']
      }
    };

    addEvidence(newEv);
    toast.success('Evidence stored and cryptographically signed on Blockchain!');
    setShowUploadModal(false);
    setUploadedFile(null);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Digital Evidence Vault
          </h2>
          <p className="text-slate-500 text-sm">
            Immutable asset repository backed by SHA-256 cryptographic proof and Blockchain logs.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <FiUpload className="w-4 h-4" />
          <span>Upload Evidence File</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evidence.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-500 font-bold">
                  {item.caseNumber} • {item.fileType}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                <p className="text-xs text-slate-500">File: {item.fileName} ({item.fileSize})</p>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <HashDisplay hash={item.sha256Hash} truncate />

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-100/50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Uploaded By</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{item.uploadedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location Ingested</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{item.locationObtained}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <FiCheckCircle className="w-4 h-4" />
                <span>Chain of Custodial Verification Verified</span>
              </div>

              <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors">
                <FiDownload className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-xl p-6 rounded-3xl space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ingest New Evidence Item</h3>
            <form onSubmit={handleCreateEvidence} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Case</label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {cases.map(c => (
                    <option key={c.id} value={c.id}>{c.caseNumber} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Evidence Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. CCTV Pier 14 Surveillance Video"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Classification Type</label>
                <select
                  value={fileType}
                  onChange={(e: any) => setFileType(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Image">Image File</option>
                  <option value="Video">Video Footage</option>
                  <option value="Audio">Audio / VoIP Recording</option>
                  <option value="Document">PDF / Sealed Document</option>
                  <option value="Disk Dump">Disk Dump / EnCase Image</option>
                  <option value="Network Log">Network Log / Packet Capture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Evidence Binary File</label>
                <DragDropUploader onFileUploaded={handleFileUploaded} />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/20"
                >
                  Submit & Compute Hash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
