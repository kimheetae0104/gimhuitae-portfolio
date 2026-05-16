
const CASES = {
  1: {
    titleEn: "Hot-stove LHV prediction",
    titleKo: "열풍로 발열량 LHV 예측",
    summary: "Predicting blast-furnace hot-stove LHV from gas-mix and combustion telemetry, so operators can stabilize the stove before the next charge.",
    year: "2024",
    role: "Modeling lead",
    team: "1 ML, 2 process engineers",
    status: "Shipped (internal)",
    domain: "Iron & steel · blast furnace",
    stack: ["Python", "scikit-learn", "XGBoost", "PyTorch", "pandas"],
    metrics: [
      { k: "R²",  v: "0.94",  sub: "test set, 6 months" },
      { k: "MAE", v: "38",    sub: "kcal/Nm³" },
      { k: "Δ vs. baseline", v: "−42%", sub: "MAE drop" },
    ],
    figs: [
      { label: "FIG. 01 — PREDICTED vs. ACTUAL LHV (TEST PERIOD)", bg: "linear-gradient(170deg, var(--accent-100) 0%, #B7C2EE 100%)" },
      { label: "FIG. 02 — RESIDUAL DRIFT AFTER COKE-RATE SHIFT", bg: "var(--ink-900)", dark: true },
    ],
    problem: "The LHV of hot-stove combustion gas drifts as the upstream gas mix changes. Operators were reading it off a delayed sensor and over-correcting; we wanted a model that gave them the next 10–30 minutes ahead of the sensor.",
    approach: "Tried linear baselines first (Ridge, GBM) on hand-engineered features — gas ratios, lag windows, stove-cycle phase. Moved to a small MLP once features stopped helping. The decisive change wasn't the model — it was a re-training schedule pegged to coke-rate change events.",
    retro: [
      "Static models look great on a 6-month split and quietly fail on month 7. Pegging re-training to a domain event (coke-rate change) was worth more than any architecture choice.",
      "Process engineers spotted a feature leak I'd missed — one of the 'predictors' was downstream of the LHV sensor. Domain review beats more cross-validation.",
      "A 4-feature linear model got 80% of the way. I should have stopped sooner and shipped that, then iterated.",
    ],
  },
  2: {
    titleEn: "Unplanned skinpass anomaly",
    titleKo: "비계획 Skinpass 예측",
    summary: "Predicting unplanned skinpass events on the cold-rolling line a few minutes before they happen, so operators can step in instead of reacting.",
    year: "2024",
    role: "Modeling + data",
    team: "1 ML, 1 ops engineer",
    status: "Shipped (internal)",
    domain: "Iron & steel · cold rolling",
    stack: ["Python", "LightGBM", "imbalanced-learn", "pandas", "PostgreSQL"],
    metrics: [
      { k: "F1",     v: "0.88", sub: "minority class" },
      { k: "Recall", v: "0.91", sub: "5-min lead time" },
      { k: "FPR",    v: "0.04", sub: "false positives" },
    ],
    figs: [
      { label: "FIG. 01 — EVENT TIMELINE WITH PREDICTED ALERTS", bg: "linear-gradient(180deg, var(--paper-200) 0%, var(--paper-300) 100%)" },
      { label: "FIG. 02 — CONFUSION MATRIX (TEST SPLIT)", bg: "var(--ink-900)", dark: true },
    ],
    problem: "Unplanned skinpass passes — corrective re-rolls — are rare but costly. The historical labels were noisy: some events were logged late, some weren't logged at all. Imbalanced and partially mis-labeled.",
    approach: "Built a feature store from line telemetry (load, tension, speed, gauge deviation) at 1s resolution, aggregated to 30s windows. Trained a LightGBM with class-weighted loss; later switched to a focal-loss variant. The biggest gain came from cleaning labels with a simple rules-based pre-filter, not from the model.",
    retro: [
      "Spent two weeks tuning the model when the labels were the actual bottleneck. Always audit labels first.",
      "Operators trusted the model only after we showed them three weeks of false positives and explained each one. Calibrated probability + a one-line reason matters more than raw F1.",
      "Hand-off to ops needed a static dashboard, not an API. The model is only as useful as the screen it lives on.",
    ],
  },
  3: {
    titleEn: "JANN — FoodAlchemi iOS app",
    titleKo: "JANN 프로젝트",
    summary: "An iOS app that helps users decide what to cook from ingredients they already have. Built solo, end-to-end — design, Swift code, and on-device ML.",
    year: "2025",
    role: "Solo — design, iOS, ML",
    team: "Solo",
    status: "Live (App Store)",
    domain: "iOS · consumer · food",
    stack: ["Swift", "SwiftUI", "Core ML", "Vision", "PyTorch (training)"],
    metrics: [
      { k: "Status",   v: "LIVE", sub: "App Store" },
      { k: "Built by", v: "1",    sub: "solo project" },
      { k: "On-device", v: "100%", sub: "no server" },
    ],
    figs: [
      { label: "FIG. 01 — INGREDIENT RECOGNITION FLOW", bg: "linear-gradient(170deg, #DCE3F6 0%, #4F6FE0 100%)", dark: true },
      { label: "FIG. 02 — RECIPE COMPOSER UI", bg: "var(--paper-100)" },
    ],
    problem: "(Placeholder) Most recipe apps assume you start with a recipe and shop for it. JANN starts with what's in the fridge and walks backward to a meal. Needs to feel fast and stay private — no server, no account.",
    approach: "(Placeholder) Trained an ingredient-recognition model in PyTorch, exported to Core ML for on-device inference. SwiftUI for the front-end, with the recipe-composition logic running entirely locally. Shipped to the App Store as a small, paid-tier-free app.",
    retro: [
      "(Placeholder) The hardest part wasn't the model — it was the App Store review, copy, and screenshots. Plan for a week of non-engineering work.",
      "(Placeholder) On-device inference makes the privacy story honest, and made the app feel snappy. Worth every gram of size budget.",
      "(Placeholder) Solo end-to-end taught me where my weak spots are. I'd hire help on UX writing next time.",
    ],
  },
  4: {
    titleEn: "Local AI agent",
    titleKo: "로컬 AI 에이전트",
    summary: "A small agent runtime that runs 7B–13B models locally and calls a curated set of tools (file, shell, web). Built so client data never leaves the machine.",
    year: "2025",
    role: "Tooling · architecture",
    team: "Solo",
    status: "Open-source side project",
    domain: "LLM tooling · on-device",
    stack: ["Python", "llama.cpp", "Ollama", "FastAPI", "TypeScript (UI)"],
    metrics: [
      { k: "Latency", v: "1.8s", sub: "first token, M2 Air" },
      { k: "Tools",   v: "12",   sub: "curated set" },
      { k: "Cloud",   v: "0%",   sub: "data leaves device" },
    ],
    figs: [
      { label: "FIG. 01 — TOOL-CALL TRACE (LOCAL 7B)", bg: "var(--paper-100)" },
      { label: "FIG. 02 — TOKEN-PER-SECOND BY MODEL SIZE", bg: "var(--ink-900)", dark: true },
    ],
    problem: "Most agent frameworks assume a hosted API. For sensitive industrial data — and for honest tinkering — I wanted something that ran fully on a laptop, with the same ergonomics.",
    approach: "Thin orchestration layer over llama.cpp / Ollama, JSON-schema tool calling, a local trace viewer for debugging. Curated rather than open-ended tool list — the smaller model is more reliable when the surface area is small.",
    retro: [
      "Smaller models behave like junior teammates: clear instructions and a short tool menu beat any prompt-engineering trick.",
      "The trace viewer was the real product. I use it more than the agent itself.",
      "On-device latency is fine; on-device memory is the actual ceiling. Picking the model size is a UX decision, not just a perf one.",
    ],
  },
};

