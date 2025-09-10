import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface MessageBubbleProps {
  message: Message;
}

// Animation variants following design principles
const messageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1] as const,
      staggerChildren: 0.1
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1] as const
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

function MessageBubbleComponent({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  // Memoized formatted time for performance
  const formattedTime = useMemo(() => {
    return message.timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, [message.timestamp]);

  return (
    <motion.div
      className={cn(
        "flex w-full mb-4 group",
        isUser ? "justify-end" : "justify-start"
      )}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      {/* Avatar for assistant */}
      {!isUser && (
        <motion.div 
          className="flex-shrink-0 mr-3 mt-1"
          variants={avatarVariants}
        >
          <motion.div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Bot className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      )}
      
      <motion.div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200",
          isUser
            ? "bg-blue-600 text-white rounded-br-md hover:bg-blue-700"
            : "bg-white/95 text-gray-800 border border-gray-200/50 backdrop-blur-sm rounded-bl-md hover:bg-white"
        )}
        variants={contentVariants}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.99,
          transition: { duration: 0.1 }
        }}
        layout
      >
        <motion.p 
          className="text-sm leading-relaxed whitespace-pre-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {message.content}
        </motion.p>
        <motion.div 
          className={cn(
            "text-xs mt-2 flex items-center gap-1",
            isUser ? "text-blue-100 justify-end" : "text-gray-500 justify-start"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span>{formattedTime}</span>
        </motion.div>
      </motion.div>

      {/* Avatar for user */}
      {isUser && (
        <motion.div 
          className="flex-shrink-0 ml-3 mt-1"
          variants={avatarVariants}
        >
          <motion.div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <User className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const MessageBubble = memo(MessageBubbleComponent);