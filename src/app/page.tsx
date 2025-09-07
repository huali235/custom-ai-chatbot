import { ChatInterface } from "@/components/ChatInterface";
import { VideoBackground } from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <VideoBackground />
      <div className="w-full max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </main>
  );
}
