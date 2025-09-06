"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useMarketStore } from "@/store/useMarketStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth, fetchUser } = useMarketStore((state) => state);

  useEffect(() => {
    if (!isAuth) return;
    fetchUser();
  }, [isAuth, fetchUser]);

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistMono.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
