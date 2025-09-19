import { VisaService } from '@/types/visaService';

export const mockVisaServices: VisaService[] = [
  {
    id: 1,
    name: 'United States',
    code: 'us',
    price: '1500 AED',
    description: 'USA Visit Visa – 1500 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Visa copy',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Interview Preparation',
      'Flight & Hotel Reservation',
      'Application Form'
    ],
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'United Kingdom',
    code: 'uk',
    price: '1200 AED',
    description: 'UK Visit Visa – 1200 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Bank statements (3 months)',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Flight & Hotel Reservation',
      'Application Form'
    ],
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Canada',
    code: 'ca',
    price: '1800 AED',
    description: 'Canada Visit Visa – 1800 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Bank statements (6 months)',
      'Picture (white background)',
      'Travel history'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Flight & Hotel Reservation',
      'Application Form',
      'Biometric Appointment'
    ],
    status: 'active',
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    name: 'Schengen',
    code: 'eu',
    price: '1000 AED',
    description: 'Schengen Visa – 1000 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Bank statements (3 months)',
      'Picture (white background)',
      'Travel insurance'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Flight & Hotel Reservation',
      'Application Form'
    ],
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    name: 'Australia',
    code: 'au',
    price: '1600 AED',
    description: 'Australia Visit Visa – 1600 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Bank statements (3 months)',
      'Picture (white background)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Flight & Hotel Reservation',
      'Application Form'
    ],
    status: 'inactive',
    createdAt: '2024-01-03'
  },
  {
    id: 6,
    name: 'Japan',
    code: 'jp',
    price: '800 AED',
    description: 'Japan Visit Visa – 800 AED',
    documentsRequired: [
      'Passport copy',
      'Emirates ID copy',
      'Picture (white background)',
      'Bank statements (3 months)'
    ],
    documentsProvided: [
      'Cover Letter',
      'Travel Itinerary',
      'Flight & Hotel Reservation',
      'Application Form'
    ],
    status: 'active',
    createdAt: '2024-01-01'
  }
];
