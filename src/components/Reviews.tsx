
'use client';
import { useState } from 'react';

const DUMMY_REVIEWS = [
  {
    name: 'Karim ELTANTAWI',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: 'Aug 20, 2025',
    rating: 5,
    body: 'Excellent support from Dima and Sham. They made the entire visa process smooth and stress-free. Highly professional team!',
    service: 'Visa Services'
  },
  {
    name: 'ahmed elfaki',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    date: 'Aug 15, 2025',
    rating: 5,
    body: 'Excellent service. The team was very responsive and helped me get my visa quickly. Will definitely recommend to others.',
    service: 'Visa Services'
  },
  {
    name: 'Hicham zahoui',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: 'Aug 15, 2025',
    rating: 5,
    body: 'Honestly, the best service office I\'ve dealt with in terms of good treatment and fast processing of transactions. Outstanding professionalism!',
    service: 'Tour Packages'
  },
  {
    name: 'Merisa Supan (Maysa)',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    date: 'Aug 12, 2025',
    rating: 5,
    body: 'I got my visa from getting assistance from Anfisa, she did excellent job to help me to get visa easily. Thank you so much Highly recommended.',
    service: 'Visa Services'
  },
  {
    name: 'm3ammar imhaisen',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    date: 'Aug 8, 2025',
    rating: 5,
    body: 'I had a fantastic experience with Green Apple Travel Agency, Vanessa was incredibly helpful and amazing throughout the process. Thank you Vanessa.',
    service: 'Tour Packages'
  },
  {
    name: 'chadi chamoun',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: 'Jul 31, 2025',
    rating: 5,
    body: 'Ruema is a total star. Helped process visa within 3 days. Incredible efficiency and professionalism.',
    service: 'Visa Services'
  },
  {
    name: 'syed hasan',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    date: 'Jul 26, 2025',
    rating: 5,
    body: 'I have Good experience from Green apple Travel to get my required visa. Service of Ms Sham is excellent and professional.',
    service: 'Visa Services'
  },
  {
    name: 'Varun Asser',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'Great and prompt service! Leo helped and was readily available for any questions. Very clear communication.',
    service: 'Tour Packages'
  },
  {
    name: 'ALAIN ABIABI',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'Fast and smooth processing as long as you provide all the necessary documents. Very efficient service.',
    service: 'Visa Services'
  },
  {
    name: 'Amine Mousa',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'Very quick in response, Professionalism, full knowledge in travel procedures. Highly Recommend 👌. Thank you Leo.',
    service: 'Tour Packages'
  },
  {
    name: 'Fatima A.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: 'Jul 20, 2025',
    rating: 5,
    body: 'Highly recommended for Umrah packages. The spiritual journey was perfectly organized and memorable.',
    service: 'Umrah Services'
  },
  {
    name: 'Sarah M.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    date: 'Jul 18, 2025',
    rating: 5,
    body: 'Amazing tour packages and great customer support. Every detail was taken care of perfectly.',
    service: 'Tour Packages'
  },
  {
    name: 'Ahmed K.',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    date: 'Jul 15, 2025',
    rating: 5,
    body: 'Excellent service! They made my visa process so smooth. Professional team with great attention to detail.',
    service: 'Visa Services'
  },
  {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: 'Jul 10, 2025',
    rating: 5,
    body: 'Very professional and quick response. The team exceeded my expectations in every way.',
    service: 'Tour Packages'
  },
  {
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: 'Jul 8, 2025',
    rating: 5,
    body: 'Great experience overall. The tour was well-organized and the guides were knowledgeable.',
    service: 'Tour Packages'
  },
  {
    name: 'Ali R.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    date: 'Jul 5, 2025',
    rating: 5,
    body: 'Visa process was seamless. The team handled everything professionally and efficiently.',
    service: 'Visa Services'
  },
  {
    name: 'Mona L.',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    date: 'Jul 2, 2025',
    rating: 5,
    body: 'Staff was very helpful. They went above and beyond to ensure my travel arrangements were perfect.',
    service: 'Tour Packages'
  },
  {
    name: 'Rashid S.',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    date: 'Jun 30, 2025',
    rating: 5,
    body: 'Highly recommend their services. Professional, reliable, and customer-focused approach.',
    service: 'Visa Services'
  },
  {
    name: 'Laila T.',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    date: 'Jun 28, 2025',
    rating: 5,
    body: 'Very satisfied with the support. The team made my Umrah journey truly special and memorable.',
    service: 'Umrah Services'
  },
  {
    name: 'Omar Z.',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    date: 'Jun 25, 2025',
    rating: 5,
    body: 'Quick and easy process. The team was professional and made everything stress-free.',
    service: 'Tour Packages'
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-white' : 'text-white text-opacity-40'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState<'all' | 'visa' | 'tours' | 'umrah'>('all');
  const [showGoogleButton, setShowGoogleButton] = useState(false);
  const reviewsToShow = DUMMY_REVIEWS.slice(0, visibleCount);

  const serviceFilters = [
    { id: 'all', name: 'All Reviews', count: DUMMY_REVIEWS.length },
    { id: 'visa', name: 'Visa Services', count: DUMMY_REVIEWS.filter(r => r.service === 'Visa Services').length },
    { id: 'tours', name: 'Tour Packages', count: DUMMY_REVIEWS.filter(r => r.service === 'Tour Packages').length },
    { id: 'umrah', name: 'Umrah Services', count: DUMMY_REVIEWS.filter(r => r.service === 'Umrah Services').length },
  ];

  const reviewsToDisplay = showGoogleButton ? DUMMY_REVIEWS.slice(0, 6) : reviewsToShow;
  
  const filteredReviews = activeFilter === 'all' 
    ? reviewsToDisplay
    : reviewsToDisplay.filter(review => {
        if (activeFilter === 'visa') return review.service === 'Visa Services';
        if (activeFilter === 'tours') return review.service === 'Tour Packages';
        if (activeFilter === 'umrah') return review.service === 'Umrah Services';
        return true;
      });

  return (
    <section className="relative py-16 px-4" style={{ backgroundColor: 'rgba(0, 140, 149, 0.05)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(0, 140, 149, 1)' }}>
            What our travelers say
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto mb-6" style={{ color: 'rgba(0, 140, 149, 1)', opacity: 0.8 }}>
            <span className="font-semibold">5.0/5</span>
            <span className="mx-2" style={{ opacity: 0.5 }}>•</span>
            <span>
              <span className="font-semibold">640+</span> happy customers
            </span>
          </p>

          <a
            href="https://g.page/r/CSVOuDsOGf38EAI/review?kd"
            rel="nofollow"
            target="_blank"
            className="inline-flex items-center gap-2 py-3 px-8 font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: 'rgba(255, 213, 90, 1)', color: 'rgba(0, 140, 149, 1)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Leave a Review
          </a>
        </header>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map((review, idx) => (
                         <div
               key={idx}
               className="p-8 transition-all duration-300 hover:scale-105"
               style={{ backgroundColor: 'rgba(0, 140, 149, 1)' }}
             >
               <article className="h-full flex flex-col text-white text-center" itemScope itemType="https://schema.org/Review">
                 {/* Quotation Mark */}
                 <div className="mb-6 flex justify-center">
                   <svg className="w-10 h-10 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                   </svg>
                 </div>

                 {/* Review Text */}
                 <div className="flex-1 mb-8">
                   <p className="text-base leading-relaxed text-white text-center">
                     {review.body}
                   </p>
                 </div>

                 {/* Customer Name */}
                 <div className="mb-4">
                   <p className="text-lg font-semibold text-white text-center">
                     {review.name}
                   </p>
                 </div>

                 {/* Star Rating */}
                 <div className="mb-3 flex justify-center">
                   <StarRating rating={review.rating} />
                 </div>

                 {/* Service Badge */}
                 <div className="mt-auto flex justify-center">
                   <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white">
                     {review.service}
                   </span>
                 </div>
               </article>
             </div>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < 6 && !showGoogleButton && (
          <div className="text-center" aria-live="polite">
            <button
                             onClick={() => {
                 const newCount = visibleCount + 3;
                 setVisibleCount(newCount);
                 if (newCount >= 6) {
                   setShowGoogleButton(true);
                 }
               }}
              className="py-3 px-10 font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: 'rgba(255, 213, 90, 1)', color: 'rgba(0, 140, 149, 1)' }}
            >
              Show More Reviews
            </button>
          </div>
        )}

        {/* Google Button */}
        {showGoogleButton && (
          <div className="text-center" aria-live="polite">
            <a
              href="https://g.page/r/CSVOuDsOGf38EAI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-10 font-semibold rounded-full hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: 'rgba(255, 213, 90, 1)', color: 'rgba(0, 140, 149, 1)' }}
            >
              More Reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
}