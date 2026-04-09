import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  panelClassName?: string;
};

export function SectionWrapper({
  children,
  id,
  className,
  panelClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative flex min-h-svh scroll-mt-16 items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8 ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-12 h-40 w-40 rounded-full bg-pink-400/[0.18] blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute bottom-10 right-[-8%] h-48 w-48 rounded-full bg-violet-500/[0.18] blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      </div>

      <div
        className={`soft-glow relative z-10 mx-auto w-full max-w-2xl rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10 ${panelClassName ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
