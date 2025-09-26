import { useState, useEffect } from "react";
import { Inquiry, InquiryStatus } from "@/types/inquiry";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/inquiries");

      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }

      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateInquiryStatus = async (id: string, status: InquiryStatus) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update inquiry status");
      }

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id
            ? { ...inquiry, status, updatedAt: new Date().toISOString() }
            : inquiry,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update inquiry");
      console.error("Error updating inquiry status:", err);
    }
  };

  const deleteInquiry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete inquiry");
      }

      // Update local state
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete inquiry");
      console.error("Error deleting inquiry:", err);
    }
  };

  const getInquiryById = (id: string): Inquiry | undefined => {
    return inquiries.find((inquiry) => inquiry.id === id);
  };

  const refreshInquiries = () => {
    fetchInquiries();
  };

  return {
    inquiries,
    loading,
    error,
    updateInquiryStatus,
    deleteInquiry,
    getInquiryById,
    refreshInquiries,
  };
}
