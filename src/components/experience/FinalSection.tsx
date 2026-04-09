"use client";

import { motion } from "framer-motion";
import { customFinalMessage, finalMessage, girlfriendName } from "@/data/content";
import { FloatingHearts } from "./FloatingHearts";
import {
  fadeScale,
  fadeUp,
  sectionViewport,
  staggerContainer,
  staggerLines,
} from "./motion";

export function FinalSection() {
  const eyebrow = finalMessage.eyebrow ?? "birthday wishes";
  const title = finalMessage.title ?? "Happy Birthday My Love";
  const subtitle = finalMessage.subtitle ?? "I am with you, always.";
  const safeName = girlfriendName || "My Love";
  const safeFinalLines =
    Array.isArray(customFinalMessage) && customFinalMessage.length > 0
      ? customFinalMessage
      : ["I am with you in every heartbeat."];

  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <FloatingHearts />

      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.96, 1.04, 0.98] }}
        className="absolute inset-x-8 top-8 h-32 rounded-full bg-fuchsia-300/[0.12] blur-3xl"
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.span
        className="relative z-10 mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        className="glow-text relative z-10 max-w-xl text-balance font-display text-5xl tracking-tight text-white sm:text-7xl"
        variants={fadeScale}
      >
        {title}
      </motion.h2>

      <motion.p
        className="relative z-10 mt-5 max-w-md text-pretty text-base leading-7 text-white/[0.72] sm:max-w-lg sm:text-lg"
        variants={fadeUp}
      >
        {subtitle}
      </motion.p>

      <motion.div
        className="relative z-10 mt-8 w-full rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 text-left sm:p-6"
        variants={fadeUp}
      >
        <motion.div
          className="space-y-3"
          initial="hidden"
          variants={staggerLines}
          viewport={sectionViewport}
          whileInView="visible"
        >
          {safeFinalLines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              className="font-display text-[1.7rem] leading-tight text-white/[0.9] sm:text-3xl"
              variants={fadeUp}
            >
              {index === 0 ? `${safeName}, ${line}` : line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
