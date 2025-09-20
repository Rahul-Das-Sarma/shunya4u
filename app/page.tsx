"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Heart,
  Leaf,
  Circle,
  Star,
  Download,
  Play,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ShunyaLanding() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setIsVisible(true);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Daily Reflection",
      description:
        "Guided prompts to help you explore your inner landscape with gentle curiosity.",
      color: "from-amber-100 to-orange-100",
    },
    {
      icon: Heart,
      title: "Mood Awareness",
      description:
        "Track your emotional journey with simple, mindful mood indicators.",
      color: "from-rose-100 to-pink-100",
    },
    {
      icon: Star,
      title: "Sacred Space",
      description:
        "A distraction-free environment designed for deep contemplation and peace.",
      color: "from-violet-100 to-purple-100",
    },
  ];

  const testimonials = [
    {
      quote:
        "Shunya has become my daily sanctuary. The prompts guide me to insights I never knew I needed.",
      author: "Sarah M.",
      role: "Meditation Teacher",
    },
    {
      quote:
        "Finally, a journaling app that feels like a meditation retreat in my pocket.",
      author: "David L.",
      role: "Yoga Practitioner",
    },
    {
      quote:
        "The simplicity is profound. It strips away everything except what matters most.",
      author: "Maya K.",
      role: "Spiritual Seeker",
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Circle className="w-40 h-40 text-amber-300" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-16 opacity-15 animate-bounce">
          <Leaf className="w-24 h-24 text-emerald-400 rotate-45" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-20 animate-pulse">
          <div className="w-32 h-32 rounded-full border-2 border-stone-300"></div>
        </div>
        <div className="absolute bottom-60 right-10 opacity-15 animate-bounce">
          <Circle className="w-16 h-16 text-amber-400" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Sparkles className="w-12 h-12 text-amber-500" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-10">
          <Moon className="w-8 h-8 text-slate-400" />
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 px-6 py-8 md:pt-20 lg:pt-8 md:pl-32 lg:pl-6">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Circle className="w-8 h-8 text-amber-600" fill="currentColor" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-light text-stone-800 tracking-wide">
              Shunya
            </span>
            <div className="hidden sm:block text-sm text-stone-500 font-light">
              {getGreeting()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-stone-600 hover:text-stone-800 hover:bg-stone-100/50 rounded-full px-4"
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => (window.location.href = "/journal")}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Enter App
            </Button>
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center md:pl-32 lg:pl-6">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-extralight text-stone-800 mb-8 tracking-wide">
              Find Your
              <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
                Inner Stillness
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
              A sacred digital sanctuary for mindful journaling,
              self-reflection, and spiritual growth.
            </p>
          </div>

          {/* Enhanced App Preview Card */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="max-w-md mx-auto mb-12 bg-white/80 backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-amber-700 text-sm font-medium">
                      Today's Reflection
                    </p>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-stone-700 font-light text-lg">
                    "What am I holding onto today?"
                  </p>
                </div>
                <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl p-6 mb-6 min-h-[140px] flex items-center justify-center border border-stone-200">
                  <p className="text-stone-400 text-sm italic">
                    Your thoughts flow here...
                  </p>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  <span className="text-3xl hover:scale-110 transition-transform cursor-pointer">
                    😊
                  </span>
                  <span className="text-3xl hover:scale-110 transition-transform cursor-pointer">
                    😐
                  </span>
                  <span className="text-3xl hover:scale-110 transition-transform cursor-pointer">
                    😣
                  </span>
                  <span className="text-3xl hover:scale-110 transition-transform cursor-pointer">
                    🙏
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="bg-gradient-to-r from-stone-600 to-stone-700 text-white text-sm px-4 py-2 rounded-full flex-1 text-center font-medium shadow-sm">
                    Save
                  </div>
                  <div className="border border-stone-300 text-stone-600 text-sm px-4 py-2 rounded-full flex-1 text-center font-medium hover:bg-stone-50 transition-colors">
                    Clear
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/journal")}
            >
              <Download className="w-5 h-5 mr-3" />
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="border-2 border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-3" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent to-white/30 md:pl-32 lg:pl-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-stone-800 mb-6">
              Cultivate Mindful Awareness
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
            <p className="text-stone-600 text-lg font-light mt-6 max-w-2xl mx-auto">
              Discover the tools and practices that will guide you on your
              journey of self-discovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <CardContent className="p-10 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <feature.icon className="w-10 h-10 text-stone-700" />
                  </div>
                  <h3 className="text-2xl font-light text-stone-800 mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-white/30 to-stone-50/50 backdrop-blur-sm md:pl-32 lg:pl-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-stone-800 mb-6">
              Voices of Transformation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full"></div>
            <p className="text-stone-600 text-lg font-light mt-6 max-w-2xl mx-auto">
              Hear from those who have found peace and clarity through their
              practice
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <CardContent className="p-10">
                  <div className="text-4xl text-amber-400 mb-6">"</div>
                  <p className="text-stone-700 italic leading-relaxed mb-8 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-stone-200 pt-6">
                    <p className="text-stone-800 font-medium">
                      {testimonial.author}
                    </p>
                    <p className="text-stone-500 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-br from-stone-100/50 to-amber-100/30 md:pl-32 lg:pl-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extralight text-stone-800 mb-8">
            Begin Your Journey Within
          </h2>
          <p className="text-xl md:text-2xl text-stone-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
            Join thousands who have discovered the transformative power of
            mindful journaling and spiritual practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button
              className="bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white px-12 py-5 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/journal")}
            >
              <Download className="w-6 h-6 mr-3" />
              Enter Shunya
            </Button>
            <div className="flex items-center gap-4 text-stone-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm">Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-sm">All devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-6 py-16 border-t border-stone-200 bg-white/60 backdrop-blur-md md:pl-32 lg:pl-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="relative">
                <Circle
                  className="w-8 h-8 text-amber-600"
                  fill="currentColor"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-light text-stone-800 tracking-wide">
                Shunya
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-stone-600">
              <a
                href="#"
                className="hover:text-stone-800 transition-colors font-medium"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-stone-800 transition-colors font-medium"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-stone-800 transition-colors font-medium"
              >
                Support
              </a>
              <a
                href="#"
                className="hover:text-stone-800 transition-colors font-medium"
              >
                About
              </a>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-stone-200">
            <p className="text-stone-500 text-sm">
              © 2024 Shunya. Crafted with mindfulness, love, and care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
