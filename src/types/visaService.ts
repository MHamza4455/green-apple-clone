export interface VisaService {
  id: string;
  name: string;
  code: string;
  price: string;
  description: string;
  documentsRequired: string[];
  documentsProvided: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisaServiceFormData {
  name: string;
  code: string;
  price: string;
  description: string;
  documentsRequired: string[];
  documentsProvided: string[];
  status: string;
}

export type VisaServiceStatusFilter = 'all' | 'active' | 'inactive';
