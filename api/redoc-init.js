// 페이지 안에 넣어 둔 규격으로 Redoc 을 그린다. 밖에서 받아 오는 것은 없다.
(function () {
  var spec = JSON.parse(document.getElementById("openapi-spec").textContent);

  // 설명 글의 "~"는 범위 표시(1~9자리, 1900~2200)다. 취소선으로 그려지지 않게 화면에 그릴 때만 막아 둔다.
  (function keepTilde(node) {
    if (!node || typeof node !== "object") return;
    Object.keys(node).forEach(function (key) {
      var value = node[key];
      if (key === "description" && typeof value === "string") node[key] = value.replace(/~/g, "\\~");
      else keepTilde(value);
    });
  })(spec);

  var sans = '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", "Malgun Gothic", "Segoe UI", sans-serif';
  var mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
  // 서버 주소는 연동사마다 따로 안내하는 값이라 규격에는 변수({baseUrl})로 적혀 있다.
  // Redoc 은 변수를 풀지 않고 이 페이지의 주소에 이어 붙여 보여 주므로, 화면에는 변수의 기본값(자리 값)을 넣어 보여 준다.
  (spec.servers || []).forEach(function (server) {
    var vars = server.variables || {};
    server.url = String(server.url).replace(/\{([^}]+)\}/g, function (whole, name) {
      return vars[name] && vars[name].default ? vars[name].default : whole;
    });
    server.description = (server.description || "") + " (아래 주소는 자리 값)";
  });

  Redoc.init(
    spec,
    {
      hideDownloadButton: true,
      nativeScrollbars: true,
      expandResponses: "200",
      theme: {
        colors: { primary: { main: "#0b57d0" } },
        typography: {
          fontFamily: sans,
          fontSize: "15px",
          headings: { fontFamily: sans, fontWeight: "600" },
          code: { fontFamily: mono, fontSize: "13px" },
        },
        sidebar: { width: "280px" },
        rightPanel: { backgroundColor: "#1f2328" },
      },
    },
    document.getElementById("redoc")
  );
})();