function CaseStudy({ projectId = 1, onBack }) {
  const c = CASES[projectId] || CASES[1];

  return (
    <main>
      <section style={{ padding: "48px 0 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <span className="meta">§ № {String(projectId).padStart(2,"0")} / 04 — SPEC SHEET</span>
          <Button variant="text" onClick={onBack}>← Index</Button>
        </div>
        <div className="meta" style={{ color: "var(--fg-3)", marginBottom: 12 }}>{c.titleKo}</div>
        <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.04, maxWidth: "16ch" }}>
          {c.titleEn}
        </h1>
        <p className="lead" style={{ maxWidth: "62ch", marginTop: 24 }}>
          {c.summary}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40, padding: "16px 0", borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)" }}>
          <div><div className="meta">YEAR</div><div className="numeric" style={{ fontSize: 17, marginTop: 4 }}>{c.year}</div></div>
          <div><div className="meta">ROLE</div><div style={{ fontSize: 17, marginTop: 4 }}>{c.role}</div></div>
          <div><div className="meta">TEAM</div><div style={{ fontSize: 17, marginTop: 4 }}>{c.team}</div></div>
          <div><div className="meta">STATUS</div><div style={{ fontSize: 17, marginTop: 4, color: "var(--accent-600)" }}>● {c.status}</div></div>
        </div>
      </section>

      {/* Headline metrics */}
      <section style={{ padding: "16px 0 32px 0" }}>
        <div className="meta" style={{ marginBottom: 16 }}>§ HEADLINE METRICS</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${c.metrics.length}, 1fr)`, gap: 0, border: "1px solid var(--ink-900)" }}>
          {c.metrics.map((m, i) => (
            <div key={i} style={{ padding: "24px 24px 20px", borderRight: i < c.metrics.length - 1 ? "1px solid var(--ink-900)" : "none" }}>
              <div className="meta" style={{ color: "var(--fg-3)" }}>{m.k}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 44, letterSpacing: "-0.02em", marginTop: 6, color: "var(--accent-600)" }}>{m.v}</div>
              <div className="meta" style={{ marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div className="meta" style={{ marginTop: 8, color: "var(--fg-3)" }}>Numbers are illustrative for portfolio purposes; some are approximate or rounded under NDA.</div>
      </section>

      {/* Figure 01 — full bleed */}
      <section style={{ padding: "16px 0" }}>
        <div style={{ aspectRatio: "3/1.4", background: c.figs[0].bg, border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: c.figs[0].dark ? "var(--ink-300)" : "var(--ink-700)" }}>{c.figs[0].label}</span>
        </div>
      </section>

      {/* Stack */}
      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48 }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ STACK</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {c.stack.map((s, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", padding: "6px 12px", borderRadius: 999, border: "1px solid var(--ink-900)", color: "var(--ink-900)" }}>{s}</span>
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", padding: "6px 12px", borderRadius: 999, background: "var(--bg-mute)", color: "var(--fg-3)" }}>+ domain ({c.domain})</span>
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48, borderTop: "1px solid var(--rule-soft)" }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ PROBLEM</div>
        <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "62ch" }}>{c.problem}</p>
      </section>

      {/* Approach */}
      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48, borderTop: "1px solid var(--rule-soft)" }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ APPROACH</div>
        <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "62ch" }}>{c.approach}</p>
      </section>

      {/* Figure 02 */}
      <section style={{ padding: "16px 0" }}>
        <div style={{ aspectRatio: "3/1.4", background: c.figs[1].bg, border: "1px solid var(--ink-900)", position: "relative" }}>
          <span style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: c.figs[1].dark ? "var(--ink-300)" : "var(--ink-700)" }}>{c.figs[1].label}</span>
        </div>
      </section>

      {/* Retro */}
      <section style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: 48, borderTop: "1px solid var(--rule-soft)" }}>
        <div className="meta" style={{ paddingTop: 4 }}>§ RETROSPECTIVE</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 17, lineHeight: 1.7, maxWidth: "62ch" }}>
          {c.retro.map((r, i) => (
            <li key={i} style={{ borderTop: "1px solid var(--rule-soft)", padding: "14px 0" }}>
              <span className="meta numeric" style={{ marginRight: 12, color: "var(--fg-3)" }}>{String(i+1).padStart(2,"0")}</span>
              {r}
            </li>
          ))}
          <li style={{ borderTop: "1px solid var(--rule-soft)" }}/>
        </ul>
      </section>

      <section style={{ padding: "32px 0 0 0", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--ink-900)" }}>
        <Button variant="ghost" onClick={onBack}>← Index</Button>
        <Button variant="filled" as="a" href="https://github.com/kimheetae0104">View on GitHub ↗</Button>
      </section>
    </main>
  );
}

export default CaseStudy;
