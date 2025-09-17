export type VisaService = {
  id: string;
  title: string;
  description: string;
  country: string;
  type: string; // Tourist, Business, Student, etc.
  processingTime: string;
  price: string;
  validity: string;
  requirements: string[];
  documents: string[];
  image: string;
  imageAlt: string;
  status: 'active' | 'inactive';
  featured?: boolean;
};

export const visaServices: VisaService[] = [
  {
    id: 'usa-tourist',
    title: 'USA Tourist Visa',
    description: 'Apply for a tourist visa to visit the United States for leisure, tourism, or visiting friends and family.',
    country: 'United States',
    type: 'Tourist Visa',
    processingTime: '15-30 days',
    price: 'AED 850',
    validity: '10 years',
    requirements: ['Valid passport', 'Completed DS-160 form', 'Passport photos', 'Proof of financial support'],
    documents: ['Passport', 'DS-160 confirmation', 'Photo', 'Bank statements', 'Travel itinerary'],
    image: '/images/UmrahPackages/umrah_package1.webp',
    imageAlt: 'USA Tourist Visa Application',
    status: 'active',
    featured: true
  },
  {
    id: 'uk-visitor',
    title: 'UK Visitor Visa',
    description: 'Standard visitor visa for tourism, business meetings, or visiting family in the United Kingdom.',
    country: 'United Kingdom',
    type: 'Visitor Visa',
    processingTime: '3-8 weeks',
    price: 'AED 720',
    validity: '6 months',
    requirements: ['Valid passport', 'Completed application form', 'Passport photos', 'Financial documents'],
    documents: ['Passport', 'Application form', 'Photo', 'Bank statements', 'Accommodation proof'],
    image: '/images/UmrahPackages/umrah_package2.webp',
    imageAlt: 'UK Visitor Visa Application',
    status: 'active',
    featured: true
  },
  {
    id: 'schengen-tourist',
    title: 'Schengen Tourist Visa',
    description: 'Multi-country visa allowing travel to 26 European countries in the Schengen area.',
    country: 'Schengen Area',
    type: 'Tourist Visa',
    processingTime: '15-30 days',
    price: 'AED 650',
    validity: '90 days',
    requirements: ['Valid passport', 'Completed application', 'Passport photos', 'Travel insurance'],
    documents: ['Passport', 'Application form', 'Photo', 'Insurance certificate', 'Hotel bookings'],
    image: '/images/UmrahPackages/umrah_package3.webp',
    imageAlt: 'Schengen Tourist Visa Application',
    status: 'active'
  },
  {
    id: 'canada-tourist',
    title: 'Canada Tourist Visa',
    description: 'Visitor visa for tourism, visiting family, or business purposes in Canada.',
    country: 'Canada',
    type: 'Visitor Visa',
    processingTime: '2-4 weeks',
    price: 'AED 580',
    validity: '6 months',
    requirements: ['Valid passport', 'Completed application', 'Passport photos', 'Proof of ties to home country'],
    documents: ['Passport', 'Application form', 'Photo', 'Employment letter', 'Financial documents'],
    image: '/images/UmrahPackages/umrah_package4.webp',
    imageAlt: 'Canada Tourist Visa Application',
    status: 'active'
  },
  {
    id: 'australia-tourist',
    title: 'Australia Tourist Visa',
    description: 'Visitor visa for tourism, visiting family, or business activities in Australia.',
    country: 'Australia',
    type: 'Visitor Visa',
    processingTime: '1-4 weeks',
    price: 'AED 520',
    validity: '3 months',
    requirements: ['Valid passport', 'Completed application', 'Passport photos', 'Financial proof'],
    documents: ['Passport', 'Application form', 'Photo', 'Bank statements', 'Travel plans'],
    image: '/images/UmrahPackages/umrah_package1.webp',
    imageAlt: 'Australia Tourist Visa Application',
    status: 'active'
  }
];

export const getVisaServiceById = (id: string): VisaService | undefined =>
  visaServices.find((v) => v.id === id);

export const getVisaServicesByCountry = (country: string): VisaService[] =>
  visaServices.filter((v) => v.country.toLowerCase().includes(country.toLowerCase()));

export const getVisaServicesByType = (type: string): VisaService[] =>
  visaServices.filter((v) => v.type.toLowerCase().includes(type.toLowerCase()));
