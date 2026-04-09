import { access, readdir } from "node:fs/promises";
import path from "node:path";
import {
  birthdayCaptions,
  birthdayTitles,
  funnyCaptions,
  funnyTitles,
  memoryCaptions,
  memoryTitles,
} from "@/data/content";

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

const VIDEO_EXTENSIONS = new Set([
  ".m4v",
  ".mov",
  ".mp4",
  ".webm",
]);

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export type PublicGalleryItem = {
  alt: string;
  caption: string;
  src: string;
  title: string;
};

type BuildGalleryOptions = {
  altPrefix: string;
  captionPool: string[];
  folder: string;
  titlePool: string[];
};

function extractNumbers(value: string) {
  return (value.match(/\d+/g) ?? []).map((part) => Number(part));
}

function compareMediaNames(left: string, right: string) {
  const leftExtension = path.extname(left).toLowerCase();
  const rightExtension = path.extname(right).toLowerCase();
  const leftIsSvg = leftExtension === ".svg";
  const rightIsSvg = rightExtension === ".svg";

  if (leftIsSvg !== rightIsSvg) {
    return leftIsSvg ? 1 : -1;
  }

  const leftNumbers = extractNumbers(left);
  const rightNumbers = extractNumbers(right);
  const maxLength = Math.max(leftNumbers.length, rightNumbers.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftNumber = leftNumbers[index];
    const rightNumber = rightNumbers[index];

    if (leftNumber === undefined || rightNumber === undefined) {
      break;
    }

    if (leftNumber !== rightNumber) {
      return leftNumber - rightNumber;
    }
  }

  return collator.compare(left, right);
}

async function publicPathExists(relativePath: string) {
  try {
    await access(path.join(process.cwd(), "public", relativePath));
    return true;
  } catch {
    return false;
  }
}

async function buildGallery({
  altPrefix,
  captionPool,
  folder,
  titlePool,
}: BuildGalleryOptions): Promise<PublicGalleryItem[]> {
  const folderPath = path.join(process.cwd(), "public", folder);

  try {
    const entries = await readdir(folderPath, { withFileTypes: true });
    const files = entries
      .filter((entry) => {
        if (!entry.isFile()) {
          return false;
        }

        return IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase());
      })
      .map((entry) => entry.name);
    const preferredFiles = files.some(
      (fileName) => path.extname(fileName).toLowerCase() !== ".svg",
    )
      ? files.filter((fileName) => path.extname(fileName).toLowerCase() !== ".svg")
      : files;
    const sortedFiles = preferredFiles.sort(compareMediaNames);

    return sortedFiles.map((fileName, index) => ({
      alt: `${altPrefix} ${index + 1}`,
      caption:
        captionPool[index % captionPool.length] ??
        "A little moment worth keeping forever.",
      src: `/${folder}/${fileName}`,
      title: titlePool[index % titlePool.length] ?? `${altPrefix} ${index + 1}`,
    }));
  } catch {
    return [];
  }
}

async function findPublicVideo(relativeFolder: string) {
  if (await publicPathExists("birthday.mp4")) {
    return "/birthday.mp4";
  }

  const folderPath = path.join(process.cwd(), "public", relativeFolder);

  try {
    const entries = await readdir(folderPath, { withFileTypes: true });
    const files = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          VIDEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => entry.name)
      .sort(compareMediaNames);

    return files[0] ? `/${relativeFolder}/${files[0]}` : null;
  } catch {
    return null;
  }
}

export async function getExperienceMedia() {
  const [birthdayImages, funnyImages, memoryImages, birthdayVideoSrc, hasBirthdayCover] =
    await Promise.all([
      buildGallery({
        altPrefix: "Birthday moment",
        captionPool: birthdayCaptions,
        folder: "birthday",
        titlePool: birthdayTitles,
      }),
      buildGallery({
        altPrefix: "Funny moment",
        captionPool: funnyCaptions,
        folder: "funny",
        titlePool: funnyTitles,
      }),
      buildGallery({
        altPrefix: "Memory",
        captionPool: memoryCaptions,
        folder: "memories",
        titlePool: memoryTitles,
      }),
      findPublicVideo("birthday"),
      publicPathExists("birthday/birthday-cover.svg"),
    ]);

  return {
    birthdayImages,
    birthdayPosterSrc:
      birthdayImages[0]?.src ??
      (hasBirthdayCover ? "/birthday/birthday-cover.svg" : "/next.svg"),
    birthdayVideoSrc,
    funnyImages,
    memoryImages,
  };
}
