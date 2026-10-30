"use client";

import { useState, type FormEvent } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { SITE } from "@/data/content";

const POINTS: { ic: IconName; l: string; v: string }[] = [
  { ic: "mail", l: "Email", v: SITE.email },
  { ic: "chat", l: "Discord", v: SITE.discord },
  { ic: "clock", l: "Replies within", v: SITE.replyTime },
  { ic: "spark", l: "First step", v: "Free scope assessment" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try emailing me instead.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError(`Could not reach the server. Email me at ${SITE.email}.`);
      setStatus("error");
    }
  };

  return (
    <section className="contact wrap section-pad" id="contact">
      <div className="card contact-card">
        <div className="contact-aside">
          <span className="eyebrow" style={{ color: "var(--text)" }}>Let&apos;s talk</span>
          <h2>Tell me what&apos;s<br />breaking.</h2>
          <p>Whether it&apos;s combat that doesn&apos;t feel right, data that keeps corrupting, or a system you haven&apos;t started yet, send the details and I&apos;ll come back with a plan.</p>
          <ul className="contact-points">
            {POINTS.map((p, i) => (
              <li key={i}>
                <span className="ico"><Icon name={p.ic} size={20} /></span>
                <span><small>{p.l}</small>{p.v}</span>
              </li>
            ))}
          </ul>
        </div>
        <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-name">Your name</label>
              <input id="cf-name" name="name" type="text" placeholder="Jordan Lee" maxLength={100} required />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" type="email" placeholder="you@studio.com" maxLength={254} required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-studio">Studio <span className="opt">optional</span></label>
            <input id="cf-studio" name="studio" type="text" placeholder="Tracer Studios" maxLength={100} />
          </div>
          <div className="field">
            <label htmlFor="cf-type">What do you need?</label>
            <select id="cf-type" name="type" defaultValue="">
              <option value="" disabled>Pick an engagement…</option>
              <option>Core Game Loop (playable loop, 1 to 4 weeks)</option>
              <option>Full Game (complete build, ready to publish)</option>
              <option>Studio Partner (monthly retainer)</option>
              <option>One system, built or fixed</option>
              <option>Not sure yet, let&apos;s figure it out</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-msg">The details</label>
            <textarea id="cf-msg" name="message" placeholder="We're losing players to 30s queues and our economy keeps getting duped…" maxLength={5000} required></textarea>
          </div>
          {status === "sent" ? (
            <div className="form-ok"><Icon name="check" size={22} stroke={3} /> Got it. I&apos;ll reply to you within a business day.</div>
          ) : (
            <>
              {status === "error" && <div className="form-err"><Icon name="bolt" size={20} /> {error}</div>}
              <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
                <Icon name="rocket" size={20} /> {status === "sending" ? "Sending…" : "Send the brief"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
