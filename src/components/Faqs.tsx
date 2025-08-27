'use client';
import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'visa' | 'tours' | 'umrah' | 'general';
}

export default function Faqs() {
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set([0]));
  const [activeCategory, setActiveCategory] = useState<'all' | 'visa' | 'tours' | 'umrah' | 'general'>('all');

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'What types of visa services do you offer?',
      answer: 'We offer a comprehensive range of visa services including tourist visas, business visas, student visas, and work visas for various countries worldwide. Our services cover visa application assistance, document preparation, and follow-up support.',
      category: 'visa'
    },
    {
      id: 2,
      question: 'How long does the visa application process take?',
      answer: 'Processing times vary by country and visa type. Tourist visas typically take 5-15 business days, while business and work visas may take 2-8 weeks. We provide estimated timelines during consultation and keep you updated throughout the process.',
      category: 'visa'
    },
    {
      id: 3,
      question: 'What documents are required for visa applications?',
      answer: 'Required documents typically include a valid passport (with at least 6 months validity), recent passport-sized photos, completed application forms, travel itinerary, financial statements, employment letter, and accommodation details. Specific requirements vary by destination country.',
      category: 'visa'
    },
    {
      id: 4,
      question: 'Do you offer group tour packages?',
      answer: 'Yes! We offer special group tour packages with discounted rates for groups of 6 or more travelers. Our group packages include custom itineraries, dedicated tour guides, and exclusive group experiences. Contact us for personalized group arrangements.',
      category: 'tours'
    },
    {
      id: 5,
      question: 'What is included in your tour packages?',
      answer: 'Our comprehensive tour packages include premium accommodation, daily breakfast and selected meals, airport transfers, professional guided tours, entrance fees to attractions, comfortable transportation between destinations, and 24/7 travel support.',
      category: 'tours'
    },
    {
      id: 6,
      question: 'Can you customize tour itineraries?',
      answer: 'Absolutely! We specialize in creating personalized travel experiences tailored to your interests, budget, and travel style. Whether you prefer luxury, adventure, cultural immersion, or family-friendly activities, we design custom itineraries just for you.',
      category: 'tours'
    },
    {
      id: 7,
      question: 'Can you arrange Umrah packages?',
      answer: 'Yes, we specialize in Umrah packages throughout the year, including peak seasons like Ramadan. We work with trusted partners in Saudi Arabia to provide authentic experiences, comfortable accommodations near the Haram, and knowledgeable guides.',
      category: 'umrah'
    },
    {
      id: 8,
      question: 'What is included in Umrah packages?',
      answer: 'Our Umrah packages include visa processing, round-trip flights, hotel accommodation near the Haram, airport transfers, guidance throughout the pilgrimage, and optional add-ons like Ziyarah tours to historical Islamic sites.',
      category: 'umrah'
    },
    {
      id: 9,
      question: 'Do you provide travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, flight delays, and emergency evacuation. Our insurance plans are designed to give you peace of mind during your travels.',
      category: 'general'
    },
    {
      id: 10,
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2-3 months in advance for international tours, 4-6 weeks for visa services, and 6-12 months for Umrah packages during peak seasons. Early booking ensures better rates and availability.',
      category: 'general'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', count: faqs.length },
    { id: 'visa', name: 'Visa Services', count: faqs.filter(f => f.category === 'visa').length },
    { id: 'tours', name: 'Tour Packages', count: faqs.filter(f => f.category === 'tours').length },
    { id: 'umrah', name: 'Umrah Services', count: faqs.filter(f => f.category === 'umrah').length },
    { id: 'general', name: 'General Info', count: faqs.filter(f => f.category === 'general').length }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (faqId: number) => {
    const newOpenFaqs = new Set(openFaqs);
    if (newOpenFaqs.has(faqId)) {
      newOpenFaqs.delete(faqId);
    } else {
      newOpenFaqs.add(faqId);
    }
    setOpenFaqs(newOpenFaqs);
  };

  const toggleAllFaqs = () => {
    if (openFaqs.size === filteredFaqs.length) {
      setOpenFaqs(new Set());
    } else {
      setOpenFaqs(new Set(filteredFaqs.map(f => f.id)));
    }
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
            Frequently Asked Questions
          </h2>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? 'rgba(0, 140, 149, 1)' : 'transparent',
                color: activeCategory === category.id ? 'white' : 'rgba(0, 140, 149, 1)'
              }}
            >
              {category.name}
                             <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                 activeCategory === category.id
                   ? 'text-white'
                   : 'text-white'
               }`}
               style={{
                 backgroundColor: activeCategory === category.id ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 140, 149, 0.2)',
                 color: activeCategory === category.id ? 'rgba(0, 140, 149, 1)' : 'rgba(0, 140, 149, 1)'
               }}>
                 {category.count}
               </span>
            </button>
          ))}
        </div>

        {/* Toggle All Button */}
        <div className="text-center mb-6">
          <button
            onClick={toggleAllFaqs}
            className="font-medium text-sm underline hover:opacity-80 transition-opacity duration-200"
            style={{ color: 'rgba(0, 140, 149, 1)' }}
          >
            {openFaqs.size === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openFaqs.has(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-lg font-semibold pr-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  {faq.question}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: 'rgba(0, 140, 149, 0.8)' }}>
                    {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openFaqs.has(faq.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'rgba(0, 140, 149, 1)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqs.has(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={!openFaqs.has(faq.id)}
              >
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="leading-relaxed" style={{ color: 'rgba(0, 140, 149, 1)', opacity: 0.8 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
