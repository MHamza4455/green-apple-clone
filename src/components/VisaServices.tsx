
'use client';

import { useState } from 'react';
import Image from 'next/image';
import VisaDetailsPopup from './VisaDetailsPopup';
import VisaInquiryPopup from './VisaInquiryPopup';

const COUNTRIES = [
  { 
    name: 'United States', 
    code: 'us',
    price: '1500 AED',
    description: 'USA Visit Visa – 1500 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Interview Preparation',
      'Flight & Hotel Reservation',
      'Application Form'
    ]
  },
  { 
    name: 'Canada', 
    code: 'ca',
    price: '1500 AED',
    description: 'Canada Visit Visa – 1500 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      '6 months bank statement',
      'Company NOC',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Biometric Appointment',
      'Flight & Hotel Reservation',
      'Application Form'
    ]
  },
  {
    name: 'Schengen',
    code: 'eu',
    price: '1000 AED',
    description: 'Schengen Visit Visa – 1000 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      '6 months bank statement',
      'Company NOC',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Biometric Appointment',
      'Appointment Fee',
      'Flight & Hotel Reservation',
      'Insurance',
      'Application Form'
    ]
  },
  {
    name: 'United Kingdom',
    code: 'gb',
    price: '2000 AED',
    description: 'UK Visit Visa – 2000 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      '6 months bank statement',
      'Company NOC',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Biometric Appointment',
      'Flight & Hotel Reservation',
      'Travel Insurance',
      'Application Form'
    ]
  },
  {
    name: 'Australia',
    code: 'au',
    price: '1500 AED',
    description: 'Australia Visit Visa – 1500 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      '6 months bank statement',
      'Company NOC',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Biometric Appointment',
      'Flight & Hotel Reservation',
      'Application Form'
    ]
  },
  {
    name: 'New Zealand',
    code: 'nz',
    price: '2000 AED',
    description: 'New Zealand Visit Visa – 2000 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      '6 months bank statement',
      'Company NOC',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Biometric Appointment',
      'Flight & Hotel Reservation',
      'Application Form'
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
    <section id="visa-services" className="py-20" style={{ backgroundColor: '#30D5C8' }}>
      <div className="max-w-7xl mx-auto px-4">
        <header className="w-full mb-6 lg:mb-0">
          <div>
            <h1 
              id="visa-services" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: 'white' }}
            >
              Visa Services
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: '#FF4E00' }}></div>
          </div>
        </header>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {COUNTRIES.map((country) => (
            <div key={country.name} className="flex flex-col items-center group relative h-full">
              <div className="relative mb-4 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-2xl border border-gray-200 hover:border-[rgba(0,140,149,1)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Image
                    src={`/flags/${country.code}.svg`}
                    alt={`${country.name} flag`}
                    width={56}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
              </div>
              <span className="text-sm font-semibold text-center group-hover:text-white transition-all duration-300 transform group-hover:translate-y-[-2px] mb-3" style={{ color: 'white' }}>
                {country.name}
              </span>
              
              {/* Price Highlight */}
              <div className="mb-3">
                <span className="text-lg font-bold" style={{ color: '#FF4E00' }}>
                  {country.price}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full px-2 mt-auto">
                <button
                  onClick={() => handleLearnMore(country.name)}
                  className="w-full px-3 py-2 text-xs font-medium border border-white rounded-md transition-all duration-300 hover:bg-[#FF4E00] hover:border-[#FF4E00]"
                  style={{ color: 'white' }}
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleInquireNow(country.name)}
                  className="w-full px-3 py-2 text-xs font-medium border border-white rounded-md transition-all duration-300 hover:bg-[#FF4E00] hover:border-[#FF4E00]"
                  style={{ color: 'white' }}
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