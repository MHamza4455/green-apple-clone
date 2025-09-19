export type InquiryType = 'visa' | 'tour';

export interface BaseInquiry {
  id: number;
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface VisaInquiry extends BaseInquiry {
  type: 'visa';
  country: string;
  visaType?: string;
  travelDate?: string;
}

export interface TourInquiry extends BaseInquiry {
  type: 'tour';
  tourTitle: string;
  tourDuration?: string;
  tourPrice?: string;
  travelDate?: string;
  travelers?: number;
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

export type InquiryStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';
export type InquiryStatusFilter = 'all' | InquiryStatus;
