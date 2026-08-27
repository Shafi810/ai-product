"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { ArrowRight, Sparkles } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast.add({
      title: "Subscribed Successfully!",
      description: "Redirecting you to the workspace console engine...",
      type: "success",
    });
    
    setEmail("");
    
    // Optional Pro-Tip: Automatically push the user to sign up after newsletter subscription
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  // 🚀 Core smooth scrolling click engine matching your landing anchors exactly
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90; // Navbar distance offset clearance buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const productLinks = [
    { label: "Hero", targetId: "HeroSection" },
    { label: "Features", targetId: "Features" },
    { label: "Pricing", targetId: "PricingSection" },
    { label: "Social Proof", targetId: "SocialProof" }
  ];

  const resourceLinks = ["Documentation", "API Reference", "Community", "Guides", "Status"];
  const companyLinks = ["About Us", "Careers", "Blog", "Privacy Policy", "Terms of Service"];

  return (
    <footer className="border-t border-[#29293a]/50 bg-[#08080a] text-[#f4f4f6]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#00f2fe]/10 text-[#00f2fe]">
                <Sparkles className="size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#f4f4f6]">
                AI Platform
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#a0a0b2] max-w-sm">
              Build, deploy, and scale production-ready autonomous workflows without infrastructure friction.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm">
              <label htmlFor="newsletter-email" className="text-xs font-medium text-[#a0a0b2] uppercase tracking-wider">
                Subscribe to updates
              </label>
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="enter.your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0f0f14] border-[#29293a] text-[#f4f4f6] placeholder:text-[#69697e] focus:border-[#00f2fe]"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-[#f4f4f6] text-[#08080a] hover:bg-white shrink-0 font-semibold"
                >
                  Join
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            
            {/* 🌟 Column 1: Mapped with your precise active anchor elements */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-[#f4f4f6]">
                Product
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.targetId}`}
                      onClick={(e) => handleScrollClick(e, link.targetId)}
                      className="text-sm text-[#a0a0b2] transition-colors hover:text-[#00f2fe]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Resources (Untouched static mapping) */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-[#f4f4f6]">
                Resources
              </h3>
              <ul className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#a0a0b2] transition-colors hover:text-[#00f2fe]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company (Untouched static mapping) */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-[#f4f4f6]">
                Company
              </h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#a0a0b2] transition-colors hover:text-[#00f2fe]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[#29293a]/50 pt-8 sm:flex-row">
          <p className="text-xs text-[#a0a0b2]">
            © {new Date().getFullYear()} AI Platform Inc. All rights reserved.
          </p>

          {/* Social Icons SVGs */}
          <div className="flex items-center gap-4 text-[#a0a0b2]">
            {/* Social SVGs match previous exactly */}
            <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#171720] hover:text-[#f4f4f6]" aria-label="GitHub">
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#171720] hover:text-[#f4f4f6]" aria-label="X"><svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
            <a href="#" className="rounded-lg p-2 transition-colors hover:bg-[#171720] hover:text-[#f4f4f6]" aria-label="LinkedIn"><svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" /></svg></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
