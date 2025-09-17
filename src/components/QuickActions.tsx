"use client";

import { QuickAction } from "@/types/chat";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

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

// Animation variants following design principles
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

const emojiVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  }
};

const footerVariants = {
  hidden: {
    opacity: 0,
    y: 5
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.4,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  }
};

export function QuickActions({ onQuickAction }: QuickActionsProps) {
  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.id}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            custom={index}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickAction(action.prompt)}
              className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/40 hover:border-gray-300/60 transition-all duration-200 text-gray-700 hover:text-gray-800 rounded-xl px-4 py-3 h-auto group cursor-pointer"
            >
              <motion.span 
                className="mr-2 text-base"
                variants={emojiVariants}
                whileHover="hover"
              >
                {action.emoji}
              </motion.span>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="text-center"
        variants={footerVariants}
      >
      </motion.div>
    </motion.div>
  );
}