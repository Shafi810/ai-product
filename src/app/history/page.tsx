"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  History, Search, Clock, Bot, Sparkles, Copy, 
  Check, Trash2, Sliders, Calendar, Filter, X, Play, AlertTriangle,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  prompt: string;
  output: string;
  model: string;
  temperature: number;
  maxTokens: number;
  format: "markdown" | "text" | "list";
  timestamp: string;
}

const GENERATE_MOCK_HISTORY = (count: number): HistoryItem[] => {
  const models = ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"];
  const formats: ("markdown" | "text" | "list")[] = ["markdown", "text", "list"];

  return Array.from({ length: count }, (_, i) => ({
    id: `hist-${i + 1}`,
    prompt: `Generation prompt #${i + 1}: ${
      [
        "Write a Next.js App Router API route handler for streaming responses.",
        "Refactor NextAuth credential handler to support custom OAuth providers.",
        "Create 3 bullet points explaining HTTP streaming performance benefits.",
        "Generate system prompt instruction set for automated code reviewer bot.",
        "Draft a high-converting landing page tagline for a developer productivity tool."
      ][i % 5]
    }`,
    output: `Output payload for entry #${i + 1}. Contains formatted response data generated using parameter settings.`,
    model: models[i % models.length],
    temperature: Number((0.2 + (i % 8) * 0.1).toFixed(1)),
    maxTokens: 500 + (i % 4) * 500,
    format: formats[i % formats.length],
    timestamp: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
  }));
};

