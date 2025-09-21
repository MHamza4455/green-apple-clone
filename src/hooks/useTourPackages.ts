import { useState, useEffect } from 'react';
import { TourPackage, TourPackageFormData } from '@/types/tourPackage';

export function useTourPackages() {
  const [tourPackages, setTourPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tour packages from API
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tour-packages');
        if (!response.ok) {
          throw new Error('Failed to fetch tour packages');
        }
        const data = await response.json();
        setTourPackages(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tour packages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tour packages');
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackages();
  }, []);

  const addTourPackage = async (newPackage: TourPackageFormData) => {
    try {
      const response = await fetch('/api/tour-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPackage),
      });

      if (!response.ok) {
        throw new Error('Failed to create tour package');
      }

      const createdPackage = await response.json();
      setTourPackages(prev => [createdPackage, ...prev]);
      return createdPackage;
    } catch (err) {
      console.error('Error creating tour package:', err);
      setError(err instanceof Error ? err.message : 'Failed to create tour package');
      throw err;
    }
  };

  const updateTourPackage = async (id: string, updatedPackage: Partial<TourPackageFormData>) => {
    try {
      const response = await fetch(`/api/tour-packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPackage),
      });

      if (!response.ok) {
        throw new Error('Failed to update tour package');
      }

      const updated = await response.json();
      setTourPackages(prev =>
        prev.map(pkg =>
          pkg.id === id ? updated : pkg
        )
      );
      return updated;
    } catch (err) {
      console.error('Error updating tour package:', err);
      setError(err instanceof Error ? err.message : 'Failed to update tour package');
      throw err;
    }
  };

  const deleteTourPackage = async (id: string) => {
    try {
      const response = await fetch(`/api/tour-packages/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tour package');
      }

      setTourPackages(prev => prev.filter(pkg => pkg.id !== id));
    } catch (err) {
      console.error('Error deleting tour package:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete tour package');
      throw err;
    }
  };

  const toggleTourPackageStatus = async (id: string) => {
    try {
      const packageToUpdate = tourPackages.find(pkg => pkg.id === id);
      if (!packageToUpdate) return;

      const newStatus = packageToUpdate.status === 'active' ? 'inactive' : 'active';
      
      const response = await fetch(`/api/tour-packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tour package status');
      }

      const updated = await response.json();
      setTourPackages(prev =>
        prev.map(pkg =>
          pkg.id === id ? updated : pkg
        )
      );
    } catch (err) {
      console.error('Error toggling tour package status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update status');
      throw err;
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tour-packages');
      if (!response.ok) {
        throw new Error('Failed to fetch tour packages');
      }
      const data = await response.json();
      setTourPackages(data);
      setError(null);
    } catch (err) {
      console.error('Error refetching tour packages:', err);
      setError(err instanceof Error ? err.message : 'Failed to load tour packages');
    } finally {
      setLoading(false);
    }
  };

  return {
    tourPackages,
    loading,
    error,
    addTourPackage,
    updateTourPackage,
    deleteTourPackage,
    toggleTourPackageStatus,
    refetch
  };
}