"use client";

import { useState } from "react";
import Typography from "./Typography/Typography";

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
    <main className="flex flex-col justify-center items-center gap-5">
      <section className="text-center w-[50%] p-5 bg-black/50 rounded-2xl">
        <Typography variant="paragraph">
          Need clarification on anything? Below is a list of the most commonly
          asked questions that we receive.
        </Typography>
      </section>
      <section className="rounded-2xl bg-white/90 text-black p-5 w-[50%] minw-[600px] transition-all duration-300 ease-in-out">
        {faqData.map((section, sidx) => {
          return (
            <div className="mx-auto w-full transition-all duration-300 ease-in-out">
              <Typography
                variant="sectionTitle"
                className="!text-[var(--secondary-background)] p-5 pb-0"
              >
                {section.section}
              </Typography>
              {section.faqs.map((faq, fidx) => {
                const isOpen = open.has(`${sidx}-${fidx}`);
                return (
                  <div key={`${sidx}-${fidx}`} className="border-b p-5">
                    <Typography
                      variant="sectionSubtitle"
                      className="!text-[var(--secondary-background)]"
                    >
                      <button
                        onClick={() => toggle(sidx, fidx)}
                        className="w-full text-left flex justify-between items-center focus:outline-none cursor-pointer"
                      >
                        {faq.question}
                        <span
                          className={`transform transition-transform duration-300 ease-in-out text-xl ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </Typography>
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
                      <Typography
                        variant="paragraph"
                        className="!text-[var(--secondary-background)]"
                      >
                        {faq.answer}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
      <section className="flex flex-col gap-2 text-center w-[50%] bg-black/50 rounded-2xl p-5">
        <Typography variant="sectionTitle">
          Can't find your question?
        </Typography>
        <Typography variant="paragraph">
          Don't stress over it, sometimes the best questions haven't been asked
          yet. Ask us in our Discord server and we'll be happy to help!
        </Typography>
      </section>
    </main>
  );
};

export default FAQ;
