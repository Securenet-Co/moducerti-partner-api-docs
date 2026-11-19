// docs/ 의 원본(md, yaml)으로 index.html 과 api/index.html 을 만든다.
// 실행: node scripts/build.cjs   (npm 설치 없음 — vendor/ 의 라이브러리만 쓴다)
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const { marked } = require(path.join(root, "vendor/marked/marked.umd.js"));
const yaml = require(path.join(root, "vendor/js-yaml/js-yaml.min.js"));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, s) => fs.writeFileSync(path.join(root, p), s);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (html) => html.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

const TITLE = "모두의인증 연동 API 문서";
const CSP_GUIDE = "default-src 'none'; style-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'";
// Redoc 은 화면을 그리며 style 태그를 만들고 검색용 작업 스레드를 blob 으로 띄운다. 밖으로 나가는 요청은 모두 막는다.
const CSP_API = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; worker-src blob:; child-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'";

const topBar = (prefix, current) => `<header class="top">
  <a class="brand" href="${prefix}index.html">${TITLE}</a>
  <nav class="top-nav" aria-label="문서">
    <a href="${prefix}index.html"${current === "guide" ? ' aria-current="page"' : ""}>안내서</a>
    <a href="${prefix}api/index.html"${current === "api" ? ' aria-current="page"' : ""}>API 참조</a>
    <a href="${prefix}docs/openapi.yaml">OpenAPI 파일</a>
  </nav>
</header>`;

// ---- 안내서 ----
const md = read("docs/moducerti-partner-api.md");
// 문서의 "~"는 범위 표시(1~5장, 1900~2200)다. 취소선으로 읽지 않게 그 문법을 끈다.
marked.use({ tokenizer: { del() { return undefined; } } });
let body = marked.parse(md);
if (/<del>|<em>/.test(body)) throw new Error("뜻하지 않은 취소선·기울임이 생겼다. 원본의 ~ 와 * 를 확인한다.");

const toc = [];
let h2 = 0;
let h3 = 0;
body = body.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
  const text = plain(inner).trim();
  const num = /^(\d+(?:-\d+)?)\. /.exec(text);
  let id;
  if (level === "2") { h2 += 1; h3 = 0; id = num ? `s${num[1]}` : `s${h2}`; }
  else { h3 += 1; id = num ? `s${num[1]}` : `s${h2}-x${h3}`; }
  toc.push({ level: Number(level), id, text });
  return `<h${level} id="${id}">${inner}</h${level}>`;
});
const ids = toc.map((t) => t.id);
if (new Set(ids).size !== ids.length) throw new Error("제목 id 가 겹친다: " + ids.join(" "));

body = body.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
body = body.replace(/<h1>[\s\S]*?<\/h1>/, (m) => m.replace("<h1>", '<h1 id="top">'));

const tocHtml = toc
  .map((t) => `<li class="toc-l${t.level}"><a href="#${t.id}">${esc(t.text)}</a></li>`)
  .join("\n        ");

write("index.html", `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP_GUIDE}">
<meta name="referrer" content="no-referrer">
<title>${TITLE}</title>
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
${topBar("", "guide")}
<div class="layout">
  <nav class="toc" aria-label="목차">
    <p class="toc-title">목차</p>
    <ul>
        ${tocHtml}
    </ul>
  </nav>
  <main class="doc">
${body}
  </main>
</div>
</body>
</html>
`);

// ---- API 참조 ----
const spec = yaml.load(read("docs/openapi.yaml"));
// file:// 로 열면 yaml 을 따로 읽어 올 수 없어서 규격을 페이지 안에 넣는다. "<" 는 태그로 읽히지 않게 바꾼다.
const specJson = JSON.stringify(spec).replace(/</g, "\\u003c");

write("api/index.html", `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP_API}">
<meta name="referrer" content="no-referrer">
<title>${TITLE} — API 참조</title>
<link rel="stylesheet" href="../assets/site.css">
</head>
<body class="api-page">
${topBar("../", "api")}
<noscript><p class="notice">이 페이지는 스크립트가 켜져 있어야 보입니다. 같은 내용은 <a href="../index.html">안내서</a>와 <a href="../docs/openapi.yaml">OpenAPI 파일</a>에 있습니다.</p></noscript>
<div id="redoc"></div>
<script type="application/json" id="openapi-spec">${specJson}</script>
<script src="../vendor/redoc/redoc.standalone.js"></script>
<script src="redoc-init.js"></script>
</body>
</html>
`);

console.log(`index.html: 제목 ${toc.length}개, 표 ${(body.match(/<table>/g) || []).length}개, 코드 블록 ${(body.match(/<pre>/g) || []).length}개`);
console.log(`api/index.html: 경로 ${Object.keys(spec.paths).length}개, 규격 ${specJson.length}자`);
