"use client";
import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "visa" | "tours" | "umrah" | "general";
}

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "Do you arrange the flights?",
      answer:
        "Yes, all our packages include return flights from major UAE airports, ensuring a seamless travel experience from start to finish.",
      category: "general",
    },
    {
      id: 2,
      question: "Are the hotels central/close to attractions?",
      answer:
        "Yes, we carefully select hotels that are centrally located and close to major attractions, offering both comfort and convenience.",
      category: "general",
    },
    {
      id: 3,
      question: "Do you help with visa applications?",
      answer:
        "Yes, we provide full support for visa applications, including USA, UK, Schengen, Canada, Australia, and New Zealand. Our team guides you through the entire process.",
      category: "visa",
    },
    {
      id: 4,
      question: "Can I book for solo travellers or families?",
      answer:
        "Yes, our packages are flexible and can be tailored for solo travelers, families, or groups, ensuring everyone enjoys a smooth and memorable journey.",
      category: "tours",
    },
    {
      id: 5,
      question: "Do you offer installment payment options?",
      answer:
        "Yes, we offer easy installment plans. You can secure your booking with a small deposit and pay the remaining amount through flexible installments before departure.",
      category: "general",
    },
  ];

  const filteredFaqs = faqs;

  const toggleFaq = (faqId: number) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <section className="relative py-16 px-4 bg-white" id="faq">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#FF4E00" }}
          >
            Frequently Asked Questions.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "black" }}>
            Can&apos;t find an answer? Call us at +971 54 786 1293 or email
            info@radiantwaytravel.com!
          </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* FAQ List */}
          <div className="w-full">
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 pb-3 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left flex items-center justify-between py-2"
                    aria-expanded={openFaq === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <h3
                      className="text-lg font-semibold pr-4"
                      style={{ color: "black" }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{ borderColor: "black" }}
                    >
                      {openFaq === faq.id ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "black" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "black" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={openFaq !== faq.id}
                  >
                    <div className="pt-2">
                      <p className="leading-relaxed" style={{ color: "black" }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
