"use client";

import { Bot } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants following design principles: 150-300ms duration, ease-in-out
const containerVariants = {
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
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1] as const,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  }
};

const dotVariants = {
  hidden: { 
    y: 0,
    opacity: 0.3 
  },
  visible: {
    y: [-2, -6, -2],
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: [0.4, 0.0, 0.6, 1] as const
    }
  }
};

const avatarVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.4, 0.0, 0.2, 1] as const
    }
  }
};

export function TypingIndicator() {
  return (
    <motion.div 
      className="flex justify-start mb-4 group"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      {/* Avatar with subtle animation */}
      <motion.div 
        className="flex-shrink-0 mr-3 mt-1"
        variants={avatarVariants}
      >
        <motion.div 
          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Bot className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="bg-white/95 border border-gray-200/50 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Thinking
          </motion.div>
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-blue-500 rounded-full"
                variants={dotVariants}
                transition={{
                  ...dotVariants.visible.transition,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}