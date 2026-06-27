import { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Info,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import api from "../../utils/api";
import ImageUpload from "../../components/ui/ImageUpload";
import RichTextEditor from "../../components/RichTextEditor";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Blog Page Header states
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubtitle, setHeaderSubtitle] = useState("");
  const [headerTag, setHeaderTag] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [headerSaveSuccess, setHeaderSaveSuccess] = useState(false);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // null when adding new
  const [form, setForm] = useState({ 
    title: "", 
    slug: "", 
    author: "Admin", 
    category: "Courier Guidelines", 
    readTime: "3 min read",
    excerpt: "",
    content: "",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    tags: ["medicine courier", "international delivery"],
    isPublished: true,
    introParagraph: "",
    sections: [],
    tip: ""
  });
  const [tagsInput, setTagsInput] = useState("medicine courier, international delivery");
  const [imageMode, setImageMode] = useState("url"); // "upload" or "url"
  
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Fetch blogs list & Page Header settings
  const fetchBlogsAndHeader = async () => {
    try {
      setIsLoading(true);
      // Fetch all including inactive for admin management panel
      const res = await api.get("/blogs", { params: { all: "true" } });
      if (res.data && res.data.success) {
        setBlogs(res.data.data || []);
      }

      // Fetch Blog Page Header
      const headerRes = await api.get("/blogs/header");
      if (headerRes.data && headerRes.data.success && headerRes.data.data) {
        setHeaderTitle(headerRes.data.data.title || "Our Blog");
        setHeaderSubtitle(headerRes.data.data.subtitle || "");
        setHeaderTag(headerRes.data.data.tag || "Regulations & Updates");
        setHeaderImage(headerRes.data.data.bgImage || "");
      }
    } catch (err) {
      console.error("Error fetching blogs and header settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsAndHeader();
  }, []);

  // Save Blog Header
  const handleSaveHeader = async (e) => {
    e.preventDefault();
    setIsSavingHeader(true);
    setHeaderSaveSuccess(false);
    try {
      const res = await api.put("/blogs/header", { 
        title: headerTitle, 
        subtitle: headerSubtitle,
        tag: headerTag,
        bgImage: headerImage 
      });
      if (res.data && res.data.success) {
        setHeaderSaveSuccess(true);
        setTimeout(() => setHeaderSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving Blog header:", err);
      alert("Failed to save page header configuration.");
    } finally {
      setIsSavingHeader(false);
    }
  };

  // Sync slug as title changes in add mode
  const handleTitleChange = (val) => {
    const updatedForm = { ...form, title: val };
    
    // Only auto-generate in Create mode
    if (!selectedBlog) {
      const cleanTitle = val.trim();
      if (cleanTitle) {
        const slug = cleanTitle.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric chars with hyphen
          .replace(/(^-|-$)/g, "");   // trim leading/trailing hyphens
        updatedForm.slug = `${slug}.htm`;
      }
    }
    
    setForm(updatedForm);
  };

  // Filter list locally for snappy UI
  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination parameters
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);



  // Open modal
  const openModal = (blogObj = null) => {
    setSelectedBlog(blogObj);
    if (blogObj) {
      setForm({
        title: blogObj.title || "",
        slug: blogObj.slug || "",
        author: blogObj.author || "Admin",
        category: blogObj.category || "Courier Guidelines",
        readTime: blogObj.readTime || "3 min read",
        excerpt: blogObj.excerpt || blogObj.summary || "",
        content: blogObj.content || "",
        imageUrl: blogObj.imageUrl || blogObj.image || "", // map both model fields just in case
        tags: blogObj.tags || [],
        isPublished: blogObj.isPublished !== undefined ? blogObj.isPublished : true,
        introParagraph: blogObj.introParagraph || "",
        sections: (blogObj.sections || []).map(s => ({
          id: s.id || s._id || (Math.random().toString() + Date.now()),
          heading: s.heading || "",
          body: s.body || ""
        })),
        tip: blogObj.tip || ""
      });
      setTagsInput((blogObj.tags || []).join(", "));
      if ((blogObj.imageUrl || blogObj.image) && !(blogObj.imageUrl || blogObj.image).includes("cloudinary")) {
        setImageMode("url");
      } else {
        setImageMode("upload");
      }
    } else {
      setForm({ 
        title: "", 
        slug: "", 
        author: "Admin", 
        category: "Courier Guidelines", 
        readTime: "3 min read",
        excerpt: "",
        content: "",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
        tags: ["medicine courier", "international delivery"],
        isPublished: true,
        introParagraph: "",
        sections: [],
        tip: ""
      });
      setTagsInput("medicine courier, international delivery");
      setImageMode("url");
    }
    setSaveError("");
    setIsModalOpen(true);
  };

  // Save Blog (Create or Update)
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setSaveError("");
    setIsSaving(true);
    
    // Parse tags input
    const parsedTags = tagsInput.split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Strip temporary UI id keys from sections before saving
    const cleanedSections = (form.sections || []).map(({ heading, body }) => ({ heading, body }));

    const dataToSave = {
      ...form,
      sections: cleanedSections,
      tags: parsedTags
    };

    // If content is empty or was identical to the previous excerpt, sync it with new excerpt
    if (!dataToSave.content || (selectedBlog && dataToSave.content === selectedBlog.excerpt)) {
      dataToSave.content = dataToSave.excerpt;
    }

    try {
      if (selectedBlog) {
        // Update
        const res = await api.put(`/blogs/${selectedBlog._id}`, dataToSave);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchBlogsAndHeader();
        }
      } else {
        // Create
        const res = await api.post("/blogs", dataToSave);
        if (res.data && res.data.success) {
          setIsModalOpen(false);
          fetchBlogsAndHeader();
        }
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      setSaveError(err.response?.data?.message || "Failed to save blog article.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await api.delete(`/blogs/${id}`);
      if (res.data && res.data.success) {
        setIsModalOpen(false);
        fetchBlogsAndHeader();
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog post.");
    }
  };

  return (
    <div id="admin-blogs-page" className="space-y-6 font-sans">
      
      {/* Blog Page Header Settings Card */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Blog Page Header CMS</h3>
          <p className="text-xs text-slate-400 mt-0.5">Customize the page banner image, main title, subtitle, and top tag for the public Blog page.</p>
        </div>
        
        {headerSaveSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <Info size={14} />
            <span>Blog Page Header updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Blog Page Tag</label>
              <input
                type="text"
                value={headerTag}
                onChange={(e) => setHeaderTag(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                placeholder="e.g. Regulations & Updates"
                required
              />
            </div>
            
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Blog Page Main Title</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                placeholder="e.g. Our Blog"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Blog Page Subtitle</label>
            <input
              type="text"
              value={headerSubtitle}
              onChange={(e) => setHeaderSubtitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
              placeholder="e.g. Regulations & Updates, shipping schedules, and critical logistics advisories..."
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase block">Blog Page Cover Banner Image</label>
            <ImageUpload 
              key="blog-header-uploader"
              defaultUrl={headerImage} 
              onUploadSuccess={(url) => setHeaderImage(url)} 
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingHeader}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm shadow-primary/10 disabled:opacity-50"
            >
              {isSavingHeader ? "Saving..." : "Save Header Settings"}
            </button>
          </div>
        </form>
      </div>
      
      {/* Header Panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search blog title, author or tags..."
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
          Create Blog Post
        </button>

      </div>

      {/* Datatable */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <span className="text-xs font-semibold text-slate-500">Accessing archives...</span>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <BookOpen className="mx-auto text-slate-200 mb-3" size={48} />
            <p className="text-sm font-bold text-slate-800">No blog posts found</p>
            <p className="text-xs text-slate-400 mt-1">Publish a new informative post using the button above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4 w-[35%]">Title / Category</th>
                  <th className="px-6 py-4 whitespace-nowrap w-[15%]">Author</th>
                  <th className="px-6 py-4 whitespace-nowrap w-[10%]">Views</th>
                  <th className="px-6 py-4 whitespace-nowrap w-[10%]">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap w-[15%]">Published Date</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {paginatedBlogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-900 truncate">{b.title}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{b.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-semibold">
                      {b.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-slate-500 font-mono">
                        <Eye size={13} className="text-slate-400" />
                        <span>{b.views || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        b.isPublished 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}>
                        {b.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(b)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-black uppercase text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                          <Edit size={12} />
                          Edit Article
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-[10px] font-black uppercase text-red-500 bg-white hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400">
              Showing page {page} of {totalPages} ({filteredBlogs.length} total posts)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => prev - 1)}
                className="p-2 border border-slate-200/80 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
                className="p-2 border border-slate-200/80 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/70 rounded-3xl max-w-2xl w-full overflow-hidden flex flex-col shadow-2xl animate-scaleUp max-h-[90vh]">
            
            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 bg-slate-50/50">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                {selectedBlog ? "Edit Article" : "Create New Blog Post"}
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
              <div className="bg-red-500/10 border-b border-red-500/20 text-red-500 px-6 py-3 text-xs font-semibold flex items-center gap-2 shrink-0">
                <Info size={14} />
                <span>{saveError}</span>
              </div>
            )}

            {/* Form body */}
            <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto flex flex-col justify-between">
              
              <div className="p-6 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Article Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                    placeholder="e.g. Essential Documents Needed For Medicine Courier to UK"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">SEO Slug (.htm suffix)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold font-mono"
                    placeholder="e.g. documents-needed-for-uk-medicine-courier.htm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Author Name</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Reading Time (e.g. 4 min read)</label>
                    <input
                      type="text"
                      value={form.readTime}
                      onChange={(e) => setForm(prev => ({ ...prev, readTime: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-semibold">Banner Image</label>
                    <div className="flex bg-slate-100 rounded-lg p-0.5 text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setImageMode("upload")}
                        className={`px-2 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageMode("url")}
                        className={`px-2 py-1 rounded-md transition-all ${imageMode === "url" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        Paste URL
                      </button>
                    </div>
                  </div>
                  
                  {imageMode === "upload" ? (
                    <ImageUpload 
                      key={selectedBlog ? selectedBlog._id : "new"}
                      defaultUrl={form.imageUrl} 
                      onUploadSuccess={(url) => setForm(prev => ({ ...prev, imageUrl: url }))} 
                    />
                  ) : (
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => setForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold font-mono"
                      required
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Summary / Intro Paragraph</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Write a brief overview of the post..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold min-h-[100px]"
                    required
                  />
                </div>

                 {/* Body Intro Paragraph */}
                 <div className="space-y-1">
                   <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Introductory Paragraph (Body Intro)</label>
                   <RichTextEditor
                     value={form.introParagraph}
                     onChange={(newContent) => setForm(prev => ({ ...prev, introParagraph: newContent }))}
                     placeholder="Write the introduction paragraph that appears before the numbered sections..."
                   />
                 </div>

                 {/* Article Body Content (Main Text) */}
                 <div className="space-y-1">
                   <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Article Body Content (Main Text)</label>
                   <RichTextEditor
                     value={form.content}
                     onChange={(newContent) => setForm(prev => ({ ...prev, content: newContent }))}
                     placeholder="Write the main body content of the blog post here..."
                   />
                 </div>

                  {/* Pro Tip Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pro Tip Banner Text (Optional)</label>
                    <input
                      type="text"
                      value={form.tip}
                      onChange={(e) => setForm(prev => ({ ...prev, tip: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2.5 rounded-xl text-xs font-semibold"
                      placeholder="e.g. Always retain copies of all documents submitted..."
                    />
                  </div>

                  {/* Dynamic Numbered Card Sections */}
                  <div className="space-y-3 border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Numbered Card Sections</label>
                      <button
                        type="button"
                        onClick={() => {
                          setForm(prev => {
                            const updatedSections = [...prev.sections, { id: Math.random().toString() + Date.now(), heading: "", body: "" }];
                            return { ...prev, sections: updatedSections };
                          });
                        }}
                        className="text-[10px] font-black text-primary uppercase hover:underline"
                      >
                        + Add Section
                      </button>
                    </div>
                    
                    {form.sections.length === 0 ? (
                      <p className="text-[11px] text-slate-400 font-semibold italic">No custom sections defined. Will use default fallback data.</p>
                    ) : (
                      <div className="space-y-4">
                        {form.sections.map((sect, index) => (
                          <div key={sect.id || index} className="bg-white border border-slate-200/60 rounded-xl p-3 space-y-2 relative">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Card Section #{index + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setForm(prev => {
                                    const updatedSections = prev.sections.filter((_, i) => i !== index);
                                    return { ...prev, sections: updatedSections };
                                  });
                                }}
                                className="text-[10px] font-black text-red-500 uppercase hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                placeholder={`Section Heading (e.g. Why Liquid Medicines Are High-Risk)`}
                                value={sect.heading}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setForm(prev => {
                                    const updatedSections = [...prev.sections];
                                    updatedSections[index] = { ...updatedSections[index], heading: val };
                                    return { ...prev, sections: updatedSections };
                                  });
                                }}
                                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                                required
                              />
                              <RichTextEditor
                                value={sect.body}
                                onChange={(newContent) => {
                                  setForm(prev => {
                                    const updatedSections = [...prev.sections];
                                    updatedSections[index] = { ...updatedSections[index], body: newContent };
                                    return { ...prev, sections: updatedSections };
                                  });
                                }}
                                placeholder="Section Body text..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                 <div className="flex items-center gap-2 pt-2">
                   <input
                     id="blog-is-active"
                     type="checkbox"
                     checked={form.isPublished}
                     onChange={(e) => setForm(prev => ({ ...prev, isPublished: e.target.checked }))}
                     className="w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary focus:ring-1"
                   />
                   <label htmlFor="blog-is-active" className="text-xs font-bold text-slate-700">
                     Publish this blog article immediately on the dynamic blog index page
                    </label>
                  </div>

                </div>

              {/* Actions Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                {selectedBlog && (
                  <button
                    type="button"
                    onClick={() => handleDeleteBlog(selectedBlog._id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-colors order-last sm:order-first"
                  >
                    <Trash2 size={13} />
                    Delete Post
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
                    {isSaving ? "Saving..." : (selectedBlog ? "Save Changes" : "Publish Post")}
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
