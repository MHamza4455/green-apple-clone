"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type TourPackage, tourPackages } from "@/data/tourPackages";
import { loadTourPackages, saveTourPackages } from "@/lib/adminStorage";
import Image from "next/image";

export default function EditTourPackage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id ?? "");

  const [all, setAll] = useState<TourPackage[]>(tourPackages);
  const [form, setForm] = useState<TourPackage | null>(null);

  useEffect(() => {
    const stored = loadTourPackages();
    const dataset = stored && stored.length ? stored : tourPackages;
    setAll(dataset);
    const found = dataset.find((t) => t.id === id) || null;
    setForm(found);
  }, [id]);

  const notFound = useMemo(() => form === null, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const idx = all.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const next = [...all];
    next[idx] = { ...form, id };
    saveTourPackages(next);
    router.push(`/admin/tour-packages/${id}`);
  };

  if (notFound) {
    return (
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-gray-900">Package Not Found</h2>
          <p className="mt-1 text-sm text-gray-600">The requested tour package does not exist.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Edit Tour Package</h2>
        <p className="mt-1 text-sm text-gray-600">Update package information.</p>
      </header>
      <form onSubmit={onSubmit} className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              id="title"
              value={form?.title ?? ""} 
              onChange={(e) => setForm({ ...(form as TourPackage), title: e.target.value })} 
              className="form-control" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input 
              type="text" 
              id="duration"
              value={form?.duration ?? ""} 
              onChange={(e) => setForm({ ...(form as TourPackage), duration: e.target.value })} 
              className="form-control" 
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input 
              type="text" 
              id="price"
              value={form?.price ?? ""} 
              onChange={(e) => setForm({ ...(form as TourPackage), price: e.target.value })} 
              className="form-control" 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">Cover Image</label>
            <input 
              type="file" 
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setForm({ ...(form as TourPackage), image: event.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }} 
              className="form-control" 
            />
            {form?.image && (
              <div className="mt-2">
                <Image src={form.image} alt="Preview" width={150} height={150} className="img-thumbnail" style={{ maxWidth: '150px', maxHeight: '150px' }} />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">Short Description</label>
          <textarea 
            id="description"
            value={form?.description ?? ""} 
            onChange={(e) => setForm({ ...(form as TourPackage), description: e.target.value })} 
            className="form-control" 
            rows={5} 
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="destinations" className="form-label">Destinations (comma separated)</label>
            <input 
              type="text" 
              id="destinations"
              value={(form?.destinations ?? []).join(", ")} 
              onChange={(e) => setForm({ ...(form as TourPackage), destinations: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="highlights" className="form-label">Highlights (comma separated)</label>
            <input 
              type="text" 
              id="highlights"
              value={(form?.highlights ?? []).join(", ")} 
              onChange={(e) => setForm({ ...(form as TourPackage), highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button type="button" onClick={() => router.back()} className="btn btn-outline-secondary">Cancel</button>
          <button type="submit" className="btn btn-success">Save Changes</button>
        </div>
      </form>
    </section>
  );
}


