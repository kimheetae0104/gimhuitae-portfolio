function Footer() {
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
          <div>Seoul, KR</div>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>ELSEWHERE</div>
          <div><a href="https://github.com/kimheetae0104" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--rule-soft)" }}>github.com/kimheetae0104 ↗</a></div>
          <div style={{ color: "var(--fg-3)" }}>linkedin · on request</div>
          <div style={{ color: "var(--fg-3)" }}>resume · on request</div>
        </div>
        <div>
          <div className="meta" style={{ marginBottom: 8 }}>NOW</div>
          <div>Open to ML roles.</div>
          <div>Maintaining the LHV model.</div>
          <div>Reading: Designing ML Systems.</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--rule-soft)", marginTop: 32, paddingTop: 14, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <span>© 2026 Heetae Kim</span>
        <span>No rights reserved · be kind</span>
      </div>
    </footer>
  );
}

export default Footer;
