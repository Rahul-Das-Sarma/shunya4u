"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  Lock,
  Unlock,
  Circle,
  Leaf,
  Sparkles,
  Clock,
  Star,
  Filter,
  Search,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function MonksArchive() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { name: "All", icon: "🌟", color: "from-amber-100 to-orange-100" },
    { name: "Monks", icon: "🧘", color: "from-blue-100 to-indigo-100" },
    { name: "Yogis", icon: "🧘‍♀️", color: "from-green-100 to-emerald-100" },
    { name: "Temple Life", icon: "🏛️", color: "from-purple-100 to-violet-100" },
    { name: "Wisdom Drops", icon: "💎", color: "from-rose-100 to-pink-100" },
  ];

  const videos = [
    {
      id: 1,
      title: "Lahiri Mahasaya on Mental Stillness",
      category: "Monks",
      duration: "12:34",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      views: "2.3K",
      rating: 4.8,
      description:
        "Discover the ancient wisdom of mental stillness from the great master Lahiri Mahasaya.",
    },
    {
      id: 2,
      title: "Morning Prayers at Rishikesh Ashram",
      category: "Temple Life",
      duration: "8:45",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
      views: "5.1K",
      rating: 4.9,
      description:
        "Experience the sacred morning rituals in the spiritual heart of India.",
    },
    {
      id: 3,
      title: "Paramahansa Yogananda's Breathing Technique",
      category: "Yogis",
      duration: "15:20",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      views: "3.7K",
      rating: 4.7,
      description:
        "Learn the powerful breathing techniques taught by the great yogi.",
    },
    {
      id: 4,
      title: "The Art of Letting Go - Ramana Maharshi",
      category: "Wisdom Drops",
      duration: "6:12",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
      views: "4.2K",
      rating: 4.9,
      description: "Timeless wisdom on detachment and inner freedom.",
    },
    {
      id: 5,
      title: "Swami Vivekananda on Self-Realization",
      category: "Monks",
      duration: "18:30",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      views: "6.8K",
      rating: 4.8,
      description: "Powerful teachings on the path to self-realization.",
    },
    {
      id: 6,
      title: "Sacred Chants from Varanasi Ghats",
      category: "Temple Life",
      duration: "22:15",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
      views: "7.3K",
      rating: 4.9,
      description: "Immerse yourself in the divine sounds of the holy city.",
    },
    {
      id: 7,
      title: "Patanjali's Path to Inner Peace",
      category: "Yogis",
      duration: "14:08",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
      views: "2.9K",
      rating: 4.6,
      description: "Ancient yogic wisdom for modern seekers.",
    },
    {
      id: 8,
      title: "Finding God in Silence - Meher Baba",
      category: "Wisdom Drops",
      duration: "9:33",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
      views: "3.5K",
      rating: 4.8,
      description: "The profound teaching of finding divinity in silence.",
    },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoClick = (video: (typeof videos)[0]) => {
    if (video.isPremium) {
      setShowPremiumModal(true);
    } else {
      // Play free video
      console.log("Playing video:", video.title);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Background Elements */}
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
              The Monk's Archive
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-stone-600 text-lg font-light mb-6">
            Stories & wisdom from Indian mystics
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
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-stone-700 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  className={`rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.name
                      ? `bg-gradient-to-r ${category.color} text-stone-800 shadow-lg border-0`
                      : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white/70 backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Video Grid */}
      <main className="relative z-10 px-6 pb-24 md:ml-24 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2"
                  onClick={() => handleVideoClick(video)}
                >
                  <CardContent className="p-0">
                    {/* Enhanced Thumbnail */}
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Play
                            className="w-6 h-6 text-stone-700 ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {video.duration}
                      </div>
                      {/* Premium Badge */}
                      {video.isPremium && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                          <Lock className="w-3 h-3 inline mr-1" />
                          Premium
                        </div>
                      )}
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-stone-800 font-medium leading-snug flex-1 mr-2 text-sm line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-medium">
                            {video.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-stone-500 text-xs mb-3 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <div className="flex items-center gap-3">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span className="capitalize">{video.category}</span>
                        </div>
                        <Badge
                          variant={video.isPremium ? "secondary" : "outline"}
                          className={`text-xs ${
                            video.isPremium
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {video.isPremium ? (
                            <>
                              <Lock className="w-3 h-3 mr-1" />
                              Premium
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3 h-3 mr-1" />
                              Free
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-medium text-stone-700 mb-2">
                No videos found
              </h3>
              <p className="text-stone-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-extralight text-stone-800 mb-2">
              Unlock Sacred Wisdom
            </DialogTitle>
            <p className="text-center text-stone-500 text-sm">
              Access the complete spiritual archive
            </p>
          </DialogHeader>

          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-amber-600" />
            </div>

            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
              Access the complete archive of spiritual teachings and sacred
              practices from revered Indian mystics.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border border-amber-100">
              <div className="text-4xl font-light text-stone-800 mb-2">
                ₹799 <span className="text-xl text-stone-500">/ $19</span>
              </div>
              <p className="text-stone-500 text-sm">
                Lifetime Access • One-time payment
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Limited Time Offer
              </div>
            </div>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4"></div>
                <span className="text-stone-700">
                  50+ hours of spiritual teachings
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4"></div>
                <span className="text-stone-700">
                  Rare recordings from sacred sites
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4"></div>
                <span className="text-stone-700">
                  Guided meditation practices
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4"></div>
                <span className="text-stone-700">
                  Offline viewing available
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mr-4"></div>
                <span className="text-stone-700">
                  New content added monthly
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowPremiumModal(false)}
                variant="outline"
                className="flex-1 border-2 border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-stone-400 rounded-full py-3 font-medium transition-all duration-300"
              >
                Maybe Later
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white rounded-full py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  // Handle purchase
                  console.log("Processing purchase...");
                  setShowPremiumModal(false);
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Unlock Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
