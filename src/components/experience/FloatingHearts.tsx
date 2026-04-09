"use client";

import { motion, useReducedMotion } from "framer-motion";

const floatingHearts = [
  { delay: 0, duration: 8.4, left: "8%", size: "1rem", top: "14%" },
  { delay: 0.9, duration: 9, left: "22%", size: "0.8rem", top: "72%" },
  { delay: 1.4, duration: 7.8, left: "38%", size: "1.15rem", top: "28%" },
  { delay: 0.6, duration: 8.8, left: "58%", size: "0.9rem", top: "10%" },
  { delay: 1.1, duration: 9.4, left: "74%", size: "1rem", top: "66%" },
  { delay: 1.7, duration: 8.2, left: "88%", size: "0.75rem", top: "32%" },
];

export function FloatingHearts() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {floatingHearts.map((heart) => (
        <motion.span
          key={`${heart.left}-${heart.top}`}
          className="absolute text-pink-200/25"
          style={{
            fontSize: heart.size,
            left: heart.left,
            top: heart.top,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: [0.16, 0.4, 0.18],
                  scale: [1, 1.08, 0.96, 1],
                  x: [0, 8, -4, 0],
                  y: [0, -18, -8, 0],
                }
          }
          transition={{
            delay: heart.delay,
            duration: heart.duration,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {"\u2665"}
        </motion.span>
      ))}
    </div>
  );
}
