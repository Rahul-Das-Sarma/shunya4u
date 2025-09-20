"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Circle,
  Sparkles,
  Save,
  RotateCcw,
  Calendar,
  Clock,
  Heart,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function JournalPage() {
  const [journalText, setJournalText] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setWordCount(
      journalText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  }, [journalText]);

  const moods = [
    {
      emoji: "😊",
      label: "joyful",
      color: "from-yellow-100 to-amber-100",
      description: "Feeling light and happy",
    },
    {
      emoji: "😐",
      label: "neutral",
      color: "from-gray-100 to-slate-100",
      description: "Calm and balanced",
    },
    {
      emoji: "😣",
      label: "struggling",
      color: "from-red-100 to-rose-100",
      description: "Going through challenges",
    },
    {
      emoji: "🙏",
      label: "grateful",
      color: "from-green-100 to-emerald-100",
      description: "Feeling blessed and thankful",
    },
  ];

  const dailyPrompts = [
    "What am I holding onto today?",
    "What brought me peace today?",
    "What am I grateful for in this moment?",
    "What would I like to release?",
    "How did I show myself compassion today?",
    "What lesson is life teaching me?",
    "What does my heart need to hear?",
  ];

  const [currentPrompt, setCurrentPrompt] = useState(dailyPrompts[0]);

  const handleSave = () => {
    // Save functionality would go here
    console.log("Saving journal entry:", {
      text: journalText,
      mood: selectedMood,
    });
    // Show success animation or toast
  };

  const handleClear = () => {
    setJournalText("");
    setSelectedMood("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-8 left-8 opacity-15 animate-pulse">
          <div className="w-32 h-32 rounded-full border border-amber-300"></div>
        </div>
        <div className="absolute top-20 right-12 opacity-15 animate-bounce">
          <Leaf className="w-16 h-16 text-emerald-400 rotate-12" />
        </div>
        <div className="absolute bottom-32 left-12 opacity-15 animate-pulse">
          <div className="w-24 h-24 rounded-full border border-stone-300"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <Sparkles className="w-12 h-12 text-amber-500" />
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 text-center pt-8 pb-6 md:pt-20 lg:pt-8 px-6 md:pl-32 lg:pl-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Circle className="w-8 h-8 text-amber-600" fill="currentColor" />
            <h1 className="text-3xl font-light text-stone-800 tracking-wide">
              Shunya
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-stone-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24 md:pl-32 lg:pl-6">
        <div className="max-w-3xl mx-auto">
          {/* Enhanced Daily Prompt */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="mb-8 bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium text-amber-700">
                    Today's Reflection
                  </span>
                </div>
                <p className="text-xl text-stone-700 font-light leading-relaxed mb-4">
                  {currentPrompt}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-stone-500 hover:text-stone-700"
                  onClick={() => {
                    const randomPrompt =
                      dailyPrompts[
                        Math.floor(Math.random() * dailyPrompts.length)
                      ];
                    setCurrentPrompt(randomPrompt);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Prompt
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Journal Text Area */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="mb-8 bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-stone-700">
                    Your Thoughts
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-stone-500 border-stone-300"
                  >
                    {wordCount} words
                  </Badge>
                </div>
                <Textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Let your thoughts flow freely... What's on your mind today?"
                  className="min-h-[350px] border-0 bg-transparent resize-none text-stone-700 placeholder:text-stone-400 focus-visible:ring-0 text-base leading-relaxed"
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Mood Selection */}
          <div
            className={`mb-8 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <p className="text-lg font-medium text-stone-700">
                  How are you feeling?
                </p>
              </div>
              <p className="text-sm text-stone-500">
                Select the mood that resonates with you right now
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    selectedMood === mood.label
                      ? `bg-gradient-to-br ${mood.color} shadow-lg scale-105 border-2 border-amber-300`
                      : "bg-white/70 hover:bg-white/90 hover:shadow-md border border-stone-200"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <p className="text-sm font-medium text-stone-700 capitalize">
                      {mood.label}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {mood.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-stone-600 to-stone-700 hover:from-stone-700 hover:to-stone-800 text-white px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              disabled={!journalText.trim()}
            >
              <Save className="w-5 h-5 mr-2" />
              Save Entry
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-2 border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-stone-400 px-10 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Clear All
            </Button>
          </div>

          {/* Progress Indicator */}
          {journalText.trim() && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-stone-600">
                  Ready to save your thoughts
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
