export type TourPackage = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  destinations?: string[];
  highlights?: string[];
};

export const tourPackages: TourPackage[] = [
  {
    id: 'maldives',
    title: 'Maldives Tour – 4 Nights / 5 Days',
    description:
      'Relax in paradise with a 4★ hotel stay, transfers, breakfast, and day trips to Vaadhoo Island, Alimatha Island, Addu Atoll, Banana Reef, and Mirihi Island.',
    duration: '5 days / 4 nights',
    price: 'AED 2199',
    image: '/images/UmrahPackages/umrah_package1.webp',
    imageAlt: 'Maldives Tour – 4 Nights / 5 Days',
    destinations: ['Male', 'Vaadhoo', 'Addu Atoll'],
    highlights: ['4★ Hotel', 'Breakfast Included', 'Island Hopping']
  },
  {
    id: 'las-vegas',
    title: 'Las Vegas Tour – 5 Nights / 6 Days',
    description:
      'Experience the excitement of Las Vegas with a 4★ hotel stay, transfers, breakfast, and day trips to the Fountains of Bellagio, Sphere, Fremont Street, and AREA15.',
    duration: '6 days / 5 nights',
    price: 'AED 3999',
    image: '/images/UmrahPackages/umrah_package2.webp',
    imageAlt: 'Las Vegas Tour – 5 Nights / 6 Days',
    destinations: ['Las Vegas Strip', 'Fremont Street'],
    highlights: ['4★ Hotel', 'Shows & Attractions']
  },
  {
    id: 'greece',
    title: 'Greece Tour – 3 Nights / 4 Days',
    description:
      'Explore Greece with a 4★ hotel stay, transfers, breakfast, and day trips to Athens, the Acropolis, Parthenon, and Paros.',
    duration: '4 days / 3 nights',
    price: 'AED 2199',
    image: '/images/UmrahPackages/umrah_package3.webp',
    imageAlt: 'Greece Tour – 3 Nights / 4 Days',
    destinations: ['Athens', 'Paros'],
    highlights: ['Acropolis', 'Parthenon']
  }
];

export const getTourPackageById = (id: string): TourPackage | undefined =>
  tourPackages.find((t) => t.id === id);


