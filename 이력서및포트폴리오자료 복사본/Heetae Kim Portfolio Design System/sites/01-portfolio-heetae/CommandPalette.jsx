/* global React */
function CommandPalette({ open, onClose, onNav }) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open) { setQ(""); setTimeout(()=>inputRef.current && inputRef.current.focus(), 30); } }, [open]);

  const items = [
    { id: "home",     label: "Home",          hint: "Selected work, recent writing",      group: "Pages" },
    { id: "work",     label: "Work index",    hint: "All twelve projects",                 group: "Pages" },
    { id: "writing",  label: "Writing",       hint: "Notes, mostly to myself",             group: "Pages" },
    { id: "now",      label: "Now",           hint: "What I'm doing right now",            group: "Pages" },
    { id: "about",    label: "About",         hint: "Bio · CV · tools",                    group: "Pages" },
    { id: "contact",  label: "Contact",       hint: "Email, telegrams, postcards",         group: "Pages" },
    { id: "case:1",   label: "공책 (notebook for one)", hint: "2024 · product, eng",      group: "Cases" },
    { id: "case:2",   label: "소리 일기",      hint: "2023 · research, writing",            group: "Cases" },
    { id: "case:3",   label: "Slow Mail",     hint: "2023 · branding, web",                group: "Cases" },
    { id: "case:4",   label: "한 페이지 (one page)", hint: "2022 · zine, print",            group: "Cases" },
    { id: "ext:gh",   label: "GitHub ↗",      hint: "github.com/heetae",                   group: "Elsewhere", ext: "https://github.com/heetae" },
    { id: "ext:rcv",  label: "Read.cv ↗",     hint: "read.cv/heetae",                      group: "Elsewhere", ext: "https://read.cv/heetae" },
    { id: "ext:mail", label: "Email ↗",       hint: "hello@heetae.kim",                    group: "Elsewhere", ext: "mailto:hello@heetae.kim" },
    { id: "theme",    label: "Toggle dark mode", hint: "⇧⌘D",                              group: "Actions" },
    { id: "print",    label: "Save site as PDF", hint: "⌘P",                               group: "Actions" },
  ];

  const filtered = q.trim() === "" ? items : items.filter(it =>
    (it.label + " " + it.hint).toLowerCase().includes(q.toLowerCase())
  );
  const grouped = filtered.reduce((acc, it) => { (acc[it.group] = acc[it.group] || []).push(it); return acc; }, {});

  const [active, setActive] = React.useState(0);
  React.useEffect(() => { setActive(0); }, [q]);

  const flat = filtered;
  const handleKey = (e) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, flat.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); pick(flat[active]); }
  };

  const pick = (it) => {
    if (!it) return;
    if (it.ext) { window.open(it.ext, "_blank"); onClose(); return; }
    if (it.id === "theme") {
      const cur = document.documentElement.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", cur === "dark" ? "" : "dark");
      try { localStorage.setItem("hk-theme", cur === "dark" ? "" : "dark"); } catch {}
      onClose(); return;
    }
    if (it.id === "print") { window.print(); onClose(); return; }
    if (it.id.startsWith("case:")) { onNav("case", parseInt(it.id.split(":")[1], 10)); onClose(); return; }
    onNav(it.id); onClose();
  };

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "var(--overlay)", zIndex: 200,
      display: "grid", placeItems: "start center", paddingTop: "12vh",
    }}>
      <div onClick={e=>e.stopPropagation()} onKeyDown={handleKey} style={{
        width: "min(640px, 92vw)", background: "var(--bg)", border: "1px solid var(--ink-900)",
        boxShadow: "var(--shadow-3)", display: "flex", flexDirection: "column", maxHeight: "70vh",
      }}>
        <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--ink-900)" }}>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-500)", marginRight: 10 }}>›</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Jump to anything…  (try 'work', '소리', 'dark')"
            style={{
              flex: 1, fontFamily: "var(--font-sans)", fontSize: 17, border: 0, outline: "none",
              background: "transparent", color: "var(--ink-900)",
            }}/>
          <span className="meta" style={{ color: "var(--fg-3)" }}>ESC</span>
        </div>
        <div style={{ overflow: "auto", padding: "8px 0" }}>
          {Object.keys(grouped).length === 0 && (
            <div style={{ padding: "32px 18px", textAlign: "center", color: "var(--fg-3)" }}>
              아무것도 찾지 못했습니다 — <span style={{ fontFamily: "var(--font-mono)" }}>nothing</span>.
            </div>
          )}
          {Object.entries(grouped).map(([g, list]) => (
            <div key={g}>
              <div className="meta" style={{ padding: "10px 18px 6px", color: "var(--fg-3)" }}>{g.toUpperCase()}</div>
              {list.map((it) => {
                const idx = flat.indexOf(it);
                const isActive = idx === active;
                return (
                  <div key={it.id} onMouseEnter={()=>setActive(idx)} onClick={()=>pick(it)} style={{
                    display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "10px 18px", cursor: "pointer",
                    background: isActive ? "var(--bg-mute)" : "transparent",
                    borderLeft: isActive ? "2px solid var(--accent-500)" : "2px solid transparent",
                  }}>
                    <span style={{ fontSize: 15 }}>{it.label}</span>
                    <span className="meta" style={{ color: "var(--fg-3)" }}>{it.hint}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ padding: "8px 18px", borderTop: "1px solid var(--rule-soft)", display: "flex", justifyContent: "space-between", color: "var(--fg-3)" }}>
          <span className="meta">↑↓ navigate · ↵ open · esc close</span>
          <span className="meta">⌘K</span>
        </div>
      </div>
    </div>
  );
}
window.CommandPalette = CommandPalette;
