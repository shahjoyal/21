import React, { useRef, useState } from 'react';
import { adminApi } from '../../api/adminApi';
import { UploadCloud, Loader2, CheckCircle2, AlertTriangle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

/**
 * Lets an admin either upload an image file (which gets saved to
 * /public/uploads and auto-committed to the Git repo) or paste a URL
 * directly. Shows the git commit/push result so it's obvious whether the
 * image actually made it into the repository or just landed on disk.
 */
export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label = 'Image', value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [gitStatus, setGitStatus] = useState<{ committed: boolean; pushed: boolean; message: string } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    setGitStatus(null);

    try {
      const result = await adminApi.uploadImage(file);
      onChange(result.url);
      setGitStatus(result.git);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-bold text-gray-600">{label}</label>}

      {/* Preview */}
      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-40 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 gap-1.5">
          <ImageIcon className="w-6 h-6" />
          <span className="text-[11px] font-semibold">No image yet</span>
        </div>
      )}

      {/* URL input + Upload button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={value}
            onChange={(e) => { onChange(e.target.value); setGitStatus(null); setUploadError(''); }}
            placeholder="Paste an image URL, or upload a file..."
            className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D]"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
        >
          {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
          Upload
        </button>
      </div>

      {uploadError && (
        <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> {uploadError}
        </p>
      )}

      {gitStatus && (
        <p className={`text-[11px] font-semibold flex items-center gap-1 ${
          gitStatus.pushed ? 'text-emerald-600' : gitStatus.committed ? 'text-amber-600' : 'text-red-600'
        }`}>
          {gitStatus.pushed ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          {gitStatus.message}
        </p>
      )}
    </div>
  );
};
