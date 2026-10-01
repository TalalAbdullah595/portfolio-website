"use client";

import { useEffect, useRef } from "react";

/* YouTube's iframe accepts player commands over postMessage when the embed
   carries ?enablejsapi=1 — no player API script needed. */
const cmd = (frame: HTMLIFrameElement | null, func: string) =>
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");

export default function VideoEmbed({ id, title }: { id: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      cmd(frameRef.current, e.isIntersecting ? "playVideo" : "pauseVideo");
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="proj-video reveal" ref={wrapRef}>
      <iframe
        ref={frameRef}
        /* mute=1 is what makes autoplay legal at all; playsinline keeps iOS
           from hijacking into fullscreen. Muting via the URL rather than a
           command means a viewer who unmutes stays unmuted on replay. */
        src={`https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&mute=1&playsinline=1`}
        title={title}
        loading="lazy"
        /* a lazy iframe can finish loading after the observer already fired,
           which would drop that play command on the floor */
        onLoad={() => { if (inView.current) cmd(frameRef.current, "playVideo"); }}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
