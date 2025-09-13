
'use client';

import { useState } from 'react';
import Image from 'next/image';
import VisaDetailsPopup from './VisaDetailsPopup';
import VisaInquiryPopup from './VisaInquiryPopup';

const COUNTRIES = [
  { 
    name: 'United States', 
    code: 'us',
    description: 'Explore the diverse landscapes and vibrant cities of the United States with our comprehensive visa services. From the bustling streets of New York to the sunny beaches of California, we make your American dream accessible.',
    requirements: [
      'Valid passport with at least 6 months validity',
      'Completed DS-160 form',
      'Recent passport-sized photograph',
      'Proof of financial stability',
      'Travel itinerary and accommodation details',
      'Interview appointment confirmation'
    ],
    processingTime: '15-30 business days',
    validity: 'Up to 10 years (multiple entries)',
    price: 'From $160 USD',
    documents: [
      'Passport (valid for 6+ months)',
      'DS-160 confirmation page',
      'Passport photo (2x2 inches)',
      'Bank statements (last 3 months)',
      'Employment letter',
      'Travel insurance (recommended)'
    ],
    features: [
      'Fast processing',
      'Multiple entry options',
      'Expert guidance',
      'Document verification',
      'Interview preparation',
      '24/7 support'
    ]
  },
  { 
    name: 'United Kingdom', 
    code: 'gb',
    description: 'Discover the rich history and culture of the United Kingdom. From the royal palaces of London to the scenic highlands of Scotland, we provide seamless visa services for your British adventure.',
    requirements: [
      'Valid passport',
      'Completed online application',
      'Biometric information',
      'Financial evidence',
      'Accommodation details',
      'Travel purpose documentation'
    ],
    processingTime: '15-30 working days',
    validity: 'Up to 6 months (single/multiple entries)',
    price: 'From £95 GBP',
    documents: [
      'Passport with blank pages',
      'Application confirmation',
      'Financial documents',
      'Accommodation proof',
      'Travel insurance',
      'Purpose of visit letter'
    ],
    features: [
      'Online application',
      'Biometric appointment',
      'Priority processing available',
      'Comprehensive support',
      'Document checklist',
      'Status tracking'
    ]
  },
  { 
    name: 'Canada', 
    code: 'ca',
    description: 'Experience the natural beauty and multicultural cities of Canada. Our visa services cover everything from tourist visits to business trips, ensuring a smooth entry into the Great White North.',
    requirements: [
      'Valid passport',
      'Completed application form',
      'Biometric information',
      'Proof of financial support',
      'Travel itinerary',
      'Medical examination (if required)'
    ],
    processingTime: '14-30 days',
    validity: 'Up to 10 years (multiple entries)',
    price: 'From CAD $100',
    documents: [
      'Passport (valid for 6+ months)',
      'Application form',
      'Financial statements',
      'Travel insurance',
      'Purpose of visit letter',
      'Biometric confirmation'
    ],
    features: [
      'Electronic Travel Authorization',
      'Multiple entry options',
      'Fast processing',
      'Online application',
      'Biometric services',
      'Comprehensive guidance'
    ]
  },
  { 
    name: 'Australia', 
    code: 'au',
    description: 'Visit the land down under with our Australian visa services. From the iconic Sydney Opera House to the Great Barrier Reef, we help you explore Australia\'s unique attractions.',
    requirements: [
      'Valid passport',
      'Completed application',
      'Health examination',
      'Character requirements',
      'Financial capacity proof',
      'Genuine temporary entrant statement'
    ],
    processingTime: '15-30 days',
    validity: 'Up to 12 months',
    price: 'From AUD $145',
    documents: [
      'Passport with 6+ months validity',
      'Application form',
      'Health examination results',
      'Financial documents',
      'Travel insurance',
      'Character documents'
    ],
    features: [
      'Electronic visa system',
      'Health requirements',
      'Character assessment',
      'Multiple entry options',
      'Online processing',
      'Expert consultation'
    ]
  },
  { 
    name: 'Germany', 
    code: 'de',
    description: 'Explore the heart of Europe with our German visa services. From the historic streets of Berlin to the romantic Rhine Valley, we make your European journey unforgettable.',
    requirements: [
      'Valid passport',
      'Completed application form',
      'Travel insurance',
      'Financial proof',
      'Accommodation details',
      'Travel purpose documentation'
    ],
    processingTime: '15-30 days',
    validity: 'Up to 90 days (Schengen)',
    price: 'From €80 EUR',
    documents: [
      'Passport (valid 3+ months)',
      'Application form',
      'Travel insurance (€30,000 coverage)',
      'Financial statements',
      'Hotel bookings',
      'Flight reservations'
    ],
    features: [
      'Schengen visa',
      'Multiple entry options',
      'Fast processing',
      'Comprehensive support',
      'Document verification',
      'Travel insurance guidance'
    ]
  },
  { 
    name: 'France', 
    code: 'fr',
    description: 'Discover the romance and culture of France with our visa services. From the Eiffel Tower to the French Riviera, we help you experience the best of French hospitality.',
    requirements: [
      'Valid passport',
      'Completed application',
      'Travel insurance',
      'Financial documentation',
      'Accommodation proof',
      'Travel itinerary'
    ],
    processingTime: '15-30 days',
    validity: 'Up to 90 days (Schengen)',
    price: 'From €80 EUR',
    documents: [
      'Passport with 3+ months validity',
      'Application form',
      'Travel insurance',
      'Bank statements',
      'Hotel confirmations',
      'Flight bookings'
    ],
    features: [
      'Schengen visa',
      'Multiple entry options',
      'Fast processing',
      'Cultural guidance',
      'Document support',
      'Travel tips'
    ]
  },
  { 
    name: 'Italy', 
    code: 'it',
    description: 'Experience the art, history, and cuisine of Italy with our comprehensive visa services. From the Colosseum to the canals of Venice, we make your Italian dream come true.',
    requirements: [
      'Valid passport',
      'Application form',
      'Travel insurance',
      'Financial proof',
      'Accommodation details',
      'Travel purpose letter'
    ],
    processingTime: '15-30 days',
    validity: 'Up to 90 days (Schengen)',
    price: 'From €80 EUR',
    documents: [
      'Passport (3+ months validity)',
      'Application form',
      'Travel insurance',
      'Financial documents',
      'Hotel bookings',
      'Travel itinerary'
    ],
    features: [
      'Schengen visa',
      'Cultural guidance',
      'Multiple entry options',
      'Fast processing',
      'Document assistance',
      'Travel recommendations'
    ]
  },
  { 
    name: 'UAE', 
    code: 'ae',
    description: 'Visit the modern marvels of the United Arab Emirates with our visa services. From the towering Burj Khalifa to the luxury shopping malls, we help you explore the UAE\'s wonders.',
    requirements: [
      'Valid passport',
      'Passport photograph',
      'Completed application',
      'Financial proof',
      'Travel insurance',
      'Accommodation details'
    ],
    processingTime: '3-7 business days',
    validity: '30-90 days',
    price: 'From AED 250',
    documents: [
      'Passport (6+ months validity)',
      'Passport photo',
      'Application form',
      'Bank statements',
      'Travel insurance',
      'Hotel booking'
    ],
    features: [
      'Fast processing',
      'Online application',
      'Multiple entry options',
      'Express service available',
      'Comprehensive support',
      'Document verification'
    ]
  },
  { 
    name: 'Turkey', 
    code: 'tr',
    description: 'Discover the unique blend of East and West in Turkey with our visa services. From the historic Hagia Sophia to the hot air balloons of Cappadocia, we make your Turkish adventure memorable.',
    requirements: [
      'Valid passport',
      'Online application',
      'Passport photograph',
      'Financial proof',
      'Travel insurance',
      'Accommodation details'
    ],
    processingTime: '1-3 business days',
    validity: 'Up to 90 days',
    price: 'From $50 USD',
    documents: [
      'Passport (6+ months validity)',
      'Passport photo',
      'Application confirmation',
      'Financial documents',
      'Travel insurance',
      'Hotel reservation'
    ],
    features: [
      'Electronic visa',
      'Fast processing',
      'Online application',
      'Multiple entry options',
      '24/7 support',
      'Easy renewal'
    ]
  },
  { 
    name: 'Saudi Arabia', 
    code: 'sa',
    description: 'Experience the rich culture and modern development of Saudi Arabia with our visa services. From the holy cities of Mecca and Medina to the futuristic city of NEOM, we guide you through your journey.',
    requirements: [
      'Valid passport',
      'Completed application',
      'Passport photograph',
      'Financial proof',
      'Travel insurance',
      'Accommodation details'
    ],
    processingTime: '5-10 business days',
    validity: '30-90 days',
    price: 'From SAR 300',
    documents: [
      'Passport (6+ months validity)',
      'Passport photo',
      'Application form',
      'Financial statements',
      'Travel insurance',
      'Hotel booking'
    ],
    features: [
      'Cultural guidance',
      'Multiple entry options',
      'Fast processing',
      'Document support',
      'Religious tourism support',
      'Comprehensive assistance'
    ]
  }
];

