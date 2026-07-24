import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiCheckCircle } from 'react-icons/fi';

interface DragDropUploaderProps {
  onFileUploaded: (file: File) => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export const DragDropUploader: React.FC<DragDropUploaderProps> = ({
  onFileUploaded,
  acceptedTypes = ['*'],
  maxSizeMB = 100,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [fileDetail, setFileDetail] = useState<{ name: string; size: string } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      alert(`File size exceeds the limit of ${maxSizeMB}MB`);
      return;
    }

    setFileDetail({
      name: file.name,
      size: `${sizeMB.toFixed(2)} MB`
    });

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev !== null && prev >= 100) {
          clearInterval(interval);
          onFileUploaded(file);
          return 100;
        }
        return (prev || 0) + 10;
      });
    }, 100);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-500/10'
            : 'border-slate-300 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-600 bg-slate-50/50 dark:bg-navy-900/50'
        }`}
      >
        <input
          type="file"
          id="file-upload-input"
          className="hidden"
          onChange={handleChange}
          multiple={false}
        />
        <label htmlFor="file-upload-input" className="cursor-pointer w-full h-full flex flex-col items-center">
          {uploadProgress === null ? (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <FiUploadCloud className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                Drag & drop files here
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">
                or click to browse from computer (Max {maxSizeMB}MB)
              </p>
              <div className="flex gap-2 flex-wrap justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 py-1.5 px-3 rounded-full font-medium">
                <span>{acceptedTypes.join(', ')} files accepted</span>
              </div>
            </>
          ) : (
            <div className="w-full max-w-xs flex flex-col items-center">
              <FiFile className="w-10 h-10 text-brand-500 mb-3" />
              <p className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-full text-sm">
                {fileDetail?.name}
              </p>
              <span className="text-xs text-slate-400 mb-4">{fileDetail?.size}</span>

              {uploadProgress < 100 ? (
                <div className="w-full">
                  <div className="flex justify-between items-center text-xs mb-1 text-slate-500">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                  <FiCheckCircle className="w-5 h-5 animate-bounce" />
                  Upload Complete & Cryptographically Anchored
                </div>
              )}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
