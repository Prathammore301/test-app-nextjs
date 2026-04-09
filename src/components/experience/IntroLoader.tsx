"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CakeFireworks } from "./CakeFireworks";

const FIREWORKS_DURATION_MS = 2000;
const SLIDE_DURATION_MS = 1400;
const SLIDE_EXIT_DELAY_MS = 1700;

const childhoodSlides = [
  {
    alt: "Childhood memory one",
    src: "/childhood/childhood1.jpeg",
  },
  {
    alt: "Childhood memory two",
    src: "/childhood/childhood2.jpeg",
  },
  {
    alt: "Childhood memory three",
    src: "/childhood/childhood3.jpeg",
  },
] as const;

export function IntroLoader() {
  const [hasFinished, setHasFinished] = useState(false);
  const [phase, setPhase] = useState<"fireworks" | "slideshow">("fireworks");
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = hasFinished ? previousOverflow : "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasFinished]);

  useEffect(() => {
    if (hasFinished || phase !== "fireworks") {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setPhase("slideshow");
    }, FIREWORKS_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [hasFinished, phase]);

  useEffect(() => {
    if (hasFinished || phase !== "slideshow") {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      if (slideIndex >= childhoodSlides.length - 1) {
        setHasFinished(true);
        return;
      }

      setSlideIndex((currentIndex) => currentIndex + 1);
    }, slideIndex >= childhoodSlides.length - 1 ? SLIDE_EXIT_DELAY_MS : SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [hasFinished, phase, slideIndex]);

  return (
    <AnimatePresence>
      {!hasFinished ? (
        <motion.div
          key="intro-loader"
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[120] overflow-hidden bg-[#09050f]"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          initial={{ opacity: 1 }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,128,203,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(145,104,255,0.18),transparent_34%),linear-gradient(180deg,#120814_0%,#09050f_100%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:68px_68px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
          </div>

          <AnimatePresence mode="wait">
            {phase === "fireworks" ? (
              <motion.div
                key="fireworks"
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex h-full items-center justify-center px-6"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute inset-0">
                  <CakeFireworks active />
                </div>

                <motion.div
                  animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.96, 1.03, 0.98] }}
                  className="absolute inset-x-[18%] top-[18%] h-44 rounded-full bg-fuchsia-300/20 blur-3xl"
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                />

                <motion.p
                  animate={{ opacity: [0.55, 0.95, 0.55], y: [0, -5, 0] }}
                  className="relative z-10 text-center font-display text-4xl leading-tight text-white sm:text-6xl"
                  transition={{ duration: 1.7, ease: "easeInOut", repeat: Infinity }}
                >
                  A little birthday magic is on its way...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="slideshow"
                animate={{ opacity: 1, y: 0 }}
                className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto px-5 pb-10 pt-12 text-center sm:justify-center sm:px-6 sm:py-10"
                exit={{ opacity: 0, scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[10%] top-[10%] h-40 w-40 rounded-full bg-pink-300/18 blur-3xl" />
                  <div className="absolute bottom-[12%] right-[8%] h-44 w-44 rounded-full bg-violet-400/20 blur-3xl" />
                </div>

                <motion.span
                  className="relative z-20 mb-4 text-[0.68rem] uppercase tracking-[0.32em] text-pink-100/68 sm:tracking-[0.38em]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  from the tiniest memories to today
                </motion.span>

                <motion.h1
                  className="glow-text relative z-20 max-w-[17rem] text-balance font-display text-[2.6rem] leading-[1.04] text-white sm:max-w-xl sm:text-6xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.55 }}
                >
                  Happy Birthday My Love ❤️
                </motion.h1>

                <motion.p
                  className="relative z-20 mt-4 max-w-[18rem] text-pretty text-sm leading-7 text-white/72 sm:max-w-md sm:text-base"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.55 }}
                >
                  A few precious little beginnings before the rest of your surprise opens up.
                </motion.p>

                <div className="relative z-10 mt-7 w-full max-w-[17rem] sm:max-w-md">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={childhoodSlides[slideIndex]?.src}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_24px_70px_rgba(214,99,255,0.18)] backdrop-blur-xl"
                      exit={{ opacity: 0, scale: 0.96, rotate: -2 }}
                      initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white/[0.05]">
                        <Image
                          alt={childhoodSlides[slideIndex]?.alt ?? "Childhood memory"}
                          className="object-cover"
                          fill
                          priority
                          sizes="(max-width: 640px) 78vw, 420px"
                          src={
                            imageFallbacks[childhoodSlides[slideIndex]?.src ?? "/next.svg"] ??
                            childhoodSlides[slideIndex]?.src ??
                            "/next.svg"
                          }
                          onError={() => {
                            const source = childhoodSlides[slideIndex]?.src;

                            if (!source) {
                              return;
                            }

                            setImageFallbacks((currentValue) => ({
                              ...currentValue,
                              [source]: "/next.svg",
                            }));
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0713]/70 via-transparent to-transparent" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="relative z-20 mt-5 flex items-center gap-2">
                  {childhoodSlides.map((slide, index) => (
                    <span
                      key={slide.src}
                      className={`h-2.5 rounded-full transition-all ${
                        index === slideIndex ? "w-7 bg-pink-300" : "w-2.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
