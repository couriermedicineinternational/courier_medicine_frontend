import { useState, useEffect, useRef } from "react";
import { 
  HelpCircle, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info,
  Save,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import api from "../../utils/api";
import RichTextEditor from "../../components/RichTextEditor";
import ImageUpload from "../../components/ui/ImageUpload";

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // FAQ Page Header states
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [headerSaveSuccess, setHeaderSaveSuccess] = useState(false);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null); // null when adding new
  const [form, setForm] = useState({ question: "", answer: "", category: "General", sortOrder: 0 });
  
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch FAQs list & Page Header settings
  const fetchFaqsAndHeader = async () => {
    try {
      setIsLoading(true);
      // Fetch FAQs list
      const res = await api.get("/faqs");
      if (res.data && res.data.success) {
        setFaqs(res.data.data || []);
      }

      // Fetch FAQ Page Header
      const headerRes = await api.get("/faqs/header");
      if (headerRes.data && headerRes.data.success && headerRes.data.data) {
        setHeaderTitle(headerRes.data.data.title || "Frequently Asked Questions");
        setHeaderImage(headerRes.data.data.bgImage || "");
      }
    } catch (err) {
      console.error("Error fetching FAQs and header settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqsAndHeader();
  }, []);

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  // Filter list locally for snappy UI
  const filteredFaqs = faqs.filter(f => 
    stripHtml(f.question).toLowerCase().includes(search.toLowerCase()) || 
    stripHtml(f.answer).toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  // Open modal
  const openModal = (faqObj = null) => {
    setSelectedFaq(faqObj);
    if (faqObj) {
      setForm({
        question: faqObj.question || "",
        answer: faqObj.answer || "",
        category: faqObj.category || "General",
        sortOrder: faqObj.sortOrder !== undefined ? faqObj.sortOrder : (faqObj.order !== undefined ? faqObj.order : 0)
      });
    } else {
      setForm({ question: "", answer: "", category: "General", sortOrder: faqs.length });
    }
    setSaveError("");
    setIsModalOpen(true);
  };

  // Save FAQ (Create or Update)
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    try {
      if (selectedFaq) {
        // Update
        const res = await api.put(`/faqs/${selectedFaq._id}`, form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchFaqsAndHeader();
        }
      } else {
        // Create
        const res = await api.post("/faqs", form);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchFaqsAndHeader();
        }
      }
    } catch (err) {
      console.error("Error saving FAQ:", err);
      setSaveError(err.response?.data?.message || "Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  // Save FAQ Header
  const handleSaveHeader = async (e) => {
    e.preventDefault();
    setIsSavingHeader(true);
    setHeaderSaveSuccess(false);
    try {
      const res = await api.put("/faqs/header", { title: headerTitle, bgImage: headerImage });
      if (res.data && res.data.success) {
        setHeaderSaveSuccess(true);
        setTimeout(() => setHeaderSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving FAQ header:", err);
      alert("Failed to save page header configuration.");
    } finally {
      setIsSavingHeader(false);
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const res = await api.delete(`/faqs/${id}`);
      if (res.data && res.data.success) {
        setIsModalOpen(false);
        fetchFaqsAndHeader();
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      alert("Failed to delete FAQ.");
    }
  };

  return (
    <div id="admin-faqs-page" className="space-y-6 font-sans">
      
      {/* FAQ Page Header Settings Card */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">FAQ Page Header CMS</h3>
          <p className="text-xs text-slate-400 mt-0.5">Customize the page banner image and main header title for the public FAQs page.</p>
        </div>
        
        {headerSaveSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <Info size={14} />
            <span>FAQ Page Header updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">FAQ Page Main Title</label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
              placeholder="e.g. Frequently Asked Questions"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase block">FAQ Page Cover Banner Image</label>
            <ImageUpload 
              key="faq-header-bg"
              defaultUrl={headerImage}
              onUploadSuccess={(url) => setHeaderImage(url)}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSavingHeader}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm shadow-primary/10 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50"
            >
              <Save size={13} />
              {isSavingHeader ? "Saving Header..." : "Save Page Header Settings"}
            </button>
          </div>
        </form>
      </div>

      {/* FAQs List Moderation Card */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Manage FAQ Questions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Add, edit, delete, and adjust sequence sorting of individual FAQ items.</p>
        </div>

        {/* Header Panel */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search FAQs question, answer or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/70 hover:border-slate-350 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary pl-9 pr-4 py-2 rounded-xl text-xs font-semibold transition-all"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={() => openModal(null)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm shadow-primary/10"
          >
            <Plus size={14} />
            Add FAQ
          </button>

        </div>

        {/* Datatable */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <span className="text-xs font-semibold text-slate-500">Retrieving query logs...</span>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <HelpCircle className="mx-auto text-slate-200 mb-3" size={48} />
              <p className="text-sm font-bold text-slate-800">No FAQs found</p>
              <p className="text-xs text-slate-400 mt-1">Add a new question/answer pair using the button above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    <th className="px-4 py-4 w-12 whitespace-nowrap">Seq</th>
                    <th className="px-4 py-4 w-[25%]">Question</th>
                    <th className="px-4 py-4 w-[35%]">Answer Summary</th>
                    <th className="px-4 py-4 w-24 whitespace-nowrap">Category</th>
                    <th className="px-4 py-4 w-48 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                  {filteredFaqs.sort((a, b) => (a.sortOrder ?? a.order ?? 0) - (b.sortOrder ?? b.order ?? 0)).map((f) => (
                    <tr key={f._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 font-mono text-slate-400 whitespace-nowrap">{f.sortOrder ?? f.order ?? 0}</td>
                      <td className="px-4 py-4 text-slate-900 font-extrabold truncate">
                        {stripHtml(f.question)}
                      </td>
                      <td className="px-4 py-4 text-slate-500 truncate">
                        {stripHtml(f.answer)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-slate-100 border border-slate-200 text-slate-500">
                          {f.category || "General"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(f)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                          >
                            <Edit size={12} />
                            Edit FAQ
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(f._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-[10px] font-black uppercase text-red-500 bg-white hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={12} />
                            Delete FAQ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/70 rounded-3xl max-w-lg w-full overflow-hidden flex flex-col shadow-2xl animate-scaleUp">
            
            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-slate-50/50">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                {selectedFaq ? "Edit FAQ Entry" : "Add FAQ Entry"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error notifications */}
            {saveError && (
              <div className="bg-red-500/10 border-b border-red-500/20 text-red-500 px-6 py-3 text-xs font-semibold flex items-center gap-2">
                <Info size={14} />
                <span>{saveError}</span>
              </div>
            )}

            {/* Form body */}
            <form onSubmit={handleSaveFaq}>
              <div className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Question Text</label>
                  <input
                    type="text"
                    value={form.question}
                    onChange={(e) => setForm(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="e.g. How long does standard express courier delivery take?"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Shipping rates"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Sequence / Order Index</label>
                    <input
                      type="number"
                      value={form.sortOrder}
                      onChange={(e) => setForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Answer Description</label>
                  <RichTextEditor
                    value={form.answer}
                    onChange={(newContent) => setForm(prev => ({ ...prev, answer: newContent }))}
                    placeholder="Enter detailed answer response..."
                  />
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {selectedFaq && (
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(selectedFaq._id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors order-last sm:order-first"
                  >
                    <Trash2 size={13} />
                    Delete FAQ
                  </button>
                )}
                <div className="flex gap-2 justify-end flex-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save FAQ"}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
