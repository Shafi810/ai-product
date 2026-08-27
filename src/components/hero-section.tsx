"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { toast } from "@/components/ui/toast";

export function HeroSection() {
  const handleCtaClick = () => {
    toast.add({
      title: "Early Access Requested",
      description: "You've been added to the priority waitlist.",
      type: "success",
    });
  };

  return (
    <section id="HeroSection" className="relative overflow-hidden bg-[#08080a] py-24 sm:py-32">
      {/* Background Radial Glow */}
      <div 
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #00f2fe 0%, #7928ca 100%)",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#29293a 1px, transparent 1px), linear-gradient(to right, #29293a 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Content Box */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#29293a] bg-[#0f0f14] px-3.5 py-1.5 text-xs text-[#a0a0b2] shadow-sm mb-6">
            <Sparkles className="size-3.5 text-[#00f2fe]" />
            <span>Next-Gen Intelligence Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-[#f4f4f6] sm:text-6xl sm:leading-[1.15]">
            Build autonomous AI workflows at{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)",
              }}
            >
              light speed
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-[#a0a0b2] max-w-2xl mx-auto">
            Orchestrate complex agents, run edge models, and deliver production-ready AI pipelines without managing infrastructure complexity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              onClick={handleCtaClick}
              className="h-12 px-6 rounded-xl font-medium bg-[#f4f4f6] text-[#08080a] hover:bg-white transition-all duration-200 shadow-[0_0_20px_-3px_rgba(0,242,254,0.35)]"
            >
              Start Building Free
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-xl border-[#29293a] bg-[#0f0f14] text-[#f4f4f6] hover:bg-[#171720] hover:border-[#3f3f56]"
            >
              Documentation
            </Button>
          </div>
        </div>

        {/* Product Screenshot / Interface Mockup */}
        <div className="mt-16 sm:mt-20">
          <div className="relative rounded-2xl border border-[#29293a] bg-[#0f0f14] p-3 shadow-2xl backdrop-blur-xl">
            {/* Decorative Glow Ring around Mockup */}
            <div 
              className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-20 blur-lg transition duration-500 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(0,242,254,0.5) 0%, rgba(121,40,202,0.5) 100%)",
              }}
            />

            {/* Terminal Window Frame */}
            <div className="relative overflow-hidden rounded-xl bg-[#08080a] border border-[#29293a]">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-[#29293a] bg-[#0f0f14] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#f43f5e]" />
                  <div className="size-3 rounded-full bg-[#f59e0b]" />
                  <div className="size-3 rounded-full bg-[#10b981]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#69697e] font-mono">
                  <Terminal className="size-3.5" />
                  agent-executor.ts
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Mockup Body Content */}
              <div className="p-6 font-mono text-sm space-y-4">
                <div className="flex items-center gap-2 text-[#69697e]">
                  <span>$</span>
                  <span className="text-[#f4f4f6]">npx ai-agent initialize --model=gpt-4o</span>
                </div>
                <div className="text-[#00f2fe] flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00f2fe] animate-pulse" />
                  <span>[Thinking] Analyzing workflow dependencies...</span>
                </div>
                <div className="rounded-lg bg-[#171720] border border-[#29293a] p-4 text-[#a0a0b2] space-y-2">
                  <div className="text-xs text-[#69697e]">/ Execution Graph</div>
                  <div className="text-[#10b981]">✔ Step 1: Query vector embeddings (12ms)</div>
                  <div className="text-[#10b981]">✔ Step 2: Extract structured JSON payload</div>
                  <div className="text-[#7928ca] animate-pulse">⏳ Step 3: Generating real-time response stream...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}