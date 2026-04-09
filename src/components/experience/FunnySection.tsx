"use client";

import { motion } from "framer-motion";
import { funnySectionText } from "@/data/content";
import type { PublicGalleryItem } from "@/lib/public-media";
import { fadeUp, sectionViewport, staggerContainer } from "./motion";
import { PhotoGrid } from "./PhotoGrid";

type FunnySectionProps = {
  funnyImages: PublicGalleryItem[];
};

export function FunnySection({ funnyImages }: FunnySectionProps) {
  return (
    <motion.div
      className="flex w-full max-w-full flex-col items-center overflow-hidden px-4 text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.span
        className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {funnySectionText.eyebrow}
      </motion.span>

      <motion.h2
        className="glow-text max-w-xl text-balance font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {funnySectionText.title}
      </motion.h2>

      <motion.p
        className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/[0.72] sm:text-base"
        variants={fadeUp}
      >
        {funnySectionText.subtitle}
      </motion.p>

      <motion.div
        className="mt-8 w-full max-w-full overflow-hidden [&>div]:grid [&>div]:w-full [&>div]:max-w-full [&>div]:overflow-hidden [&>div]:grid-cols-1 [&>div]:gap-4 [&>div]:sm:grid-cols-2 [&>div]:lg:grid-cols-3 [&>div>*]:h-full [&>div>*]:w-full [&>div>*]:overflow-hidden [&>div>article>div:first-child]:aspect-[3/4] [&_img]:h-auto [&_img]:w-full [&_img]:rounded-xl [&_img]:object-cover"
        variants={fadeUp}
      >
        <PhotoGrid items={funnyImages} />
      </motion.div>
    </motion.div>
  );
}
