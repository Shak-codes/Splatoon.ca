import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { navLinks, navSocials } from "@/public/constants/nav";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Splatoon Toronto events — venue access, parking, skill levels, what to bring, and more for our Splatoon 3 meetups.",
  alternates: { canonical: "/faq" },
};

const testFAQ = [
  {
    section: "Accessing the venue",
    faqs: [
      {
        question: "Is there parking near the venue?",
        answer: (
          <>
            <p>
              Yes, multiple parking options are located within a 5-minute walk
              of Woodsworth College:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Rotman Garage (107 St George St): $4/half-hour, $20 daily max,
                $10 evening/weekend flat rate (1-min walk).
              </li>
              <li>
                371 Bloor St W Lot: $4/half-hour, $13 daily max, $7 weekend flat
                rate (4-min walk).
              </li>
              <li>
                Street Parking: Metered spots available directly on St. George
                Street.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Do I have to show up at noon?",
        answer:
          "Feel free to join us at any time. We usually stop playing matches around 5 to sign posters and take pictures though so don't be too late!",
      },
    ],
  },
  {
    section: "About the event",
    faqs: [
      {
        question: "What skill level do I need to be to participate?",
        answer:
          "There are absolutely no skill level requirements to participate in our events. We run both competitive and casual matches during our events so all skill levels will be able to enjoy!",
      },
      {
        question: "Is food allowed in the venue?",
        answer:
          "Yes, food is allowed in the venue. Please ensure to clean up after yourself.",
      },
      {
        question:
          "Can my parents attend? If so, do they have to pay the entry fee?",
        answer:
          "Parents are free to attend and they do not have to pay the entry fee as long as they're not playing.",
      },

      {
        question: "Should I bring my Switch 1 or Switch 2?",
        answer:
          "Please bring one of your Switch 1 or Switch 2. It doesn't matter which console you bring, just that you bring one with a copy of Splatoon 3.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] min-h-screen gap-5 justify-items-center">
      <Navbar config={navLinks} socials={navSocials} />
      <header aria-labelledby="faq-heading">
        <Header
          variant="header"
          size="page-header"
          title="FAQ"
          className="text-center"
        />
      </header>
      <FAQ faqData={testFAQ} />
      <Footer />
    </div>
  );
};

export default FAQPage;
