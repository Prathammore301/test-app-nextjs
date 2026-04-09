"use client";

import { useEffect, useRef } from "react";
import { useIsClient } from "./use-is-client";

type Particle = {
  alpha: number;
  color: string;
  life: number;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type CakeFireworksProps = {
  active: boolean;
};

const colors = ["#ff98d8", "#ffd166", "#b98bff", "#8fe7ff", "#fff2fb"];

export function CakeFireworks({ active }: CakeFireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || !active || typeof window === "undefined") {
      return undefined;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const canvasElement = canvas;
    const context = canvasElement.getContext("2d");

    if (!context) {
      return undefined;
    }

    const drawingContext = context;
    const particles: Particle[] = [];
    const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrame = 0;
    let lastBurstAt = 0;
    let burstCount = 0;

    function resizeCanvas() {
      const bounds = canvasElement.getBoundingClientRect();
      canvasElement.width = bounds.width * deviceScale;
      canvasElement.height = bounds.height * deviceScale;
      drawingContext.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    }

    function spawnBurst() {
      const width = canvasElement.clientWidth;
      const height = canvasElement.clientHeight;
      const originX = width * (0.2 + Math.random() * 0.6);
      const originY = height * (0.2 + Math.random() * 0.25);

      burstCount += 1;

      for (let index = 0; index < 26; index += 1) {
        const angle = (Math.PI * 2 * index) / 26;
        const speed = 1.6 + Math.random() * 1.8;

        particles.push({
          alpha: 1,
          color: colors[(index + burstCount) % colors.length],
          life: 44 + Math.random() * 18,
          size: 2 + Math.random() * 2.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          x: originX,
          y: originY,
        });
      }
    }

    function drawFrame(timestamp: number) {
      if (timestamp - lastBurstAt > 320 && burstCount < 5) {
        spawnBurst();
        lastBurstAt = timestamp;
      }

      drawingContext.clearRect(
        0,
        0,
        canvasElement.clientWidth,
        canvasElement.clientHeight,
      );

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];

        particle.life -= 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.03;
        particle.alpha = Math.max(particle.life / 56, 0);

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        drawingContext.beginPath();
        drawingContext.fillStyle = `${particle.color}${Math.round(
          particle.alpha * 255,
        )
          .toString(16)
          .padStart(2, "0")}`;
        drawingContext.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2,
        );
        drawingContext.fill();
      }

      if (particles.length > 0 || burstCount < 5) {
        animationFrame = window.requestAnimationFrame(drawFrame);
      }
    }

    resizeCanvas();
    spawnBurst();
    animationFrame = window.requestAnimationFrame(drawFrame);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      drawingContext.clearRect(
        0,
        0,
        canvasElement.clientWidth,
        canvasElement.clientHeight,
      );
    };
  }, [active, isClient]);

  if (typeof window === "undefined" || !isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
