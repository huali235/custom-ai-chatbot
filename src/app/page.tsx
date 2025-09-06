import { ChatInterface } from "@/components/ChatInterface";
import { VideoBackground } from "@/components/VideoBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4">
      <VideoBackground />
      <ChatInterface />
    </main>
  );
}
