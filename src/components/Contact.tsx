"use client";

import { useState, type FormEvent } from "react";
import Icon, { type IconName } from "@/components/Icon";

const POINTS: { ic: IconName; l: string; v: string }[] = [
  { ic: "mail", l: "Email", v: "kai@vossystems.dev" },
  { ic: "chat", l: "Discord", v: "kaivoss" },
  { ic: "clock", l: "Replies within", v: "1 business day" },
  { ic: "pin", l: "Based in", v: "Auckland · works UTC-friendly" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact wrap section-pad" id="contact">
      <div className="card contact-card">
        <div className="contact-aside">
          <span className="eyebrow" style={{ color: "var(--text)" }}>Let&apos;s talk</span>
          <h2>Tell me what&apos;s<br />breaking.</h2>
          <p>Whether it&apos;s a queue that&apos;s too slow, an economy that&apos;s leaking, or a system you haven&apos;t started yet — send the details and I&apos;ll come back with a plan.</p>
          <ul className="contact-points">
            {POINTS.map((p, i) => (
              <li key={i}>
                <span className="ico"><Icon name={p.ic} size={20} /></span>
                <span><small>{p.l}</small>{p.v}</span>
              </li>
            ))}
          </ul>
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-name">Your name</label>
              <input id="cf-name" type="text" placeholder="Jordan Lee" required />
            </div>
            <div className="field">
              <label htmlFor="cf-studio">Studio</label>
              <input id="cf-studio" type="text" placeholder="Tracer Studios" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-type">What do you need?</label>
            <select id="cf-type" defaultValue="">
              <option value="" disabled>Pick an engagement…</option>
              <option>System Sprint — one system, fast</option>
              <option>Project Build — several systems</option>
              <option>Studio Partnership — ongoing</option>
              <option>Not sure yet — let&apos;s figure it out</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-msg">The details</label>
            <textarea id="cf-msg" placeholder="We're losing players to 30s queues and our economy keeps getting duped…" required></textarea>
          </div>
          {sent
            ? <div className="form-ok"><Icon name="check" size={22} stroke={3} /> Got it — I&apos;ll reply to you within a business day.</div>
            : <button type="submit" className="btn btn-primary btn-lg"><Icon name="rocket" size={20} /> Send the brief</button>}
        </form>
      </div>
    </section>
  );
}
