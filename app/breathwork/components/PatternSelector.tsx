"use client";

import { Card, CardContent } from "@/components/ui/card";

interface BreathingPattern {
  name: string;
  label: string;
  description: string;
  color: string;
}

interface PatternSelectorProps {
  selectedPattern: string;
  onPatternChange: (pattern: string) => void;
  isVisible: boolean;
}

const breathingPatterns: BreathingPattern[] = [
  {
    name: "4-4-4-4",
    label: "Box Breathing",
    description: "Inhale 4s, Hold 4s, Exhale 4s, Hold 4s",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "4-7-8",
    label: "Calming Breath",
    description: "Inhale 4s, Hold 7s, Exhale 8s",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "6-2-6",
    label: "Balanced Breath",
    description: "Inhale 6s, Hold 2s, Exhale 6s",
    color: "from-purple-400 to-violet-500",
  },
  {
    name: "3-3-3",
    label: "Quick Reset",
    description: "Inhale 3s, Hold 3s, Exhale 3s",
    color: "from-orange-400 to-red-500",
  },
];

export function PatternSelector({
  selectedPattern,
  onPatternChange,
  isVisible,
}: PatternSelectorProps) {
  return (
    <div
      className={`transition-all duration-1000 delay-200 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                onClick={() => onPatternChange(pattern.name)}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 bg-white/70 hover:bg-white/90 hover:shadow-md border ${
                  selectedPattern === pattern.name
                    ? "border-2 border-teal-500 shadow-lg scale-105"
                    : "border-stone-200"
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
  );
}
