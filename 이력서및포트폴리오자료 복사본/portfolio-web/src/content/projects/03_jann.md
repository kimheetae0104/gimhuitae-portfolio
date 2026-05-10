---
idx: 3
slug: "jann-app"
title: "JANN — FoodAlchemi iOS app"
titleKo: "JANN 프로젝트"
role: "iOS · SWIFT · ML"
year: "2026"
metric: "shipped to App Store"
bg: "linear-gradient(180deg, #EFEFF1 0%, #BCBCC2 100%)"
---

# JANN — 재료가 이야기가 되는 순간
### (Food Alchemi에서 발전된 분자 미식학 기반 iOS 앱)

> **태그라인**: "냉장고 속 재료를 분자 단위로 이해하는 앱"
> **컨셉**: 분자 미식학(Molecular Gastronomy) 기반 제로 웨이스트 푸드테크 iOS 앱
> **작성일**: 2026.04

---

## 한 줄 요약

YOLOv8n 온디바이스 비전 모델로 냉장고 속 식재료를 인식하고, **Nature Scientific Reports에 등재된 Flavor Network 데이터셋(식재료 1,530종 × 향미 화합물 1,107개)** 을 자카드 유사도로 분석해 **화학적 향미 조합 기반 레시피**를 제안하는 iOS 앱. 단순 태그 매칭이 아닌 **분자 단위 조합 탐색**이라는 차별점으로, 가정 음식물 쓰레기와 결정 피로 문제를 동시에 해결.

![JANN iOS 앱 화면](/assets/screenshot_3.png)

---

## 1. 문제 정의

### 사회적 배경

- 한국 가구의 연간 음식물 쓰레기 처리 비용: **약 20조 원** (환경부 2024)
- 가정 내 음식물 쓰레기의 **70% 이상이 냉장고 속 미사용 식재료**에서 발생
- "오늘 뭐 먹지?" 결정 피로(Decision Fatigue)로 인한 반복적 배달 음식 소비

### 핵심 문제 3가지

| 문제 | 내용 |
|------|------|
| **① 냉장고의 블랙박스화** | 사용자는 내부 재고와 신선도를 인지하지 못해 멀쩡한 식재료를 반복 폐기 |
| **② 조리법 고정관념** | "김치 → 김치찌개"처럼 정해진 패턴에 갇혀, 냉장고에 남은 재료의 분자적 조합 가능성을 인식하지 못함 |
| **③ 결정 피로** | 매일 반복되는 메뉴 결정 → 영양 불균형 배달 음식 → 건강 악화 + 추가 식비의 악순환 |

---

## 2. 핵심 솔루션

### 핵심 파이프라인

![JANN 추천 아키텍처](/assets/JANN_발표_images/JANN_발표_page_5.png)

```
남은 재료 인식 (입력)  →  분자 향미 분석 (처리)  →  최적 레시피 생성 (출력)
   YOLOv8n + GPT-4o        Flavor Network DB         GPT-4o-mini
```

### Flavor Network 알고리즘 — 핵심 차별점

| 구분 | 기존 앱 | **JANN (Food Alchemi)** |
|------|---------|------------------------|
| 분석 방식 | "토마토 → 파스타" 단순 태그 매칭 | 화학적 향미 화합물 데이터 기반 최적 조합 탐색 |
| 데이터 근거 | 사용자 검색 빈도 | Nature Scientific Reports 논문 등재 데이터셋 |
| 추천 로직 | 인기 레시피 | 공유 향미 화합물 수 기반 유사도 계산 |

### 알고리즘 흐름

1. **Pivot 선정**: 유통기한 임박 재료를 메인으로 설정
2. **화합물 분석**: 해당 재료의 주요 향기 성분 추출 (예: 딸기 → Furaneol, Gamma-Decalactone)
3. **Graph 탐색**: 냉장고 내 재료 중 위 성분을 공유하는 재료 검색
4. **추천**: 예) "딸기-파마산 샐러드" — 파마산이 Butyric acid 계열에서 딸기와 높은 조화

---

## 3. 데이터 과학 기반

### Flavor Network 데이터셋

- **출처**: Nature Scientific Reports 등재 논문 *"Flavor network and the principles of food pairing"* (Ahn et al.)
- **규모**: 식재료 **1,530종** × 향미 화합물 **1,107개** 매핑
- **알고리즘**: 자카드 유사도 (Jaccard Index) = `공유 화합물 수 / 합집합 화합물 수 × 100`

### 실측 예시

