// Set year
document.getElementById('y').textContent = new Date().getFullYear();

// Parallax on mouse move for elements with data-depth
(function() {
  const items = Array.from(document.querySelectorAll('.parallax-item'));
  const lerp = (a, b, t) => a + (b - a) * t;
  const state = { x: 0, y: 0, dx: 0, dy: 0 };

  function onMove(e) {
    const w = window.innerWidth, h = window.innerHeight;
    const x = (e.clientX / w - 0.5) * 2; // -1..1
    const y = (e.clientY / h - 0.5) * 2;
    state.dx = x; state.dy = y;
  }

  function tick() {
    state.x = lerp(state.x, state.dx, 0.07);
    state.y = lerp(state.y, state.dy, 0.07);
    items.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-depth') || '8');
      const tx = -state.x * depth;
      const ty = -state.y * depth;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
    requestAnimationFrame(tick);
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  tick();
})();

// Scroll reveal
(function() {
  const els = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      e.target.classList.add('in'); io.unobserve(e.target);
    }
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();