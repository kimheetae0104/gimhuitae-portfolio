/* global React, Button */
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  return (
    <main>
      <section style={{ padding: "80px 0", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 96, alignItems: "start" }}>
        <div>
          <div className="meta" style={{ marginBottom: 16 }}>§ CONTACT</div>
          <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "14ch" }}>
            Say hello.<br/>I read everything.
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65, color: "var(--fg-2)", maxWidth: "44ch" }}>
            Best for: small projects, side projects, second opinions, lunch in 망원동. Not for: cold sales, NDA-first conversations.
          </p>
          <div style={{ marginTop: 40, fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.9 }}>
            <div><span className="meta" style={{ display: "inline-block", width: 80 }}>EMAIL</span> hello@heetae.kim</div>
            <div><span className="meta" style={{ display: "inline-block", width: 80 }}>TEL</span> +82 10 0000 0000</div>
            <div><span className="meta" style={{ display: "inline-block", width: 80 }}>HOURS</span> WED 10:00 — 17:00 KST</div>
          </div>
        </div>

        {!sent ? (
          <form onSubmit={(e)=>{ e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 20 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span className="meta">NAME</span>
              <input required placeholder="이름 / Name" style={{ fontFamily: "var(--font-sans)", fontSize: 16, padding: "10px 0", background: "transparent", border: 0, borderBottom: "1px solid var(--ink-900)", outline: "none", color: "var(--ink-900)" }}/>
            </label>
            <label style={{ display: "grid", gap: 4 }}>
              <span className="meta">EMAIL</span>
              <input required type="email" placeholder="you@somewhere.com" style={{ fontFamily: "var(--font-mono)", fontSize: 14, padding: "10px 0", background: "transparent", border: 0, borderBottom: "1px solid var(--ink-900)", outline: "none", color: "var(--ink-900)" }}/>
            </label>
            <label style={{ display: "grid", gap: 4 }}>
              <span className="meta">ABOUT</span>
              <textarea required rows="5" placeholder="짧게 적어주세요…" style={{ fontFamily: "var(--font-sans)", fontSize: 15, padding: "10px 0", background: "transparent", border: 0, borderBottom: "1px solid var(--ink-900)", outline: "none", color: "var(--ink-900)", resize: "none" }}/>
            </label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span className="meta">REPLIES WITHIN 7 DAYS</span>
              <Button variant="filled">Send →</Button>
            </div>
          </form>
        ) : (
          <div style={{ border: "1px solid var(--ink-900)", padding: 32, background: "var(--bg-mute)" }}>
            <div className="meta" style={{ color: "var(--accent-600)", marginBottom: 12 }}>● MESSAGE SENT</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>고맙습니다. — Thanks.</h3>
            <p style={{ fontSize: 15, color: "var(--fg-2)" }}>I'll write back on the next Wednesday I'm at my desk.</p>
          </div>
        )}
      </section>
    </main>
  );
}
window.ContactScreen = ContactScreen;
