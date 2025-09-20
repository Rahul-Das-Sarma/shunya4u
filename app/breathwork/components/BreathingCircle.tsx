"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock } from "lucide-react";

interface BreathingCircleProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: string;
  phaseTime: number;
  breathCount: number;
  selectedPattern: string;
  isAlarmPlaying: boolean;
  onStopAlarm: () => void;
  isVisible: boolean;
  isClient: boolean;
}

export function BreathingCircle({
  isPlaying,
  isPaused,
  currentPhase,
  phaseTime,
  breathCount,
  selectedPattern,
  isAlarmPlaying,
  onStopAlarm,
  isVisible,
  isClient,
}: BreathingCircleProps) {
  const getPhaseText = () => {
    const [inhale, hold1, exhale, hold2] = selectedPattern
      .split("-")
      .map(Number);

    switch (currentPhase) {
      case "inhale":
        return "Breathe In";
      case "hold1":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return hold2 > 0 ? "Hold" : "Ready";
      default:
        return "Ready";
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "inhale":
        return "from-emerald-400 to-teal-500";
      case "hold1":
        return "from-blue-400 to-indigo-500";
      case "exhale":
        return "from-rose-400 to-pink-500";
      case "hold2":
        return "from-purple-400 to-violet-500";
      default:
        return "from-stone-400 to-stone-500";
    }
  };

  return (
    <div
      className={`transition-all duration-1000 delay-800 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-stone-800 mb-6">
              {isPlaying ? "Follow the Breath" : "Ready to Begin"}
            </h3>

            {/* Alarm Status Indicator */}
            {isAlarmPlaying && (
              <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-medium text-sm">
                    Session Complete - Alarm Playing
                  </span>
                  <button
                    onClick={onStopAlarm}
                    className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}

            <div className="relative flex items-center justify-center mb-8">
              <div
                className={`w-64 h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 flex items-center justify-center shadow-2xl ${
                  isPlaying && !isPaused ? "animate-pulse" : ""
                }`}
                style={{
                  transform: isPlaying && !isPaused ? "scale(1.1)" : "scale(1)",
                }}
              >
                <div className="text-center text-white">
                  <div className="text-2xl font-light mb-2">
                    {getPhaseText()}
                  </div>
                  <div className="text-4xl font-light">
                    {isClient ? phaseTime : 4}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="text-sm font-medium text-stone-700">
                    Breath Count
                  </span>
                </div>
                <div className="text-3xl font-light text-stone-800">
                  {isClient ? breathCount : 0}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-stone-700">
                    Pattern
                  </span>
                </div>
                <div className="text-3xl font-light text-stone-800">
                  {selectedPattern}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
