"use client";

import { useEffect, useRef, useState } from "react";

/* Count-up number that fires once when scrolled into view */
export default function CountUp({ end, suf = "", dur = 1500, dp }: {
  end: number;
  suf?: string;
  dur?: number;
  dp?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let snap = 0;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(end * eased);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          /* rAF stops firing in background tabs, which would strand a
             half-counted number on screen. Guarantee the real value lands. */
          snap = window.setTimeout(() => setVal(end), dur + 300);
        }
      });
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(snap); };
  }, [end, dur]);

  const decimals = dp != null ? dp : (Number.isInteger(end) ? 0 : (String(end).split(".")[1] || "").length);
  return <span ref={ref}>{val.toFixed(decimals)}<span className="suf">{suf}</span></span>;
}
