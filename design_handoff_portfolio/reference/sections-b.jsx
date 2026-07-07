/* sections-b.jsx — Selected Work, Engagements, Process */
(function () {
  const tintFor = (accent) => accent === "primary" ? "t3" : accent === "secondary" ? "t2" : accent === "accent" ? "t4" : "t1";
  const monoColor = (accent) => `var(--${accent || "secondary"})`;

  function WorkCard({ item, type, feat }) {
    return (
      <a className={"work-card card spotlight lift" + (feat ? " feat" : "")} href={`Project.html?type=${type}&id=${item.id}`}>
        <div className={"thumb " + tintFor(item.accent)}>
          <span className="glyph glyph3d txt" style={{ color: monoColor(item.accent), fontSize: feat ? 104 : 76 }}>{item.mono}</span>
          <span className="badge-tier chip solid">{item.tier}</span>
          {item.featured && <span className="star-flag"><Icon name="star" size={22} /></span>}
        </div>
        <div className="work-body">
          <div className="kicker">{item.kicker}</div>
          <h3>{item.name}{item.wip && <span className="chip" style={{ marginLeft: 10, fontSize: 12, padding: "3px 10px" }}>WIP</span>}</h3>
          <p>{item.summary}</p>
          <div className="work-meta">
            {item.tech.slice(0, 3).map((t, i) => <span className="chip" key={i}>{t}</span>)}
          </div>
          <div className="work-go">View project <Icon name="arrow" size={16} className="arr" /></div>
        </div>
      </a>
    );
  }

  function SelectedWork() {
    const S = window.PORTFOLIO_SYSTEMS, G = window.PORTFOLIO_GAMES;
    const by = (arr, id) => arr.find((x) => x.id === id);
    const feature = [
      { item: by(S, "apex-matchmaking"), type: "system", feat: true },
      { item: by(S, "hex-combat"), type: "system", feat: true }
    ];
    const rest = [
      { item: by(S, "sentinel-anticheat"), type: "system" },
      { item: by(G, "striker-fc"), type: "game" },
      { item: by(G, "mesozoic"), type: "game" }
    ];
    return (
      <section className="work wrap section-pad" id="work">
        <div className="work-head">
          <div>
            <span className="eyebrow reveal">Selected work</span>
            <h2 className="section-title reveal" data-delay="60">Systems behind<br />games people love.</h2>
          </div>
          <p className="section-lead reveal" data-delay="120">A few favourites from 60+ shipped systems and the games they power.</p>
        </div>
        <div className="work-grid">
          {feature.map((w, i) => <WorkCard key={i} {...w} />)}
          {rest.map((w, i) => <WorkCard key={"r" + i} {...w} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }} className="reveal">
          <Magnetic strength={0.3}>
            <a href="Projects.html" className="btn btn-accent btn-lg">Browse the full archive — 18 builds <Icon name="arrow" size={20} className="arr" /></a>
          </Magnetic>
        </div>
      </section>
    );
  }

  /* ---------------- ENGAGEMENTS ---------------- */
  function Engagements() {
    const E = window.HOME.engagements;
    const caps = window.HOME.capabilities;
    const tierClass = (t) => t === "sprint" ? "t-sprint" : t === "project" ? "t-project" : "t-partner";
    const btnClass = (t) => t === "project" ? "btn-primary" : t === "partner" ? "btn-accent" : "btn-ghost";
    return (
      <section className="eng wrap section-pad" id="engagements">
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span className="eyebrow reveal" style={{ justifyContent: "center" }}>How we work together</span>
          <h2 className="section-title reveal" data-delay="60">Pick the shape that<br />fits your studio.</h2>
        </div>
        <div className="eng-grid">
          {E.map((e, i) => (
            <div className={"card eng-card reveal " + tierClass(e.tier) + (e.pop ? " pop spotlight" : "")} data-delay={i * 90} key={i}>
              <span className="ribbon">{e.ribbon}</span>
              <h3>{e.name}</h3>
              <div className="price">{e.price.pre} <b>{e.price.val}</b> {e.price.post}</div>
              <p className="desc">{e.desc}</p>
              <ul className="eng-feats">
                {e.feats.map((f, j) => (
                  <li key={j}><span className="tick"><Icon name="check" size={13} stroke={3.2} /></span>{f}</li>
                ))}
              </ul>
              <a href="#contact" className={"btn " + btnClass(e.tier)}>{e.cta} <Icon name="arrow" size={18} className="arr" /></a>
            </div>
          ))}
        </div>
        <div className="caps reveal">
          <div className="caps-h">Every engagement draws on the same toolbox</div>
          <div className="caps-row">
            {caps.map((c, i) => <span className="chip dot" key={i}>{c}</span>)}
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- PROCESS ---------------- */
  function Process() {
    const P = window.HOME.process;
    return (
      <section className="proc wrap section-pad" id="process">
        <div style={{ marginBottom: 50, maxWidth: 720 }}>
          <span className="eyebrow reveal">The process</span>
          <h2 className="section-title reveal" data-delay="60">Six steps from “it's broken”<br />to “your team owns it.”</h2>
        </div>
        <div className="proc-grid">
          {P.map((s, i) => (
            <div className="card proc-card lift reveal" data-delay={(i % 3) * 80} key={i}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  Object.assign(window, { SelectedWork, Engagements, Process });
})();
