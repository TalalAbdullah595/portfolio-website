import Link from "next/link";
import { SITE } from "@/data/content";

/* Slim footer for the archive + project detail pages */
export default function PageFooter({ className }: { className: "arc-foot" | "proj-foot" }) {
  return (
    <footer className={className}>
      <span>© 2026 {SITE.name} · {SITE.role}</span>
      <Link href="/" className="ff-display" style={{ color: "var(--text)" }}>← Back to home</Link>
    </footer>
  );
}
