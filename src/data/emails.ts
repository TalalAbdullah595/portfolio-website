/* ============================================================
   emails.ts — copy for the two emails the contact form sends.
   Lives beside content.ts so all site wording is in one place.
   ============================================================ */

import { SITE } from "@/data/content";

export interface Brief {
  name: string;
  email: string;
  studio: string;
  type: string;
  message: string;
}

export interface Mail {
  subject: string;
  text: string;
  html: string;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Email clients strip <style> blocks and most layout, so everything is inline
   and the structure stays flat on purpose. */
const wrap = (inner: string) =>
  `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#1b1b1b;max-width:560px">${inner}</div>`;

const row = (label: string, value: string) =>
  `<p style="margin:0 0 10px"><strong style="color:#6b6b6b;font-size:12px;letter-spacing:.06em;text-transform:uppercase">${label}</strong><br>${esc(value)}</p>`;

/* ---- 1. Lands in Talal's inbox ---- */
export function notificationEmail(b: Brief): Mail {
  const who = b.studio ? `${b.name} · ${b.studio}` : b.name;
  return {
    subject: `New brief: ${who}`,
    text: [
      `New brief from the portfolio site.`,
      ``,
      `Name:     ${b.name}`,
      `Email:    ${b.email}`,
      `Studio:   ${b.studio || "(not given)"}`,
      `Wants:    ${b.type || "(not picked)"}`,
      ``,
      `Details:`,
      b.message,
      ``,
      `Reply straight to this email to answer them.`,
    ].join("\n"),
    html: wrap(
      `<h2 style="margin:0 0 18px;font-size:19px">New brief from the portfolio site</h2>` +
      row("Name", b.name) +
      row("Email", b.email) +
      row("Studio", b.studio || "(not given)") +
      row("Wants", b.type || "(not picked)") +
      `<p style="margin:18px 0 6px"><strong style="color:#6b6b6b;font-size:12px;letter-spacing:.06em;text-transform:uppercase">Details</strong></p>` +
      `<div style="white-space:pre-wrap;padding:14px 16px;background:#f5f5f5;border-radius:10px">${esc(b.message)}</div>` +
      `<p style="margin:18px 0 0;color:#6b6b6b;font-size:13px">Reply straight to this email to answer them.</p>`,
    ),
  };
}

/* ---- 2. Auto-reply to whoever sent the brief ---- */
export function autoReplyEmail(b: Brief): Mail {
  const sig = `${SITE.name}\n${SITE.role} · ${SITE.brand}`;
  return {
    subject: "Thanks — I've got your brief",
    text: [
      `Hi ${b.name},`,
      ``,
      `Thanks for sending this over.`,
      ``,
      `You'll hear back from me within ${SITE.replyTime} with an honest read on scope:`,
      `what I'd build, roughly how long it takes, and anything in your brief I'd`,
      `push back on before you spend money on it.`,
      ``,
      `If it's urgent, I'm on Discord at ${SITE.discord}.`,
      ``,
      `In the meantime, every system in my portfolio has a devlog you can watch,`,
      `so you can see how I work before we ever speak.`,
      ``,
      sig,
      ``,
      `---`,
      `What you sent:`,
      b.message,
    ].join("\n"),
    html: wrap(
      `<p style="margin:0 0 14px">Hi ${esc(b.name)},</p>` +
      `<p style="margin:0 0 14px">Thanks for sending this over. I've read it.</p>` +
      `<p style="margin:0 0 14px">You'll hear back from me within <strong>${SITE.replyTime}</strong> with an honest read on scope: what I'd build, roughly how long it takes, and anything in your brief I'd push back on before you spend money on it.</p>` +
      `<p style="margin:0 0 14px">If it's urgent, I'm on Discord at <strong>${SITE.discord}</strong>.</p>` +
      `<p style="margin:0 0 20px">In the meantime, every system in my portfolio has a devlog you can watch, so you can see how I work before we ever speak.</p>` +
      `<p style="margin:0 0 4px"><strong>${SITE.name}</strong></p>` +
      `<p style="margin:0 0 22px;color:#6b6b6b;font-size:13px">${SITE.role} · ${SITE.brand}</p>` +
      `<p style="margin:0 0 6px;color:#6b6b6b;font-size:12px;letter-spacing:.06em;text-transform:uppercase">What you sent</p>` +
      `<div style="white-space:pre-wrap;padding:14px 16px;background:#f5f5f5;border-radius:10px;color:#4a4a4a;font-size:14px">${esc(b.message)}</div>`,
    ),
  };
}
