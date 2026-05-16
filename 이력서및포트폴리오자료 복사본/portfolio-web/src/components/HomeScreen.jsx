const PROJECTS = [
  {
    idx: 1, slug: "lhv",
    title: "Hot-stove LHV prediction",
    titleKo: "열풍로 발열량 LHV 예측",
    role: "FORECASTING · TIME SERIES",
    year: "2024",
    metric: "R² 0.94",
    bg: "linear-gradient(170deg, #DCE3F6 0%, #4F6FE0 100%)",
  },
  {
    idx: 2, slug: "skinpass",
    title: "Unplanned skinpass anomaly",
    titleKo: "비계획 Skinpass 예측",
    role: "ANOMALY · CLASSIFICATION",
    year: "2024",
    metric: "F1 0.88",
    bg: "#0E0E10", dotted: true,
  },
  {
    idx: 3, slug: "jann",
    title: "JANN — FoodAlchemi iOS app",
    titleKo: "JANN 프로젝트",
    role: "iOS · SWIFT · ML",
    year: "2025",
    metric: "shipped to App Store",
    bg: "linear-gradient(180deg, #EFEFF1 0%, #BCBCC2 100%)",
  },
  {
    idx: 4, slug: "local-agent",
    title: "Local AI agent",
    titleKo: "로컬 AI 에이전트",
    role: "LLM · TOOLING",
    year: "2025",
    metric: "100% on-device",
    bg: "#EFEFF1",
  },
];

function HomeScreen({ onOpenWork, onOpenCase }) {
  return (
    <main>
      <section style={{ padding: "96px 0 56px 0" }}>
        <div className="meta" style={{ marginBottom: 24 }}>§ HEETAE KIM — AI/ML DEVELOPER · 2026.04</div>
        <h1 className="display" style={{ maxWidth: "20ch" }}>
          AI/ML developer.<br/>
          <span style={{ color: "var(--accent-500)" }}>4 projects</span> —<br/>
          industrial ML, iOS, local agents.
        </h1>
        <p className="lead" style={{ maxWidth: "62ch", marginTop: 32, color: "var(--fg-2)" }}>
          I build forecasting and anomaly-detection models for steel-plant process data, ship a small iOS app on the side, and tinker with on-device LLM agents. Python · PyTorch · scikit-learn · Swift · llama.cpp. <a href="#" onClick={(e)=>{e.preventDefault(); onOpenCase(1);}}>Start with the LHV model →</a>
        </p>
      </section>

      <Marquee items={["selected work, 2024–2025", "industrial ML · time-series · anomaly", "open to roles in seoul / remote", "github.com/kimheetae0104"]} />

      <section style={{ padding: "64px 0 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <div className="meta">§ 02 — SELECTED WORK</div>
            <h2 style={{ marginTop: 8, fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>Four projects, with the numbers attached.</h2>
          </div>
          <Button variant="ghost" onClick={onOpenWork}>Index →</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 16, borderTop: "1px solid var(--ink-900)" }}>
          {PROJECTS.map(p => (
            <div key={p.idx} onClick={()=>onOpenCase(p.idx)} style={{ cursor: "pointer" }}>
              <ProjectTile index={p.idx} title={p.title} titleEn={p.role} year={p.year} bg={p.bg} dotted={p.dotted} meta={p.metric} />
              <div className="meta" style={{ marginTop: 10, color: "var(--fg-3)" }}>{p.titleKo}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 0 32px 0" }}>
        <div className="meta" style={{ marginBottom: 8 }}>§ 03 — NOTES &amp; RETROS</div>
        <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 16 }}>What worked, what didn't, what I'd redo.</h2>
        {[
          { d: "2025.11.18", t: "Why our LHV model degrades after every coke-rate change", k: "retro · 7 min" },
          { d: "2025.08.02", t: "비계획 Skinpass: 데이터 라벨이 거짓말한 이야기", k: "post-mortem · 5 min" },
          { d: "2025.05.20", t: "Running a 7B model on a 2019 ThinkPad — and why I keep doing it", k: "tinkering · 6 min" },
        ].map((row, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "120px 1fr 200px", padding: "14px 0", borderTop: "1px solid var(--rule-soft)", textDecoration: "none", color: "inherit", alignItems: "baseline" }}>
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

export default HomeScreen;
