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
    <main className="flex-grow space-y-5 w-[50%] min-w-[300px] max-w-[800px]">
      <section className="text-center p-5 bg-black/50 rounded-2xl">
        <Typography>
          Need clarification on anything? Below is a list of the most commonly
          asked questions that we receive.
        </Typography>
      </section>
      <section className="rounded-2xl bg-white/90 text-black p-5 transition-all duration-300 ease-in-out">
        {faqData.map((section, sidx) => {
          return (
            <div className="mx-auto w-full transition-all duration-300 ease-in-out">
              <Typography
                variant="sectionTitle"
                size="text-lg"
                className="!text-[var(--secondary-background)] p-5 pb-0"
              >
                {section.section}
              </Typography>
              {section.faqs.map((faq, fidx) => {
                const isOpen = open.has(`${sidx}-${fidx}`);
                return (
                  <div key={`${sidx}-${fidx}`} className="border-b px-5 py-8">
                    <Typography
                      variant="sectionSubtitle"
                      size="text-base"
                      className="!text-[var(--secondary-background)]"
                    >
                      <button
                        onClick={() => toggle(sidx, fidx)}
                        className="w-full text-left flex justify-between items-center focus:outline-none cursor-pointer"
                      >
                        {faq.question}
                        <span
                          className={`leading-[0] transform transition-transform duration-300 ease-in-out text-xl ${
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
                        size="text-sm"
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
      <section className="flex flex-col gap-2 text-center bg-black/50 rounded-2xl p-5">
        <Typography variant="sectionTitle" size="text-lg">
          Can't find your question?
        </Typography>
        <Typography>
          Don't stress over it, sometimes the best questions haven't been asked
          yet. Ask us in our Discord server and we'll be happy to help!
        </Typography>
      </section>
    </main>
  );
};

export default FAQ;
