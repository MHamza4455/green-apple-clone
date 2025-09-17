"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!profileOpen) return;
    
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setProfileOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        profileMenuRef.current &&
        profileButtonRef.current &&
        !profileMenuRef.current.contains(target) &&
        !profileButtonRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [profileOpen]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/visa-services", label: "Visa Services", icon: "📋" },
    { href: "/admin/tour-packages", label: "Tour Packages", icon: "✈️" },
  ];

  const handleLogout = async () => {
    setProfileOpen(false);
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <button
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={
            "fixed z-40 inset-y-0 left-0 w-80 transform shadow-2xl transition-all duration-300 lg:static lg:translate-x-0 " +
            (sidebarOpen ? "translate-x-0" : "-translate-x-full")
          }
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="h-full flex flex-col relative">
            {/* Sidebar Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    A
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-slate-800"></div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                  <p className="text-xs text-slate-400">Radiant Way Travel</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
              <ul className="px-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        prefetch={true}
                        className={
                          "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 " +
                          (isActive
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                            : "text-slate-300 hover:bg-white/10 hover:text-white")
                        }
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                        {isActive && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{session?.user?.name || "Admin User"}</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="h-20 flex items-center justify-between px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <button
                  aria-label="Open sidebar"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 hover:bg-white border border-gray-200/50 shadow-sm transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-gray-500">Welcome back, {session?.user?.name || "Administrator"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-xl bg-white/80 hover:bg-white border border-gray-200/50 shadow-sm transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    ref={profileButtonRef}
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen((o) => !o)}
                    className={
                      "h-12 w-12 rounded-xl flex items-center justify-center font-bold text-white transition-all duration-200 shadow-lg " +
                      (profileOpen 
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 scale-105" 
                        : "bg-gradient-to-br from-purple-500 to-pink-600 hover:scale-105")
                    }
                  >
                    A
                  </button>
                  {profileOpen && (
                    <div
                      ref={profileMenuRef}
                      role="menu"
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-xl focus:outline-none overflow-hidden"
                    >
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-200/50">
                          <p className="text-sm font-medium text-gray-900">{session?.user?.name || "Admin User"}</p>
                          <p className="text-xs text-gray-500">{session?.user?.email || "admin@example.com"}</p>
                        </div>
                        <Link
                          href="/admin/profile"
                          role="menuitem"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile Settings
                        </Link>
                        <button
                          role="menuitem"
                          className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50/80 transition-colors"
                          onClick={handleLogout}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
