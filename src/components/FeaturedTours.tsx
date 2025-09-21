'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';
import { TourPackage } from '@/types/tourPackage';

export default function FeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Fetch featured tours from API
  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tour-packages?featured=true&status=active');
        if (!response.ok) {
          throw new Error('Failed to fetch featured tours');
        }
        const data = await response.json();
        setFeaturedTours(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured tours:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured tours');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
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
              style={{ color: '#FF4E00' }}
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
          aria-label="Tour Listags"
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
                <div className="text-gray-500 text-lg">Failed to load featured tours</div>
                <div className="text-gray-400 text-sm mt-2">{error}</div>
              </div>
            ) : featuredTours.length === 0 ? (
              // No featured tours
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg">No featured tours available</div>
                <div className="text-gray-400 text-sm mt-2">Check back later for featured tour packages</div>
              </div>
            ) : (
              // Featured tours
              featuredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  id={tour.id}
                  title={tour.title}
                  description={tour.description}
                  duration={tour.duration}
                  price={tour.price}
                  image={tour.image}
                  imageAlt={tour.imageAlt}
                  includedItems={tour.includedItems}
                  highlights={tour.highlights}
                  itinerary={tour.itinerary}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
