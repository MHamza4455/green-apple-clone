"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  alt: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoAdvance?: boolean;
  interval?: number;
  showDots?: boolean;
  dotsColor?: string;
  className?: string;
}

export default function ImageSlider({
  slides,
  autoAdvance = true,
  interval = 5000,
  showDots = true,
  dotsColor = "#008c95",
  className = "",
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance slides with progress tracking
  useEffect(() => {
    if (!autoAdvance) return;

    const startTime = Date.now();
    const endTime = startTime + interval;

    const progressTimer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / interval) * 100, 100);
      setProgress(newProgress);
    }, 50); // Update progress every 50ms for smooth animation

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0); // Reset progress for new slide
    }, interval);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [autoAdvance, interval, slides.length, currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0); // Reset progress when manually changing slides
  };

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      {/* Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              className={`relative rounded-full cursor-pointer transition-all duration-300 overflow-hidden ${
                index === currentSlide ? "w-8 h-2" : "w-2 h-2"
              }`}
              style={{ backgroundColor: dotsColor }}
            >
              {index === currentSlide && (
                <div
                  className="absolute top-0 left-0 h-full bg-white transition-all duration-75 ease-linear"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
