
'use client';
import { useState } from 'react';

const DUMMY_REVIEWS = [
  {
    name: 'Karim ELTANTAWI',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: 'Aug 20, 2025',
    rating: 5,
    body: 'Excellent support from Dima and Sham.'
  },
  {
    name: 'ahmed elfaki',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    date: 'Aug 15, 2025',
    rating: 5,
    body: 'Excellent service.'
  },
  {
    name: 'Hicham zahoui',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: 'Aug 15, 2025',
    rating: 5,
    body: 'Honestly, the best service office I’ve dealt with in terms of good treatment and fast processing of transactions.'
  },
  {
    name: 'Merisa Supan (Maysa)',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    date: 'Aug 12, 2025',
    rating: 5,
    body: 'I got my visa from getting assistance from Anfisa, she did excellent job to help me to get visa easily. Thank you so much Highly recommended.'
  },
  {
    name: 'm3ammar imhaisen',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    date: 'Aug 8, 2025',
    rating: 5,
    body: 'I had a fantastic experience with Green Apple Travel Agency, Vanessa was incredibly helpful and amazing throughout the process. Thank you Vanessa.'
  },
  {
    name: 'chadi chamoun',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: 'Jul 31, 2025',
    rating: 5,
    body: 'Ruema is a total star. Helped process visa within 3 days.'
  },
  {
    name: 'syed hasan',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    date: 'Jul 26, 2025',
    rating: 5,
    body: 'I have Good experience from Green apple Travel to get my required visa. Service of Ms Sham is excellent and professional.'
  },
  {
    name: 'Varun Asser',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'Great and prompt service! Leo helped and was readily available for any questions. Very clear communication.'
  },
  {
    name: 'ALAIN ABIABI',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'fast and smooth processing as long as you provide all the necessary documents.'
  },
  {
    name: 'Amine Mousa',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    date: 'Jul 24, 2025',
    rating: 5,
    body: 'Very quick in response, Professionalism , full knowledge in travel procedures . Highly Recommend 👌. Thank you Leo.'
  },
  {
    name: 'Fatima A.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: 'Jul 20, 2025',
    rating: 5,
    body: 'Highly recommended for Umrah packages.'
  },
  {
    name: 'Sarah M.',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    date: 'Jul 18, 2025',
    rating: 5,
    body: 'Amazing tour packages and great customer support.'
  },
  {
    name: 'Ahmed K.',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    date: 'Jul 15, 2025',
    rating: 5,
    body: 'Excellent service! They made my visa process so smooth.'
  },
  {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: 'Jul 10, 2025',
    rating: 5,
    body: 'Very professional and quick response.'
  },
  {
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: 'Jul 8, 2025',
    rating: 5,
    body: 'Great experience overall.'
  },
  {
    name: 'Ali R.',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    date: 'Jul 5, 2025',
    rating: 5,
    body: 'Visa process was seamless.'
  },
  {
    name: 'Mona L.',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    date: 'Jul 2, 2025',
    rating: 5,
    body: 'Staff was very helpful.'
  },
  {
    name: 'Rashid S.',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    date: 'Jun 30, 2025',
    rating: 5,
    body: 'Highly recommend their services.'
  },
  {
    name: 'Laila T.',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    date: 'Jun 28, 2025',
    rating: 5,
    body: 'Very satisfied with the support.'
  },
  {
    name: 'Omar Z.',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    date: 'Jun 25, 2025',
    rating: 5,
    body: 'Quick and easy process.'
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-black' : 'text-gray-300'}`}
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
  const [visibleCount, setVisibleCount] = useState(5);
  const reviewsToShow = DUMMY_REVIEWS.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" aria-labelledby="reviews-title">
      <header className="text-center">
        <h2
          id="reviews-title"
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
        >
          What our travelers say
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-5">
          <span className="font-semibold text-gray-800">5.0/5</span>
          <span className="mx-2 text-gray-300">•</span>
          <span>
            <span className="font-semibold text-gray-800">640</span> reviews
          </span>
        </p>

        <a
          href="https://g.page/r/CSVOuDsOGf38EAI/review?kd"
          rel="nofollow"
          target="_blank"
          className="py-3 px-8 font-light text-white rounded-full hover:opacity-80 transition duration-300 uppercase text-base"
          style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}
        >
          Leave a Review
        </a>
      </header>

      {/* List */}
      <ul id="testimonial-grid" className="divide-y divide-slate-200">
        {reviewsToShow.map((review, idx) => (
          <li key={idx} className="py-10">
            <article className="flex items-start gap-5" itemScope itemType="https://schema.org/Review">
              <figure className="shrink-0 w-14 h-14 rounded-full overflow-hidden ring-1 ring-slate-200 flex items-center justify-center bg-gray-100">
                <img
                  src={review.avatar}
                  alt={`Reviewer avatar: ${review.name}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
                  }}
                />
              </figure>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{review.name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <time className="text-sm text-slate-500" dateTime={review.date}>{review.date}</time>
                </div>
                <p className="mt-4 text-[15px] leading-7 text-left text-slate-700 max-w-3xl">{review.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {/* Show more button */}
      {visibleCount < DUMMY_REVIEWS.length && (
        <div className="mt-10 flex justify-center" aria-live="polite">
          <button
            onClick={() => setVisibleCount((c) => c + 5)}
            className="py-3 px-10 font-light text-white rounded-full hover:opacity-80 transition duration-300 uppercase text-base cursor-pointer"
            style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}
          >
            Show more reviews
          </button>
        </div>
      )}
    </section>
  );
}