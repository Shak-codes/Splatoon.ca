"use client";

import { useState } from "react";

type FAQItem = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
};

type FAQProps = {
  faqs: FAQItem[];
};

const FAQ = ({ faqs }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-black py-12 px-6 w-[800px] transition-all duration-300 ease-in-out">
      <div className="mx-auto w-full transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 w-full transition-all duration-300 ease-in-out">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id ?? index}
                className={`
                  bg-gray-100 rounded-2xl shadow-sm
                  transition-all duration-300 ease-in-out
                  overflow-hidden
                  ${isOpen ? "max-h-[500px]" : "max-h-[72px]"}
                `}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium flex-1 min-w-0 pr-4">
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
                    px-5 pb-5 w-full
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "opacity-100" : "opacity-0 h-0"}
                  `}
                >
                  <p className="text-base leading-relaxed break-words">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
