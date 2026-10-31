"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Wrapper that makes its child drift toward the cursor (magnetic effect). */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Pill button whose label slides up and is replaced on hover. */
export function SlideButton({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "sky";
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  const base =
    "btn-slide inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-blue hover:text-white"
      : variant === "sky"
        ? "bg-sky text-on-accent hover:bg-sky-2"
        : "border border-line-strong text-fg hover:border-blue";
  const cls = `${base} ${styles} ${className}`;
  const inner = (
    <>
      <span className="lbl lbl-1">{children}</span>
      <span className="lbl lbl-2" aria-hidden>
        {children}
      </span>
    </>
  );
  if (href) {
    return (
      <Magnetic>
        <a href={href} className={cls}>
          {inner}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type={type ?? "button"} onClick={onClick} className={cls}>
        {inner}
      </button>
    </Magnetic>
  );
}
