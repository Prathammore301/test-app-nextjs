"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cakeText } from "@/data/content";
import { CakeFireworks } from "./CakeFireworks";
import { ConfettiBurst } from "./ConfettiBurst";
import {
  fadeScale,
  fadeUp,
  sectionViewport,
  sharedEase,
  staggerContainer,
} from "./motion";
import { useIsClient } from "./use-is-client";

type CakeSectionProps = {
  birthdayPosterSrc: string;
  birthdayVideoSrc?: string | null;
};

export function CakeSection({
  birthdayPosterSrc,
  birthdayVideoSrc,
}: CakeSectionProps) {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const isClient = useIsClient();
  const [burstKey, setBurstKey] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const cakeAudioRef = useRef<HTMLAudioElement | null>(null);
  const fireworksAudioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const cakeAudio = cakeAudioRef.current;
    const fireworksAudio = fireworksAudioRef.current;

    if (cakeAudio) {
      cakeAudio.volume = 0.34;
    }

    if (fireworksAudio) {
      fireworksAudio.volume = 0.42;
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !isCelebrating) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsCelebrating(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [isCelebrating, isClient]);

  const eyebrow = cakeText.eyebrow ?? "make a wish";
  const heading =
    cakeText.heading ?? "A tiny celebration for the most beautiful soul I know.";
  const buttonLabel = cakeText.buttonLabel ?? "Cut the Cake";
  const celebrationLines = [
    "Happy Birthday to you 🎉",
    "Made with all my love ❤️",
  ];
  const videoSrc = birthdayVideoSrc ?? "/birthday.mp4";

  function handleCakeCut() {
    if (!isClient) {
      return;
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([18, 12, 26]);
    }

    if (fireworksAudioRef.current) {
      fireworksAudioRef.current.currentTime = 0;
      void fireworksAudioRef.current.play().catch(() => {});
    }

    if (cakeAudioRef.current) {
      cakeAudioRef.current.currentTime = 0;
      window.setTimeout(() => {
        void cakeAudioRef.current?.play().catch(() => {});
      }, 120);
    }

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }

    setBurstKey((currentValue) => currentValue + 1);
    setIsCelebrating(true);
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      {isClient ? <audio ref={cakeAudioRef} preload="auto" src="/cake.mp3" /> : null}
      {isClient ? (
        <audio ref={fireworksAudioRef} preload="auto" src="/fireworks.mp3" />
      ) : null}

      <motion.span
        className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        className="max-w-xl text-balance font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {heading}
      </motion.h2>

      <motion.div className="relative mt-10 w-full" variants={fadeScale}>
        <CakeFireworks active={isCelebrating} />
        <ConfettiBurst active={isCelebrating} burstKey={burstKey} />

        <AnimatePresence>
          {isCelebrating ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-6 rounded-[2rem] bg-fuchsia-300/20 blur-3xl"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, scale: 0.8 }}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={
            isCelebrating
              ? { scale: [1, 1.02, 1], y: [0, -8, 0] }
              : { y: [0, -4, 0] }
          }
          className="relative mx-auto w-full max-w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] shadow-[0_20px_70px_rgba(214,99,255,0.18)] sm:max-w-2xl"
          transition={
            isCelebrating
              ? { duration: 1.15, ease: sharedEase }
              : { duration: 3.6, ease: "easeInOut", repeat: Infinity }
          }
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#110917]">
            <AnimatePresence>
              {isCelebrating ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="pointer-events-none absolute inset-3 z-10 rounded-xl border border-pink-200/20 shadow-[0_0_28px_rgba(255,151,216,0.18)]"
                  exit={{ opacity: 0, scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.94 }}
                />
              ) : null}
            </AnimatePresence>

            {!hasVideoError ? (
              <video
                ref={videoRef}
                className="h-full w-full bg-[#110917] object-contain"
                controls={false}
                loop={false}
                muted
                playsInline
                poster={birthdayPosterSrc}
                preload="metadata"
                src={videoSrc}
                onEnded={() => {
                  const videoElement = videoRef.current;

                  if (!videoElement) {
                    return;
                  }

                  videoElement.pause();
                  videoElement.currentTime = 0;
                }}
                onError={() => setHasVideoError(true)}
              />
            ) : (
              <div className="relative h-full w-full">
                <Image
                  alt={cakeText.videoTitle ?? "Birthday preview"}
                  className="object-contain"
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 720px"
                  src={birthdayPosterSrc}
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
            <AnimatePresence mode="wait">
              {!isCelebrating ? (
                <motion.div
                  key="video-caption"
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5"
                  exit={{ opacity: 0, y: 18 }}
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4 text-left backdrop-blur-xl">
                    <p className="font-display text-2xl text-white sm:text-3xl">
                      {cakeText.videoTitle ?? "A little birthday film for you"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/[0.72]">
                      {cakeText.videoSubtitle ??
                        "A soft little keepsake for your day. Press play and smile."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="video-message"
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
                  exit={{ opacity: 0, scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 px-6 py-5 backdrop-blur-md">
                    {celebrationLines.map((line, index) => (
                      <motion.p
                        key={`${line}-${index}`}
                        animate={{ opacity: [0.72, 1, 0.82], y: [0, -2, 0] }}
                        className="glow-text font-display text-3xl leading-tight text-white sm:text-4xl"
                        transition={{
                          delay: index * 0.12,
                          duration: 1.1,
                          ease: "easeInOut",
                          repeat: 1,
                          repeatType: "mirror",
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        className="mt-8 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(214,99,255,0.28)]"
        onClick={handleCakeCut}
        type="button"
        variants={fadeUp}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonLabel}
      </motion.button>
    </motion.div>
  );
}
