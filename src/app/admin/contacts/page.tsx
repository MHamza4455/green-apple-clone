"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import {
  ContactMessage,
  ContactMessageStatusFilter,
} from "@/types/contactMessage";
import { useContactMessages } from "@/hooks/useContactMessages";

export default function AdminContactMessages() {
  const router = useRouter();
  const {
    contactMessages,
    loading,
    error,
    updateContactMessageStatus,
    deleteContactMessage,
    refetch,
  } = useContactMessages();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<ContactMessageStatusFilter>("all");

  // Filter messages based on search and filters
  const filteredMessages = contactMessages.filter((message) => {
    const matchesSearch =
      message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.serviceInterest &&
        message.serviceInterest
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || message.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Action handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      deleteContactMessage(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateContactMessageStatus(
      id,
      newStatus as "unread" | "read" | "replied" | "archived",
    );
  };

  const handleViewDetails = (message: ContactMessage) => {
    router.push(`/admin/contacts/${message.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Contact Messages Management
        </h1>
        <p className="text-gray-600">
          Manage customer contact messages and inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Messages
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {contactMessages.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            New Messages
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {
              contactMessages.filter((message) => message.status === "new")
                .length
            }
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Read Messages
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {
              contactMessages.filter((message) => message.status === "read")
                .length
            }
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Replied Messages
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {
              contactMessages.filter((message) => message.status === "replied")
                .length
            }
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as ContactMessageStatusFilter)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Loading skeleton rows
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-48"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="h-8 bg-gray-200 rounded w-8"></div>
                        <div className="h-8 bg-gray-200 rounded w-8"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : error ? (
                // Error state
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-auto max-w-md">
                      <div className="text-red-800 font-medium">
                        Failed to load contact messages
                      </div>
                      <div className="text-red-600 text-sm mt-1">{error}</div>
                      <button
                        onClick={refetch}
                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                      >
                        Try Again
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                // No data state
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500 text-lg">
                      No contact messages found
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                      {searchTerm || filterStatus !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "No messages have been submitted yet"}
                    </div>
                  </td>
                </tr>
              ) : (
                // Data rows
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {message.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {message.email}
                        </div>
                        {message.phone && (
                          <div className="text-sm text-gray-500">
                            {message.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {message.serviceInterest || "General Inquiry"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {message.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={message.status}
                        onChange={(e) =>
                          handleStatusChange(message.id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${getStatusColor(message.status)}`}
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(message)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                          title="Delete Message"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredMessages.length} of {contactMessages.length} messages
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
