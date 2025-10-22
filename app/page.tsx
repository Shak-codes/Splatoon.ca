"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import DiagonalGallery from "@/components/DiagonalGallery";
import { useBreakpoint } from "@/utils/useBreakpoint";
import Image from "next/image";
import Subtitle from "@/components/Subtitle";
import { SQUIDSOCIAL_IMGS } from "./constants";

export default function Home() {
  const bp = useBreakpoint();

  const count =
    bp === "5xl"
      ? 18
      : bp === "4xl"
      ? 16
      : bp === "3xl"
      ? 14
      : bp === "2xl"
      ? 12
      : bp === "xl"
      ? 10
      : bp === "lg"
      ? 8
      : 6;
  const images = SQUIDSOCIAL_IMGS.slice(0, count);

  return (
    <div className="relative min-h-screen overflow-clip">
      <div
        className={
          "font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen"
        }
      >
        <Navbar config={navLinks} socials={navSocials} />
        <main className="flex flex-grow flex-col justify-center items-center gap-1">
          <DiagonalGallery images={images} />
          <section
            className="
              absolute
              flex flex-col justify-center items-center
              min-w-[300px] max-w-[550px]
              top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2
            "
          >
            <Image
              src="/SplatoonToronto.webp"
              alt="Splatoon Toronto Logo"
              width={2048}
              height={1816}
              sizes="(max-width: 360px) 300px,
                    (max-width: 640px) 400px,
                    (max-width: 1024px) 500px,
                    550px"
              className="h-auto"
            />
            <Subtitle
              subtitle="Grassroots Splatoon in Toronto"
              className="w-full mt-[-15%]"
            />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
