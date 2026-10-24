import Icon from "@/components/Icon";
import { HOME, type Testimonial } from "@/data/content";

/* Infinite testimonial marquee: each row renders its list twice and the CSS
   animation translates -50%; the duplicate half is aria-hidden. */
function Row({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className={"marquee" + (reverse ? " rev" : "")} style={reverse ? undefined : { marginBottom: 18 }}>
      <div className="marquee-track">
        {loop.map((t, i) => (
          <div className="card tcard spotlight" key={i} aria-hidden={i >= items.length || undefined}>
            {t.stars ? (
              <div className="stars">{Array.from({ length: t.stars }).map((_, k) => <Icon key={k} name="star" size={16} />)}</div>
            ) : null}
            <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
            <div className="who">
              <span className="av glyph3d txt" style={{ fontSize: 16, color: "var(--accent)" }}>{t.mono}</span>
              <div>
                <div className="nm">{t.nm}</div>
                {t.role && <div className="rl">{t.role}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reception() {
  const T = HOME.testimonials;
  return (
    <section className="recep section-pad" id="reception">
      <div className="wrap" style={{ textAlign: "center", marginBottom: 44 }}>
        <span className="eyebrow reveal" style={{ justifyContent: "center" }}>Reception</span>
        <h2 className="section-title reveal" data-delay="60">Clients keep<br />coming back.</h2>
      </div>
      {/* one row: five reviews across two rows reads as padding, and two of
          them are word-for-word identical. Add the reverse row back when
          there are enough to fill it. */}
      <Row items={T} />
    </section>
  );
}
