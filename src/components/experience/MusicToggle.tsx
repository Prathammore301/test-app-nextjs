"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { musicText } from "@/data/content";
import { useIsClient } from "./use-is-client";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isClient = useIsClient();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    audio.loop = true;
    audio.volume = 0.3;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [isClient]);

  const playLabel = musicText.playButtonLabel ?? "Play Music";
  const pauseLabel = musicText.pauseButtonLabel ?? "Pause Music";
  const playingStateLabel = musicText.playingStateLabel ?? "Playing softly";

  async function handleToggleMusic() {
    if (!isClient) {
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.currentTime = audio.currentTime || 0;

      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
  }

  return (
    <>
      {isClient ? <audio ref={audioRef} preload="auto" src="/music.mp3" /> : null}

      <motion.button
        aria-label={isPlaying ? pauseLabel : playLabel}
        aria-pressed={isPlaying}
        className="soft-glow fixed bottom-4 right-4 z-30 rounded-full border border-white/10 bg-[#171022]/80 px-4 py-3 text-left text-sm font-semibold text-white backdrop-blur-xl sm:px-5"
        onClick={handleToggleMusic}
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isPlaying ? "bg-pink-300 shadow-[0_0_12px_rgba(255,166,219,0.9)]" : "bg-white/30"
            }`}
          />
          <span>{isPlaying ? pauseLabel : playLabel}</span>
        </span>
        <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.2em] text-white/[0.52]">
          {isPlaying ? playingStateLabel : "Tap to start the soundtrack"}
        </span>
      </motion.button>
    </>
  );
}
