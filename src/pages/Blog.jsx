import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import api from "../utils/api";
import { BLOG_PAGE } from "../constants";
import { Calendar, User, Clock, ArrowRight, ArrowLeft, BookOpen, CheckCircle, AlertCircle, Lightbulb, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Hero banner image for article detail (like About page style)
const BLOG_HERO_IMAGE = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const blogIdFromUrl = searchParams.get("id") || searchParams.get("slug");

  // Pagination & Data states
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [headerData, setHeaderData] = useState({
    title: BLOG_PAGE.title,
    subtitle: BLOG_PAGE.subtitle,
    tag: BLOG_PAGE.tag || "Regulations & Updates",
    bgImage: BLOG_HERO_IMAGE
  });

  // Fetch blogs & header on mount & page change & url change
  useEffect(() => {
    const fetchBlogsAndHeader = async () => {
      setIsLoading(true);
      try {
        if (blogIdFromUrl) {
          try {
            const detailRes = await api.get(`/blogs/${blogIdFromUrl}`);
            if (detailRes.data && detailRes.data.success) {
              setSelectedPost(detailRes.data.data);
            }
          } catch (err) {
            console.error("Failed to fetch blog detail:", err);
          }
        } else {
          setSelectedPost(null);
        }

        const [blogsRes, headerRes] = await Promise.all([
          api.get(`/blogs?page=${page}&limit=6`),
          api.get("/blogs/header").catch(err => {
            console.error("Failed to fetch blog header:", err);
            return null;
          })
        ]);

        if (blogsRes.data.success) {
          setPosts(blogsRes.data.data);
          setPagination(blogsRes.data.pagination);
        }

        if (headerRes && headerRes.data && headerRes.data.success) {
          setHeaderData(headerRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogsAndHeader();
  }, [page, blogIdFromUrl]);

  // When opening/closing a post, scroll to top & update URL
  const openPost = async (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const identifier = post.blogId || post.id || post._id || post.slug;
    navigate(`/blog-details.php?id=${identifier}`);

    // Hit the backend by serial blogId/slug/id to increment the view count
    try {
      const res = await api.get(`/blogs/${identifier}`);
      if (res.data && res.data.success) {
        const updatedPost = res.data.data;
        // Update the detail view with fresh data (including new views)
        setSelectedPost(updatedPost);
        // Update the post in the main list so the count updates there too
        setPosts(prevPosts => prevPosts.map(p => p._id === updatedPost._id ? updatedPost : p));
      }
    } catch (err) {
      console.error("Failed to increment blog views:", err);
    }
  };

  const closePost = () => {
    setSelectedPost(null);
    navigate("/blog.htm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        /* ── Shimmer Loading Screen ── */
        <motion.div
          key="blog-shimmer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white font-sans pb-16"
        >
          {/* Hero shimmer */}
          <div className="h-[250px] md:h-[320px] bg-slate-100 relative overflow-hidden flex items-end pb-8 md:pb-12">
            <div className="shimmer-bg absolute inset-0" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-3">
              <div className="shimmer-bg h-9 w-64 rounded-md" />
              <div className="shimmer-bg h-4 w-32 rounded-md" />
            </div>
          </div>
          {/* Cards shimmer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-slate-100">
                  <div className="shimmer-bg h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <div className="shimmer-bg h-3 w-28 rounded-full" />
                    <div className="shimmer-bg h-5 w-full rounded-md" />
                    <div className="shimmer-bg h-5 w-4/5 rounded-md" />
                    <div className="shimmer-bg h-3 w-full rounded-md" />
                    <div className="shimmer-bg h-3 w-3/4 rounded-md" />
                    <div className="shimmer-bg h-3 w-1/2 rounded-md" />
                    <div className="shimmer-bg h-4 w-28 rounded-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="blog-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="bg-white font-sans"
        >
          <AnimatePresence mode="wait">
            {selectedPost ? (
              /* ══════════════════════════════════════════
                 ARTICLE DETAIL VIEW
              ══════════════════════════════════════════ */
              <motion.div
                key={`post-${selectedPost.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Hero Banner (About-page style) ── */}
                <div
                  id="blog-detail-hero"
                  className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
                >
                  <motion.div
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1.0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${BLOG_HERO_IMAGE}')` }}
                  />
                  {/* Gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h1 className="text-2xl md:text-4xl font-black tracking-tight font-display uppercase text-white drop-shadow-xs leading-tight max-w-3xl">
                        {selectedPost.title}
                      </h1>
                      <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                        <button onClick={closePost} className="hover:text-primary transition-colors text-white/90 cursor-pointer">
                          Blog
                        </button>
                        <span className="text-white/40">»</span>
                        <span className="text-[#03ADA4] font-bold">Article</span>
                      </nav>
                    </motion.div>
                  </div>
                </div>

                {/* ── Article Body ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                  {/* Back Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    id="back-to-blogs-btn"
                    onClick={closePost}
                    className="inline-flex items-center gap-2 text-[#0052CC] hover:text-[#03ADA4] font-bold text-xs mb-8 uppercase tracking-wider font-sans border border-[#0052CC]/20 rounded-xl py-2.5 px-5 hover:bg-[#0052CC]/5 transition-all cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Back to All Articles
                  </motion.button>

                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT: Main Article Content */}
                    <div className="lg:col-span-8">

                      {/* Meta Row */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-semibold mb-6 pb-5 border-b border-slate-100 font-mono"
                      >
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <Calendar size={12} className="text-[#0052CC]" /> {selectedPost.date || new Date(selectedPost.publishedAt || selectedPost.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <Clock size={12} className="text-[#03ADA4]" /> {selectedPost.readTime}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          <User size={12} className="text-slate-500" /> {selectedPost.author}
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#0052CC]/8 border border-[#0052CC]/15 rounded-lg px-3 py-1.5 text-[#0052CC]">
                          <Tag size={12} /> Medical Logistics
                        </span>
                      </motion.div>

                      {/* Full Content Body (Main Article Text) */}
                      {selectedPost.content && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="prose prose-slate max-w-none text-sm md:text-base font-medium text-slate-650 leading-relaxed mb-8"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.content) }}
                        />
                      )}



                      {/* Next / Previous Article Navigation */}
                      <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100 gap-4">
                        {posts.findIndex(p => p._id === selectedPost._id) > 0 ? (
                          <motion.button
                            onClick={() => openPost(posts[posts.findIndex(p => p._id === selectedPost._id) - 1])}
                            whileHover={{ scale: 1.02, x: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex flex-col items-start p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group text-left cursor-pointer"
                          >
                            <span className="text-[10px] uppercase font-black tracking-widest text-[#0052CC] mb-1 flex items-center gap-1.5"><ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> Previous Article</span>
                            <span className="text-sm font-bold text-slate-800 line-clamp-1">{posts[posts.findIndex(p => p._id === selectedPost._id) - 1]?.title}</span>
                          </motion.button>
                        ) : <div className="flex-1"></div>}

                        {posts.findIndex(p => p._id === selectedPost._id) < posts.length - 1 ? (
                          <motion.button
                            onClick={() => openPost(posts[posts.findIndex(p => p._id === selectedPost._id) + 1])}
                            whileHover={{ scale: 1.02, x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex flex-col items-end p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group text-right cursor-pointer"
                          >
                            <span className="text-[10px] uppercase font-black tracking-widest text-[#03ADA4] mb-1 flex items-center gap-1.5">Next Article <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" /></span>
                            <span className="text-sm font-bold text-slate-800 line-clamp-1">{posts[posts.findIndex(p => p._id === selectedPost._id) + 1]?.title}</span>
                          </motion.button>
                        ) : <div className="flex-1"></div>}
                      </div>

                      {/* Bottom CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-[#0052CC] to-[#03ADA4] rounded-3xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg"
                      >
                        <div className="text-white">
                          <p className="text-xs font-black uppercase tracking-wider opacity-75 mb-1">Have Questions About This Article?</p>
                          <p className="text-base font-black leading-tight">Talk to our logistics experts right now</p>
                          <p className="text-xs opacity-75 mt-1">Available Mon–Sat</p>
                        </div>
                        <a
                          href="https://wa.me/918882691919"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 bg-white text-[#0052CC] font-black text-xs px-6 py-3 rounded-xl text-center hover:shadow-lg transition-all hover:scale-105"
                        >
                          💬 WhatsApp Now
                        </a>
                      </motion.div>
                    </div>

                    {/* RIGHT: Sticky Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                      {/* Article thumbnail */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full rounded-2xl overflow-hidden shadow-md"
                      >
                        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto block" />
                      </motion.div>

                      {/* Article Info card */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.38 }}
                        className="bg-[#0052CC]/4 border border-[#0052CC]/15 rounded-2xl p-5"
                      >
                        <p className="text-xs font-black text-[#0052CC] uppercase tracking-wider mb-4">Article Info</p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><Calendar size={12} /> Published</span>
                            <span className="font-black text-slate-700">{selectedPost.date || new Date(selectedPost.publishedAt || selectedPost.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><Clock size={12} /> Read Time</span>
                            <span className="font-black text-slate-700">{selectedPost.readTime}</span>
                          </div>
                          <div className="flex items-start justify-between text-xs gap-2">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5 flex-shrink-0"><User size={12} /> Author</span>
                            <span className="font-black text-slate-700 text-right">{selectedPost.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-semibold flex items-center gap-1.5"><BookOpen size={12} /> Sections</span>
                            <span className="font-black text-slate-700">{(selectedPost.sections || []).length}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* More Articles */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="bg-white border border-slate-100 rounded-2xl p-5"
                      >
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                          <BookOpen size={13} /> More Articles
                        </p>
                        <div className="space-y-4">
                          {posts
                            .filter(p => p._id !== selectedPost._id)
                            .slice(0, 4)
                            .map((p) => (
                              <motion.button
                                key={p._id}
                                onClick={() => openPost(p)}
                                whileHover={{ x: 4, transition: { type: "spring", stiffness: 250, damping: 18 } }}
                                className="w-full text-left flex gap-3 group cursor-pointer"
                              >
                                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] text-slate-400 font-semibold font-mono mb-0.5 flex items-center gap-1">
                                    <Clock size={9} /> {p.readTime}
                                  </p>
                                  <p className="text-xs font-black text-slate-700 leading-snug group-hover:text-[#0052CC] transition-colors" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</p>
                                </div>
                              </motion.button>
                            ))}
                        </div>
                      </motion.div>

                      {/* Sidebar WhatsApp CTA */}
                      <motion.a
                        href="https://wa.me/918882691919"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.52 }}
                        whileHover={{ scale: 1.03 }}
                        className="block bg-gradient-to-br from-[#0052CC] to-[#03ADA4] rounded-2xl p-5 text-white text-center shadow-md cursor-pointer"
                      >
                        <p className="text-2xl mb-1">💬</p>
                        <p className="font-black text-sm mb-1">Need Help Shipping?</p>
                        <p className="text-xs opacity-80 mb-3">Our experts Mon–Sat</p>
                        <span className="bg-white text-[#0052CC] font-black text-xs px-5 py-2 rounded-xl inline-block">
                          WhatsApp Now
                        </span>
                      </motion.a>

                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* ══════════════════════════════════════════
                 BLOG LISTING VIEW
              ══════════════════════════════════════════ */
              <motion.div
                key="blog-listing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Hero Banner ── */}
                <div
                  id="blog-listing-hero"
                  className="relative h-[250px] md:h-[320px] overflow-hidden flex items-end pb-8 md:pb-12 bg-slate-950"
                >
                  <motion.div
                    initial={{ scale: 1.12, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1.0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${headerData.bgImage || BLOG_HERO_IMAGE}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display uppercase text-white drop-shadow-xs">
                        {headerData.title || "Our Blog"}
                      </h1>
                      <nav className="text-xs md:text-sm font-semibold tracking-wide font-sans flex items-center gap-2 text-white/80">
                        <Link to="/" className="hover:text-primary transition-colors text-white/90">Home</Link>
                        <span className="text-white/40">»</span>
                        <span className="text-[#03ADA4] font-bold">Blog</span>
                      </nav>
                    </motion.div>
                  </div>
                </div>

                {/* ── Blog Grid ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

                  {/* Section header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                  >
                    <span className="text-xs font-black uppercase tracking-widest text-[#03ADA4] bg-[#03ADA4]/10 px-3 py-1 rounded-full inline-block mb-3">
                      {headerData.tag || "Regulations & Updates"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
                      {headerData.title || "Our Blog"}
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-slate-500 leading-relaxed font-medium">
                      {headerData.subtitle || "Regulations & Updates, shipping schedules, and critical logistics advisories..."}
                    </p>
                  </motion.div>

                  {/* Cards Grid */}
                  <div id="blogs-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {posts.map((post, idx) => (
                      <motion.div
                        id={`blog-box-${post._id}`}
                        key={post._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ delay: (idx % 3) * 0.1, duration: 0.55, ease: "easeOut" }}
                        whileHover={{ y: -7, transition: { type: "spring", stiffness: 200, damping: 18 } }}
                        className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0052CC]/20 transition-shadow duration-300 flex flex-col cursor-pointer group"
                        onClick={() => openPost(post)}
                      >
                        {/* Image */}
                        <div className="relative w-full overflow-hidden flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-auto block group-hover:scale-102 transition-transform duration-600"
                          />
                          {/* Subtle gradient on image bottom */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                          {/* Read time badge */}
                          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0052CC] text-[10px] font-black rounded-full px-2.5 py-1 shadow-sm">
                            {post.readTime}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-1">
                          {/* Date & author */}
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mb-3 font-mono">
                            <Calendar size={11} className="text-[#03ADA4]" />
                            <span>{post.date || new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span className="text-slate-200">•</span>
                            <User size={11} className="text-slate-400" />
                            <span className="truncate">{post.author}</span>
                          </div>

                          {/* Heading */}
                          <h3 className="text-sm md:text-base font-black text-slate-800 tracking-tight leading-snug mb-3 group-hover:text-[#0052CC] transition-colors duration-200">
                            {post.title}
                          </h3>

                          {/* Excerpt - 3 lines max */}
                          <p
                            className="text-xs text-slate-500 leading-relaxed font-medium flex-1"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[#0052CC] text-xs font-black uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
                              Read Full Article <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <CheckCircle size={15} className="text-[#03ADA4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {pagination.pages > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-14 flex items-center justify-center gap-4"
                    >
                      <motion.button
                        whileHover={page > 1 ? { scale: 1.05 } : {}}
                        whileTap={page > 1 ? { scale: 0.95 } : {}}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                          page === 1 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-[#0052CC] hover:text-[#0052CC] shadow-sm hover:shadow'
                        }`}
                      >
                        <ArrowLeft size={16} /> Previous
                      </motion.button>
                      
                      <div className="flex items-center gap-2 text-sm font-black text-slate-500">
                        Page <span className="w-8 h-8 flex items-center justify-center bg-[#0052CC] text-white rounded-full mx-1">{page}</span> of {pagination.pages}
                      </div>

                      <motion.button
                        whileHover={page < pagination.pages ? { scale: 1.05 } : {}}
                        whileTap={page < pagination.pages ? { scale: 0.95 } : {}}
                        onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                        disabled={page === pagination.pages}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                          page === pagination.pages 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-[#03ADA4] text-white hover:bg-[#028b84] shadow hover:shadow-md'
                        }`}
                      >
                        Next <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
