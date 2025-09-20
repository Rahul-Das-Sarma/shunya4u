"use client";

import { useState, useEffect, useRef } from "react";

export function useBreathwork() {
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
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

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

  // Timer logic
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

  // Breathing pattern logic
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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

  return {
    // State
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

    // Actions
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
  };
}
