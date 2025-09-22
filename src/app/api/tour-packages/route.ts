import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const whereClause: Record<string, unknown> = {};

    // Filter by category if provided
    if (category && category !== "all") {
      whereClause.category = category;
    }

    // Filter by status if provided
    if (status && status !== "all") {
      whereClause.status = status;
    }

    // Filter by featured if provided
    if (featured !== null && featured !== undefined) {
      whereClause.featured = featured === "true";
    }

    // Search functionality
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const tourPackages = await prisma.tourPackage.findMany({
      where: whereClause,
      orderBy: [
        { featured: "desc" }, // Featured packages first
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(tourPackages);
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour packages" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Validate required fields
    if (!title || !description || !duration || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const tourPackage = await prisma.tourPackage.create({
      data: {
        title,
        description,
        duration,
        price,
        image,
        imageAlt: imageAlt || title,
        category: category || "all",
        status: status || "active",
        featured: featured || false,
        includedItems: includedItems || [],
        highlights: highlights || [],
        itinerary: itinerary || [],
      },
    });

    return NextResponse.json(tourPackage, { status: 201 });
  } catch (error) {
    console.error("Error creating tour package:", error);
    return NextResponse.json(
      { error: "Failed to create tour package" },
      { status: 500 },
    );
  }
}
