import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
      <EventHeader />
      <Footer />
    </div>
  );
};

export default Events;
