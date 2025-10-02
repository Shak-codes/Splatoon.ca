"use client";
import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("sm");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1920) setBp("3xl");
      else if (window.innerWidth >= 1536) setBp("2xl");
      else if (window.innerWidth >= 1280) setBp("xl");
      else if (window.innerWidth >= 1024) setBp("lg");
      else if (window.innerWidth >= 768) setBp("md");
      else setBp("sm");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
