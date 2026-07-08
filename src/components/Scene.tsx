"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/* ============================================================
   CSS-3D scene — no WebGL. A single chunky Box primitive
   (6 absolutely-positioned faces in a preserve-3d container)
   composes the hero's floating island. Ported from scene.jsx.
   ============================================================ */

interface BoxProps {
  w: number; h: number; d: number;
  c?: string;
  x?: number; y?: number; z?: number;
  rx?: number; ry?: number; rz?: number;
  fr?: number;
  glyph?: ReactNode;
  glyphKind?: "txt" | "ic";
  glyphSize?: number;
}

/* One primitive for everything: a chunky box. A cube is w=h=d. */
export function Box({ w, h, d, c = "var(--surface-3)", x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, fr, glyph, glyphKind, glyphSize }: BoxProps) {
  const boxStyle = {
    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
  };
  const faceVars: Record<string, string> = { "--cc": c };
  if (fr != null) faceVars["--fr"] = fr + "px";

  const face = (cls: string, fw: number, fh: number, tf: string, content?: ReactNode) => (
    <div className={"face " + cls}
      style={{ width: fw, height: fh, marginLeft: -fw / 2, marginTop: -fh / 2, transform: tf, ...faceVars }}>
      {content}
    </div>
  );
  const glyphNode = glyph != null ? (
    <span className={"glyph3d " + (glyphKind || "")} style={{ fontSize: glyphSize || Math.round(Math.min(w, h) * 0.5) }}>{glyph}</span>
  ) : null;

  return (
    <div className="box" style={boxStyle}>
      {face("front", w, h, `translateZ(${d / 2}px)`, glyphNode)}
      {face("back", w, h, `rotateY(180deg) translateZ(${d / 2}px)`)}
      {face("right", d, h, `rotateY(90deg) translateZ(${w / 2}px)`)}
      {face("left", d, h, `rotateY(-90deg) translateZ(${w / 2}px)`)}
      {face("top", w, d, `rotateX(90deg) translateZ(${h / 2}px)`)}
      {face("bottom", w, d, `rotateX(-90deg) translateZ(${h / 2}px)`)}
    </div>
  );
}

/* Isometric floating island: 3 land layers, tree, crystal, hut, floating bits */
function IslandObject() {
  return (
    <div className="obj float">
      {/* land layers */}
      <Box w={210} h={48} d={210} c="#5ec46a" y={-12} fr={20} />
      <Box w={184} h={58} d={184} c="#a06a3f" y={42} fr={16} />
      <Box w={120} h={66} d={120} c="#7c4f30" y={98} fr={14} />
      {/* tree */}
      <Box w={26} h={64} d={26} c="#8a5a33" x={-52} y={-64} z={-34} fr={9} />
      <Box w={86} h={78} d={86} c="#3fae5a" x={-52} y={-122} z={-34} fr={26} />
      <Box w={46} h={44} d={46} c="#56cf6e" x={-30} y={-150} z={-10} fr={16} />
      {/* crystal */}
      <Box w={42} h={64} d={42} c="var(--secondary)" x={54} y={-70} z={28} rz={45} ry={20} fr={10} />
      {/* little hut */}
      <Box w={58} h={44} d={58} c="var(--primary)" x={36} y={-58} z={-40} fr={10} />
      <Box w={48} h={36} d={48} c="var(--accent)" x={36} y={-92} z={-40} ry={45} fr={8} />
      {/* floating bits */}
      <div className="subbob"><Box w={26} h={26} d={26} c="var(--accent)" x={150} y={-30} fr={7} /></div>
      <div className="subbob" style={{ animationDelay: "-1.6s" }}><Box w={20} h={20} d={20} c="var(--secondary)" x={-150} y={20} fr={6} /></div>
      <div className="subbob" style={{ animationDelay: "-3s" }}><Box w={16} h={16} d={16} c="var(--primary)" x={120} y={86} fr={5} /></div>
    </div>
  );
}

/* Perspective stage: pointer-move drives parallax tilt, pointer-drag spins */
export default function Scene() {
  const innerRef = useRef<HTMLDivElement>(null);
  const st = useRef({ rx: -8, ry: 16, dragging: false, lastX: 0, spin: 0 });

  const apply = () => {
    const s = st.current;
    if (innerRef.current) innerRef.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry + s.spin}deg)`;
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const s = st.current;
    s.ry = px * 36;
    s.rx = -8 - py * 22;
    if (s.dragging) { s.spin += (e.clientX - s.lastX) * 0.45; s.lastX = e.clientX; }
    apply();
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    st.current.dragging = true;
    st.current.lastX = e.clientX;
  };

  useEffect(() => {
    apply();
    const up = () => { st.current.dragging = false; };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  return (
    <div className="scene-3d" onPointerMove={onMove} onPointerDown={onDown}>
      <div className="obj-shadow"></div>
      <div className="scene-inner" ref={innerRef}>
        <IslandObject />
      </div>
      <div className="scene-hint sh-1"><span className="d"></span>Drag to spin</div>
      <div className="scene-hint sh-2"><span className="d"></span>Live CSS 3D</div>
    </div>
  );
}
