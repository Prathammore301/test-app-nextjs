"use client";

import { motion } from "framer-motion";
import { finalMessage } from "@/data/content";
import { fadeScale, fadeUp, sectionViewport, staggerContainer } from "./motion";

export function FinalSection() {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.96, 1.04, 0.98] }}
        className="absolute inset-x-8 top-8 h-32 rounded-full bg-fuchsia-300/[0.12] blur-3xl"
        transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.span
        className="relative mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {finalMessage.eyebrow}
      </motion.span>

      <motion.h2
        className="relative max-w-lg font-display text-5xl tracking-tight text-white sm:text-7xl"
        variants={fadeScale}
      >
        {finalMessage.title}
      </motion.h2>

      <motion.p
        className="relative mt-5 max-w-sm text-base leading-7 text-white/[0.72] sm:text-lg"
        variants={fadeUp}
      >
        {finalMessage.subtitle}
      </motion.p>
    </motion.div>
  );
}
