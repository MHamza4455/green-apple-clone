import { useState } from 'react';
import { VisaService } from '@/types/visaService';
import { mockVisaServices } from '@/data/mockVisaServices';

export function useVisaServices() {
  const [visaServices, setVisaServices] = useState<VisaService[]>(mockVisaServices);

  const addVisaService = (newService: Omit<VisaService, 'id' | 'createdAt'>) => {
    const serviceWithId: VisaService = {
      ...newService,
      id: Math.max(...visaServices.map(s => s.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVisaServices(prev => [...prev, serviceWithId]);
  };

  const updateVisaService = (id: number, updatedService: Omit<VisaService, 'id' | 'createdAt'>) => {
    setVisaServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...updatedService, id, createdAt: service.createdAt }
          : service
      )
    );
  };

  const deleteVisaService = (id: number) => {
    setVisaServices(prev => prev.filter(service => service.id !== id));
  };

  const toggleVisaServiceStatus = (id: number) => {
    setVisaServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
          : service
      )
    );
  };

  return {
    visaServices,
    addVisaService,
    updateVisaService,
    deleteVisaService,
    toggleVisaServiceStatus
  };
}
