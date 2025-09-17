"use client";
import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { visaServices as seedData, type VisaService } from "@/data/visaServices";
import { loadVisaServices, saveVisaServices } from "@/lib/adminStorage";
import { TableSkeleton } from "@/components/SkeletonLoader";

function VisaServicesContent() {
  const [rows, setRows] = useState<VisaService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      const stored = loadVisaServices();
      setRows(stored && stored.length ? stored : seedData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (rows.length && !isLoading) saveVisaServices(rows);
  }, [rows, isLoading]);

  const columns = useMemo(
    () => [
      { key: "title", label: "Service" },
      { key: "country", label: "Country" },
      { key: "type", label: "Type" },
      { key: "processingTime", label: "Processing Time" },
      { key: "price", label: "Price" }
    ],
    []
  );

  const onDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
      : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visa Services</h2>
            <p className="mt-1 text-sm text-gray-600">Create and manage visa service entries.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            Add Visa Service
          </div>
        </header>
        <TableSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visa Services</h2>
          <p className="mt-1 text-sm text-gray-600">Create and manage visa service entries.</p>
        </div>
        <Link
          href="/admin/visa-services/new"
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Add Visa Service
        </Link>
      </header>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 text-left font-semibold text-gray-700">{c.label}</th>
                ))}
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 overflow-hidden rounded border border-gray-200 bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={row.image} alt={row.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{row.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-[520px]">{row.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.country}</td>
                  <td className="px-4 py-3 text-gray-700">{row.type}</td>
                  <td className="px-4 py-3 text-gray-700">{row.processingTime}</td>
                  <td className="px-4 py-3 text-gray-700">{row.price}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(row.status)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/visa-services/${row.id}`} prefetch={true} className="rounded-md border px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors">View</Link>
                      <Link href={`/admin/visa-services/${row.id}/edit`} prefetch={true} className="rounded-md border px-2.5 py-1.5 text-xs text-blue-700 border-blue-200 hover:bg-blue-50 transition-colors">Edit</Link>
                      <button onClick={() => onDelete(row.id)} className="rounded-md border px-2.5 py-1.5 text-xs text-red-700 border-red-200 hover:bg-red-50 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function VisaServices() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <VisaServicesContent />
    </Suspense>
  );
}
  