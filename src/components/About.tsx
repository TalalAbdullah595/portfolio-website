import Image from "next/image";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";
import { SITE } from "@/data/content";

const ABOUT_STATS = [
  { n: 2, suf: "+", l: "Years on Roblox" },
  { n: 50, suf: "+", l: "Systems delivered" },
  { n: 21, suf: "", l: "Devlogs published" },
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
              alt={`Roblox character render of ${SITE.name}`}
              fill
              sizes="(max-width: 880px) 420px, 40vw"
              draggable={false}
            />
            <div className="float-badge fb-1"><span className="ico"><Icon name="shield" size={20} /></span> Server-authoritative</div>
            <div className="float-badge fb-2"><span className="ico"><Icon name="gauge" size={20} /></span> 60fps obsessed</div>
          </div>
          <div className="portrait-tag">{SITE.name}</div>
        </div>
        <div className="about-copy">
          <span className="eyebrow reveal">About</span>
          <h2 className="reveal" data-delay="60">I make Roblox games that<br /> players actually stick around for.</h2>
          <p className="reveal" data-delay="120">
            I&apos;m Talal, a Roblox developer working under the name {SITE.brand}.
            Two years of production Luau, and everything in my portfolio is work I&apos;ve actually
            shipped for clients. Combat is my strongest area: parry windows, block and break
            mechanics, skill trees and cooldowns, all server-authoritative, so the system can&apos;t be
            exploited from the client.
          </p>
          <p className="reveal" data-delay="180">
            Player data is where most Roblox projects break, so I handle it with session locking and
            modular code that&apos;s straightforward to extend. Around that I build the progression
            layer that keeps players returning (pets, waves, abilities, shops, badges) and the
            interfaces on top, with clean state handling across mobile, console, and PC. I write
            event-driven and modular because the goal isn&apos;t making it work once; it&apos;s a
            system that&apos;s still easy to extend when you&apos;re three updates deep.
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
