"use client";

import { useState } from "react";

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType: "visa" | "tour";
  // Visa specific props
  country?: string;
  // Tour specific props
  tourTitle?: string;
  tourDuration?: string;
  tourPrice?: string;
  includedItems?: string[];
  notIncluded?: string[];
}

export default function InquiryForm({
  isOpen,
  onClose,
  inquiryType,
  country,
  tourTitle,
  tourDuration,
  tourPrice,
  includedItems,
  notIncluded,
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    message: "",
    // Visa specific fields
    visaType: "",
    // Tour specific fields
    travelers: "1",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const inquiryData = {
        ...formData,
        inquiryType,
        // Add type-specific data
        ...(inquiryType === "visa" && { country }),
        ...(inquiryType === "tour" && {
          tourTitle,
          tourDuration,
          tourPrice,
        }),
      };

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          travelDate: "",
          message: "",
          visaType: "",
          travelers: "1",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: "#FF4E00" }}>
              {inquiryType === "visa"
                ? `Visa Inquiry - ${country}`
                : `Tour Inquiry - ${tourTitle}`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>


          {/* Tour Package Details - Only Included/Not Included */}
          {inquiryType === "tour" && tourTitle && ((includedItems && includedItems.length > 0) || (notIncluded && notIncluded.length > 0)) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              {/* Included Items */}
              {includedItems && includedItems.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600">What&apos;s Included:</span>
                  <ul className="mt-2 space-y-1">
                    {includedItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-900">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Not Included Items */}
              {notIncluded && notIncluded.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Not Included:</span>
                  <ul className="mt-2 space-y-1">
                    {notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-900">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {submitStatus === "success" && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Thank you! Your {inquiryType} inquiry has been submitted
              successfully. We will get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Sorry, there was an error submitting your inquiry. Please try
              again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

            {/* Visa specific fields */}
            {inquiryType === "visa" && (
              <div>
                <label
                  htmlFor="visaType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
            )}

            {/* Tour specific fields */}
            {inquiryType === "tour" && (
              <div>
                <label
                  htmlFor="travelers"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Travelers
                </label>
                <select
                  id="travelers"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Traveler{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="travelDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(0,140,149,1)] focus:border-transparent"
                placeholder={
                  inquiryType === "visa"
                    ? "Tell us more about your visa requirements..."
                    : "Tell us about your travel preferences, special requirements, or any questions you have..."
                }
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
                style={{ backgroundColor: "#FF4E00" }}
              >
                {isSubmitting
                  ? "Submitting..."
                  : `Submit ${inquiryType === "visa" ? "Visa" : "Tour"} Inquiry`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
