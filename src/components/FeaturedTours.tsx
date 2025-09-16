'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';

const featuredTours = [
  {
    id: 'azerbaijan',
    title: 'Azerbaijan, Baku Tour (3 Nights / 4 Days)',
    description: 'Enjoy a 3-night, 4-day Baku tour featuring a 4★ hotel stay, included transfers, daily breakfast, and day trips to Niazmi Street and Flame Towers.',
    duration: '4 days / 3 nights',
    price: 'AED 1199',
    image: '/images/HolidayPackages/holiday_package1.webp',
    imageAlt: 'Azerbaijan, Baku Tour (3 Nights / 4 Days)'
  },
  {
    id: 'georgia',
    title: 'Georgia Tour (2 Nights / 3 Days)',
    description: 'Discover the beauty of Georgia with this 2-night, 3-day tour. Includes a 4★ hotel stay, transfers, daily breakfast, and day trips to Tbilisi, Narikala Fortress, and Bridge of Peace.',
    duration: '3 days / 2 nights',
    price: 'AED 1499',
    image: '/images/HolidayPackages/holiday_package2.webp',
    imageAlt: 'Georgia Tour (2 Nights / 3 Days)'
  },
  {
    id: 'russia',
    title: 'Russia Tour (4 Nights / 5 Days)',
    description: 'Experience the rich culture of Russia with this 4-night, 5-day tour. Includes a 4★ hotel stay, transfers, daily breakfast, and day trips to Moscow, Red Square, and Pushkin Museum.',
    duration: '5 days / 4 nights',
    price: 'AED 1999',
    image: '/images/HolidayPackages/holiday_package3.webp',
    imageAlt: 'Russia Tour (4 Nights / 5 Days)'
  }
];


export default function FeaturedTours() {
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
  const totalSlides = Math.ceil(featuredTours.length / slidesPerView);
  
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
    <section className="relative text-gray-900" aria-labelledby="featured-tours">
      {/* Featured Tours */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <header className="w-full mb-6 lg:mb-0 flex items-center justify-between">
          <div>
            <h1 
              id="featured-tours" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: '#30D5C8' }}
            >
              Featured Tours
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: '#FF4E00' }}></div>
          </div>
          
          {/* Navigation Arrows - Only show when scrolling is needed */}
          {!allToursVisible && (
            <div className="flex items-center gap-2">
              <button 
                onClick={scrollToPrevious}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Previous tours"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollToNext}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Next tours"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </header>

        {/* Tour Listings */}
        <section 
          className="tourlatest overflow-hidden col-span-12 relative" 
          aria-label="Tour Listings"
        >
                     {/* Progress Bar - Only show when scrolling is needed */}
           {!allToursVisible && (
             <div className="w-full bg-gray-200 rounded-full mb-4 overflow-hidden" style={{ height: '3px' }}>
               <div 
                 className="h-full rounded-full transition-all duration-300" 
                 style={{ 
                   width: `${scrollProgress}%`,
                   backgroundColor: '#FF4E00'
                 }}
               ></div>
             </div>
           )}
          
          <div ref={scrollContainerRef} className="flex overflow-x-auto pb-4 scrollbar-hide">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                {...tour}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
