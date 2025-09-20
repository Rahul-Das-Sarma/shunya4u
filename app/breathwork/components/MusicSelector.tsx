"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Music } from "lucide-react";

interface MusicTrack {
  id: string;
  name: string;
  file: string;
  icon: string;
}

interface MusicSelectorProps {
  selectedTracks: string[];
  trackVolumes: { [key: string]: number };
  isMusicPlaying: boolean;
  isMusicLoading: boolean;
  onToggleTrack: (trackId: string) => void;
  onUpdateTrackVolume: (trackId: string, volume: number) => void;
  onToggleMusic: () => void;
  isVisible: boolean;
}

const musicTracks: MusicTrack[] = [
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

export function MusicSelector({
  selectedTracks,
  trackVolumes,
  isMusicPlaying,
  isMusicLoading,
  onToggleTrack,
  onUpdateTrackVolume,
  onToggleMusic,
  isVisible,
}: MusicSelectorProps) {
  return (
    <div
      className={`transition-all duration-1000 delay-400 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
              onClick={onToggleMusic}
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
                  onClick={() => onToggleTrack(track.id)}
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
                            onUpdateTrackVolume(
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
                {selectedTracks.length > 1 ? "s" : ""} selected • All tracks
                will loop continuously
              </p>
              {isMusicPlaying && (
                <div className="mt-2">
                  <p className="text-xs text-teal-600 font-medium">
                    Currently playing:
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTracks.map((trackId) => {
                      const track = musicTracks.find((t) => t.id === trackId);
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
  );
}
