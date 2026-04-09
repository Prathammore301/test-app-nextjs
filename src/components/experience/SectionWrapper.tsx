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
      className={`relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-12 sm:px-8 ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-12 h-40 w-40 rounded-full bg-pink-400/[0.18] blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute bottom-10 right-[-8%] h-48 w-48 rounded-full bg-violet-500/[0.18] blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
      </div>

      <div
        className={`soft-glow relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-10 ${panelClassName ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
