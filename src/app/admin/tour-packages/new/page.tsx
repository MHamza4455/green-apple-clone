"use client";
import { useEffect, useState } from "react";
import { type TourPackage } from "@/data/tourPackages";
import { loadTourPackages, saveTourPackages } from "@/lib/adminStorage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function NewTourPackage() {
  const router = useRouter();
  const [all, setAll] = useState<TourPackage[]>([]);
  const [form, setForm] = useState<TourPackage>({
    id: "",
    title: "",
    description: "",
    duration: "",
    price: "",
    image: "",
    imageAlt: "",
    destinations: [],
    highlights: []
  });

  useEffect(() => {
    const stored = loadTourPackages();
    setAll(stored ?? []);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const id = form.id || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const record: TourPackage = { ...form, id };
    const next = [...all, record];
    saveTourPackages(next);
    router.push("/admin/tour-packages");
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Create Tour Package</h2>
        <p className="mt-1 text-sm text-gray-600">Add a new tour package entry.</p>
      </header>
      <form onSubmit={onSubmit} className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              id="title"
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              className="form-control" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input 
              type="text" 
              id="duration"
              value={form.duration} 
              onChange={(e) => setForm({ ...form, duration: e.target.value })} 
              className="form-control" 
              placeholder="5 days / 4 nights" 
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input 
              type="text" 
              id="price"
              value={form.price} 
              onChange={(e) => setForm({ ...form, price: e.target.value })} 
              className="form-control" 
              placeholder="AED 2199" 
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
                    setForm({ ...form, image: event.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }} 
              className="form-control" 
            />
            {form.image && (
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
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
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
              value={(form.destinations ?? []).join(", ")} 
              onChange={(e) => setForm({ ...form, destinations: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="highlights" className="form-label">Highlights (comma separated)</label>
            <input 
              type="text" 
              id="highlights"
              value={(form.highlights ?? []).join(", ")} 
              onChange={(e) => setForm({ ...form, highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button type="button" onClick={() => router.back()} className="btn btn-outline-secondary" disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="me-2" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}


