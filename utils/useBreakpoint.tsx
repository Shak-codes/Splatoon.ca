"use client";
import { useState, useEffect } from "react";

type Breakpoint =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("sm");

  useEffect(() => {
    const update = () => {
      switch (true) {
        case window.innerWidth >= 3840:
          setBp("5xl");
          break;
        case window.innerWidth >= 2560:
          setBp("4xl");
          break;
        case window.innerWidth >= 1920:
          setBp("3xl");
          break;
        case window.innerWidth >= 1536:
          setBp("2xl");
          break;
        case window.innerWidth >= 1280:
          setBp("xl");
          break;
        case window.innerWidth >= 1024:
          setBp("lg");
          break;
        case window.innerWidth >= 768:
          setBp("md");
          break;
        case window.innerWidth >= 640:
          setBp("sm");
          break;
        default:
          setBp("xs");
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
