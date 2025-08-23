'use client';
import { useState, useEffect } from 'react';

export default function Faqs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const faqs = [
    {
      question: 'What types of visa services do you offer?',
      answer: 'We offer a wide range of visa services including tourist and business visas for various countries.',
    },
    {
      question: 'How long does the visa application process take?',
      answer: 'The processing time for visa applications varies depending on the country and type of visa. However, we work diligently to ensure that your application is processed as quickly as possible.',
    },
    {
      question: 'Do I need to make an appointment for visa services?',
      answer: 'No, you do not need to make an appointment. You can visit us during our business hours and our team will be happy to assist you.',
    },
    {
      question: 'What documents are required for visa applications?',
      answer: 'Required documents typically include valid passport, recent photos, application forms, travel itinerary, and financial statements. Specific requirements vary by country.',
    },
    {
      question: 'Do you offer group tour packages?',
      answer: 'Yes! We offer special group tour packages with discounted rates for groups of 6 or more travelers. Contact us for custom group arrangements.',
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Our tour packages include accommodation, daily breakfast, airport transfers, guided tours, entrance fees, and transportation between destinations.',
    },
    {
      question: 'Can you arrange Umrah packages?',
      answer: 'Yes, we specialize in Umrah packages throughout the year, including peak seasons. We work with trusted partners in Saudi Arabia.',
    },
    {
      question: 'Do you provide travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, and flight delays.',
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2-3 months in advance for international tours and 4-6 weeks for visa services.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, credit/debit cards, and cash payments. We also offer flexible payment plans for larger packages.',
    },
    {
      question: 'Can you customize tour itineraries?',
      answer: 'Absolutely! We specialize in creating personalized travel experiences based on your interests, budget, and travel style.',
    },
    {
      question: 'What happens if my visa is rejected?',
      answer: 'In case of visa rejection, we provide detailed feedback and guide you through the reapplication process with alternative solutions.',
    },
    {
      question: 'Do you offer airport pickup services?',
      answer: 'Yes, we provide airport pickup and drop-off services for all our tour packages to ensure a hassle-free travel experience.',
    },
    {
      question: 'Can you arrange special dietary requirements?',
      answer: 'Absolutely! We can accommodate special dietary requirements including halal, vegetarian, and other specific needs.',
    },
    {
      question: 'What languages do your guides speak?',
      answer: 'Our guides speak multiple languages including English, Arabic, and other local languages depending on the destination.',
    },
    {
      question: 'Do you offer 24/7 customer support?',
      answer: 'Yes, we provide 24/7 customer support to assist you with any questions or emergencies during your trip.',
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      const totalSlides = Math.ceil(faqs.length / cardsPerSlide);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cardsPerSlide, faqs.length]);

  // Update cards per slide on window resize
  useEffect(() => {
    const updateCardsPerSlide = () => {
      const newCardsPerSlide = window.innerWidth < 768 ? 1 : 3;
      setCardsPerSlide(newCardsPerSlide);
      if (newCardsPerSlide !== cardsPerSlide) {
        setCurrentSlide(0); // Reset to first slide when changing layout
      }
    };

    // Set initial value
    updateCardsPerSlide();

    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, [cardsPerSlide]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    const totalSlides = Math.ceil(faqs.length / cardsPerSlide);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const totalSlides = Math.ceil(faqs.length / cardsPerSlide);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const getCurrentCards = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return faqs.slice(startIndex, startIndex + cardsPerSlide);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative py-12 px-4" style={{ backgroundColor: 'rgba(0, 118, 111, 0.05)' }}>
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: 'url(/images/whyUs/bgdesign1_ynysgv.png)',
          WebkitMaskImage: 'url(/images/whyUs/bgdesign1_ynysgv.png)',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          backgroundColor: 'rgba(0, 118, 111, 1)'
        }}
      ></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <h2 className="text-[rgba(0,87,82,1)] text-4xl sm:text-5xl font-bold mb-4" style={{ opacity: 0.9 }}>
            Frequently Asked Questions
          </h2>
          <p className="text-[rgba(0,87,82,1)] text-xl max-w-3xl mx-auto" style={{ opacity: 0.9 }}>
            Get answers to the most common questions about our services
          </p>
        </header>

        {/* FAQs Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 -ml-6 items-center justify-center"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 87, 82, 1)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

              <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 -mr-6 items-center justify-center"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 87, 82, 1)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
              </button>

          {/* Cards Container */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getCurrentCards().map((faq, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-start border border-gray-100 hover:border-primary/20 group"
              >
                <div className="text-primary mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
                  <svg className="w-8 h-8" style={{ color: 'rgba(0,87,82,1)', opacity: 0.9 }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                  </svg>
                </div>
                <h3 className="text-[rgba(0,87,82,1)] text-base sm:text-lg font-bold text-left uppercase text-primary mb-3" style={{ opacity: 0.9 }}>
                  {faq.question}
                </h3>
                <p className="text-[rgba(0,87,82,1)] text-sm text-primary text-left text-opacity-80 leading-relaxed" style={{ opacity: 0.9 }}>
                  {faq.answer}
                </p>
            </div>
          ))}
        </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full mt-8 overflow-hidden" style={{ height: '4px' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${((currentSlide + 1) / Math.ceil(faqs.length / cardsPerSlide)) * 100}%`,
                backgroundColor: 'rgba(0, 87, 82, 1)'
              }}
            ></div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-[rgba(0,87,82,1)] text-lg mb-6" style={{ opacity: 0.9 }}>
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="py-3 px-10 font-light text-white rounded-full hover:opacity-80 transition duration-300 uppercase text-base cursor-pointer"
            style={{ backgroundColor: 'rgba(202, 162, 110, 1)' }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
