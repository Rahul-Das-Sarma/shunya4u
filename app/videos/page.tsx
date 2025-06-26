"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Lock, Unlock, Circle, Leaf } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MonksArchive() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const categories = ["All", "Monks", "Yogis", "Temple Life", "Wisdom Drops"]

  const videos = [
    {
      id: 1,
      title: "Lahiri Mahasaya on Mental Stillness",
      category: "Monks",
      duration: "12:34",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 2,
      title: "Morning Prayers at Rishikesh Ashram",
      category: "Temple Life",
      duration: "8:45",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
    {
      id: 3,
      title: "Paramahansa Yogananda's Breathing Technique",
      category: "Yogis",
      duration: "15:20",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 4,
      title: "The Art of Letting Go - Ramana Maharshi",
      category: "Wisdom Drops",
      duration: "6:12",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
    {
      id: 5,
      title: "Swami Vivekananda on Self-Realization",
      category: "Monks",
      duration: "18:30",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 6,
      title: "Sacred Chants from Varanasi Ghats",
      category: "Temple Life",
      duration: "22:15",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
    {
      id: 7,
      title: "Patanjali's Path to Inner Peace",
      category: "Yogis",
      duration: "14:08",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: false,
    },
    {
      id: 8,
      title: "Finding God in Silence - Meher Baba",
      category: "Wisdom Drops",
      duration: "9:33",
      thumbnail: "/placeholder.svg?height=200&width=300",
      isPremium: true,
    },
  ]

  const filteredVideos =
    selectedCategory === "All" ? videos : videos.filter((video) => video.category === selectedCategory)

  const handleVideoClick = (video: (typeof videos)[0]) => {
    if (video.isPremium) {
      setShowPremiumModal(true)
    } else {
      // Play free video
      console.log("Playing video:", video.title)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Decorative Background Elements */}
      <div className="absolute top-16 left-8 opacity-8">
        <Circle className="w-32 h-32 text-amber-200" fill="currentColor" />
      </div>
      <div className="absolute top-32 right-12 opacity-10">
        <Leaf className="w-20 h-20 text-green-300 rotate-12" />
      </div>
      <div className="absolute bottom-40 left-16 opacity-8">
        <div className="w-24 h-24 rounded-full border-2 border-stone-200"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-light text-stone-700 mb-2 tracking-wide">The Monk's Archive</h1>
        <p className="text-stone-500 text-lg font-light">Stories & wisdom from Indian mystics</p>
        <div className="w-16 h-0.5 bg-amber-300 mx-auto mt-4"></div>
      </header>

      {/* Filter Bar */}
      <section className="relative z-10 px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all ${
                  selectedCategory === category
                    ? "bg-stone-600 hover:bg-stone-700 text-white shadow-sm"
                    : "border-stone-300 text-stone-600 hover:bg-stone-50 bg-white/70 backdrop-blur-sm"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <main className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-stone-700 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-stone-700 font-medium leading-snug flex-1 mr-2">{video.title}</h3>
                      <Badge
                        variant={video.isPremium ? "secondary" : "outline"}
                        className={`shrink-0 ${
                          video.isPremium
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : "bg-green-50 text-green-700 border-green-200"
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
                    <p className="text-stone-500 text-sm">{video.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="bg-white/95 backdrop-blur-md border-0 shadow-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-light text-stone-700 mb-2">
              Unlock Sacred Wisdom
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              Access the complete archive of spiritual teachings and sacred practices from revered Indian mystics.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-lg p-6 mb-6">
              <div className="text-3xl font-light text-stone-700 mb-1">
                ₹799 <span className="text-lg text-stone-500">/ $19</span>
              </div>
              <p className="text-stone-500 text-sm">Lifetime Access</p>
            </div>

            <div className="space-y-2 text-left mb-6 text-sm text-stone-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span>50+ hours of spiritual teachings</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span>Rare recordings from sacred sites</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span>Guided meditation practices</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                <span>Offline viewing available</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowPremiumModal(false)}
                variant="outline"
                className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-50 rounded-full"
              >
                Maybe Later
              </Button>
              <Button
                className="flex-1 bg-stone-700 hover:bg-stone-800 text-white rounded-full"
                onClick={() => {
                  // Handle purchase
                  console.log("Processing purchase...")
                  setShowPremiumModal(false)
                }}
              >
                Unlock Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
