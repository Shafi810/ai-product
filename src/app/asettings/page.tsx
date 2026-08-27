"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Loader2,
  Sparkles,
  ExternalLink,
  Lock,
  Save,
  Upload,
  X,
  RotateCcw,
  Smartphone,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Zap,
  BarChart3,
  Key,
  Copy,
  Plus,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


// --- Tab Types & Definition ---
type TabType = "profile" | "account" | "billing" | "notifications";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account & Security", icon: Shield },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTabMeta = TABS.find((tab) => tab.id === activeTab) || TABS[0];
  const ActiveIcon = activeTabMeta.icon;

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="border-b border-zinc-800/80 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your account settings, preferences, billing, and API access configurations.
        </p>
      </div>

      {/* Responsive Navigation Tabs */}
      <div className="relative">
        {/* Mobile Dropdown Selector */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-800 bg-[#0d0d12] text-xs font-semibold text-white shadow-lg"
          >
            <div className="flex items-center gap-2.5">
              <ActiveIcon className="h-4 w-4 text-indigo-400" />
              <span>{activeTabMeta.label}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-zinc-400 transition-transform ${
                mobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-zinc-800 bg-[#0d0d12] shadow-2xl p-1.5 space-y-1"
              >
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as TabType);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                        isActive
                          ? "bg-indigo-600/15 text-indigo-400 font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop / Tablet Horizontal Bar */}
        <div className="hidden sm:flex border-b border-zinc-800 overflow-x-auto space-x-1 scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium transition border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                    : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab View */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "account" && <AccountTab />}
            {activeTab === "billing" && <BillingTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==========================================
// 1. PROFILE TAB
// ==========================================
interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

const INITIAL_PROFILE: ProfileData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Software engineer and AI builder based in San Francisco.",
  avatarUrl: null,
};

function ProfileTab() {
  const [initialData, setInitialData] = useState<ProfileData>(INITIAL_PROFILE);
  const [formData, setFormData] = useState<ProfileData>(INITIAL_PROFILE);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials =
    formData.name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: imageUrl }));
    }
  };

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setFormData(initialData);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setInitialData(formData);
      setSaving(false);
    }, 800);
  };

  const isDirty =
    formData.name !== initialData.name ||
    formData.email !== initialData.email ||
    formData.bio !== initialData.bio ||
    formData.avatarUrl !== initialData.avatarUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-6">
        <div>
          <h2 className="text-base font-bold text-white">Public Profile</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Update your profile details and personal information.
          </p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-zinc-800/60 pt-5">
          <div className="relative h-20 w-20 rounded-full border border-zinc-700/60 bg-zinc-900 overflow-hidden flex items-center justify-center shrink-0">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-indigo-400 font-bold text-xl tracking-wider">
                {initials}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition flex items-center gap-1.5"
              >
                <Upload className="h-3.5 w-3.5 text-zinc-400" />
                Upload Photo
              </button>
              {formData.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-3 py-1.5 rounded-lg border border-red-950/60 bg-red-950/20 hover:bg-red-950/40 text-xs font-medium text-red-400 transition flex items-center gap-1.5"
                >
                  <X className="h-3.5 w-3.5" />
                  Remove
                </button>
              )}
            </div>
            <p className="text-[11px] text-zinc-500">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 border-t border-zinc-800/60 pt-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Your full name"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Write a short description about yourself..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || !isDirty}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white text-xs font-semibold transition flex items-center gap-2 shadow-md shadow-indigo-600/10"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={saving || !isDirty}
          className="px-4 py-2 rounded-lg border border-zinc-700/80 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-xs font-medium text-zinc-300 transition flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
          Cancel
        </button>
      </div>
    </form>
  );
}

// ==========================================
// 2. ACCOUNT & SECURITY TAB
// ==========================================
interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  created: string;
}

