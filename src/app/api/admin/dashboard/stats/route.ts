import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 },
      );
    }

    // Fetch counts from database
    const [
      totalTours,
      totalVisaServices,
      totalInquiries,
      totalContactMessages,
    ] = await Promise.all([
      prisma.tourPackage.count({
        where: { status: "active" },
      }),
      prisma.visaService.count({
        where: { status: "active" },
      }),
      prisma.inquiry.count(),
      prisma.contactMessage.count(),
    ]);

    // Additional stats that might be useful
    const [newInquiries, featuredTours, unreadMessages] = await Promise.all([
      prisma.inquiry.count({
        where: { status: "NEW" },
      }),
      prisma.tourPackage.count({
        where: {
          status: "active",
          featured: true,
        },
      }),
      prisma.contactMessage.count({
        where: { status: "unread" },
      }),
    ]);

    const stats = {
      totalTours,
      totalVisaServices,
      totalInquiries,
      totalContactMessages,
      newInquiries,
      featuredTours,
      unreadMessages,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
