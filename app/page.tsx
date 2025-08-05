import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-5">
      <Navbar config={navLinks} />
      <Footer />
    </div>
  );
}
