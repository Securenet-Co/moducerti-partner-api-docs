# vendor — 묶어 둔 바깥 라이브러리

페이지가 인터넷 없이 열리도록, 쓰는 라이브러리를 이 폴더에 넣어 둡니다. 바깥 CDN·글꼴·추적 스크립트는 쓰지 않습니다.

| 라이브러리 | 버전 | npm 게시일 | 라이선스 | 쓰는 곳 | 파일 |
| --- | --- | --- | --- | --- | --- |
| [Redoc](https://github.com/Redocly/redoc) | 2.5.4 | 2026-09-10 | MIT | `api/index.html`(화면에서 실행) | `redoc/redoc.standalone.js` |
| [marked](https://github.com/markedjs/marked) | 18.1.3 | 2026-11-02 | MIT | `scripts/build.cjs`(만들 때만) | `marked/marked.umd.js` |
| [js-yaml](https://github.com/nodeca/js-yaml) | 4.1.0 | 2021-04-14 | MIT | `scripts/build.cjs`(만들 때만) | `js-yaml/js-yaml.min.js` |

각 폴더의 `LICENSE`는 npm 꾸러미에 들어 있던 라이선스 글 그대로입니다. Redoc 묶음 안에 함께 들어 있는 다른 라이브러리의 라이선스 표시는 `redoc/redoc.standalone.js.LICENSE.txt`에 있습니다.

## 파일 지문 (sha256)

| 파일 | sha256 |
| --- | --- |
| `redoc/redoc.standalone.js` (npm 원본) | `dcaf76612bc4a3fbcc923a8966dee2f6146a5f32e5ce1b6f02dd60cbbf89500b` |
| `redoc/redoc.standalone.js` (이 저장소, 한 곳 고침) | `4deffce98484f85cf3d8a30b64c11c292b9f2039f3b14972ca358654c71e23a7` |
| `marked/marked.umd.js` (npm 원본 그대로) | `c34a221dc89e91833a88822e7717b8a0cf27118f8c9a8779dffb48a6be31f97a` |
| `js-yaml/js-yaml.min.js` (npm 원본 그대로) | `45dc3dd03dc07a06705a2c2989b8c7f709013f04bd5386e3279d4e447f07ebd7` |

## Redoc 에서 고친 한 곳

Redoc 2.x 는 맨 아래 "API docs by Redocly" 옆 로고 그림을 바깥 주소에서 불러옵니다. 이 문서는 인터넷 없이 열려야 하고 읽는 사람의 접속 기록을 밖에 남기지 않아야 해서, 그 그림 주소 한 곳을 빈 그림(`data:`)으로 바꿨습니다. 그 밖의 내용은 npm 원본과 같습니다.

- 고치는 스크립트: `scripts/patch-redoc.cjs`
- 새 버전으로 바꿀 때: npm 꾸러미의 `bundles/redoc.standalone.js`를 이 폴더에 덮어쓴 뒤 `node scripts/patch-redoc.cjs`를 돌리고, 위 표의 버전·게시일·지문을 고칩니다.

## 그 밖에

- 두 페이지에는 보안 정책(CSP)을 넣어, 묶음이 바깥으로 요청을 보내려 해도 브라우저가 막습니다.
- 묶음 끝의 `sourceMappingURL` 줄은 원본 그대로 두었습니다. 지도 파일(`.map`)은 넣지 않았고, 개발자 도구를 열 때만 같은 폴더에서 찾다가 없으면 넘어갑니다.
