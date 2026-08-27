"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Landing page par footer landing page wale file ke andar laga hua hai, isliye yahan hide hoga
  if (pathname === "/") return null;

  return <Footer />;
}
