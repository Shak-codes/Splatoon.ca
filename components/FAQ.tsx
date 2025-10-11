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
      const key = `${sidx}-${fidx}`;
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  return (
    <main className="flex-grow space-y-5 w-[50%] min-w-[300px] max-w-[800px]">
      <section className="text-center p-5 bg-black/50 rounded-lg">
        <Typography>
          Need clarification on anything? Below is a list of the most commonly
          asked questions that we receive.
        </Typography>
      </section>

      <section className="rounded-lg bg-black/60 space-y-4 p-5 transition-all duration-300 ease-in-out">
        {faqData.map((section, sidx) => (
          <div
            key={sidx}
            className="mx-auto space-y-2 w-full transition-all duration-300 ease-in-out"
          >
            <Typography variant="sectionTitle" size="text-lg">
              {section.section}
            </Typography>

            {section.faqs.map((faq, fidx) => {
              const isOpen = open.has(`${sidx}-${fidx}`);
              return (
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(sidx, fidx)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggle(sidx, fidx)
                  }
                  className="border-gray-200 rounded-lg border px-4 py-6 hover:border-[var(--background)] hover:bg-[var(--background)]/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] transition-all duration-300 ease-in-out"
                >
                  <Typography
                    variant="sectionSubtitle"
                    size="text-base"
                    className="w-full text-left flex justify-between items-center"
                  >
                    {faq.question}
                    <span
                      className={`leading-[0] transform transition-transform duration-300 ease-in-out text-xl ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </Typography>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[500px] opacity-100 mt-4 pb-1"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <Typography variant="paragraph" size="text-sm">
                      {faq.answer}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2 text-center bg-black/50 rounded-2xl p-5">
        <Typography variant="sectionTitle" size="text-lg">
          Can&apos;t find your question?
        </Typography>
        <Typography>
          Don&apos;t stress over it, sometimes the best questions haven&apos;t
          been asked yet. Ask us in our Discord server and we&apos;ll be happy
          to help!
        </Typography>
      </section>
    </main>
  );
};

export default FAQ;
