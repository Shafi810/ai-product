"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { 
  Zap, 
  Coins, 
  CreditCard, 
  CalendarDays, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  ChevronRight,
  BarChart3,
  PieChart as PieIcon,
  AlertTriangle,
  Info,
  Calendar as CalendarIcon,
  ChevronDown,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";



// Types
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  description: string;
}

interface RecentGeneration {
  id: string;
  prompt: string;
  model: string;
  tokens: number;
  dateStr: string; // YYYY-MM-DD format for date filtering
  timeAgo: string;
  status: "Completed" | "Failed";
}

interface DailyUsageData {
  date: string; // Display label (e.g., Jul 28)
  fullDate: string; // YYYY-MM-DD
  generations: number;
  tokens: number;
}

interface ModelBreakdownData {
  model: string;
  generations: number;
  tokens: number;
  color: string;
}

export type PresetRange = "7d" | "30d" | "90d" | "ytd" | "custom";

interface DateRangeState {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  preset: PresetRange;
}

// Full Daily Usage Dataset (August & July 2026)
const ALL_DAILY_USAGE_DATA: DailyUsageData[] = [
  { date: "Jul 01", fullDate: "2026-07-01", generations: 15, tokens: 11000 },
  { date: "Jul 05", fullDate: "2026-07-05", generations: 22, tokens: 16500 },
  { date: "Jul 10", fullDate: "2026-07-10", generations: 19, tokens: 14200 },
  { date: "Jul 15", fullDate: "2026-07-15", generations: 31, tokens: 24000 },
  { date: "Jul 20", fullDate: "2026-07-20", generations: 28, tokens: 21500 },
  { date: "Jul 25", fullDate: "2026-07-25", generations: 35, tokens: 28000 },
  { date: "Jul 28", fullDate: "2026-07-28", generations: 24, tokens: 18200 },
  { date: "Jul 29", fullDate: "2026-07-29", generations: 30, tokens: 22400 },
  { date: "Jul 30", fullDate: "2026-07-30", generations: 18, tokens: 14100 },
  { date: "Jul 31", fullDate: "2026-07-31", generations: 45, tokens: 34500 },
  { date: "Aug 01", fullDate: "2026-08-01", generations: 52, tokens: 41000 },
  { date: "Aug 02", fullDate: "2026-08-02", generations: 38, tokens: 29800 },
  { date: "Aug 03", fullDate: "2026-08-03", generations: 28, tokens: 21000 },
  { date: "Aug 04", fullDate: "2026-08-04", generations: 60, tokens: 48200 },
  { date: "Aug 05", fullDate: "2026-08-05", generations: 55, tokens: 43000 },
  { date: "Aug 06", fullDate: "2026-08-06", generations: 42, tokens: 31500 },
  { date: "Aug 07", fullDate: "2026-08-07", generations: 35, tokens: 27000 },
  { date: "Aug 08", fullDate: "2026-08-08", generations: 20, tokens: 15400 },
  { date: "Aug 09", fullDate: "2026-08-09", generations: 25, tokens: 19100 },
  { date: "Aug 10", fullDate: "2026-08-10", generations: 48, tokens: 36200 },
  { date: "Aug 11", fullDate: "2026-08-11", generations: 64, tokens: 52100 },
  { date: "Aug 12", fullDate: "2026-08-12", generations: 70, tokens: 58000 },
  { date: "Aug 13", fullDate: "2026-08-13", generations: 58, tokens: 46300 },
  { date: "Aug 14", fullDate: "2026-08-14", generations: 40, tokens: 31000 },
  { date: "Aug 15", fullDate: "2026-08-15", generations: 22, tokens: 16800 },
  { date: "Aug 16", fullDate: "2026-08-16", generations: 29, tokens: 21500 },
  { date: "Aug 17", fullDate: "2026-08-17", generations: 51, tokens: 39400 },
  { date: "Aug 18", fullDate: "2026-08-18", generations: 68, tokens: 54200 },
  { date: "Aug 19", fullDate: "2026-08-19", generations: 75, tokens: 61000 },
  { date: "Aug 20", fullDate: "2026-08-20", generations: 62, tokens: 49000 },
  { date: "Aug 21", fullDate: "2026-08-21", generations: 49, tokens: 38700 },
  { date: "Aug 22", fullDate: "2026-08-22", generations: 31, tokens: 24000 },
  { date: "Aug 23", fullDate: "2026-08-23", generations: 27, tokens: 20500 },
  { date: "Aug 24", fullDate: "2026-08-24", generations: 58, tokens: 44800 },
  { date: "Aug 25", fullDate: "2026-08-25", generations: 82, tokens: 67100 },
  { date: "Aug 26", fullDate: "2026-08-26", generations: 74, tokens: 59300 },
];

