import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface HashDisplayProps {
  hash: string;
  label?: string;
  truncate?: boolean;
}

export const HashDisplay: React.FC<HashDisplayProps> = ({ hash, label = 'SHA-256 Hash', truncate = false }) => {
  const [copied, setCopied] = useState(false);

  const displayHash = truncate ? `${hash.slice(0, 10)}...${hash.slice(-10)}` : hash;

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success('Hash copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-mono text-xs bg-slate-900 text-cyan-400 p-3 rounded-xl border border-cyan-950 flex items-center justify-between gap-2 shadow-inner">
      <div className="overflow-hidden">
        {label && <span className="text-slate-400 block text-[10px] uppercase font-sans font-semibold tracking-wider mb-1">{label}</span>}
        <span className="break-all tracking-wider selection:bg-cyan-900">{displayHash}</span>
      </div>
      <button
        onClick={handleCopy}
        className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors shrink-0"
        title="Copy Full Hash"
      >
        {copied ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
      </button>
    </div>
  );
};
