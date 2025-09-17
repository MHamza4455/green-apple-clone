"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getVisaServiceById, visaServices } from "@/data/visaServices";
import { loadVisaServices, saveVisaServices } from "@/lib/adminStorage";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function VisaServiceDetails() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id ?? "");
  const [record, setRecord] = useState(() => getVisaServiceById(id));

  useEffect(() => {
    const stored = loadVisaServices();
    if (stored && stored.length) {
      const found = stored.find((v) => v.id === id);
      if (found) setRecord(found);
    }
  }, [id]);

  const notFound = useMemo(() => !record, [record]);

  const onDelete = () => {
    const stored = loadVisaServices() ?? visaServices;
    const next = stored.filter((v) => v.id !== id);
    saveVisaServices(next);
    router.push("/admin/visa-services");
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'
      : 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800';
  };

  if (notFound) {
    return (
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
          <p className="mt-1 text-sm text-gray-600">The requested visa service does not exist.</p>
        </header>
        <Link href="/admin/visa-services" className="text-sm text-emerald-700 hover:underline">Back to list</Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{record?.title}</h2>
            <span className={getStatusBadge(record?.status ?? 'inactive')}>
              {record?.status}
            </span>
            {record?.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                ⭐ Featured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{record?.country} • {record?.type} • {record?.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/visa-services/${id}/edit`} className="btn btn-primary">Edit</Link>
          <button onClick={onDelete} className="btn btn-outline-danger">Delete</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Service Image */}
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
            <Image src={record?.image ?? ""} alt={record?.imageAlt ?? ""} width={800} height={400} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Overview</h3>
              <p className="text-gray-700 leading-relaxed">{record?.description}</p>
            </div>
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Processing Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Processing Time:</span>
                  <span className="text-sm font-medium text-gray-900">{record?.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Validity:</span>
                  <span className="text-sm font-medium text-gray-900">{record?.validity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-sm font-medium text-gray-900">{record?.price}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h4 className="text-base font-semibold text-gray-900 mb-3">Service Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Country:</span>
                  <span className="text-sm font-medium text-gray-900">{record?.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm font-medium text-gray-900">{record?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={getStatusBadge(record?.status ?? 'inactive')}>
                    {record?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Requirements</h4>
            <ul className="list-disc list-inside space-y-1">
              {(record?.requirements ?? []).map((req, index) => (
                <li key={index} className="text-sm text-gray-700">{req}</li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Required Documents</h4>
            <ul className="list-disc list-inside space-y-1">
              {(record?.documents ?? []).map((doc, index) => (
                <li key={index} className="text-sm text-gray-700">{doc}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm text-gray-500">Service ID</div>
            <div className="mt-1 text-sm text-gray-900">{id}</div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="text-sm text-gray-500">Quick Stats</div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Requirements:</span>
                <span className="font-medium text-gray-900">{(record?.requirements ?? []).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Documents:</span>
                <span className="font-medium text-gray-900">{(record?.documents ?? []).length}</span>
              </div>
            </div>
          </div>

          <Link href="/admin/visa-services" className="btn btn-outline-secondary w-full">Back to list</Link>
        </aside>
      </div>
    </section>
  );
}
