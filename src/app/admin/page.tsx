"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (
      session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.SUPER_ADMIN
    ) {
      router.push("/");
      return;
    }

    // If user is authenticated and has admin role, redirect to dashboard
    if (session && (session.user.role === UserRole.ADMIN || session.user.role === UserRole.SUPER_ADMIN)) {
      router.push("/admin/dashboard");
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // This component will redirect, so we don't need to render anything
  return null;
}
