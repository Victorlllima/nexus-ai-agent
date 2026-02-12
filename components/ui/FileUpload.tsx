import React, { useRef, useState } from 'react';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // em MB
  onFileSelect: (file: File) => void;
  currentFile?: File | null;
  onClear?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize = 100,
  onFileSelect,
  currentFile,
  onClear
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndSelectFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const validateAndSelectFile = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      alert(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }
    onFileSelect(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />

      {currentFile ? (
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <File size={24} className="text-accent-purple" />
            <div>
              <p className="text-sm font-semibold text-text-primary">{currentFile.name}</p>
              <p className="text-xs text-text-secondary">{formatFileSize(currentFile.size)}</p>
            </div>
          </div>
          {onClear && (
            <button
              onClick={onClear}
              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <X size={18} className="text-red-400" />
            </button>
          )}
        </div>
      ) : (
        <div
          className={`glass-card p-8 border-2 border-dashed text-center cursor-pointer transition-all
                     ${dragActive ? 'border-accent-purple bg-accent-purple/10' : 'border-border-main hover:border-accent-purple'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={40} className="mx-auto mb-4 text-accent-purple" />
          <p className="text-sm font-semibold text-text-primary mb-2">
            Arraste um arquivo ou clique para selecionar
          </p>
          <p className="text-xs text-text-secondary">
            Tamanho máximo: {maxSize}MB
          </p>
        </div>
      )}
    </div>
  );
};
