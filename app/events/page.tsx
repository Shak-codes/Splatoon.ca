import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader";
import { navLinks, navSocials } from "@/public/constants/nav";

const Events = () => {
  return (
    <div className="flex flex-col items-center gap-5 min-h-screen pb-5">
      <Navbar config={navLinks} socials={navSocials} />
      {/* <PageHeader
        title="Ready to join us?"
        subtitle="Here's what you need to know"
      /> */}
      <main className="w-full flex flex-grow justify-center items-center">
        <EventHeader date="Sunday September 7th" location="558 Yonge Street" />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
