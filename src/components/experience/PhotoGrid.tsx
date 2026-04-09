"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { PublicGalleryItem } from "@/lib/public-media";
import { fadeScale } from "./motion";

type PhotoGridProps = {
  items: PublicGalleryItem[];
  compact?: boolean;
};

function getGridClassName(itemCount: number) {
  if (itemCount <= 1) {
    return "grid-cols-1";
  }

  return "grid-cols-1 md:grid-cols-2";
}

export function PhotoGrid({ items, compact = false }: PhotoGridProps) {
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});
  const safeItems =
    items.length > 0
      ? items
      : [
          {
            alt: "Memory placeholder",
            caption: "Add your favorite photos here whenever you are ready.",
            src: "/next.svg",
            title: "Coming soon",
          },
        ];

  const gapClassName = compact ? "gap-3" : "gap-4";
  const cardAspectClassName = compact ? "aspect-[5/6]" : "aspect-[4/5]";

  return (
    <div
      className={`grid w-full max-w-full overflow-hidden ${getGridClassName(
        safeItems.length,
      )} ${gapClassName}`}
    >
      {safeItems.map((item, index) => (
        <motion.article
          key={`${item.src}-${index}`}
          className="group w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] shadow-[0_14px_40px_rgba(10,7,19,0.18)]"
          initial="hidden"
          variants={fadeScale}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -4 }}
        >
          <div className={`relative ${cardAspectClassName}`}>
            <Image
              alt={item.alt}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes={
                compact
                  ? "(max-width: 640px) 44vw, 180px"
                  : "(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 240px"
              }
              src={imageFallbacks[item.src] ?? item.src}
              onError={() =>
                setImageFallbacks((currentValue) => ({
                  ...currentValue,
                  [item.src]: "/next.svg",
                }))
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0713]/95 via-transparent to-transparent" />
          </div>

          <div className="min-w-0 space-y-1 p-4 sm:p-5">
            <h3 className="text-balance font-display text-xl text-white sm:text-2xl">
              {item.title}
            </h3>
            <p className="break-words text-pretty text-sm leading-6 text-white/[0.7]">
              {item.caption}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
