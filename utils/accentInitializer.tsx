"use client";

import { useEffect } from "react";

const setAccent = () => {
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
    "#490e35",
    "#431c05",
    "#062d2a",
    "#372911",
    "#1d2c07",
    "#1d184e",
    "#1e1d49",
    "#0c0c5a",
    "#49093f",
    "#142b08",
  ];
  const primaryAccents = [
    "rgba(26, 26, 174, 0.5)",
    "rgba(160, 201, 55, 0.5)",
    "rgba(190, 205, 65, 0.5)",
    "rgba(222, 102, 36, 0.5)",
    "rgba(205, 81, 10, 0.5)",
    "rgba(193, 45, 116, 0.5)",
    "rgba(27, 190, 171, 0.5)",
    "rgba(30, 192, 173, 0.5)",
    "rgba(208, 190, 8, 0.5)",
    "rgba(206, 177, 33, 0.5)",
  ];

  const secondaryAccents = [
    "rgba(227, 141, 36, 0.5)",
    "rgba(186, 48, 176, 0.5)",
    "rgba(49, 196, 169, 0.5)",
    "rgba(205, 205, 52, 0.5)",
    "rgba(148, 201, 33, 0.5)",
    "rgba(58, 40, 196, 0.5)",
    "rgba(78, 78, 221, 0.5)",
    "rgba(13, 13, 220, 0.5)",
    "rgba(182, 46, 167, 0.5)",
    "rgba(93, 171, 33, 0.5)",
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
