import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Accent, Project } from "@/data/content";

const tintFor = (accent: Accent) =>
  accent === "primary" ? "t3" : accent === "secondary" ? "t2" : accent === "accent" ? "t4" : "t1";
const monoColor = (accent: Accent) => `var(--${accent || "secondary"})`;

/* Project card. Shows the cover screenshot when one exists, falling back to
   the chunky monogram so a project with no images still looks deliberate. */
export default function WorkCard({ item, cover, feat = false, className = "" }: {
  item: Project;
  cover?: string;
  feat?: boolean;
  className?: string;
}) {
  return (
    <Link className={`work-card card spotlight lift${feat ? " feat" : ""}${className ? " " + className : ""}`} href={`/projects/${item.id}`}>
      <div className={"thumb " + tintFor(item.accent)}>
        {cover ? (
          <Image
            className="thumb-img"
            src={cover}
            alt=""
            fill
            sizes={feat ? "(max-width: 980px) 100vw, 620px" : "(max-width: 980px) 50vw, 400px"}
          />
        ) : (
          <span className="glyph glyph3d txt" style={{ color: monoColor(item.accent), fontSize: feat ? 104 : 76 }}>{item.mono}</span>
        )}
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
    </Link>
  );
}
