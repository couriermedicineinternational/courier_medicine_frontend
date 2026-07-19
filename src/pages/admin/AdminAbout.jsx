import { useState, useEffect } from "react";
import { 
  Save, 
  Plus, 
  Trash2, 
  Info,
  Layers,
  Eye,
  EyeOff
} from "lucide-react";
import api from "../../utils/api";
import ImageUpload from "../../components/ui/ImageUpload";
import RichTextEditor from "../../components/RichTextEditor";

export default function AdminAbout() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionKey, setActiveSectionKey] = useState("about-hero");
  
  // Section states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [content, setContent] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/about/admin");
      if (res.data && res.data.success) {
        const data = res.data.data || [];
        setSections(data);
        
        const keyToLoad = activeSectionKey || data[0]?.key || "about-hero";
        loadSectionData(data, keyToLoad);
      }
    } catch (err) {
      console.error("Error fetching about sections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const loadSectionData = (dataList, key) => {
    const section = dataList.find(s => s.key === key);
    if (section) {
      setTitle(section.title || "");
      setSubtitle(section.subtitle || "");
      setSortOrder(section.sortOrder || 0);
      setIsActive(section.isActive !== undefined ? section.isActive : true);
      setContent(section.content || {});
      setSaveSuccess(false);
      setSaveError("");
    }
  };

  const handleSelectSection = (key) => {
    setActiveSectionKey(key);
    loadSectionData(sections, key);
  };

  const handleToggleActive = async (key, currentVal) => {
    try {
      const res = await api.put(`/about/${key}`, { isActive: !currentVal });
      if (res.data && res.data.success) {
        setSections(prev => prev.map(s => s.key === key ? { ...s, isActive: !currentVal } : s));
        if (activeSectionKey === key) {
          setIsActive(!currentVal);
        }
      }
    } catch (err) {
      console.error("Failed to toggle section status:", err);
      alert("Failed to toggle visibility status.");
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess(false);
    setIsSaving(true);
    try {
      const payload = {
        title,
        subtitle,
        sortOrder,
        isActive,
        content
      };
      
      const res = await api.put(`/about/${activeSectionKey}`, payload);
      if (res.data && res.data.success) {
        setSaveSuccess(true);
        const updatedList = sections.map(s => s.key === activeSectionKey ? res.data.data : s);
        setSections(updatedList);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Failed to save about section changes:", err);
      setSaveError(err.response?.data?.message || "Failed to save section content.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateContentField = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const renderContentEditor = () => {
    if (!content) return null;

    switch (activeSectionKey) {
      case "about-hero":
        return (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Hero Image</h4>
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase">Cover Banner Image</label>
              <ImageUpload 
                key="about-hero-bg"
                defaultUrl={content.bgImage}
                onUploadSuccess={(url) => updateContentField("bgImage", url)}
              />
            </div>
          </div>
        );

      case "about-welcome":
        return (
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Welcome Column Content</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Welcome Paragraph 1</label>
              <RichTextEditor
                value={content.description1 || ""}
                onChange={(newContent) => updateContentField("description1", newContent)}
                placeholder="Welcome description text..."
                height={200}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Welcome Paragraph 2</label>
              <RichTextEditor
                value={content.description2 || ""}
                onChange={(newContent) => updateContentField("description2", newContent)}
                placeholder="Additional details paragraph..."
                height={200}
              />
            </div>

            <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-mono font-black text-slate-400">FREE DOOR PICKUP BANNER</span>
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase">Banner Headline</label>
                <input
                  type="text"
                  value={content.freePickupTitle || ""}
                  onChange={(e) => updateContentField("freePickupTitle", e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-bold text-slate-800"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase">Banner Description</label>
                <RichTextEditor
                  value={content.description3 || ""}
                  onChange={(newContent) => updateContentField("description3", newContent)}
                  height={200}
                />
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-mono font-black text-slate-400">PRESCRIPTION BUYING SERVICE BANNER</span>
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase">Banner Headline</label>
                <input
                  type="text"
                  value={content.buyServiceTitle || ""}
                  onChange={(e) => updateContentField("buyServiceTitle", e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-bold text-slate-800"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 uppercase">Banner Description</label>
                <RichTextEditor
                  value={content.buyServiceDesc || ""}
                  onChange={(newContent) => updateContentField("buyServiceDesc", newContent)}
                  height={200}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Company Priorities Grid</h4>
                <button
                  type="button"
                  onClick={() => {
                    const priors = [...(content.priorities || [])];
                    priors.push({ title: "New Priority", icon: "Heart", description: "Priority description" });
                    updateContentField("priorities", priors);
                  }}
                  className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
                >
                  Add Card
                </button>
              </div>

              {(content.priorities || []).map((v, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const priors = (content.priorities || []).filter((_, i) => i !== idx);
                      updateContentField("priorities", priors);
                    }}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="text-[9px] font-mono font-black text-slate-400">PRIORITY CARD #{idx + 1}</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Card Title</label>
                      <input
                        type="text"
                        value={v.title || ""}
                        onChange={(e) => {
                          const priors = [...content.priorities];
                          priors[idx].title = e.target.value;
                          updateContentField("priorities", priors);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={v.icon || ""}
                        onChange={(e) => {
                          const priors = [...content.priorities];
                          priors[idx].icon = e.target.value;
                          updateContentField("priorities", priors);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                        placeholder="e.g. Heart, Shield, Users"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Description Details</label>
                    <RichTextEditor
                      value={v.description || ""}
                      onChange={(newContent) => {
                        const priors = [...content.priorities];
                        priors[idx].description = newContent;
                        updateContentField("priorities", priors);
                      }}
                      height={200}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "about-vision-mission":
        return (
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Vision & Mission Statements</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Our Vision Text</label>
              <RichTextEditor
                value={content.vision || ""}
                onChange={(newContent) => updateContentField("vision", newContent)}
                height={200}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Our Mission Text</label>
              <RichTextEditor
                value={content.mission || ""}
                onChange={(newContent) => updateContentField("mission", newContent)}
                height={200}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Reach Capabilities Grid</h4>
                <button
                  type="button"
                  onClick={() => {
                    const cards = [...(content.reachCards || [])];
                    cards.push({ title: "New Feature", icon: "MapPin", description: "Feature description details" });
                    updateContentField("reachCards", cards);
                  }}
                  className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
                >
                  Add Card
                </button>
              </div>

              {(content.reachCards || []).map((v, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const cards = (content.reachCards || []).filter((_, i) => i !== idx);
                      updateContentField("reachCards", cards);
                    }}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="text-[9px] font-mono font-black text-slate-400">REACH CAPABILITY CARD #{idx + 1}</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Card Title</label>
                      <input
                        type="text"
                        value={v.title || ""}
                        onChange={(e) => {
                          const cards = [...content.reachCards];
                          cards[idx].title = e.target.value;
                          updateContentField("reachCards", cards);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Lucide Icon Name</label>
                      <input
                        type="text"
                        value={v.icon || ""}
                        onChange={(e) => {
                          const cards = [...content.reachCards];
                          cards[idx].icon = e.target.value;
                          updateContentField("reachCards", cards);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                        placeholder="e.g. MapPin, Globe, Package"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Description Details</label>
                    <RichTextEditor
                      value={v.description || ""}
                      onChange={(newContent) => {
                        const cards = [...content.reachCards];
                        cards[idx].description = newContent;
                        updateContentField("reachCards", cards);
                      }}
                      height={200}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="admin-about-cms" className="space-y-4 font-sans">
      
      <div className="bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">About Page Builder</h2>
          <p className="text-xs text-slate-400 mt-1">Configure layout ordering, texts, priorities cards, and mission/vision on the about screen.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-3xl p-3 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2 block">About Sections</span>
          
          {isLoading ? (
            <div className="py-10 text-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary mx-auto mb-2"></div>
              <span className="text-[10px] text-slate-400 font-semibold">Accessing layout logs...</span>
            </div>
          ) : (
            sections.map((sec) => (
              <button
                key={sec.key}
                type="button"
                onClick={() => handleSelectSection(sec.key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                  activeSectionKey === sec.key 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers size={14} className={activeSectionKey === sec.key ? "text-white" : "text-slate-400"} />
                  <span>{sec.name}</span>
                </div>
                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/50 text-slate-600 font-black">
                    #{sec.sortOrder}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(sec.key, sec.isActive)}
                    className={`p-1 rounded-md transition-colors ${
                      sec.isActive 
                        ? (activeSectionKey === sec.key ? "text-white hover:bg-white/10" : "text-emerald-500 hover:bg-emerald-50")
                        : (activeSectionKey === sec.key ? "text-white/40 hover:bg-white/10" : "text-slate-350 hover:bg-slate-50")
                    }`}
                    title={sec.isActive ? "Hide Section" : "Show Section"}
                  >
                    {sec.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Section Editor Form */}
        <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col max-h-[75vh]">
          
          <div className="h-12 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-slate-50/50">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              {sections.find(s => s.key === activeSectionKey)?.name || "Edit Section Settings"}
            </h3>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
              isActive 
                ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}>
              {isActive ? "Active on Website" : "Hidden / Inactive"}
            </span>
          </div>

          {/* Alert banners */}
          {saveSuccess && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-600 px-6 py-3 text-xs font-semibold flex items-center gap-2">
              <Info size={14} />
              <span>Section configuration changes published successfully!</span>
            </div>
          )}
          {saveError && (
            <div className="bg-red-500/10 border-b border-red-500/20 text-red-500 px-6 py-3 text-xs font-semibold flex items-center gap-2">
              <Info size={14} />
              <span>{saveError}</span>
            </div>
          )}

          {isLoading ? (
            <div className="py-20 text-center text-slate-500">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-3"></div>
              <p className="text-xs font-bold">Loading layout configuration parameters...</p>
            </div>
          ) : (
            <form onSubmit={handleSaveChanges} className="divide-y divide-slate-100 flex-1 overflow-y-auto custom-scrollbar">
              
              {/* Header Texts */}
              <div className="p-4 space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">1. Section Header Layout</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Display Title (Heading)</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Welcome to our site"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Display Sequence Order</label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Subheading (Description/Tag)</label>
                  <textarea
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold h-16 resize-none"
                    placeholder="Enter description tagline..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="section-is-active"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                  />
                  <label htmlFor="section-is-active" className="text-xs font-bold text-slate-700">
                    Render this section dynamically on public about page
                  </label>
                </div>
              </div>

              {/* Specific Content Blocks */}
              {content && Object.keys(content).length > 0 && (
                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">2. Component Details & Items</span>
                  {renderContentEditor()}
                </div>
              )}

              {/* Form Actions */}
              <div className="p-5 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm shadow-primary/10 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  <Save size={14} />
                  {isSaving ? "Publishing..." : "Publish Section Changes"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
