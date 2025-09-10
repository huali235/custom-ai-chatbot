"use client";

import { VideoBackground } from "@/components/VideoBackground";

export function VideoBackgroundWrapper() {
  return (
    <div className="fixed inset-0 -z-10">
      <VideoBackground />
    </div>
  );
}
