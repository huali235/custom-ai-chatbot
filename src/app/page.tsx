"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { VideoBackground } from "@/components/VideoBackground";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Suspense, useState } from "react";
import { Settings } from "lucide-react";

// Loading fallback for lazy-loaded components
function ChatLoadingFallback() {
  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="px-8 pt-8 pb-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
      </div>
      <div className="px-8 min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    </div>
  );
}

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="min-h-screen relative flex flex-col">
      {/* Server always renders this wrapper */}
      <div className="fixed inset-0 -z-10">
        <VideoBackground />
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-20 w-full p-6 flex justify-end">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-200"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      {/* Foreground app content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-2xl mx-auto">
          <Suspense fallback={<ChatLoadingFallback />}>
            <ChatInterface />
          </Suspense>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </main>
  );
}
