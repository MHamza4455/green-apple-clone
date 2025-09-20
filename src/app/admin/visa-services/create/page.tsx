'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { VisaServiceFormData } from '@/types/visaService';
import { useVisaServices } from '@/hooks/useVisaServices';

export default function CreateVisaServicePage() {
  const router = useRouter();
  const { addVisaService } = useVisaServices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<VisaServiceFormData>({
    name: '',
    code: '',
    price: '',
    description: '',
    documentsRequired: [''],
    documentsProvided: [''],
    status: 'active'
  });

  const handleInputChange = (field: keyof VisaServiceFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'documentsRequired' | 'documentsProvided', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'documentsRequired' | 'documentsProvided') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'documentsRequired' | 'documentsProvided', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Filter out empty strings from arrays
      const newService = {
        name: formData.name,
        code: formData.code,
        price: formData.price,
        description: formData.description,
        documentsRequired: formData.documentsRequired.filter(item => item.trim() !== ''),
        documentsProvided: formData.documentsProvided.filter(item => item.trim() !== ''),
        status: formData.status
      };

      await addVisaService(newService);
      router.push('/admin/visa-services');
    } catch (error) {
      alert('Failed to create visa service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Visa Service</h1>
        <p className="text-gray-600">Add a new visa service to your collection</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., United States"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Code *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., us"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 1500 AED"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., USA Visit Visa – 1500 AED"
            />
          </div>

          {/* Documents Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documents Required
            </label>
            <div className="space-y-2">
              {formData.documentsRequired.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('documentsRequired', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Passport copy"
                  />
                  {formData.documentsRequired.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('documentsRequired', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('documentsRequired')}
                className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add Required Document
              </button>
            </div>
          </div>

          {/* Documents Provided */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documents Provided
            </label>
            <div className="space-y-2">
              {formData.documentsProvided.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('documentsProvided', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Cover Letter"
                  />
                  {formData.documentsProvided.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('documentsProvided', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('documentsProvided')}
                className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add Provided Document
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
