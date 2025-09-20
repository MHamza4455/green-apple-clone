import { useState, useEffect } from 'react';
import { VisaService, VisaServiceFormData } from '@/types/visaService';

export function useVisaServices() {
  const [visaServices, setVisaServices] = useState<VisaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch visa services from API
  const fetchVisaServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/visa-services');
      if (!response.ok) {
        throw new Error('Failed to fetch visa services');
      }
      const data = await response.json();
      setVisaServices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisaServices();
  }, []);

  const addVisaService = async (newService: VisaServiceFormData) => {
    try {
      const response = await fetch('/api/visa-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create visa service');
      }

      const createdService = await response.json();
      setVisaServices(prev => [createdService, ...prev]);
      return createdService;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create visa service');
      throw err;
    }
  };

  const updateVisaService = async (id: string, updatedService: Partial<VisaServiceFormData>) => {
    try {
      const response = await fetch(`/api/visa-services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update visa service');
      }

      const updated = await response.json();
      setVisaServices(prev => 
        prev.map(service => 
          service.id === id ? updated : service
        )
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update visa service');
      throw err;
    }
  };

  const deleteVisaService = async (id: string) => {
    try {
      const response = await fetch(`/api/visa-services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete visa service');
      }

      setVisaServices(prev => prev.filter(service => service.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete visa service');
      throw err;
    }
  };

  const toggleVisaServiceStatus = async (id: string) => {
    const service = visaServices.find(s => s.id === id);
    if (!service) return;

    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    await updateVisaService(id, { status: newStatus });
  };

  return {
    visaServices,
    loading,
    error,
    addVisaService,
    updateVisaService,
    deleteVisaService,
    toggleVisaServiceStatus,
    refetch: fetchVisaServices
  };
}
