function AboutScreen() {
  const cv = [
    { y: "2024 — now",  what: "ML Engineer",       where: "Industrial domain", note: "Forecasting + anomaly detection on continuous-process data." },
    { y: "2025 — now",  what: "Local-LLM tinkerer", where: "Side project",      note: "On-device agent runtime, open source." },
    { y: "2023 — 2024", what: "Data Scientist",    where: "(redacted) team",    note: "Feature pipelines, model evaluation, hand-off to ops." },
    { y: "2022 — 2023", what: "Research assistant", where: "University lab",    note: "Time-series modeling for industrial sensors." },
  ];

  return (
    <main>
      <section style={{ padding: "64px 0 32px 0", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <div className="meta" style={{ marginBottom: 16 }}>§ ABOUT</div>
          <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "18ch" }}>
            Heetae Kim — AI/ML developer.
          </h1>
          <p style={{ marginTop: 28, fontSize: 19, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: "58ch" }}>
            Based in Seoul. I build forecasting and anomaly-detection models for steel-plant process data, ship a small iOS app on the side, and tinker with on-device LLM agents. I care more about long-term model trust than first-week metrics.
          </p>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: "58ch" }}>
            저는 산업 공정 데이터로 ML 모델을 만듭니다. 모델 자체보다 그 모델이 6개월 뒤에도 신뢰받을 수 있도록 만드는 일을 더 중요하게 생각합니다.
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
          <div className="meta" style={{ marginBottom: 8 }}>§ STACK</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>Python · PyTorch · scikit-learn · LightGBM · pandas · Swift · SwiftUI · Core ML · llama.cpp · Ollama.</p>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>§ DOMAINS</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>Iron &amp; steel process data, multi-sensor regression, anomaly detection on imbalanced labels, on-device inference, small iOS apps.</p>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>§ INTERESTED IN</div>
          <p style={{ fontSize: 15, color: "var(--fg-2)", lineHeight: 1.7 }}>Long-horizon model maintenance, label-quality auditing, small models that ship, the boring 80%.</p>
        </div>
      </section>
    </main>
  );
}

export default AboutScreen;
