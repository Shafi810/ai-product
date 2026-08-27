"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to your error tracking service (e.g., Sentry, PostHog)
    console.error("Unhandled Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0d0d12] p-6 sm:p-8 shadow-2xl text-center space-y-6"
      >
        {/* Warning Icon Container */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
          <AlertTriangle className="h-7 w-7" />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while processing your request. Dont worry, your data is safe.
          </p>
        </div>

        {/* Error Digest Badge (if present) */}
        {error.digest && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-500 font-mono">
            <span>Error Code:</span>
            <span className="text-zinc-300 font-medium">{error.digest}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Home className="h-4 w-4 text-zinc-400" />
            Return Home
          </Link>
        </div>

        {/* Extra Support Link */}
        <div className="border-t border-zinc-800/60 pt-5">
          <a
            href="/support"
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-indigo-400 transition"
          >
            <span>Need help? Contact system support</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}