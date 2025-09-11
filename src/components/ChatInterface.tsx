"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble } from "./ui/MessageBubble";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { Send, RotateCcw, Download, Copy } from "lucide-react";
import { useSettings } from "./SettingsPanel";

// Session storage key for message persistence
const CHAT_SESSION_KEY = 'travel-chat-session';

// Helper functions for persistence
const saveMessagesToSession = (messages: unknown[]) => {
  try {
    localStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save messages to session storage:', error);
  }
};

const loadMessagesFromSession = () => {
  try {
    const saved = localStorage.getItem(CHAT_SESSION_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('Failed to load messages from session storage:', error);
    return [];
  }
};

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettings();
  
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      console.log('Message finished:', message);
    },
  });

  // Load initial messages from session storage on mount
  useEffect(() => {
    loadMessagesFromSession();
    // Note: In AI SDK 5.0+, we would need to manually restore messages if needed
    // For now, we'll rely on the persistence during the session
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToSession(messages);
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  // Check if currently loading/streaming
  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Memoized handlers for better performance
  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim() || isLoading) return;
    
    sendMessage({ text: content.trim() });
    setInputValue("");
  }, [isLoading, sendMessage]);

  const handleQuickAction = useCallback((prompt: string) => {
    handleSendMessage(prompt);
  }, [handleSendMessage]);

  // Memoized conversation management functions
  const clearConversation = useCallback(() => {
    localStorage.removeItem(CHAT_SESSION_KEY);
    // Refresh the page to reset the chat state
    window.location.reload();
  }, []);

  const exportConversation = useCallback(() => {
    const conversationText = messages
      .map(message => {
        const role = message.role === 'user' ? 'You' : 'AI';
        const content = message.parts
          .filter(part => part.type === 'text')
          .map(part => part.text)
          .join('');
        return `${role}: ${content}`;
      })
      .join('\n\n');

    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages]);

  const copyConversation = useCallback(async () => {
    const conversationText = messages
      .map(message => {
        const role = message.role === 'user' ? 'You' : 'AI';
        const content = message.parts
          .filter(part => part.type === 'text')
          .map(part => part.text)
          .join('');
        return `${role}: ${content}`;
      })
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(conversationText);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
    }
  }, [messages]);

  // Show error message if there's an API error
  if (error) {
    console.error('Chat interface error:', error);
  }

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  }, [inputValue, handleSendMessage]);

  // Memoized animation variants - respect user settings for performance
  const containerVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      scale: settings.animationsEnabled ? 0.95 : 1,
      y: settings.animationsEnabled ? 20 : 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: settings.animationsEnabled ? 0.4 : 0,
        ease: [0.4, 0.0, 0.2, 1] as const,
        staggerChildren: settings.animationsEnabled ? 0.1 : 0
      }
    }
  }), [settings.animationsEnabled]);

  const headerVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: settings.animationsEnabled ? -10 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: settings.animationsEnabled ? 0.3 : 0,
        ease: [0.4, 0.0, 0.2, 1] as const
      }
    }
  }), [settings.animationsEnabled]);

  // Memoized processed messages for better performance
  const processedMessages = useMemo(() => {
    return messages
      .filter(message => message.role === 'user' || message.role === 'assistant')
      .map((message) => ({
        id: message.id,
        role: message.role as 'user' | 'assistant',
        content: message.parts
          .filter(part => part.type === 'text')
          .map(part => part.text)
          .join(''),
        timestamp: new Date(),
      }));
  }, [messages]);

  return (
    <motion.div 
      className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="px-8 pt-8 pb-6 relative"
        variants={headerVariants}
      >
        <div className="flex justify-between items-start">
          <div>
            <motion.h1 
              className="text-xl font-semibold text-gray-900 text-left leading-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              How can I help
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-left text-base font-normal mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              planning your travel?
            </motion.p>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Conversation management - only show if there are messages */}
            <AnimatePresence>
              {messages.length > 0 && (
                <>
                  <motion.button
                    onClick={copyConversation}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Copy conversation"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={exportConversation}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Export conversation"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={clearConversation}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-100/50 rounded-lg transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Clear conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Clear</span>
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="min-h-0 overflow-y-auto px-8 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {processedMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <motion.div
              key="typing-indicator"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
          
          {error && (
            <motion.div 
              key="error-message"
              className="text-center text-red-500 text-sm p-4 bg-red-50/80 backdrop-blur-sm rounded-lg mx-4"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <p>Sorry, there was an error processing your message. Please try sending your message again.</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-8 pb-8">
        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="w-full text-black pr-12 bg-gray-50/80 border-gray-200/50 rounded-2xl h-12 placeholder:text-gray-400 focus:bg-white focus:border-gray-300"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 border-0 shadow-none"
          >
            <Send className="h-4 w-4 text-white" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div 
            className="px-8 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            layout
          >
            <QuickActions onQuickAction={handleQuickAction} />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}