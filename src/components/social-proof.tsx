"use client";

import { Star } from "lucide-react";
import Image from 'next/image';

export function SocialProof() {
  const logos = [
    "Acme Corp",
    "Vortex AI",
    "HyperScale",
    "Nexus",
    "PulseData",
    "ApexFlow",
  ];

  const testimonials = [
    {
      quote:
        "This platform cut our content pipeline execution time in half. The local models run flawlessly and the AI workflows feel like magic.",
      author: "Sarah Chen",
      role: "VP of Product, ApexFlow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The context integration is absurdly fast. We hooked up our entire developer docs in minutes and generated accurate guides instantly.",
      author: "Marcus Vance",
      role: "Lead Engineer, HyperScale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "Hands down the best developer experience for building AI agents. The real-time streaming tools are a massive competitive advantage for us.",
      author: "Elena Rostova",
      role: "Head of AI, Vortex Labs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="SocialProof" className="container mx-auto px-6 py-24 border-t border-[#29293a]/50">
      {/* Logo Cloud Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a0a0b2]">
          Trusted by high-growth teams worldwide
        </p>
      </div>

      {/* Logo Cloud */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-6 items-center justify-items-center opacity-60 grayscale transition-all hover:opacity-90 max-w-5xl mx-auto mb-24">
        {logos.map((logo, idx) => (
          <span key={idx} className="text-lg font-bold tracking-wider text-[#f4f4f6]">
            {logo}
          </span>
        ))}
      </div>

      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-[#f4f4f6] sm:text-4xl">
          Loved by builders & creators
        </h2>
        <p className="mt-4 text-[#a0a0b2] text-base">
          Here is what engineers and product leaders have to say about our intelligence engine.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-[#0f0f14] p-8 transition-all duration-300"
          >
            {/* Animated Glowing Gradient Border */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-40 blur-[2px] transition-all duration-500 group-hover:opacity-100 group-hover:blur-[6px]"
              style={{
                background:
                  "linear-gradient(90deg, #00f2fe, #7928ca, #00f2fe)",
                backgroundSize: "200% 200%",
                animation: "borderGlow 4s linear infinite",
              }}
            />

            {/* Inner Content Card */}
            <div className="relative h-full rounded-2xl bg-[#0f0f14] p-6 flex flex-col justify-between border border-[#29293a]/80">
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#00f2fe] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-[#00f2fe]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-[#a0a0b2] italic">
                  {item.quote}
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#29293a]/50">
                <img
                  src={item.avatar}
                  alt={item.author}
                  width={40}
                    height={40}
                  className="size-10 rounded-full object-cover border border-[#29293a]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#f4f4f6]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#a0a0b2]">{item.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframe Animation for Glowing Border */}
      <style jsx global>{`
        @keyframes borderGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}