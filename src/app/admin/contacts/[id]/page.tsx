"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";
import { ContactMessage } from "@/types/contactMessage";
import { useContactMessages } from "@/hooks/useContactMessages";

export default function ContactMessageDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { contactMessages } = useContactMessages();
  const [contactMessage, setContactMessage] = useState<ContactMessage | null>(
    null,
  );

  useEffect(() => {
    const id = params.id as string;
    const message = contactMessages.find((m) => m.id === id);
    setContactMessage(message || null);
  }, [params.id, contactMessages]);

  if (!contactMessage) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Message Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The contact message you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/admin/contacts")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span
            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
              contactMessage.status,
            )}`}
          >
            {contactMessage.status.replace("_", " ").toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Contact Message Details
        </h1>
        <p className="text-gray-600">
          View and manage contact message information
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {contactMessage.serviceInterest || "General Inquiry"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-600">
                        {contactMessage.fullName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">
                        {contactMessage.email}
                      </span>
                    </div>
                  </div>
                  {contactMessage.phone && (
                    <div className="flex items-center gap-3">
                      <FiPhone className="w-5 h-5 text-gray-400" />
                      <div>
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {contactMessage.phone}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Message Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiMessageSquare className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Message ID:
                      </span>
                      <span className="ml-2 text-gray-600">
                        #{contactMessage.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Received:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {new Date(
                          contactMessage.createdAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Updated:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {new Date(
                          contactMessage.updatedAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Message Content
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {contactMessage.message}
              </p>
            </div>
          </div>
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
                Mark as Replied
              </button>
              <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200">
                Mark as Read
              </button>
              <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200">
                Archive Message
              </button>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Full Name
                </span>
                <p className="text-gray-900">{contactMessage.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Email Address
                </span>
                <p className="text-gray-900 break-all">
                  {contactMessage.email}
                </p>
              </div>
              {contactMessage.phone && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Phone Number
                  </span>
                  <p className="text-gray-900">{contactMessage.phone}</p>
                </div>
              )}
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
                    {new Date(contactMessage.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {contactMessage.status !== "new" && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {contactMessage.status.replace("_", " ").toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(contactMessage.updatedAt).toLocaleDateString()}
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
