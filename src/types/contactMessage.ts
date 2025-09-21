export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

export type ContactMessageStatus = 'unread' | 'read' | 'replied' | 'archived';
export type ContactMessageStatusFilter = 'all' | ContactMessageStatus;