'use client';

import Image from 'next/image';

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
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
  const handleLearnMore = () => {
    // Scroll to contact form section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <article
      tabIndex={0}
      className="relative hover:bg-gray-100 transform duration-300 ease-in-out cursor-pointer rounded-lg flex flex-col min-h-[24rem] max-h-[28rem] flex-shrink-0"
      style={{ 
        width: '100%',
        maxWidth: '402px',
        marginRight: '15px',
        boxShadow: '-4px 9px 25px -6px rgba(0, 0, 0, .1)'
      }}
      role="group"
      aria-label={title}
    >
      {/* Duration Badge */}
      <div className="absolute z-10 text-white top-3 left-3 px-2 py-1 rounded-md text-xs tracking-wider font-light" style={{ backgroundColor: 'rgba(0, 118, 111, 1)' }}>
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
          <h2 className="text-sm sm:text-lg font-bold mb-2 nowraptitle" style={{ color: 'rgba(0,118,111,1)' }}>
            {title}
          </h2>
          <p className="text-sm mb-4 line-clamp-3" style={{ color: 'rgba(0,118,111,1)' }}>
            {description}
          </p>
        </header>

                {/* Price and Button */}
        <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto w-full gap-3">
          <p className="font-normal text-sm" style={{ color: 'rgba(0,118,111,1)' }}>
            from <span className="font-bold text-lg" style={{ color: 'rgba(0,118,111,1)' }}>{price}</span>
          </p>
          <button
            onClick={handleLearnMore}
            className="hover:bg-gray-500 transition-colors w-full sm:w-auto"
            style={{ 
              backgroundColor: 'rgba(202,162,110,1)',
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
  );
}
