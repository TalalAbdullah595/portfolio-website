import Icon, { type IconName } from "@/components/Icon";
import Magnetic from "@/components/Magnetic";

/* Order matters — the handoff specifies exactly this sequence.
   hrefs are placeholders; wire real profile URLs when available. */
const SOCIALS: { ic: IconName; l: string; href: string }[] = [
  { ic: "upwork", l: "Upwork", href: "#" },
  { ic: "fiverr", l: "Fiverr", href: "#" },
  { ic: "chat", l: "Discord", href: "#" },
  { ic: "github", l: "GitHub", href: "#" },
  { ic: "play", l: "Roblox", href: "#" },
  { ic: "youtube", l: "YouTube", href: "#" },
  { ic: "x", l: "X / Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-cta reveal">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Ready when you are</span>
        <h2>Let&apos;s build something<br /><span className="stroke">unbreakable.</span></h2>
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
          {SOCIALS.map((s) => (
            <a className="foot-social" href={s.href} key={s.l}><Icon name={s.ic} size={18} /> {s.l}</a>
          ))}
        </div>
        <div className="footer-copy">© 2026 Kai Voss · All systems operational</div>
      </div>
    </footer>
  );
}
