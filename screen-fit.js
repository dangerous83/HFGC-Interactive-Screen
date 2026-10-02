/* Keep one 1080 x 1920 design viewport; scale it without mobile reflow. */
(() => {
  'use strict';
  const viewport = document.getElementById('kiosk-viewport');
  const frame = document.getElementById('kiosk-frame');
  function fit() {
    const style = getComputedStyle(viewport);
    const left = parseFloat(style.paddingLeft) || 0;
    const right = parseFloat(style.paddingRight) || 0;
    const top = parseFloat(style.paddingTop) || 0;
    const bottom = parseFloat(style.paddingBottom) || 0;
    const width = viewport.clientWidth - left - right;
    const height = viewport.clientHeight - top - bottom;
    const scale = Math.min(width / 1080, height / 1920);
    frame.style.transform = `scale(${scale})`;
    frame.style.left = `${left + (width - 1080 * scale) / 2}px`;
    frame.style.top = `${top + (height - 1920 * scale) / 2}px`;
    frame.style.visibility = 'visible';
  }
  fit();
  window.addEventListener('resize', fit);
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(viewport);
})();
