"use client";

import { useState } from "react";
import {
  CreditCard,
  Calendar,
  Zap,
  CheckCircle2,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Lock,
  Sparkles,
  Building2,
  Check,
  X,
  ArrowDownRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  pdfUrl: string;
}

interface PlanTier {
  id: "free" | "pro" | "enterprise";
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  icon: React.ElementType;
  popular?: boolean;
  features: string[];
}

const PLAN_TIERS: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Ideal for light usage and exploring standard models.",
    icon: Zap,
    features: [
      "100 generations / month",
      "Standard model access",
      "Standard queue priority",
      "1 Workspace seat",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 23,
    popular: true,
    description: "For creators & power users needing flagship model access.",
    icon: Sparkles,
    features: [
      "1,000,000 tokens / month",
      "Flagship models (Claude 3.5, GPT-4o)",
      "Priority queue execution",
      "Up to 5 Workspace seats",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "Dedicated infrastructure, SLAs, and unlimited scale.",
    icon: Building2,
    features: [
      "Unlimited token allowance",
      "Custom fine-tuned models",
      "SSO & SAML Security",
      "Unlimited Workspace seats",
      "Dedicated account manager",
    ],
  },
];

const INVOICE_HISTORY: Invoice[] = [
  {
    id: "INV-2026-008",
    date: "Aug 07, 2026",
    amount: "$23.00",
    status: "Paid",
    pdfUrl: "#",
  },
  {
    id: "INV-2026-007",
    date: "Jul 07, 2026",
    amount: "$23.00",
    status: "Paid",
    pdfUrl: "#",
  },
  {
    id: "INV-2026-006",
    date: "Jun 07, 2026",
    amount: "$23.00",
    status: "Paid",
    pdfUrl: "#",
  },
];

