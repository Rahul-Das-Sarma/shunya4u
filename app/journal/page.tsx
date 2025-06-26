"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function JournalPage() {
  const [journalText, setJournalText] = useState("")
  const [selectedMood, setSelectedMood] = useState("")

  const moods = [
    { emoji: "😊", label: "joyful" },
    { emoji: "😐", label: "neutral" },
    { emoji: "😣", label: "struggling" },
    { emoji: "🙏", label: "grateful" },
  ]

  const handleSave = () => {
    // Save functionality would go here
    console.log("Saving journal entry:", { text: journalText, mood: selectedMood })
  }

  const handleClear = () => {
    setJournalText("")
    setSelectedMood("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 opacity-10">
        <div className="w-32 h-32 rounded-full border border-amber-200"></div>
      </div>
      <div className="absolute top-20 right-12 opacity-10">
        <Leaf className="w-16 h-16 text-green-300 rotate-12" />
      </div>
      <div className="absolute bottom-32 left-12 opacity-10">
        <div className="w-24 h-24 rounded-full border border-stone-200"></div>
      </div>

      {/* Header */}
      <header className="text-center pt-8 pb-6">
        <h1 className="text-3xl font-light text-stone-700 tracking-wide">Shunya</h1>
        <div className="w-12 h-0.5 bg-amber-200 mx-auto mt-2"></div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-24 max-w-2xl mx-auto">
        {/* Daily Prompt */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-lg text-stone-600 font-light leading-relaxed">What am I holding onto today?</p>
          </CardContent>
        </Card>

        {/* Journal Text Area */}
        <Card className="mb-6 bg-white/70 backdrop-blur-sm border-0 shadow-sm">
          <CardContent className="p-6">
            <Textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Let your thoughts flow freely..."
              className="min-h-[300px] border-0 bg-transparent resize-none text-stone-700 placeholder:text-stone-400 focus-visible:ring-0 text-base leading-relaxed"
            />
          </CardContent>
        </Card>

        {/* Mood Tags */}
        <div className="mb-8">
          <p className="text-sm text-stone-500 mb-3 text-center">How are you feeling?</p>
          <div className="flex justify-center gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                  selectedMood === mood.label
                    ? "bg-amber-100 shadow-md scale-110"
                    : "bg-white/70 hover:bg-white hover:shadow-sm"
                }`}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleSave}
            className="bg-stone-600 hover:bg-stone-700 text-white px-8 py-2 rounded-full shadow-sm"
          >
            Save
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="border-stone-300 text-stone-600 hover:bg-stone-50 px-8 py-2 rounded-full"
          >
            Clear
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
