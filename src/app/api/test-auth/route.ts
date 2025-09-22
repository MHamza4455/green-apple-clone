import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
      authenticated: !!session,
      user: session?.user || null,
      env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not set",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication test failed", details: error },
      { status: 500 },
    );
  }
}
