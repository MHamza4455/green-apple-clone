'use client';

import Image from 'next/image';

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
                  <div className="relative">
                    {category.badge && (
                      <span 
                        className={`absolute font-light px-2 py-1 right-0 rounded-br-md rounded-tl-md text-white text-xs top-0 z-10 ${
                          category.badge.color === 'red' ? 'bg-red-500' : 'bg-[#caa26e]'
                        }`}
                      >
                        {category.badge.text === 'PRO Service' ? 'PRO' : 
                         category.badge.text === 'VIP Service' ? 'VIP' : 
                         category.badge.text}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category)}
                      className="flex flex-col items-center"
                    >
                      <figure className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-full overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
                        <Image
                          src={category.image}
                          alt={category.alt}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </figure>
                      <figcaption className="text-center leading-4 capitalize text-sm md:text-base lg:text-lg font-light mt-3 max-w-24 md:max-w-28 lg:max-w-32" style={{ color: 'rgba(0,140,149,1)' }}>
                        {category.name}
                      </figcaption>
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    {category.badge && (
                      <span 
                        className={`absolute font-light px-2 py-1 right-0 rounded-br-md rounded-tl-md text-white text-xs top-0 z-10 ${
                          category.badge.color === 'red' ? 'bg-red-500' : 'bg-[#008c95]'
                        }`}
                      >
                        {category.badge.text === 'PRO Service' ? 'PRO' : 
                         category.badge.text === 'VIP Service' ? 'VIP' : 
                         category.badge.text}
                      </span>
                    )}
                    <a
                      href={category.href}
                      target={category.target}
                      rel={category.rel}
                      className="flex flex-col items-center text-center group"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <figure className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-full overflow-hidden transform transition duration-500 hover:scale-105">
                        <Image
                          src={category.image}
                          alt={category.alt}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </figure>
                      <figcaption className="leading-4 capitalize text-sm md:text-base lg:text-lg font-light mt-3 max-w-24 md:max-w-28 lg:max-w-32" style={{ color: 'rgba(0,140,149,1)' }}>
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
    </section>
  );
}
