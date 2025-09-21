
'use client';

import { useState, useEffect, useRef } from 'react';
import VisaDetailsPopup from './VisaDetailsPopup';
import InquiryForm from './InquiryForm';
import { VisaService } from '@/types/visaService';

export default function VisaServices() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [visaServices, setVisaServices] = useState<VisaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch visa services from API with optimizations
  useEffect(() => {
    const fetchVisaServices = async () => {
      try {
        // Check localStorage cache first
        const cachedData = localStorage.getItem('visa-services-cache');
        const cacheTimestamp = localStorage.getItem('visa-services-cache-timestamp');
        const now = Date.now();
        const cacheExpiry = 5 * 60 * 1000; // 5 minutes

        // Use cached data if it's still fresh
        if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < cacheExpiry) {
          const cachedServices = JSON.parse(cachedData);
          if (cachedServices.length > 0) {
            setVisaServices(cachedServices);
            setLoading(false);
            return; // Exit early if we have fresh cached data
          }
        }

        setLoading(true);
        
        // Use AbortController for request cancellation with longer timeout
        const controller = new AbortController();
        abortControllerRef.current = controller;
        
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 10000); // 10 second timeout for better reliability
        
        const response = await fetch('/api/visa-services', {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'max-age=300', // 5 minutes cache
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error('Failed to fetch visa services');
        }
        
        const data = await response.json();
        // Filter only active services for public display
        const activeServices = data.filter((service: VisaService) => service.status === 'active');
        
        // Update with API data
        setVisaServices(activeServices);
        setError(null);
        
        // Cache the data
        localStorage.setItem('visa-services-cache', JSON.stringify(activeServices));
        localStorage.setItem('visa-services-cache-timestamp', now.toString());
      } catch (err) {
        // Handle AbortError specifically (timeout or cancellation)
        if (err instanceof Error && err.name === 'AbortError') {
          console.warn('Request was cancelled or timed out');
          setError('Request timed out. Please check your connection and try again.');
        } else {
          console.error('Failed to fetch visa services:', err);
          setError(err instanceof Error ? err.message : 'Failed to load visa services');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVisaServices();

    // Cleanup function to cancel any pending requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleLearnMore = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowDetailsPopup(true);
  };

  const handleInquireNow = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowInquiryPopup(true);
  };

  const getCountryDetails = (countryName: string) => {
    return visaServices.find(service => service.name === countryName);
  };

  return (
    <section id="visa-services" className="py-20" style={{ backgroundColor: 'rgba(0, 140, 149, 0.05)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <header className="w-full mb-6 lg:mb-0">
          <div>
            <h1 
              id="visa-services" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: '#FF4E00' }}
            >
              Visa Services
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: '#FF4E00' }}></div>
          </div>
        </header>
        
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center group relative h-full animate-pulse">
                <div className="relative mb-4 flex items-center justify-center">
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="flex flex-col gap-2 w-full px-2 mt-auto">
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-800 font-medium mb-2">Failed to load visa services</div>
              <div className="text-red-600 text-sm mb-4">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : visaServices.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No visa services available</div>
            <div className="text-gray-400 text-sm">Please check back later for available services</div>
          </div>
        ) : (
          // Services grid
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            {visaServices.map((service) => (
              <div key={service.id} className="flex flex-col items-center group relative h-full">
                <div className="relative mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span 
                      className={`fi fi-${service.code} text-5xl`}
                      title={`${service.name} flag`}
                    ></span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                </div>
                <span className="text-sm font-semibold text-center group-hover:text-white transition-all duration-300 transform group-hover:translate-y-[-2px] mb-3" style={{ color: 'black' }}>
                  {service.name}
                </span>
                
                {/* Price Highlight */}
                <div className="mb-3">
                  <span className="text-lg font-bold" style={{ color: '#FF4E00' }}>
                    {service.price}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full px-2 mt-auto">
                  <button
                    onClick={() => handleLearnMore(service.name)}
                    className="w-full px-3 py-2 text-xs font-medium border border-[#FF4E00] rounded-md 
                              bg-white text-[#FF4E00] 
                              transition-all duration-300 
                              hover:bg-[#FF4E00] hover:text-white"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => handleInquireNow(service.name)}
                    className="w-full px-3 py-2 text-xs font-medium border border-[#FF4E00] rounded-md 
                              bg-[#FF4E00] text-white 
                              transition-all duration-300 
                              hover:bg-white hover:text-[#FF4E00]"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popups */}
      {selectedCountry && getCountryDetails(selectedCountry) && (
        <>
          <VisaDetailsPopup
            isOpen={showDetailsPopup}
            onClose={() => {
              setShowDetailsPopup(false);
              setSelectedCountry(null);
            }}
            country={selectedCountry}
            visaDetails={getCountryDetails(selectedCountry)!}
          />
          
          <InquiryForm
            isOpen={showInquiryPopup}
            onClose={() => {
              setShowInquiryPopup(false);
              setSelectedCountry(null);
            }}
            inquiryType="visa"
            country={selectedCountry}
          />
        </>
      )}
    </section>
  );
}