'use client';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  href?: string;
  target?: string;
  rel?: string;
  isButton?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: 'dubai-activities',
    name: 'Dubai Activities',
    image: '/images/categories/activity_ulhgmv.jpg',
    alt: 'Dubai Activities',
    isButton: true
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
  const renderIcon = (category: CategoryItem) => {
    const commonProps = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      className: 'w-12 h-12 md:w-14 md:h-14 text-white'
    } as const;

    switch (category.id) {
      case 'dubai-activities':
        // Sparkle/star icon
        return (
          <svg {...commonProps} strokeWidth="1.5">
            <path d="M12 3l2.1 4.26L18.9 8.4l-3.9 3.8.92 5.36L12 15.9l-3.92 1.96.92-5.36L5.1 8.4l4.8-1.14L12 3z" fill="currentColor" />
          </svg>
        );
      case 'visa-services':
        // Passport icon
        return (
          <svg {...commonProps} strokeWidth="1.5">
            <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" />
            <circle cx="12" cy="10" r="3" stroke="currentColor" />
            <path d="M9 16h6" stroke="currentColor" />
          </svg>
        );
      case 'tour-packages':
        // Suitcase icon
        return (
          <svg {...commonProps} strokeWidth="1.5">
            <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" />
            <path d="M12 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" />
            <path d="M12 11v6" stroke="currentColor" />
          </svg>
        );
      default:
        // Generic circle icon
        return (
          <svg {...commonProps} strokeWidth="1.5">
            <circle cx="12" cy="12" r="5" stroke="currentColor" />
          </svg>
        );
    }
  };

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.href && category.href.startsWith('#')) {
      // Smooth scroll to section
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
    <section className="relative" aria-labelledby="featured-navigations">
      <section className="overflow-hidden lg:overflow-visible pb-12 pt-12" aria-label="Visa and Tour Categories">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-6 md:space-x-8 lg:space-x-12 justify-center">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex flex-col items-center text-center group flex-shrink-0"
                role="group"
                aria-label={`${index + 1} / ${categories.length}`}
              >
                {category.isButton ? (
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    className="flex flex-col items-center"
                  >
                    <figure className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0 transform transition duration-500 hover:scale-105 cursor-pointer border-4 border-[#FF4E00] p-1.5">
                      <div className="w-full h-full">
                        <div className="w-full h-full bg-[#FF4E00] flex items-center justify-center">
                          {renderIcon(category)}
                        </div>
                      </div>
                    </figure>
                    <figcaption 
                      className="text-center leading-4 capitalize text-sm md:text-base lg:text-lg font-light mt-3 max-w-24 md:max-w-28 lg:max-w-32 text-black"
                    >
                      {category.name}
                    </figcaption>
                  </button>
                ) : (
                  <a
                    href={category.href}
                    target={category.target}
                    rel={category.rel}
                    className="flex flex-col items-center text-center group"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <figure className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex-shrink-0 transform transition duration-500 hover:scale-105 border-4 border-[#FF4E00] p-1.5">
                      <div className="w-full h-full">
                        <div className="w-full h-full bg-[#FF4E00] flex items-center justify-center">
                          {renderIcon(category)}
                        </div>
                      </div>
                    </figure>
                    <figcaption 
                      className="leading-4 capitalize text-sm md:text-base lg:text-lg font-light mt-3 max-w-24 md:max-w-28 lg:max-w-32 text-black"
                    >
                      {category.name}
                    </figcaption>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
