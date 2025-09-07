"use client";

import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 group">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3 mt-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="bg-white/95 border border-gray-200/50 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600 font-medium">Thinking</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}