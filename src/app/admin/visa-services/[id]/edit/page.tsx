"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { type VisaService, visaServices } from "@/data/visaServices";
import { loadVisaServices, saveVisaServices } from "@/lib/adminStorage";
import Image from "next/image";

export default function EditVisaService() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id ?? "");

  const [all, setAll] = useState<VisaService[]>(visaServices);
  const [form, setForm] = useState<VisaService | null>(null);

  useEffect(() => {
    const stored = loadVisaServices();
    const dataset = stored && stored.length ? stored : visaServices;
    setAll(dataset);
    const found = dataset.find((v) => v.id === id) || null;
    setForm(found);
  }, [id]);

  const notFound = useMemo(() => form === null, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const idx = all.findIndex((v) => v.id === id);
    if (idx === -1) return;
    const next = [...all];
    next[idx] = { ...form, id };
    saveVisaServices(next);
    router.push(`/admin/visa-services/${id}`);
  };

  if (notFound) {
    return (
      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
          <p className="mt-1 text-sm text-gray-600">The requested visa service does not exist.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Edit Visa Service</h2>
        <p className="mt-1 text-sm text-gray-600">Update visa service information.</p>
      </header>
      <form onSubmit={onSubmit} className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Service Title</label>
            <input 
              type="text" 
              id="title"
              value={form?.title ?? ""} 
              onChange={(e) => setForm({ ...(form as VisaService), title: e.target.value })} 
              className="form-control" 
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input 
              type="text" 
              id="country"
              value={form?.country ?? ""} 
              onChange={(e) => setForm({ ...(form as VisaService), country: e.target.value })} 
              className="form-control" 
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="type" className="form-label">Visa Type</label>
            <select 
              id="type"
              value={form?.type ?? ""} 
              onChange={(e) => setForm({ ...(form as VisaService), type: e.target.value })} 
              className="form-control"
            >
              <option value="">Select Type</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Visitor Visa">Visitor Visa</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Transit Visa">Transit Visa</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="processingTime" className="form-label">Processing Time</label>
            <input 
              type="text" 
              id="processingTime"
              value={form?.processingTime ?? ""} 
              onChange={(e) => setForm({ ...(form as VisaService), processingTime: e.target.value })} 
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
              onChange={(e) => setForm({ ...(form as VisaService), price: e.target.value })} 
              className="form-control" 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="validity" className="form-label">Validity Period</label>
            <input 
              type="text" 
              id="validity"
              value={form?.validity ?? ""} 
              onChange={(e) => setForm({ ...(form as VisaService), validity: e.target.value })} 
              className="form-control" 
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">Service Description</label>
          <textarea 
            id="description"
            value={form?.description ?? ""} 
            onChange={(e) => setForm({ ...(form as VisaService), description: e.target.value })} 
            className="form-control" 
            rows={4} 
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="requirements" className="form-label">Requirements (comma separated)</label>
            <textarea 
              id="requirements"
              value={(form?.requirements ?? []).join(", ")} 
              onChange={(e) => setForm({ ...(form as VisaService), requirements: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
              rows={3}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="documents" className="form-label">Required Documents (comma separated)</label>
            <textarea 
              id="documents"
              value={(form?.documents ?? []).join(", ")} 
              onChange={(e) => setForm({ ...(form as VisaService), documents: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
              rows={3}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="image" className="form-label">Service Image</label>
            <input 
              type="file" 
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setForm({ ...(form as VisaService), image: event.target?.result as string });
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
          <div className="col-md-6 mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select 
              id="status"
              value={form?.status ?? 'active'} 
              onChange={(e) => setForm({ ...(form as VisaService), status: e.target.value as 'active' | 'inactive' })} 
              className="form-control"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="form-check mt-2">
              <input 
                type="checkbox" 
                id="featured"
                checked={form?.featured ?? false} 
                onChange={(e) => setForm({ ...(form as VisaService), featured: e.target.checked })} 
                className="form-check-input" 
              />
              <label htmlFor="featured" className="form-check-label">
                Featured Service
              </label>
            </div>
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
