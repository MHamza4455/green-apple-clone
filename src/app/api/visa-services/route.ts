import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all visa services
export async function GET() {
  try {
    // Check if visaService model exists in Prisma client
    if (!prisma.visaService) {
      console.error(
        "VisaService model not found in Prisma client. Please run: npx prisma generate",
      );
      return NextResponse.json(
        {
          error:
            "Database model not initialized. Please run: npx prisma generate",
        },
        { status: 500 },
      );
    }

    const visaServices = await prisma.visaService.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(visaServices);
  } catch (error) {
    console.error("Error fetching visa services:", error);
    return NextResponse.json(
      { error: "Failed to fetch visa services" },
      { status: 500 },
    );
  }
}

// POST create new visa service
export async function POST(request: NextRequest) {
  try {
    // Check if visaService model exists in Prisma client
    if (!prisma.visaService) {
      console.error(
        "VisaService model not found in Prisma client. Please run: npx prisma generate",
      );
      return NextResponse.json(
        {
          error:
            "Database model not initialized. Please run: npx prisma generate",
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const {
      name,
      code,
      price,
      description,
      documentsRequired,
      documentsProvided,
      status,
    } = body;

    // Validate required fields
    if (!name || !code || !price || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if code already exists
    const existingService = await prisma.visaService.findUnique({
      where: { code },
    });

    if (existingService) {
      return NextResponse.json(
        { error: "Service code already exists" },
        { status: 400 },
      );
    }

    const visaService = await prisma.visaService.create({
      data: {
        name,
        code,
        price,
        description,
        documentsRequired: documentsRequired || [],
        documentsProvided: documentsProvided || [],
        status: status || "active",
      },
    });

    return NextResponse.json(visaService, { status: 201 });
  } catch (error) {
    console.error("Error creating visa service:", error);
    return NextResponse.json(
      { error: "Failed to create visa service" },
      { status: 500 },
    );
  }
}
