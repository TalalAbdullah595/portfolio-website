"use client";

import { useEffect, useRef, useState } from "react";
import WorkCard from "@/components/WorkCard";
import { SYSTEMS, GAMES } from "@/data/content";
import { startReveals } from "@/lib/reveal";

/* derived from the data so a filter chip never outlives its projects */
const TIERS = ["All", ...new Set(SYSTEMS.map((s) => s.tier))];
type Tier = (typeof TIERS)[number];
type Tab = "systems" | "games";

/* Projects archive: Systems / Full Games tabs plus engagement-tier filters.
   Panel content remounts on every switch so cards re-run their staggered
   reveal, mirroring the prototype's full re-render. */
export default function ProjectsArchive({ covers }: { covers: Record<string, string | undefined> }) {
  const [tab, setTab] = useState<Tab>("systems");
  const [tier, setTier] = useState<Tier>("All");
  const [swapping, setSwapping] = useState(false);
  const tabbarRef = useRef<HTMLDivElement>(null);

  // open the tab requested by the URL hash (e.g. /projects#games); deferred a
  // frame so the SSR markup hydrates as-is before the swap
  useEffect(() => {
    if (location.hash.replace("#", "") !== "games") return;
    const raf = requestAnimationFrame(() => setTab("games"));
    return () => cancelAnimationFrame(raf);
  }, []);

  // arm reveals on mount, re-observe freshly rendered cards on every switch
  useEffect(() => startReveals({ stagger: 35 }), [tab, tier]);

  // fade-swap: panel renders with .swapping (hidden), released next frame
  useEffect(() => {
    if (!swapping) return;
    const raf = requestAnimationFrame(() => setSwapping(false));
    return () => cancelAnimationFrame(raf);
  }, [swapping]);

  const activate = (name: Tab) => {
    if (name === tab) return;
    setTab(name);
    setSwapping(true);
    try { history.replaceState(null, "", "#" + name); } catch {}
    if (tabbarRef.current) {
      const top = tabbarRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* featured first: wide cards span 3 of 6 columns, so a standard card wedged
     between them leaves a dead gap in the row */
  const systems = SYSTEMS.filter((x) => tier === "All" || x.tier === tier)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <header className="arc-hero">
        <span className="eyebrow reveal">My portfolio</span>
        <h1 className="reveal">Work I&apos;ve<br /><span className="stroke">shipped.</span></h1>
        <p className="lead reveal">A complete look at what I&apos;ve built: the reusable systems I script and the full games they power. Pick a tab, filter by engagement, and open any card for the complete project overview.</p>

        <div className="tabbar-wrap reveal" ref={tabbarRef}>
          <div className="tabbar" role="tablist">
            <button className={"tab" + (tab === "systems" ? " active" : "")} role="tab" aria-selected={tab === "systems"} onClick={() => activate("systems")}>
              Game Systems <span className="count">{SYSTEMS.length}</span>
            </button>
            <button className={"tab" + (tab === "games" ? " active" : "")} role="tab" aria-selected={tab === "games"} onClick={() => activate("games")}>
              Full Games <span className="count">{GAMES.length}</span>
            </button>
          </div>
        </div>
      </header>

      {tab === "systems" && (
        <section className={"arc-panel" + (swapping ? " swapping" : "")}>
          <div className="filters reveal">
            <span className="flabel">Filter by engagement</span>
            {TIERS.map((t) => (
              <button key={t} className={"fchip" + (t === tier ? " active" : "")} onClick={() => setTier(t)}>{t}</button>
            ))}
          </div>
          {systems.length
            ? (
              <div className="arc-grid" key={tier}>
                {systems.map((item) => <WorkCard key={item.id} item={item} cover={covers[item.id]} feat={item.featured} className="reveal" />)}
              </div>
            )
            : <div className="empty-note">No systems in this category yet.</div>}
        </section>
      )}

      {tab === "games" && (
        <section className={"arc-panel" + (swapping ? " swapping" : "")}>
          <div className="arc-grid games">
            {GAMES.map((item) => <WorkCard key={item.id} item={item} cover={covers[item.id]} className="reveal" />)}
          </div>
        </section>
      )}
    </>
  );
}
