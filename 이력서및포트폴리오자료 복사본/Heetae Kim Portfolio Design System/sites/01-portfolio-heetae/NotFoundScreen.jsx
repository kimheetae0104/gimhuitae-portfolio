/* global React */
function NotFoundScreen({ onHome }) {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "96px 0" }}>
      <div style={{ textAlign: "center", maxWidth: "44ch" }}>
        <div className="meta" style={{ marginBottom: 24, color: "var(--accent-500)" }}>§ HTTP 404 — PAGE NOT FOUND</div>
        <h1 style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 120, letterSpacing: "-0.04em", lineHeight: 1, margin: 0 }}>
          4<span style={{ color: "var(--accent-500)" }}>0</span>4
        </h1>
        <p style={{ marginTop: 24, fontSize: 19, color: "var(--fg-1)" }}>
          이 페이지는 어딘가로 갔습니다.<br/>
          <span style={{ color: "var(--fg-3)" }}>This page went somewhere.</span>
        </p>
        <p style={{ marginTop: 16, fontSize: 14, color: "var(--fg-3)", lineHeight: 1.6, maxWidth: "40ch", margin: "16px auto 0" }}>
          원래 있던 자리는 비어있습니다. 누가 가져갔거나, 처음부터 없었을지도 모릅니다.
        </p>
        <button onClick={onHome} style={{
          marginTop: 32, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase",
          padding: "10px 22px", border: "1px solid var(--ink-900)", background: "var(--ink-900)", color: "var(--paper-50)", cursor: "pointer",
        }}>← Take me home</button>
      </div>
    </main>
  );
}
window.NotFoundScreen = NotFoundScreen;
