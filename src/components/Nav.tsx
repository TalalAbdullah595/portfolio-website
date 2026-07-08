"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

type Variant = "home" | "projects" | "project";

interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean; // real route (Link) vs in-page hash anchor
}

const ITEMS: Record<Variant, NavItem[]> = {
  home: [
    { id: "work", label: "Work", href: "#work" },
    { id: "projects", label: "Projects", href: "/projects", external: true },
    { id: "engagements", label: "Engagements", href: "#engagements" },
    { id: "process", label: "Process", href: "#process" },
    { id: "reception", label: "Reception", href: "#reception" },
  ],
  projects: [
    { id: "home", label: "Home", href: "/", external: true },
    { id: "projects", label: "Projects", href: "/projects", external: true },
    { id: "engagements", label: "Engagements", href: "/#engagements", external: true },
    { id: "reception", label: "Reception", href: "/#reception", external: true },
  ],
  project: [
    { id: "home", label: "Home", href: "/", external: true },
    { id: "projects", label: "Projects", href: "/projects", external: true },
    { id: "engagements", label: "Engagements", href: "/#engagements", external: true },
  ],
};

const SPY_IDS = ["about", "work", "engagements", "process", "reception", "contact"];

/* Sticky pill nav: hides on scroll-down past 600px, reveals on scroll-up.
   On the home page the active link tracks the section in view. */
export default function Nav({ variant = "home" }: { variant?: Variant }) {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(variant === "home" ? "work" : variant === "projects" ? "projects" : "");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 600 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    if (variant === "home") {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px" });
      SPY_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io!.observe(el);
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
    };
  }, [variant]);

  const brand = (
    <>
      <span className="mark"><Icon name="cube" size={22} /></span>
      <span>Kai Voss<small>Roblox Scripter</small></span>
    </>
  );

  return (
    <nav className={"nav" + (hidden ? " hide" : "")}>
      <div className="nav-inner">
        {variant === "home"
          ? <a className="brand" href="#top">{brand}</a>
          : <Link className="brand" href="/">{brand}</Link>}
        <div className="nav-links">
          {ITEMS[variant].map((n) => {
            const cls = "nav-link" + (active === n.id ? " active" : "");
            return n.external
              ? <Link key={n.id} href={n.href} className={cls}>{n.label}</Link>
              : <a key={n.id} href={n.href} className={cls}>{n.label}</a>;
          })}
        </div>
        {variant === "home"
          ? <a href="#contact" className="btn btn-primary nav-cta">Hire me</a>
          : <Link href="/#contact" className="btn btn-primary nav-cta">Hire me</Link>}
      </div>
    </nav>
  );
}
