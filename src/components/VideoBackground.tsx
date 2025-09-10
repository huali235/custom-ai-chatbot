"use client";

import { useEffect, useRef, useState } from "react";

export function VideoBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Handle Chrome autoplay restrictions
    const handleVideoLoad = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        await video.play();
        setCanPlayVideo(true);
      } catch (error) {
        console.log("Autoplay blocked by browser, falling back to poster");
        setCanPlayVideo(false);
      }
    };

    if (videoRef.current) {
      handleVideoLoad();
    }
  }, [isMounted]);

  if (!isMounted || !canPlayVideo) {
    return (
      <div 
        className="fixed inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/desert-pic.jpg)' }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 -z-10 w-full h-full object-cover"
      loop
      muted
      autoPlay
      playsInline
      preload="metadata"
      poster="/assets/desert-pic.jpg"
    >
      <source src="/videos/beach.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
