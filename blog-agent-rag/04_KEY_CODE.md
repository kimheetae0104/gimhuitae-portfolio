# 핵심 코드 발췌

포트폴리오 어필용 핵심 코드만 정리. 전체는 GitHub 참조.

---

## 1. DART 시계열 지분 변동 추적 (정답글 핵심 정보)

DART 사업보고서엔 시간순 변동만 있음:
```
2016.09 IoT 관계사 지분 34.07% 취득
→2017년 32.77%
→2023년 12월 21.53%  ← 최신
```

**`blog_agent/crawler/dart_report.py`**
```python
# 초기 취득 + 같은 회사의 모든 후속 변경 추적
init_pat = re.compile(r"((?:주식회사\s*)?[가-힣A-Za-z][가-힣A-Za-z0-9 &]{1,20})\s*지분\s*(\d+\.\d+)\s*%\s*취득")
for m in init_pat.finditer(plain):
    name = m.group(1).strip().replace("주식회사 ", "")
    pct = float(m.group(2))
    # 다음 회사 출자 기록 시작 전까지의 텍스트
    tail = plain[m.end():m.end() + 3000]
    next_co = re.search(r"\d{4}\.\d{2}\s+(?:주식회사\s*)?[가-힣A-Za-z][가-힣A-Za-z0-9]{2,15}\s*지분\s*\d+\.\d+\s*%\s*취득", tail)
    if next_co:
        tail = tail[:next_co.start()]
    # 변경 기록 모두 추출 → 가장 최신 비율
    change_pcts = [float(c) for c in re.findall(r"지분변경\s*(\d+\.\d+)\s*%", tail)]
    latest_pct = change_pcts[-1] if change_pcts else pct
    holdings_dict[name] = (latest_pct, "변경" if change_pcts else "취득")
```

---

## 2. 룰베이스 모순 감지 (10+ 룰)

`blog_agent/generator/blog_writer.py:_detect_contradictions()`

```python
def _detect_contradictions(raw: str, stock_data: dict) -> list[str]:
    issues = []
    # 1. PBR > 5인데 "적정/저평가" → 명백한 모순
    pbr = float(stock_data.get("pbr", 0))
    if pbr > 5 and re.search(r"PBR[^.\n]{0,30}(?:적정\s*수준|저평가|적정)", raw):
        issues.append(f"PBR 모순: 실제 {pbr}배(고평가)인데 '적정/저평가'로 서술")

    # 2. PER > 50인데 "저평가"
    per = float(stock_data.get("per", 0))
    if per > 50 and re.search(r"PER[^.\n]{0,30}(?:저평가|저렴)", raw):
        issues.append(f"PER 모순: {per}배 고평가인데 '저평가'로 서술")

    # 3. 영업·당기순 모두 적자 + "재무 안정적" (변형 표현 포괄)
    op = dart.get("operating_profit", 0)
    ni = dart.get("net_income", 0)
    if op < 0 and ni < 0:
        for pat in [r"재무\s*지표상\s*안정적", r"안정적\s*흐름", r"안정적인\s*재무"]:
            if re.search(pat, raw):
                issues.append(f"재무 모순: 영업·당기순 모두 적자인데 '{pat}'")
                break

    # 4. 등락률 < 28%인데 "상한가" 표기 (한국 가격제한폭 ±29~30%)
    rate = stock_data.get("change_rate", 0)
    if rate < 28 and re.search(r"상한가\s*를?\s*(?:기록|달성|돌파|마감)", raw):
        issues.append(f"상한가 모순: 등락률 +{rate:.2f}%로 상한가 아닌데 '상한가' 표기")

    # 5. EPS 음수 + "PER 저평가" (적자 종목 PER 무의미)
    eps = float(stock_data.get("eps", 0))
    if eps < 0 and re.search(r"PER[^.\n]{0,30}(?:저평가|적정)", raw):
        issues.append(f"PER 모순: EPS 음수({eps})인데 PER을 '저평가'로 해석")

    # 6. 유상증자 공시 + "재무 안정성 신호" (유상증자는 자금 부족 신호)
    has_rights = any("유상증자" in d.get("title", "") for d in stock_data.get("_recent_disclosures", []))
    if has_rights and re.search(r"유상증자[^.\n]{0,30}재무\s*안정성", raw):
        issues.append("유상증자 모순: 자금 부족 신호인데 '재무 안정성'으로 해석")

    # 7. 공시 누락 (핵심 트리거가 본문에 없음)
    for d in important_disclosure:
        keyword = "유상증자" if "유상증자" in d["title"] else d["title"][:20]
        if keyword not in raw:
            issues.append(f"공시 누락: '{keyword}' 공시 있는데 본문에 언급 안 됨")
            break

    return issues
```

