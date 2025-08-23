'use client';
import { useState } from 'react';

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does visa processing take?',
      answer: 'Processing times vary by country and visa type, typically 5-15 business days.',
    },
    {
      question: 'What documents do I need for a visa?',
      answer: 'Requirements vary by country, but generally include passport, photos, and application forms.',
    },
    {
      question: 'Do you offer group tour discounts?',
      answer: 'Yes, we offer special rates for groups of 6 or more travelers.',
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Frequently Asked Questions</h2>
        <p className="text-center text-lg text-gray-600 mb-10">TOP 10 FAQS</p>
        <div className="divide-y divide-gray-300 border-t border-b border-gray-300">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full flex items-center justify-between py-6 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </span>
                <span className="ml-4">
                  {openIndex === index ? (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
                  ) : (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="pb-6 pl-1 pr-2 text-gray-700 text-base animate-fadeIn"
                  style={{ animation: 'fadeIn 0.3s' }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
