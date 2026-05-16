function Header({ active, onNav }) {
  const links = [
    { id: "home", label: "work" },
    { id: "writing", label: "writing" },
    { id: "about", label: "about" },
    { id: "contact", label: "contact ↗" },
  ];
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
        <span className="meta" style={{ marginLeft: 8 }}>heetae kim · seoul</span>
      </a>
      <nav style={{ display: "flex", gap: 28, fontSize: 14 }}>
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
      </nav>
    </header>
  );
}

export default Header;
