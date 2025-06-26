"use client"

import { BookOpen, Play, Archive, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { id: "journal", icon: BookOpen, label: "Journal", path: "/journal" },
    { id: "videos", icon: Play, label: "Videos", path: "/videos" },
    { id: "archive", icon: Archive, label: "Archive", path: "/archive" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ]

  const getActiveTab = () => {
    if (pathname === "/journal" || pathname === "/") return "journal"
    if (pathname === "/videos") return "videos"
    if (pathname === "/archive") return "archive"
    if (pathname === "/profile") return "profile"
    return "journal"
  }

  const activeTab = getActiveTab()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === item.id ? "text-amber-600" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
