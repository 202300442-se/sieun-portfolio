# Kim Sieun — Personal Portfolio

## Purpose

해외영업 직무를 알아보는 방문자에게 저의 전공, 현장 경험, 국제 커뮤니케이션과 콘텐츠 제작 경험을 소개하기 위한 개인 홈페이지입니다. NEXTAI는 제가 구상한 가상의 AI 인재 프로필 플랫폼이며, 그 안에 김시은의 포트폴리오가 등록된 형태로 디자인했습니다. 실제 플랫폼이나 AI 평가 서비스는 아닙니다.

## Live Website

- 공개 홈페이지: https://202300442-se.github.io/sieun-portfolio/
- GitHub 저장소: https://github.com/202300442-se/sieun-portfolio

## About the Site

HOME / ABOUT / EXPERIENCE / PROJECTS / CONTENT / CONTACT로 이동하는 단일 페이지입니다. 융합일본지역전공·경영학 부전공, 레드불 Student Marketeer, 국제행사 운영, 제조업 실무와 블로그 콘텐츠 제작 경험을 담았습니다. CONTENT 아래 Learning Log는 Google Sheet의 공개 항목을 표시합니다.

## Featured Project

산업용 브러시 홈페이지 리뉴얼은 **In Progress / 준비 중 — Fall 2026**입니다. 제품 정보 구조, SEO와 해외 고객 접근성 개선이 목표이며 실제 문의 접수·AI 상담 기능은 아직 구현하지 않았습니다. 기존 https://202300442-se.github.io/ 에 연결하며, 해당 저장소는 이 과제에서 수정하지 않았습니다.

## Run Locally

Python 3.13 이상에서 별도 패키지 없이 실행할 수 있습니다.

```sh
python scripts/check_site.py
python -m http.server 8765 --bind 127.0.0.1
```

http://127.0.0.1:8765 를 엽니다. HTML 파일을 직접 더블클릭하면 학습 기록 JSON 읽기가 제한될 수 있습니다.

## How to Modify

- `index.html`: 자기소개, 경험, 프로젝트 상태, 콘텐츠 링크와 이메일을 수정합니다.
- `portfolio.css`: 색상, 글자 크기, 여백과 모바일 화면을 수정합니다. 기존 `style.css`는 보존한 이전 디자인이며 현재 페이지에서 불러오지 않습니다.
- `interaction.js`: 단색 커서 링과 메뉴 선택 표시를 담당합니다.
- `learning-log.js`: 공부 기록 필터와 상세 보기입니다.
- `assets/`: 직접 제공한 로고와 기존 프로젝트 제품 사진입니다.
- Learning Log는 아래 시트 운영 안내에 따라 수정합니다. 변경 후 검사를 실행하고 main에 반영하면 배포됩니다.

## Current Status

개인 포트폴리오와 공개 공부 기록을 구현했습니다. 프로젝트는 미완성 상태를 표시했습니다. 이름·학교·전공·이메일 외에 전화번호, 집 주소, 생년월일 등 불필요한 개인정보는 넣지 않았습니다. NEXTAI에는 회원가입이나 실제 AI 평가 기능이 없습니다.

## Review & Improvements

김시은이 전달한 동료 의견과 반영 내용:

1. **이미지가 적어 구성이 밋밋하다.** 기존에 제공한 실제 산업용 브러시 제품 사진을 Projects에 추가했습니다. 개인 로고도 유지했고 밝고 어두운 단색 영역, 큰 제목과 여백으로 화면의 리듬을 정리했습니다. 인물·활동 사진은 제공되지 않아 다른 사람의 사진이나 가짜 사진으로 대체하지 않았습니다.
2. **NEXTAI 홈페이지 안에 본인 포트폴리오를 등록하는 이중 구조 아이디어가 돋보인다.** 상단 NEXTAI와 작은 설명 아래 KIM SIEUN PORTFOLIO를 배치해 두 단계의 위계를 보이도록 수정했습니다.
3. **스크롤이나 마우스 커서에 작은 효과가 있으면 좋겠다.** 기본 커서는 유지하고 마우스를 따라 작은 단색 링이 이동하도록 구현했습니다. 링크 위에서는 링이 조금 커지며 클릭을 막지 않습니다. 터치 환경과 움직임 줄이기 설정에서는 효과를 끕니다.

검수 결과와 제한은 `QA.md`에 기록합니다. 작성된 경험은 김시은이 제공한 자료를 바탕으로 정리했으며 성과 수치를 만들지 않았습니다. 제출 전 김시은이 본인의 경험 문장과 공개 화면을 직접 확인해야 합니다. 실제 동료의 최종 재검토는 아직 받지 않았습니다.

## Tools / AI Assistance

