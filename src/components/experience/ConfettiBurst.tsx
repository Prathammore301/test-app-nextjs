"use client";

import { AnimatePresence, motion } from "framer-motion";
import { sharedEase } from "./motion";

type ConfettiBurstProps = {
  active: boolean;
  burstKey: number;
};

const colors = ["#ff8fd6", "#ffd166", "#b88cff", "#8fe7ff", "#ffe7f8"];

const pieces = Array.from({ length: 26 }, (_, index) => {
  const angle = (index / 26) * Math.PI * 2;
  const distance = 92 + (index % 4) * 18;

  return {
    color: colors[index % colors.length],
    delay: (index % 6) * 0.03,
    height: 6 + (index % 3),
    rotate: 110 + index * 16,
    width: 10 + (index % 4) * 3,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 118,
  };
});

export function ConfettiBurst({ active, burstKey }: ConfettiBurstProps) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key={burstKey}
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
        >
          {pieces.map((piece, index) => (
            <motion.span
              key={`${burstKey}-${index}`}
              animate={{
                opacity: [0, 1, 1, 0],
                rotate: [0, piece.rotate, piece.rotate + 110],
                scale: [0.3, 1, 1, 0.45],
                x: [0, piece.x * 0.72, piece.x],
                y: [0, piece.y, piece.y + 90],
              }}
              className="absolute"
              initial={{ opacity: 0, rotate: 0, scale: 0.3, x: 0, y: 0 }}
              style={{
                backgroundColor: piece.color,
                borderRadius: 999,
                height: piece.height,
                width: piece.width,
              }}
              transition={{
                delay: piece.delay,
                duration: 1.7,
                ease: sharedEase,
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
