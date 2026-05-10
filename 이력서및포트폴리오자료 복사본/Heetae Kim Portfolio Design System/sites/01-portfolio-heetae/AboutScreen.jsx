/* global React */
function AboutScreen() {
  const cv = [
    { y: "2024 — now",  what: "Independent", where: "Seoul", note: "Design & front-end for small teams." },
    { y: "2022 — 2024", what: "Senior Designer", where: "(redacted) — fintech", note: "Design system, web app, brand." },
    { y: "2020 — 2022", what: "Designer", where: "Studio mid-summer", note: "Editorial, identity, typography." },
    { y: "2019 — 2020", what: "Intern", where: "(redacted) — agency", note: "Mostly listening." },
  ];

  return (
    <main>
      <section style={{ padding: "64px 0 32px 0", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <div className="meta" style={{ marginBottom: 16 }}>§ ABOUT</div>
          <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "14ch" }}>
            I'm Heetae. I make small things slowly.
          </h1>
          <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: "52ch" }}>
            I live in Seoul. I trained as a graphic designer and learned to code by accident. I prefer projects with a known end. I read a lot, walk more, and answer email on Wednesdays.
          </p>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: "52ch" }}>
            저는 작은 도구를 천천히 만드는 일을 좋아합니다. 한 사람을 위한 디자인이 결국 모두에게 가장 친절하다고 믿습니다.
          </p>
        </div>
        <div style={{ aspectRatio: "4/5", background: "linear-gradient(180deg, var(--paper-200) 0%, var(--paper-300) 100%)", border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-700)" }}>PORTRAIT — UNAVAILABLE</span>
        </div>
      </section>

      <section style={{ padding: "48px 0" }}>
        <div className="meta" style={{ marginBottom: 12 }}>§ CV — ABBREVIATED</div>
        <div style={{ borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)" }}>
          {cv.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr 1.4fr", padding: "16px 0", borderTop: i ? "1px solid var(--rule-soft)" : "none", alignItems: "baseline" }}>
              <span className="meta numeric">{row.y}</span>
              <span style={{ fontSize: 17, fontWeight: 500 }}>{row.what}</span>
              <span style={{ fontSize: 15, color: "var(--fg-2)" }}>{row.where}</span>
              <span style={{ fontSize: 14, color: "var(--fg-3)" }}>{row.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>§ TOOLS</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>Figma, vim, a Muji notebook, Apple Notes, a kettle.</p>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>§ CLIENTS, SOMETIMES</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>Three studios, two non-profits, one bookshop in Mangwon-dong.</p>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>§ TEACHING</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>HTML for designers — a workshop I run twice a year. Free, small, in person.</p>
        </div>
      </section>
    </main>
  );
}
window.AboutScreen = AboutScreen;
