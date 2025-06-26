"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Circle, Leaf, Settings, Heart, Calendar } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Decorative Elements */}
      <div className="absolute top-16 left-8 opacity-8">
        <Circle className="w-32 h-32 text-amber-200" fill="currentColor" />
      </div>
      <div className="absolute top-32 right-12 opacity-10">
        <Leaf className="w-20 h-20 text-green-300 rotate-12" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-light text-stone-700 mb-2 tracking-wide">Profile</h1>
        <p className="text-stone-500 text-lg font-light">Your spiritual practice</p>
        <div className="w-16 h-0.5 bg-amber-300 mx-auto mt-4"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-xl font-light text-stone-700 mb-2">Welcome, Seeker</h2>
              <p className="text-stone-500 text-sm">Member since January 2024</p>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-light text-stone-700">47</div>
                <div className="text-xs text-stone-500">Days of practice</div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Heart className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-light text-stone-700">23</div>
                <div className="text-xs text-stone-500">Journal entries</div>
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-stone-600 mr-3" />
                  <span className="text-stone-700">Settings</span>
                </div>
                <Button variant="ghost" size="sm" className="text-stone-500">
                  →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
