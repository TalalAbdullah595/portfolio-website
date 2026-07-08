import { HOME } from "@/data/content";

export default function Process() {
  return (
    <section className="proc wrap section-pad" id="process">
      <div style={{ marginBottom: 50, maxWidth: 720 }}>
        <span className="eyebrow reveal">The process</span>
        <h2 className="section-title reveal" data-delay="60">Six steps from &ldquo;it&apos;s broken&rdquo;<br />to &ldquo;your team owns it.&rdquo;</h2>
      </div>
      <div className="proc-grid">
        {HOME.process.map((s, i) => (
          <div className="card proc-card lift reveal" data-delay={(i % 3) * 80} key={s.t}>
            <div className="num">{String(i + 1).padStart(2, "0")}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
