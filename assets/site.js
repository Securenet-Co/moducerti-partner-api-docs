// 화면 위에 고정된 맨 위 줄의 실제 높이를 재서 --top-h 에 넣는다.
// 좁은 화면에서는 줄이 바뀌어 높이가 달라지므로 값을 박아 두지 않고 잰다. 목차·제목 위치(site.css)와 API 참조의 이동 위치가 이 값을 쓴다.
(function () {
  var header = document.querySelector("header.top");
  if (!header) return;
  function measure() {
    document.documentElement.style.setProperty("--top-h", Math.ceil(header.getBoundingClientRect().height) + "px");
  }
  measure();
  if (window.ResizeObserver) new ResizeObserver(measure).observe(header);
  window.addEventListener("resize", measure);
})();
