import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventHeader from "@/components/EventHeader";
import PageHeader from "@/components/PageHeader";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

const Events = () => {
  return (
    <div className="flex flex-col items-center gap-10 min-h-screen pb-5">
      <Navbar config={navLinks} />
      <PageHeader
        title="Ready to join us?"
        subtitle="Here's what you need to know"
      />
      <main className="flex-grow">
        <EventHeader />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
