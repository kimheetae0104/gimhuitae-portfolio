/* global React */
function NowScreen() {
  const items = [
    { k: "Reading", v: "John Berger — 《Ways of Seeing》, 다시.", n: "두 번째 읽으니 처음 안 보이던 줄이 보임." },
    { k: "Making", v: "한 사람을 위한 작은 책 만들기 도구.", n: "v0.3 — 종이 사이즈 고를 수 있게." },
    { k: "Listening", v: "Nils Frahm — All Melody, 새벽에.", n: "" },
    { k: "Walking", v: "한강 망원에서 합정까지, 매주 화요일 아침.", n: "지난주엔 비가 와서 못 갔다." },
    { k: "Eating", v: "동네 김밥집의 멸치김밥.", n: "1500원, 점심 거의 매번." },
    { k: "Avoiding", v: "트위터, 일찍 자는 밤.", n: "둘 다 잘 안 됨." },
  ];
  return (
    <main>
      <section style={{ padding: "64px 0 24px 0" }}>
        <div className="meta" style={{ marginBottom: 16 }}>§ NOW — 2026.04.27</div>
        <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "18ch" }}>
          What I'm doing <span style={{ color: "var(--accent-500)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>right now</span>.
        </h1>
        <p style={{ marginTop: 24, fontSize: 17, color: "var(--fg-2)", maxWidth: "56ch", lineHeight: 1.7 }}>
          이 페이지는 매달 한 번 업데이트됩니다. 어제 무얼 했는지, 오늘 무얼 하고 있는지, 너무 길지 않게.
          <br/>
          <span className="meta" style={{ marginTop: 8, display: "inline-block", color: "var(--fg-3)" }}>INSPIRED BY <a href="https://nownownow.com" target="_blank" rel="noreferrer">nownownow.com</a></span>
        </p>
      </section>

      <section style={{ padding: "32px 0 96px 0" }}>
        <div style={{ borderTop: "1px solid var(--ink-900)" }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1.2fr", padding: "20px 0", borderBottom: "1px solid var(--rule-soft)", alignItems: "baseline", gap: 24 }}>
              <span className="meta numeric">{it.k.toUpperCase()}</span>
              <span style={{ fontSize: 19, lineHeight: 1.5 }}>{it.v}</span>
              <span style={{ fontSize: 14, color: "var(--fg-3)", fontStyle: "italic" }}>{it.n}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "20px 24px", border: "1px solid var(--rule-soft)", background: "var(--bg-soft)", maxWidth: "60ch" }}>
          <div className="meta" style={{ marginBottom: 6 }}>§ NOTE TO SELF</div>
          <p style={{ margin: 0, fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6 }}>
            "지금"을 적는 일은 미래의 나를 위한 일이기도 하다. 사 년 뒤에 이 페이지를 다시 볼 수 있게.
          </p>
        </div>
      </section>
    </main>
  );
}
window.NowScreen = NowScreen;
