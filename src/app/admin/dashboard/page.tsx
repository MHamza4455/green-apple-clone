export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tours</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Umrah Packages</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Visa Services</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Inquiries</h3>
          <p className="text-3xl font-bold text-orange-600">156</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">New tour inquiry received</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Umrah package booking confirmed</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Visa application submitted</span>
            <span className="text-sm text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
