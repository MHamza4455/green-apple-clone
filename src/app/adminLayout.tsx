import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const router = useRouter();
  // const { data, status } = useSession({
  //   required: true,
  // });

  // useEffect(() => {
  //   if (
  //     status === "authenticated" &&
  //     !["ADMIN", "AUTHOR"].includes(data.user.role)
  //   )
  //     router.push("/");
  // }, [router, data, status]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* {status === "authenticated" &&
      ["ADMIN", "AUTHOR"].includes(data.user.role) ? ( */}
        <>
          <AdminHeader />
          <AdminSidebar />
          <div className="p-4 sm:ml-64 pt-20">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              {children}
            </div>
          </div>
        </>
      {/* ) : null} */}
    </div>
  );
};
