"use client";

import {
  BookOpen,
  Play,
  Archive,
  User,
  Circle,
  Menu,
  X,
  Wind,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    {
      id: "journal",
      icon: BookOpen,
      label: "Journal",
      path: "/journal",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "breathwork",
      icon: Wind,
      label: "Breathwork",
      path: "/breathwork",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "videos",
      icon: Play,
      label: "Videos",
      path: "/videos",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "archive",
      icon: Archive,
      label: "Archive",
      path: "/archive",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      path: "/profile",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const getActiveTab = () => {
    if (pathname === "/journal" || pathname === "/") return "journal";
    if (pathname === "/breathwork") return "breathwork";
    if (pathname === "/videos") return "videos";
    if (pathname === "/archive") return "archive";
    if (pathname === "/profile") return "profile";
    return "journal";
  };

  const activeTab = getActiveTab();

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-200/50 z-50 shadow-lg">
        <div className="flex justify-around py-3 px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 relative ${
                  isActive
                    ? "text-white"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50/50"
                }`}
              >
                {isActive && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg`}
                  ></div>
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`transition-all duration-300 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  >
                    <item.icon className="w-6 h-6 mb-1" />
                  </div>
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      isActive ? "text-white" : "text-stone-600"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Desktop Side Navigation
  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-white/95 backdrop-blur-xl border-r border-stone-200/50 z-50 shadow-lg flex-col items-center py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg">
            <Circle className="w-6 h-6 text-amber-600" fill="currentColor" />
          </div>

          {/* Navigation Items */}
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                  isActive
                    ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
                {isActive && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-full"></div>
                )}

                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-stone-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-stone-800 rotate-45"></div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation for smaller screens */}
      <nav className="hidden lg:hidden md:flex fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-stone-200/50 z-50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center space-x-3">
            <Circle className="w-8 h-8 text-amber-600" fill="currentColor" />
            <span className="text-xl font-light text-stone-800 tracking-wide">
              Shunya
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
