"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Wind,
  Circle,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Heart,
  Settings,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default function BreathworkPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [selectedPattern, setSelectedPattern] = useState("4-4-4-4");
  const [currentPhase, setCurrentPhase] = useState("inhale");
  const [phaseTime, setPhaseTime] = useState(4);
  const [isMuted, setIsMuted] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Music functionality
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [trackVolumes, setTrackVolumes] = useState<{ [key: string]: number }>(
    {}
  );
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicLoading, setIsMusicLoading] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(5);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
    setIsClient(true);
  }, []);

  // Update phase time when pattern changes
  useEffect(() => {
    const [inhale, hold1, exhale, hold2] = selectedPattern
      .split("-")
      .map(Number);

    // Reset to inhale phase with correct timing
    setCurrentPhase("inhale");
    setPhaseTime(inhale);
  }, [selectedPattern]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            console.log(
              "Timer reached zero, stopping meditation and playing alarm"
            );
            setIsPlaying(false);
            setIsPaused(false);

            // Play alarm when timer reaches zero
            playAlarm();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, timeLeft]);

  useEffect(() => {
    let breathInterval: NodeJS.Timeout;

    if (isPlaying && !isPaused) {
      const [inhale, hold1, exhale, hold2] = selectedPattern
        .split("-")
        .map(Number);

      breathInterval = setInterval(() => {
        setPhaseTime((prev) => {
          if (prev <= 1) {
            // Determine next phase and its duration
            let nextPhase: string;
            let nextDuration: number;
            let shouldIncrementBreath = false;

            switch (currentPhase) {
              case "inhale":
                if (hold1 > 0) {
                  nextPhase = "hold1";
                  nextDuration = hold1;
                } else {
                  nextPhase = "exhale";
                  nextDuration = exhale;
                }
                break;
              case "hold1":
                nextPhase = "exhale";
                nextDuration = exhale;
                break;
              case "exhale":
                if (hold2 > 0) {
                  nextPhase = "hold2";
                  nextDuration = hold2;
                } else {
                  nextPhase = "inhale";
                  nextDuration = inhale;
                  shouldIncrementBreath = true;
                }
                break;
              case "hold2":
                nextPhase = "inhale";
                nextDuration = inhale;
                shouldIncrementBreath = true;
                break;
              default:
                nextPhase = "inhale";
                nextDuration = inhale;
            }

            // Update phase and breath count
            setCurrentPhase(nextPhase);
            if (shouldIncrementBreath) {
              setBreathCount((count) => count + 1);
            }

            return nextDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(breathInterval);
  }, [isPlaying, isPaused, selectedPattern, currentPhase]);

  const breathingPatterns = [
    {
      name: "4-4-4-4",
      label: "Box Breathing",
      description: "Equal inhale, hold, exhale, hold",
      color: "from-teal-100 to-cyan-100",
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
    },
    {
      name: "4-7-8",
      label: "Calming Breath",
      description: "Inhale 4, hold 7, exhale 8",
      color: "from-blue-100 to-indigo-100",
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
    },
    {
      name: "6-2-6",
      label: "Deep Breathing",
      description: "Inhale 6, hold 2, exhale 6",
      color: "from-emerald-100 to-teal-100",
      inhale: 6,
      hold1: 2,
      exhale: 6,
      hold2: 0,
    },
    {
      name: "5-5-5",
      label: "Balanced Breath",
      description: "Equal inhale, hold, exhale",
      color: "from-purple-100 to-violet-100",
      inhale: 5,
      hold1: 5,
      exhale: 5,
      hold2: 0,
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  const handleStart = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setTimeLeft(300);
    setCurrentPhase("inhale");
    const [inhale] = selectedPattern.split("-").map(Number);
    setPhaseTime(inhale);
    setBreathCount(0);
  };

  const handleTimeChange = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setShowCustomTime(false);
  };

  const handleCustomTimeChange = (minutes: number) => {
    if (minutes >= 1 && minutes <= 60) {
      setCustomMinutes(minutes);
      setTimeLeft(minutes * 60);
      setShowCustomTime(false);
    }
  };

  const toggleCustomTime = () => {
    setShowCustomTime(!showCustomTime);
  };

  const playAlarm = async () => {
    console.log("playAlarm function called");
    if (alarmRef.current) {
      try {
        console.log("Attempting to play alarm...");
        alarmRef.current.currentTime = 0;
        alarmRef.current.volume = 0.8; // Ensure volume is set
        alarmRef.current.loop = true; // Set alarm to loop
        await alarmRef.current.play();
        setIsAlarmPlaying(true);
        console.log("Alarm started looping - meditation session completed!");
      } catch (error) {
        console.error("Failed to play alarm:", error);
        // Try to play a simple beep as fallback
        try {
          const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 1
          );

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 1);

          console.log("Fallback beep played");
        } catch (fallbackError) {
          console.error("Fallback alarm also failed:", fallbackError);
        }
      }
    } else {
      console.error("Alarm ref is null");
    }
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      setIsAlarmPlaying(false);
      console.log("Alarm stopped");
    }
  };

  // Music tracks data
  const musicTracks = [
    {
      id: "beach-waves",
      name: "Beach Waves",
      file: "/nature/beach waves.mp3",
      icon: "🌊",
    },
    {
      id: "birds-chirping",
      name: "Birds Chirping",
      file: "/nature/birds chirping.mp3",
      icon: "🐦",
    },
    {
      id: "rain",
      name: "Raindrops",
      file: "/nature/Raindrop on rooftop.mp3",
      icon: "🌧️",
    },
    {
      id: "piano",
      name: "Relaxing Piano",
      file: "/nature/relaxing piano.mp3",
      icon: "🎹",
    },
    {
      id: "thunderstorm",
      name: "Thunderstorm",
      file: "/nature/thunderstorm.mp3",
      icon: "⛈️",
    },
    {
      id: "wind",
      name: "Wind",
      file: "/nature/wind.mp3",
      icon: "💨",
    },
  ];

  // Music control functions
  const toggleTrack = async (trackId: string) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackId)) {
        // Remove track
        if (audioRefs.current[trackId]) {
          audioRefs.current[trackId].pause();
          audioRefs.current[trackId].currentTime = 0;
        }
        return prev.filter((id) => id !== trackId);
      } else {
        // Add track
        const newVolumes = { ...trackVolumes };
        if (!newVolumes[trackId]) {
          newVolumes[trackId] = 0.5; // Default volume
        }
        setTrackVolumes(newVolumes);

        // Initialize audio element if it doesn't exist
        if (!audioRefs.current[trackId]) {
          const track = musicTracks.find((t) => t.id === trackId);
          if (track) {
            const audio = new Audio(track.file);
            audio.loop = true;
            audio.volume = newVolumes[trackId];
            audio.preload = "none";
            audio.onerror = () => {
              console.warn(`Failed to load audio: ${track.name}`);
            };
            audioRefs.current[trackId] = audio;
          }
        }

        // If music is currently playing, start this track immediately
        if (isMusicPlaying && audioRefs.current[trackId]) {
          setTimeout(async () => {
            try {
              audioRefs.current[trackId].currentTime = 0;
              audioRefs.current[trackId].volume = newVolumes[trackId];
              await audioRefs.current[trackId].play();
              console.log(`Auto-started playing: ${trackId}`);
            } catch (error) {
              console.warn(`Failed to auto-start track ${trackId}:`, error);
            }
          }, 100); // Small delay to ensure state is updated
        }

        return [...prev, trackId];
      }
    });
  };

  const updateTrackVolume = (trackId: string, volume: number) => {
    setTrackVolumes((prev) => ({ ...prev, [trackId]: volume }));
    if (audioRefs.current[trackId]) {
      audioRefs.current[trackId].volume = volume;
    }
  };

  const toggleMusic = async () => {
    if (isMusicLoading) return; // Prevent multiple simultaneous calls

    if (isMusicPlaying) {
      // Stop all music
      selectedTracks.forEach((trackId) => {
        if (audioRefs.current[trackId]) {
          audioRefs.current[trackId].pause();
        }
      });
      setIsMusicPlaying(false);
    } else {
      setIsMusicLoading(true);
      try {
        // Ensure all selected tracks have audio elements
        for (const trackId of selectedTracks) {
          if (!audioRefs.current[trackId]) {
            const track = musicTracks.find((t) => t.id === trackId);
            if (track) {
              const audio = new Audio(track.file);
              audio.loop = true;
              audio.volume = trackVolumes[trackId] || 0.5;
              audio.preload = "none";
              audio.onerror = () => {
                console.warn(`Failed to load audio: ${track.name}`);
              };
              audioRefs.current[trackId] = audio;
            }
          }
        }

        // Start all selected music in parallel
        const playPromises = selectedTracks.map(async (trackId) => {
          if (audioRefs.current[trackId]) {
            try {
              audioRefs.current[trackId].currentTime = 0;
              audioRefs.current[trackId].volume = trackVolumes[trackId] || 0.5;
              await audioRefs.current[trackId].play();
              console.log(`Successfully started playing: ${trackId}`);
            } catch (error) {
              console.warn(`Failed to play track ${trackId}:`, error);
            }
          }
        });

        // Wait for all tracks to start playing
        await Promise.allSettled(playPromises);
        setIsMusicPlaying(true);
      } finally {
        setIsMusicLoading(false);
      }
    }
  };

  // Initialize audio elements
  useEffect(() => {
    musicTracks.forEach((track) => {
      if (!audioRefs.current[track.id]) {
        const audio = new Audio(track.file);
        audio.loop = true;
        audio.volume = trackVolumes[track.id] || 0.5;
        audio.preload = "none"; // Load only when needed

        // Error handling
        audio.onerror = () => {
          console.warn(`Failed to load audio: ${track.name}`);
        };

        audioRefs.current[track.id] = audio;
      }
    });

    // Initialize alarm sound
    if (!alarmRef.current) {
      const alarm = new Audio("/nature/Alarm.mp3");
      alarm.preload = "auto";
      alarm.volume = 0.7;
      alarm.loop = true; // Set alarm to loop by default
      alarm.onerror = () => {
        console.warn("Failed to load alarm sound");
      };
      alarmRef.current = alarm;
    }
  }, []);

  // Music is now completely independent of meditation sessions
  // No automatic play/pause behavior when meditation starts/stops

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current.src = "";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50/40 relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-8 opacity-20 animate-pulse">
          <Circle className="w-32 h-32 text-teal-300" fill="currentColor" />
        </div>
        <div className="absolute top-32 right-12 opacity-15 animate-bounce">
          <Wind className="w-20 h-20 text-cyan-400 rotate-12" />
        </div>
        <div className="absolute bottom-40 left-16 opacity-20 animate-pulse">
          <div className="w-24 h-24 rounded-full border-2 border-teal-300"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <Sparkles className="w-12 h-12 text-cyan-500" />
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 py-8 text-center md:pt-20 lg:pt-8 px-6 md:pl-32 lg:pl-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Circle className="w-8 h-8 text-teal-600" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-extralight text-stone-800 tracking-wide">
              Breathwork
            </h1>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-stone-600 text-lg font-light mb-6">
            Guided breathing meditation for inner peace
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-24 md:pl-32 lg:pl-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breathing Pattern Selection */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-stone-800 mb-4">
                  Choose Breathing Pattern
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {breathingPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => setSelectedPattern(pattern.name)}
                      className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        selectedPattern === pattern.name
                          ? `bg-gradient-to-br ${pattern.color} shadow-lg scale-105 border-2 border-teal-300`
                          : "bg-white/70 hover:bg-white/90 hover:shadow-md border border-stone-200"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-stone-700 mb-1">
                          {pattern.name}
                        </div>
                        <p className="text-sm font-medium text-stone-700">
                          {pattern.label}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {pattern.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timer Controls */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-stone-800">
                    Session Timer
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-stone-500" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-stone-500" />
                      )}
                    </button>
                    <button className="p-2 rounded-full hover:bg-stone-100 transition-colors">
                      <Settings className="w-5 h-5 text-stone-500" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[5, 10, 15].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => handleTimeChange(minutes)}
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
                        onClick={handleStart}
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handlePause}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          {isPaused ? (
                            <Play className="w-5 h-5 mr-2" />
                          ) : (
                            <Pause className="w-5 h-5 mr-2" />
                          )}
                          {isPaused ? "Resume" : "Pause"}
                        </Button>
                        <Button
                          onClick={handleStop}
                          variant="outline"
                          className="border-2 border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-stone-400 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Stop
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Music Selection */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-stone-800 flex items-center gap-2">
                    <Music className="w-5 h-5 text-teal-600" />
                    Ambient Sounds
                  </h3>
                  <Button
                    onClick={toggleMusic}
                    variant={isMusicPlaying ? "default" : "outline"}
                    size="sm"
                    disabled={isMusicLoading || selectedTracks.length === 0}
                    className={`${
                      isMusicPlaying
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "border-teal-300 text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    {isMusicLoading ? (
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : isMusicPlaying ? (
                      <Pause className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isMusicLoading
                      ? "Loading..."
                      : isMusicPlaying
                      ? "Stop Music"
                      : "Play Music"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {musicTracks.map((track) => {
                    const isSelected = selectedTracks.includes(track.id);
                    const volume = trackVolumes[track.id] || 0.5;

                    return (
                      <div
                        key={track.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-teal-300 bg-teal-50"
                            : "border-stone-200 bg-stone-50 hover:border-teal-200"
                        }`}
                        onClick={() => toggleTrack(track.id)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{track.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-stone-800 text-sm">
                              {track.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Volume2 className="w-3 h-3 text-stone-500" />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) =>
                                  updateTrackVolume(
                                    track.id,
                                    parseFloat(e.target.value)
                                  )
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-300"
                                style={{
                                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                                    volume * 100
                                  }%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                                }}
                              />
                              <span className="text-xs text-stone-500 w-8">
                                {Math.round(volume * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedTracks.length > 0 && (
                  <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-sm text-teal-700">
                      <strong>{selectedTracks.length}</strong> track
                      {selectedTracks.length > 1 ? "s" : ""} selected • All
                      tracks will loop continuously
                    </p>
                    {isMusicPlaying && (
                      <div className="mt-2">
                        <p className="text-xs text-teal-600 font-medium">
                          Currently playing:
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedTracks.map((trackId) => {
                            const track = musicTracks.find(
                              (t) => t.id === trackId
                            );
                            return (
                              <span
                                key={trackId}
                                className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded"
                              >
                                {track?.icon} {track?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Breathing Circle */}
          <div
            className={`transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
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
                          onClick={stopAlarm}
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
                        transform:
                          isPlaying && !isPaused ? "scale(1.1)" : "scale(1)",
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
        </div>
      </main>

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

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
