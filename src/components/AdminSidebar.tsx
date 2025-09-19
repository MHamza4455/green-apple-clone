import { AiFillCar } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import React from "react";
import { RiBook2Line } from "react-icons/ri";
import { SiBloglovin } from "react-icons/si";
import { FiMessageSquare } from "react-icons/fi";

const AdminSidebar: React.FC = () => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform shadow-lg sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 pb-4">
          <ul className="space-y-2">
            <li className="mt-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center rounded-lg p-2 text-base font-normal  hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 "
              >
                <MdDashboard className="h-6 w-6 flex-shrink-0 text-orange-500 transition duration-75 group-hover:text-orange-600 "></MdDashboard>
                <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                  DashBoard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/tour-packages"
                className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 "
              >
                <ImUsers className="h-6 w-6 flex-shrink-0 text-orange-500 transition duration-75 group-hover:text-orange-600 "></ImUsers>
                <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                  Tour Packages
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/visa-services"
                className="flex items-center rounded-lg p-2 text-base font-normal  hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 "
              >
                <AiFillCar className="h-6 w-6 flex-shrink-0 text-orange-500 transition duration-75 group-hover:text-orange-600 "></AiFillCar>
                <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                  Visa Services
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/inquiries"
                className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 "
              >
                <FiMessageSquare className="h-6 w-6 flex-shrink-0 text-orange-500 transition duration-75 group-hover:text-orange-600 "></FiMessageSquare>
                <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                  Inquiries
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contacts"
                className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 "
              >
                <RiBook2Line className="h-6 w-6 flex-shrink-0 text-orange-500 transition duration-75 group-hover:text-orange-600 "></RiBook2Line>
                <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                  Contact Messages
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
