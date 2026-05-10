function Marquee({ items }) {
  const text = items.join("   ·   ");
  return (
    <div style={{
      borderTop: "1px solid var(--ink-900)",
      borderBottom: "1px solid var(--ink-900)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: "14px 0",
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      letterSpacing: "0.04em",
    }}>
      <div style={{ display: "inline-block", animation: "marquee 38s linear infinite" }}>
        <span style={{ paddingRight: 48 }}>{text}</span>
        <span style={{ paddingRight: 48 }}>{text}</span>
        <span style={{ paddingRight: 48 }}>{text}</span>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-33.33%);} }`}</style>
    </div>
  );
}

export default Marquee;
