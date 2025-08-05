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
  {
    question: "Is food allowed in the venue?",
    answer:
      "Invictus doesn't allow any outside food or drinks inside the venue aside from a water bottle. That being said, Invictus does sell their own food and drinks within the venue.",
  },
  {
    question:
      "Can my parents attend? If so, do they have to pay the entry fee?",
    answer:
      "Parents are free to attend and they do not have to pay the entry fee as long as they're not playing.",
  },
  {
    question: "Does Invictus have on-site parking?",
    answer:
      "Invictus does not have on-site parking, however, there are many parking garages around the area.",
  },
  {
    question: "Should I bring my Switch 1 or Switch 2?",
    answer:
      "Please bring one of your Switch 1 or Switch 2. It doesn't matter which console you bring, just that you bring one with a copy of Splatoon 3.",
  },
  {
    question: "Do I have to show up at noon?",
    answer:
      "Feel free to join us at any time. We usually stop pllaying matches around 5 to sign posters and take pictures though so don't be too late!",
  },
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
