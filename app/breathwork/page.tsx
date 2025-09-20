"use client";

import { Wind, Circle, Sparkles } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useBreathwork } from "./hooks/useBreathwork";
import { TimerControls } from "./components/TimerControls";
import { PatternSelector } from "./components/PatternSelector";
import { MusicSelector } from "./components/MusicSelector";
import { BreathingCircle } from "./components/BreathingCircle";

export default function BreathworkPage() {
  const {
    isVisible,
    isPlaying,
    isPaused,
    timeLeft,
    selectedPattern,
    currentPhase,
    phaseTime,
    breathCount,
    isClient,
    selectedTracks,
    trackVolumes,
    isMusicPlaying,
    isMusicLoading,
    isAlarmPlaying,
    handleStart,
    handlePause,
    handleStop,
    handleTimeChange,
    setSelectedPattern,
    formatTime,
    toggleTrack,
    updateTrackVolume,
    toggleMusic,
    stopAlarm,
  } = useBreathwork();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Circle className="w-40 h-40 text-amber-300" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-16 opacity-15 animate-bounce">
          <Wind className="w-24 h-24 text-emerald-400 rotate-45" />
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
          <Wind className="w-8 h-8 text-slate-400" />
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 py-8 text-center md:pt-20 lg:pt-8 px-6 md:pl-32 lg:pl-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extralight text-stone-800 mb-4 tracking-wide">
            Breathwork
            <span className="block bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-700 bg-clip-text text-transparent">
              Meditation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto">
            Find your rhythm, center your mind, and breathe with intention
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24 md:pl-32 lg:pl-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breathing Pattern Selection */}
          <PatternSelector
            selectedPattern={selectedPattern}
            onPatternChange={setSelectedPattern}
            isVisible={isVisible}
          />

          {/* Music Selection */}
          <MusicSelector
            selectedTracks={selectedTracks}
            trackVolumes={trackVolumes}
            isMusicPlaying={isMusicPlaying}
            isMusicLoading={isMusicLoading}
            onToggleTrack={toggleTrack}
            onUpdateTrackVolume={updateTrackVolume}
            onToggleMusic={toggleMusic}
            isVisible={isVisible}
          />

          {/* Timer Controls */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <TimerControls
              timeLeft={timeLeft}
              isPlaying={isPlaying}
              isPaused={isPaused}
              onTimeChange={handleTimeChange}
              onStart={handleStart}
              onPause={handlePause}
              onStop={handleStop}
              formatTime={formatTime}
              isClient={isClient}
            />
          </div>

          {/* Breathing Circle */}
          <BreathingCircle
            isPlaying={isPlaying}
            isPaused={isPaused}
            currentPhase={currentPhase}
            phaseTime={phaseTime}
            breathCount={breathCount}
            selectedPattern={selectedPattern}
            isAlarmPlaying={isAlarmPlaying}
            onStopAlarm={stopAlarm}
            isVisible={isVisible}
            isClient={isClient}
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
