"use client";

import { motion } from "framer-motion";
import { messageLines, messageText } from "@/data/content";
import { FloatingHearts } from "./FloatingHearts";
import { fadeUp, sectionViewport, staggerLines } from "./motion";

export function MessageSection() {
  return (
    <div className="relative flex flex-col items-center text-center">
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
          {messageText.eyebrow}
        </motion.span>

        <motion.h2
          className="max-w-md font-display text-4xl tracking-tight text-white sm:text-5xl"
          variants={fadeUp}
        >
          {messageText.heading}
        </motion.h2>

        <div className="mt-8 w-full space-y-4">
          {messageLines.map((line) => (
            <motion.p
              key={line}
              className="rounded-2xl border border-white/[0.08] bg-white/5 px-5 py-4 text-lg leading-8 text-white/[0.85] sm:text-xl"
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
