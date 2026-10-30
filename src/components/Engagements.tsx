import Icon from "@/components/Icon";
import { HOME, type Engagement } from "@/data/content";

const tierClass = (t: Engagement["tier"]) => `t-${t}`;
/* matches the ribbon colour on the same card */
const btnClass = (t: Engagement["tier"]) =>
  t === "loop" ? "btn-secondary" : t === "game" ? "btn-primary" : "btn-accent";

export default function Engagements() {
  return (
    <section className="eng wrap section-pad" id="engagements">
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <span className="eyebrow reveal" style={{ justifyContent: "center" }}>How we work together</span>
        <h2 className="section-title reveal" data-delay="60">Pick the shape that<br />fits your studio.</h2>
      </div>
      <div className="eng-grid">
        {HOME.engagements.map((e, i) => (
          <div className={"card eng-card reveal " + tierClass(e.tier) + (e.pop ? " pop spotlight" : "")} data-delay={i * 90} key={e.name}>
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
      {/* catches the single-system and fix work that the three packages don't cover */}
      <p className="eng-note reveal">
        <b>Already have a game?</b> One system built, or an existing one fixed, scoped as its own job. <a href="#contact">Just ask</a>.
      </p>
      <div className="caps reveal">
        <div className="caps-h">Every engagement draws on the same toolbox</div>
        <div className="caps-row">
          {HOME.capabilities.map((c, i) => <span className="chip dot" key={i}>{c}</span>)}
        </div>
      </div>
    </section>
  );
}
