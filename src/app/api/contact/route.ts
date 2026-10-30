import { appendFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/data/content";
import { autoReplyEmail, notificationEmail, type Brief, type Mail } from "@/data/emails";

/* The most common throwaway providers. A full blocklist is ~100k domains and
   changes weekly, so this catches the bulk without shipping a dataset.
   shortcut: partial list, swap for an MX lookup or a verification API if
   junk leads actually get through. */
const DISPOSABLE = new Set([
  "mailinator.com", "10minutemail.com", "guerrillamail.com", "guerrillamail.net",
  "sharklasers.com", "grr.la", "yopmail.com", "yopmail.fr", "temp-mail.org",
  "tempmail.com", "tempmailo.com", "throwawaymail.com", "trashmail.com",
  "getnada.com", "nada.email", "dispostable.com", "maildrop.cc", "mohmal.com",
  "fakeinbox.com", "mailnesia.com", "tempinbox.com", "emailondeck.com",
  "spamgourmet.com", "mytemp.email", "moakt.com", "tempr.email", "discard.email",
  "mailcatch.com", "inboxbear.com", "burnermail.io", "33mail.com", "spam4.me",
  "mailsac.com", "tmpmail.org", "minuteinbox.com", "1secmail.com", "1secmail.org",
  "1secmail.net", "emailfake.com", "generator.email", "inboxkitten.com",
  "luxusmail.org", "mail-temp.com", "cs.email", "dropmail.me", "fakemail.net",
]);

/* Deliberately loose: one @, a dot in the domain, no spaces. Anything stricter
   rejects valid addresses, and only a confirmation email proves deliverability. */
const EMAIL = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

/* shortcut: in-memory, so it resets on restart and is per-instance. Enough to
   stop a bored visitor; use a shared store if this ever gets real traffic. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const bad = (error: string, status = 400) => Response.json({ error }, { status });
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/* Resend's REST API directly — the SDK is a wrapper around this one call. */
async function send(mail: Mail, to: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM,
      to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/* Best-effort backup. Serverless hosts have a read-only filesystem, so a
   failure here must not fail the request on its own — but the caller needs to
   know, or a brief can vanish while the visitor is shown a success screen. */
async function archive(entry: Brief & { at: string }): Promise<boolean> {
  try {
    const dir = join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(join(dir, "contact-submissions.ndjson"), JSON.stringify(entry) + "\n", "utf8");
    return true;
  } catch (err) {
    console.error("[contact] archive failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) return bad("Too many messages from here. Try again later.", 429);

  const raw = await req.text();
  if (raw.length > 10_000) return bad("That message is too long.", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return bad("Malformed request.");
  }

  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const studio = str(body.studio);
  const type = str(body.type);
  const message = str(body.message);

  if (!name || name.length > 100) return bad("Please give a name.");
  if (studio.length > 100) return bad("That studio name is too long.");
  if (!message || message.length > 5000) return bad("Please describe what you need.");
  if (!email || email.length > 254 || !EMAIL.test(email)) return bad("That email address doesn't look right.");
  if (DISPOSABLE.has(email.split("@")[1])) return bad("Please use a permanent email address so I can reply.");

  const brief: Brief = { name, email, studio, type, message };
  const archived = await archive({ at: new Date().toISOString(), ...brief });

  /* No mail configured. Locally the archive is the whole story, but on a
     serverless host the write fails too, and then nothing kept this brief.
     Say so rather than showing a success screen over a lost lead. */
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) {
    if (!archived) {
      console.error("[contact] no mail configured and archive unavailable — brief dropped");
      return bad(`This form isn't set up yet. Please email me directly at ${SITE.email}.`, 503);
    }
    console.warn("[contact] RESEND_API_KEY/CONTACT_FROM unset — saved to .data only");
    return Response.json({ ok: true });
  }

  /* The notification is the one that matters: if it fails, the lead is lost,
     so say so rather than showing a success screen. */
  try {
    await send(notificationEmail(brief), process.env.CONTACT_TO || SITE.email, email);
  } catch (err) {
    console.error("[contact] notification failed:", err);
    return bad(`Could not send that. Please email me directly at ${SITE.email}.`, 502);
  }

  /* Off until a sending domain is verified: Resend's test sender can only
     deliver to the account owner, so auto-replies to clients would bounce.
     Set CONTACT_AUTOREPLY=1 once a domain is in place.
     Courtesy only — a bounce must never fail a brief that already arrived. */
  if (process.env.CONTACT_AUTOREPLY === "1") {
    try {
      await send(autoReplyEmail(brief), email);
    } catch (err) {
      console.error("[contact] auto-reply failed:", err);
    }
  }

  return Response.json({ ok: true });
}
