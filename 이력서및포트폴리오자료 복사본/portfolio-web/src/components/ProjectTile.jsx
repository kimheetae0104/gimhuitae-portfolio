function ProjectTile({ index, title, titleEn, meta, year, bg, dotted, onClick }) {
  return (
    <a href="#" onClick={(e)=>{e.preventDefault(); onClick && onClick();}} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        aspectRatio: "4/5",
        background: bg || "linear-gradient(160deg, var(--paper-300) 0%, var(--ink-300) 100%)",
        position: "relative",
        border: "1px solid var(--ink-900)",
        overflow: "hidden",
      }}>
        <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: dotted ? "var(--ink-300)" : "var(--ink-700)" }}>
          № {String(index).padStart(2, "0")}
        </span>
        {dotted && <span style={{ position: "absolute", bottom: 12, right: 12, color: "var(--accent-500)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 28 }}>●</span>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>{title}</div>
          {titleEn && <div className="meta" style={{ marginTop: 2 }}>{titleEn}</div>}
        </div>
        <span className="meta numeric">{year}</span>
      </div>
      <div className="meta" style={{ marginTop: 6 }}>{meta}</div>
    </a>
  );
}

export default ProjectTile;
