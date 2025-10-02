import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { navLinks, navSocials } from "@/public/constants/nav";

const About = () => {
  return (
    <div className="page-container flex flex-col border-3">
      <Navbar config={navLinks} socials={navSocials} />
      <div className="content-container"></div>
      <Footer />
    </div>
  );
};

export default About;
