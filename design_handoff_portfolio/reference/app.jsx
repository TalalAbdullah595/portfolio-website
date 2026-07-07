/* app.jsx — composition, tweaks, mount */
(function () {
  const { useState, useEffect } = React;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "grape",
    "heroObject": "island",
    "outline": 2,
    "radius": 18
  }/*EDITMODE-END*/;

  const PALETTES = [
    { id: "grape", label: "Grape" },
    { id: "twilight", label: "Twilight" },
    { id: "ember", label: "Ember" }
  ];

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [, setLoaded] = useState(false);

    useRevealAll();
    useCursorFx();

    useEffect(() => {
      const el = document.documentElement;
      if (t.palette && t.palette !== "grape") el.setAttribute("data-palette", t.palette);
      else el.removeAttribute("data-palette");
    }, [t.palette]);

    useEffect(() => {
      document.documentElement.style.setProperty("--outline-w", t.outline + "px");
    }, [t.outline]);

    useEffect(() => {
      const r = t.radius;
      document.documentElement.style.setProperty("--r", r + "px");
      document.documentElement.style.setProperty("--r-sm", Math.round(r * 0.64) + "px");
    }, [t.radius]);

    return (
      <React.Fragment>
        <Loader onDone={() => setLoaded(true)} />
        <Nav />
        <main className="page">
          <Hero heroObject={t.heroObject} />
          <About />
          <SelectedWork />
          <Engagements />
          <Process />
          <Reception />
          <Contact />
          <Footer />
        </main>

        <TweaksPanel title="Tweaks">
          <TweakSection label="Palette" />
          <TweakRadio label="Colorway" value={t.palette}
            options={PALETTES.map((p) => ({ value: p.id, label: p.label }))}
            onChange={(v) => setTweak("palette", v)} />

          <TweakSection label="Hero 3D object" />
          <TweakRadio label="Centerpiece" value={t.heroObject}
            options={[{ value: "blocks", label: "Blocks" }, { value: "island", label: "Island" }, { value: "mascot", label: "Mascot" }]}
            onChange={(v) => setTweak("heroObject", v)} />

          <TweakSection label="Cartoon dial" />
          <TweakSlider label="Outline weight" value={t.outline} min={2} max={5} step={0.5} unit="px"
            onChange={(v) => setTweak("outline", v)} />
          <TweakSlider label="Corner radius" value={t.radius} min={10} max={30} step={1} unit="px"
            onChange={(v) => setTweak("radius", v)} />
        </TweaksPanel>
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
