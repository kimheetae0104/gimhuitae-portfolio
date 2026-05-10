/* global React, Button */
const ALL_WORK = [
  {
    idx: 4, slug: "local-agent",
    title: "Local AI agent",
    titleKo: "로컬 AI 에이전트",
    role: "LLM · ON-DEVICE TOOLING",
    year: "2025", status: "shipped",
    metric: "100% on-device",
    summary: "A small agent runtime that runs 7B–13B models locally and calls a curated set of tools (file, shell, web). Built to keep client data off the cloud.",
  },
  {
    idx: 3, slug: "jann",
    title: "JANN — FoodAlchemi iOS app",
    titleKo: "JANN 프로젝트",
    role: "iOS · SWIFT · ML",
    year: "2025", status: "shipped",
    metric: "App Store · live",
    summary: "An iOS app that helps users compose meals from what they already have. Built solo in Swift with on-device ML for ingredient recognition.",
  },
  {
    idx: 2, slug: "skinpass",
    title: "Unplanned skinpass anomaly",
    titleKo: "비계획 Skinpass 예측",
    role: "ANOMALY · CLASSIFICATION",
    year: "2024", status: "shipped",
    metric: "F1 0.88 · recall 0.91",
    summary: "Predicts unplanned skinpass events on the cold-rolling line a few minutes before they happen, so operators can step in instead of reacting.",
  },
  {
    idx: 1, slug: "lhv",
    title: "Hot-stove LHV prediction",
    titleKo: "열풍로 발열량 LHV 예측",
    role: "FORECASTING · TIME SERIES",
    year: "2024", status: "shipped",
    metric: "R² 0.94 · MAE 38 kcal/Nm³",
    summary: "Predicts blast-furnace hot-stove LHV from gas-mix and combustion telemetry. Stable across coke-rate shifts after a re-training schedule was added.",
  },
];

const STATUS_STYLES = {
  shipped:  { bg: "var(--accent-100)", fg: "var(--accent-600)" },
  internal: { bg: "var(--bg-mute)",    fg: "var(--ink-700)"   },
  draft:    { bg: "transparent",       fg: "var(--fg-3)", border: "1px dashed rgba(20,17,13,.32)" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.shipped;
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 999, background: s.bg, color: s.fg, border: s.border || "none",
    }}>{status}</span>
  );
}

function WorkIndex({ onOpenCase, onBack }) {
  return (
    <main>
      <section style={{ padding: "64px 0 28px 0" }}>
        <div className="meta" style={{ marginBottom: 16 }}>§ INDEX · {ALL_WORK.length} PROJECTS · 2024–2025</div>
        <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "20ch" }}>
          Four projects, with the numbers attached.
        </h1>
        <p className="lead" style={{ maxWidth: "62ch", marginTop: 24, color: "var(--fg-2)" }}>
          Industrial ML — forecasting on continuous-process data, anomaly detection on discrete events, plus a side track on local LLM tooling. Each entry includes the headline metric; click through for the spec sheet and retro.
        </p>
      </section>

      <section>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1.4fr 1fr 200px 120px", padding: "10px 0", borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>
          <span>№</span><span>Project</span><span>Role · stack</span><span>Headline metric</span><span style={{ textAlign:"right" }}>Status</span>
        </div>
        {ALL_WORK.map(r => (
          <a key={r.idx} href="#" onClick={(e)=>{e.preventDefault(); onOpenCase(r.idx);}}
             style={{ display: "grid", gridTemplateColumns: "56px 1.4fr 1fr 200px 120px", padding: "20px 0", borderBottom: "1px solid var(--rule-soft)", textDecoration: "none", color: "inherit", alignItems: "baseline", gap: 16 }}>
            <span className="meta numeric">{String(r.idx).padStart(2,"0")}</span>
            <span>
              <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>{r.title}</div>
              <div className="meta" style={{ marginTop: 4, color: "var(--fg-3)" }}>{r.titleKo} · {r.year}</div>
            </span>
            <span className="meta">{r.role}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--accent-600)" }}>{r.metric}</span>
            <span style={{ textAlign: "right" }}><StatusPill status={r.status}/></span>
          </a>
        ))}
        <div style={{ marginTop: 40 }}>
          <Button variant="ghost" onClick={onBack}>← Back home</Button>
        </div>
      </section>
    </main>
  );
}
window.WorkIndex = WorkIndex;
