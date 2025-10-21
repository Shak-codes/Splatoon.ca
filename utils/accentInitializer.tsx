"use client";

import { useEffect } from "react";

const setAccent = () => {
  const bg = "hsla(270, 4%, 10%, 1.00)";
  const bg2 = "#19181a";
  const primary = [
    "#cd43a6",
    "#e1820d",
    "#31c4a9",
    // "#cdcd34",
    "#94c921",
    "#3a28c4",
    "#4e4edd",
    "#0d0ddc",
    "#b62ea7",
    "#5dab21",
  ];
  const background = [
    "hsla(317, 50%, 10%, 1.00)",
    "hsla(33, 70%, 10%, 1.00)",
    "hsla(169, 50%, 10%, 1.00)",
    // "hsla(60, 60%, 10%, 1.00)",
    "hsla(79, 70%, 10%, 1.00)",
    "hsla(246, 20%, 10%, 1.00)",
    "hsla(241, 20%, 10%, 1.00)",
    "hsla(240, 20%, 10%, 1.00)",
    "hsla(309, 20%, 10%, 1.00)",
    "hsla(99, 20%, 10%, 1.00)",
  ];
  const primaryAccents = [
    "rgba(227, 141, 36, 1)",
    "rgba(186, 48, 176, 1)",
    "rgba(100, 38, 207, 1)",
    // "rgba(222, 102, 36, 1)",
    "rgba(205, 81, 10, 1)",
    "rgba(193, 45, 116, 1)",
    "rgba(27, 190, 171, 1)",
    "rgba(30, 192, 173, 1)",
    "rgba(208, 190, 8, 1)",
    "rgba(206, 177, 33, 1)",
  ];

  const secondaryAccents = [
    "rgba(227, 141, 36, 1)",
    "rgba(186, 48, 176, 1)",
    "rgba(49, 196, 169, 1)",
    // "rgba(205, 205, 52, 1)",
    "rgba(148, 201, 33, 1)",
    "rgba(58, 40, 196, 1)",
    "rgba(78, 78, 221, 1)",
    "rgba(13, 13, 220, 1)",
    "rgba(182, 46, 167, 1)",
    "rgba(93, 171, 33, 1)",
  ];

  const length = primary.length;

  let p = sessionStorage.getItem("primary");
  let b = sessionStorage.getItem("background");
  let a = sessionStorage.getItem("accent");

  if (!p || !b || !a) {
    const idx = Math.floor(Math.random() * length);
    console.log("bg:", primary[idx]);
    p = primary[idx];
    b = background[idx];
    a = primaryAccents[idx];
    //a = secondaryAccents[idx];
    // sessionStorage.setItem("accent", a);
    sessionStorage.setItem("primary", p);
    sessionStorage.setItem("background", b);
    sessionStorage.setItem("accent", a);
  }

  document.documentElement.style.setProperty("--primary", p);
  document.documentElement.style.setProperty("--background", b);
  document.documentElement.style.setProperty("--accent", a);
  // document.documentElement.style.setProperty("--accent", a);
};

export const AccentInitializer = () => {
  useEffect(() => {
    setAccent();
  }, []);

  return null;
};
