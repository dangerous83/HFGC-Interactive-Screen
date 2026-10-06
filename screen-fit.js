/* Keep the portrait TV canvas; give touch tablets their actual CSS viewport. */
(() => {
  'use strict';
  const viewport = document.getElementById('kiosk-viewport');
  const frame = document.getElementById('kiosk-frame');
  function useTabletLayout(width, height) {
    const touch = navigator.maxTouchPoints > 0 || window.matchMedia('(any-pointer: coarse)').matches;
    const shortSide = Math.min(screen.width, screen.height);
    const longSide = Math.max(screen.width, screen.height);
    return touch && ((shortSide >= 600 && longSide <= 1600) || (width >= 600 && width <= 1440 && height >= 420 && height <= 1600));
  }
  function applyLayout(doc, tablet) {
    if (!doc?.documentElement) return;
    doc.documentElement.dataset.layout = tablet ? 'tablet' : 'kiosk';
    doc.querySelectorAll('#guide-query, #voice-password').forEach(input => input.setAttribute('inputmode', tablet ? 'text' : 'none'));
  }
  function fit() {
    if (!viewport || !frame) {
      applyLayout(document, useTabletLayout(window.innerWidth, window.innerHeight));
      return;
    }
    const style = getComputedStyle(viewport);
    const left = parseFloat(style.paddingLeft) || 0;
    const right = parseFloat(style.paddingRight) || 0;
    const top = parseFloat(style.paddingTop) || 0;
    const bottom = parseFloat(style.paddingBottom) || 0;
    const width = Math.max(1, viewport.clientWidth - left - right);
    // Safari's keyboard changes the visual viewport. Pinch zoom must remain independent.
    const visual = window.visualViewport;
    const visibleHeight = visual && visual.scale === 1 ? Math.min(viewport.clientHeight, visual.height) : viewport.clientHeight;
    const height = Math.max(1, visibleHeight - top - bottom);
    const tablet = useTabletLayout(width, height);
    const frameWidth = tablet ? width : 1080;
    const frameHeight = tablet ? height : 1920;
    const scale = tablet ? 1 : Math.min(width / 1080, height / 1920);
    frame.style.width = `${frameWidth}px`;
    frame.style.height = `${frameHeight}px`;
    frame.style.transform = `scale(${scale})`;
    frame.style.left = `${left + (width - frameWidth * scale) / 2}px`;
    frame.style.top = `${top + (height - frameHeight * scale) / 2}px`;
    applyLayout(frame.contentDocument, tablet);
    frame.style.visibility = 'visible';
  }
  let scheduled = false;
  function scheduleFit() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; fit(); });
  }
  fit();
  window.addEventListener('resize', scheduleFit);
  window.addEventListener('orientationchange', scheduleFit);
  window.visualViewport?.addEventListener('resize', scheduleFit);
  frame?.addEventListener('load', scheduleFit);
  if (viewport && 'ResizeObserver' in window) new ResizeObserver(scheduleFit).observe(viewport);
})();
