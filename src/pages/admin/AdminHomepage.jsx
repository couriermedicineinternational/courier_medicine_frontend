import { useState, useEffect } from "react";
import { 
  Home, 
  Settings, 
  Search, 
  Save, 
  Trash2, 
  Plus, 
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff
} from "lucide-react";
import ImageUpload from "../../components/ui/ImageUpload";
import AdminTestimonials from "./AdminTestimonials";
import RichTextEditor from "../../components/RichTextEditor";
import api from "../../utils/api";

export default function AdminHomepage() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionKey, setActiveSectionKey] = useState("hero");
  
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
      const res = await api.get("/homepage/admin");
      if (res.data && res.data.success) {
        const data = res.data.data || [];
        setSections(data);
        
        // Select first section by default or preserve selection
        const keyToLoad = activeSectionKey || data[0]?.key || "hero";
        loadSectionData(data, keyToLoad);
      }
    } catch (err) {
      console.error("Error fetching homepage sections:", err);
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

  // Toggle active status directly
  const handleToggleActive = async (key, currentVal) => {
    try {
      const res = await api.put(`/homepage/${key}`, { isActive: !currentVal });
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

  // Save changes to database
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
      
      const res = await api.put(`/homepage/${activeSectionKey}`, payload);
      if (res.data && res.data.success) {
        setSaveSuccess(true);
        // Refresh full list
        const updatedList = sections.map(s => s.key === activeSectionKey ? res.data.data : s);
        setSections(updatedList);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Failed to save homepage section changes:", err);
      setSaveError(err.response?.data?.message || "Failed to save section content.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper functions for array content changes
  const updateContentField = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  // Content custom editor renderers
  const renderContentEditor = () => {
    if (!content) return null;

    switch (activeSectionKey) {
      case "hero":
        return (
          <div className="space-y-6">
            {/* Slider Config */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Slider Slides</h4>
                <button
                  type="button"
                  onClick={() => {
                    const slides = [...(content.slides || [])];
                    slides.push({ heading: "New Slide Heading", subheading: "New Slide Description" });
                    updateContentField("slides", slides);
                  }}
                  className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
                >
                  <Plus size={10} /> Add Slide
                </button>
              </div>
              
              {(content.slides || []).map((slide, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      const slides = (content.slides || []).filter((_, i) => i !== idx);
                      updateContentField("slides", slides);
                    }}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                  <span className="text-[9px] font-mono font-black text-slate-400">SLIDE #{idx + 1}</span>
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Slide Headline</label>
                    <input
                      type="text"
                      value={slide.heading || ""}
                      onChange={(e) => {
                        const slides = [...content.slides];
                        slides[idx].heading = e.target.value;
                        updateContentField("slides", slides);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Slide Subtitle</label>
                    <textarea
                      value={slide.subheading || ""}
                      onChange={(e) => {
                        const slides = [...content.slides];
                        slides[idx].subheading = e.target.value;
                        updateContentField("slides", slides);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold h-14 resize-none"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets Config */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Features Bullet List</h4>
                <button
                  type="button"
                  onClick={() => {
                    const bullets = [...(content.bullets || [])];
                    bullets.push("New Feature Item");
                    updateContentField("bullets", bullets);
                  }}
                  className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
                >
                  <Plus size={10} /> Add Bullet
                </button>
              </div>

              {(content.bullets || []).map((bullet, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => {
                      const bullets = [...content.bullets];
                      bullets[idx] = e.target.value;
                      updateContentField("bullets", bullets);
                    }}
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const bullets = (content.bullets || []).filter((_, i) => i !== idx);
                      updateContentField("bullets", bullets);
                    }}
                    className="p-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl transition-colors shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "stats":
        return (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Achievement Counters</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(content.stats || []).map((stat, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-2">
                  <span className="text-[9px] font-mono font-black text-slate-400">COUNTER BLOCK #{idx + 1}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Value</label>
                      <input
                        type="text"
                        value={stat.value || ""}
                        onChange={(e) => {
                          const stats = [...content.stats];
                          stats[idx].value = e.target.value;
                          updateContentField("stats", stats);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-bold text-slate-800"
                        placeholder="e.g. 10K+"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase">Suffix</label>
                      <input
                        type="text"
                        value={stat.suffix || ""}
                        onChange={(e) => {
                          const stats = [...content.stats];
                          stats[idx].suffix = e.target.value;
                          updateContentField("stats", stats);
                        }}
                        className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                        placeholder="e.g. % or +"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Label / Description</label>
                    <input
                      type="text"
                      value={stat.label || ""}
                      onChange={(e) => {
                        const stats = [...content.stats];
                        stats[idx].label = e.target.value;
                        updateContentField("stats", stats);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Global Customers"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "what-medicines":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Medicine Category Cards</h4>
              <button
                type="button"
                onClick={() => {
                  const cats = [...(content.categories || [])];
                  cats.push({ id: `custom-${Date.now()}`, title: "New Category", description: "Category description", icon: "Activity", imageUrl: "" });
                  updateContentField("categories", cats);
                }}
                className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus size={10} /> Add Card
              </button>
            </div>

            {(content.categories || []).map((cat, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-4 md:p-5 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const cats = (content.categories || []).filter((_, i) => i !== idx);
                    updateContentField("categories", cats);
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <span className="text-[9px] font-mono font-black text-slate-400">CATEGORY CARD #{idx + 1}</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Category Title</label>
                    <input
                      type="text"
                      value={cat.title || ""}
                      onChange={(e) => {
                        const cats = [...content.categories];
                        cats[idx].title = e.target.value;
                        updateContentField("categories", cats);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase">Lucide Icon Name</label>
                    <input
                      type="text"
                      value={cat.icon || "Activity"}
                      onChange={(e) => {
                        const cats = [...content.categories];
                        cats[idx].icon = e.target.value;
                        updateContentField("categories", cats);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-mono text-slate-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Description Text</label>
                  <textarea
                    value={cat.description || ""}
                    onChange={(e) => {
                      const cats = [...content.categories];
                      cats[idx].description = e.target.value;
                      updateContentField("categories", cats);
                    }}
                    className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold h-14 resize-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Card Image</label>
                  <ImageUpload 
                    key={cat.id || idx}
                    defaultUrl={cat.imageUrl}
                    onUploadSuccess={(url) => {
                      const cats = [...content.categories];
                      cats[idx].imageUrl = url;
                      updateContentField("categories", cats);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "easy-courier":
      case "documents":
        const listKey = activeSectionKey === "easy-courier" ? "accordions" : "items";
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Accordion Items</h4>
              <button
                type="button"
                onClick={() => {
                  const list = [...(content[listKey] || [])];
                  list.push({ title: "New Item Title", content: "New Item description text detail." });
                  updateContentField(listKey, list);
                }}
                className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus size={10} /> Add Item
              </button>
            </div>

            {(content[listKey] || []).map((item, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const list = (content[listKey] || []).filter((_, i) => i !== idx);
                    updateContentField(listKey, list);
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <span className="text-[9px] font-mono font-black text-slate-400">ITEM #{idx + 1}</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Title / Question</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => {
                      const list = [...content[listKey]];
                      list[idx].title = e.target.value;
                      updateContentField(listKey, list);
                    }}
                    className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Answer / Content</label>
                  <RichTextEditor
                    value={item.content || ""}
                    onChange={(newContent) => {
                      const list = [...content[listKey]];
                      list[idx].content = newContent;
                      updateContentField(listKey, list);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "cta-banner":
        return (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Banner Custom Settings</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase">Button Link Label</label>
                <input
                  type="text"
                  value={content.buttonText || ""}
                  onChange={(e) => updateContentField("buttonText", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                  placeholder="e.g. Consult Experts"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase">Button Target URL</label>
                <input
                  type="text"
                  value={content.buttonLink || ""}
                  onChange={(e) => updateContentField("buttonLink", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold font-mono"
                  placeholder="https://..."
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase">CTA Background Banner Image</label>
              <ImageUpload 
                key="cta-bg-upload"
                defaultUrl={content.bgImage}
                onUploadSuccess={(url) => updateContentField("bgImage", url)}
              />
            </div>
          </div>
        );

      case "process":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Logistics Transit Flow Steps</h4>
              <button
                type="button"
                onClick={() => {
                  const steps = [...(content.steps || [])];
                  steps.push({ title: "New Step", description: "Step description text", imageUrl: "" });
                  updateContentField("steps", steps);
                }}
                className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus size={10} /> Add Step
              </button>
            </div>

            {(content.steps || []).map((step, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-4 md:p-5 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const steps = (content.steps || []).filter((_, i) => i !== idx);
                    updateContentField("steps", steps);
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={13} />
                </button>
                <span className="text-[9px] font-mono font-black text-slate-400">PROCESS NODE STEP #{idx + 1}</span>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Step Title</label>
                  <input
                    type="text"
                    value={step.title || ""}
                    onChange={(e) => {
                      const steps = [...content.steps];
                      steps[idx].title = e.target.value;
                      updateContentField("steps", steps);
                    }}
                    className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase">Description Details</label>
                  <textarea
                    value={step.description || ""}
                    onChange={(e) => {
                      const steps = [...content.steps];
                      steps[idx].description = e.target.value;
                      updateContentField("steps", steps);
                    }}
                    className="w-full bg-white border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold h-14 resize-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Step Illustration Image</label>
                  <ImageUpload 
                    key={idx}
                    defaultUrl={step.imageUrl}
                    onUploadSuccess={(url) => {
                      const steps = [...content.steps];
                      steps[idx].imageUrl = url;
                      updateContentField("steps", steps);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-2">Testimonials Management Panel</h4>
            <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
              <AdminTestimonials />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="admin-homepage-cms" className="space-y-4 font-sans">
      
      {/* Title block */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Homepage Page Builder</h2>
          <p className="text-xs text-slate-400 mt-1">Configure layout ordering, texts, and active display modules of sections on the home screen.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-3xl p-3 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2 block">Homepage Sections</span>
          
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

                {activeSectionKey !== "cta-banner" && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Subheading (Description)</label>
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold h-16 resize-none"
                      placeholder="Enter description tagline..."
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="section-is-active"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                  />
                  <label htmlFor="section-is-active" className="text-xs font-bold text-slate-700">
                    Render this section dynamically on public homepage
                  </label>
                </div>
              </div>

              {/* Specific Content Blocks */}
              {((content && Object.keys(content).length > 0) || activeSectionKey === "testimonials") && (
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
