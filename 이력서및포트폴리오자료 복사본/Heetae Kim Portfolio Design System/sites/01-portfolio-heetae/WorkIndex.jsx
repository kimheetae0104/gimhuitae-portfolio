/* global React, Button */
const ALL_WORK = [
  { idx: 12, title: "공책 (notebook for one)",   role: "DESIGN · ENG",      year: "2024", status: "shipped" },
  { idx: 11, title: "소리 일기 (sound journal)",  role: "RESEARCH · WRITING", year: "2023", status: "archived" },
  { idx: 10, title: "Slow Mail",                 role: "BRANDING · WEB",     year: "2023", status: "shipped" },
  { idx:  9, title: "한 페이지 (one page)",       role: "ZINE · PRINT",       year: "2022", status: "shipped" },
  { idx:  8, title: "Tabletop CRM (internal)",   role: "PRODUCT",            year: "2022", status: "shipped" },
  { idx:  7, title: "산책 지도 (walking maps)",   role: "SIDE · WEB",         year: "2022", status: "archived" },
  { idx:  6, title: "Letterpress for nobody",    role: "PRINT · TYPE",       year: "2021", status: "shipped" },
  { idx:  5, title: "독서 카드 (reading cards)",  role: "TOOL",               year: "2021", status: "draft" },
  { idx:  4, title: "Bookmarklet diaries",       role: "DEV TOOL",           year: "2021", status: "shipped" },
  { idx:  3, title: "Two postcards a month",     role: "RITUAL",             year: "2020", status: "archived" },
  { idx:  2, title: "Re: an old website",        role: "REDESIGN",           year: "2020", status: "shipped" },
  { idx:  1, title: "Hello, internet.",          role: "FIRST PAGE",         year: "2019", status: "archived" },
];

const STATUS_STYLES = {
  shipped:  { bg: "var(--accent-100)", fg: "var(--accent-600)" },
  archived: { bg: "var(--bg-mute)",    fg: "var(--ink-700)"   },
  draft:    { bg: "transparent",       fg: "var(--fg-3)", border: "1px dashed rgba(20,17,13,.32)" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status];
  return (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 999, background: s.bg, color: s.fg, border: s.border || "none",
    }}>{status}</span>
  );
}

function WorkIndex({ onOpenCase, onBack }) {
  const [filter, setFilter] = React.useState("all");
  const filters = ["all", "shipped", "archived", "draft"];
  const rows = filter === "all" ? ALL_WORK : ALL_WORK.filter(r => r.status === filter);

  return (
    <main>
      <section style={{ padding: "64px 0 28px 0" }}>
        <div className="meta" style={{ marginBottom: 16 }}>§ ALL WORK · {ALL_WORK.length} ITEMS</div>
        <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: "16ch" }}>
          Everything I'd want a stranger to see.
        </h1>
        <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
          {filters.map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "6px 14px", borderRadius: 999, cursor: "pointer",
                background: filter === f ? "var(--ink-900)" : "transparent",
                color: filter === f ? "var(--paper-50)" : "var(--ink-700)",
                border: "1px solid var(--ink-900)",
              }}>{f}</button>
          ))}
        </div>
      </section>

      <section>
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1.2fr 100px 120px", padding: "10px 0", borderTop: "1px solid var(--ink-900)", borderBottom: "1px solid var(--ink-900)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)" }}>
          <span>№</span><span>Title</span><span>Role</span><span>Year</span><span style={{ textAlign:"right" }}>Status</span>
        </div>
        {rows.map(r => (
          <a key={r.idx} href="#" onClick={(e)=>{e.preventDefault(); onOpenCase(r.idx);}}
             style={{ display: "grid", gridTemplateColumns: "60px 1fr 1.2fr 100px 120px", padding: "16px 0", borderBottom: "1px solid var(--rule-soft)", textDecoration: "none", color: "inherit", alignItems: "baseline" }}>
            <span className="meta numeric">{String(r.idx).padStart(2,"0")}</span>
            <span style={{ fontSize: 17, fontWeight: 500 }}>{r.title}</span>
            <span className="meta">{r.role}</span>
            <span className="meta numeric">{r.year}</span>
            <span style={{ textAlign: "right" }}><StatusPill status={r.status}/></span>
          </a>
        ))}
        <div style={{ marginTop: 32 }}>
          <Button variant="ghost" onClick={onBack}>← Back home</Button>
        </div>
      </section>
    </main>
  );
}
window.WorkIndex = WorkIndex;
