import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { AiFillCar } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { RiBook2Line } from "react-icons/ri";
import { SiBloglovin } from "react-icons/si";
// import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export const AdminHeader: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (setShowMobileMenu) setShowMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-300 bg-rose-100  ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => setShowMobileMenu(true)}
                className="inline-flex items-center rounded-lg bg-rose-100 p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:text-gray-400 md:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <FaBars className="h-auto w-8 transition delay-100 ease-in-out hover:scale-110" />
              </button>
              <Link
                href="/admin/dashboard"
                className="invisible h-14 md:visible "
              >
                <Image
                  priority={true}
                  src="/images/logo.webp"
                  width={300}
                  height={300}
                  alt="Radiant Way Travel Logo"
                  className="h-full w-auto object-cover transition delay-100 ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <>
              <li
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="relative flex items-center justify-center"
              >
                <button className="cursor-pointer hover:text-rose-500">
                  <CgProfile className="text-4xl" />
                </button>
                {showProfileMenu && (
                  <ul className="absolute right-0 top-full box-content w-36 border-x border-t border-gray-300 bg-white font-medium">
                    <li className="flex h-14 items-center justify-center border-b">
                      <Link
                        href="/admin/profile"
                        className="hover:text-rose-500"
                      >
                        PROFILE
                      </Link>
                    </li>
                    <li className="flex h-14 items-center justify-center border-b">
                      <button
                        // onClick={() => {
                        //   signOut({ callbackUrl: "/auth/login" });
                        // }}
                        className="hover:text-rose-500"
                      >
                        LOGOUT
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {showMobileMenu && (
          <motion.header
            initial={{ x: 768 }}
            exit={{ x: -768 }}
            animate={{ x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="fixed top-0 left-0 z-50 h-full min-h-screen w-full overflow-y-auto bg-rose-100 font-proxima font-bold md:hidden"
          >
            <div className="flex h-20 w-full items-center justify-between border-b border-gray-300 px-5">
              <Link href="/admin/dashboard" className="h-14">
                <Image
                  priority={true}
                  src="/images/logo.webp"
                  width={300}
                  height={300}
                  alt="Radiant Way Travel Logo"
                  className="h-full w-auto object-cover transition delay-100 ease-in-out hover:scale-110"
                />
              </Link>
              <button className="" onClick={() => setShowMobileMenu(false)}>
                <AiOutlineClose className="h-auto w-8 transition delay-100 ease-in-out hover:scale-110" />
              </button>
            </div>
            <div className="w-full p-5">
              <ul className="flex flex-col items-start">
                <li>
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center rounded-lg p-2 text-base font-normal  hover:bg-gray-200 "
                  >
                    <MdDashboard className="h-6 w-6 flex-shrink-0 text-rose-500 transition duration-75 group-hover:text-gray-900 "></MdDashboard>
                    <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                      DashBoard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/tours"
                    className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-200 "
                  >
                    <ImUsers className="h-6 w-6 flex-shrink-0 text-rose-500 transition duration-75 group-hover:text-gray-900 "></ImUsers>
                    <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                      Tours
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/umrah-packages"
                    className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-200 "
                  >
                    <SiBloglovin className="h-6 w-6 flex-shrink-0 text-rose-500 transition duration-75 group-hover:text-gray-900 "></SiBloglovin>
                    <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                      Umrah Packages
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/visa-services"
                    className="flex items-center rounded-lg p-2 text-base font-normal  hover:bg-gray-200 "
                  >
                    <AiFillCar className="h-6 w-6 flex-shrink-0 text-rose-500 transition duration-75 group-hover:text-gray-900 "></AiFillCar>
                    <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                      Visa Services
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/inquiries"
                    className="flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-200 "
                  >
                    <RiBook2Line className="h-6 w-6 flex-shrink-0 text-rose-500 transition duration-75 group-hover:text-gray-900 "></RiBook2Line>
                    <span className="ml-3 flex-1 whitespace-nowrap font-semibold">
                      Inquiries
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminHeader;
