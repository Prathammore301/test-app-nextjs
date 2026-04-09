"use client";

import { motion } from "framer-motion";
import { birthdaySectionText } from "@/data/content";
import type { PublicGalleryItem } from "@/lib/public-media";
import { fadeUp, sectionViewport, staggerContainer } from "./motion";
import { PhotoGrid } from "./PhotoGrid";

type BirthdaySectionProps = {
  birthdayImages: PublicGalleryItem[];
};

export function BirthdaySection({ birthdayImages }: BirthdaySectionProps) {
  const galleryItems = birthdayImages.slice(0, 4);

  return (
    <motion.div
      className="flex w-full flex-col items-center text-center"
      initial="hidden"
      variants={staggerContainer}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <motion.span
        className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-pink-100/60"
        variants={fadeUp}
      >
        {birthdaySectionText.eyebrow}
      </motion.span>

      <motion.h2
        className="glow-text max-w-xl text-balance font-display text-4xl tracking-tight text-white sm:text-5xl"
        variants={fadeUp}
      >
        {birthdaySectionText.title}
      </motion.h2>

      <motion.p
        className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/[0.72] sm:text-base"
        variants={fadeUp}
      >
        {birthdaySectionText.subtitle}
      </motion.p>

      <motion.div
        className="mt-6 w-full [&>div]:grid-cols-1 [&>div]:gap-4 [&>div]:sm:grid-cols-2 [&>div]:lg:grid-cols-3"
        variants={fadeUp}
      >
        <PhotoGrid items={galleryItems} />
      </motion.div>
    </motion.div>
  );
}
