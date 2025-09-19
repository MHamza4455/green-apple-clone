export interface VisaService {
  id: number;
  name: string;
  code: string;
  price: string;
  description: string;
  documentsRequired: string[];
  documentsProvided: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface VisaServiceFormData {
  name: string;
  code: string;
  price: string;
  description: string;
  documentsRequired: string[];
  documentsProvided: string[];
  status: 'active' | 'inactive';
}

export type VisaServiceStatusFilter = 'all' | 'active' | 'inactive';
