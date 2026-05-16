/* global React */
const POSTS = [
  { d: "2026.03.12", t: "On the second draft of a small tool", k: "process", min: 6, lang: "EN",
    excerpt: "The first draft is for me. The second draft is the one where I admit who it's actually for. That admission is harder than it sounds." },
  { d: "2026.01.04", t: "두 개의 언어로 쓰는 일", k: "writing", min: 4, lang: "KR",
    excerpt: "한국어로 먼저 쓴 글을 영어로 옮기면, 같은 문장이 두 번 다른 사람이 된다. 어느 쪽이 진짜인지는 모르겠다." },
  { d: "2025.11.20", t: "What I learned shipping nothing for six months", k: "process", min: 8, lang: "EN",
    excerpt: "Six months without shipping is not failure — it's data. Here's what I read back from those months when I finally looked." },
  { d: "2025.09.02", t: "공책 한 권의 무게", k: "essay", min: 5, lang: "KR",
    excerpt: "다 쓴 공책은 그냥 종이 더미가 아니라, 그 사람이 그 시간 동안 어떤 방식으로 살아남았는지에 대한 기록이다." },
  { d: "2025.07.15", t: "Why my favorite tools are unfinished", k: "process", min: 7, lang: "EN",
    excerpt: "There's a moment in software where the maker stops listening. The tools I love most were caught just before that moment." },
  { d: "2025.05.28", t: "타입을 고르는 30분의 의식", k: "design", min: 3, lang: "KR",
    excerpt: "프로젝트마다 첫 30분은 폰트만 본다. 글을 쓰지 않고, 글이 어떻게 보일지부터 정한다." },
  { d: "2025.03.04", t: "Letters I didn't send", k: "essay", min: 9, lang: "EN",
    excerpt: "I keep a folder of unsent emails. Most are addressed to people who would have understood me; some to people who couldn't have." },
];

function WritingScreen() {
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? POSTS : POSTS.filter(p => p.k === filter || p.lang === filter);
  const cats = ["all", "process", "essay", "design", "writing", "KR", "EN"];

  return (
    <main>
      <section style={{ padding: "64px 0 24px 0", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
        <div>
          <div className="meta" style={{ marginBottom: 16 }}>§ WRITING — 2021 NOW</div>
          <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.02 }}>
            Notes,<br/>mostly to <em style={{ fontStyle: "normal", color: "var(--accent-500)" }}>myself</em>.
          </h1>
        </div>
        <p style={{ fontSize: 16, color: "var(--fg-2)", lineHeight: 1.7, maxWidth: "44ch" }}>
          짧은 글, 가끔 긴 글. 한국어와 영어를 섞어 씁니다. 어떤 글은 지나서 다시 읽으면 부끄럽고, 어떤 글은 그래서 더 다행입니다.
          <br/><br/>
          <span className="meta" style={{ color: "var(--fg-3)" }}>RSS available · {POSTS.length} POSTS</span>
        </p>
      </section>

      <section style={{ padding: "16px 0" }}>
        <div style={{ display: "flex", gap: 6, paddingBottom: 16, borderBottom: "1px solid var(--ink-900)", flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={()=>setFilter(c)} style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "6px 14px", borderRadius: 999, cursor: "pointer",
              background: filter === c ? "var(--ink-900)" : "transparent",
              color: filter === c ? "var(--paper-50)" : "var(--ink-700)",
              border: "1px solid var(--ink-900)",
            }}>{c}</button>
          ))}
        </div>

        <div style={{ paddingTop: 8 }}>
          {filtered.map((p, i) => (
            <a key={i} href="#" onClick={e=>e.preventDefault()} style={{ display: "block", padding: "28px 0", borderBottom: "1px solid var(--rule-soft)", textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 140px", gap: 24, alignItems: "baseline" }}>
                <span className="meta numeric" style={{ color: "var(--fg-3)" }}>{p.d}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.t}
                    <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.1em" }}>· {p.lang}</span>
                  </h3>
                  <p style={{ margin: "8px 0 0 0", fontSize: 15, color: "var(--fg-2)", lineHeight: 1.6, maxWidth: "62ch" }}>{p.excerpt}</p>
                </div>
                <span className="meta" style={{ textAlign: "right", color: "var(--fg-3)" }}>{p.k} · {p.min} min →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
window.WritingScreen = WritingScreen;
