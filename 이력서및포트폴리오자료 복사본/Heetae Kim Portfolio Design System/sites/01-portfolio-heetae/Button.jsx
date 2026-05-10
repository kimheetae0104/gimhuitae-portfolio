/* global React */
const { useState } = React;

function Button({ variant = "filled", children, onClick, as = "button", href }) {
  const base = {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    padding: "10px 18px",
    cursor: "pointer",
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
    textDecoration: "none",
    border: "1px solid var(--ink-900)",
  };
  const variants = {
    filled: { background: "var(--ink-900)", color: "var(--paper-50)" },
    ghost:  { background: "transparent", color: "var(--ink-900)" },
    text:   { background: "transparent", color: "var(--accent-600)", border: 0, padding: "10px 0", textDecoration: "underline", textUnderlineOffset: 4 },
  };
  const props = { style: { ...base, ...variants[variant] }, onClick };
  if (as === "a") return <a href={href} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}

window.Button = Button;
