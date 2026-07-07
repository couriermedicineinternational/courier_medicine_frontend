import { useState, useEffect } from "react";
import { 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  HelpCircle, 
  Globe, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Info,
  CheckCircle,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import api from "../../utils/api";

export default function AdminSettings() {
  const [settingsForm, setSettingsForm] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    workingHours: "",
    address: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: ""
    },
    aboutText: "",
    copyright: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/settings");
      if (res.data && res.data.success && res.data.data) {
        const d = res.data.data;
        setSettingsForm({
          phone: d.phone || "",
          whatsapp: d.whatsapp || "",
          email: d.email || "",
          workingHours: d.workingHours || "",
          address: d.address || "",
          socialLinks: {
            facebook: d.socialLinks?.facebook || "",
            instagram: d.socialLinks?.instagram || "",
            youtube: d.socialLinks?.youtube || "",
            twitter: d.socialLinks?.twitter || ""
          },
          aboutText: d.aboutText || "",
          copyright: d.copyright || ""
        });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      const res = await api.put("/settings", settingsForm);
      if (res.data && res.data.success) {
        setSaveSuccess(true);
        // Hide success banner after 4 seconds
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setSaveError(err.response?.data?.message || "Failed to save site settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "Password must be at least 6 characters long." });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await api.put("/auth/update-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });

      if (res.data && res.data.success) {
        setPasswordMessage({ type: "success", text: "Password updated successfully!" });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setPasswordMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update password."
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl py-20 flex flex-col items-center justify-center gap-3 shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <span className="text-xs font-semibold text-slate-500">Loading site config...</span>
      </div>
    );
  }

  return (
    <div id="admin-settings-page" className="max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Success banner */}
      {saveSuccess && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl text-xs font-bold animate-slideDown shadow-sm">
          <CheckCircle size={16} className="shrink-0" />
          <span>Site settings updated successfully! Changes will reflect across the site.</span>
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
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Configure General Variables</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Grid 1: Basic Contact variables */}
          <div>
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Main Contact Info</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Support Phone No.</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-9 pr-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">WhatsApp Number</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">WA</span>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-9 pr-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">General Email ID</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-9 pr-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid 2: Office & Timings */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Office Location & Hours</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Office Address</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-9 pr-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Working Hours Text</label>
                <div className="relative">
                  <Clock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={settingsForm.workingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-9 pr-3 py-2 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid 3: Social Profile Links */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Social Profiles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Facebook size={12} className="text-slate-400" />
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={settingsForm.socialLinks.facebook}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    socialLinks: { ...settingsForm.socialLinks, facebook: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                  placeholder="https://facebook.com/brand"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Instagram size={12} className="text-slate-400" />
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={settingsForm.socialLinks.instagram}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    socialLinks: { ...settingsForm.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                  placeholder="https://instagram.com/brand"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Youtube size={12} className="text-slate-400" />
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={settingsForm.socialLinks.youtube}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    socialLinks: { ...settingsForm.socialLinks, youtube: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                  placeholder="https://youtube.com/c/brand"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Twitter size={12} className="text-slate-400" />
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  value={settingsForm.socialLinks.twitter}
                  onChange={(e) => setSettingsForm({
                    ...settingsForm,
                    socialLinks: { ...settingsForm.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                  placeholder="https://twitter.com/brand"
                />
              </div>
            </div>
          </div>

          {/* Grid 4: Meta info */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Copywriter & About Footnotes</h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Copyright Footer Text</label>
                <input
                  type="text"
                  value={settingsForm.copyright}
                  onChange={(e) => setSettingsForm({ ...settingsForm, copyright: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Sidebar / Footer About Text</label>
                <textarea
                  value={settingsForm.aboutText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary focus:outline-none px-3 py-2 rounded-xl text-xs font-semibold h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-2 bg-slate-50 -mx-6 -mb-6 p-6">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-extrabold shadow flex items-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <Save size={14} />
              {isSaving ? "Saving Config..." : "Save Settings"}
            </button>
          </div>

        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden mt-6">
        <div className="h-16 border-b border-slate-100 flex items-center px-6 bg-slate-50/50">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Change Admin Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
          {passwordMessage.text && (
            <div className={`p-4 rounded-xl text-xs font-bold ${passwordMessage.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-600'}`}>
              {passwordMessage.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-3 pr-10 py-2 rounded-xl text-xs font-semibold text-slate-700 animate-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-3 pr-10 py-2 rounded-xl text-xs font-semibold text-slate-700 animate-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:outline-none pl-3 pr-10 py-2 rounded-xl text-xs font-semibold text-slate-700 animate-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold shadow hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isChangingPassword ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
