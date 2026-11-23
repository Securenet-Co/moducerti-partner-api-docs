# 모두의인증 연동 API 문서

## Why

모두의인증과 연동하려는 서비스의 개발자가 회원·업체 등록, 인증 신청, 신청 조회 규격을 한곳에서 읽고 바로 구현할 수 있게 합니다.

## 보는 방법

- `index.html` — 안내서. 브라우저로 열면 됩니다. 인터넷이 없어도 열립니다.
- `api/index.html` — OpenAPI 참조 페이지(요청·응답 모양을 기능별로 봅니다).
- `docs/moducerti-partner-api.md` — 안내서 원본.
- `docs/openapi.yaml` — OpenAPI 3.0 원본. API 도구에 불러올 때 이 파일을 씁니다.
- `CHANGELOG.md` — 버전마다 달라진 점.

## 고치는 방법

원본은 `docs/`의 두 파일입니다. 고친 뒤 아래 명령으로 두 페이지를 다시 만듭니다. 설치할 것은 없고 Node.js만 있으면 됩니다.

```bash
node scripts/build.cjs
```

- 버전을 올릴 때는 안내서 맨 위와 8절 변경 이력, `docs/openapi.yaml`의 `info.version`, `CHANGELOG.md`를 함께 고칩니다.
- 페이지는 바깥 CDN·글꼴·추적 스크립트를 쓰지 않습니다. 묶어 둔 라이브러리와 라이선스는 `vendor/README.md`에 있습니다.
- API 키, 시험 환경 주소, 연동사 이름처럼 연동사마다 다른 값은 이 저장소에 적지 않습니다.
