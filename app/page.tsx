"use client";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import DiagonalGallery from "@/components/DiagonalGallery";
import { useBreakpoint } from "@/utils/useBreakpoint";
import clsx from "clsx";

export default function Home() {
  const bp = useBreakpoint();

  const count =
    bp === "5xl"
      ? 16
      : bp === "4xl"
      ? 14
      : bp === "3xl"
      ? 12
      : bp === "2xl"
      ? 10
      : bp === "xl"
      ? 8
      : bp === "lg"
      ? 6
      : 4;
  const images = useMemo(
    () => Array.from({ length: count }, (_, i) => `/squidsocial/${i + 1}.webp`),
    [count]
  );

  return (
    <div className="relative min-h-screen">
      <div
        className={
          "font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen"
        }
      >
        <Navbar config={navLinks} socials={navSocials} />
        <main className="flex flex-grow flex-col justify-center align-center gap-1">
          <DiagonalGallery images={images} />
          <section className="z-10" />
        </main>
        <Footer />
      </div>
    </div>
  );
}