| 조합 | 공유 화합물 | 친화도 |
|------|-----------|--------|
| 딸기 + 토마토 | **72개** | High Affinity |
| 계란 + 딸기 | 19개 | Low Affinity |

### Roboflow 비전 데이터셋

| 데이터셋 | 규모 | 클래스 | 상태 |
|---------|------|--------|------|
| **fridge-objects v10** | 실제 냉장고 내부 1,920장 | 10개 (avocado, bacon, butter, cheese, eggs, lemon, milk, pepper, tomatoes, yogurt) | 현재 사용 중 |
| **food_large (51-class)** | 51클래스 일반 식재료 | 51개 | CoreML 변환 완료, 통합 예정 |

**선정 이유**: 독립 식재료 사진이 아닌 **실제 냉장고 선반 배치 맥락**으로 학습 → 실사용 환경 인식 정확도 향상.

---

## 4. 기술 스택 및 구현

### 4-1. AI Vision — 식재료 인식 (3단계 폴백 구조)

| 우선순위 | 모델 | 역할 | 특징 |
|---------|------|------|------|
| **1순위** | YOLOv8n (CoreML) | 오프라인 온디바이스 추론 | 모델 ~18MB, iOS 실시간 추론, 무료 |
| **2순위** | GPT-4o Vision | 한국 식재료 + 라벨 텍스트 인식 | YOLO 미인식 재료 (김치, 두부 등) 보완 |
| **폴백** | Apple Vision Framework | 두 결과 모두 없을 때 | 최후 안전망 |

- **Parallel 실행**: YOLO + GPT-4o 동시 호출 → 결과 합산 (중복 제거)
- **이미지 해상도**: 1536px 유지

### 4-2. YOLO 학습 환경 및 성과

**Mac 로컬 (M4 Pro 24GB)**:
- box_loss **1.376 → 0.963 (약 30% 개선, 57+ 에폭)**

**Google Colab (T4 GPU)**:
- food_large 51클래스 모델 학습 → Google Drive → Mac 다운로드 → CoreML 변환 → Xcode 배포

**자동화 스크립트** `monitor_and_deploy.sh`:
- 5분마다 학습 프로세스 감지 → 완료 시 CoreML 변환 + Xcode 자동 배포

### 4-3. Flavor Network DB 연동

- **SQLite DB** (`flavor_alchemi.db`) — 앱 번들 포함, 오프라인 작동
- 핵심 쿼리: 두 재료 간 공유 향미 화합물 수 직접 COUNT (JOIN 기반)
- **한영 매핑**: GPT 배치 번역으로 식재료 1,530개 + 화합물 1,107개 전부 한국어화 완료
- ✅ 화합물명 한국어 조회 구현 완료 (메틸 부티레이트, 1-옥탄올 등 실제 표시)

### 4-4. GPT 레시피 생성

- **모델**: GPT-4o-mini (레시피) / GPT-4o (이미지 인식)
- Flavor Network DB 분석 결과(공유 화합물 수 + 실제 화합물명)를 프롬프트에 주입
- 출력 형식: 제목 / 설명 / 재료 / 조리법 / 팁

### 4-5. iOS 앱 구조

| 영역 | 기술 |
|------|------|
| 언어/UI | Swift 5.9, SwiftUI |
| ML/Vision | AVFoundation, Vision, CoreML |
| 아키텍처 | MVVM (CameraViewModel, InventoryViewModel, RecipeGeneratorViewModel) |
| 데이터 | SQLite3 직접 바인딩 (dbQueue로 스레드 안전 보장) |
| 번역 | Apple Translation API + 캐시 서비스 |
| 배포 | xcodebuild + xcrun devicectl (터미널에서 iPhone 직접 빌드/설치/실행) |

---

## 5. 주요 트러블슈팅 (Obstacle → Breakthrough → Impact)

| Obstacle | Breakthrough | Impact |
|----------|-------------|--------|
| 기존 모델이 냉장고 맥락 인식 못함 (치즈 단일 인식률 24%) | Roboflow 1,920장 실제 냉장고 내부 데이터셋 교체 | 인식 클래스 확장 |
| PyTorch MPS NMS 버그 + RAM 스왑 과부하 | 파라미터 최적화 (val=False, patience=0) + 메모리 관리 | **에폭당 학습 시간 161분 → 17분 (약 90% 단축)** |
| GPT-4o가 흰 직사각형 용기를 두부로 오인 | 'white box ≠ tofu' 프롬프트 엔지니어링 + 필터링 강화 | 진행 중 (개선 중) |
| Roboflow v1 지정 시 "Version Number 1 is not found" 오류 | 최신 버전(v10) 명시로 해결 | 배포 자동화 안정화 |

