"use client";
import { useMarketStore } from "@/store/useMarketStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const AutoLogout = () => {
  const { logout, isAuth } = useMarketStore((state) => state);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    if (!isAuth) return;
    logout();
    toast.success("You have been kicked...");
    router.push("/");
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      handleLogout();
    }, 60000);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return null;
};