const MODEL_BREAKDOWN_DATA: ModelBreakdownData[] = [
  { model: "Claude 3.5 Sonnet", generations: 686, tokens: 463300, color: "#6366f1" },
  { model: "GPT-4o", generations: 374, tokens: 252700, color: "#06b6d4" },
  { model: "Gemini 1.5 Pro", generations: 125, tokens: 126300, color: "#f59e0b" },
  { model: "Llama 3.1 70B", generations: 63, tokens: 42100, color: "#10b981" },
];

const RECENT_GENERATIONS: RecentGeneration[] = [
  {
    id: "gen-1",
    prompt: "Write a high-converting landing page headline for a SaaS product...",
    model: "Claude 3.5 Sonnet",
    tokens: 420,
    dateStr: "2026-08-26",
    timeAgo: "10 mins ago",
    status: "Completed",
  },
  {
    id: "gen-2",
    prompt: "Refactor Next.js App Router layout to support nested client boundary...",
    model: "GPT-4o",
    tokens: 1250,
    dateStr: "2026-08-26",
    timeAgo: "1 hour ago",
    status: "Completed",
  },
  {
    id: "gen-3",
    prompt: "Summarize 10 key takeaways from the Q3 earnings report PDF...",
    model: "Gemini 1.5 Pro",
    tokens: 3800,
    dateStr: "2026-08-25",
    timeAgo: "1 day ago",
    status: "Completed",
  },
  {
    id: "gen-4",
    prompt: "Generate Tailwind CSS glassmorphic card component code...",
    model: "GPT-4o",
    tokens: 610,
    dateStr: "2026-08-20",
    timeAgo: "6 days ago",
    status: "Completed",
  },
  {
    id: "gen-5",
    prompt: "Create standard Zod schema for NextAuth callback credentials...",
    model: "Claude 3.5 Sonnet",
    tokens: 890,
    dateStr: "2026-08-10",
    timeAgo: "16 days ago",
    status: "Completed",
  },
];




