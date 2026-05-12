# Design Spec — blog-agent-RAG 포트폴리오 추가

**Date:** 2026-05-12  
**Status:** Approved  

---

## 범위

1. `BlogAgentRAG.html` — 새 슬라이드 덱 (6슬라이드) 생성
2. `index.html` — №06 카드 추가, `06 WORKS` count 업데이트
3. 기존 프로젝트 슬라이드 덱 — GitHub 링크 추가 (각 Close 슬라이드)

---

## 1. BlogAgentRAG.html — 6슬라이드 설계

### 전체 방향
- 톤: 엔지니어링 + 터미널 스타일 (LocalAI.html 참조)
- 강조: LLM 파이프라인 설계 + 환각 방지 3중 안전망
- "반자동화" 맥락은 슬라이드 01 메타에서 한 줄로만 언급
- 기술적 깊이가 주인공

### 슬라이드 01 — Title (`.slide.dark`)
- `h1.slide-title`: `국내 주식 이슈 블로그`
- `h2` 서브: `RAG 파이프라인 + 환각 방지 시스템`
- 메타 그리드 (4열):
  - `YEAR / 2026.04–05`
  - `PERIOD / 4 WEEKS`
  - `TYPE / LLM PIPELINE`
  - `STACK / GEMINI · DART · SELENIUM`
- 우측 하단: 터미널 블록 — `$ python run.py --cloud` + 성공 로그 3줄
- top-rule 우: `LLM APPLICATION SYSTEM`

### 슬라이드 02 — Problem (`.slide`)
- top-rule 우: `WHY THIS MATTERS`
- 좌(60%): 큰 따옴표 스타일 문장
  - `"1개 종목 = 1시간. LLM에 맡기면 환각."`
  - 부연: 하루 5~15개 급등 종목, 사람이 매일 분석하기 불가능
- 우(40%): 환각 사례 비교 카드
  - 빨간 박스: LLM 출력 `"매출 1조원"` / `"엔터테이먼트 산업"`
  - 초록 박스: DART 실제 `229억원` / `가전 리모컨 제조`
  - 하단: `4,259% 차이 → 투자 정보 환각 = 자본시장법 위반`

### 슬라이드 03 — Solution (`.slide.soft`)
- top-rule 우: `PIPELINE ARCHITECTURE`
- 전체를 터미널 스타일 블록으로 구성 (Space Mono, 어두운 배경 패널)
- 4단계 흐름:
  ```
  [COLLECT]  6단 RAG — Naver시세 / NewsRSS / DART재무 / 사업보고서 / 재무상태표 / 시황
      ↓
  [GENERATE] Gemini Flash — Few-shot 시스템 프롬프트 + RAG 데이터 주입
      ↓
  [VALIDATE] 형식검증 → 팩트체커(DART 대조) → 모순감지(10+ 룰) → 자동교정
      ↓
  [DEPLOY]   Google Sheets / Naver Blog / Obsidian / Telegram
  ```

### 슬라이드 04 — Method (`.slide`)
- top-rule 우: `3-LAYER SAFETY NET`
- 상단 3열 카드 (`.hyp-card` 스타일 변형):
  - `① 형식 검증` — `## 4개 / 800자+ / 해시태그 10+`
  - `② 팩트체커` — `DART 수치 vs 본문 대조 / 50%+ 차이 = 환각`
  - `③ 모순 감지` — `PBR/PER/적자/부채 10+ 룰`
- 하단: 코드 스니펫 패널 (`_auto_fix_contradictions` 핵심 6줄)
  - 타이틀: `코드가 마지막 안전망`

### 슬라이드 05 — Results (`.slide`)
- top-rule 우: `BEFORE → AFTER`
- 상단 3열 큰 수치 (`.stats-row` 스타일):
  - `환각 0건` / `정답글 대비 75~90%` / `v1 → v11`
- 하단: Google Sheets 스크린샷 (`img` 태그, `object-fit: cover`)
  - 캡션: `실제 생성 결과 — Sheets 배포 완료`

