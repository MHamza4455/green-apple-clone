'use client';
import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'visa' | 'tours' | 'umrah' | 'general';
}

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'visa' | 'tours' | 'umrah' | 'general'>('all');

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'What if I just had renovation work done?',
      answer: 'We can handle post-renovation cleaning! Our deep cleaning services are perfect for removing construction dust, debris, and residue. We recommend waiting at least 24-48 hours after renovation work is completed before scheduling your cleaning appointment.',
      category: 'general'
    },
    {
      id: 2,
      question: 'Do I get a discount if I\'m a frequent customer?',
      answer: 'Yes! We offer loyalty discounts for repeat customers. After your third cleaning, you\'ll automatically receive 10% off future bookings. We also have special packages for weekly or bi-weekly cleaning schedules with additional savings.',
      category: 'general'
    },
    {
      id: 3,
      question: 'Can I give specific instructions to the cleaners and ask for special requests?',
      answer: 'Yes, special instructions can be left for the cleaning professional when you schedule your appointment online. After the clean is complete, you can rate your MyClean experience and update your special instructions if you want something cleaned differently.',
      category: 'general'
    },
    {
      id: 4,
      question: 'What if I don\'t have a mop, bucket, or vacuum?',
      answer: 'No worries! Our cleaning professionals bring all the necessary equipment and supplies. This includes professional-grade vacuums, mops, cleaning solutions, and microfiber cloths. You don\'t need to provide any cleaning supplies.',
      category: 'general'
    },
    {
      id: 5,
      question: 'Do you clean offices and other commercial spaces?',
      answer: 'Absolutely! We offer comprehensive commercial cleaning services for offices, retail spaces, medical facilities, and other commercial properties. Our commercial cleaning packages can be customized to your business needs and schedule.',
      category: 'general'
    },
    {
      id: 6,
      question: 'What types of visa services do you offer?',
      answer: 'We offer a comprehensive range of visa services including tourist visas, business visas, student visas, and work visas for various countries worldwide. Our services cover visa application assistance, document preparation, and follow-up support.',
      category: 'visa'
    },
    {
      id: 7,
      question: 'How long does the visa application process take?',
      answer: 'Processing times vary by country and visa type. Tourist visas typically take 5-15 business days, while business and work visas may take 2-8 weeks. We provide estimated timelines during consultation and keep you updated throughout the process.',
      category: 'visa'
    },
    {
      id: 8,
      question: 'Do you offer group tour packages?',
      answer: 'Yes! We offer special group tour packages with discounted rates for groups of 6 or more travelers. Our group packages include custom itineraries, dedicated tour guides, and exclusive group experiences. Contact us for personalized group arrangements.',
      category: 'tours'
    },
    {
      id: 9,
      question: 'What is included in your tour packages?',
      answer: 'Our comprehensive tour packages include premium accommodation, daily breakfast and selected meals, airport transfers, professional guided tours, entrance fees to attractions, comfortable transportation between destinations, and 24/7 travel support.',
      category: 'tours'
    },
    {
      id: 10,
      question: 'Can you arrange Umrah packages?',
      answer: 'Yes, we specialize in Umrah packages throughout the year, including peak seasons like Ramadan. We work with trusted partners in Saudi Arabia to provide authentic experiences, comfortable accommodations near the Haram, and knowledgeable guides.',
      category: 'umrah'
    },
    {
      id: 11,
      question: 'What is included in Umrah packages?',
      answer: 'Our Umrah packages include visa processing, round-trip flights, hotel accommodation near the Haram, airport transfers, guidance throughout the pilgrimage, and optional add-ons like Ziyarah tours to historical Islamic sites.',
      category: 'umrah'
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
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
          Frequently Asked Questions.
          </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(0, 140, 149, 1)' }}>
             Can&apos;t find an answer? Call us at (855) 692-5326 or email contact@myclean.com!
           </p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as typeof activeCategory)}
                                         className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                       activeCategory === category.id
                         ? 'text-white shadow-md'
                         : 'hover:bg-gray-50'
                     }`}
                                          style={{
                       backgroundColor: activeCategory === category.id ? 'rgba(0, 140, 149, 1)' : 'transparent',
                       color: activeCategory === category.id ? 'white' : 'rgba(0, 140, 149, 1)'
                     }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         activeCategory === category.id
                           ? 'text-gray-700 bg-white bg-opacity-20'
                           : 'text-gray-500 bg-gray-100'
                       }`}>
                         {category.count}
                       </span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

                                           {/* Right Side - FAQ List */}
            <div className="lg:w-3/4">
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border-b border-gray-200 pb-3 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-center justify-between py-2 hover:opacity-80 transition-opacity duration-200"
                      aria-expanded={openFaq === faq.id}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <h3 className="text-lg font-semibold pr-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                        {faq.question}
                      </h3>
                        <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:border-gray-400" style={{ borderColor: 'rgba(0, 140, 149, 0.3)' }}>
                         {openFaq === faq.id ? (
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                           </svg>
                         ) : (
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                           </svg>
                         )}
                       </span>
                    </button>
                    
                    <div
                      id={`faq-answer-${faq.id}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                      aria-hidden={openFaq !== faq.id}
                    >
                      <div className="pt-2">
                                                 <p className="leading-relaxed" style={{ color: 'rgba(0, 140, 149, 1)' }}>
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
