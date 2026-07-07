/* scene.jsx — CSS-3D Box primitive, 3 hero objects, parallax Scene */
const { useRef: _useRef, useEffect: _useEffect } = React;

/* One primitive for everything: a chunky box. A cube is w=h=d. */
function Box({ w, h, d, c = "var(--surface-3)", x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, fr, glyph, glyphKind, glyphSize }) {
  const boxStyle = {
    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`
  };
  const faceVars = { "--cc": c };
  if (fr != null) faceVars["--fr"] = fr + "px";

  const Face = (cls, fw, fh, tf, content) => (
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
      {Face("front",  w, h, `translateZ(${d / 2}px)`, glyphNode)}
      {Face("back",   w, h, `rotateY(180deg) translateZ(${d / 2}px)`)}
      {Face("right",  d, h, `rotateY(90deg) translateZ(${w / 2}px)`)}
      {Face("left",   d, h, `rotateY(-90deg) translateZ(${w / 2}px)`)}
      {Face("top",    w, d, `rotateX(90deg) translateZ(${h / 2}px)`)}
      {Face("bottom", w, d, `rotateX(-90deg) translateZ(${h / 2}px)`)}
    </div>
  );
}

/* ---------- OBJECT 1: floating game blocks ---------- */
function BlocksObject() {
  return (
    <div className="obj spin">
      <Box w={154} h={154} d={154} c="var(--secondary)" fr={24} glyph="KV" glyphKind="txt" glyphSize={68} />
      <div className="orbit">
        <Box w={66} h={66} d={66} c="var(--accent)" x={200} y={-26} fr={14}
          glyph={<Icon name="star" size={30} />} glyphKind="ic" />
      </div>
      <div className="orbit o2">
        <Box w={52} h={52} d={52} c="var(--primary)" x={-205} y={34} rx={18} ry={22} fr={12}
          glyph={<Icon name="bolt" size={24} />} glyphKind="ic" />
      </div>
      <div className="orbit o3">
        <Box w={44} h={78} d={44} c="var(--surface-3)" x={168} y={128} fr={11} />
      </div>
      <div className="subbob">
        <Box w={38} h={38} d={38} c="var(--primary)" x={-160} y={-126} rx={20} rz={14} fr={9} />
      </div>
      <div className="subbob" style={{ animationDelay: "-2.4s" }}>
        <Box w={30} h={30} d={30} c="var(--accent)" x={150} y={-150} fr={8} />
      </div>
    </div>
  );
}

/* ---------- OBJECT 2: isometric floating island ---------- */
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

/* ---------- OBJECT 3: chunky blocky mascot ---------- */
function MascotObject() {
  return (
    <div className="obj float">
      {/* legs */}
      <Box w={46} h={66} d={50} c="var(--surface-3)" x={-36} y={150} fr={14} />
      <Box w={46} h={66} d={50} c="var(--surface-3)" x={36} y={150} fr={14} />
      <Box w={56} h={26} d={64} c="var(--ink)" x={-36} y={190} fr={10} />
      <Box w={56} h={26} d={64} c="var(--ink)" x={36} y={190} fr={10} />
      {/* body */}
      <Box w={140} h={128} d={104} c="var(--primary)" y={70} fr={26} />
      <Box w={58} h={58} d={12} c="var(--accent)" y={64} z={56} fr={14} glyph={<Icon name="bolt" size={30} />} glyphKind="ic" />
      {/* arms */}
      <Box w={34} h={96} d={40} c="var(--secondary)" x={-100} y={58} rz={10} fr={13} />
      <Box w={34} h={96} d={40} c="var(--secondary)" x={100} y={58} rz={-10} fr={13} />
      <Box w={42} h={40} d={46} c="var(--accent)" x={-108} y={110} fr={12} />
      <Box w={42} h={40} d={46} c="var(--accent)" x={108} y={110} fr={12} />
      {/* head */}
      <Box w={128} h={108} d={112} c="var(--secondary)" y={-66} fr={24} />
      {/* visor + eyes */}
      <Box w={94} h={46} d={10} c="var(--ink)" y={-72} z={58} fr={14} />
      <Box w={18} h={24} d={8} c="var(--accent)" x={-22} y={-72} z={64} fr={6} />
      <Box w={18} h={24} d={8} c="var(--accent)" x={22} y={-72} z={64} fr={6} />
      {/* ears */}
      <Box w={18} h={40} d={40} c="var(--primary)" x={-72} y={-66} fr={8} />
      <Box w={18} h={40} d={40} c="var(--primary)" x={72} y={-66} fr={8} />
      {/* antenna */}
      <Box w={12} h={40} d={12} c="var(--surface-3)" y={-138} fr={5} />
      <Box w={26} h={26} d={26} c="var(--accent)" y={-168} fr={8} />
    </div>
  );
}

/* ---------- Parallax + drag stage ---------- */
function Scene({ object = "blocks" }) {
  const innerRef = _useRef(null);
  const st = _useRef({ rx: -8, ry: 16, dragging: false, lastX: 0, spin: 0 });

  const apply = () => {
    const s = st.current;
    if (innerRef.current) innerRef.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry + s.spin}deg)`;
  };
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const s = st.current;
    s.ry = px * 36; s.rx = -8 - py * 22;
    if (s.dragging) { s.spin += (e.clientX - s.lastX) * 0.45; s.lastX = e.clientX; }
    apply();
  };
  const onDown = (e) => { st.current.dragging = true; st.current.lastX = e.clientX; };

  _useEffect(() => {
    apply();
    const up = () => { st.current.dragging = false; };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  return (
    <div className="scene-3d" onPointerMove={onMove} onPointerDown={onDown}>
      <div className="obj-shadow"></div>
      <div className="scene-inner" ref={innerRef}>
        {object === "island" ? <IslandObject /> : object === "mascot" ? <MascotObject /> : <BlocksObject />}
      </div>
      <div className="scene-hint sh-1"><span className="d"></span>Drag to spin</div>
      <div className="scene-hint sh-2"><span className="d"></span>Live CSS 3D</div>
    </div>
  );
}

Object.assign(window, { Box, BlocksObject, IslandObject, MascotObject, Scene });
