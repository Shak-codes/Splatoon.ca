"use client";

import { useEffect } from "react";

const setBackground = () => {
  const length = 10;
  let bg = sessionStorage.getItem("bg-image");

  if (!bg) {
    const idx = Math.floor(Math.random() * length);
    bg = `url("/background/combined_${idx + 1}.svg")`;
    sessionStorage.setItem("bg-image", bg);
  }

  document.documentElement.style.setProperty("--bg-image", bg);
};

export const BackgroundInitializer = () => {
  useEffect(() => {
    setBackground();
  }, []);

  return null;
};
