"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import DiagonalGallery from "@/components/DiagonalGallery";
import { useBreakpoint } from "@/utils/useBreakpoint";
import clsx from "clsx";

export default function Home() {
  const bp = useBreakpoint();
  const [ready, setReady] = useState(false);

  const count =
    bp === "3xl"
      ? 14
      : bp === "2xl"
      ? 12
      : bp === "xl"
      ? 10
      : bp === "lg"
      ? 8
      : bp === "md"
      ? 6
      : 4;

  useEffect(() => {
    setReady(false);
  }, [count]);

  const images = Array.from(
    { length: count },
    (_, i) => `/squidsocial/${i + 1}.webp`
  );

  return (
    <div className="relative min-h-screen">
      {!ready && <p className="text-white text-xl animate-pulse">Loading…</p>}
      <div
        className={clsx(
          "font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen",
          ready ? "opacity-100" : "opacity-0"
        )}
        aria-hidden={!ready}
      >
        <Navbar config={navLinks} socials={navSocials} />
        <main className="flex flex-grow flex-col justify-center align-center gap-1">
          <DiagonalGallery images={images} onReady={() => setReady(true)} />
          <section className="z-10" />
        </main>
        <Footer />
      </div>
    </div>
  );
}
