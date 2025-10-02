"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";
import DiagonalGallery from "@/components/DiagonalGallery";
import { useBreakpoint } from "@/utils/useBreakpoint";

export default function Home() {
  const bp = useBreakpoint();
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

  const images = Array.from(
    { length: count },
    (_, i) => `/squidsocial/${i + 1}.png`
  );

  console.log("Images: ", images);
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-1">
      <Navbar config={navLinks} socials={navSocials} />
      <main className="flex flex-grow flex-col justify-center align-center gap-1 border-2 border-white">
        <DiagonalGallery images={images} />
        <section className="z-10"></section>
      </main>
      <Footer />
    </div>
  );
}
