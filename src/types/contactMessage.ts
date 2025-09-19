export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived';
export type ContactMessageStatusFilter = 'all' | ContactMessageStatus;