function AccountTab() {
  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [toggling2FA, setToggling2FA] = useState(false);

  // API Key State
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: "1",
      name: "Production App",
      key: "sk_live_99481920194810293129",
      created: "Aug 12, 2026",
    },
    {
      id: "2",
      name: "Staging Server",
      key: "sk_test_48201948201948102938",
      created: "Aug 20, 2026",
    },
  ]);
  const [keyLabelInput, setKeyLabelInput] = useState("");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Delete Account State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setUpdatingPassword(true);

    setTimeout(() => {
      setUpdatingPassword(false);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 800);
  };

  const handleToggle2FA = () => {
    setToggling2FA(true);
    setTimeout(() => {
      setTwoFactorEnabled((prev) => !prev);
      setToggling2FA(false);
    }, 500);
  };

  const handleGenerateApiKey = (e: FormEvent) => {
    e.preventDefault();
    if (!keyLabelInput.trim()) return;

    setGeneratingKey(true);
    setTimeout(() => {
      const newKey: ApiKeyItem = {
        id: Date.now().toString(),
        name: keyLabelInput.trim(),
        key: `sk_live_${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 8)}`,
        created: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      setApiKeys((prev) => [newKey, ...prev]);
      setKeyLabelInput("");
      setGeneratingKey(false);
    }, 600);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const handleCopyKey = (id: string, keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleDeleteAccount = (e: FormEvent) => {
    e.preventDefault();
    if (deleteConfirmationInput !== "DELETE") return;

    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setIsDeleteModalOpen(false);
      alert("Account successfully deleted.");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Change Password Card */}
      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-5"
      >
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-indigo-400" />
            Change Password
          </h2>
          <p className="text-xs text-zinc-400">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        {passwordError && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Password updated successfully!</span>
          </div>
        )}

        <div className="space-y-3.5 border-t border-zinc-800/60 pt-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={updatingPassword}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-2"
        >
          {updatingPassword && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Update Password
        </button>
      </form>

      {/* Two-Factor Authentication Card */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-indigo-400" />
                Two-Factor Authentication (2FA)
              </h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  twoFactorEnabled
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Add an extra layer of security to your account using an authenticator app.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggle2FA}
            disabled={toggling2FA}
            className={`relative w-12 h-6 rounded-full p-1 transition-colors focus:outline-none shrink-0 ${
              twoFactorEnabled ? "bg-indigo-600" : "bg-zinc-800"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform flex items-center justify-center ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {toggling2FA && (
                <Loader2 className="h-2.5 w-2.5 animate-spin text-zinc-800" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* API Key Management Section */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-5">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-400" />
            API Key Management
          </h2>
          <p className="text-xs text-zinc-400">
            Generate and manage secret API keys to authenticate programmatic requests.
          </p>
        </div>

        {/* Generate Key Input */}
        <form
          onSubmit={handleGenerateApiKey}
          className="flex flex-col sm:flex-row gap-2.5 border-t border-zinc-800/60 pt-4"
        >
          <input
            type="text"
            required
            value={keyLabelInput}
            onChange={(e) => setKeyLabelInput(e.target.value)}
            placeholder="Key Label (e.g., Mobile App Backend)"
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={generatingKey || !keyLabelInput.trim()}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shrink-0"
          >
            {generatingKey ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            Generate Key
          </button>
        </form>

        {/* Key List */}
        <div className="space-y-3 pt-2">
          {apiKeys.length === 0 ? (
            <p className="text-xs text-zinc-500 italic py-2 text-center">
              No active API keys found.
            </p>
          ) : (
            apiKeys.map((item) => {
              const isVisible = visibleKeyId === item.id;
              const isCopied = copiedKeyId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-3 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        ({item.created})
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 truncate">
                      {isVisible
                        ? item.key
                        : `${item.key.slice(0, 8)}••••••••••••••••`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleKeyId((prev) => (prev === item.id ? null : item.id))
                      }
                      className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                      title={isVisible ? "Hide Key" : "View Key"}
                    >
                      {isVisible ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyKey(item.id, item.key)}
                      className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                      title="Copy Key"
                    >
                      {isCopied ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRevokeKey(item.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-red-950/60 bg-red-950/20 hover:bg-red-950/40 text-[11px] font-medium text-red-400 transition"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="rounded-2xl border border-red-900/30 bg-[#120a0d] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-red-400 flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-red-400" />
            Delete Account
          </h2>
          <p className="text-xs text-zinc-400">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-xs font-semibold transition"
          >
            Delete Account...
          </button>
        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0e0e13] p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Are you absolutely sure?
                  </h3>
                  <p className="text-xs text-zinc-400">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                This will permanently delete your profile, workspaces, connected accounts, and remove all access to your projects.
              </p>

              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">
                    Type <span className="font-mono text-white font-bold">DELETE</span> to confirm:
                  </label>
                  <input
                    type="text"
                    required
                    value={deleteConfirmationInput}
                    onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                    placeholder="DELETE"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteConfirmationInput("");
                    }}
                    className="px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-300 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={deleting || deleteConfirmationInput !== "DELETE"}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white text-xs font-semibold transition flex items-center gap-2"
                  >
                    {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Confirm Deletion
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 3. BILLING TAB
// ==========================================
function BillingTab() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePortal = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "portal" }),
      });
      const data = await res.json();
      if (data.url) window.location.assign(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Pro Plan</h3>
              <p className="text-xs text-zinc-400">$29.00 / month</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        </div>

        <button
          onClick={handlePortal}
          disabled={loading === "portal"}
          className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition flex items-center gap-2"
        >
          {loading === "portal" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
          )}
          Manage Subscription & Invoices
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. NOTIFICATIONS TAB
// ==========================================
interface NotificationState {
  emailDigest: boolean;
  digestFrequency: "daily" | "weekly";
  productUpdates: boolean;
  betaAccess: boolean;
  usageAlerts: boolean;
  storageThreshold: boolean;
  securityAlerts: boolean;
  billingAlerts: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationState = {
  emailDigest: true,
  digestFrequency: "weekly",
  productUpdates: true,
  betaAccess: false,
  usageAlerts: true,
  storageThreshold: true,
  securityAlerts: true,
  billingAlerts: true,
};

function NotificationsTab() {
  const [prefs, setPrefs] = useState<NotificationState>(INITIAL_NOTIFICATIONS);
  const [savedPrefs, setSavedPrefs] = useState<NotificationState>(INITIAL_NOTIFICATIONS);
  const [saving, setSaving] = useState(false);

  const toggle = (key: keyof NotificationState) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSavedPrefs(prefs);
      setSaving(false);
    }, 600);
  };

  const handleReset = () => {
    setPrefs(savedPrefs);
  };

  const isDirty = JSON.stringify(prefs) !== JSON.stringify(savedPrefs);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Email Digests Section */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/60">
          <Mail className="h-4 w-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Email Digest</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Receive Activity Digest</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Summary of workspace activity, key metrics, and team performance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("emailDigest")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.emailDigest ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.emailDigest ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {prefs.emailDigest && (
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-zinc-400 font-medium">Frequency:</span>
              <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-950 p-1">
                {(["daily", "weekly"] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setPrefs((prev) => ({ ...prev, digestFrequency: freq }))}
                    className={`px-3 py-1 text-[11px] font-medium rounded-md capitalize transition ${
                      prefs.digestFrequency === freq
                        ? "bg-indigo-600 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Updates & Announcements */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/60">
          <Zap className="h-4 w-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Product Updates</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Feature Releases & Changelogs</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Stay updated with major feature announcements and improvement logs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("productUpdates")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.productUpdates ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.productUpdates ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Early Access & Beta Programs</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Get invited to try new experimental features before general availability.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("betaAccess")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.betaAccess ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.betaAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Usage & System Alerts */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/60">
          <BarChart3 className="h-4 w-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Usage & System Alerts</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">API & Quota Usage Alerts</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Get notified when API requests or compute usage approach 80% capacity limit.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("usageAlerts")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.usageAlerts ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.usageAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Storage Threshold Warnings</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Alerts when workspace file storage reaches allocation limits.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("storageThreshold")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.storageThreshold ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.storageThreshold ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Critical System Alerts */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/60">
          <Shield className="h-4 w-4 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Security & Billing</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Security Notifications</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Instant alerts for unrecognised logins, password changes, and 2FA updates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("securityAlerts")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.securityAlerts ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.securityAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-white">Billing & Receipts</p>
              <p className="text-zinc-400 text-[11px] mt-0.5">
                Invoices, successful subscription renewals, and failed payment alerts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle("billingAlerts")}
              className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
                prefs.billingAlerts ? "bg-indigo-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                  prefs.billingAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white text-xs font-semibold transition flex items-center gap-2 shadow-md shadow-indigo-600/10"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save Preferences
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={saving || !isDirty}
          className="px-4 py-2 rounded-lg border border-zinc-700/80 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-xs font-medium text-zinc-300 transition flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5 text-zinc-400" />
          Cancel
        </button>
      </div>
    </div>
  );
}