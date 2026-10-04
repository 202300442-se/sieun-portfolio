(() => {
  const ring = document.querySelector('.cursor-ring');
  const motion = matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)');
  let x = 0, y = 0, scheduled = false;
  document.addEventListener('pointermove', event => {
    if (!motion.matches || event.pointerType !== 'mouse') return;
    x = event.clientX; y = event.clientY;
    ring.classList.add('visible');
    ring.classList.toggle('over-link', Boolean(event.target.closest('a,button,summary')));
    if (!scheduled) { scheduled = true; requestAnimationFrame(() => {
      ring.style.left = x + 'px'; ring.style.top = y + 'px'; scheduled = false;
    }); }
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => ring.classList.remove('visible'));
  window.addEventListener('blur', () => ring.classList.remove('visible'));
  const links = [...document.querySelectorAll('nav a')];
  const update = () => links.forEach(link => {
    if (link.hash === (location.hash || '#home')) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
  addEventListener('hashchange', update); update();
})();
