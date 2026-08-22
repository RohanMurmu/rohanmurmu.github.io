"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement only. Every effect here is decoration:
 * with JS disabled the page still renders, scrolls and navigates,
 * and everything is skipped when the OS asks for reduced motion.
 */
export default function Interactions() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover)").matches;
    const cleanups: (() => void)[] = [];

    // ---- 1. cursor light, across the whole page ----------------------
    // The layer is fixed to the viewport, so clientX/clientY are exactly the
    // coordinates it wants. Rather than writing the pointer position straight
    // through, ease toward it each frame: the light trails a little instead of
    // snapping, which is what makes it read as a light rather than a cursor.
    const glow = document.querySelector<HTMLElement>(".cursor-glow");
    if (glow && finePointer && !motionQuery.matches) {
      let tx = 0, ty = 0;      // where the pointer is
      let cx = 0, cy = 0;      // where the light is
      let frame = 0;
      let placed = false;

      const step = () => {
        // exponential ease; ~0.12 keeps the lag perceptible but never sluggish
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;

        // Exponential easing only approaches the target, so snap the last
        // sub-pixel and stop. Otherwise the loop keeps running long after the
        // movement stops being visible — and on a throttled frame clock that
        // tail can last seconds.
        const settled = Math.hypot(tx - cx, ty - cy) < 0.6;
        if (settled) {
          cx = tx;
          cy = ty;
        }
        glow.style.setProperty("--gx", `${cx.toFixed(1)}px`);
        glow.style.setProperty("--gy", `${cy.toFixed(1)}px`);
        frame = settled ? 0 : requestAnimationFrame(step);
      };

      const onMove = (e: PointerEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!placed) {
          // first sighting: drop the light straight onto the pointer, then
          // fade it in, so it does not streak across from the corner
          placed = true;
          cx = tx;
          cy = ty;
          glow.style.setProperty("--gx", `${cx}px`);
          glow.style.setProperty("--gy", `${cy}px`);
          glow.classList.add("is-live");
        }
        if (!frame) frame = requestAnimationFrame(step);
      };

      const onLeave = (e: PointerEvent) => {
        // relatedTarget is null only when the pointer actually left the window
        if (e.relatedTarget === null) glow.classList.remove("is-live");
      };
      const onEnter = () => {
        if (placed) glow.classList.add("is-live");
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave);
      document.addEventListener("pointerover", onEnter);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerout", onLeave);
        document.removeEventListener("pointerover", onEnter);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    // ---- 2. nav highlight for the section under the viewport middle ----
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const navLinks = new Map<string, HTMLAnchorElement>();
    document
      .querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]')
      .forEach((a) => navLinks.set(a.getAttribute("href")!.slice(1), a));

    if (sections.length && navLinks.size) {
      const spy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const link = navLinks.get(entry.target.id);
            if (!link) continue;
            if (entry.isIntersecting) {
              navLinks.forEach((el) => el.classList.remove("is-active"));
              link.classList.add("is-active");
            }
          }
        },
        // only the section crossing the middle band counts as current
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }

    // ---- 3. scroll progress hairline under the nav ---------------------
    const bar = document.querySelector<HTMLElement>(".nav-progress");
    if (bar) {
      let frame = 0;
      const update = () => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
        bar.style.setProperty("--progress", String(p));
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    // ---- 4. reveal sections as they scroll in --------------------------
    if (!motionQuery.matches && sections.length) {
      // Class is added here, not in the markup, so a JS-less page shows
      // every section at full opacity.
      sections.forEach((s) => s.classList.add("js-reveal"));
      const reveal = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            // Reveal this section *and every section above it*. If you can see
            // section N you have already passed 1..N-1, whether you scrolled
            // there or jumped via a deep link / restored scroll position.
            // Without this, a jump strands the skipped sections at opacity 0.
            const idx = sections.indexOf(entry.target as HTMLElement);
            for (let i = 0; i <= idx; i++) {
              sections[i].classList.add("in-view");
              obs.unobserve(sections[i]);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
      sections.forEach((s) => reveal.observe(s));
      cleanups.push(() => {
        reveal.disconnect();
        sections.forEach((s) => s.classList.remove("js-reveal", "in-view"));
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
