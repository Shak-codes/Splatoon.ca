import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader/EventHeader";
import { navLinks, navSocials } from "@/public/constants/nav";

const Events = () => {
  return (
    <div className="flex flex-col items-center gap-1 min-h-screen pb-1">
      <Navbar config={navLinks} socials={navSocials} />
      <main className="main-container w-full flex flex-grow justify-center items-center">
        <EventHeader date="Sunday September 28th" location="558 Yonge Street" />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
