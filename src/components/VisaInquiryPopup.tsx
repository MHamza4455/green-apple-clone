'use client';

import { useState } from 'react';

interface VisaInquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
}

export default function VisaInquiryPopup({ isOpen, onClose, country }: VisaInquiryPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visaType: '',
    travelDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/visa-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          country
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          visaType: '',
          travelDate: '',
          message: ''
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting visa inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: 'rgba(0, 140, 149, 1)' }}>
              Visa Inquiry - {country}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Thank you! Your visa inquiry has been submitted successfully. We&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Sorry, there was an error submitting your inquiry. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">
                Visa Type
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
              >
                <option value="">Select visa type</option>
                <option value="Tourist">Tourist Visa</option>
                <option value="Business">Business Visa</option>
                <option value="Student">Student Visa</option>
                <option value="Work">Work Visa</option>
                <option value="Transit">Transit Visa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">
                Intended Travel Date
              </label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
                placeholder="Tell us more about your visa requirements..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-white rounded-md transition-colors disabled:opacity-50"
                style={{ backgroundColor: 'rgba(0, 140, 149, 1)' }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
