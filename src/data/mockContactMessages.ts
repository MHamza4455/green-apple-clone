import { ContactMessage } from "@/types/contactMessage";

export const mockContactMessages: ContactMessage[] = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    email: "ahmed.rashid@email.com",
    phone: "+971501234567",
    subject: "Inquiry about group tour packages",
    message:
      "Hello, I am interested in organizing a group tour for 15 people to Turkey. Could you please provide me with more information about your group packages and pricing?",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+971507654321",
    subject: "Visa processing time",
    message:
      "Hi, I applied for a UK visa through your services last week. Could you please let me know the current processing time and when I can expect to receive my visa?",
    status: "read",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    subject: "Custom tour itinerary request",
    message:
      "I am planning a honeymoon trip to Europe and would like to know if you can create a custom itinerary for us. We are interested in visiting Paris, Rome, and Barcelona over 10 days.",
    status: "replied",
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-01-12T16:30:00Z",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+971501112223",
    subject: "Flight booking assistance",
    message:
      "I need help booking flights for my family trip to Japan. Could you please check the best available options for travel dates between March 15-25, 2024?",
    status: "new",
    createdAt: "2024-01-16T11:20:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    email: "fatima.zahra@email.com",
    phone: "+971505556667",
    subject: "Umrah package inquiry",
    message:
      "Assalamu alaikum, I am looking for Umrah packages for my family of 6 people. Could you please send me the available packages and their details?",
    status: "read",
    createdAt: "2024-01-13T15:10:00Z",
    updatedAt: "2024-01-15T12:45:00Z",
  },
  {
    id: 6,
    name: "John Smith",
    email: "john.smith@email.com",
    subject: "Complaint about service",
    message:
      "I am not satisfied with the hotel accommodation provided during my recent tour to Thailand. The hotel was not as advertised and the service was poor.",
    status: "archived",
    createdAt: "2024-01-08T09:30:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 7,
    name: "Lisa Chen",
    email: "lisa.chen@email.com",
    phone: "+971509998887",
    subject: "Business visa for China",
    message:
      "I need to apply for a business visa to China for an upcoming conference. What documents do I need to prepare and how long does the process take?",
    status: "new",
    createdAt: "2024-01-17T08:15:00Z",
    updatedAt: "2024-01-17T08:15:00Z",
  },
  {
    id: 8,
    name: "Mohammed Hassan",
    email: "mohammed.hassan@email.com",
    subject: "Hajj package 2024",
    message:
      "I am interested in booking a Hajj package for 2024. Please provide me with the available packages, pricing, and what is included in each package.",
    status: "replied",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-16T10:30:00Z",
  },
];
