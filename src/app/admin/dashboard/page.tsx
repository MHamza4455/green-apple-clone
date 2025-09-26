"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalTours: number;
  totalVisaServices: number;
  totalInquiries: number;
  totalContactMessages: number;
  newInquiries: number;
  featuredTours: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/dashboard/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to Radiant Way Travel Admin Panel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to Radiant Way Travel Admin Panel
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to Radiant Way Travel Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Tours
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {stats?.totalTours || 0}
          </p>
          {stats?.featuredTours !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              {stats.featuredTours} featured
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Visa Services
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {stats?.totalVisaServices || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Inquiries
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {stats?.totalInquiries || 0}
          </p>
          {stats?.newInquiries !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              {stats.newInquiries} new
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Contact Messages
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {stats?.totalContactMessages || 0}
          </p>
          {stats?.unreadMessages !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              {stats.unreadMessages} unread
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
