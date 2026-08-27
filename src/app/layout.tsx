import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toast";
import { NavbarWrapper } from "@/components/NavbarWrapper"; 
import { FooterWrapper } from "@/components/FooterWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI App Platform Portfolio",
  description: "Advanced AI Platform Analytics Interface Showcase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col font-sans bg-[#08080a] text-[#f4f4f6]">
        <Providers>
          {/* 🌟 Sirf dashboard pages par top par dikhega */}
          <NavbarWrapper />

          <main className="flex-1 w-full max-w-[1440px] mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-12 relative">
            {children}
          </main>
          
          {/* 🌟 Sirf dashboard pages par bottom par dikhega */}
          <FooterWrapper />
          
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
