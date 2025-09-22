"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import InquiryForm from "./InquiryForm";

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  includedItems?: string[];
  highlights?: string[];
  itinerary?: string[];
}

export default function TourCard({
  id,
  title,
  description,
  duration,
  price,
  image,
  imageAlt,
  includedItems = [],
  highlights = [],
  itinerary = [],
}: TourCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cleanup effect to restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInquireNow = () => {
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <article
        className="relative hover:bg-gray-50 transform duration-300 ease-in-out cursor-pointer rounded-lg flex flex-col min-h-[24rem] max-h-[28rem] flex-shrink-0 bg-white"
        style={{
          width: "100%",
          maxWidth: "402px",
          marginRight: "15px",
          boxShadow:
            "0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1))",
        }}
        role="group"
        aria-label={title}
      >
        {/* Duration Badge */}
        <div
          className="absolute z-10 text-white top-3 left-3 px-2 py-1 rounded-md text-xs tracking-wider font-light"
          style={{ backgroundColor: "#FF4E00" }}
        >
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
            <h2
              className="text-sm sm:text-lg font-bold mb-2 nowraptitle"
              style={{ color: "black" }}
            >
              {title}
            </h2>
            <p className="text-sm mb-4 line-clamp-3" style={{ color: "black" }}>
              {description}
            </p>
          </header>

          {/* Price and Button */}
          <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto w-full gap-3">
            <p className="font-normal text-sm" style={{ color: "#FF4E00" }}>
              from{" "}
              <span className="font-bold text-lg" style={{ color: "#FF4E00" }}>
                {price}
              </span>
            </p>
            <button
              onClick={handleInquireNow}
              className="hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: "#FF4E00",
                color: "white",
                padding: "9px 18px",
                borderRadius: "30px",
              }}
            >
              Inquire Now
            </button>
          </footer>
        </div>
      </article>

      {/* Inquiry Form Modal */}
      <InquiryForm
        isOpen={isModalOpen}
        onClose={closeModal}
        inquiryType="tour"
        tourTitle={title}
        tourDuration={duration}
        tourPrice={price}
      />
    </>
  );
}
