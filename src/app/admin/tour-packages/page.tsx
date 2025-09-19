'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { MdVisibility } from 'react-icons/md';
import Image from 'next/image';
import { TourPackage, TourPackageFilter, TourPackageStatusFilter } from '@/types/tourPackage';
import { useTourPackages } from '@/hooks/useTourPackages';

export default function AdminTourPackages() {
  const router = useRouter();
  const { tourPackages, deleteTourPackage, toggleTourPackageStatus } = useTourPackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<TourPackageFilter>('all');
  const [filterStatus, setFilterStatus] = useState<TourPackageStatusFilter>('all');

  // Filter packages based on search and filters
  const filteredPackages = tourPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || 
                           (filterCategory === 'featured' && pkg.category === 'featured') ||
                           (filterCategory === 'not-featured' && pkg.category === 'all');
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Action handlers
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tour package?')) {
      deleteTourPackage(id);
    }
  };

  const handleStatusToggle = (id: number) => {
    toggleTourPackageStatus(id);
  };

  const handleViewDetails = (pkg: TourPackage) => {
    router.push(`/admin/tour-packages/${pkg.id}`);
  };

  const handleEditPackage = (pkg: TourPackage) => {
    router.push(`/admin/tour-packages/${pkg.id}/edit`);
  };

  const handleCreatePackage = () => {
    router.push('/admin/tour-packages/create');
  };

    return (
      <div className="p-6">
      {/* Header */}
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Packages Management</h1>
        <p className="text-gray-600">Manage your tour packages and Umrah packages</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Packages</h3>
          <p className="text-3xl font-bold" style={{ color: '#FF4E00' }}>{tourPackages.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Featured Tours</h3>
          <p className="text-3xl font-bold" style={{ color: '#FF4E00' }}>
            {tourPackages.filter(pkg => pkg.category === 'featured').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Packages</h3>
          <p className="text-3xl font-bold" style={{ color: '#FF4E00' }}>
            {tourPackages.filter(pkg => pkg.status === 'active').length}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as 'all' | 'featured' | 'not-featured')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="featured">Featured Tours</option>
              <option value="not-featured">Not Featured Tours</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={handleCreatePackage}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Package
          </button>
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <Image
                          className="h-12 w-12 rounded-lg object-cover"
                          src={pkg.image}
                          alt={pkg.title}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {pkg.title}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {pkg.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      pkg.category === 'featured' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.category === 'featured' ? 'Featured Tour' : 'All Tours'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {pkg.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(pkg.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors duration-200 ${
                        pkg.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {pkg.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(pkg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(pkg)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                        title="View Details"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50 transition-colors duration-200"
                        title="Edit Package"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                        title="Delete Package"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No packages found</div>
            <div className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {/* Pagination would go here in a real app */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredPackages.length} of {tourPackages.length} packages
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      </div>
    );
  }
  