export interface TourPackage {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  included: string[];
  notIncluded: string[];
  category: 'featured' | 'all';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface TourPackageFormData {
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  included: string[];
  notIncluded: string[];
  category: 'featured' | 'all';
  status: 'active' | 'inactive';
}

export type TourPackageFilter = 'all' | 'featured' | 'not-featured';
export type TourPackageStatusFilter = 'all' | 'active' | 'inactive';
