'use client';

import { useRef, useState, useEffect } from 'react';
import TourCard from './TourCard';

const featuredTours = [
  {
    id: 'kazakhstan-almaty',
    title: '5-Day Almaty Itinerary – Kazakhstan',
    description: 'Explore the stunning landscapes and cultural gems of Almaty, Kazakhstan, with this 5-day tour package. Highlights include visits to the Park of 28 Panfilov Guardsmen, Ascension Cathedral, Koktobe Hill, Shymbulak Mountain Resort, Big Almaty Lake, and Alma Arasan Gorge. Enjoy comfortable accommodations at Saraishyq Hotel and daily buffet breakfast.',
    duration: '5 days / 4 nights',
    price: 'AED 3999',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753855595/n8n_posting/grd8sr7nnulrz9nspvys.jpg',
    imageAlt: '5-Day Almaty Itinerary – Kazakhstan'
  },
  {
    id: 'armenia-yerevan',
    title: '4-Day Armenia Itinerary – Yerevan',
    description: 'Explore the beauty of Armenia with this 4-day tour package. Highlights include a city tour of Yerevan, visits to Lake Sevan, Tsaghkadzor, Dilijan, Garni Temple, and Geghard Monastery. Enjoy comfortable accommodations at Hotel Dynasty 4★ and daily buffet breakfast.',
    duration: '4 days / 3 nights',
    price: 'AED 3990',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753784784/n8n_posting/nmrlmnnxmsmuoipvh49c.jpg',
    imageAlt: '4-Day Armenia Itinerary – Yerevan'
  },
  {
    id: 'oman-salalah',
    title: 'Salalah Tour Itinerary',
    description: 'A 5-day tour package from UAE to Salalah, Oman, featuring city tours, nature excursions, and cultural site visits. Includes accommodation at Al Jabal Hotel, luxury bus transportation, and full board meals as per the itinerary.',
    duration: '5 days / 4 nights',
    price: 'AED 0',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753773675/n8n_posting/eryso0bejapwzljioodz.jpg',
    imageAlt: 'Salalah Tour Itinerary'
  },
  {
    id: 'georgia-tbilisi',
    title: '6-Day Georgia Adventure – Tbilisi & Beyond',
    description: 'Discover the hidden gem of the Caucasus with this comprehensive 6-day tour. Experience the historic charm of Tbilisi, explore ancient cave cities, visit stunning mountain monasteries, and taste authentic Georgian cuisine. Includes luxury hotel stays and expert local guides.',
    duration: '6 days / 5 nights',
    price: 'AED 4599',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753773675/n8n_posting/eryso0bejapwzljioodz.jpg',
    imageAlt: '6-Day Georgia Adventure – Tbilisi & Beyond'
  },
  {
    id: 'azerbaijan-baku',
    title: '4-Day Azerbaijan Discovery – Baku & Gobustan',
    description: 'Journey to the land of fire with this 4-day Azerbaijan tour. Explore the modern skyline of Baku, visit the ancient mud volcanoes of Gobustan, discover the medieval Old City, and experience the unique blend of East and West cultures.',
    duration: '4 days / 3 nights',
    price: 'AED 3499',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753784784/n8n_posting/nmrlmnnxmsmuoipvh49c.jpg',
    imageAlt: '4-Day Azerbaijan Discovery – Baku & Gobustan'
  },
  {
    id: 'kyrgyzstan-bishkek',
    title: '7-Day Kyrgyzstan Nomadic Experience',
    description: 'Immerse yourself in the nomadic culture of Kyrgyzstan with this 7-day adventure. Stay in traditional yurts, ride horses across the stunning Tian Shan mountains, visit crystal-clear alpine lakes, and experience authentic nomadic hospitality in the heart of Central Asia.',
    duration: '7 days / 6 nights',
    price: 'AED 5299',
    image: 'https://res.cloudinary.com/greenappletravel-ae/image/upload/c_scale,w_400,q_auto:eco,f_auto/v1753855595/n8n_posting/grd8sr7nnulrz9nspvys.jpg',
    imageAlt: '7-Day Kyrgyzstan Nomadic Experience'
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
      <div className="max-w-7xl mx-auto pb-12 px-4">
        <header className="w-full mb-6 lg:mb-0 flex items-center justify-between">
          <div>
            <h1 
              id="featured-tours" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: 'rgba(0,140,149,1)' }}
            >
              Featured Tours
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
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
                   backgroundColor: 'rgba(255, 213, 90, 1)'
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
