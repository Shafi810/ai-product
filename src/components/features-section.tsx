"use client";

import { BrainCircuit, Cpu, Sparkles } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Automated Content Generation",
      description:
        "Draft high-converting blog posts, marketing copy, and social content in seconds with multi-modal context understanding.",
    },
    {
      icon: BrainCircuit,
      title: "Contextual Knowledge Base",
      description:
        "Connect your documentation and custom datasets to generate precise responses tailored to your brand voice.",
    },
    {
      icon: Cpu,
      title: "Real-time AI Workflows",
      description:
        "Stream LLM completions at low latency and seamlessly integrate autonomous tool-calling agents into your app.",
    },
  ];

  return (
    <section id="Features"  className="container mx-auto px-6 py-20 border-t border-[#29293a]/50">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#f4f4f6] sm:text-4xl">
          Supercharge your content with AI
        </h2>
        <p className="mt-4 text-[#a0a0b2] text-base">
          Everything you need to scale intelligent content generation across your entire stack.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group relative rounded-2xl border border-[#29293a] bg-[#0f0f14] p-8 transition-all duration-300 hover:border-[#3f3f56] hover:bg-[#171720]"
            >
              {/* Glow Effect on Hover */}
              <div
                className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 blur transition duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(121,40,202,0.15) 100%)",
                }}
              />

              <div className="relative">
                <div className="inline-flex items-center justify-center rounded-xl bg-[#20202d] p-3 text-[#00f2fe] mb-6 group-hover:bg-[#00f2fe]/10 group-hover:text-[#00f2fe] transition-colors">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-xl font-semibold text-[#f4f4f6] mb-3">
                  {feature.title}
                </h3>

                <p className="text-[#a0a0b2] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}