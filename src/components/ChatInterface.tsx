"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageBubble } from "./ui/MessageBubble";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { Send } from "lucide-react";

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  
  const { messages, sendMessage, isLoading, error, reload, stop } = useChat({
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

  const handleSendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;
    
    sendMessage({ text: content.trim() });
    setInputValue("");
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Show error message if there's an API error
  if (error) {
    console.error('Chat interface error:', error);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-xl font-semibold text-gray-900 text-left leading-tight">
          How can I help
        </h1>
        <p className="text-gray-400 text-left text-base font-normal mt-1">
          planning your travel?
        </p>
      </div>

      {/* Messages */}
      <div className="min-h-0 overflow-y-auto px-8 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((message) => {
          // Convert AI SDK message format to our MessageBubble format
          const convertedMessage = {
            id: message.id,
            role: message.role,
            content: message.parts
              .filter(part => part.type === 'text')
              .map(part => part.text)
              .join(''),
            timestamp: new Date(),
          };
          return <MessageBubble key={message.id} message={convertedMessage} />;
        })}
        
        {isLoading && <TypingIndicator />}
        
        {error && (
          <div className="text-center text-red-500 text-sm p-4 bg-red-50/80 backdrop-blur-sm rounded-lg mx-4">
            <p className="mb-2">Sorry, there was an error processing your message.</p>
            <button 
              onClick={() => reload()}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Try again
            </button>
          </div>
        )}
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
      {messages.length === 0 && (
        <div className="px-8 py-6">
          <QuickActions onQuickAction={handleQuickAction} />
        </div>
      )}
    </div>
  );
}