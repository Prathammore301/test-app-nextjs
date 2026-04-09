"use client";

import { motion } from "framer-motion";
import { loveLetterText } from "@/data/content";
import { fadeScale, fadeUp, sectionViewport } from "./motion";

const letterLines = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.22,
      staggerChildren: 0.16,
    },
  },
};

export function LoveLetterSection() {
  const eyebrow = loveLetterText.eyebrow ?? "a letter from my heart";
  const heading = loveLetterText.heading ?? "For You";
  const lines =
    Array.isArray(loveLetterText.lines) && loveLetterText.lines.length > 0
      ? loveLetterText.lines
      : ["I love you forever."];

  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial="hidden"
      variants={fadeScale}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-[12%] top-10 h-36 rounded-full bg-pink-300/[0.16] blur-3xl" />
        <div className="absolute bottom-12 left-[16%] h-28 w-28 rounded-full bg-violet-400/[0.18] blur-3xl" />
      </div>

      <motion.span
        className="relative z-10 mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        className="glow-text relative z-10 max-w-lg text-balance font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {heading}
      </motion.h2>

      <motion.article
        className="relative z-10 mt-8 w-full rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 text-left backdrop-blur-xl sm:p-8"
        variants={fadeScale}
      >
        <motion.div
          className="space-y-3"
          initial="hidden"
          variants={letterLines}
          viewport={sectionViewport}
          whileInView="visible"
        >
          {lines.map((line, index) =>
            line ? (
              <motion.p
                key={`${line}-${index}`}
                className="font-display text-[1.7rem] leading-tight text-white/[0.92] sm:text-3xl"
                variants={fadeUp}
              >
                {line}
              </motion.p>
            ) : (
              <div key={`break-${index}`} className="h-3" />
            ),
          )}
        </motion.div>
      </motion.article>
    </motion.div>
  );
}
