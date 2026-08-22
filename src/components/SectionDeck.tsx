"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Tab = { id: string; label: string; content: ReactNode };

/**
 * Full-window horizontal deck. Panels are each one viewport wide and sit
 * side by side on a flex track that slides, so switching tabs moves the
 * whole screen rather than just a column. Only the top bar stays put.
 *
 * Before hydration (and with JS off) the deck renders `.is-static`, which
 * stacks every panel in normal flow — the whole CV stays readable.
 */
export default function SectionDeck({
  brand,
  toolbar,
  tabs,
}: {
  brand: string;
  toolbar?: ReactNode;
  tabs: Tab[];
}) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState<number>();
  const [ink, setInk] = useState({ x: 0, y: 0, w: 0 });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  // Open on the panel named by the URL hash, then switch on the slider.
  // Keep listening: the hash can also change without a document load, via
  // back/forward or a link elsewhere pointing at a panel.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const i = tabs.findIndex((t) => t.id === id);
      if (i >= 0) setActive(i);
    };
    fromHash();
    setReady(true);
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  // Publish the bar height so a panel can fill exactly the rest of the window.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--bar-h",
        `${bar.getBoundingClientRect().height}px`
      );
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  // Track the active panel's height so the viewport can animate to it.
  useLayoutEffect(() => {
    if (!ready) return;
    const el = slideRefs.current[active];
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active, ready]);

  // Park the ink bar under the active tab. Uses offsetTop as well as
  // offsetLeft so it stays correct when the tab row wraps to two lines.
  useLayoutEffect(() => {
    if (!ready) return;
    const place = () => {
      const btn = tabRefs.current[active];
      if (!btn) return;
      setInk({
        x: btn.offsetLeft,
        y: btn.offsetTop + btn.offsetHeight - 2,
        w: btn.offsetWidth,
      });
    };
    place();

    const ro = new ResizeObserver(place);
    if (tabsRef.current) ro.observe(tabsRef.current);
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [active, ready]);

  const go = useCallback(
    (i: number, focus = false) => {
      const n = tabs.length;
      const next = ((i % n) + n) % n;
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();

      history.replaceState(null, "", `#${tabs[next].id}`);

      // the incoming panel starts at its own top, so meet it there
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [tabs]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    go(next, true);
  };

  return (
    <>
      <header className="bar" ref={barRef}>
        <div className="bar-inner">
          <button
            type="button"
            className="bar-name"
            onClick={() => go(0)}
            aria-label={`${brand} — first panel`}
          >
            {brand}
          </button>

          <div
            className="tabs"
            role="tablist"
            aria-label="Sections"
            ref={tabsRef}
            onKeyDown={onKeyDown}
          >
            {tabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                className={"tab" + (i === active ? " is-active" : "")}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => go(i)}
              >
                {t.label}
              </button>
            ))}
            <span
              className={"tab-ink" + (ready ? " is-ready" : "")}
              style={{
                width: ink.w,
                transform: `translate(${ink.x}px, ${ink.y}px)`,
              }}
              aria-hidden
            />
          </div>

          {toolbar}
        </div>
      </header>

      <div
        className={"deck" + (ready ? "" : " is-static")}
        style={ready ? { height } : undefined}
      >
        <div
          className="deck-track"
          style={
            ready
              ? { transform: `translate3d(-${active * 100}%, 0, 0)` }
              : undefined
          }
        >
          {tabs.map((t, i) => (
            <div
              key={t.id}
              className={"slide" + (i === active ? " is-active" : "")}
              role="tabpanel"
              id={`panel-${t.id}`}
              aria-labelledby={`tab-${t.id}`}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              inert={ready && i !== active}
            >
              <div className="slide-inner">{t.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
