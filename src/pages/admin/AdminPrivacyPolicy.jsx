import { useState, useEffect } from "react";
import { Save, Info, CheckCircle, FileText } from "lucide-react";
import api from "../../utils/api";
import RichTextEditor from "../../components/RichTextEditor";
import ImageUpload from "../../components/ui/ImageUpload";

export default function AdminPrivacyPolicy() {
  const [title, setTitle] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fetchPolicy = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/privacy-policy");
      if (res.data && res.data.success && res.data.data) {
        const d = res.data.data;
        setTitle(d.title || "Privacy Policy");
        setBgImage(d.bgImage || "");
        setContent(d.content || "");
      }
    } catch (err) {
      console.error("Error fetching Privacy Policy:", err);
      setSaveError("Failed to fetch page data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      const res = await api.put("/privacy-policy", { title, bgImage, content });
      if (res.data && res.data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Error saving Privacy Policy:", err);
      setSaveError(err.response?.data?.message || "Failed to save Privacy Policy.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl py-20 flex flex-col items-center justify-center gap-3 shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <span className="text-xs font-semibold text-slate-500">Loading policy settings...</span>
      </div>
    );
  }

  return (
    <div id="admin-privacy-policy-page" className="max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Success banner */}
      {saveSuccess && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs font-bold animate-slideDown shadow-sm">
          <CheckCircle size={16} className="shrink-0" />
          <span>Privacy Policy updated successfully! Changes are live on the public page.</span>
        </div>
      )}

      {/* Error banner */}
      {saveError && (
        <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-2xl text-xs font-bold animate-shake shadow-sm">
          <Info size={16} className="shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="h-16 border-b border-slate-100 flex items-center px-6 bg-slate-50/50">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-slate-500" />
            Privacy Policy CMS Editor
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Title & Banner Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Page Header Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                placeholder="e.g. Privacy Policy"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Banner Background Image</label>
              <ImageUpload 
                key="privacy-hero-bg"
                defaultUrl={bgImage}
                onUploadSuccess={(url) => setBgImage(url)}
              />
            </div>
          </div>

          {/* Richtext body editor */}
          <div className="space-y-1 pt-4 border-t border-slate-100">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2 block">Policy Page Body Content</label>
            <RichTextEditor
              value={content}
              onChange={(newContent) => setContent(newContent)}
              placeholder="Enter detailed privacy policy content..."
              height={450}
            />
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 -mx-6 -mb-6 p-6">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-extrabold shadow flex items-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} />
              {isSaving ? "Saving Policy..." : "Save Policy"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
