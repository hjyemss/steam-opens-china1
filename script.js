(function () {
  function showAll() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function initReveal() {
    // 浏览器不支持 IntersectionObserver 时直接全部显示
    if (!('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });

    // 兜底：3 秒后仍未触发的元素强制显示
    setTimeout(showAll, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();