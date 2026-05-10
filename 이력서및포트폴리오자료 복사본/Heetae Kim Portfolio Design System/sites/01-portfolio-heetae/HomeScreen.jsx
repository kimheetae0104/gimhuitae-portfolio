/* global React, ProjectTile, Marquee, Button */
const PROJECTS = [
  { idx: 1, title: "공책 (notebook for one)", titleEn: "PRODUCT · ENG", year: "2024", bg: "linear-gradient(160deg, #E2E2E5 0%, #BCBCC2 100%)" },
  { idx: 2, title: "소리 일기", titleEn: "RESEARCH · WRITING", year: "2023", bg: "#0E0E10", dotted: true },
  { idx: 3, title: "Slow Mail", titleEn: "BRANDING · WEB", year: "2023", bg: "linear-gradient(180deg, #FCE2DB 0%, #F26A4D 100%)" },
  { idx: 4, title: "한 페이지 (one page)", titleEn: "ZINE · PRINT", year: "2022", bg: "#EFEFF1" },
];

function HomeScreen({ onOpenWork, onOpenCase }) {
  return (
    <main>
      <section style={{ padding: "96px 0 56px 0" }}>
        <div className="meta" style={{ marginBottom: 24 }}>§ HEETAE KIM — PORTFOLIO · 2026.04</div>
        <h1 className="display" style={{ maxWidth: "16ch" }}>
          A small,<br/>careful site<br/>about <span style={{ color: "var(--accent-500)" }}>making</span>.
        </h1>
        <p className="lead" style={{ maxWidth: "52ch", marginTop: 32, color: "var(--fg-2)" }}>
          I'm Heetae — a designer and engineer in Seoul. I make small tools, write notes about them, and try to be honest about what worked and what didn't. <a href="#" onClick={(e)=>{e.preventDefault(); onOpenCase(1);}}>Start with the notebook →</a>
        </p>
      </section>

      <Marquee items={["selected work, 2021–2025", "design & engineering", "available for small projects", "seoul · kr", "hello@heetae.kim"]} />

      <section style={{ padding: "64px 0 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <div className="meta">§ 02 — SELECTED WORK</div>
            <h2 style={{ marginTop: 8, fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>Twelve things, in order of how proud I am.</h2>
          </div>
          <Button variant="ghost" onClick={onOpenWork}>See all 12 →</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 16, borderTop: "1px solid var(--ink-900)" }}>
          {PROJECTS.map(p => (
            <ProjectTile key={p.idx} index={p.idx} title={p.title} titleEn={p.titleEn} year={p.year} bg={p.bg} dotted={p.dotted} meta="DESIGN · ENG" onClick={()=>onOpenCase(p.idx)}/>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 0 32px 0" }}>
        <div className="meta" style={{ marginBottom: 8 }}>§ 03 — RECENT WRITING</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 16 }}>Notes, mostly to myself.</h2>
        {[
          { d: "2026.03.12", t: "On the second draft of a small tool", k: "process · 6 min" },
          { d: "2026.01.04", t: "두 개의 언어로 쓰는 일", k: "writing · 4 min" },
          { d: "2025.11.20", t: "What I learned shipping nothing for six months", k: "process · 8 min" },
        ].map((row, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "120px 1fr 160px", padding: "14px 0", borderTop: "1px solid var(--rule-soft)", textDecoration: "none", color: "inherit", alignItems: "baseline" }}>
            <span className="meta numeric">{row.d}</span>
            <span style={{ fontSize: 17 }}>{row.t}</span>
            <span className="meta" style={{ textAlign: "right" }}>{row.k}</span>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--rule-soft)" }}/>
      </section>
    </main>
  );
}
window.HomeScreen = HomeScreen;
