'use client';
import { useState } from 'react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  href?: string;
  target?: string;
  rel?: string;
  badge?: {
    text: string;
    color: 'red' | 'accent';
  };
  isButton?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: 'dubai-activities',
    name: 'Dubai Activities',
    image: '/images/categories/activity_ulhgmv.jpg',
    alt: 'Dubai Activities',
    isButton: true,
    badge: {
      text: 'New',
      color: 'red'
    }
  },
  {
    id: 'visa-services',
    name: 'Visa Services',
    image: '/images/categories/visa-services_c377vc.jpg',
    alt: 'Visa Services',
    href: '#visa-services'
  },
  {
    id: 'tour-packages',
    name: 'Tour Packages',
    image: '/images/categories/tours_zbbfdl.jpg',
    alt: 'Tour Packages',
    href: '#tour-packages'
  }
];

export default function FeaturedNavigation() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const renderIcon = (category: CategoryItem) => {
    const commonProps = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      className: 'w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg'
    } as const;

    switch (category.id) {
      case 'dubai-activities':
        return (
          <svg {...commonProps} strokeWidth="2">
            <path d="M12 3l2.1 4.26L18.9 8.4l-3.9 3.8.92 5.36L12 15.9l-3.92 1.96.92-5.36L5.1 8.4l4.8-1.14L12 3z" fill="currentColor" />
          </svg>
        );
      case 'visa-services':
        return (
          <svg {...commonProps} strokeWidth="2">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M9 16h6" />
          </svg>
        );
      case 'tour-packages':
        return (
          <svg {...commonProps} strokeWidth="2">
            <rect x="4" y="7" width="16" height="12" rx="2" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M12 11v6" />
          </svg>
        );
      default:
        return (
          <svg {...commonProps} strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
          </svg>
        );
    }
  };

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.href && category.href.startsWith('#')) {
      const element = document.querySelector(category.href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className="relative overflow-hidden lg:overflow-visible pb-12 pt-12" aria-labelledby="featured-navigations">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-6 md:space-x-8 lg:space-x-12 justify-center">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center group flex-shrink-0 relative"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              role="group"
              aria-label={`${index + 1} / ${categories.length}`}
            >
              {category.isButton ? (
                <div className="relative">
                  {category.badge && (
                    <span className={`
                      absolute font-semibold px-2.5 py-1 -right-2 -top-2 rounded-full text-white text-xs z-10
                      shadow-lg transform transition-all duration-300
                      ${category.badge.color === 'red' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : 'bg-gradient-to-r from-[#caa26e] to-amber-500'
                      }
                      ${hoveredId === category.id ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                    `}>
                      {category.badge.text === 'PRO Service' ? 'PRO' : 
                       category.badge.text === 'VIP Service' ? 'VIP' : 
                       category.badge.text}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50 rounded-2xl p-2 transition-all duration-300"
                  >
                    <figure className={`
                      relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0
                      transform transition-all duration-500 cursor-pointer
                      ${hoveredId === category.id ? 'scale-110 -translate-y-2' : 'scale-100 translate-y-0'}
                    `}>
                      {/* Animated background glow */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 rounded-2xl opacity-0
                        blur-xl transition-opacity duration-500
                        ${hoveredId === category.id ? 'opacity-60' : 'opacity-0'}
                      `}></div>
                      
                      {/* Main icon container with modern design */}
                      <div className={`
                        relative w-full h-full bg-gradient-to-br from-[#008c95] via-teal-600 to-cyan-700
                        rounded-2xl shadow-2xl border-[3px] border-white/30 backdrop-blur-sm
                        flex items-center justify-center overflow-hidden
                        transition-all duration-500
                        ${hoveredId === category.id ? 'border-white/60 shadow-cyan-500/25' : ''}
                      `}>
                        {/* Animated shine overlay */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
                          transform -skew-x-12 transition-transform duration-1000
                          ${hoveredId === category.id ? 'translate-x-full' : '-translate-x-full'}
                        `}></div>
                        
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%" viewBox="0 0 40 40" className="w-full h-full">
                            <defs>
                              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                                <circle cx="4" cy="4" r="1" fill="white" opacity="0.3"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                          </svg>
                        </div>
                        
                        {/* Icon */}
                        <div className="relative z-10">
                          {renderIcon(category)}
                        </div>
                      </div>
                    </figure>
                    <figcaption className={`
                      text-center leading-4 capitalize text-sm md:text-base lg:text-lg font-semibold mt-3 
                      max-w-24 md:max-w-28 lg:max-w-32 transition-all duration-300
                      ${hoveredId === category.id 
                        ? 'text-[#008c95] transform -translate-y-1 scale-105' 
                        : 'text-gray-700'
                      }
                    `}>
                      {category.name}
                    </figcaption>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  {category.badge && (
                    <span className={`
                      absolute font-semibold px-2.5 py-1 -right-2 -top-2 rounded-full text-white text-xs z-10
                      shadow-lg transform transition-all duration-300
                      ${category.badge.color === 'red' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600' 
                        : 'bg-gradient-to-r from-[#008c95] to-cyan-600'
                      }
                      ${hoveredId === category.id ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
                    `}>
                      {category.badge.text === 'PRO Service' ? 'PRO' : 
                       category.badge.text === 'VIP Service' ? 'VIP' : 
                       category.badge.text}
                    </span>
                  )}
                  <a
                    href={category.href}
                    target={category.target}
                    rel={category.rel}
                    className="flex flex-col items-center text-center group focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50 rounded-2xl p-2 transition-all duration-300"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <figure className={`
                      relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0
                      transform transition-all duration-500
                      ${hoveredId === category.id ? 'scale-110 -translate-y-2' : 'scale-100 translate-y-0'}
                    `}>
                      {/* Animated background glow */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 rounded-2xl opacity-0
                        blur-xl transition-opacity duration-500
                        ${hoveredId === category.id ? 'opacity-60' : 'opacity-0'}
                      `}></div>
                      
                      {/* Main icon container */}
                      <div className={`
                        relative w-full h-full bg-gradient-to-br from-[#008c95] via-teal-600 to-cyan-700
                        rounded-2xl shadow-2xl border-[3px] border-white/30 backdrop-blur-sm
                        flex items-center justify-center overflow-hidden
                        transition-all duration-500
                        ${hoveredId === category.id ? 'border-white/60 shadow-cyan-500/25' : ''}
                      `}>
                        {/* Animated shine overlay */}
                        <div className={`
                          absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
                          transform -skew-x-12 transition-transform duration-1000
                          ${hoveredId === category.id ? 'translate-x-full' : '-translate-x-full'}
                        `}></div>
                        
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%" viewBox="0 0 40 40" className="w-full h-full">
                            <defs>
                              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                                <circle cx="4" cy="4" r="1" fill="white" opacity="0.3"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                          </svg>
                        </div>
                        
                        {/* Icon */}
                        <div className="relative z-10">
                          {renderIcon(category)}
                        </div>
                      </div>
                    </figure>
                    <figcaption className={`
                      leading-4 capitalize text-sm md:text-base lg:text-lg font-semibold mt-3 
                      max-w-24 md:max-w-28 lg:max-w-32 transition-all duration-300
                      ${hoveredId === category.id 
                        ? 'text-[#008c95] transform -translate-y-1 scale-105' 
                        : 'text-gray-700'
                      }
                    `}>
                      {category.name}
                    </figcaption>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}