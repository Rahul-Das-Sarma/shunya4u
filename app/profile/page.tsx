"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Circle,
  Leaf,
  Settings,
  Heart,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Award,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function ProfilePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
              Profile
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-stone-600 text-lg font-light mb-6">
            Your spiritual practice & journey
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24 md:ml-24 lg:ml-0">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Enhanced Profile Card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <User className="w-12 h-12 text-amber-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-light text-stone-800 mb-2">
                  Welcome, Seeker
                </h2>
                <p className="text-stone-500 text-sm mb-4">
                  Member since January 2024
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(currentTime)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(currentTime)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Stats Cards */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl font-light text-stone-800 mb-1">
                  47
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Days of practice
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                  +12 this month
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-3xl font-light text-stone-800 mb-1">
                  23
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Journal entries
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                  +5 this week
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-light text-stone-800 mb-1">
                  4.8
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Average mood
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                  Feeling great!
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-light text-stone-800 mb-1">8</div>
                <div className="text-xs text-stone-500 font-medium">
                  Achievements
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                  Keep going!
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Settings & Features */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-stone-800 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl py-3">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-stone-300 text-stone-600 hover:bg-stone-50 rounded-xl py-3"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-stone-800 mb-4">
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Moon className="w-5 h-5 text-stone-600 mr-3" />
                      <span className="text-stone-700">Dark Mode</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`rounded-full ${
                        isDarkMode
                          ? "bg-stone-700 text-white"
                          : "border-stone-300"
                      }`}
                    >
                      {isDarkMode ? (
                        <Moon className="w-4 h-4" />
                      ) : (
                        <Sun className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-stone-600 mr-3" />
                      <span className="text-stone-700">Daily Reminders</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 bg-emerald-50"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
