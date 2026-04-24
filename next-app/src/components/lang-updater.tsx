"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LangUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.startsWith("/zh") ? "zh-HK" : "en";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
