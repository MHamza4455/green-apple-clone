'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';

const tourPackages = [
  {
    id: 'maldives',
    title: 'Maldives Tour – 4 Nights / 5 Days',
    description: 'Relax in paradise with a 4★ hotel stay, transfers, breakfast, and day trips to Vaadhoo Island, Alimatha Island, Addu Atoll, Banana Reef, and Mirihi Island.',
    duration: '5 days / 4 nights',
    price: 'AED 2199',
    image: '/images/UmrahPackages/umrah_package1.webp',
    imageAlt: 'Maldives Tour – 4 Nights / 5 Days'
  },
  {
    id: 'las-vegas',
    title: 'Las Vegas Tour – 5 Nights / 6 Days',
    description: 'Experience the excitement of Las Vegas with a 4★ hotel stay, transfers, breakfast, and day trips to the Fountains of Bellagio, Sphere, Fremont Street, and AREA15.',
    duration: '6 days / 5 nights',
    price: 'AED 3999',
    image: '/images/UmrahPackages/umrah_package2.webp',
    imageAlt: 'Las Vegas Tour – 5 Nights / 6 Days'
  },
  {
    id: 'greece',
    title: 'Greece Tour – 3 Nights / 4 Days',
    description: 'Explore Greece with a 4★ hotel stay, transfers, breakfast, and day trips to Athens, the Acropolis, Parthenon, and Paros.',
    duration: '4 days / 3 nights',
    price: 'AED 2199',
    image: '/images/UmrahPackages/umrah_package3.webp',
    imageAlt: 'Greece Tour – 3 Nights / 4 Days'
  },
  {
    id: 'thailand',
    title: 'Thailand Tour – 2 Nights / 3 Days',
    description: 'Enjoy a quick Thailand getaway with a 4★ hotel stay, transfers, breakfast, and day trips to Bangkok, the Grand Palace, Wat Arun, and the Chao Phraya River.',
    duration: '3 days / 2 nights',
    price: 'AED 1299',
    image: '/images/UmrahPackages/umrah_package4.webp',
    imageAlt: 'Thailand Tour – 2 Nights / 3 Days'
  },
  {
    id: 'turkey-istanbul',
    title: 'Turkey, Istanbul – 3 Nights / 4 Days',
    description: 'Visit Istanbul with a 4★ hotel stay, transfers, breakfast, and day trips to the Blue Mosque, Hagia Sophia, Topkapi Palace, and the Grand Bazaar.',
    duration: '4 days / 3 nights',
    price: 'AED 1450',
    image: '/images/UmrahPackages/umrah_package5.webp',
    imageAlt: 'Turkey, Istanbul – 3 Nights / 4 Days'
  },
  {
    id: 'egypt',
    title: 'Egypt Tour – 3 Nights / 4 Days',
    description: 'Experience Egypt’s wonders with a 4★ hotel stay, transfers, breakfast, and day trips to Cairo, the Egyptian Museum, Hanging Church, Museum of Islamic Art, and Pyramids of Giza.',
    duration: '4 days / 3 nights',
    price: 'AED 1699',
    image: '/images/UmrahPackages/umrah_package6.webp',
    imageAlt: 'Egypt Tour – 3 Nights / 4 Days'
  },
  {
    id: 'russia',
    title: 'Russia Tour – 4 Nights / 5 Days',
    description: 'Explore the rich culture of Russia with a 4★ hotel stay, transfers, breakfast, and day trips to Moscow, Red Square, and the Pushkin Museum.',
    duration: '5 days / 4 nights',
    price: 'AED 1999',
    image: '/images/HolidayPackages/holiday_package4.webp',
    imageAlt: 'Russia Tour – 4 Nights / 5 Days'
  },
  {
    id: 'georgia',
    title: 'Georgia Tour – 2 Nights / 3 Days',
    description: 'Discover the beauty of Georgia with a 4★ hotel stay, transfers, breakfast, and guided day trips to Tbilisi, Narikala Fortress, and the Bridge of Peace.',
    duration: '3 days / 2 nights',
    price: 'AED 1499',
    image: '/images/HolidayPackages/holiday_package5.webp',
    imageAlt: 'Georgia Tour – 2 Nights / 3 Days'
  },
  {
    id: 'azerbaijan-baku',
    title: 'Azerbaijan, Baku Tour – 3 Nights / 4 Days',
    description: 'Enjoy a memorable trip to Baku with a 4★ hotel stay, transfers, breakfast, and exciting day trips to Niazmi Street and Flame Towers.',
    duration: '4 days / 3 nights',
    price: 'AED 1199',
    image: '/images/HolidayPackages/holiday_package6.webp',
    imageAlt: 'Azerbaijan, Baku Tour – 3 Nights / 4 Days'
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
  const totalSlides = Math.ceil(tourPackages.length / slidesPerView);
   
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
              style={{ color: '#FF4E00' }}
            >
              All Packages
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: '#FF4E00' }}></div>
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
                  backgroundColor: '#FF4E00'
                }}
              ></div>
            </div>
          )}
          
          <div ref={scrollContainerRef} className="flex overflow-x-auto pb-4 scrollbar-hide">
            {tourPackages.map((umrahPackage) => (
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
