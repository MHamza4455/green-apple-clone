import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const tourPackage = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!tourPackage) {
      return NextResponse.json(
        { error: "Tour package not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(tourPackage);
  } catch (error) {
    console.error("Error fetching tour package:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour package" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      duration,
      price,
      image,
      imageAlt,
      category,
      status,
      featured,
      includedItems,
      highlights,
      itinerary,
    } = body;

    // Check if tour package exists
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: "Tour package not found" },
        { status: 404 },
      );
    }

    // Update the tour package
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (duration !== undefined) updateData.duration = duration;
    if (price !== undefined) updateData.price = price;
    if (image !== undefined) updateData.image = image;
    if (imageAlt !== undefined) updateData.imageAlt = imageAlt;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) updateData.status = status;
    if (featured !== undefined) updateData.featured = featured;
    if (includedItems !== undefined) updateData.includedItems = includedItems;
    if (highlights !== undefined) updateData.highlights = highlights;
    if (itinerary !== undefined) updateData.itinerary = itinerary;

    const updatedPackage = await prisma.tourPackage.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error("Error updating tour package:", error);
    return NextResponse.json(
      { error: "Failed to update tour package" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check if tour package exists
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: "Tour package not found" },
        { status: 404 },
      );
    }

    await prisma.tourPackage.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Tour package deleted successfully" });
  } catch (error) {
    console.error("Error deleting tour package:", error);
    return NextResponse.json(
      { error: "Failed to delete tour package" },
      { status: 500 },
    );
  }
}
