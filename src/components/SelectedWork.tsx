import Link from "next/link";
import Icon from "@/components/Icon";
import Magnetic from "@/components/Magnetic";
import WorkCard from "@/components/WorkCard";
import { SYSTEMS, GAMES, type Project } from "@/data/content";

const by = (arr: Project[], id: string) => arr.find((x) => x.id === id)!;

const FEATURE = [by(SYSTEMS, "apex-matchmaking"), by(SYSTEMS, "hex-combat")];
const REST = [by(SYSTEMS, "sentinel-anticheat"), by(GAMES, "striker-fc"), by(GAMES, "mesozoic")];
const TOTAL = SYSTEMS.length + GAMES.length;

export default function SelectedWork() {
  return (
    <section className="work wrap section-pad" id="work">
      <div className="work-head">
        <div>
          <span className="eyebrow reveal">Selected work</span>
          <h2 className="section-title reveal" data-delay="60">Systems behind<br />games people love.</h2>
        </div>
        <p className="section-lead reveal" data-delay="120">A few favourites from 60+ shipped systems and the games they power.</p>
      </div>
      <div className="work-grid">
        {FEATURE.map((item) => <WorkCard key={item.id} item={item} feat />)}
        {REST.map((item) => <WorkCard key={item.id} item={item} />)}
      </div>
      <div style={{ textAlign: "center", marginTop: 44 }} className="reveal">
        <Magnetic strength={0.3}>
          <Link href="/projects" className="btn btn-accent btn-lg">Browse the full archive — {TOTAL} builds <Icon name="arrow" size={20} className="arr" /></Link>
        </Magnetic>
      </div>
    </section>
  );
}
