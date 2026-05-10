# Heetae Kim — Portfolio Design System
**김희태의 포트폴리오 디자인 시스템**

A small, focused design system for a personal portfolio site. It's built around a simple idea: a piece of paper, a typewriter, and a single drop of red ink. Everything else is restraint.

> **Note on context** — The user provided font files only (Plus Jakarta Sans + Space Mono) and no codebase, Figma, or screenshots. The visual direction below was authored fresh against the typographic personality of those two faces. Treat this as v1 — please iterate on tone, palette, and motifs.

---

## 1. Sources & inputs

| What | Where | Notes |
|---|---|---|
| Plus Jakarta Sans (variable, upright + italic) | `fonts/PlusJakartaSans.ttf`, `fonts/PlusJakartaSans-Italic.ttf` | Primary UI/body face |
| Space Mono (Regular / Italic / Bold / BoldItalic) | `fonts/SpaceMono-*.ttf` | Display + metadata + numerics |
| Codebase | — | Not provided |
| Figma | — | Not provided |
| Sample copy / brand voice | — | Not provided — voice below is authored, please correct |

---

## 2. The brand in one paragraph

Heetae Kim's portfolio is **quiet and precise**. It looks like a well-made notebook: warm off-white paper, hairline rules, a single confident accent in vermillion red. Type does most of the work — Plus Jakarta Sans speaks softly for body and headings; Space Mono shows up for numbers, captions, project codes, and the occasional statement display headline. There are no gradients, no soft drop-shadows, no rounded-rectangle "cards." Just paper, ink, and a grid.

---

## 3. Content fundamentals

### Voice
- **Understated, first-person, in lower case where it feels natural.** Korean primary, English available. The site does not "sell." It documents.
- Prefers **"I made"** over **"we delivered."** This is one person's portfolio; the singular is honest.
- **Short sentences. Long pauses.** A line that says *"2024 — seoul"* is a complete thought.
- No marketing verbs (*supercharge, unlock, reimagine*). Use plain ones (*made, wrote, shipped, helped, learned*).
- **Bilingual rhythm:** Korean often leads, English follows in parentheses or in a smaller mono caption. Example: `브랜딩 (branding)`. Don't translate everything — let the languages cohabit.

### Casing & punctuation
- **Headings:** sentence case. *"Selected work, 2021–2025."* Never Title Case Like This.
- **Mono labels:** UPPERCASE with wide tracking. `IDX / 04`, `ROLE — DESIGN & ENG`, `SEOUL · KR`.
- **Em dashes** ( — ) for asides; **en dashes** (–) for ranges. Korean uses `·` (middle dot) and `—`.
- Numbers in body text: numerals (use `1`, not `one`). Years: `2024`. Months: `MAR 2024` (uppercase, mono).
- No exclamation points. No emoji.

### Tone examples
> Selected work from the last few years. Some of it shipped. Some of it didn't. I tried to be honest about which is which.

> 한 사람이 매일 들여다보는 작은 도구를 만드는 일이 좋습니다. — *I like making small tools that one person looks at every day.*

> Role: design & front-end. Year: 2024. Status: shipped, then deprecated, then revived by a stranger on GitHub.

### What to avoid
- Power words: *seamless, robust, intuitive, world-class.*
- Empty meta-commentary: *"In today's fast-paced world…"*
- Emoji of any kind.
- Stock photography clichés (handshakes, lightbulbs, abstract networks).

---

## 4. Visual foundations

### Color
A warm **paper** family, a near-black **ink** family, and a single **vermillion accent**. That's the entire palette.

| Role | Token | Hex |
|---|---|---|
| Page background (default) | `--bg` / `--paper-50` | `#FFFFFF` |
| Soft section background | `--bg-soft` / `--paper-100` | `#F7F7F8` |
| Mute (cards, code) | `--bg-mute` / `--paper-200` | `#EFEFF1` |
| Primary text | `--fg-1` / `--ink-900` | `#0E0E10` |
| Secondary text | `--fg-2` / `--ink-700` | `#2F2F33` |
| Tertiary / metadata | `--fg-3` / `--ink-500` | `#6B6B72` |
| Accent (links, focus, mark) | `--accent-500` | `#E04323` |
| Accent (hover, deep) | `--accent-600` | `#C5341E` |

A `[data-theme="dark"]` variant exists ("after hours"): the paper turns to roasted black `#100E0A`, ink inverts to bone, and accent shifts one stop brighter. Don't use both at once — pick one per page.

### Typography
- **Plus Jakarta Sans** — sans, geometric humanist, variable weight 200–800. Used for h1–h4, body, lead, UI.
- **Space Mono** — monospace, slab-y, angular. Used for `.display`, `.caption`, `.meta`, numerics, code.
- **Korean fallback stack:** `"Apple SD Gothic Neo", "Pretendard", "Noto Sans KR"`. Korean characters render in the system Korean face — Plus Jakarta has no Hangul.
- **Scale** is modular at ratio ~1.25, from 12 → 120px. See `colors_and_type.css`.
- **Line-height** is generous in body (`1.65`) and tight in display (`1.05`). Never set body below `1.45`.

### Spacing & layout
- **4px base.** Steps: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- **Container** maxes at 1280px. Default gutter 24px; on wide screens, lean into asymmetry rather than centering everything.
- **12-column grid** is implied but rarely visible. Hairline rules at column boundaries are encouraged on dense pages (work index, archive).
- **Vertical rhythm:** sections are separated by 96–128px on desktop. Don't crowd.

