import React from "react";

// VideoIntro component for displaying an introductory video
export default function VideoIntro() {
  return (
    // Container with full width and height, hiding overflow
    <div className="w-full h-full overflow-hidden">
      {/* Video element with autoplay, loop, and muted attributes */}
      <video
        src="./VideoBg.mp4"   // Source file for the video
        autoPlay              // Automatically start playing the video
        loop                  // Enable looping for continuous playback
        muted                 // Mute the video (commonly used for autoplay to comply with browser policies)
        className="min-h-screen min-w-screen overflow-hidden"   // Styling for minimum height, minimum width, and hiding overflow
      />
    </div>
  );
}
