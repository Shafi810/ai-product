"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Hero", targetId: "HeroSection" },
  { label: "Features", targetId: "Features" },
  { label: "Pricing", targetId: "PricingSection" },
  { label: "Social Proof", targetId: "SocialProof" }
];

export function NavbarLanding() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll logic safely accounting for fixed navbar viewport clearance
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false); 
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:px-6 md:px-8 pointer-events-none select-none">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="w-full max-w-[1200px] rounded-2xl backdrop-blur-md bg-[#08080a]/65 border border-white/[0.04] shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.03)] relative overflow-hidden pointer-events-auto group/nav transition-colors duration-300 hover:border-white/[0.08]"
      >
        {/* 🌟 Premium Linear Edge Laser Highlights */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f2fe]/20 to-transparent opacity-40 group-hover/nav:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#4facfe]/10 to-transparent opacity-30 group-hover/nav:opacity-70 transition-opacity duration-500" />

        <div className="flex h-12 items-center justify-between px-5 sm:px-6">
          
          {/* Logo Brand Frame */}
          <Link href="/" className="flex items-center gap-2 group/logo transition-opacity duration-200 hover:opacity-95">
            <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-tr from-[#00f2fe] to-[#4facfe] p-[1px] shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover/logo:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300">
              <div className="flex size-full items-center justify-center rounded-[5px] bg-[#08080a]">
                <Sparkles className="size-3 text-[#00f2fe]" />
              </div>
            </div>
            <span className="text-xs font-bold tracking-wider text-white font-mono uppercase">
              Nexus.<span className="text-[#00f2fe] drop-shadow-[0_0_10px_rgba(0,242,254,0.35)]">Ai</span>
            </span>
          </Link>

          {/* Central Item Anchors with Floating Capsule Logic */}
          <div className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={`#${item.targetId}`}
                onClick={(e) => handleScrollClick(e, item.targetId)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative px-3 py-1 text-[11px] font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                <span className="relative z-10">{item.label}</span>
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="polishedHoverCap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="absolute inset-0 z-0 rounded-md bg-white/[0.02] border border-white/[0.04] shadow-[0_2px_8px_rgba(255,255,255,0.01)]"
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Action Interface CTAs (Frosted Dark Glass Theme) */}
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/login" className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            
            <Link 
              href="/dashboard" 
              className="relative group inline-flex items-center gap-1 px-3.5 h-7 rounded-lg text-[11px] font-semibold text-zinc-200 bg-white/[0.02] border border-white/[0.06] overflow-hidden transition-all duration-300 hover:bg-white hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(0,242,254,0.25)] active:scale-[0.97]"
            >
              <span>Console</span>
              <ArrowRight className="size-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Drawer Trigger UI */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-zinc-400 hover:text-white p-1.5 rounded-lg border border-transparent active:bg-white/[0.02] active:border-white/[0.04] transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
          </button>
        </div>

        {/* Responsive Mobile Drawer Container */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t border-white/[0.04] bg-[#08080a]/90 rounded-b-2xl px-5 pt-3 pb-5 flex flex-col gap-3.5 shadow-inner"
            >
              <div className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.label} 
                    href={`#${item.targetId}`} 
                    onClick={(e) => handleScrollClick(e, item.targetId)}
                    className="text-[11px] font-medium text-zinc-400 hover:text-white py-1.5 px-2 rounded-md hover:bg-white/[0.01] border border-transparent hover:border-white/[0.02] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Separator Divider Component */}
              <div className="h-[1px] bg-white/[0.04] w-full" />

              {/* Responsive Tablet Switchboard Triggers */}
              <div className="flex items-center gap-3 w-full">
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center text-[11px] font-medium text-zinc-400 hover:text-white py-2 rounded-lg bg-zinc-900/30 border border-white/[0.04] transition-all"
                >
                  Sign In
                </Link>
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center text-[11px] font-semibold text-black bg-white py-2 rounded-lg active:scale-[0.97] transition-all flex items-center justify-center gap-0.5 shadow-md shadow-white/5"
                >
                  <span>Console</span>
                  <ArrowUpRight className="size-2.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
