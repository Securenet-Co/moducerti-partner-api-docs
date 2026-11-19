// vendor/redoc/redoc.standalone.js 를 npm 원본에서 한 곳만 고친다.
// Redoc 2.x 는 맨 아래 "API docs by Redocly" 옆 로고 그림을 바깥 주소에서 불러온다.
// 이 문서는 인터넷 없이 열려야 하고 읽는 사람의 접속 기록을 밖에 남기지 않아야 해서, 그 주소를 빈 그림(data:)으로 바꾼다.
// 실행: node scripts/patch-redoc.cjs   (이미 고친 파일에 다시 돌리면 아무것도 바꾸지 않는다)
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "vendor/redoc/redoc.standalone.js");
const FROM = 'src:"https://cdn.redoc.ly/redoc/logo-mini.svg"';
const TO = 'src:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="';

const src = fs.readFileSync(file, "utf8");
const count = src.split(FROM).length - 1;
if (count === 0 && src.includes(TO)) {
  console.log("이미 고친 파일이다.");
} else if (count !== 1) {
  throw new Error(`바꿀 곳이 1곳이어야 하는데 ${count}곳이다. Redoc 버전을 확인한다.`);
} else {
  fs.writeFileSync(file, src.replace(FROM, TO));
  console.log("로고 주소 1곳을 바꿨다.");
}
