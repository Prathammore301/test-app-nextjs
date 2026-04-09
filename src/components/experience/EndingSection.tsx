"use client";

import { motion } from "framer-motion";
import { fadeScale, fadeUp, sectionViewport, staggerContainer } from "./motion";

export function EndingSection() {
  return (
    <motion.div
      className="relative flex w-full flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.div
        animate={{ opacity: [0.18, 0.35, 0.18], scale: [0.97, 1.03, 0.99] }}
        className="absolute inset-x-[12%] top-6 h-28 rounded-full bg-pink-300/[0.12] blur-3xl"
        transition={{ duration: 4.6, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.span
        className="relative z-10 mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        one last little note
      </motion.span>

      <motion.div
        className="relative z-10 w-full rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 text-left sm:p-6"
        variants={fadeScale}
      >
        <motion.p
          className="font-display text-[1.7rem] leading-tight text-white/[0.92] sm:text-3xl"
          variants={fadeUp}
        >
          And just like that...
        </motion.p>
        <motion.p
          className="mt-2 font-display text-[1.7rem] leading-tight text-white/[0.92] sm:text-3xl"
          variants={fadeUp}
        >
          {"another beautiful chapter begins \uD83D\uDCAB"}
        </motion.p>
        <motion.p
          className="mt-5 text-base leading-8 text-white/[0.76] sm:text-lg"
          variants={fadeUp}
        >
          With you, every moment feels special, and every day feels worth
          celebrating.
        </motion.p>
        <motion.p
          className="mt-4 text-base leading-8 text-white/[0.76] sm:text-lg"
          variants={fadeUp}
        >
          {"Stay the same, stay mine, and keep smiling like you always do \u2764\uFE0F"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
