/* sections-c.jsx — Reception (testimonial marquee), Contact, Footer */
(function () {
  const { useState } = React;

  function Reception() {
    const T = window.HOME.testimonials;
    const rowA = [...T, ...T];
    const rowB = [...T.slice().reverse(), ...T.slice().reverse()];
    const Card = (t, i) => (
      <div className="card tcard spotlight" key={i}>
        <div className="stars">{Array.from({ length: t.stars }).map((_, k) => <Icon key={k} name="star" size={16} />)}</div>
        <blockquote>“{t.text}”</blockquote>
        <div className="who">
          <span className="av glyph3d txt" style={{ fontSize: 16, color: "var(--accent)" }}>{t.mono}</span>
          <div>
            <div className="nm">{t.nm}</div>
            <div className="rl">{t.role}</div>
          </div>
        </div>
      </div>
    );
    return (
      <section className="recep section-pad" id="reception">
        <div className="wrap" style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow reveal" style={{ justifyContent: "center" }}>Reception</span>
          <h2 className="section-title reveal" data-delay="60">Studios keep<br />coming back.</h2>
        </div>
        <div className="marquee" style={{ marginBottom: 18 }}>
          <div className="marquee-track">{rowA.map(Card)}</div>
        </div>
        <div className="marquee rev">
          <div className="marquee-track">{rowB.map(Card)}</div>
        </div>
      </section>
    );
  }

  /* ---------------- CONTACT ---------------- */
  function Contact() {
    const [sent, setSent] = useState(false);
    const points = [
      { ic: "mail", l: "Email", v: "kai@vossystems.dev" },
      { ic: "chat", l: "Discord", v: "kaivoss" },
      { ic: "clock", l: "Replies within", v: "1 business day" },
      { ic: "pin", l: "Based in", v: "Auckland · works UTC-friendly" }
    ];
    return (
      <section className="contact wrap section-pad" id="contact">
        <div className="card contact-card">
          <div className="contact-aside">
            <span className="eyebrow" style={{ color: "var(--text)" }}>Let's talk</span>
            <h2>Tell me what's<br />breaking.</h2>
            <p>Whether it's a queue that's too slow, an economy that's leaking, or a system you haven't started yet — send the details and I'll come back with a plan.</p>
            <ul className="contact-points">
              {points.map((p, i) => (
                <li key={i}>
                  <span className="ico"><Icon name={p.ic} size={20} /></span>
                  <span><small>{p.l}</small>{p.v}</span>
                </li>
              ))}
            </ul>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="cf-name">Your name</label>
                <input id="cf-name" type="text" placeholder="Jordan Lee" required />
              </div>
              <div className="field">
                <label htmlFor="cf-studio">Studio</label>
                <input id="cf-studio" type="text" placeholder="Tracer Studios" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cf-type">What do you need?</label>
              <select id="cf-type" defaultValue="">
                <option value="" disabled>Pick an engagement…</option>
                <option>System Sprint — one system, fast</option>
                <option>Project Build — several systems</option>
                <option>Studio Partnership — ongoing</option>
                <option>Not sure yet — let's figure it out</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-msg">The details</label>
              <textarea id="cf-msg" placeholder="We're losing players to 30s queues and our economy keeps getting duped…" required></textarea>
            </div>
            {sent
              ? <div className="form-ok"><Icon name="check" size={22} stroke={3} /> Got it — I'll reply to you within a business day.</div>
              : <button type="submit" className="btn btn-primary btn-lg"><Icon name="rocket" size={20} /> Send the brief</button>}
          </form>
        </div>
      </section>
    );
  }

  /* ---------------- FOOTER ---------------- */
  function Footer() {
    const socials = [
      { ic: "upwork", l: "Upwork" },
      { ic: "fiverr", l: "Fiverr" },
      { ic: "chat", l: "Discord" },
      { ic: "github", l: "GitHub" },
      { ic: "play", l: "Roblox" },
      { ic: "youtube", l: "YouTube" },
      { ic: "x", l: "X / Twitter" }
    ];
    return (
      <footer className="footer wrap">
        <div className="footer-cta reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Ready when you are</span>
          <h2>Let's build something<br /><span className="stroke">unbreakable.</span></h2>
          <p>Slots open for Q3 2026. Bring a problem; leave with a plan.</p>
          <Magnetic strength={0.4}>
            <a href="#contact" className="btn btn-accent btn-lg"><Icon name="spark" size={20} /> Start a project <Icon name="arrow" size={20} className="arr" /></a>
          </Magnetic>
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#top">
            <span className="mark"><Icon name="cube" size={22} /></span>
            <span>Kai Voss<small>Roblox Scripter · Game Dev</small></span>
          </a>
          <div className="links">
            {socials.map((s, i) => (
              <a className="foot-social" href="#" key={i}><Icon name={s.ic} size={18} /> {s.l}</a>
            ))}
          </div>
          <div className="footer-copy">© 2026 Kai Voss · All systems operational</div>
        </div>
      </footer>
    );
  }

  Object.assign(window, { Reception, Contact, Footer });
})();
