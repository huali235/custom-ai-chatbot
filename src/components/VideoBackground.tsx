"use client";

import { useState } from "react";

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      {/* Desert/landscape themed fallback background */}
      <div 
        className={`w-full h-full transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at center top, #fbbf24 0%, #f59e0b 25%, #d97706 50%),
            linear-gradient(135deg, #fed7aa 0%, #fdba74 25%, #fb923c 50%, #f97316 75%, #ea580c 100%)
          `,
          backgroundSize: '100% 40%, 100% 100%',
          backgroundPosition: '0 0, 0 0',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Desert texture overlay */}
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='desert' patternUnits='userSpaceOnUse' width='120' height='120'%3E%3Cpath d='M0 0h120v120H0z' fill='%23000000' fill-opacity='0.02'/%3E%3Cpath d='m0 60 30-30h60l30 30v60H0z' fill='%23000000' fill-opacity='0.03'/%3E%3Cpath d='M30 30h60v60H30z' fill='%23000000' fill-opacity='0.01'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23desert)'/%3E%3C/svg%3E")`
          }}
        />
        
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