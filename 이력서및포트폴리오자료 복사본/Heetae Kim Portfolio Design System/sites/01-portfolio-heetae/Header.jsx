/* global React */
function HeaderV2({ active, onNav, onOpenPalette }) {
  const links = [
    { id: "home", label: "work" },
    { id: "writing", label: "writing" },
    { id: "now", label: "now" },
    { id: "about", label: "about" },
    { id: "contact", label: "contact" },
  ];
  const [time, setTime] = React.useState(() => fmt());
  const [theme, setTheme] = React.useState(() => (typeof document !== "undefined" ? document.documentElement.getAttribute("data-theme") || "" : ""));

  function fmt() {
    const d = new Date();
    const opts = { timeZone: "Asia/Seoul", hour12: false, hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("en-GB", opts).format(d);
  }
  React.useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("hk-theme", next); } catch {}
    setTheme(next);
  };

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 0", borderBottom: "1px solid var(--ink-900)",
      position: "sticky", top: 0, background: "var(--bg)", zIndex: 10,
    }}>
      <a href="#" onClick={(e)=>{e.preventDefault(); onNav("home");}} style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none", color: "inherit" }}>
        <span style={{ color: "var(--accent-500)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18 }}>[</span>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18 }}>HK</span>
        <span style={{ color: "var(--accent-500)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18 }}>]</span>
        <span className="meta" style={{ marginLeft: 8 }}>seoul · <span className="numeric">{time}</span> KST</span>
      </a>
      <nav style={{ display: "flex", gap: 24, fontSize: 14, alignItems: "center" }}>
        {links.map(l => {
          const isActive = active === l.id || (active === "case" && l.id === "home") || (active === "work" && l.id === "home");
          return (
            <a key={l.id} href="#" onClick={(e)=>{e.preventDefault(); onNav(l.id);}}
               style={{
                 color: isActive ? "var(--ink-900)" : "var(--ink-700)",
                 textDecoration: "none",
                 borderBottom: isActive ? "2px solid var(--ink-900)" : "2px solid transparent",
                 paddingBottom: 2,
               }}>
              {l.label}
            </a>
          );
        })}
        <button onClick={onOpenPalette} title="Command palette" style={{
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
          border: "1px solid var(--rule-soft)", background: "transparent", color: "var(--fg-3)",
          padding: "4px 10px", cursor: "pointer", borderRadius: 4,
        }}>⌘K</button>
        <button onClick={toggleTheme} title="Toggle dark mode" aria-label="Toggle dark mode" style={{
          width: 30, height: 30, borderRadius: 999, border: "1px solid var(--rule-soft)",
          background: "transparent", cursor: "pointer", display: "grid", placeItems: "center",
          color: "var(--fg-2)", fontSize: 14,
        }}>{theme === "dark" ? "☼" : "☽"}</button>
      </nav>
    </header>
  );
}
window.HeaderV2 = HeaderV2;
