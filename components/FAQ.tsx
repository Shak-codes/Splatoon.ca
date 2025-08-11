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
    <main className="flex flex-col justify-center items-center gap-5">
      <section className="text-center w-[50%] p-5 bg-black/50 rounded-2xl">
        <h4 className="text-xl text-white font-thin">
          Need clarification on anything? Below is a list of the most commonly
          asked questions that we receive.
        </h4>
      </section>
      <section className="rounded-2xl bg-white/90 text-black p-6 w-[50%] minw-[800px] transition-all duration-300 ease-in-out">
        {faqData.map((section, sidx) => {
          return (
            <div className="mx-auto w-full transition-all duration-300 ease-in-out">
              <h3 className="!text-[var(--secondary-background)] text-2xl font-black p-5 pb-0">
                {section.section.toUpperCase()}
              </h3>
              {section.faqs.map((faq, fidx) => {
                const isOpen = open.has(`${sidx}-${fidx}`);
                return (
                  <div key={`${sidx}-${fidx}`} className="border-b p-5">
                    <button
                      onClick={() => toggle(sidx, fidx)}
                      className="w-full text-left flex justify-between items-center focus:outline-none cursor-pointer"
                    >
                      <span className="!text-[var(--secondary-background)] text-lg font-bold flex-1 min-w-0 pr-4">
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
                      <p className="!text-[var(--secondary-background)] text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
      <section className="flex flex-col gap-2 text-center w-[50%] bg-black/50 rounded-2xl p-5">
        <h2 className="text-3xl text-white font-bold">
          Can't find your question?
        </h2>
        <h4 className="text-xl text-white font-thin">
          Don't stress over it, sometimes the best questions haven't been asked
          yet. Ask us in our Discord server and we'll be happy to help!
        </h4>
      </section>
    </main>
  );
};

export default FAQ;
