"use client";

import { useState } from "react";

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Desert image fallback background */}
      <div 
        className={`w-full h-full transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: 'url(/assets/desert-pic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Atmospheric depth layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-sky-200/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-800/5" />
      </div>
      
      {/* Video element with optimized formats */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJkZXNlcnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmYmJmMjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlYTU4MGMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNkZXNlcnQpIi8+PC9zdmc+"
      >
        <source src="/videos/desert-landscape.webm" type="video/webm" />
        <source src="/videos/desert-landscape.mp4" type="video/mp4" />
        {/* Fallback for very slow connections */}
        Your browser does not support video backgrounds.
      </video>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[0.5px]" />
    </div>
  );
}