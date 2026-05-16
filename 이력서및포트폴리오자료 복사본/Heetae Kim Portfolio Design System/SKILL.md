---
name: heetae-kim-design
description: Use this skill to generate well-branded interfaces and assets for Heetae Kim's portfolio (김희태의 포트폴리오), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Tokens:** `colors_and_type.css` — paper / ink / vermillion accent. Semantic vars `--fg-1`, `--bg`, `--accent-500`, `--rule`, etc.
- **Fonts:** `fonts/PlusJakartaSans*.ttf`, `fonts/SpaceMono-*.ttf`. Plus Jakarta for body/headings; Space Mono for display, mono labels, numerics.
- **Logo:** `assets/logo-mark.svg`, `assets/wordmark.svg`. Always typeset `[ HK ]` — brackets in vermillion.
- **Components:** `ui_kits/portfolio/*.jsx` — Header, Footer, ProjectTile, Marquee, Button, plus full HomeScreen, WorkIndex, CaseStudy, AboutScreen, ContactScreen.
- **Voice:** quiet, first-person, lower-case, bilingual (Korean primary, English mono caption). No emoji. No power words.
- **Icons:** unicode first (→ ↗ — · ✕ § № ●). Lucide CDN for UI affordances if needed.
