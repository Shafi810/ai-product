"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Terminal,  
  Settings, 
  Layers, 
  Code2, 
  History, 
  CreditCard,
  DollarSign 

} from "lucide-react";

// 🌟 Upgraded Array Matrix: Injected all your custom pages into the navigation route mapping engine
const DASH_LINKS = [
  { name: "Workspace", path: "/dashboard", icon: Layers },
  { name: "History Logs", path: "/history", icon: History },
  { name: "Pricing", path: "/pricing", icon: DollarSign },
  { name: "Generate", path: "/generate", icon: Code2 },
  { name: "Billing", path: "/settings/billing", icon: CreditCard },
 
  
];

export  function NavbarDashboard() {
  const pathname = usePathname();

  return (
    /* fixed positioning used to turn this navbar into a true floating overlay */
    <div className="w-full flex justify-center px-4 pt-4 sm:px-6 md:px-8 fixed top-0 left-0 right-0 z-[60]">
      <nav className="w-full max-w-[1440px] rounded-2xl backdrop-blur-xl text-[#f4f4f6] full-perimeter-laser shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-zinc-950/80 border border-zinc-800/80">
        <div className="flex h-14 items-center justify-between px-6">
          
          {/* Left System Controls & Responsive Core Links */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pr-4 w-full md:w-auto">
            <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
              <div className="flex size-7 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-purple-400">
                <Terminal className="size-4 animate-pulse" />
              </div>
              <span className="text-xs font-black tracking-[0.15em] text-zinc-300 uppercase hidden sm:inline">
                Core_Node
              </span>
            </Link>

            {/* Tab Pipeline Grid (Supports mobile touch sliding natively) */}
            <div className="flex items-center gap-1 h-14">
              {DASH_LINKS.map((link) => {
                const Icon = link.icon;
                // Perfect prefix checking so sub-nested links also trigger an active state highlight
                const isActive = pathname === link.path || pathname?.startsWith(`${link.path}/`);
                
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative flex items-center gap-1.5 h-full px-3 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[#00f2fe]" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="hidden lg:inline">{link.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="dashboardActiveBorder"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00f2fe] shadow-[0_2px_10px_rgba(0,242,254,0.6)]"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Tools & Profile */}
          <div className="flex items-center gap-3 shrink-0 ml-auto pl-2">
            {/* Quick Actions Alerts Engine */}
            

            {/* Quick Link Settings Node Icon Shortcut */}
            <Link href="/asettings" className="size-8 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-all hidden sm:flex">
              <Settings className="size-3.5" />
            </Link>

            
          </div>

        </div>
      </nav>
    </div>
  );
}