---

## 6. 현재 구현 vs 목표 Gap

| 항목 | 현재 구현 | 목표 (본래 기획) |
|------|----------|----------------|
| 재료 선택 | 수동 선택 | 유통기한 임박 재료 자동 Pivot → 최적 조합 자동 추천 |
| 분자 설명 | GPT 생성 (AI가 지어냄) | DB 실측 화합물명(Furaneol 등) 직접 추출 |
| 한국 식재료 | GPT-4o만 가능, FN DB 없음 | 한국 식재료 전용 YOLO + Korean FN DB 구축 |

---

## 7. 로드맵 (Roadmap)

### Phase 1 — 기반 완성 (현재)

- ✅ 실제 화합물명 DB 쿼리 구현 완료 — 분자 설명 DB 실측값 기반
- 🔄 Flavor Network × 레시피 DB 연결 → 과학적 근거 기반 자동 검색
- 🔄 food_large 51클래스 모델 통합 → 일반 채소/과일 인식 확장
- 🔄 GPT 응답 JSON 구조화 → 파싱 안정성 100%
- 🔄 두부 등 오탐지 해결

### Phase 2 — 한국화 (1개월)

- 한국 식재료 YOLO 모델 — Roboflow로 데이터셋 구축 (김치, 두부, 대파, 된장, 고추장)
- **Korean Flavor Network DB** — 식품안전처/농촌진흥청 오픈 API 활용
- 유통기한 OCR 도입

### Phase 3 — 제품화 (3개월)

- 제로웨이스트 우선순위 알고리즘: 유통기한 임박 재료 자동 Pivot
- 온디바이스 파인튜닝: CoreML Update API로 개인 냉장고 맞춤 모델
- 구독 모델 도입 + App Store 출시

---

## 8. 핵심 차별화 포인트 정리

| 관점 | JANN의 접근 |
|------|-----------|
| **데이터 기반** | Nature 등재 논문 기반 공식 데이터셋 — "유행"이 아닌 "과학"으로 추천 |
| **온디바이스 우선** | YOLOv8n + SQLite로 오프라인 작동 — 통신 비용·프라이버시 동시 해결 |
| **3단계 폴백 구조** | YOLO → GPT-4o → Apple Vision — 인식 누락 최소화 |
| **현장성** | 독립 식재료가 아닌 실제 냉장고 선반 맥락으로 학습 |
| **자동화 파이프라인** | 학습 → CoreML 변환 → Xcode 배포까지 셸 스크립트로 자동화 |

---

## 9. 배운 점

- **모델 선택보다 데이터 맥락이 더 중요**: 동일한 YOLOv8n이어도 "독립 식재료 사진 학습 모델"의 냉장고 인식률은 24%, "실제 냉장고 1,920장 학습 모델"은 실사용 가능 수준 — **데이터 도메인 일치가 모델 아키텍처 선택보다 우선**.
- **온디바이스 + 클라우드 하이브리드의 가치**: YOLOv8n(오프라인·무료) + GPT-4o(보완·과금)의 Parallel 실행 구조로 비용·성능·오프라인 가용성을 동시에 만족.
- **학술 데이터셋의 실용화 가능성**: Nature 논문 데이터셋(Flavor Network)이라는 학술 자산을 SQLite DB로 변환해 모바일 앱에 내장한 경험. 학술과 제품의 거리를 좁히는 작업 자체가 차별화 포인트가 됨.
- **자동화의 투자 회수**: `monitor_and_deploy.sh` 같은 5분짜리 스크립트가 매번 반복되는 빌드 작업을 제거 — DevOps 마인드가 1인 개발에서도 결정적 생산성 차이를 만든다는 체감.
- **에지 케이스의 본질**: "흰 직사각형 = 두부" 같은 GPT-4o 할루시네이션은 단순 프롬프트 패치로 완전히 해결되지 않음 → **모델·프롬프트·후처리 필터의 3중 방어**가 필요한 영역.

---

**Tech Stack**: Swift 5.9 · SwiftUI · CoreML · YOLOv8n (PyTorch → CoreML) · GPT-4o / GPT-4o-mini · SQLite3 · Roboflow · Apple Vision Framework · Apple Translation API
**Keywords**: 분자 미식학 · Flavor Network · 온디바이스 ML · 제로 웨이스트 푸드테크 · iOS 네이티브 · 하이브리드 비전 파이프라인
