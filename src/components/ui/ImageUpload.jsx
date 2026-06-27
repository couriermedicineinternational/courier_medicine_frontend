import { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import api from "../../utils/api";

export default function ImageUpload({ onUploadSuccess, defaultUrl = "" }) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultUrl);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadFile = async (file) => {
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, JPEG, WEBP)");
      return;
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size exceeds 5MB limit");
      return;
    }

    setError("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        const imageUrl = response.data.url;
        setPreviewUrl(imageUrl);
        onUploadSuccess(imageUrl);
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setError(err.response?.data?.message || "Failed to upload image to Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full space-y-2">
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] ${
          dragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-slate-200 hover:border-slate-350 bg-slate-50/50 hover:bg-slate-50"
        }`}
        onClick={onButtonClick}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <Loader2 className="animate-spin text-primary" size={32} />
            <span className="text-xs font-bold text-slate-600">Uploading to Cloudinary...</span>
          </div>
        ) : previewUrl ? (
          <div className="flex flex-col md:flex-row items-center gap-4 w-full px-2">
            <img 
              src={previewUrl} 
              alt="Uploaded Preview" 
              className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm"
            />
            <div className="flex-1 text-left">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase mb-1">
                <CheckCircle2 size={10} /> Active Image Link
              </span>
              <p className="text-[10px] text-slate-400 break-all line-clamp-2 max-w-xs md:max-w-sm">{previewUrl}</p>
              <button 
                type="button"
                className="mt-2 text-[10px] font-bold text-primary hover:underline"
              >
                Change Image File
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <UploadCloud className="text-slate-400" size={36} />
            <div>
              <p className="text-xs font-bold text-slate-700">Drag & drop your image here, or <span className="text-primary hover:underline">browse</span></p>
              <p className="text-[9px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">Supports PNG, JPG, JPEG, WEBP (Max 5MB)</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
