'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { TourPackageFormData } from '@/types/tourPackage';
import { useTourPackages } from '@/hooks/useTourPackages';

export default function CreateTourPackagePage() {
  const router = useRouter();
  const { addTourPackage } = useTourPackages();
  
  const [formData, setFormData] = useState<TourPackageFormData>({
    title: '',
    description: '',
    duration: '',
    price: '',
    image: '',
    imageAlt: '',
    included: [''],
    notIncluded: [''],
    category: 'all',
    status: 'active'
  });

  const handleInputChange = (field: keyof TourPackageFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'included' | 'notIncluded', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'included' | 'notIncluded') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'included' | 'notIncluded', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty strings from arrays
    const newPackage = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      price: formData.price,
      image: formData.image,
      imageAlt: formData.imageAlt,
      included: formData.included.filter(item => item.trim() !== ''),
      notIncluded: formData.notIncluded.filter(item => item.trim() !== ''),
      category: formData.category,
      status: formData.status
    };

    addTourPackage(newPackage);
    router.push('/admin/tour-packages');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Tour Package</h1>
        <p className="text-gray-600">Add a new tour package to your collection</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Azerbaijan, Baku Tour (3 Nights / 4 Days)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., 4 days / 3 nights"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe the tour package details..."
            />
          </div>

          {/* Image Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="/images/HolidayPackages/package1.webp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Alt Text *
              </label>
              <input
                type="text"
                required
                value={formData.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Alt text for the image"
              />
            </div>
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                placeholder="e.g., AED 1199"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value as 'featured' | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Tours</option>
                <option value="featured">Featured Tours</option>
              </select>
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

          {/* Included Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Included Items
            </label>
            <div className="space-y-2">
              {formData.included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('included', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Breakfast, Hotel accommodation"
                  />
                  {formData.included.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('included', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('included')}
                className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add Included Item
              </button>
            </div>
          </div>

          {/* Not Included Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Not Included Items
            </label>
            <div className="space-y-2">
              {formData.notIncluded.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('notIncluded', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Train tickets, Personal expenses"
                  />
                  {formData.notIncluded.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('notIncluded', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('notIncluded')}
                className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add Not Included Item
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
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
