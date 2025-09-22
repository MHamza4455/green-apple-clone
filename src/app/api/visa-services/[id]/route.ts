import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single visa service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const visaService = await prisma.visaService.findUnique({
      where: { id: params.id },
    });

    if (!visaService) {
      return NextResponse.json(
        { error: "Visa service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(visaService);
  } catch (error) {
    console.error("Error fetching visa service:", error);
    return NextResponse.json(
      { error: "Failed to fetch visa service" },
      { status: 500 },
    );
  }
}

// PUT update visa service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    // Check if service exists
    const existingService = await prisma.visaService.findUnique({
      where: { id: params.id },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Visa service not found" },
        { status: 404 },
      );
    }

    // Check if code already exists (excluding current service)
    if (code && code !== existingService.code) {
      const codeExists = await prisma.visaService.findUnique({
        where: { code },
      });

      if (codeExists) {
        return NextResponse.json(
          { error: "Service code already exists" },
          { status: 400 },
        );
      }
    }

    const updatedService = await prisma.visaService.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(code && { code }),
        ...(price && { price }),
        ...(description && { description }),
        ...(documentsRequired && { documentsRequired }),
        ...(documentsProvided && { documentsProvided }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error updating visa service:", error);
    return NextResponse.json(
      { error: "Failed to update visa service" },
      { status: 500 },
    );
  }
}

// DELETE visa service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const existingService = await prisma.visaService.findUnique({
      where: { id: params.id },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Visa service not found" },
        { status: 404 },
      );
    }

    await prisma.visaService.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Visa service deleted successfully" });
  } catch (error) {
    console.error("Error deleting visa service:", error);
    return NextResponse.json(
      { error: "Failed to delete visa service" },
      { status: 500 },
    );
  }
}
