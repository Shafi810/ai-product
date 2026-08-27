"use client";

import { motion } from "framer-motion";

// Helper pulse container for standardized animations
function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-800/60 ${className}`}
    />
  );
}

// 1. Dashboard Cards Skeleton Grid
export function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-800/80 bg-[#0d0d12] p-5 space-y-3.5 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-8 w-8 rounded-xl" />
          </div>
          <SkeletonPulse className="h-7 w-20" />
          <div className="flex items-center gap-2 pt-1">
            <SkeletonPulse className="h-3 w-12" />
            <SkeletonPulse className="h-3 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 2. History List Skeleton Component
export function HistoryListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-4 sm:p-6 shadow-xl space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <SkeletonPulse className="h-5 w-32" />
        <SkeletonPulse className="h-8 w-20 rounded-lg" />
      </div>

      <div className="divide-y divide-zinc-800/40 space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 flex-1">
              <SkeletonPulse className="h-9 w-9 rounded-xl shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <SkeletonPulse className="h-4 w-3/4 max-w-[280px]" />
                <div className="flex items-center gap-2">
                  <SkeletonPulse className="h-3 w-16" />
                  <SkeletonPulse className="h-3 w-20" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <SkeletonPulse className="h-6 w-16 rounded-full" />
              <SkeletonPulse className="h-7 w-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Generation Results Panel Skeleton Component
export function GenerationResultsPanelSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-800 bg-[#0d0d12] p-5 sm:p-6 shadow-xl space-y-6 w-full"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
        <div className="space-y-2">
          <SkeletonPulse className="h-5 w-40" />
          <SkeletonPulse className="h-3 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonPulse className="h-8 w-20 rounded-lg" />
          <SkeletonPulse className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Main Output Box Skeleton */}
      <div className="space-y-3 border border-zinc-800/80 rounded-xl bg-zinc-950 p-4">
        <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
          <SkeletonPulse className="h-3.5 w-24" />
          <SkeletonPulse className="h-4 w-12" />
        </div>
        <div className="space-y-2.5 pt-1">
          <SkeletonPulse className="h-3.5 w-full" />
          <SkeletonPulse className="h-3.5 w-[92%]" />
          <SkeletonPulse className="h-3.5 w-[85%]" />
          <SkeletonPulse className="h-3.5 w-[96%]" />
          <SkeletonPulse className="h-3.5 w-[60%]" />
        </div>
      </div>

      {/* Metrics / Parameters Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="space-y-1.5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
          <SkeletonPulse className="h-3 w-16" />
          <SkeletonPulse className="h-4 w-20" />
        </div>
        <div className="space-y-1.5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
          <SkeletonPulse className="h-3 w-16" />
          <SkeletonPulse className="h-4 w-16" />
        </div>
        <div className="col-span-2 sm:col-span-1 space-y-1.5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
          <SkeletonPulse className="h-3 w-20" />
          <SkeletonPulse className="h-4 w-12" />
        </div>
      </div>
    </motion.div>
  );
}