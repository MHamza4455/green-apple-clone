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
    id: 'e-sim',
    name: 'E-Sim',
    image: '/images/categories/e-sim.jpg',
    alt: 'E-Sim',
    href: 'https://greenapple.zetexa.com/',
    target: '_blank',
    rel: 'noreferrer',
    badge: {
      text: 'New',
      color: 'red'
    }
  },
  {
    id: 'documentation',
    name: 'documentation',
    image: '/images/categories/documentation_envgij.jpg',
    alt: 'documentation',
    isButton: true,
    badge: {
      text: 'PRO Service',
      color: 'accent'
    }
  },
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
    id: 'russia-embassies',
    name: 'Russia Embassies',
    image: '/images/categories/embassy_ssntnk.jpg',
    alt: 'Russia Embassies',
    isButton: true,
    badge: {
      text: 'VIP Service',
      color: 'accent'
    }
  },
  {
    id: 'schengen',
    name: 'schengen',
    image: '/images/categories/schengen_zovvid.jpg',
    alt: 'schengen',
    isButton: true
  },
  {
    id: 'updates',
    name: 'updates',
    image: '/images/categories/facts_g3rx0t.jpg',
    alt: 'updates',
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
                     <div className="flex space-x-4 overflow-x-auto lg:overflow-visible lg:justify-between pb-4 scrollbar-hide">
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
                          className={`absolute font-light px-1 right-0 rounded-br-md rounded-tl-md text-white text-xxs sm:text-xs top-0 z-10 ${
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
                    <figure className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-27 lg:h-27 flex-shrink-0 rounded-full overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer">
                      <Image
                        src={category.image}
                        alt={category.alt}
                        width={108}
                        height={108}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </figure>
                                         <figcaption className="text-center text-[rgba(0,118,111,1)] leading-3 capitalize text-xs md:text-sm w-16 sm:w-20 md:w-24 font-light mt-2">
                       {category.name}
                     </figcaption>
                     </button>
                   </div>
                                 ) : (
                   <div className="relative">
                     {category.badge && (
                                               <span 
                          className={`absolute font-light px-1 right-0 rounded-br-md rounded-tl-md text-white text-xxs sm:text-xs top-0 z-10 ${
                            category.badge.color === 'red' ? 'bg-red-500' : 'bg-[#33918c]'
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
                     >
                    <figure className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-27 lg:h-27 flex-shrink-0 rounded-full overflow-hidden transform transition duration-500 hover:scale-105">
                      <Image
                        src={category.image}
                        alt={category.alt}
                        width={108}
                        height={108}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </figure>
                                         <figcaption className="leading-3 text-[rgba(0,118,111,1)] capitalize text-xs md:text-sm w-16 sm:w-20 md:w-24 font-light mt-2">
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
