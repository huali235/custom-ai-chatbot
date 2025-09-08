"use client";

import { QuickAction } from "@/types/chat";
import { Button } from "./ui/Button";

interface QuickActionsProps {
  onQuickAction: (prompt: string) => void;
}

const quickActions: QuickAction[] = [
  {
    id: "booking",
    label: "Booking the hotel",
    emoji: "🏨",
    prompt: "I need help booking a hotel for my upcoming trip. Can you assist me with finding good options?",
  },
  {
    id: "attractions",
    label: "Popular tourist attractions", 
    emoji: "🏛️",
    prompt: "What are the most popular tourist attractions I should visit at my destination?",
  },
  {
    id: "car-rental",
    label: "Rent a car for my trip",
    emoji: "🚗", 
    prompt: "I want to rent a car for my trip. Can you help me understand the options and process?",
  },
];

export function QuickActions({ onQuickAction }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onQuickAction(action.prompt)}
            className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/40 hover:border-gray-300/60 transition-all duration-200 text-gray-700 hover:text-gray-800 rounded-xl px-4 py-3 h-auto group"
          >
            <span className="mr-2 text-base">{action.emoji}</span>
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-400 font-normal">Powered by Claude</p>
      </div>
    </div>
  );
}