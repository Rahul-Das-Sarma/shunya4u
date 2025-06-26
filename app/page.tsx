"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Heart, Leaf, Circle, Star, Download, Play } from "lucide-react"

export default function ShunyaLanding() {
  const features = [
    {
      icon: BookOpen,
      title: "Daily Reflection",
      description: "Guided prompts to help you explore your inner landscape with gentle curiosity.",
    },
    {
      icon: Heart,
      title: "Mood Awareness",
      description: "Track your emotional journey with simple, mindful mood indicators.",
    },
    {
      icon: Star,
      title: "Sacred Space",
      description: "A distraction-free environment designed for deep contemplation and peace.",
    },
  ]

  const testimonials = [
    {
      quote: "Shunya has become my daily sanctuary. The prompts guide me to insights I never knew I needed.",
      author: "Sarah M.",
    },
    {
      quote: "Finally, a journaling app that feels like a meditation retreat in my pocket.",
      author: "David L.",
    },
    {
      quote: "The simplicity is profound. It strips away everything except what matters most.",
      author: "Maya K.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 opacity-8">
        <Circle className="w-40 h-40 text-amber-200" fill="currentColor" />
      </div>
      <div className="absolute top-40 right-16 opacity-10">
        <Leaf className="w-24 h-24 text-green-300 rotate-45" />
      </div>
      <div className="absolute bottom-40 left-20 opacity-8">
        <div className="w-32 h-32 rounded-full border-2 border-stone-200"></div>
      </div>
      <div className="absolute bottom-60 right-10 opacity-10">
        <Circle className="w-16 h-16 text-amber-300" fill="currentColor" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Circle className="w-8 h-8 text-amber-600" fill="currentColor" />
            <span className="text-2xl font-light text-stone-700 tracking-wide">Shunya</span>
          </div>
          <Button
            variant="outline"
            className="border-stone-300 text-stone-600 hover:bg-stone-50 rounded-full px-6"
            onClick={() => (window.location.href = "/journal")}
          >
            Enter App
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light text-stone-700 mb-6 tracking-wide">
            Find Your
            <span className="block text-amber-600">Inner Stillness</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            A sacred digital space for mindful journaling, self-reflection, and spiritual growth.
          </p>

          {/* App Preview Card */}
          <Card className="max-w-sm mx-auto mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-stone-100 to-amber-50 rounded-lg p-4 mb-4">
                <p className="text-stone-600 text-sm mb-3">Today's Reflection</p>
                <p className="text-stone-700 font-light">"What am I holding onto today?"</p>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
                <p className="text-stone-400 text-sm italic">Your thoughts flow here...</p>
              </div>
              <div className="flex justify-center gap-3 mb-4">
                <span className="text-2xl">😊</span>
                <span className="text-2xl">😐</span>
                <span className="text-2xl">😣</span>
                <span className="text-2xl">🙏</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-stone-600 text-white text-xs px-3 py-1 rounded-full flex-1 text-center">Save</div>
                <div className="border border-stone-300 text-stone-600 text-xs px-3 py-1 rounded-full flex-1 text-center">
                  Clear
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-3 rounded-full text-lg shadow-lg"
              onClick={() => (window.location.href = "/journal")}
            >
              <Download className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="border-stone-300 text-stone-600 hover:bg-stone-50 px-8 py-3 rounded-full text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-stone-700 mb-4">Cultivate Mindful Awareness</h2>
            <div className="w-16 h-0.5 bg-amber-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-light text-stone-700 mb-4">{feature.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-stone-700 mb-4">Voices of Transformation</h2>
            <div className="w-16 h-0.5 bg-amber-300 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-8">
                  <p className="text-stone-600 italic leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <p className="text-stone-500 text-sm">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-stone-700 mb-6">Begin Your Journey Within</h2>
          <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
            Join thousands who have discovered the transformative power of mindful journaling.
          </p>
          <Button
            className="bg-stone-700 hover:bg-stone-800 text-white px-12 py-4 rounded-full text-xl shadow-lg"
            onClick={() => (window.location.href = "/journal")}
          >
            <Download className="w-6 h-6 mr-3" />
            Enter Shunya
          </Button>
          <p className="text-stone-500 text-sm mt-4">Free to start • Available on all devices</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-stone-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Circle className="w-6 h-6 text-amber-600" fill="currentColor" />
              <span className="text-xl font-light text-stone-700 tracking-wide">Shunya</span>
            </div>
            <div className="flex space-x-8 text-stone-600">
              <a href="#" className="hover:text-stone-800 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-stone-800 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-stone-800 transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-stone-200">
            <p className="text-stone-500 text-sm">© 2024 Shunya. Crafted with mindfulness and care.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
