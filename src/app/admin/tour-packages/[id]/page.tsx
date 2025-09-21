'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import { TourPackage } from '@/types/tourPackage';
import { useTourPackages } from '@/hooks/useTourPackages';

export default function TourPackageDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { tourPackages } = useTourPackages();
  const [tourPackage, setTourPackage] = useState<TourPackage | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const pkg = tourPackages.find(p => p.id === id);
    setTourPackage(pkg || null);
  }, [params.id, tourPackages]);

  if (!tourPackage) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-6">The tour package you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/admin/tour-packages')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => router.push(`/admin/tour-packages/${tourPackage.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FiEdit className="w-4 h-4" />
            Edit Package
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Package Details</h1>
        <p className="text-gray-600">View and manage tour package information</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Image
              src={tourPackage.image}
              alt={tourPackage.imageAlt}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{tourPackage.title}</h2>
            <p className="text-gray-600 mb-6">{tourPackage.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="text-gray-600">{tourPackage.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="text-orange-600 font-semibold">{tourPackage.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      tourPackage.category === 'featured' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tourPackage.category === 'featured' ? 'Featured Tour' : 'All Tours'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      tourPackage.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tourPackage.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Package ID:</span>
                    <span className="text-gray-600">#{tourPackage.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="text-gray-600">
                      {new Date(tourPackage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Included Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
            <div className="space-y-2">
              {tourPackage.includedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Highlights</h3>
            <div className="space-y-2">
              {tourPackage.highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Itinerary</h3>
            <div className="space-y-2">
              {tourPackage.itinerary.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
