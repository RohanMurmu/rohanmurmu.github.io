"use client";

import { useEffect } from "react";

/**
 * Cursor-tracked spotlight behind the hero. Decoration only — skipped on
 * touch pointers and whenever the OS asks for reduced motion.
 */
export default function Interactions() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    const onEnter = () => hero.classList.add("is-hot");
    const onLeave = () => {
      hero.classList.remove("is-hot");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerenter", onEnter);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerenter", onEnter);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
