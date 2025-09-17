"use client";
import { useEffect, useState } from "react";
import { type VisaService } from "@/data/visaServices";
import { loadVisaServices, saveVisaServices } from "@/lib/adminStorage";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NewVisaService() {
  const router = useRouter();
  const [all, setAll] = useState<VisaService[]>([]);
  const [form, setForm] = useState<VisaService>({
    id: "",
    title: "",
    description: "",
    country: "",
    type: "",
    processingTime: "",
    price: "",
    validity: "",
    requirements: [],
    documents: [],
    image: "",
    imageAlt: "",
    status: 'active',
    featured: false
  });

  useEffect(() => {
    const stored = loadVisaServices();
    setAll(stored ?? []);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const record: VisaService = { ...form, id };
    const next = [...all, record];
    saveVisaServices(next);
    router.push("/admin/visa-services");
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Create Visa Service</h2>
        <p className="mt-1 text-sm text-gray-600">Add a new visa service entry.</p>
      </header>
      <form onSubmit={onSubmit} className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">Service Title</label>
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
            <label htmlFor="country" className="form-label">Country</label>
            <input 
              type="text" 
              id="country"
              value={form.country} 
              onChange={(e) => setForm({ ...form, country: e.target.value })} 
              className="form-control" 
              placeholder="United States" 
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="type" className="form-label">Visa Type</label>
            <select 
              id="type"
              value={form.type} 
              onChange={(e) => setForm({ ...form, type: e.target.value })} 
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
              value={form.processingTime} 
              onChange={(e) => setForm({ ...form, processingTime: e.target.value })} 
              className="form-control" 
              placeholder="15-30 days" 
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
              placeholder="AED 850" 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="validity" className="form-label">Validity Period</label>
            <input 
              type="text" 
              id="validity"
              value={form.validity} 
              onChange={(e) => setForm({ ...form, validity: e.target.value })} 
              className="form-control" 
              placeholder="10 years" 
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">Service Description</label>
          <textarea 
            id="description"
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="form-control" 
            rows={4} 
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label htmlFor="requirements" className="form-label">Requirements (comma separated)</label>
            <textarea 
              id="requirements"
              value={(form.requirements ?? []).join(", ")} 
              onChange={(e) => setForm({ ...form, requirements: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
              rows={3}
              placeholder="Valid passport, Completed application, Passport photos"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="documents" className="form-label">Required Documents (comma separated)</label>
            <textarea 
              id="documents"
              value={(form.documents ?? []).join(", ")} 
              onChange={(e) => setForm({ ...form, documents: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} 
              className="form-control" 
              rows={3}
              placeholder="Passport, Application form, Photo, Bank statements"
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
          <div className="col-md-6 mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select 
              id="status"
              value={form.status} 
              onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} 
              className="form-control"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="form-check mt-2">
              <input 
                type="checkbox" 
                id="featured"
                checked={form.featured} 
                onChange={(e) => setForm({ ...form, featured: e.target.checked })} 
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
          <button type="submit" className="btn btn-success">Create</button>
        </div>
      </form>
    </section>
  );
}