// Custom Tooltip components
function CustomLineTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-[#121218] p-3 shadow-2xl backdrop-blur-md text-xs">
        <p className="font-semibold text-zinc-300 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400">
            <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
            <span className="text-zinc-400">Generations:</span>
            <span className="font-mono font-medium text-white">
              {Number(payload[0].value)?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-500 shrink-0" />
            <span className="text-zinc-400">Tokens Used:</span>
            <span className="font-mono font-medium text-white">
              {payload[1]?.value ? (Number(payload[1].value) / 1000).toFixed(1) + "k" : 0}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function CustomBarTooltip({ active, payload }: { active?: boolean; payload?: { payload: ModelBreakdownData }[] }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ModelBreakdownData;
    return (
      <div className="rounded-lg border border-zinc-800 bg-[#121218] p-3 shadow-2xl backdrop-blur-md text-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
          <p className="font-semibold text-zinc-200">{data.model}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-zinc-400">
            <span>Generations:</span>
            <span className="font-mono font-medium text-white">{data.generations.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-zinc-400">
            <span>Tokens Consumed:</span>
            <span className="font-mono font-medium text-white">{(data.tokens / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// Date Range Picker Dropdown Component
function DateRangePicker({
  range,
  onChange,
}: {
  range: DateRangeState;
  onChange: (newRange: DateRangeState) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePresetSelect = (preset: PresetRange) => {
    const today = new Date("2026-08-26");
    let start = new Date(today);

    if (preset === "7d") {
      start.setDate(today.getDate() - 7);
    } else if (preset === "30d") {
      start.setDate(today.getDate() - 30);
    } else if (preset === "90d") {
      start.setDate(today.getDate() - 90);
    } else if (preset === "ytd") {
      start = new Date("2026-01-01");
    }

    const startFormatted = start.toISOString().split("T")[0];
    const endFormatted = today.toISOString().split("T")[0];

    onChange({
      startDate: startFormatted,
      endDate: endFormatted,
      preset,
    });
    setIsOpen(false);
  };

  const formatRangeLabel = () => {
    if (range.preset === "7d") return "Last 7 Days";
    if (range.preset === "30d") return "Last 30 Days";
    if (range.preset === "90d") return "Last 90 Days";
    if (range.preset === "ytd") return "Year to Date";
    return `${range.startDate} → ${range.endDate}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900/90 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/80 transition shadow-sm"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>{formatRangeLabel()}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-zinc-800 bg-[#111116] p-4 shadow-2xl z-50 text-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="font-semibold text-zinc-200">Select Timeframe</span>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "7d", label: "Last 7 Days" },
                { id: "30d", label: "Last 30 Days" },
                { id: "90d", label: "Last 90 Days" },
                { id: "ytd", label: "Year to Date" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p.id as PresetRange)}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium transition ${
                    range.preset === p.id
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom Date Inputs */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-[11px] font-medium text-zinc-400">Custom Date Range</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={range.startDate}
                    onChange={(e) =>
                      onChange({ ...range, startDate: e.target.value, preset: "custom" })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={range.endDate}
                    onChange={(e) =>
                      onChange({ ...range, endDate: e.target.value, preset: "custom" })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
            >
              Apply Filter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanLimitProgressBar({ usedTokens, maxTokens }: { usedTokens: number; maxTokens: number }) {
  const percentage = Math.min(Math.round((usedTokens / maxTokens) * 100), 100);
  const isCritical = percentage >= 90;
  const isWarning = percentage >= 80 && percentage < 90;

  let barColor = "bg-indigo-500";
  let badgeBg = "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";

  if (isCritical) {
    barColor = "bg-rose-500";
    badgeBg = "bg-rose-500/10 text-rose-300 border-rose-500/30";
  } else if (isWarning) {
    barColor = "bg-amber-500";
    badgeBg = "bg-amber-500/10 text-amber-300 border-amber-500/30";
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-zinc-300">
          <span>Token Usage</span>
          <span className={`px-2 py-0.5 rounded text-[10px] border ${badgeBg}`}>
            {percentage}% Used
          </span>
        </div>
        <span className="font-mono text-zinc-400 text-[11px] sm:text-xs">
          <strong className="text-white font-semibold">{(usedTokens / 1000).toFixed(1)}k</strong> / {(maxTokens / 1000).toFixed(0)}k
        </span>
      </div>

      <div className="h-2.5 w-full bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-zinc-800">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {isWarning && (
        <motion.div 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200"
        >
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <span>You have used {percentage}% of your monthly tokens limit. Upgrade to stay active.</span>
        </motion.div>
      )}

      {isCritical && (
        <motion.div 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/40 text-[11px] text-rose-200"
        >
          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
          <span>Critical: Limit almost reached. Prompt generation will pause at 100%.</span>
        </motion.div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [metric, setMetric] = useState<"generations" | "tokens">("generations");
  const [barMetric, setBarMetric] = useState<"generations" | "tokens">("generations");

  // Date Range Picker State (Defaults to last 30 days)
  const [dateRange, setDateRange] = useState<DateRangeState>({
    startDate: "2026-07-28",
    endDate: "2026-08-26",
    preset: "30d",
  });

  // Dynamic calculations based on selected date range
  const filteredDailyData = useMemo(() => {
    return ALL_DAILY_USAGE_DATA.filter(
      (item) => item.fullDate >= dateRange.startDate && item.fullDate <= dateRange.endDate
    );
  }, [dateRange]);

  const filteredGenerations = useMemo(() => {
    return RECENT_GENERATIONS.filter(
      (gen) => gen.dateStr >= dateRange.startDate && gen.dateStr <= dateRange.endDate
    );
  }, [dateRange]);

  const totalGenerationsInPeriod = useMemo(() => {
    return filteredDailyData.reduce((acc, curr) => acc + curr.generations, 0);
  }, [filteredDailyData]);

  const totalTokensInPeriod = useMemo(() => {
    return filteredDailyData.reduce((acc, curr) => acc + curr.tokens, 0);
  }, [filteredDailyData]);

  const USED_TOKENS = 842500;
  const MAX_TOKENS = 1000000;

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      
      {/* Page Header with Date Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5 sm:pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400 shrink-0" />
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Monitor usage, track token consumption, and view active models.
          </p>
        </div>
        
        {/* Date Range Selector Integration */}
        <div className="flex items-center gap-3">
          <DateRangePicker range={dateRange} onChange={setDateRange} />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Generations"
          value={totalGenerationsInPeriod.toLocaleString()}
          change="+14.2%"
          isPositive={true}
          icon={Zap}
          description="In selected timeframe"
        />
        <StatCard
          title="Tokens Used"
          value={`${(totalTokensInPeriod / 1000).toFixed(1)}k`}
          change="+8.1%"
          isPositive={true}
          icon={Coins}
          description="Input & output tokens"
        />
        <StatCard
          title="Credits Remaining"
          value="4,500"
          change="-12.0%"
          isPositive={false}
          icon={CreditCard}
          description="Renews in 12 days"
        />
        <StatCard
          title="Active Days"
          value={`${filteredDailyData.length} Days`}
          change="+3 days"
          isPositive={true}
          icon={CalendarDays}
          description="Usage consistency"
        />
      </div>

      {/* TWO COLUMN CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Filtered Trend Line Chart */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400 shrink-0" />
                Daily Generation Trends
              </h2>
              <p className="text-xs text-zinc-400">Activity volume for selected period ({filteredDailyData.length} data points)</p>
            </div>

            <div className="flex items-center p-1 rounded-lg border border-zinc-800 bg-zinc-950 w-full sm:w-auto">
              <button
                onClick={() => setMetric("generations")}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition text-center ${
                  metric === "generations"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Generations
              </button>
              <button
                onClick={() => setMetric("tokens")}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition text-center ${
                  metric === "tokens"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Tokens (k)
              </button>
            </div>
          </div>

          <div className="h-[220px] sm:h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredDailyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val: number) => (metric === "tokens" ? `${val / 1000}k` : `${val}`)}
                />
                <Tooltip content={<CustomLineTooltip />} />

                {metric === "generations" ? (
                  <Area
                    type="monotone"
                    dataKey="generations"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#indigoGradient)"
                    activeDot={{ r: 5, fill: "#818cf8", stroke: "#08080a", strokeWidth: 2 }}
                  />
                ) : (
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#cyanGradient)"
                    activeDot={{ r: 5, fill: "#22d3ee", stroke: "#08080a", strokeWidth: 2 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Model Usage Breakdown Bar Chart */}
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                <PieIcon className="h-5 w-5 text-indigo-400 shrink-0" />
                Model Breakdown
              </h2>
              <div className="flex items-center p-0.5 rounded-lg border border-zinc-800 bg-zinc-950">
                <button
                  onClick={() => setBarMetric("generations")}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition ${
                    barMetric === "generations" ? "bg-zinc-800 text-white" : "text-zinc-400"
                  }`}
                >
                  Gens
                </button>
                <button
                  onClick={() => setBarMetric("tokens")}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition ${
                    barMetric === "tokens" ? "bg-zinc-800 text-white" : "text-zinc-400"
                  }`}
                >
                  Tokens
                </button>
              </div>
            </div>
            <p className="text-xs text-zinc-400">Distribution by model provider</p>

            <div className="h-[200px] sm:h-[220px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MODEL_BREAKDOWN_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="model" 
                    stroke="#71717a" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val: string) => val.split(" ")[0]}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val: number) => (barMetric === "tokens" ? `${val / 1000}k` : `${val}`)}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.03)" }} />
                  <Bar 
                    dataKey={barMetric} 
                    radius={[4, 4, 0, 0]}
                  >
                    {MODEL_BREAKDOWN_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60">
            {MODEL_BREAKDOWN_DATA.map((item) => (
              <div key={item.model} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-zinc-300 truncate text-[11px]">{item.model}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Activity & Subscription Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Generations Feed (Filtered) */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">Recent Generations</h2>
              <p className="text-xs text-zinc-400">Filtered executions within selected period</p>
            </div>
            <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredGenerations.length > 0 ? (
              filteredGenerations.map((gen) => (
                <motion.div
                  key={gen.id}
                  whileHover={{ x: 2 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/40 transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                        {gen.prompt}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-zinc-400 mt-1">
                        <span className="text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/30 text-[10px] sm:text-xs">
                          {gen.model}
                        </span>
                        <span className="text-[11px] sm:text-xs">{gen.tokens} tokens</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-zinc-400 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <Clock className="h-3 w-3" />
                      {gen.timeAgo}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {gen.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
                No generations recorded for the selected timeframe.
              </div>
            )}
          </div>
        </div>

        {/* Plan Details Card */}
        <div className="rounded-xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">Subscription Plan</h2>
                <p className="text-xs text-zinc-400">Current quota and usage status</p>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30 font-medium shrink-0">
                Pro Plan
              </span>
            </div>

            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
              <PlanLimitProgressBar usedTokens={USED_TOKENS} maxTokens={MAX_TOKENS} />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-300 space-y-3">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Info className="h-4 w-4 text-indigo-400 shrink-0" /> Billing Cycle
              </span>
              <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 font-medium transition">
                Upgrade <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              Your 1.0M token monthly limit resets on Sept 7, 2026.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ title, value, change, isPositive, icon: Icon, description }: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-5 shadow-lg flex flex-col justify-between hover:border-zinc-700/80 transition group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{title}</span>
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400 group-hover:text-indigo-300 transition shrink-0">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="my-2 sm:my-3">
        <div className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">{value}</div>
        <p className="text-[11px] text-zinc-500 mt-0.5">{description}</p>
      </div>

      <div className="flex items-center gap-1 text-xs">
        <span className={`flex items-center font-medium font-mono ${isPositive ? "text-emerald-400" : "text-amber-400"}`}>
          <TrendingUp className={`h-3 w-3 mr-0.5 ${!isPositive && "rotate-180"}`} />
          {change}
        </span>
        <span className="text-zinc-500 text-[11px]">vs previous period</span>
      </div>
    </div>
  );
}