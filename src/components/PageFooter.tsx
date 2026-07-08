import Link from "next/link";

/* Slim footer for the archive + project detail pages */
export default function PageFooter({ className }: { className: "arc-foot" | "proj-foot" }) {
  return (
    <footer className={className}>
      <span>© 2026 Kai Voss · Roblox Scripter</span>
      <Link href="/" className="ff-display" style={{ color: "var(--text)" }}>← Back to home</Link>
    </footer>
  );
}