HTML, CSS, JavaScript, Python 표준 라이브러리, Google Sheets, GitHub Actions와 GitHub Pages를 사용했습니다. 김시은이 방향·경험 자료·동료 피드백·참고 이미지를 제공했으며 AI가 화면 설계, 문장 정리, 코드 작성과 검수를 도왔습니다. 코드 전체를 직접 작성했다고 주장하지 않습니다. 디자인 참고 이미지의 사진은 복제하지 않았습니다.

## Learning Log 운영

Google Sheet의 기존 `시트1`은 그대로 보존합니다. `Brush Industry`와 `Economy Study` 탭에 다음 열을 사용합니다.

날짜 / 출처 / 분야 / 제목 / 핵심요약 / 경제·산업 개념 / 내가 배운 점 / 추가 공부할 개념 / 회사/진로 연결 / 원문 링크 / 읽음 / 공개 / 검증

날짜는 `YYYY-MM-DD`로 입력합니다. `공개=Y`이고 제목과 핵심요약이 있는 행만 홈페이지 데이터에 포함됩니다. `읽음`은 개인 학습 상태이며 공개 여부와 독립적입니다. 공개 전에 출처·날짜·요약과 본인 성찰을 검토하세요. 초기 브러쉬 자료의 성찰은 AI가 제안한 초안으로 명시했습니다. 한경 요약 13건은 사용자의 공개 요청에 따라 `Economy Study`에 반영하고 `공개=Y`로 표시했습니다. 기사 원문과 수치는 미검증이며, 제공 요약을 정리한 학습 자료로 구분합니다. 본인 성찰은 작성하지 않았습니다. 날짜가 명시되지 않은 두 번째 요약의 5건은 기록일을 사용하고 작성일 미상임을 표시합니다. 기존 CPSC 기록은 불완전해 보존만 했습니다.

이 Sheet는 작업 전부터 **링크를 아는 누구나 읽기**로 공유되어 있었습니다. `공개=N`은 이 홈페이지에서 제외한다는 뜻이며 Google Sheet 자체의 접근을 제한하지 않습니다. 비공개 개인정보나 업무 기밀은 이 시트에 넣지 않습니다. 이번 작업은 공유 권한을 확대하지 않습니다.

`scripts/sync_learning_log.py`는 두 탭의 CSV를 읽고 공개 행만 `data/learning-log.json`에 원자적으로 저장합니다. 두 탭 중 하나라도 오류가 나면 기존 파일을 유지하며 실패합니다. 동일한 데이터는 불필요하게 커밋하지 않습니다. JSON은 사이트와 같은 주소에서 읽으므로 브라우저의 Google 인증이나 교차 출처 접근에 의존하지 않습니다.

## GitHub Actions와 배포

- `deploy.yml`: main 변경 또는 수동 실행 시 파일·데이터 검사를 거쳐 GitHub Pages 배포.
- `learning_log.yml`: 매일 한국 시간 오전 7시 17분에 시트를 동기화. GitHub 일정 실행은 지연될 수 있습니다. Actions의 **Update Learning Log → Run workflow**로 즉시 실행할 수 있습니다.
- 업데이트가 있으면 JSON을 커밋하고 재사용 가능한 `deploy.yml`을 직접 호출합니다. 기본 GitHub 토큰의 커밋이 다른 push 워크플로를 자동 실행하지 않는 제약을 고려했습니다.
- Pages 설정의 Source는 **GitHub Actions**를 사용합니다. 공개 사이트 파일만 배포하고 README·작업 스크립트·백업은 배포 폴더에서 제외합니다.
- 추가 패키지·API 키·서비스 계정·저장소 시크릿이 필요하지 않습니다. 현재의 공개 읽기 권한이 해제되면 자동 동기화는 실패하므로 인증 방식 재설계가 필요합니다.

## 로컬 확인

```sh
python scripts/sync_learning_log.py
python scripts/check_site.py
python -m http.server 8765 --bind 127.0.0.1
```

http://127.0.0.1:8765 에서 확인합니다. 파일을 직접 더블클릭하면 브라우저가 JSON 읽기를 차단할 수 있습니다.


## Typography and latest requested changes

전체 글꼴은 [Pretendard 공식 프로젝트](https://github.com/orioncactus/pretendard)의 웹폰트를 사용합니다. 본문은 Light(300), 제목은 400–500입니다. CDN이 차단된 환경에서는 시스템 sans-serif로 대체됩니다. 한글은 keep-all로 단어 단위 줄바꿈합니다. 새 로고는 `assets/se-logo.jpeg`이며 HOME 오른쪽에 90% 투명도(opacity 0.1), 페이드 마스크와 배경색 #F4F3E9로 표시합니다. 공부 기록 뒤의 신문 이미지는 사용자 첨부 파일이며 명함형 ABOUT·EXPERIENCE 문장과 함께 2026-10-04 수정 요청을 반영했습니다.
