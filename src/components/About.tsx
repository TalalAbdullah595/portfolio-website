import Image from "next/image";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";

const ABOUT_STATS = [
  { n: 7, suf: "", l: "Years on platform" },
  { n: 60, suf: "+", l: "Systems shipped" },
  { n: 18, suf: "M", l: "Players served" },
];

export default function About() {
  return (
    <section className="about wrap section-pad" id="about">
      <div className="about-grid">
        <div className="portrait-wrap reveal rv-left">
          <div className="portrait">
            <Image
              className="portrait-char"
              src="/roblox-character.png"
              alt="Kai Voss — Roblox character render"
              fill
              sizes="(max-width: 880px) 420px, 40vw"
              draggable={false}
            />
            <div className="float-badge fb-1"><span className="ico"><Icon name="shield" size={20} /></span> 0 dupes shipped</div>
            <div className="float-badge fb-2"><span className="ico"><Icon name="gauge" size={20} /></span> 60fps obsessed</div>
          </div>
          <div className="portrait-tag">Kai Voss · Auckland, NZ</div>
        </div>
        <div className="about-copy">
          <span className="eyebrow reveal">About</span>
          <h2 className="reveal" data-delay="60">I make Roblox games that<br /> players actually stick around for.</h2>
          <p className="reveal" data-delay="120">
            I&apos;m Kai — a Roblox scripter who&apos;s spent the last seven years doing the
            unglamorous work that big games quietly depend on. Matchmaking, replication, anti-cheat,
            streaming, telemetry: the infrastructure players never see but always feel.
          </p>
          <p className="reveal" data-delay="180">
            I work server-authoritative by default, test under nasty network conditions on purpose,
            and hand off systems your team can actually own. No black boxes, no magic — just clean
            architecture, real docs, and a dashboard to watch it live.
          </p>
          <div className="about-stats">
            {ABOUT_STATS.map((s, i) => (
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
