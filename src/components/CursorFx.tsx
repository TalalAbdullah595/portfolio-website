"use client";

import { useEffect, useRef } from "react";

/* Cursor glow that trails the pointer + spotlight position tracking for
   .card.spotlight hover gradients. Lives in the root layout so it covers
   every page. Hidden entirely on touch-only devices via CSS. */
export default function CursorFx() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0, lx = 0, ly = 0;
    const move = (e: PointerEvent) => {
      lx = e.clientX; ly = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        if (glowRef.current) glowRef.current.style.transform = `translate3d(${lx - 230}px, ${ly - 230}px, 0)`;
        document.querySelectorAll<HTMLElement>(".card.spotlight").forEach((c) => {
          const r = c.getBoundingClientRect();
          if (lx >= r.left && lx <= r.right && ly >= r.top && ly <= r.bottom) {
            c.style.setProperty("--mx", (lx - r.left) + "px");
            c.style.setProperty("--my", (ly - r.top) + "px");
          }
        });
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} />;
}
