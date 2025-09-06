"use client";

import { useState } from "react";
import { MessageBubble } from "./ui/MessageBubble";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { useChatStore, createMessage } from "@/lib/stores/chat";
import { Send } from "lucide-react";

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, addMessage, setLoading } = useChatStore();

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage = createMessage(content.trim(), "user");
    addMessage(userMessage);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      let assistantContent = "";
      const assistantMessage = createMessage("", "assistant");
      addMessage(assistantMessage);

      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const data = JSON.parse(line.slice(2));
              if (data.type === "textDelta" && data.textDelta) {
                assistantContent += data.textDelta;
                // Update the last message with accumulated content
                const updatedMessage = { ...assistantMessage, content: assistantContent };
                useChatStore.setState((state) => ({
                  messages: [...state.messages.slice(0, -1), updatedMessage]
                }));
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = createMessage(
        "Sorry, I encountered an error. Please try again.",
        "assistant"
      );
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          How can I help planning your travel?
        </h1>
        <p className="text-gray-600 text-center mt-1">
          Your AI travel companion for seamless trip planning
        </p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>Start a conversation or try one of the quick actions below!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
      </div>

      {/* Quick Actions */}
      {messages.length === 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <QuickActions onQuickAction={handleQuickAction} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your travel question here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            size="default"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}