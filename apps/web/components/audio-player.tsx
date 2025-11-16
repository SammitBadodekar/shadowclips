"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  className?: string;
  size?: number;
  volume?: number;
}

export function AudioPlayer({
  src,
  className,
  size = 30,
  volume = 1,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setIsPlaying(false);
  }, [src]);

  return (
    <>
      <button
        onClick={togglePlay}
        className={cn(
          `${!src ? "bg-primary/50" : "bg-primary hover:bg-primary/90 "} flex items-center justify-center rounded-full text-primary-foreground shadow-lg transition-all `,
          className
        )}
        style={{ width: size, height: size }}
        aria-label={isPlaying ? "Pause" : "Play"}
        disabled={!src}
      >
        {isPlaying ? (
          <Pause className="fill-current" size={size * 0.4} />
        ) : (
          <Play className="fill-current ml-0.5" size={size * 0.4} />
        )}
      </button>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        className="hidden"
        preload="none"
      />
    </>
  );
}
