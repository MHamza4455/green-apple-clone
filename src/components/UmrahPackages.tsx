'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';

const umrahPackages = [
  {
    id: 'umrah-basic',
    title: 'Basic Umrah Package – 15 Days',
    description: 'Experience the spiritual journey of Umrah with our comprehensive 15-day package. Includes visa processing, round-trip flights, hotel accommodation in Makkah and Madinah, transportation, and guided tours to holy sites. Perfect for first-time Umrah travelers.',
    duration: '15 days / 14 nights',
    price: 'AED 8999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753855595/n8n_posting/grd8sr7nnulrz9nspvys.jpg',
    imageAlt: 'Basic Umrah Package – 15 Days'
  },
  {
    id: 'umrah-premium',
    title: 'Premium Umrah Package – 21 Days',
    description: 'Luxury Umrah experience with extended stay in the holy cities. Features 5-star hotel accommodations, VIP visa processing, premium transportation, guided spiritual tours, and additional visits to historical Islamic sites. Includes all meals and special arrangements.',
    duration: '21 days / 20 nights',
    price: 'AED 12999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753784784/n8n_posting/nmrlmnnxmsmuoipvh49c.jpg',
    imageAlt: 'Premium Umrah Package – 21 Days'
  },
  {
    id: 'umrah-family',
    title: 'Family Umrah Package – 18 Days',
    description: 'Special family-oriented Umrah package designed for families with children. Includes family-friendly accommodations, educational tours for children, special family prayer arrangements, and guided visits to family-friendly areas in Makkah and Madinah.',
    duration: '18 days / 17 nights',
    price: 'AED 10999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753773675/n8n_posting/eryso0bejapwzljioodz.jpg',
    imageAlt: 'Family Umrah Package – 18 Days'
  },
  {
    id: 'umrah-ramadan',
    title: 'Ramadan Umrah Package – 25 Days',
    description: 'Experience the blessed month of Ramadan in the holy cities. Extended package covering the entire month with special Ramadan arrangements, Taraweeh prayers, Iftar and Suhoor arrangements, and spiritual guidance throughout the holy month.',
    duration: '25 days / 24 nights',
    price: 'AED 15999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753773675/n8n_posting/eryso0bejapwzljioodz.jpg',
    imageAlt: 'Ramadan Umrah Package – 25 Days'
  },
  {
    id: 'umrah-express',
    title: 'Express Umrah Package – 10 Days',
    description: 'Quick Umrah journey for those with limited time. Efficient 10-day package with streamlined visa processing, direct flights, centrally located hotels, and focused spiritual activities. Perfect for busy professionals and short-term travelers.',
    duration: '10 days / 9 nights',
    price: 'AED 6999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753784784/n8n_posting/nmrlmnnxmsmuoipvh49c.jpg',
    imageAlt: 'Express Umrah Package – 10 Days'
  },
  {
    id: 'umrah-luxury',
    title: 'Luxury Umrah Package – 30 Days',
    description: 'Ultimate luxury Umrah experience with extended stay and premium services. Features exclusive 5-star accommodations, private transportation, personal spiritual guide, VIP access to holy sites, and luxury amenities throughout the journey.',
    duration: '30 days / 29 nights',
    price: 'AED 19999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753855595/n8n_posting/grd8sr7nnulrz9nspvys.jpg',
    imageAlt: 'Luxury Umrah Package – 30 Days'
  }
];

export default function UmrahPackages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
   
  // Calculate how many slides we have based on screen size
  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg: 3 cards
      if (window.innerWidth >= 768) return 2;  // md: 2 cards
      return 1; // mobile: 1 card
    }
    return 3; // default
  };

  const slidesPerView = getSlidesPerView();
  const totalSlides = Math.ceil(umrahPackages.length / slidesPerView);
   
  // Check if all tours are visible (no scrolling needed)
  const allToursVisible = totalSlides <= 1;

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = (scrollLeft / maxScroll) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    }
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 420; // 405px card + 15px margin
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrevious = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 420; // 405px card + 15px margin
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollProgress);
      // Initial update
      updateScrollProgress();
      return () => scrollContainer.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  return (
    <section className="relative text-gray-900" aria-labelledby="umrah-packages">
      {/* Umrah Packages */}
      <div className="max-w-7xl mx-auto pb-12 px-4">
        <header className="w-full mb-6 lg:mb-0 flex items-center justify-between">
          <div>
            <h1 
              id="umrah-packages" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: 'rgb(0, 87, 82)' }}
            >
              Umrah Packages
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: 'rgba(127,171,168,1)' }}></div>
          </div>
          
          {/* Navigation Arrows - Only show when scrolling is needed */}
          {!allToursVisible && (
            <div className="flex items-center gap-2">
              <button 
                onClick={scrollToPrevious}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Previous packages"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollToNext}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Next packages"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </header>

        {/* Package Listings */}
        <section 
          className="umrah-latest overflow-hidden col-span-12 relative" 
          aria-label="Umrah Package Listings"
        >
          {/* Progress Bar - Only show when scrolling is needed */}
          {!allToursVisible && (
            <div className="w-full bg-gray-200 rounded-full mb-4 overflow-hidden" style={{ height: '3px' }}>
              <div 
                className="h-full rounded-full transition-all duration-300" 
                style={{ 
                  width: `${scrollProgress}%`,
                  backgroundColor: '#33918c'
                }}
              ></div>
            </div>
          )}
          
          <div ref={scrollContainerRef} className="flex overflow-x-auto pb-4 scrollbar-hide">
            {umrahPackages.map((umrahPackage) => (
              <TourCard
                key={umrahPackage.id}
                {...umrahPackage}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
