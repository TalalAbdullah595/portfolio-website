import Icon from "@/components/Icon";
import Magnetic from "@/components/Magnetic";
import { SITE } from "@/data/content";

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-cta reveal">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Ready when you are</span>
        <h2>Let&apos;s build something<br /><span className="stroke">unbreakable.</span></h2>
        <p>Send me what you&apos;re trying to build and get an honest assessment of the scope.</p>
        <Magnetic strength={0.4}>
          <a href="#contact" className="btn btn-accent btn-lg"><Icon name="spark" size={20} /> Start a project <Icon name="arrow" size={20} className="arr" /></a>
        </Magnetic>
      </div>
      <div className="footer-bottom">
        <a className="brand" href="#top">
          <span className="mark"><Icon name="cube" size={22} /></span>
          <span>{SITE.name}<small>{SITE.role} · {SITE.brand}</small></span>
        </a>
        <div className="links">
          {SITE.socials.map((s) => {
            const inner = <><Icon name={s.ic} size={18} /> {s.l}</>;
            /* Entries without a URL (an unlinkable handle, or a profile
               still outstanding) render as pills rather than dead links. */
            return s.href ? (
              <a className="foot-social" href={s.href} key={s.l} target="_blank" rel="noopener noreferrer">{inner}</a>
            ) : (
              <span className="foot-social" key={s.l} title={s.handle ? `${s.l}: ${s.handle}` : undefined}>{inner}</span>
            );
          })}
        </div>
        <div className="footer-copy">© 2026 {SITE.name} · All systems operational</div>
      </div>
    </footer>
  );
}
