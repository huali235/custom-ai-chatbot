import { ChatInterface } from "@/components/ChatInterface";
import { VideoBackground } from "@/components/VideoBackground";
import { Suspense } from "react";

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
  return (
    <main className="min-h-screen relative flex items-center justify-center p-6">
      {/* Server always renders this wrapper */}
      <div className="fixed inset-0 -z-10">
        <VideoBackground />
      </div>

      {/* Foreground app content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <Suspense fallback={<ChatLoadingFallback />}>
          <ChatInterface />
        </Suspense>
      </div>
    </main>
  );
}