---

## 3. 모순 자동 교정 (LLM 못 고치면 코드가)

LLM이 재시도해도 같은 모순을 반복하면, 코드가 최종 교정:

```python
def _auto_fix_contradictions(raw: str, stock_data: dict) -> str:
    # 1. 적자+안정적 → "본업 부진"
    if op < 0 and ni < 0:
        for pat in [r"재무\s*지표상의?\s*안정적?\s*흐름을?\s*유지[^.\n]*\.?",
                    r"재무\s*지표상의?\s*안정성을?[^.\n]*\.?",
                    r"안정적인?\s*재무\s*(?:상태|구조)[^.\n]*\.?"]:
            raw = re.sub(pat, "본업이 적자 상태로 실적 회복 관찰이 필요합니다.", raw)

    # 2. PBR > 5 "적정 수준" → "고평가"
    if pbr > 5:
        raw = re.sub(r"(PBR[^.\n]{0,30})(?:적정\s*수준(?:을?\s*유지)?|저평가\s*구간|적정)",
                     r"\1 성장 기대치가 높게 반영된 고평가 구간", raw)

    # 3. 영업이익 음수인데 표에 "흑자" → 강제 "적자"
    if op < 0:
        raw = re.sub(r"(\|\s*영업이익\s*\|[^|]*?\|\s*)흑자(\s*\|)", r"\1적자\2", raw)

    # 4. 등락률 < 28% + "상한가" → "급등"
    if rate < 28:
        raw = re.sub(r"(\+?\d+\.\d+%)\s*상한가", r"\1 급등", raw)
        raw = re.sub(r"상한가를?\s*(?:달성|돌파|기록)", "큰 폭 상승", raw)

    # 5. 첫 문장 잘못된 등락률 자동 교정
    if rate > 0:
        wrong_rate = re.findall(r"([+-]?\d+\.\d+)%", raw[:500])
        for w in wrong_rate:
            wf = float(w)
            if abs(wf - rate) > 3 and abs(wf) < 100:
                raw = raw.replace(f"{w}%", f"{rate:.2f}%", 1)
                break
    return raw
```

---

## 4. Few-shot 패턴 (시스템 프롬프트)

정답글의 구조를 학습용 예시로 명시:

```python
SYSTEM_PROMPT = """
...
=== 17. 정답글 스타일 예시 ===

아래는 +29.81% 상한가 분석 정답글 패턴이다:
- 단순 시세 나열 아니라 **왜 시장이 이 종목을 평가했는지** 인과관계 추적
- 관계회사/지분 정보를 **트리거의 핵심으로 연결**
- 시총·거래량·PBR을 **종목 특성(초소형 자산주)으로 해석**

[예시 구조]
## 종목은 어떤 회사인가
[DART 사업보고서 기반]

## 시장이 주목한 핵심 — [지분/계약/공시]
[관계회사 지분 정보를 시장 평가 트리거로 연결]

## 실적 흐름도 [좋았다/약했다]
[DART 실적 인용 + 흑자/적자 명확]

## 정리하면
* 오늘 상한가 핵심은 [A] + [B]
* 회사는 [C]와 연결된 종목
"""
```

---

## 5. 다중 인증 클라이언트 (실용성)

