"use client";

import { motion } from "framer-motion";
import { introText } from "@/data/content";
import { fadeUp, staggerContainer } from "./motion";

export function IntroSection() {
  function handleTap() {
    document.getElementById("message")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <motion.div
      animate="visible"
      className="flex flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
    >
      <motion.span
        className="mb-4 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-[0.65rem] uppercase tracking-[0.35em] text-pink-100/70"
        variants={fadeUp}
      >
        {introText.eyebrow}
      </motion.span>

      <motion.h1
        className="font-display text-5xl tracking-tight text-white sm:text-7xl"
        variants={fadeUp}
      >
        {introText.title}
      </motion.h1>

      <motion.p
        className="mt-5 max-w-sm text-base leading-7 text-white/70 sm:text-lg"
        variants={fadeUp}
      >
        {introText.subtitle}
      </motion.p>

      <motion.button
        className="mt-8 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(214,99,255,0.28)]"
        onClick={handleTap}
        type="button"
        variants={fadeUp}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {introText.buttonLabel}
      </motion.button>
    </motion.div>
  );
}
