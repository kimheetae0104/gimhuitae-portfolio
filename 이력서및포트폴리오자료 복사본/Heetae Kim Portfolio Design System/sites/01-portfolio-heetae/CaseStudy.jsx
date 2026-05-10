/* global React, Button */
function CaseStudy({ projectId = 1, onBack }) {
  return (
    <main>
      <section style={{ padding: "48px 0 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <span className="meta">§ № {String(projectId).padStart(2,"0")} / 12 — CASE STUDY</span>
          <Button variant="text" onClick={onBack}>← All work</Button>
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.04, maxWidth: "14ch" }}>
          공책 — a notebook for <span style={{ color: "var(--accent-500)" }}>one</span> reader.
        </h1>
        <p className="lead" style={{ maxWidth: "56ch", marginTop: 24 }}>
          A writing tool I made for myself, then for two friends, then for about eight hundred strangers. It does almost nothing on purpose.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40, padding: "16px 0", borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)" }}>
          <div><div className="meta">YEAR</div><div className="numeric" style={{ fontSize: 17, marginTop: 4 }}>2024 — 2025</div></div>
          <div><div className="meta">ROLE</div><div style={{ fontSize: 17, marginTop: 4 }}>Design &amp; engineering</div></div>
          <div><div className="meta">TEAM</div><div style={{ fontSize: 17, marginTop: 4 }}>Just me</div></div>
          <div><div className="meta">STATUS</div><div style={{ fontSize: 17, marginTop: 4, color: "var(--accent-600)" }}>● Shipped</div></div>
        </div>
      </section>

      <section style={{ padding: "32px 0" }}>
        <div style={{ aspectRatio: "3/2", background: "linear-gradient(160deg, var(--paper-200) 0%, var(--paper-300) 100%)", border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-700)" }}>FIG. 01 — HOME SCREEN, MARCH 2024</span>
        </div>
      </section>

      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48 }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ THE PROBLEM</div>
        <div style={{ maxWidth: "60ch" }}>
          <p style={{ fontSize: 19, lineHeight: 1.6 }}>
            I had a habit of writing long notes to myself in plain text files, then losing them. Existing apps wanted me to tag, link, organize, and synchronize. I wanted to <em>write</em>, then close the laptop.
          </p>
          <p style={{ fontSize: 17, marginTop: 16, color: "var(--fg-2)" }}>
            The first version was a single HTML file with one <code>contenteditable</code> div and a localStorage call. I used it for three months before I let anyone else see it.
          </p>
        </div>
      </section>

      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ aspectRatio: "4/5", background: "var(--ink-900)", border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-300)" }}>FIG. 02 — DARK MODE</span>
        </div>
        <div style={{ aspectRatio: "4/5", background: "var(--paper-100)", border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-700)" }}>FIG. 03 — TYPEWRITER MODE</span>
        </div>
      </section>

      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48 }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ WHAT I LEARNED</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 17, lineHeight: 1.7 }}>
          <li style={{ borderTop: "1px solid var(--rule-soft)", padding: "14px 0" }}>01 — Removing features is harder than adding them, and more rewarding.</li>
          <li style={{ borderTop: "1px solid var(--rule-soft)", padding: "14px 0" }}>02 — Eight hundred users is more than enough. I learned more from the first ten.</li>
          <li style={{ borderTop: "1px solid var(--rule-soft)", borderBottom: "1px solid var(--rule-soft)", padding: "14px 0" }}>03 — A tool for one person is allowed to be strange.</li>
        </ul>
      </section>

      <section style={{ padding: "32px 0 0 0", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--ink-900)" }}>
        <Button variant="ghost" onClick={onBack}>← All work</Button>
        <Button variant="filled" as="a" href="#">Visit gonggchaek.kim ↗</Button>
      </section>
    </main>
  );
}
window.CaseStudy = CaseStudy;
