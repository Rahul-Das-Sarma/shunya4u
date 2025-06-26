"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Archive, Circle, Leaf } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ArchivePage() {
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
        <h1 className="text-4xl md:text-5xl font-light text-stone-700 mb-2 tracking-wide">Archive</h1>
        <p className="text-stone-500 text-lg font-light">Your spiritual journey through time</p>
        <div className="w-16 h-0.5 bg-amber-300 mx-auto mt-4"></div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Archive className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-2xl font-light text-stone-700 mb-4">Your Sacred Archive</h2>
              <p className="text-stone-600 leading-relaxed max-w-md mx-auto">
                Here you'll find all your past journal entries, reflections, and moments of insight organized by date
                and mood.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
