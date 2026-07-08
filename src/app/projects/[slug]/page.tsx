import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";
import ReadProgress from "@/components/ReadProgress";
import RevealFx from "@/components/RevealFx";
import PageFooter from "@/components/PageFooter";
import { SYSTEMS, GAMES, getProject, projectType, type Outcome, type Project } from "@/data/content";

export function generateStaticParams() {
  return [...SYSTEMS, ...GAMES].map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) return {};
  return { title: `${item.name} — Kai Voss`, description: item.summary };
}

function Stat({ o }: { o: Outcome }) {
  const numeric = /^[0-9.]+$/.test(o.n);
  return (
    <div className="pstat reveal">
      <div className="n">
        {numeric ? <CountUp end={parseFloat(o.n)} suf={o.suf} /> : <span>{o.n}<span className="suf">{o.suf}</span></span>}
      </div>
      <div className="l">{o.l}</div>
    </div>
  );
}

function PnCard({ entry, dir, typeLabel }: { entry: Project; dir: "prev" | "next"; typeLabel: string }) {
  return (
    <Link className={"card pn-card lift spotlight " + dir} href={`/projects/${entry.id}`}>
      <span className="dir">
        {dir === "prev"
          ? <><Icon name="arrow-left" size={18} /> Previous {typeLabel.toLowerCase()}</>
          : <>Next {typeLabel.toLowerCase()} <Icon name="arrow" size={18} /></>}
      </span>
      <h3>{entry.name}</h3>
      <p style={{ color: "var(--text-dim)", fontSize: 15, margin: 0 }}>{entry.kicker}</p>
    </Link>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) notFound();

  const type = projectType(item);
  const list = type === "game" ? GAMES : SYSTEMS;
  const idx = list.findIndex((x) => x.id === item.id);
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];
  const typeLabel = type === "game" ? "Full Game" : "Game System";
  const accent = `var(--${item.accent})`;

  return (
    <>
      <ReadProgress />
      <Nav variant="project" />
      <main className="page wrap">
        <header className="proj-hero">
          <div className="crumbs reveal">
            <span className="chip solid">{typeLabel}</span>
            <span className="chip">{item.tier} engagement</span>
            {item.featured && <span className="chip dot">Featured work</span>}
            {item.wip && <span className="chip">In development</span>}
          </div>
          <span className="eyebrow reveal" style={{ color: accent }}>{item.kicker}</span>
          <h1 className="reveal">{item.name}</h1>
          <p className="lead reveal">{item.summary}</p>
          <div className="pstats">
            {item.outcomes.map((o, i) => <Stat key={i} o={o} />)}
          </div>
        </header>

        <section className="proj-media">
          <div className="media-grid reveal">
            <div className="media-slot media-main">Main screenshot of {item.name} — coming soon</div>
            <div className="media-slot media-side">Detail shot — coming soon</div>
            <div className="media-slot media-side">Detail shot — coming soon</div>
          </div>
        </section>

        <section className="proj-section">
          <div className="block">
            <div><span className="eyebrow reveal">The brief</span></div>
            <div className="body">
              <h2 className="reveal">What was breaking</h2>
              <p className="reveal" style={{ marginTop: 14 }}>{item.problem}</p>
            </div>
          </div>
        </section>

        <section className="proj-section">
          <div className="block">
            <div><span className="eyebrow reveal">The work</span></div>
            <div className="body">
              <h2 className="reveal">What I built</h2>
              <ul className="approach-list" style={{ marginTop: 18 }}>
                {item.approach.map((a, i) => (
                  <li className="reveal" key={i}><span className="tick"><Icon name="check" size={14} stroke={3.2} /></span>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="proj-section">
          <div className="block">
            <div><span className="eyebrow reveal">Under the hood</span></div>
            <div className="body">
              <h2 className="reveal">Tech &amp; tools</h2>
              <div className="tech-row reveal" style={{ marginTop: 18 }}>
                {item.tech.map((t, i) => <span className="chip dot" key={i}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        {item.quote && (
          <section className="proj-quote reveal">
            <div className="card spotlight">
              <blockquote>&ldquo;{item.quote.text}&rdquo;</blockquote>
              <div className="who">
                <span className="av">{item.quote.who.split(" ").map((w) => w[0]).join("")}</span>
                <div>
                  <div className="nm">{item.quote.who}</div>
                  <div className="rl">{item.quote.role}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="pn-grid">
          <PnCard entry={prev} dir="prev" typeLabel={typeLabel} />
          <PnCard entry={next} dir="next" typeLabel={typeLabel} />
        </div>

        <section className="proj-cta reveal">
          <h2>Want something like {item.name}?</h2>
          <p>This kind of system can be scoped as a sprint or folded into a bigger build. Tell me what you&apos;re making.</p>
          <Link href="/#contact" className="btn btn-accent btn-lg">Start a conversation <Icon name="arrow" size={18} /></Link>
        </section>

        <PageFooter className="proj-foot" />
      </main>
      <RevealFx />
    </>
  );
}