export default function BillingSettingsPage() {
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [isAnnualInModal, setIsAnnualInModal] = useState<boolean>(true);

  // Active plan state (defaults to Pro)
  const [currentPlanId] = useState<"free" | "pro" | "enterprise">("pro");

  // Mock Plan usage limits
  const tokensUsed = 842500;
  const tokensMax = 1000000;
  const usagePercentage = Math.round((tokensUsed / tokensMax) * 100);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] p-4 sm:p-6 lg:p-10 space-y-8 max-w-[1200px] mx-auto">
      
      {/* Header */}
      <div className="border-b border-zinc-800/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 mb-1">
          <span>Settings</span>
          <ChevronRight className="h-3 w-3 text-zinc-600" />
          <span className="text-zinc-300">Billing & Subscriptions</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Billing & Subscription
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your plan subscription, payment details, and view past invoices.
        </p>
      </div>

      {/* Current Plan Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-[#0d0d12] p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Pro Plan</h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">Billed annually ($276.00/yr)</p>
                </div>
              </div>

              {/* Action Buttons: Downgrade & Upgrade */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlanModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  <ArrowDownRight className="h-3.5 w-3.5 text-zinc-400" />
                  Downgrade Plan
                </button>

                <button
                  onClick={() => setIsPlanModalOpen(true)}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Token Usage Bar */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">Monthly Token Quota</span>
                <span className="font-mono text-zinc-400">
                  <strong className="text-white font-semibold">{(tokensUsed / 1000).toFixed(1)}k</strong> / {(tokensMax / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Resets in 12 days</span>
                <span>{usagePercentage}% used</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 pt-4 border-t border-zinc-800/80 gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              Includes priority support & flagship model access
            </span>
            <button
              onClick={() => setIsPlanModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
            >
              Compare all plans <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Next Billing Date Card */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Next Billing Date</h3>
                <p className="text-xs text-zinc-400">Upcoming cycle charge</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
              <div className="text-2xl font-extrabold text-white font-mono">
                Sept 07, 2026
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Amount due:</span>
                <span className="font-mono font-semibold text-white">$23.00 / mo</span>
              </div>
            </div>

            {/* Auto-renew Switch */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-zinc-300 font-medium">Auto-renew subscription</span>
              <button
                type="button"
                role="switch"
                aria-checked={autoRenew}
                onClick={() => setAutoRenew(!autoRenew)}
                className={`relative w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                  autoRenew ? "bg-indigo-600" : "bg-zinc-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                    autoRenew ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-800/80 pt-3">
            Your card ending in <strong className="text-zinc-400">4242</strong> will be automatically charged on Sept 07, 2026.
          </p>
        </div>
      </div>

      {/* Payment Method On File Section */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-indigo-400" />
              Payment Methods
            </h2>
            <p className="text-xs text-zinc-400">Primary payment method for recurring invoices</p>
          </div>

          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5 text-indigo-400" />
            Add New Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 to-zinc-900/80 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-14 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white font-mono shrink-0">
                VISA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-white font-mono">•••• •••• •••• 4242</p>
                  <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">Expires 12 / 2028</p>
              </div>
            </div>

            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-5 sm:p-6 shadow-xl space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Invoice History</h2>
          <p className="text-xs text-zinc-400">Download past billing statements and receipts</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 font-semibold">
                <th className="p-3.5">Invoice ID</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {INVOICE_HISTORY.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-zinc-900/40 transition">
                  <td className="p-3.5 font-mono font-medium text-white">{invoice.id}</td>
                  <td className="p-3.5 text-zinc-400">{invoice.date}</td>
                  <td className="p-3.5 font-mono">{invoice.amount}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" /> {invoice.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <a
                      href={invoice.pdfUrl}
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                      <Download className="h-3.5 w-3.5" /> PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PLAN COMPARISON MODAL */}
      <AnimatePresence>
        {isPlanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl rounded-2xl border border-zinc-800 bg-[#0e0e13] p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                    Compare Subscription Plans
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Upgrade or downgrade your account tier at any time.
                  </p>
                </div>
                <button
                  onClick={() => setIsPlanModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Billing Switcher */}
              <div className="flex items-center justify-center gap-3 py-2">
                <span className={`text-xs font-semibold ${!isAnnualInModal ? "text-white" : "text-zinc-400"}`}>
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() => setIsAnnualInModal(!isAnnualInModal)}
                  className="relative w-11 h-6 rounded-full bg-zinc-800 p-1 border border-zinc-700 transition-colors"
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-indigo-500 shadow-md"
                    animate={{ x: isAnnualInModal ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold ${isAnnualInModal ? "text-white" : "text-zinc-400"}`}>
                    Annual
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    20% OFF
                  </span>
                </div>
              </div>

              {/* 3 Tier Grid inside Modal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                {PLAN_TIERS.map((tier) => {
                  const Icon = tier.icon;
                  const price = isAnnualInModal ? tier.yearlyPrice : tier.monthlyPrice;
                  const isCurrent = currentPlanId === tier.id;

                  return (
                    <div
                      key={tier.id}
                      className={`relative rounded-xl p-5 bg-zinc-900/60 border flex flex-col justify-between space-y-5 transition ${
                        tier.popular
                          ? "border-indigo-500/80 ring-1 ring-indigo-500/40 bg-indigo-950/10"
                          : "border-zinc-800"
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-indigo-400/40">
                          Popular
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-lg bg-zinc-800 text-indigo-400">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-bold text-white">{tier.name}</h3>
                        </div>

                        <p className="text-xs text-zinc-400 min-h-[32px]">{tier.description}</p>

                        <div className="pt-2 border-t border-zinc-800">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                              ${price}
                            </span>
                            <span className="text-xs text-zinc-400">/ mo</span>
                          </div>
                        </div>

                        <ul className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
                          {tier.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Dynamic CTA buttons */}
                      <div className="pt-4 border-t border-zinc-800">
                        {isCurrent ? (
                          <button
                            disabled
                            className="w-full py-2 px-3 rounded-lg bg-zinc-800 text-zinc-500 text-xs font-semibold cursor-not-allowed border border-zinc-700/50"
                          >
                            Current Plan
                          </button>
                        ) : tier.id === "free" ? (
                          <button
                            onClick={() => setIsPlanModalOpen(false)}
                            className="w-full py-2 px-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
                          >
                            Downgrade
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsPlanModalOpen(false)}
                            className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                          >
                            Upgrade
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setIsPlanModalOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                >
                  Close preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Payment Method Modal */}
      <AnimatePresence>
        {isUpdateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111116] p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-400" />
                  Update Payment Method
                </h3>
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setIsUpdateModalOpen(false); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">Cardholder Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">Card Number</label>
                  <input
                    type="text"
                    placeholder="•••• •••• •••• 4242"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-medium">CVC / CVC2</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-600/20"
                  >
                    Save Card
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