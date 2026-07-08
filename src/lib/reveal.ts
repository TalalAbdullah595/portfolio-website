/* Scroll-reveal engine, ported from the handoff's hooks.jsx / projects.js.
   Elements are visible by default; once `.anim-on` lands on <html> they start
   hidden and animate in when observed — a throttled or failed observer can
   never leave content stuck invisible (2s fallback flips everything on). */

const OBSERVER_OPTS: IntersectionObserverInit = { threshold: 0.12, rootMargin: "0px 0px -7% 0px" };

export interface ObserveOptions {
  /* per-index delay in ms (projects archive uses 35, capped at 320);
     when 0, elements use their own data-delay attribute instead */
  stagger?: number;
}

/* Observe every not-yet-revealed .reveal element. Safe to call repeatedly —
   already-revealed elements are skipped. Returns a cleanup function. */
export function observeReveals({ stagger = 0 }: ObserveOptions = {}): () => void {
  if (!document.documentElement.classList.contains("anim-on")) return () => {};
  const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target as HTMLElement;
        if (!stagger && el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  }, OBSERVER_OPTS);
  els.forEach((e, i) => {
    if (stagger) e.style.transitionDelay = Math.min(i * stagger, 320) + "ms";
    io.observe(e);
  });
  const fallback = window.setTimeout(() => els.forEach((e) => e.classList.add("in")), 2000);
  return () => { io.disconnect(); clearTimeout(fallback); };
}

/* Arm the reveal system for the current page. Defers until the tab is visible —
   CSS transitions freeze at t=0 in background tabs, which would strand content
   hidden. Returns a cleanup function. */
export function startReveals(opts: ObserveOptions = {}): () => void {
  let cleanup: (() => void) | null = null;
  const start = () => {
    document.documentElement.classList.add("anim-on");
    cleanup = observeReveals(opts);
  };
  let onVis: (() => void) | null = null;
  if (document.visibilityState === "visible") {
    start();
  } else {
    onVis = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVis!);
        onVis = null;
        start();
      }
    };
    document.addEventListener("visibilitychange", onVis);
  }
  return () => {
    if (cleanup) cleanup();
    if (onVis) document.removeEventListener("visibilitychange", onVis);
  };
}
