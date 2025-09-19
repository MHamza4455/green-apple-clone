import { useState } from 'react';
import { TourPackage } from '@/types/tourPackage';
import { mockTourPackages } from '@/data/mockTourPackages';

export function useTourPackages() {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>(mockTourPackages);

  const addTourPackage = (newPackage: Omit<TourPackage, 'id' | 'createdAt'>) => {
    const packageWithId: TourPackage = {
      ...newPackage,
      id: Math.max(...tourPackages.map(p => p.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTourPackages(prev => [...prev, packageWithId]);
  };

  const updateTourPackage = (id: number, updatedPackage: Omit<TourPackage, 'id' | 'createdAt'>) => {
    setTourPackages(prev => 
      prev.map(pkg => 
        pkg.id === id 
          ? { ...updatedPackage, id, createdAt: pkg.createdAt }
          : pkg
      )
    );
  };

  const deleteTourPackage = (id: number) => {
    setTourPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const toggleTourPackageStatus = (id: number) => {
    setTourPackages(prev => 
      prev.map(pkg => 
        pkg.id === id 
          ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active' }
          : pkg
      )
    );
  };

  return {
    tourPackages,
    addTourPackage,
    updateTourPackage,
    deleteTourPackage,
    toggleTourPackageStatus
  };
}
