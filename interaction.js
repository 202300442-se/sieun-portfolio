(() => {
  const glow = document.querySelector('.pointer-glow');
  if (!glow) return;
  const allowed = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let frame = 0;
  let x = innerWidth * .78, y = innerHeight * .28;
  const paint = () => {
    glow.style.setProperty('--pointer-x', `${x}px`);
    glow.style.setProperty('--pointer-y', `${y}px`);
    frame = 0;
  };
  const move = event => {
    if (!allowed.matches || event.pointerType === 'touch') return;
    x = event.clientX; y = event.clientY;
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const sync = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    glow.style.removeProperty('--pointer-x');
    glow.style.removeProperty('--pointer-y');
  };
  document.addEventListener('pointermove', move, { passive: true });
  allowed.addEventListener('change', sync);
})();
