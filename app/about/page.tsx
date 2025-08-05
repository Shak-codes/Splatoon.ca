import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

const About = () => {
  return (
    <div className="flex flex-col items-center gap-10 min-h-screen pb-5">
      <Navbar config={navLinks} />
      <PageHeader title="Want to know about us?" subtitle="Here's our story" />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
};

export default About;
