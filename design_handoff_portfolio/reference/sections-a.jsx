/* sections-a.jsx — Loader, Nav, Hero, About */
(function () {
  const { useState, useEffect, useRef } = React;

  /* ---------------- LOADER ---------------- */
  function Loader({ onDone }) {
    const [pct, setPct] = useState(0);
    const [done, setDone] = useState(false);
    useEffect(() => {
      document.body.classList.add("no-scroll");
      let p = 0;
      const id = setInterval(() => {
        p += Math.random() * 16 + 6;
        if (p >= 100) { p = 100; clearInterval(id);
          setTimeout(() => { setDone(true); document.body.classList.remove("no-scroll"); onDone && onDone(); }, 480);
        }
        setPct(Math.round(p));
      }, 130);
      return () => { clearInterval(id); document.body.classList.remove("no-scroll"); };
    }, []);
    return (
      <div className={"loader" + (done ? " done" : "")}>
        <div className="loader-inner">
          <div className="loader-cube">
            <div style={{ position: "absolute", left: "50%", top: "50%" }}>
              <Box w={58} h={58} d={58} c="var(--primary)" fr={13} glyph={<Icon name="cube" size={26} />} glyphKind="ic" />
            </div>
          </div>
          <div className="loader-bar"><i style={{ width: pct + "%" }}></i></div>
          <div className="loader-label">Compiling systems… <b>{pct}%</b></div>
        </div>
      </div>
    );
  }

  /* ---------------- NAV ---------------- */
  const NAV_ITEMS = [
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects", href: "Projects.html" },
    { id: "engagements", label: "Engagements" },
    { id: "process", label: "Process" },
    { id: "reception", label: "Reception" }
  ];
  function Nav() {
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState("work");
    const lastY = useRef(0);
    useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY;
        setHidden(y > 600 && y > lastY.current);
        lastY.current = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      // scroll spy
      const ids = ["about", "work", "engagements", "process", "reception", "contact"];
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
      return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
    }, []);
    return (
      <nav className={"nav" + (hidden ? " hide" : "")}>
        <div className="nav-inner">
          <a className="brand" href="#top">
            <span className="mark"><Icon name="cube" size={22} /></span>
            <span>Kai Voss<small>Roblox Scripter</small></span>
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map((n) => (
              <a key={n.id} href={n.href || ("#" + n.id)} className={"nav-link" + (active === n.id ? " active" : "")}>{n.label}</a>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary nav-cta" data-label="hire">Hire me</a>
        </div>
      </nav>
    );
  }

  /* ---------------- HERO ---------------- */
  function Hero({ heroObject }) {
    const stats = window.HOME.stats;
    const skills = window.HOME.skills;
    const loop = [...skills, ...skills];
    return (
      <header className="hero wrap" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-badge reveal"><span className="pulse"></span> Available for Q3 2026 builds</div>
            <h1>
              <span className="row reveal" data-delay="40">I build games</span>
              <span className="row reveal" data-delay="120">players <span className="wobble">can't</span></span>
              <span className="row reveal" data-delay="200">put down.</span>
            </h1>
            <p className="hero-sub reveal" data-delay="280">
              Freelance <b>Roblox scripter & game developer</b>. I engineer the combat,
              matchmaking, and anti-cheat systems that turn a fun idea into a game people
              sink <b>hundreds of hours</b> into — fast, fair, and unbreakable.
            </p>
            <div className="hero-cta reveal" data-delay="340">
              <Magnetic strength={0.4}>
                <a href="#work" className="btn btn-primary btn-lg">See the systems <Icon name="arrow" size={20} className="arr" /></a>
              </Magnetic>
              <a href="#contact" className="btn btn-ghost btn-lg">Start a project</a>
            </div>
            <div className="hero-stats reveal" data-delay="420">
              {stats.map((s, i) => (
                <div className="hstat" key={i}>
                  <div className="n"><CountUp end={s.n} suf={s.suf} /></div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-stage reveal rv-pop" data-delay="200">
            <Scene object={heroObject} />
          </div>
        </div>

        <div className="skills-strip reveal">
          <div className="marquee">
            <div className="marquee-track">
              {loop.map((s, i) => (
                <span className="skill-pill" key={i}>
                  {s.star && <span className="star"><Icon name="star" size={16} /></span>}
                  {s.t}
                  <span className="skill-sep"></span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }

  /* ---------------- ABOUT ---------------- */
  function About() {
    return (
      <section className="about wrap section-pad" id="about">
        <div className="about-grid">
          <div className="portrait-wrap reveal rv-left">
            <div className="portrait">
              <img
                className="portrait-char"
                src="assets/roblox-character.png?v=4"
                alt="Kai Voss — Roblox character render"
                draggable="false" />
              <div className="float-badge fb-1"><span className="ico"><Icon name="shield" size={20} /></span> 0 dupes shipped</div>
              <div className="float-badge fb-2"><span className="ico"><Icon name="gauge" size={20} /></span> 60fps obsessed</div>
            </div>
            <div className="portrait-tag">Kai Voss · Auckland, NZ</div>
          </div>
          <div className="about-copy">
            <span className="eyebrow reveal">About</span>
            <h2 className="reveal" data-delay="60">I make Roblox games that<br /> players actually stick around for.</h2>
            <p className="reveal" data-delay="120">
              I'm Kai — a Roblox scripter who's spent the last seven years doing the
              unglamorous work that big games quietly depend on. Matchmaking, replication, anti-cheat,
              streaming, telemetry: the infrastructure players never see but always feel.
            </p>
            <p className="reveal" data-delay="180">
              I work server-authoritative by default, test under nasty network conditions on purpose,
              and hand off systems your team can actually own. No black boxes, no magic — just clean
              architecture, real docs, and a dashboard to watch it live.
            </p>
            <div className="about-stats">
              {[{ n: 7, suf: "", l: "Years on platform" }, { n: 60, suf: "+", l: "Systems shipped" }, { n: 18, suf: "M", l: "Players served" }].map((s, i) => (
                <div className="about-stat reveal" data-delay={i * 80} key={i}>
                  <div className="n"><CountUp end={s.n} suf={s.suf} /></div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { Loader, Nav, Hero, About });
})();
