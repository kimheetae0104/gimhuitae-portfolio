/* global React */
function Footer({ onTrigger404 }) {
  return (
    <footer style={{ marginTop: 96, paddingTop: 32, borderTop: "1px solid var(--ink-900)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 24, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-2)" }}>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>COLOPHON</div>
          <div>Set in Plus Jakarta Sans &amp;<br/>Space Mono. Built in plain HTML.</div>
          <div style={{ marginTop: 8, color: "var(--fg-3)" }}>Last updated 2026.04.27.</div>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>CONTACT</div>
          <div>hello@heetae.kim</div>
          <div>+82 10 0000 0000</div>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>ELSEWHERE</div>
          <div>github.com/heetae ↗</div>
          <div>are.na/heetae ↗</div>
          <div>read.cv/heetae ↗</div>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>NOW</div>
          <div>Reading 부분과 전체.</div>
          <div>Walking the river.</div>
          <div>Open to work, sometimes.</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--rule-soft)", marginTop: 32, paddingTop: 14, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <span>© 2026 Heetae Kim</span>
        <span>
          <a href="#" onClick={(e)=>{ e.preventDefault(); onTrigger404 && onTrigger404(); }} style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted var(--fg-4)" }}>404</a>
          <span style={{ margin: "0 10px" }}>·</span>
          No rights reserved · be kind
        </span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
