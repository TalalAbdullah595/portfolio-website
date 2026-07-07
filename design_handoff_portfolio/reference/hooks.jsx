/* hooks.jsx — reveal, count-up, magnetic, cursor fx (wrapped to avoid global clashes) */
(function () {
  const { useRef, useEffect, useState } = React;

  /* Scroll reveal — elements are visible by default; .reveal sets the hidden start
     state and we add .in when seen. Hard fallback flips everything on after 2s. */
  function useRevealAll() {
    useEffect(() => {
      let io = null;
      let fallback = 0;
      const start = () => {
        document.documentElement.classList.add("anim-on");
        const els = [...document.querySelectorAll(".reveal:not(.in)")];
        if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
        io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target;
              if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
              el.classList.add("in");
              io.unobserve(el);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
        els.forEach((e) => io.observe(e));
        fallback = setTimeout(() => els.forEach((e) => e.classList.add("in")), 2000);
      };
      let onVis = null;
      if (document.visibilityState === "visible") {
        start();
      } else {
        // Loaded in a background/throttled tab: keep content statically visible
        // (CSS transitions freeze at t=0 when the tab isn't painting). Animate once shown.
        onVis = () => {
          if (document.visibilityState === "visible") {
            document.removeEventListener("visibilitychange", onVis);
            start();
          }
        };
        document.addEventListener("visibilitychange", onVis);
      }
      return () => { if (io) io.disconnect(); if (fallback) clearTimeout(fallback); if (onVis) document.removeEventListener("visibilitychange", onVis); };
    }, []);
  }

  /* Count-up number that fires when scrolled into view */
  function CountUp({ end, suf = "", dur = 1500, dp }) {
    const ref = useRef(null);
    const [val, setVal] = useState(0);
    const fired = useRef(false);
    useEffect(() => {
      const el = ref.current; if (!el) return;
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            const start = performance.now();
            const step = (now) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(end * eased);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      }, { threshold: 0.45 });
      io.observe(el);
      return () => io.disconnect();
    }, [end, dur]);
    const decimals = dp != null ? dp : (Number.isInteger(end) ? 0 : (String(end).split(".")[1] || "").length);
    return <span ref={ref}>{val.toFixed(decimals)}<span className="suf">{suf}</span></span>;
  }

  /* Magnetic wrapper — inner element drifts toward cursor (used for big CTAs, NOT the nav button) */
  function Magnetic({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);
    const onMove = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
    };
    const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
    return (
      <span className={"magnetic " + className} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </span>
    );
  }

  /* Cursor glow + card spotlight */
  function useCursorFx() {
    useEffect(() => {
      const glow = document.querySelector(".cursor-glow");
      let raf = 0, lx = 0, ly = 0;
      const move = (e) => {
        lx = e.clientX; ly = e.clientY;
        if (!raf) raf = requestAnimationFrame(() => {
          raf = 0;
          if (glow) glow.style.transform = `translate3d(${lx - 230}px, ${ly - 230}px, 0)`;
          document.querySelectorAll(".card.spotlight").forEach((c) => {
            const r = c.getBoundingClientRect();
            if (lx >= r.left && lx <= r.right && ly >= r.top && ly <= r.bottom) {
              c.style.setProperty("--mx", (lx - r.left) + "px");
              c.style.setProperty("--my", (ly - r.top) + "px");
            }
          });
        });
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }, []);
  }

  Object.assign(window, { useRevealAll, CountUp, Magnetic, useCursorFx });
})();
