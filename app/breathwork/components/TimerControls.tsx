"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

interface TimerControlsProps {
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  onTimeChange: (minutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  formatTime: (seconds: number) => string;
  isClient: boolean;
}

export function TimerControls({
  timeLeft,
  isPlaying,
  isPaused,
  onTimeChange,
  onStart,
  onPause,
  onStop,
  formatTime,
  isClient,
}: TimerControlsProps) {
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(5);

  const handleCustomTimeChange = (minutes: number) => {
    if (minutes >= 1 && minutes <= 60) {
      setCustomMinutes(minutes);
      onTimeChange(minutes);
      setShowCustomTime(false);
    }
  };

  const toggleCustomTime = () => {
    setShowCustomTime(!showCustomTime);
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-stone-800">
              Session Timer
            </h3>
            <button className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
              <Settings className="w-5 h-5 text-stone-500" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {[5, 10, 15].map((minutes) => (
              <button
                key={minutes}
                onClick={() => onTimeChange(minutes)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  timeLeft === minutes * 60
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                {minutes} min
              </button>
            ))}

            {/* Custom Time Button */}
            <button
              onClick={toggleCustomTime}
              className="p-3 rounded-xl transition-all duration-300 border-2 bg-gradient-to-r from-stone-50 to-stone-100 hover:from-purple-50 hover:to-indigo-50 text-stone-700 border-stone-200 hover:border-purple-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-1">
                <Settings className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium">Custom</span>
              </div>
            </button>
          </div>

          <div className="text-center">
            <div className="text-6xl font-light text-stone-800 mb-4">
              {isClient ? formatTime(timeLeft) : "05:00"}
            </div>
            <div className="flex justify-center gap-4">
              {!isPlaying ? (
                <Button
                  onClick={onStart}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start
                </Button>
              ) : (
                <>
                  <Button
                    onClick={onPause}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={onStop}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Time Modal */}
      <Dialog open={showCustomTime} onOpenChange={setShowCustomTime}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 border-2 border-purple-200">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-purple-800">
              Set Custom Duration
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-sm text-purple-600 mb-6">
                Choose any duration between 1 and 60 minutes for your meditation
                session
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-3">
                    Duration in Minutes
                  </label>
                  <div className="relative max-w-xs mx-auto">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={customMinutes}
                      onChange={(e) =>
                        setCustomMinutes(parseInt(e.target.value) || 5)
                      }
                      className="w-full p-4 text-center text-3xl font-bold border-2 border-purple-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 bg-white shadow-inner"
                      placeholder="5"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 font-medium">
                      min
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-6 border border-purple-200 shadow-sm">
                  <div className="text-center">
                    <p className="text-sm text-purple-600 mb-2 font-medium">
                      Preview
                    </p>
                    <p className="text-4xl font-light text-purple-800 mb-2">
                      {formatTime(customMinutes * 60)}
                    </p>
                    <p className="text-sm text-purple-500">
                      {customMinutes} minute{customMinutes !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => handleCustomTimeChange(customMinutes)}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Apply Duration
                  </Button>
                  <Button
                    onClick={() => setShowCustomTime(false)}
                    variant="outline"
                    className="px-6 py-3 border-2 border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl font-medium transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
