'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';
import { TourPackage } from '@/types/tourPackage';

export default function UmrahPackages() {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Fetch all tour packages from API
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tour-packages?status=active');
        if (!response.ok) {
          throw new Error('Failed to fetch tour packages');
        }
        const data = await response.json();
        setTourPackages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tour packages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tour packages');
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackages();
  }, []);
   
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
            {loading ? (
              // Loading skeleton cards
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-80 mx-2">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">Failed to load tour packages</div>
                <div className="text-gray-400 text-sm mt-2">{error}</div>
              </div>
            ) : tourPackages.length === 0 ? (
              // No packages
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">No tour packages available</div>
                <div className="text-gray-400 text-sm mt-2">Check back later for tour packages</div>
              </div>
            ) : (
              // Tour packages
              tourPackages.map((umrahPackage) => (
                <TourCard
                  key={umrahPackage.id}
                  id={umrahPackage.id}
                  title={umrahPackage.title}
                  description={umrahPackage.description}
                  duration={umrahPackage.duration}
                  price={umrahPackage.price}
                  image={umrahPackage.image}
                  imageAlt={umrahPackage.imageAlt}
                  includedItems={umrahPackage.includedItems}
                  highlights={umrahPackage.highlights}
                  itinerary={umrahPackage.itinerary}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
