"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { memoryText } from "@/data/content";
import type { PublicGalleryItem } from "@/lib/public-media";
import {
  fadeScale,
  fadeUp,
  sectionViewport,
  sharedEase,
  staggerContainer,
} from "./motion";

type MemorySectionProps = {
  items: PublicGalleryItem[];
};

const memoryCaptionsByIndex = [
  "One of my favorite moments with you ❤️",
  "A little piece of us that always makes me smile.",
  "This memory still feels soft and beautiful to me.",
  "A moment with you I would choose again and again.",
];

export function MemorySection({ items }: MemorySectionProps) {
  const filteredItems = items.filter((_, index) => index !== 4);
  const safeMemoryItems =
    filteredItems.length > 0
      ? filteredItems
      : [
          {
            alt: "Romantic memory placeholder",
            caption: "A little memory placeholder while you add your own photos.",
            src: "/next.svg",
            title: "Our memory",
          },
        ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const memoryHeading = memoryText.heading ?? "Our Memories";
  const memoryEyebrow = memoryText.eyebrow ?? "the story of us";
  const memorySubtitle =
    memoryText.subtitle ??
    "A little deck of the moments I never want to lose.";
  const safeActiveIndex = activeIndex % safeMemoryItems.length;

  function getMemoryItem(indexOffset: number) {
    return safeMemoryItems[
      (safeActiveIndex + indexOffset) % safeMemoryItems.length
    ];
  }

  function showNextCard() {
    setActiveIndex(
      (currentIndex) => (currentIndex + 1) % safeMemoryItems.length,
    );
  }

  function showPreviousCard() {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + safeMemoryItems.length) % safeMemoryItems.length,
    );
  }

  function getImageSrc(src: string) {
    return imageFallbacks[src] ?? src;
  }

  function getDisplayMemory(index: number) {
    const memory = safeMemoryItems[index];

    if (!memory) {
      return {
        caption: "One of my favorite moments with you ❤️",
        title: "",
      };
    }

    return {
      ...memory,
      caption:
        memoryCaptionsByIndex[index % memoryCaptionsByIndex.length] ??
        "One of my favorite moments with you ❤️",
      title: "",
    };
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.span
        className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {memoryEyebrow}
      </motion.span>

      <motion.h2
        className="glow-text max-w-xl text-balance font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {memoryHeading}
      </motion.h2>

      <motion.p
        className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/[0.7] sm:text-base"
        variants={fadeUp}
      >
        {memorySubtitle}
      </motion.p>

      <motion.div className="mt-8 w-full max-w-[22rem] sm:max-w-md" variants={fadeScale}>
        <div className="relative h-[25rem] w-full overflow-visible sm:h-[29rem]">
          {[2, 1, 0].map((offset) => {
            const memory = getMemoryItem(offset);
            const memoryIndex = (safeActiveIndex + offset) % safeMemoryItems.length;
            const displayMemory = getDisplayMemory(memoryIndex);
            const isTopCard = offset === 0;

            return (
              <motion.div
                key={`${memory.src}-${memoryIndex}`}
                aria-label={isTopCard ? `Open memory ${memoryIndex + 1}` : undefined}
                className="absolute inset-0 block w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] text-left"
                drag={isTopCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onClick={() => {
                  if (isTopCard) {
                    setSelectedIndex(memoryIndex);
                  }
                }}
                onDragEnd={(_, info) => {
                  if (!isTopCard) {
                    return;
                  }

                  if (info.offset.x < -80) {
                    showNextCard();
                    return;
                  }

                  if (info.offset.x > 80) {
                    showPreviousCard();
                  }
                }}
                onKeyDown={(event) => {
                  if (!isTopCard) {
                    return;
                  }

                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedIndex(memoryIndex);
                  }
                }}
                role={isTopCard ? "button" : undefined}
                style={{ zIndex: 30 - offset }}
                tabIndex={isTopCard ? 0 : -1}
                transition={{ duration: 0.45, ease: sharedEase }}
                whileHover={isTopCard ? { rotate: 0, scale: 1.01 } : undefined}
                whileTap={isTopCard ? { scale: 0.99 } : undefined}
                animate={{
                  opacity: 1 - offset * 0.16,
                  rotate: offset === 0 ? -2 : offset === 1 ? 3 : -4,
                  scale: 1 - offset * 0.04,
                  y: offset * 16,
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    alt={memory.alt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 86vw, 420px"
                    src={getImageSrc(memory.src)}
                    onError={() =>
                      setImageFallbacks((currentValue) => ({
                        ...currentValue,
                        [memory.src]: "/next.svg",
                      }))
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0713]/95 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="rounded-[1.4rem] border border-white/10 bg-[#140d1e]/70 p-4 backdrop-blur-xl">
                    <p className="text-sm leading-6 text-white/[0.78] sm:text-base">
                      {displayMemory.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {safeMemoryItems.map((memory, index) => (
            <button
              key={`${memory.src}-${index}`}
              aria-label={`Show memory ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === safeActiveIndex
                  ? "w-7 bg-pink-300"
                  : "w-2.5 bg-white/20"
              }`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>

        <p className="mt-3 text-sm text-white/[0.55]">
          Swipe the top card or tap it to open it fullscreen.
        </p>
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null ? (
          <motion.div
            aria-label="Close memory preview"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05020a]/88 px-4 py-8 backdrop-blur-md"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            onKeyDown={(event) => {
              if (
                event.key === "Escape" ||
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                setSelectedIndex(null);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <motion.div
              className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#130c1d]"
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  alt={safeMemoryItems[selectedIndex]?.alt ?? "Memory preview"}
                  className="object-cover"
                  fill
                  sizes="90vw"
                  src={getImageSrc(
                    safeMemoryItems[selectedIndex]?.src ?? "/next.svg",
                  )}
                  onError={() => {
                    const source = safeMemoryItems[selectedIndex]?.src;

                    if (!source) {
                      return;
                    }

                    setImageFallbacks((currentValue) => ({
                      ...currentValue,
                      [source]: "/next.svg",
                    }));
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0713]/95 via-transparent to-transparent" />
              </div>

              <div className="space-y-2 p-5 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm leading-6 text-white/[0.78] sm:text-base">
                      {getDisplayMemory(selectedIndex).caption}
                    </p>
                  </div>

                  <button
                    className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/[0.6]"
                    onClick={() => setSelectedIndex(null)}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
