"use client";

import { useEffect } from "react";

const setAccent = () => {
  const bg = "hsla(270, 4%, 10%, 1.00)";
  const bg2 = "#19181a";
  const primaryBackground = [
    "#cd43a6",
    "#e1820d",
    "#31c4a9",
    "#cdcd34",
    "#94c921",
    "#3a28c4",
    "#4e4edd",
    "#0d0ddc",
    "#b62ea7",
    "#5dab21",
  ];
  const secondaryBackground = [
    "hsla(320, 20%, 10%, 1.00)",
    "hsla(22, 20%, 10%, 1.00)",
    "hsla(175, 20%, 10%, 1.00)",
    "hsla(38, 20%, 10%, 1.00)",
    "hsla(84, 20%, 10%, 1.00)",
    "hsla(246, 20%, 10%, 1.00)",
    "hsla(241, 20%, 10%, 1.00)",
    "hsla(240, 20%, 10%, 1.00)",
    "hsla(309, 20%, 10%, 1.00)",
    "hsla(99, 20%, 10%, 1.00)",
  ];
  const primaryAccents = [
    "rgba(26, 26, 174, 1)",
    "rgba(160, 201, 55, 1)",
    "rgba(190, 205, 65, 1)",
    "rgba(222, 102, 36, 1)",
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
    "rgba(205, 205, 52, 1)",
    "rgba(148, 201, 33, 1)",
    "rgba(58, 40, 196, 1)",
    "rgba(78, 78, 221, 1)",
    "rgba(13, 13, 220, 1)",
    "rgba(182, 46, 167, 1)",
    "rgba(93, 171, 33, 1)",
  ];

  const length = primaryBackground.length;

  let pb = sessionStorage.getItem("primary-background");
  let sb = sessionStorage.getItem("secondary-background");
  let pa = sessionStorage.getItem("primary-accent");
  let sa = sessionStorage.getItem("secondary-accent");

  if (!pb || !sb || !pa || !sa) {
    const idx = Math.floor(Math.random() * length);
    pb = primaryBackground[idx];
    sb = secondaryBackground[idx];
    pa = primaryAccents[idx];
    sa = secondaryAccents[idx];
    sessionStorage.setItem("primary-background", pb);
    sessionStorage.setItem("secondary-background", sb);
    sessionStorage.setItem("primary-accent", pa);
    sessionStorage.setItem("secondary-accent", sa);
  }

  document.documentElement.style.setProperty("--primary-background", pb);
  document.documentElement.style.setProperty("--secondary-background", sb);
  document.documentElement.style.setProperty("--primary-accent", pa);
  document.documentElement.style.setProperty("--secondary-accent", sa);
};

export const AccentInitializer = () => {
  useEffect(() => {
    setAccent();
  }, []);

  return null;
};
