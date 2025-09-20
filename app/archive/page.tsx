"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Archive,
  Circle,
  Leaf,
  Calendar,
  Heart,
  Search,
  Filter,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function ArchivePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filters = [
    { name: "All", icon: "📅", color: "from-amber-100 to-orange-100" },
    { name: "This Week", icon: "📆", color: "from-blue-100 to-indigo-100" },
    { name: "This Month", icon: "🗓️", color: "from-green-100 to-emerald-100" },
    { name: "Favorites", icon: "⭐", color: "from-yellow-100 to-amber-100" },
  ];

  const mockEntries = [
    {
      id: 1,
      date: "2024-01-15",
      title: "Finding Peace in Chaos",
      mood: "grateful",
      emoji: "🙏",
      preview:
        "Today I realized that peace isn't the absence of chaos, but finding stillness within it...",
      wordCount: 156,
      isFavorite: true,
    },
    {
      id: 2,
      date: "2024-01-14",
      title: "Morning Reflections",
      mood: "joyful",
      emoji: "😊",
      preview:
        "The sunrise reminded me of new beginnings and the endless possibilities...",
      wordCount: 89,
      isFavorite: false,
    },
    {
      id: 3,
      date: "2024-01-13",
      title: "Learning to Let Go",
      mood: "struggling",
      emoji: "😣",
      preview:
        "Sometimes the hardest thing is not holding on, but knowing when to release...",
      wordCount: 203,
      isFavorite: true,
    },
    {
      id: 4,
      date: "2024-01-12",
      title: "Gratitude Practice",
      mood: "grateful",
      emoji: "🙏",
      preview:
        "Three things I'm grateful for today: the warmth of the sun, a kind word from a stranger...",
      wordCount: 134,
      isFavorite: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 opacity-20 animate-pulse">
          <Circle className="w-32 h-32 text-amber-300" fill="currentColor" />
        </div>
        <div className="absolute top-32 right-12 opacity-15 animate-bounce">
          <Leaf className="w-20 h-20 text-emerald-400 rotate-12" />
        </div>
        <div className="absolute bottom-40 left-16 opacity-20 animate-pulse">
          <div className="w-24 h-24 rounded-full border-2 border-stone-300"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <Sparkles className="w-12 h-12 text-amber-500" />
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 px-6 py-8 text-center md:pt-20 lg:pt-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Circle className="w-8 h-8 text-amber-600" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-extralight text-stone-800 tracking-wide">
              Archive
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-stone-600 text-lg font-light mb-6">
            Your spiritual journey through time
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Enhanced Filter Bar */}
      <section className="relative z-10 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div
            className={`mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search your entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-stone-700 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <Button
                  key={filter.name}
                  onClick={() => setSelectedFilter(filter.name)}
                  variant={
                    selectedFilter === filter.name ? "default" : "outline"
                  }
                  className={`rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                    selectedFilter === filter.name
                      ? `bg-gradient-to-r ${filter.color} text-stone-800 shadow-lg border-0`
                      : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white/70 backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Main Content */}
      <main className="relative z-10 px-6 pb-24 md:ml-24 lg:ml-0">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="space-y-6">
              {mockEntries.map((entry) => (
                <Card
                  key={entry.id}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{entry.emoji}</div>
                        <div>
                          <h3 className="text-lg font-medium text-stone-800">
                            {entry.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-stone-500">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>{entry.wordCount} words</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.isFavorite && (
                          <Star className="w-5 h-5 text-amber-500 fill-current" />
                        )}
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            entry.mood === "grateful"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : entry.mood === "joyful"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : entry.mood === "struggling"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {entry.mood}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-stone-600 leading-relaxed mb-4">
                      {entry.preview}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-stone-500 hover:text-stone-700"
                      >
                        Read More →
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
