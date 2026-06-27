import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import api from "../../utils/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If token exists, direct immediately to dashboard
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data && res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(res.data.message || "Failed to log in.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      const msg = err.response?.data?.message || "Invalid credentials or network issue.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="admin-login-page" className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12 relative overflow-hidden font-sans">
      
      {/* Decorative gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-slate-950/40 border border-slate-800/80 p-8 md:p-10 rounded-3xl backdrop-blur-xl relative z-10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2 shadow-inner">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">CM Administrator</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Sign in to manage your courier services</p>
        </div>

        {/* Error Notification banner */}
        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-semibold animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input block */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-850 hover:border-slate-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-xl pl-11 pr-4 py-3.5 text-xs text-slate-200 font-semibold transition-all"
                placeholder="admin@couriermedicines.com"
              />
            </div>
          </div>

          {/* Password input block */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-850 hover:border-slate-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-xl pl-11 pr-4 py-3.5 text-xs text-slate-200 font-semibold transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Action button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none tracking-wide"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Authenticating...
              </>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
