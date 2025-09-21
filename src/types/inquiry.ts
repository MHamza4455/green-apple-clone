export type InquiryType = 'VISA' | 'TOUR';

export interface BaseInquiry {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  travelDate?: string;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  metadata: any; // JSON field containing type-specific data
  createdAt: string;
  updatedAt: string;
}

export interface VisaInquiry extends BaseInquiry {
  type: 'VISA';
  metadata: {
    country: string;
    visaType?: string;
  };
}

export interface TourInquiry extends BaseInquiry {
  type: 'TOUR';
  metadata: {
    tourTitle: string;
    tourDuration?: string;
    tourPrice?: string;
    travelers?: number;
  };
}

export type Inquiry = VisaInquiry | TourInquiry;

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  // Visa specific fields
  country?: string;
  visaType?: string;
  // Tour specific fields
  tourTitle?: string;
  tourDuration?: string;
  tourPrice?: string;
  travelers?: number;
  // Common fields
  travelDate?: string;
}

export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type InquiryStatusFilter = 'all' | InquiryStatus;
