'use client';

import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">
          <button
            onClick={() => toggle(faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition"
          >
            <span className="font-semibold text-lg text-white">{faq.question}</span>
            <svg
              className={`w-6 h-6 text-accent transition-transform flex-shrink-0 ml-4 ${
                openId === faq.id ? 'rotate-45' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {openId === faq.id && (
            <div className="px-6 pb-4 text-white/80">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
