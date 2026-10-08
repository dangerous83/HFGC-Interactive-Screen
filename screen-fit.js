/* Preserve one identical 1080 × 1920 portrait kiosk canvas on every device. */
(() => {
  'use strict';

  const DESIGN_WIDTH = 1080;
  const DESIGN_HEIGHT = 1920;
  const viewport = document.getElementById('kiosk-viewport');
  const frame = document.getElementById('kiosk-frame');

  function lockPortraitLayout(doc) {
    if (!doc?.documentElement) return;
    doc.documentElement.dataset.layout = 'kiosk';
    doc.querySelectorAll('#guide-query, #voice-password').forEach(input => {
      input.setAttribute('inputmode', 'none');
    });
  }

  function fit() {
    /* kiosk.html may also be opened directly without the outer iframe. */
    if (!viewport || !frame) {
      lockPortraitLayout(document);
      return;
    }

    const style = getComputedStyle(viewport);
    const left = parseFloat(style.paddingLeft) || 0;
    const right = parseFloat(style.paddingRight) || 0;
    const top = parseFloat(style.paddingTop) || 0;
    const bottom = parseFloat(style.paddingBottom) || 0;
    const availableWidth = Math.max(1, viewport.clientWidth - left - right);

    /* Keep the design stable when a browser keyboard or TV overlay changes
       the visual viewport. Browser zoom remains independent. */
    const visual = window.visualViewport;
    const visibleHeight = visual && visual.scale === 1
      ? Math.min(viewport.clientHeight, visual.height)
      : viewport.clientHeight;
    const availableHeight = Math.max(1, visibleHeight - top - bottom);
    const scale = Math.min(
      availableWidth / DESIGN_WIDTH,
      availableHeight / DESIGN_HEIGHT
    );

    frame.style.width = `${DESIGN_WIDTH}px`;
    frame.style.height = `${DESIGN_HEIGHT}px`;
    frame.style.transform = `scale(${scale})`;
    frame.style.left = `${left + (availableWidth - DESIGN_WIDTH * scale) / 2}px`;
    frame.style.top = `${top + (availableHeight - DESIGN_HEIGHT * scale) / 2}px`;

    lockPortraitLayout(frame.contentDocument);
    frame.style.visibility = 'visible';
  }

  let scheduled = false;
  function scheduleFit() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fit();
    });
  }

  fit();
  window.addEventListener('resize', scheduleFit);
  window.addEventListener('orientationchange', scheduleFit);
  window.visualViewport?.addEventListener('resize', scheduleFit);
  frame?.addEventListener('load', scheduleFit);
  if (viewport && 'ResizeObserver' in window) {
    new ResizeObserver(scheduleFit).observe(viewport);
  }
})();
