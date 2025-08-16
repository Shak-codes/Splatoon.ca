import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { navLinks } from "@/public/constants/nav";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-5">
      <Navbar config={navLinks} />
      <main className="flex flex-grow"></main>
      <Footer />
    </div>
  );
}
