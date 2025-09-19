import { useState } from 'react';
import { ContactMessage, ContactMessageStatus } from '@/types/contactMessage';
import { mockContactMessages } from '@/data/mockContactMessages';

export function useContactMessages() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(mockContactMessages);

  const updateContactMessageStatus = (id: number, status: ContactMessageStatus) => {
    setContactMessages(prev =>
      prev.map(message =>
        message.id === id
          ? { ...message, status, updatedAt: new Date().toISOString() }
          : message
      )
    );
  };

  const deleteContactMessage = (id: number) => {
    setContactMessages(prev => prev.filter(message => message.id !== id));
  };

  const getContactMessageById = (id: number): ContactMessage | undefined => {
    return contactMessages.find(message => message.id === id);
  };

  return {
    contactMessages,
    updateContactMessageStatus,
    deleteContactMessage,
    getContactMessageById
  };
}
