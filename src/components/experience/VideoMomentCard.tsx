"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "./use-is-client";

type VideoMomentCardProps = {
  autoPlaySignal?: number;
  playLabel: string;
  posterSrc: string;
  statusIdle: string;
  statusPlaying: string;
  subtitle: string;
  title: string;
  videoSrc?: string | null;
};

export function VideoMomentCard({
  autoPlaySignal = 0,
  playLabel,
  posterSrc,
  statusIdle,
  statusPlaying,
  subtitle,
  title,
  videoSrc,
}: VideoMomentCardProps) {
  const isClient = useIsClient();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const canRenderVideo = Boolean(isClient && videoSrc && !hasVideoError);

  async function startVideoPlayback() {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    try {
      videoElement.muted = true;
      videoElement.currentTime = 0;
      await videoElement.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    if (!canRenderVideo || autoPlaySignal <= 0) {
      return;
    }

    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.muted = true;
    videoElement.currentTime = 0;
    void videoElement.play().catch(() => {});
  }, [autoPlaySignal, canRenderVideo]);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05]">
      <div className="relative aspect-video overflow-hidden">
        {canRenderVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            controls={false}
            loop={false}
            muted
            playsInline
            poster={posterSrc}
            preload="metadata"
            src={videoSrc ?? undefined}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasVideoError(true)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        ) : (
          <Image
            alt={title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 92vw, 720px"
            src={posterSrc}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0713]/95 via-[#0d0713]/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="rounded-[1.4rem] border border-white/10 bg-[#140d1e]/60 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-2xl text-white sm:text-3xl">
                  {title}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/[0.7]">
                  {subtitle}
                </p>
              </div>

              {canRenderVideo ? (
                <motion.button
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.12] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
                  onClick={() => void startVideoPlayback()}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {playLabel}
                </motion.button>
              ) : null}
            </div>

            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-pink-100/[0.58]">
              {isPlaying ? statusPlaying : statusIdle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
