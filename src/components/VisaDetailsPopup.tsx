'use client';

import { useState } from 'react';
import Image from 'next/image';
import VisaInquiryPopup from './VisaInquiryPopup';

interface VisaDetails {
  name: string;
  code: string;
  description: string;
  requirements: string[];
  processingTime: string;
  validity: string;
  price: string;
  documents: string[];
  features: string[];
}

interface VisaDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
  visaDetails: VisaDetails;
}

export default function VisaDetailsPopup({ isOpen, onClose, country, visaDetails }: VisaDetailsPopupProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Image
                  src={`/flags/${visaDetails.code}.svg`}
                  alt={`${country} flag`}
                  width={40}
                  height={28}
                  className="rounded"
                />
                <h2 className="text-2xl font-bold" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  {country} Visa Services
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  About {country} Visa
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {visaDetails.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {visaDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visa Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                    Processing Time
                  </h4>
                  <p className="text-gray-700">{visaDetails.processingTime}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                    Visa Validity
                  </h4>
                  <p className="text-gray-700">{visaDetails.validity}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                    Starting Price
                  </h4>
                  <p className="text-gray-700 font-semibold">{visaDetails.price}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                    Visa Type
                  </h4>
                  <p className="text-gray-700">Tourist, Business, Student</p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  General Requirements
                </h3>
                <ul className="space-y-2">
                  {visaDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgba(0, 140, 149, 1)' }}>
                  Required Documents
                </h3>
                <ul className="space-y-2">
                  {visaDetails.documents.map((document, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
                      <span className="text-gray-700">{document}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="flex-1 px-6 py-3 text-white rounded-md transition-colors font-medium"
                  style={{ backgroundColor: 'rgba(0, 140, 149, 1)' }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VisaInquiryPopup
        isOpen={showInquiryForm}
        onClose={() => setShowInquiryForm(false)}
        country={country}
      />
    </>
  );
}