### 슬라이드 06 — Close (`.slide.dark`)
- top-rule 우: `WHAT THIS PROVES`
- "증명한 것" 테이블 (6행):
  | 영역 | 내용 |
  |---|---|
  | LLM 응용 시스템 | 데이터→LLM→검증→교정→배포 완결 파이프라인 |
  | RAG 깊이 | 6단 도메인 특화 소스 통합 |
  | 환각 방지 | 룰베이스 + 모순감지 + 자동교정 3중 안전망 |
  | 반복 개선 | v1~v11, 매 버전 문제 발견·해결 (GitHub 커밋) |
  | 외부 통합 | Google Sheets API / Selenium / 인증 4단 폴백 |
  | 실용 결정 | "LLM이 못 하면 코드가" |
- GitHub 링크: `https://github.com/kimheetae0104/Agent/tree/blog-agent-pr`
- `.pageno-mark [ HK ]` / 플로팅 홈 버튼

---

## 2. index.html 업데이트

### 변경 사항
- `.count` 텍스트: `05 WORKS` → `06 WORKS`
- TRACK 2026 SeSAC 그룹 마지막에 새 카드 추가

### №06 카드 썸네일 (`.thumb-rag`)
터미널 애니메이션 스타일 (`.thumb-ai` 패턴 참조):
```
$ python run.py --cloud
✓ 종목 수집: 7개 (+10%)
✓ RAG 6단 완료
✓ 환각 0건 통과
✓ Sheets 배포 완료
$ _  (커서 깜빡임)
```

### №06 카드 텍스트
- `num`: `№ 06 · LLM PIPELINE · 2026.05`
- `h2`: `Blog Agent RAG — 상한가 종목 분석 글을 자동 생성한다`
- `pdesc`: `6단 RAG + 3중 환각 방지로 투자 블로그 반자동화. DART 수치 환각 0건.`
- `tags`: `PYTHON · GEMINI · DART · RAG · SELENIUM`

---

## 3. 기존 프로젝트 GitHub 링크 추가

각 프로젝트 Close 슬라이드에 GitHub 링크 추가. 실제 URL은 구현 전 확인 필요.

| 프로젝트 | 파일 | GitHub URL (확인 필요) |
|---|---|---|
| BinanceBot | BinanceBot.html | https://github.com/kimheetae0104/? |
| LHV | LHV.html | https://github.com/kimheetae0104/? |
| Skinpass | Skinpass.html | https://github.com/kimheetae0104/? |
| JANN | JANN.html | https://github.com/kimheetae0104/? |
| LocalAI | LocalAI.html | https://github.com/kimheetae0104/? |
| Blog Agent RAG | BlogAgentRAG.html | https://github.com/kimheetae0104/Agent/tree/blog-agent-pr ✓ |

### 링크 표시 방식
Close 슬라이드 하단에 아이콘 + URL 텍스트로 통일:
```html
<a href="..." target="_blank" class="gh-link">
  <svg><!-- github icon --></svg>
  github.com/kimheetae0104/...
</a>
```

---

## 이미지 에셋

- `blog-agent-rag/img/sheets-result.png` — Google Sheets 스크린샷 저장 위치
  - 사용자가 제공한 스크린샷을 이 경로에 저장 후 슬라이드 05에서 참조

---

## 파일 구조 변경

```
김희태_포트폴리오/
├── BlogAgentRAG.html          ← 신규 생성
├── blog-agent-rag/
│   └── img/
│       └── sheets-result.png  ← 스크린샷 저장
├── index.html                  ← 카드 추가, count 업데이트
├── LHV.html                    ← GitHub 링크 추가
├── Skinpass.html               ← GitHub 링크 추가
├── JANN.html                   ← GitHub 링크 추가
├── LocalAI.html                ← GitHub 링크 추가
└── BinanceBot.html             ← GitHub 링크 추가
```
