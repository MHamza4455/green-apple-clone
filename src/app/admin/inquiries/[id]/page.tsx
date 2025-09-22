"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Inquiry } from "@/types/inquiry";
import { useInquiries } from "@/hooks/useInquiries";

export default function InquiryDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { inquiries } = useInquiries();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundInquiry = inquiries.find((i) => i.id === id);
    setInquiry(foundInquiry || null);
  }, [params.id, inquiries]);

  if (!inquiry) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Inquiry Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The inquiry you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/admin/inquiries")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Back to Inquiries
          </button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex gap-2">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(
                inquiry.type,
              )}`}
            >
              {inquiry.type === "VISA" ? "Visa Inquiry" : "Tour Inquiry"}
            </span>
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                inquiry.status,
              )}`}
            >
              {inquiry.status.replace("_", " ")}
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inquiry Details
        </h1>
        <p className="text-gray-600">View and manage inquiry information</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="text-gray-600">{inquiry.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-600">{inquiry.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-600">
                      {inquiry.phone || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Inquiry Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Inquiry ID:
                    </span>
                    <span className="text-gray-600">#{inquiry.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Type:</span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                        inquiry.type,
                      )}`}
                    >
                      {inquiry.type === "VISA" ? "Visa" : "Tour"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        inquiry.status,
                      )}`}
                    >
                      {inquiry.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="text-gray-600">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Updated:</span>
                    <span className="text-gray-600">
                      {new Date(inquiry.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {inquiry.type === "VISA"
                ? "Visa Service Details"
                : "Tour Package Details"}
            </h2>

            <div className="space-y-4">
              {inquiry.type === "VISA" ? (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.country}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Visa Type:
                    </span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.visaType || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Travel Date:
                    </span>
                    <span className="text-gray-600">
                      {inquiry.travelDate
                        ? new Date(inquiry.travelDate).toLocaleDateString()
                        : "Not specified"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Tour Title:
                    </span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.tourTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.tourDuration || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.tourPrice || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Travelers:
                    </span>
                    <span className="text-gray-600">
                      {inquiry.metadata?.travelers || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Travel Date:
                    </span>
                    <span className="text-gray-600">
                      {inquiry.travelDate
                        ? new Date(inquiry.travelDate).toLocaleDateString()
                        : "Not specified"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Message */}
          {inquiry.message && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Customer Message
              </h2>
              <p className="text-gray-700 leading-relaxed">{inquiry.message}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Send Email Response
              </button>
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                Mark as Completed
              </button>
              <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                Mark as In Progress
              </button>
              <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200">
                Cancel Inquiry
              </button>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status History
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">New</div>
                  <div className="text-xs text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {inquiry.status !== "NEW" && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {inquiry.status.replace("_", " ")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(inquiry.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
