"use client";

import { useState } from "react";

type FAQItem = {
  id?: string;
  question: string;
  answer: string;
};

type FAQSection = {
  section: string;
  faqs: FAQItem[];
};

type FAQProps = {
  faqData: FAQSection[];
};

const FAQ = ({ faqData }: FAQProps) => {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (sidx: number, fidx: number) => {
    setOpen((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(`${sidx}-${fidx}`)) {
        newSet.delete(`${sidx}-${fidx}`);
      } else {
        newSet.add(`${sidx}-${fidx}`);
      }
      return newSet;
    });
  };

  return (
    <section className="rounded-2xl bg-white text-black py-12 px-6 w-[800px] transition-all duration-300 ease-in-out">
      <h4 className="">
        Below is a list of the most commonly asked questions that we get.
        Hopefully this helps answer some of your questions! In the case that it
        doesn't, feel free to join our
        <a href=""> Discord</a> and ask us directly.
      </h4>
      {faqData.map((section, sidx) => {
        return (
          <div className="mx-auto w-full transition-all duration-300 ease-in-out">
            <h3 className="text-2xl font-bold p-5 pb-0">{section.section}</h3>
            {section.faqs.map((faq, fidx) => {
              const isOpen = open.has(`${sidx}-${fidx}`);
              return (
                <div key={`${sidx}-${fidx}`} className="border-b p-5">
                  <button
                    onClick={() => toggle(sidx, fidx)}
                    className="w-full text-left flex justify-between items-center focus:outline-none cursor-pointer"
                  >
                    <span className="text-xl font-medium flex-1 min-w-0 pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`transform transition-transform duration-300 ease-in-out text-2xl ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`
                        transition-all duration-300 ease-in-out overflow-hidden
                        ${
                          isOpen
                            ? "max-h-[500px] opacity-100 mt-4 pb-1"
                            : "max-h-0 opacity-0"
                        }
                      `}
                  >
                    <p className="text-lg">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default FAQ;
