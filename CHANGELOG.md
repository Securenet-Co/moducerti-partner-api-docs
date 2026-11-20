# 변경 이력

판 번호는 안내서(`docs/moducerti-partner-api.md`) 맨 위·8절과 `docs/openapi.yaml`의 `info.version`과 같습니다.

## 제2판 — 2026-11-21

OpenAPI `info.version`: `v1-ed2-2026-11-21`

- 등록 `status`가 `registered`·`certificate_required`·`on_hold` 세 가지가 되었습니다(안내서 3-3·3-4). **제1판의 `review_required`는 `certificate_required`로 이름이 바뀌었습니다**(뜻은 같습니다). 제1판 기준으로 만드신 곳은 `status` 값 비교를 고쳐 주세요.
- 새 상태 `on_hold`("확인 필요")가 추가되었습니다. `on_hold`일 때만 `holdReason`(`COMPANY_UNAVAILABLE`·`ACCOUNT_UNAVAILABLE`)과 고정 `message`가 응답에 실립니다. 같은 요청을 다시 보내도 처리하지 않고 같은 값을 돌려줍니다(3-5). 등록 확인(3-7)도 같은 값입니다.
- 성공 응답에 `statusCode`(정수 200)가 있음을 OpenAPI의 필수 칸으로 명시했고, 등록·확인 응답 스키마를 상태별 두 모양(`additionalProperties: false`)으로 나눴습니다.
- 승인 대기 직원 가입 요청: 사업자등록증을 실어 보낸 등록이 기존 승인 업체에 이어져 `registered`로 끝날 때, 또는 담당자가 `on_hold`를 풀면서 기존 업체에 이어 줄 때, 그 업체에 신청자의 직원 정보가 없으면 "승인 대기" 직원으로 가입 요청됩니다(이미 직원이면 그대로). `certificate_required`는 업체를 이어 붙이지 않습니다. 업체 마스터가 승인하기 전에는 업체 권한이 없습니다(3-6).
- 인증 신청: `registered`여도 신청 때 이어진 회원·업체를 다시 확인해 통과하지 못하면 `409`이고, `certificate_required`·`on_hold` 등록으로 신청하면 `409` `MEMBER_REVIEW_REQUIRED`입니다(4-5).
- 가입 상태 변경 알림(웹훅)은 추후 제공 예정이며, 그 전에는 등록 확인(`GET /partner/v1/members/{memberId}`)으로 확인합니다. 등록 문의는 `memberId`로, 오류 응답(신청 `409` 등)을 받았다면 그 응답의 `traceId`도 함께 보내 주세요(등록·확인 성공 응답에는 `traceId`가 없습니다).

## 제1판 — 2026-11-19

OpenAPI `info.version`: `v1-ed1-2026-11-19`

- 첫 판. 회원·업체 등록, 등록 확인, 인증 신청, 신청 조회(건별·묶음·전체 재대조 목록) 규격을 실었습니다.
- 발급 문서 내려받기·웹훅·정산은 준비 중입니다.

### 설명 보탬 — 2026-11-19

규격(경로·칸·응답)은 그대로이고 설명만 보탰습니다. 판 번호와 `info.version`은 바꾸지 않았습니다.

- `memberId`는 (회원 이메일, 업체 사업자등록번호) 한 쌍마다 하나입니다(안내서 3-5).
- `externalOrderId`는 연동 서비스 전체에서 유일해야 합니다(안내서 4-4).
- `409 MEMBER_REVIEW_REQUIRED`를 받았을 때 할 일(안내서 4-5).
- 조회 범위는 연동 서비스 전체이고, 워크스페이스별 접근 제어는 연동사가 합니다(안내서 5절).