### Backgrounds
- **Default = paper.** No textures, no images, no gradients.
- **Hero / section breaks:** full-bleed photograph or a flat ink/accent block. Photos are warm, slightly desaturated, often shot in available light. No bluish corporate stock.
- **No grain or noise overlay.** The warmth comes from the paper hex, not from a texture.

### Borders & rules
- **Hairline 1px in `--ink-900`** is the workhorse divider. Use it boldly — between every major section, under every heading, around every figure.
- **Soft rules** (`--rule-soft`, ~16% ink) for inline tables and metadata strips.
- **Borders, not shadows**, are how we separate things. Cards are bordered, not floated.

### Shadows
- Almost none. `--shadow-1` (a single hairline below) for things that should look picked-up. `--shadow-3` reserved for the rare modal or popover.
- **No glassmorphism.** No backdrop blur in the resting state. Blur is fine on a video-paused overlay only.

### Radii
- **Mostly 0.** `--r-1` (2px) and `--r-2` (4px) for inputs and code chips. `--r-pill` for status tags. Cards have square corners.

### Motion
- **Easing:** `--ease-out` (`cubic-bezier(0.2, 0.7, 0.2, 1)`) for almost everything.
- **Durations:** 140 / 220 / 420ms. Never longer.
- **No bounces, no springs, no parallax.** Fades and small translations (4–8px) only.
- **Page transitions:** a 220ms paper-fade. Optional: a single typewriter-cursor blink on the H1 only on the homepage.
- **Respect `prefers-reduced-motion`** — fall back to instant.

### Hover & press
- **Links:** color shifts from `--accent-500` to `--accent-600` over 140ms. Underline thickens from 1px to 2px.
- **Buttons (filled):** background goes from `--ink-900` → `--ink-800`; on press, scale 0.985 and lose 1px of brightness.
- **Buttons (ghost):** background fades from transparent to `--bg-mute`.
- **Cards / tiles:** the rule turns from `--rule-soft` → `--rule` (full ink). The image inside crops in by ~2% (subtle scale 1.02).

### Transparency & blur
- Transparency is for the modal scrim only (`--overlay`, ~62% ink).
- Blur is reserved for one place: a paused video player. Never on permanent UI.

### Imagery direction
- **Warm, daylight, available-light.** Slight desaturation. No HDR, no heavy grading.
- **Real, specific, banal.** A desk. A train ticket. A keyboard. A book spine. Never abstract "creativity" stock.
- **Black & white** is acceptable for portrait or archive work. Sepia is not.
- **Aspect ratios:** 4:5 portrait, 3:2 landscape, 1:1 square. Avoid 16:9 outside of video.

### Cards
- A card is: a **1px ink rule**, **paper-mute background**, **square corners**, **24px padding**, no shadow. That is it. Resist the urge to add anything else.

---

## 5. Iconography

**Approach: minimal. The system prefers letters and numbers over icons.**

- **No icon font is shipped.** Where icons are unavoidable (UI affordances, social links, the menu/close toggle), we use **Lucide** (CDN), 1.5px stroke, 20–24px box, current-color. Lucide matches the geometric clarity of Plus Jakarta and the angular precision of Space Mono.
- **Substitution flagged:** No icon set was provided by the user. Lucide is a reasonable default; please confirm or swap.
- **No emoji.** Not in body, not in section dividers, not as bullets.
- **Unicode characters as motifs are encouraged**: `→`, `↗` (external link), `—` (em dash), `·` (middle dot), `✕` (close), `§` (section), `№` (number). Use them inline; do not vector them.
- **Logos & marks:** the personal mark for Heetae Kim is a **monogram set in Space Mono Bold**: `[ HK ]`, brackets included. There is no graphic logomark — the typeset monogram *is* the logo. See `assets/logo-mark.svg` and `assets/wordmark.svg`.

---

## 6. Components at a glance

See `preview/` for visual cards, and `ui_kits/portfolio/` for live components.

- **Buttons:** filled (ink), ghost (transparent + rule), text-link.
- **Inputs:** underline-only on default; full hairline border on focus.
- **Tags / pills:** mono caption style, accent-100 background, accent-600 text — for status only.
- **Project tile:** image (4:5 or 3:2) + mono index `№ 04` + title + meta row.
- **Section header:** mono caption + h2 + horizontal rule.
- **Footer:** three columns, hairline ruled, mono everything.

---

## 7. Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (Claude Code compatible)
colors_and_type.css        ← all CSS tokens + semantic typography
fonts/                     ← Plus Jakarta Sans, Space Mono (TTFs)
assets/                    ← logos, icons, placeholder imagery
preview/                   ← design-system cards (one HTML per concept)
ui_kits/
  portfolio/               ← React/JSX recreation of the portfolio site
    index.html             ← interactive home → work → case-study flow
    Header.jsx, Footer.jsx, ProjectTile.jsx, …
    README.md
```

---

## 8. Caveats & open questions

- **Voice was authored, not derived.** Replace example copy with Heetae's actual writing.
- **Lucide icons are a default**, not a confirmed choice.
- **Imagery in the UI kit uses placeholder photos** (warm-toned solid blocks with mono labels).
- **Korean type:** falls back to system Hangul faces. If a specific Korean face is preferred (e.g. Pretendard, Sandoll Gothic Neo), please provide.
- **No real project content** exists yet — the work index is populated with plausible-but-fake project names.
