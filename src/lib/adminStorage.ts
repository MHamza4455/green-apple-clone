import type { TourPackage } from "../data/tourPackages";
import type { VisaService } from "../data/visaServices";

const TOUR_PACKAGES_KEY = "admin.tourPackages";
const VISA_SERVICES_KEY = "admin.visaServices";

export function loadTourPackages(): TourPackage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TOUR_PACKAGES_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TourPackage[];
  } catch {
    return null;
  }
}

export function saveTourPackages(packages: TourPackage[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOUR_PACKAGES_KEY, JSON.stringify(packages));
  } catch {}
}

export function loadVisaServices(): VisaService[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(VISA_SERVICES_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisaService[];
  } catch {
    return null;
  }
}

export function saveVisaServices(services: VisaService[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VISA_SERVICES_KEY, JSON.stringify(services));
  } catch {}
}


