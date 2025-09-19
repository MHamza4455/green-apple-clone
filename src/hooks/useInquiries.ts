import { useState } from 'react';
import { Inquiry, InquiryStatus } from '@/types/inquiry';
import { mockInquiries } from '@/data/mockInquiries';

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);

  const updateInquiryStatus = (id: number, status: InquiryStatus) => {
    setInquiries(prev =>
      prev.map(inquiry =>
        inquiry.id === id
          ? { ...inquiry, status, updatedAt: new Date().toISOString() }
          : inquiry
      )
    );
  };

  const deleteInquiry = (id: number) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
  };

  const getInquiryById = (id: number): Inquiry | undefined => {
    return inquiries.find(inquiry => inquiry.id === id);
  };

  return {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    getInquiryById
  };
}
