"use client";

import { motion } from "framer-motion";
import { messageLines, messageText } from "@/data/content";
import { FloatingHearts } from "./FloatingHearts";
import { fadeUp, sectionViewport, staggerLines } from "./motion";

export function MessageSection() {
  const eyebrow = messageText.eyebrow ?? "a little reminder";
  const heading = messageText.heading ?? "Even from far away, I am still with you.";
  const safeMessageLines =
    Array.isArray(messageLines) && messageLines.length > 0
      ? messageLines
      : ["I am still with you, always."];

  return (
    <div className="relative flex w-full flex-col items-center text-center">
      <FloatingHearts />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial="hidden"
        variants={staggerLines}
        viewport={sectionViewport}
        whileInView="visible"
      >
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

        <div className="mt-8 w-full space-y-4">
          {safeMessageLines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              className="rounded-2xl border border-white/[0.08] bg-white/5 px-4 py-4 text-left text-base leading-7 text-white/[0.85] sm:px-5 sm:text-lg sm:leading-8"
              variants={fadeUp}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
