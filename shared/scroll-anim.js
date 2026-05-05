/* scroll-anim.js — 포트폴리오 허브 스크롤 애니메이션 */

/* 페이지 로드 시 URL 해시 제거 (리프레시 시 자동 스크롤 방지) */
if (location.hash) {
  history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
}

(function () {
  /* 카드 / 섹션 fade-in */
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          fadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .stack-row, .about-bio').forEach((el) => {
    el.classList.add('js-fade');
    fadeObserver.observe(el);
  });

  /* 스탯 카운트업 */
  function countUp(el, raw, duration) {
    const prefix = raw.match(/^[^0-9]*/)[0];      // '$'
    const suffix = raw.match(/[^0-9.]*$/)[0];      // 'k'
    const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;

    const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);        // ease-out cubic
      const cur  = Math.round(num * ease);
      el.textContent = prefix + cur + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    })(start);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const sv = e.target.querySelector('.sv');
          if (sv) countUp(sv, sv.textContent.trim(), 1200);
          statObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.sstat').forEach((el) => statObserver.observe(el));
})();
