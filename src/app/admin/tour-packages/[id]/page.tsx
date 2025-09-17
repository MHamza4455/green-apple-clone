"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getTourPackageById, tourPackages } from "@/data/tourPackages";
import { loadTourPackages, saveTourPackages } from "@/lib/adminStorage";
import { useEffect, useMemo, useState } from "react";

export default function TourPackageDetails() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id ?? "");
  const [record, setRecord] = useState(() => getTourPackageById(id));

  useEffect(() => {
    const stored = loadTourPackages();
    if (stored && stored.length) {
      const found = stored.find((t) => t.id === id);
      if (found) setRecord(found);
    }
  }, [id]);

  const notFound = useMemo(() => !record, [record]);

  const onDelete = () => {
    const stored = loadTourPackages() ?? tourPackages;
    const next = stored.filter((t) => t.id !== id);
    saveTourPackages(next);
    router.push("/admin/tour-packages");
  };

  if (notFound) {
    return (
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-gray-900">Package Not Found</h2>
          <p className="mt-1 text-sm text-gray-600">The requested tour package does not exist.</p>
        </header>
        <Link href="/admin/tour-packages" className="text-sm text-emerald-700 hover:underline">Back to list</Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{record?.title}</h2>
          <p className="mt-1 text-sm text-gray-600">{record?.duration} • {record?.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/tour-packages/${id}/edit`} className="rounded-md border px-3 py-2 text-sm text-blue-700 border-blue-200 hover:bg-blue-50">Edit</Link>
          <button onClick={onDelete} className="rounded-md border px-3 py-2 text-sm text-red-700 border-red-200 hover:bg-red-50">Delete</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg overflow-hidden border border-gray-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={record?.image ?? ""} alt={record?.imageAlt ?? ""} className="w-full h-72 object-cover" />
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Overview</h3>
              <p className="mt-1 text-sm text-gray-700">{record?.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-xs uppercase text-gray-500">Destinations</div>
                <div className="mt-1 text-sm text-gray-900">{(record?.destinations ?? []).join(', ') || '—'}</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-xs uppercase text-gray-500">Highlights</div>
                <div className="mt-1 text-sm text-gray-900">{(record?.highlights ?? []).join(', ') || '—'}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm text-gray-500">Duration</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{record?.duration}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm text-gray-500">Price</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{record?.price}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm text-gray-500">Package ID</div>
            <div className="mt-1 text-sm text-gray-900">{id}</div>
          </div>
          <Link href="/admin/tour-packages" className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">Back to list</Link>
        </aside>
      </div>
    </section>
  );
}


