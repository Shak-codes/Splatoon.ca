import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

const Events = () => {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-20">
      <Navbar config={navLinks} />
      <Footer />
    </div>
  );
};

export default Events;
