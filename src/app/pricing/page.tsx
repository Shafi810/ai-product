"use client";

import { useState } from "react";
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  ArrowRight,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  ctaText: string;
  ctaVariant: "outline" | "primary" | "secondary";
  icon: React.ElementType;
  features: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for testing prompts and exploring core features.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaText: "Get Started Free",
    ctaVariant: "outline",
    icon: Zap,
    features: [
      "100 generations per month",
      "Access to standard models (GPT-3.5, Llama 3)",
      "Standard response latency",
      "Community support",
      "Single workspace member",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Designed for power users, developers, and creators requiring high volume.",
    monthlyPrice: 29,
    yearlyPrice: 23, // ~20% discount
    popular: true,
    ctaText: "Upgrade to Pro",
    ctaVariant: "primary",
    icon: Sparkles,
    features: [
      "1,000,000 tokens per month",
      "Access to all flagship models (Claude 3.5, GPT-4o)",
      "Priority queue & low latency",
      "Custom system prompt presets",
      "Up to 5 team workspace seats",
      "Priority email & chat support",
      "Export historical analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom compute infrastructure and advanced security for organizations.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    ctaText: "Contact Enterprise Sales",
    ctaVariant: "secondary",
    icon: Building2,
    features: [
      "Unlimited token allowance",
      "Dedicated LLM throughput & SLAs",
      "Custom fine-tuned model hosting",
      "SSO & SAML authentication",
      "Unlimited team members",
      "Dedicated account manager",
      "SOC-2 Type II & HIPAA compliance",
    ],
  },
];

const FAQS: FAQItem[] = [
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your billing settings. Upgrades take effect immediately with pro-rated charges.",
  },
  {
    question: "How are tokens calculated across different LLM providers?",
    answer: "Tokens are calculated using standard tokenizer specs for each model provider. Your monthly plan allowance applies seamlessly across Claude, GPT-4o, Llama, and Gemini.",
  },
  {
    question: "What happens if I exceed my monthly token limit?",
    answer: "If you hit 100% of your quota on the Pro plan, you can purchase add-on token packs or automatically enable usage-based pay-as-you-go overage.",
  },
  {
    question: "Do you offer discounts for educational or open-source projects?",
    answer: "Yes! We offer a 50% discount for qualified students, educators, and non-profit open-source developers. Reach out to support to apply.",
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div id="PricingSection"  className="min-h-screen bg-[#08080a] text-[#f4f4f6] p-4 sm:p-6 lg:p-12 space-y-12 max-w-[1400px] mx-auto">
      
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Flexible Usage Plans</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Predictable pricing for <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
            every stage of growth
          </span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Choose the right plan to power your prompt engineering and model generation workflows.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${!isYearly ? "text-white" : "text-zinc-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-12 h-6 rounded-full bg-zinc-800 p-1 border border-zinc-700 transition-colors focus:outline-none"
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-indigo-500 shadow-md"
              animate={{ x: isYearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${isYearly ? "text-white" : "text-zinc-400"}`}>
              Yearly Billing
            </span>
            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
        {PRICING_TIERS.map((tier) => {
          const Icon = tier.icon;
          const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-[#0d0d12] border ${
                tier.popular 
                  ? "border-indigo-500/80 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/50" 
                  : "border-zinc-800/90 shadow-xl"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-lg border border-indigo-400/40">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                </div>

                <p className="text-xs text-zinc-400 min-h-[36px]">{tier.description}</p>

                {/* Price Display */}
                <div className="pt-2 border-t border-zinc-800/80">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      / month {isYearly && tier.monthlyPrice > 0 && "(billed annually)"}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                  <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Included Features</p>
                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                {tier.ctaVariant === "primary" && (
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/20">
                    {tier.ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                {tier.ctaVariant === "outline" && (
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs transition">
                    {tier.ctaText}
                  </button>
                )}
                {tier.ctaVariant === "secondary" && (
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-200 font-semibold text-xs transition">
                    {tier.ctaText}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Comparison Section */}
      <div className="pt-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Compare Plan Features</h2>
          <p className="text-xs text-zinc-400">Detailed breakdown of limits and technical capabilities</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#0d0d12]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-semibold">
                <th className="p-4">Feature</th>
                <th className="p-4">Free</th>
                <th className="p-4 text-indigo-400">Pro</th>
                <th className="p-4">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="p-4 font-medium text-white">Monthly Tokens</td>
                <td className="p-4 text-zinc-400">10,000</td>
                <td className="p-4 font-mono font-semibold text-indigo-300">1,000,000</td>
                <td className="p-4 text-emerald-400 font-semibold">Custom / Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Flagship Models (Claude 3.5, GPT-4o)</td>
                <td className="p-4 text-zinc-400">—</td>
                <td className="p-4 text-emerald-400"><Check className="h-4 w-4" /></td>
                <td className="p-4 text-emerald-400"><Check className="h-4 w-4" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">API Key Management</td>
                <td className="p-4 text-zinc-400">1 Key</td>
                <td className="p-4 text-zinc-200">10 Keys</td>
                <td className="p-4 text-emerald-400">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Team Workspace Seats</td>
                <td className="p-4 text-zinc-400">1 Seat</td>
                <td className="p-4 text-zinc-200">5 Seats</td>
                <td className="p-4 text-emerald-400 font-semibold">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-white">Support SLA</td>
                <td className="p-4 text-zinc-400">Community</td>
                <td className="p-4 text-zinc-200">24-hour response</td>
                <td className="p-4 text-emerald-400 font-semibold">1-hour dedicated support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="pt-8 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-400" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400">Have questions? Weve got answers.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-zinc-800 bg-[#0d0d12] overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    openFaq === index ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}