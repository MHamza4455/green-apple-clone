export interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  category: string;
  status: string;
  featured: boolean;
  includedItems: string[];
  highlights: string[];
  itinerary: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TourPackageFormData {
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  imageAlt: string;
  category: string;
  status: string;
  featured: boolean;
  includedItems: string[];
  highlights: string[];
  itinerary: string[];
}

export type TourPackageStatus = "active" | "inactive";
export type TourPackageCategory = "all" | "featured" | "umrah" | "holiday";
export type TourPackageFilter = "all" | "featured" | "not-featured";
export type TourPackageStatusFilter = "all" | TourPackageStatus;