`blog_agent/uploader/google_sheets.py:_get_client()` — 3단 폴백:

```python
def _get_client():
    import gspread
    # 1. 서비스 계정 JSON 경로
    if SERVICE_ACCOUNT_JSON and os.path.exists(SERVICE_ACCOUNT_JSON):
        return gspread.service_account(filename=SERVICE_ACCOUNT_JSON)
    # 2. 환경변수 JSON 컨텐츠
    json_str = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON_CONTENT", "")
    if json_str:
        import json
        return gspread.service_account_from_dict(json.loads(json_str))
    # 3. gcloud Application Default Credentials
    try:
        import google.auth
        creds, _ = google.auth.default(scopes=[
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ])
        return gspread.authorize(creds)
    except Exception:
        pass
    # 4. OAuth 브라우저 로그인 (최후 폴백)
    return gspread.oauth()
```

---

## 6. ChromeDriver 버전 자동 감지

`blog_agent/uploader/naver_blog.py`:

```python
def _detect_chrome_major_version() -> int | None:
    """설치된 Chrome 메이저 버전 감지 (macOS)"""
    for path in [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta",
    ]:
        try:
            r = subprocess.run([path, "--version"], capture_output=True, text=True, timeout=5)
            m = re.search(r"(\d+)\.", r.stdout)
            if m: return int(m.group(1))
        except: continue
    return None

def _make_driver(headless=True, browser="chrome"):
    kwargs = {"options": opts, "headless": headless}
    major = _detect_chrome_major_version()
    if major: kwargs["version_main"] = major  # undetected_chromedriver 매칭
    return uc.Chrome(**kwargs)
```

→ ChromeDriver/Chrome 버전 불일치로 인한 자동화 실패 방지

---

## 7. Obsidian RAG — 섹터 필터 2단계 검색

과거 220개 Obsidian .md 포스트를 chromadb에 벡터화하고, 현재 종목과 유사한 포스트 2개를 LLM 프롬프트에 주입해 Few-shot 품질을 강화:

```python
# blog_agent/rag/retriever.py
def get_similar_posts(stock_name: str, sector: str = "", top_k: int = 2) -> list[dict]:
    """섹터 우선 검색 → 전체 폴백"""
    query = f"{stock_name} 주가 상한가 분석"
    # 1단계: 같은 섹터 내 검색
    if sector:
        results = _collection.query(
            query_texts=[query],
            where={"sector": sector},
            n_results=top_k,
        )
        if results["documents"][0]:
            return _format(results)
    # 2단계: 전체 검색 (섹터 필터 없이)
    results = _collection.query(query_texts=[query], n_results=top_k)
    return _format(results)
```

- 임베딩 모델: `nomic-embed-text` (Ollama)
- 섹터 필터: chromadb `where` 조건으로 같은 섹터 우선 → 없으면 전체 폴백
- 결과: `_build_user_prompt` 내 `[유사 포스트 참고]` 섹션으로 주입

---

## 8. Gemini 무료 검증 (AI_MODE 무관)

`gemini-2.0-flash` (Google AI Studio 무료 티어)로 블로그 최종 검증. `GEMINI_API_KEY` 있으면 AI_MODE에 관계없이 자동 활성화:

```python
# blog_agent/generator/gemini_validator.py
def validate_with_gemini(
    stock_name: str, stock_code: str, change_rate: float,
    financial_data: str, raw_content: str,
    market_cap: str = "", pbr: str = "", eps: str = "", per: str = "",
) -> Optional[dict]:
    """
    Google AI Studio 무료 티어(gemini-2.0-flash)로 블로그 검증.
    GEMINI_API_KEY 없으면 None 반환 (건너뜀).
    검증 기준: 종목 혼동 / 수치 환각(30%+) / 종목코드 정확성 / 사실 창작 / 밸류에이션 모순
    """
    if not GEMINI_API_KEY:
        return None
    ...
    return {"pass": bool, "critical": bool, "score": int, "issues": list[str]}
```

