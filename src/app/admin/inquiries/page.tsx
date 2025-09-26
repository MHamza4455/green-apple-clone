"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiSearch, FiEye } from "react-icons/fi";
import { Inquiry, InquiryType, InquiryStatusFilter } from "@/types/inquiry";
import { useInquiries } from "@/hooks/useInquiries";

export default function AdminInquiries() {
  const router = useRouter();
  const {
    inquiries,
    loading,
    error,
    updateInquiryStatus,
    deleteInquiry,
    refreshInquiries,
  } = useInquiries();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<InquiryType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<InquiryStatusFilter>("all");

  // Filter inquiries based on search and filters
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.type === "VISA"
        ? inquiry.metadata?.country
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        : inquiry.metadata?.tourTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || inquiry.type === filterType;
    const matchesStatus =
      filterStatus === "all" || inquiry.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Action handlers
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiry(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateInquiryStatus(
      id,
      newStatus as "NEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
    );
  };

  const handleViewDetails = (inquiry: Inquiry) => {
    router.push(`/admin/inquiries/${inquiry.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "VISA"
      ? "bg-purple-100 text-purple-800"
      : "bg-orange-100 text-orange-800";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inquiries Management
        </h1>
        <p className="text-gray-600">
          Manage customer inquiries for visa services and tour packages
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Inquiries
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {inquiries.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            New Inquiries
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {inquiries.filter((inquiry) => inquiry.status === "NEW").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Visa Inquiries
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {inquiries.filter((inquiry) => inquiry.type === "VISA").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tour Inquiries
          </h3>
          <p className="text-3xl font-bold" style={{ color: "#FF4E00" }}>
            {inquiries.filter((inquiry) => inquiry.type === "TOUR").length}
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
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as InquiryType | "all")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="VISA">Visa Inquiries</option>
              <option value="TOUR">Tour Inquiries</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as InquiryStatusFilter)
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inquiries...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Error loading inquiries
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={refreshInquiries}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiries Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
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
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {inquiry.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="text-sm text-gray-500">
                            {inquiry.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(inquiry.type)}`}
                      >
                        {inquiry.type === "VISA" ? "Visa" : "Tour"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {inquiry.type === "VISA"
                          ? inquiry.metadata?.country
                          : inquiry.metadata?.tourTitle}
                      </div>
                      {inquiry.type === "TOUR" &&
                        inquiry.metadata?.travelers && (
                          <div className="text-sm text-gray-500">
                            {inquiry.metadata.travelers} travelers
                          </div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inquiry.status}
                        onChange={(e) =>
                          handleStatusChange(inquiry.id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="NEW">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(inquiry)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                          title="Delete Inquiry"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInquiries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No inquiries found</div>
              <div className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredInquiries.length} of {inquiries.length} inquiries
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
      )}
    </div>
  );
}
