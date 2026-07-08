import Icon from "@/components/Icon";
import Magnetic from "@/components/Magnetic";
import CountUp from "@/components/CountUp";
import Scene from "@/components/Scene";
import { HOME } from "@/data/content";

export default function Hero() {
  const loop = [...HOME.skills, ...HOME.skills];
  return (
    <header className="hero wrap" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-badge reveal"><span className="pulse"></span> Available for Q3 2026 builds</div>
          <h1>
            <span className="row reveal" data-delay="40">I build games</span>
            <span className="row reveal" data-delay="120">players <span className="wobble">can&apos;t</span></span>
            <span className="row reveal" data-delay="200">put down.</span>
          </h1>
          <p className="hero-sub reveal" data-delay="280">
            Freelance <b>Roblox scripter &amp; game developer</b>. I engineer the combat,
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
            {HOME.stats.map((s, i) => (
              <div className="hstat" key={i}>
                <div className="n"><CountUp end={s.n} suf={s.suf} /></div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-stage reveal rv-pop" data-delay="200">
          <Scene />
        </div>
      </div>

      <div className="skills-strip reveal">
        <div className="marquee">
          <div className="marquee-track">
            {loop.map((s, i) => (
              <span className="skill-pill" key={i} aria-hidden={i >= HOME.skills.length || undefined}>
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
