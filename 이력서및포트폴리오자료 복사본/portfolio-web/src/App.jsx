import { useState, useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from './components/Button';
import Marquee from './components/Marquee';
import ProjectTile from './components/ProjectTile';
import Header from './components/Header';
import Footer from './components/Footer';

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { attributes: {}, body: markdown };
  const attributes = {};
  match[1].split('\n').forEach(line => {
    const splitIndex = line.indexOf(':');
    if (splitIndex > -1) {
      const key = line.slice(0, splitIndex).trim();
      let value = line.slice(splitIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      attributes[key] = isNaN(value) || value === '' ? (value === 'true' ? true : value === 'false' ? false : value) : Number(value);
    }
  });
  return { attributes, body: match[2] };
}

// Use Vite's glob import to automatically load all markdown files
const markdownFiles = import.meta.glob('./content/projects/*.md', { eager: true, query: '?raw', import: 'default' });

const allProjects = Object.keys(markdownFiles).map((path) => {
  const fileContent = markdownFiles[path];
  const { attributes, body } = parseFrontMatter(fileContent);
  return {
    ...attributes,
    content: body,
    path
  };
}).sort((a, b) => a.idx - b.idx); // Sort by idx

function App() {
  const [screen, setScreen] = useState('home');
  const [activeProjectIdx, setActiveProjectIdx] = useState(null);

  const navigate = (id) => {
    if (id === "writing") id = "home"; // not implemented
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openCase = (idx) => {
    setActiveProjectIdx(idx);
    setScreen("case");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const activeProject = allProjects.find(p => p.idx === activeProjectIdx);

  return (
    <div data-screen-label={
      screen === "home" ? "01 Home" :
      screen === "work" ? "02 Work index" :
      screen === "case" ? "03 Case study" :
      screen === "about" ? "04 About" : "05 Contact"
    }>
      <div className="container">
        <Header active={screen} onNav={navigate} />

        {screen === "home" && (
          <HomeScreen projects={allProjects} onOpenWork={() => navigate("work")} onOpenCase={openCase} />
        )}
        
        {screen === "work" && (
          <WorkIndex projects={allProjects} onOpenCase={openCase} onBack={() => navigate("home")} />
        )}

        {screen === "case" && activeProject && (
          <CaseStudy project={activeProject} onBack={() => navigate("work")} />
        )}

        {/* Dummy About/Contact, replace with real components later if needed */}
        {screen === "about" && <div style={{padding: '64px 0'}}><h2>About (WIP)</h2></div>}
        {screen === "contact" && <div style={{padding: '64px 0'}}><h2>Contact (WIP)</h2></div>}

        <Footer />
      </div>
    </div>
  );
}

function HomeScreen({ projects, onOpenWork, onOpenCase }) {
  return (
    <main>
      <section style={{ padding: "96px 0 56px 0" }}>
        <div className="meta" style={{ marginBottom: 24 }}>§ HEETAE KIM — AI/ML DEVELOPER · 2026.04</div>
        <h1 className="display" style={{ maxWidth: "20ch" }}>
          AI/ML developer.<br/>
          <span style={{ color: "var(--accent-500)" }}>{projects.length} projects</span> —<br/>
          industrial ML, iOS, local agents.
        </h1>
        <p className="lead" style={{ maxWidth: "62ch", marginTop: 32, color: "var(--fg-2)" }}>
          I build forecasting and anomaly-detection models for steel-plant process data, ship a small iOS app on the side, and tinker with on-device LLM agents. Python · PyTorch · scikit-learn · Swift · llama.cpp.
        </p>
      </section>

      <Marquee items={["selected work, 2024–2026", "industrial ML · time-series · anomaly", "open to roles in seoul / remote", "github.com/kimheetae0104"]} />

      <section style={{ padding: "64px 0 32px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <div className="meta">§ 02 — SELECTED WORK</div>
            <h2 style={{ marginTop: 8, fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>Latest projects. Automatically updated.</h2>
          </div>
          <Button variant="ghost" onClick={onOpenWork}>Index →</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, paddingTop: 16, borderTop: "1px solid var(--ink-900)" }}>
          {projects.slice(0,4).map(p => (
            <div key={p.idx} onClick={() => onOpenCase(p.idx)} style={{ cursor: "pointer" }}>
              <ProjectTile index={p.idx} title={p.title} titleEn={p.role} year={p.year} bg={p.bg || "#EFEFF1"} dotted={p.dotted} meta={p.metric} />
              <div className="meta" style={{ marginTop: 10, color: "var(--fg-3)" }}>{p.titleKo}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function WorkIndex({ projects, onOpenCase, onBack }) {
  return (
    <main style={{ padding: "64px 0" }}>
      <Button variant="ghost" onClick={onBack} style={{ marginBottom: 32 }}>← Back</Button>
      <h1 className="display" style={{ marginBottom: 32 }}>All Work</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, borderTop: "1px solid var(--ink-900)", paddingTop: 16 }}>
        {projects.map(p => (
          <div key={p.idx} onClick={() => onOpenCase(p.idx)} style={{ cursor: 'pointer', padding: '16px 0', borderBottom: '1px solid var(--rule-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="meta numeric">№ {p.idx}</span>
              <span style={{ fontSize: 18, fontWeight: 500 }}>{p.title}</span>
              <span className="meta">{p.year}</span>
            </div>
            <div className="meta" style={{ marginTop: 8, color: "var(--fg-3)" }}>{p.titleKo}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

function CaseStudy({ project, onBack }) {
  return (
    <main style={{ padding: "64px 0" }}>
      <Button variant="ghost" onClick={onBack} style={{ marginBottom: 32 }}>← Back to Index</Button>
      <div className="meta" style={{ marginBottom: 16 }}>§ PROJECT {project.idx}</div>
      <h1 className="display" style={{ fontSize: 48, marginBottom: 16 }}>{project.title}</h1>
      <div className="meta" style={{ marginBottom: 48, color: "var(--fg-3)" }}>{project.titleKo} · {project.year}</div>
      
      <div className="markdown-content" style={{ maxWidth: '65ch', margin: '0 auto', fontSize: '18px', lineHeight: '1.6', color: 'var(--fg-1)' }}>
        <Markdown remarkPlugins={[remarkGfm]}>{project.content}</Markdown>
      </div>
    </main>
  );
}

export default App;
