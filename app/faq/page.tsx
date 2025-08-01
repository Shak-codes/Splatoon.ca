import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Events", href: "/events" },
  { title: "Connect", href: "/connect" },
  { title: "FAQ", href: "/faq" },
];

const testFAQ = [
  {
    question: "What skill level do I need to be to participate?",
    answer:
      "There are absolutely no skill level requirements to participate in our events. We run both competitive and casual matches during our events so all skill levels will be able to enjoy!",
  },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
  { question: "What should I bring?", answer: "Bring XYZ!" },
];

const FAQPage = () => {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-20">
      <Navbar config={navLinks} />
      <Footer />
      <FAQ faqs={testFAQ} />
    </div>
  );
};

export default FAQPage;
