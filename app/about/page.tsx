import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { navLinks } from "@/public/constants/nav";

const About = () => {
  return (
    <div className="flex flex-col items-center gap-5 min-h-screen pb-5">
      <Navbar config={navLinks} />
      <PageHeader title="Want to know about us?" subtitle="Here's our story" />
      <main className="flex-grow"></main>
      <Footer />
    </div>
  );
};

export default About;
