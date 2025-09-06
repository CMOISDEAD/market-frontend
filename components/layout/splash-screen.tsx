"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";

    const matrixInterval = setInterval(() => {
      const randomText = Array(8)
        .fill(0)
        .map(() =>
          characters.charAt(Math.floor(Math.random() * characters.length)),
        )
        .join("");
      setMatrixText(randomText);
    }, 50);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(matrixInterval);
          setTimeout(() => setIsComplete(true), 500); // Delay before hiding splash screen
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background/90 backdrop-blur-lg transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="relative w-48 h-48 mb-8">
        <Image
          src="/logo.png"
          alt="SDFM 2520"
          fill
          className="object-contain invert"
          priority
        />
      </div>

      <div className="font-mono mb-4 h-6">{`LOADING_SYSTEM: ${matrixText}`}</div>

      <div className="w-64 h-1 rounded-full bg-muted-foreground overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 font-mono text-sm">{`${progress}%`}</div>
    </div>
  );
}
