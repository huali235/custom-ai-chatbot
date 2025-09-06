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
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          onClick={() => onQuickAction(action.prompt)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-white/30"
        >
          <span className="mr-1">{action.emoji}</span>
          {action.label}
        </Button>
      ))}
    </div>
  );
}