export default function VisaServices() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);

  const handleLearnMore = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowDetailsPopup(true);
  };

  const handleInquireNow = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowInquiryPopup(true);
  };

  const getCountryDetails = (countryName: string) => {
    return COUNTRIES.find(country => country.name === countryName);
  };

  return (
    <section id="visa-services" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="w-full mb-6 lg:mb-0">
          <div>
            <h1 
              id="visa-services" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: 'rgba(0, 140, 149, 1)' }}
            >
              Visa Services
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
          </div>
        </header>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {COUNTRIES.map((country) => (
            <div key={country.name} className="flex flex-col items-center group relative">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-white p-4 rounded-2xl border border-gray-200 hover:border-[rgba(0,140,149,1)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Image
                    src={`/flags/${country.code}.svg`}
                    alt={`${country.name} flag`}
                    width={52}
                    height={36}
                    className="rounded-lg"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center group-hover:text-primary transition-all duration-300 transform group-hover:translate-y-[-2px] mb-3">
                {country.name}
              </span>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full px-2">
                <button
                  onClick={() => handleLearnMore(country.name)}
                  className="w-full px-3 py-2 text-xs font-medium text-[rgba(0,140,149,1)] border border-[rgba(0,140,149,1)] rounded-md hover:bg-[rgba(0,140,149,1)] hover:text-white transition-all duration-300"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleInquireNow(country.name)}
                  className="w-full px-3 py-2 text-xs font-medium text-white rounded-md transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: 'rgba(0, 140, 149, 1)' }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popups */}
      {selectedCountry && (
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
          
          <VisaInquiryPopup
            isOpen={showInquiryPopup}
            onClose={() => {
              setShowInquiryPopup(false);
              setSelectedCountry(null);
            }}
            country={selectedCountry}
          />
        </>
      )}
    </section>
  );
}