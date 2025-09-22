import { useState, useEffect } from "react";
import { ContactMessage, ContactMessageStatus } from "@/types/contactMessage";

export function useContactMessages() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contact messages from API
  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/contact-messages");
        if (!response.ok) {
          throw new Error("Failed to fetch contact messages");
        }
        const data = await response.json();
        setContactMessages(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching contact messages:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load contact messages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContactMessages();
  }, []);

  const updateContactMessageStatus = async (
    id: string,
    status: ContactMessageStatus,
  ) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact message status");
      }

      // Update local state
      setContactMessages((prev) =>
        prev.map((message) =>
          message.id === id
            ? { ...message, status, updatedAt: new Date().toISOString() }
            : message,
        ),
      );
    } catch (err) {
      console.error("Error updating contact message status:", err);
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const deleteContactMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact message");
      }

      // Update local state
      setContactMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (err) {
      console.error("Error deleting contact message:", err);
      setError(err instanceof Error ? err.message : "Failed to delete message");
    }
  };

  const getContactMessageById = (id: string): ContactMessage | undefined => {
    return contactMessages.find((message) => message.id === id);
  };

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact-messages");
      if (!response.ok) {
        throw new Error("Failed to fetch contact messages");
      }
      const data = await response.json();
      setContactMessages(data);
      setError(null);
    } catch (err) {
      console.error("Error refetching contact messages:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load contact messages",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    contactMessages,
    loading,
    error,
    updateContactMessageStatus,
    deleteContactMessage,
    getContactMessageById,
    refetch,
  };
}
