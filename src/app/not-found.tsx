"use client";

import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f4f6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0d0d12] p-6 sm:p-8 shadow-2xl text-center space-y-6"
      >
        {/* Decorative Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
          <FileQuestion className="h-8 w-8" />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-indigo-400 tracking-wider uppercase">
            404 Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Page not found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-400" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}