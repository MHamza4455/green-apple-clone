'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, User, Mail, Phone, MessageCircle, Calendar, Users } from 'lucide-react';

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
}

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  travelDate: string;
  travelers: string;
}

export default function TourCard({
  id,
  title,
  description,
  duration,
  price,
  image,
  imageAlt
}: TourCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    travelDate: '',
    travelers: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Cleanup effect to restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleInquireNow = () => {
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus('idle');
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/tour-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tourTitle: title,
          tourDuration: duration,
          tourPrice: price
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        
        setTimeout(() => {
          closeModal();
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            travelDate: '',
            travelers: '1'
          });
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting tour inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <article
        tabIndex={0}
        className="relative hover:bg-gray-50 transform duration-300 ease-in-out cursor-pointer rounded-lg flex flex-col min-h-[24rem] max-h-[28rem] flex-shrink-0 bg-white"
        style={{ 
          width: '100%',
          maxWidth: '402px',
          marginRight: '15px',
          boxShadow: '0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1))'
        }}
        role="group"
        aria-label={title}
      >
        {/* Duration Badge */}
        <div className="absolute z-10 text-white top-3 left-3 px-2 py-1 rounded-md text-xs tracking-wider font-light" style={{ backgroundColor: '#FF4E00' }}>
          {duration}
        </div>

        {/* Image */}
        <figure className="relative w-full">
          <picture>
            <Image
              src={image}
              alt={imageAlt}
              width={400}
              height={225}
              className="object-cover aspect-[16/9] rounded-lg mb-4 transition-opacity duration-500 w-full h-auto"
              sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, 800px"
              loading="lazy"
            />
          </picture>
        </figure>

        {/* Tour Details */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <header className="flex-grow text-left">
            <h2 className="text-sm sm:text-lg font-bold mb-2 nowraptitle" style={{ color: 'black' }}>
              {title}
            </h2>
            <p className="text-sm mb-4 line-clamp-3" style={{ color: 'black' }}>
              {description}
            </p>
          </header>

          {/* Price and Button */}
          <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto w-full gap-3">
            <p className="font-normal text-sm" style={{ color: '#FF4E00' }}>
              from <span className="font-bold text-lg" style={{ color: '#FF4E00' }}>{price}</span>
            </p>
            <button
              onClick={handleInquireNow}
              className="hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              style={{ 
                backgroundColor: '#FF4E00',
                color: 'white',
                padding: '9px 18px',
                borderRadius: '30px'
              }}
            >
              Inquire Now
            </button>
          </footer>
        </div>
      </article>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-lg w-full max-w-lg max-h-[85vh] overflow-y-auto transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-100 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'black' }}>
                    Inquire About This Tour
                  </h3>
                  <p className="font-medium text-sm" style={{ color: 'black' }}>{title}</p>
                  <p className="text-xs" style={{ color: 'black' }}>{duration} • {price}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {submitStatus === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(0, 140, 149, 0.1)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'black' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Inquiry Submitted!</h4>
                  <p className="text-gray-600 text-sm">Thank you for your interest. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* What's Included Section */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3" style={{ color: 'black' }}>
                      What&apos;s Included
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>4★ Hotel Accommodation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Daily Breakfast</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Airport Transfers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Professional Guided Tours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Entrance Fees to Attractions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Comfortable Transportation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>24/7 Travel Support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'black' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm" style={{ color: 'black' }}>Return Flights</span>
                      </div>
                    </div>
                  </div>
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm"
                    />
                  </div>

                  {/* Travel Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 appearance-none bg-white text-sm"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Traveler{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 text-gray-400" size={18} />
                    <textarea
                      name="message"
                      placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none text-sm"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2.5 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 text-white rounded-lg transition-all duration-200 font-medium transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 text-sm"
                      style={{
                        backgroundColor: isSubmitting ? 'rgba(255, 213, 90, 0.7)' : '#FF4E00'
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Send Inquiry'
                      )}
                    </button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="text-red-600 text-center bg-red-50 py-2 px-3 rounded-lg text-sm">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <p className="text-xs text-center" style={{ color: '#FF4E00' }}>
                    * Required fields. Your information will be kept confidential.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}