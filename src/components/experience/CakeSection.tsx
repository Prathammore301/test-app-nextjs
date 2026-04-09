"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cakeText } from "@/data/content";
import { ConfettiBurst } from "./ConfettiBurst";
import { fadeScale, fadeUp, sectionViewport, sharedEase, staggerContainer } from "./motion";

export function CakeSection() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (!isCelebrating) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsCelebrating(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [isCelebrating]);

  function handleCakeCut() {
    setBurstKey((currentValue) => currentValue + 1);
    setIsCelebrating(true);
  }

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.span
        className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {cakeText.eyebrow}
      </motion.span>

      <motion.h2
        className="max-w-md font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {cakeText.heading}
      </motion.h2>

      <motion.div className="relative mt-10" variants={fadeScale}>
        <ConfettiBurst active={isCelebrating} burstKey={burstKey} />

        <AnimatePresence>
          {isCelebrating ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-6 rounded-full bg-fuchsia-300/20 blur-3xl"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, scale: 0.8 }}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={
            isCelebrating
              ? { scale: [1, 1.08, 1.02], y: [0, -10, 0] }
              : { y: [0, -6, 0] }
          }
          className="relative h-[19rem] w-[16rem]"
          transition={
            isCelebrating
              ? { duration: 1.15, ease: sharedEase }
              : { duration: 3.6, ease: "easeInOut", repeat: Infinity }
          }
        >
          <div className="absolute bottom-2 left-1/2 h-6 w-52 -translate-x-1/2 rounded-full bg-pink-200/[0.15] blur-xl" />
          <div className="absolute bottom-4 left-1/2 h-3 w-44 -translate-x-1/2 rounded-full bg-white/35" />

          <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="relative mb-2 h-14 w-36">
              <div className="absolute bottom-0 left-[28%] h-10 w-2 -translate-x-1/2 rounded-full bg-white/80" />
              <div className="absolute bottom-0 left-1/2 h-11 w-2 -translate-x-1/2 rounded-full bg-white/80" />
              <div className="absolute bottom-0 left-[72%] h-10 w-2 -translate-x-1/2 rounded-full bg-white/80" />

              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  animate={{
                    opacity: [0.8, 1, 0.75],
                    scale: [0.92, 1.08, 0.96],
                    y: [0, -3, 0],
                  }}
                  className="absolute h-4 w-3 rounded-full bg-[linear-gradient(180deg,#fff7b8_0%,#ff9f40_100%)]"
                  style={{
                    left: `${28 + index * 22}%`,
                    top: 0,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 1,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            <div className="relative h-14 w-40 rounded-[1.6rem] border border-white/[0.15] bg-[linear-gradient(180deg,#ffe1f4_0%,#f6a9d6_100%)]">
              <div className="absolute inset-x-3 top-2 h-3 rounded-full bg-white/55" />
              <div className="absolute left-5 top-4 h-7 w-3 rounded-b-full bg-white/70" />
              <div className="absolute left-1/2 top-4 h-8 w-4 -translate-x-1/2 rounded-b-full bg-white/70" />
              <div className="absolute right-6 top-4 h-6 w-3 rounded-b-full bg-white/70" />
            </div>

            <div className="relative -mt-2 h-16 w-48 rounded-[1.8rem] border border-white/[0.15] bg-[linear-gradient(180deg,#f6b2ea_0%,#de80d6_100%)]">
              <div className="absolute inset-x-4 top-2 h-4 rounded-full bg-white/52" />
              <div className="absolute left-6 top-4 h-8 w-4 rounded-b-full bg-white/68" />
              <div className="absolute left-1/2 top-4 h-9 w-4 -translate-x-1/2 rounded-b-full bg-white/68" />
              <div className="absolute right-7 top-4 h-7 w-3 rounded-b-full bg-white/68" />
            </div>

            <div className="relative -mt-2 h-[4.5rem] w-56 rounded-[2rem] border border-white/[0.15] bg-[linear-gradient(180deg,#d86fd0_0%,#9450d2_100%)]">
              <div className="absolute inset-x-5 top-3 h-4 rounded-full bg-white/45" />
              <div className="absolute left-9 top-5 h-9 w-4 rounded-b-full bg-white/58" />
              <div className="absolute left-1/2 top-5 h-10 w-5 -translate-x-1/2 rounded-b-full bg-white/58" />
              <div className="absolute right-9 top-5 h-8 w-4 rounded-b-full bg-white/58" />
            </div>
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
        {cakeText.buttonLabel}
      </motion.button>

      <AnimatePresence>
        {isCelebrating ? (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-pink-100/75"
            exit={{ opacity: 0, y: 10 }}
            initial={{ opacity: 0, y: 12 }}
          >
            {cakeText.celebrationNote}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
