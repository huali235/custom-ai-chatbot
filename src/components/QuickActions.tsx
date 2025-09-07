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
    <div className="space-y-3">
      <p className="text-center text-gray-600 text-sm font-medium">Quick Actions</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onQuickAction(action.prompt)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white border-white/50 hover:border-gray-300/70 transition-all duration-200 hover:scale-105 hover:shadow-md text-gray-700 hover:text-gray-800 group"
          >
            <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">{action.emoji}</span>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}