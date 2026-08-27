"use client";

import { usePathname } from "next/navigation";
import { NavbarDashboard } from "@/components/NavbarDashboard";
import { Footer } from "@/components/footer";

export function NavbarWrapper() {
  const pathname = usePathname();

  // Agar user Landing Page (/) par hai, toh Dashboard Navbar aur Footer yahan load nahi hoga
  if (pathname === "/") {
    return null;
  }

  // Baqi tamam pages par Dashboard Navbar aur Footer load hoga
  return (
    <>
      <NavbarDashboard />
      
       
    </>
  );
}
