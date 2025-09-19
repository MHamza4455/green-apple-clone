import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminSidebar />
      <div className="p-4 sm:ml-64 pt-20">
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};