const LARGE_HISTORY_DATASET = GENERATE_MOCK_HISTORY(48);

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>(LARGE_HISTORY_DATASET);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter States
  const [dateRange, setDateRange] = useState<"all" | "today" | "7days" | "30days">("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination & Loading Mode States
  const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [visibleInfiniteCount, setVisibleInfiniteCount] = useState(9);

  // Detail Modal & Delete Dialog State
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<HistoryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sentinel Ref for Infinite Scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Event Handlers for Filters & Pagination Resets
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setVisibleInfiniteCount(itemsPerPage);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value as "all" | "today" | "7days" | "30days");
    setCurrentPage(1);
    setVisibleInfiniteCount(itemsPerPage);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setCurrentPage(1);
    setVisibleInfiniteCount(itemsPerPage);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value);
    setCurrentPage(1);
    setVisibleInfiniteCount(itemsPerPage);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(e.target.value);
    setItemsPerPage(newPerPage);
    setCurrentPage(1);
    setVisibleInfiniteCount(newPerPage);
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.output.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModel = selectedModel === "all" || item.model === selectedModel;
      const matchesFormat = selectedFormat === "all" || item.format === selectedFormat;

      let matchesDate = true;
      const itemDate = new Date(item.timestamp).getTime();
      const now = new Date().getTime();

      if (dateRange === "today") {
        const startOfToday = new Date().setHours(0, 0, 0, 0);
        matchesDate = itemDate >= startOfToday;
      } else if (dateRange === "7days") {
        matchesDate = itemDate >= now - 7 * 24 * 60 * 60 * 1000;
      } else if (dateRange === "30days") {
        matchesDate = itemDate >= now - 30 * 24 * 60 * 60 * 1000;
      }

      return matchesSearch && matchesModel && matchesFormat && matchesDate;
    });
  }, [history, searchQuery, dateRange, selectedModel, selectedFormat]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;

  const displayedHistory = useMemo(() => {
    if (viewMode === "infinite") {
      return filteredHistory.slice(0, visibleInfiniteCount);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHistory, currentPage, itemsPerPage, viewMode, visibleInfiniteCount]);

  // Keyboard accessibility: Escape key closes active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (itemToDelete) setItemToDelete(null);
        else if (activeItem) setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, itemToDelete]);

  // Optimized Intersection Observer setup for Infinite Scroll
  useEffect(() => {
    if (viewMode !== "infinite") return;

    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleInfiniteCount((prev) => 
            prev < filteredHistory.length ? Math.min(prev + itemsPerPage, filteredHistory.length) : prev
          );
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [viewMode, filteredHistory.length, itemsPerPage]);

  const activeFilterCount =
    (dateRange !== "all" ? 1 : 0) +
    (selectedModel !== "all" ? 1 : 0) +
    (selectedFormat !== "all" ? 1 : 0);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleRerun = useCallback((item: HistoryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const queryParams = new URLSearchParams({
      prompt: item.prompt,
      model: item.model,
      temperature: item.temperature.toString(),
      maxTokens: item.maxTokens.toString(),
      autorun: "true",
    });
    router.push(`/?${queryParams.toString()}`);
  }, [router]);

  const confirmDelete = useCallback(() => {
    if (!itemToDelete) return;
    setHistory((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    if (activeItem?.id === itemToDelete.id) {
      setActiveItem(null);
    }
    setItemToDelete(null);
  }, [itemToDelete, activeItem]);

  return (
   <div className="flex min-h-screen flex-col bg-[#08080a] text-[#f4f4f6] overflow-x-hidden">
  <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
    {/* Aapka baqi saara purana code yahan andar hi rahega */}

        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <History className="h-6 w-6 text-indigo-400" />
              Generation History
            </h1>
            <p className="text-sm text-zinc-400">Showing {filteredHistory.length} total recorded prompt runs.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("pagination")}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  viewMode === "pagination"
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Pages
              </button>
              <button
                type="button"
                onClick={() => setViewMode("infinite")}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  viewMode === "infinite"
                    ? "bg-indigo-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Infinite Scroll
              </button>
            </div>

            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                New Generation
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search prompt or output text..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition ${
                activeFilterCount > 0 || showFilters
                  ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-indigo-500 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters Drawer */}
          {showFilters && (
            <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="date-range-select" className="text-zinc-400 font-medium block">Date Range</label>
                <select
                  id="date-range-select"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="7days">Past 7 Days</option>
                  <option value="30days">Past 30 Days</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="model-select" className="text-zinc-400 font-medium block">Model Provider</label>
                <select
                  id="model-select"
                  value={selectedModel}
                  onChange={handleModelChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">All Models</option>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5</option>
                  <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="format-select" className="text-zinc-400 font-medium block">Format</label>
                <select
                  id="format-select"
                  value={selectedFormat}
                  onChange={handleFormatChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">All Formats</option>
                  <option value="markdown">Markdown</option>
                  <option value="text">Plain Text</option>
                  <option value="list">Bulleted List</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedHistory.length > 0 ? (
            displayedHistory.map((item) => (
              <div
                key={item.id}
                tabIndex={0}
                role="button"
                onClick={() => setActiveItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-800/80 bg-[#0d0d12] hover:border-indigo-500/50 hover:bg-[#111118] transition cursor-pointer shadow-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      <Bot className="h-3.5 w-3.5" />
                      {item.model}
                    </span>
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 group-hover:text-indigo-300 transition">
                    {item.prompt}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 font-sans leading-relaxed">
                    {item.output}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                  <span className="uppercase font-mono text-[10px] bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {item.format}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleRerun(item, e)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition font-medium text-[11px]"
                      title="Re-run Prompt"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Re-run
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete(item);
                      }}
                      className="p-1 rounded text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition"
                      title="Delete Entry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center text-zinc-500 rounded-xl border border-dashed border-zinc-800">
              No history entries match your search criteria.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {viewMode === "pagination" && filteredHistory.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-zinc-800 bg-[#0d0d12] text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong className="text-zinc-200">{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                <strong className="text-zinc-200">
                  {Math.min(currentPage * itemsPerPage, filteredHistory.length)}
                </strong>{" "}
                of <strong className="text-zinc-200">{filteredHistory.length}</strong> items
              </span>

              <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-3">
                <label htmlFor="per-page-select">Per page:</label>
                <select
                  id="per-page-select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={18}>18</option>
                  <option value={36}>36</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                aria-label="First page"
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="px-3 font-medium text-zinc-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Last page"
                className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        {viewMode === "infinite" && visibleInfiniteCount < filteredHistory.length && (
          <div ref={loadMoreRef} className="py-8 flex justify-center items-center gap-2 text-xs text-zinc-500">
            <div className="h-4 w-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            Loading more history entries...
          </div>
        )}

      </main>

      {/* Detail Modal */}
      {activeItem && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative flex flex-col w-full max-w-6xl h-[85vh] rounded-2xl border border-zinc-800 bg-[#0d0d12] shadow-2xl overflow-hidden">
            
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0 bg-[#08080a]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5" />
                  {activeItem.model}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1 border-l border-zinc-800 pl-3">
                  <Sliders className="h-3.5 w-3.5" />
                  Temp: {activeItem.temperature} | Max Tokens: {activeItem.maxTokens}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(activeItem.output, activeItem.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition"
                >
                  {copiedId === activeItem.id ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy Output
                </button>

                <button
                  type="button"
                  onClick={() => setItemToDelete(activeItem)}
                  className="p-2 rounded-lg text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800 flex-1 overflow-hidden">
              <div className="flex flex-col h-full overflow-hidden bg-zinc-950/40">
                <div className="px-5 py-3 border-b border-zinc-800/60 shrink-0 bg-zinc-900/30">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Input Prompt</h4>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium whitespace-pre-wrap">
                    {activeItem.prompt}
                  </p>
                </div>
              </div>

              <div className="flex flex-col h-full overflow-hidden bg-[#0d0d12]">
                <div className="px-5 py-3 border-b border-zinc-800/60 shrink-0 bg-zinc-900/30 flex justify-between items-center">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Generated Output</h4>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{activeItem.format}</span>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <pre className="text-sm text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {activeItem.output}
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 shrink-0 bg-[#08080a] flex items-center justify-between">
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Executed on {new Date(activeItem.timestamp).toLocaleString()}
              </span>

              <Button 
                onClick={() => handleRerun(activeItem)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 text-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Re-run Generation
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {itemToDelete && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#0d0d12] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">Delete History Entry</h3>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>

            <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 font-mono line-clamp-2">
              {itemToDelete.prompt}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-red-600 hover:bg-red-500 text-white transition flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}