- `critical=True`: 종목 혼동·수치 30%+ 오류 등 배포 불가 수준 → Telegram 알림 + 배포 차단
- `score`: 0~100점, Telegram 알림에 포함
- 무료 한도: 15 RPM / 1M tokens/day — 검증 전용으로 충분

---

## 9. 종목코드 기반 네이버 금융 뉴스

종목명 텍스트 검색은 동명이종 혼재(에이프로젠 vs E사(바이오) 등) 문제 → 종목코드 6자리 파라미터로 정확 매칭:

```python
# blog_agent/crawler/news_crawler.py
NAVER_FINANCE_NEWS_URL = "https://finance.naver.com/item/news.naver?code={code}&page=1"

async def _fetch_naver_finance_news(session, stock_code: str, stock_name: str, max_articles: int):
    """종목코드로 네이버 금융 종목탭 뉴스 크롤 — 동명이종 혼재 차단"""
    url = NAVER_FINANCE_NEWS_URL.format(code=stock_code)
    # ... 파싱
    articles.append({
        "source": f"naver_finance:{stock_code}",  # 트레이서빌리티
        ...
    })
```

- 소스 태그 `naver_finance:{code}` → 어떤 경로로 수집된 뉴스인지 추적 가능
- 기존 Google News RSS + 네이버 검색에 추가되는 3번째 뉴스 소스

---

## 10. 이슈 점수 계산 (calculate_issue_score)

상한가 종목 중 실제 블로그를 작성할 가치가 있는 종목을 자동 선정합니다. generic 콘텐츠(뉴스 없는 테마주 추종) 방지가 핵심 목적입니다.

**점수 공식**:
```
IssueScore = 거래량 가중치(30%) + 뉴스 수 가중치(40%) + 네이버 검색량(30%)
통과 조건: IssueScore >= 30 AND 직접 관련 뉴스 >= 1건
```

```python
# blog_agent/analyzer/issue_scorer.py
def calculate_issue_score(
    stock_name: str,
    stock_code: str,
    volume: int,
    volume_avg: int,
    news_count: int,
    search_volume: int,
) -> dict:
    """
    이슈 점수 계산 (0~100점).
    30점 미만 또는 직접 관련 뉴스 없으면 should_write()=False → 스킵.
    """
    # 거래량 가중치 (30%) — 평균 대비 배수
    volume_ratio = volume / max(volume_avg, 1)
    if volume_ratio >= 10:
        volume_score = 30
    elif volume_ratio >= 5:
        volume_score = 20
    elif volume_ratio >= 2:
        volume_score = 10
    else:
        volume_score = 0

    # 뉴스 수 가중치 (40%) — 직접 관련 뉴스
    if news_count >= 5:
        news_score = 40
    elif news_count >= 3:
        news_score = 30
    elif news_count >= 1:
        news_score = 20
    else:
        news_score = 0  # 직접 뉴스 없으면 0 → 스킵 트리거

    # 네이버 검색량 가중치 (30%)
    if search_volume >= 1000:
        search_score = 30
    elif search_volume >= 500:
        search_score = 20
    elif search_volume >= 100:
        search_score = 10
    else:
        search_score = 0

    total = volume_score + news_score + search_score

    return {
        "score": total,
        "should_write": total >= ISSUE_SCORE_MIN and news_count >= 1,
        "breakdown": {
            "volume": volume_score,
            "news": news_score,
            "search": search_score,
        },
    }
```

**실측 예시 (2026-05-14)**:

| 종목 | 거래량 점수 | 뉴스 점수 | 검색 점수 | 합계 | 선정 |
|---|---|---|---|---|---|
| B사(버스운송) | 30 | 40 | 20 | **90점** | ✅ |
| C사(버스운송) | 30 | 40 | 20 | **90점** | ✅ |
| D사(유통서비스) | 20 | 40 | 21 | **81점** | ✅ |
| (기타 18개) | ... | ... | ... | < 30 또는 뉴스 0 | ❌ 스킵 |
