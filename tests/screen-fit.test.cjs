const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'screen-fit.js'), 'utf8');

function setup(width, height, options = {}) {
  const listeners = {};
  const input = {setAttribute(name, value) { this[name] = value; }};
  const child = {documentElement: {dataset: {}}, querySelectorAll: () => [input]};
  const viewport = {clientWidth: width, clientHeight: height};
  const frame = {style: {}, contentDocument: child, addEventListener(name, callback) {listeners['frame:' + name] = callback;}};
  const document = {documentElement: {dataset: {}}, querySelectorAll: () => [input], getElementById: id => options.direct ? null : id === 'kiosk-frame' ? frame : viewport};
  const screen = {width: options.screenWidth ?? width, height: options.screenHeight ?? height};
  const visualViewport = options.noVisualViewport ? undefined : {height, scale: 1, addEventListener(name, callback) {listeners['visual:' + name] = callback;}};
  const window = {innerWidth: width, innerHeight: height, visualViewport, matchMedia: () => ({matches: !!options.coarse}), addEventListener(name, callback) {listeners[name] = callback;}};
  const padding = options.padding ?? [0, 0, 0, 0];
  vm.runInNewContext(source, {document, window, screen, navigator: {maxTouchPoints: options.touch ?? 5}, getComputedStyle: () => ({paddingLeft: padding[0] + 'px', paddingRight: padding[1] + 'px', paddingTop: padding[2] + 'px', paddingBottom: padding[3] + 'px'}), requestAnimationFrame: callback => callback(), ResizeObserver: class {observe() {}}});
  return {frame, child, document, input, viewport, screen, window, visualViewport, listeners};
}

const tablets = [[768,1024],[820,1180],[834,1194],[1024,1366],[744,1133],[800,1280],[1280,800],[1024,768],[1180,820],[1366,1024]];
for (const [width,height] of tablets) {
  const env = setup(width,height);
  assert.equal(env.child.documentElement.dataset.layout, 'tablet');
  assert.equal(env.frame.style.width, width + 'px');
  assert.equal(env.frame.style.height, height + 'px');
  assert.equal(env.frame.style.transform, 'scale(1)');
  assert.equal(env.input.inputmode, 'text');
}
const rotate = setup(744,1133);
rotate.viewport.clientWidth=1133; rotate.viewport.clientHeight=744;
rotate.screen.width=1133; rotate.screen.height=744; rotate.visualViewport.height=744;
rotate.listeners.orientationchange();
assert.equal(rotate.frame.style.width,'1133px');
assert.equal(rotate.frame.style.height,'744px');

const split = setup(375,1024,{screenWidth:820,screenHeight:1180});
assert.equal(split.child.documentElement.dataset.layout,'tablet');
assert.equal(split.frame.style.width,'375px');
split.visualViewport.height=420; split.listeners['visual:resize']();
assert.equal(split.frame.style.height,'420px');
assert.equal(split.child.documentElement.dataset.layout,'tablet');
split.visualViewport.scale=2; split.visualViewport.height=210; split.listeners['visual:resize']();
assert.equal(split.frame.style.height,'1024px','pinch zoom must not rescale the canvas');

const safe = setup(820,1180,{padding:[16,16,24,20]});
assert.equal(safe.frame.style.width,'788px');
assert.equal(safe.frame.style.height,'1136px');
assert.equal(safe.frame.style.left,'16px');
assert.equal(safe.frame.style.top,'24px');
safe.frame.contentDocument={documentElement:{dataset:{}},querySelectorAll:()=>[]};
safe.listeners['frame:load']();
assert.equal(safe.frame.contentDocument.documentElement.dataset.layout,'tablet');

for(const [width,height,touch] of [[1440,900,0],[390,844,5],[1080,1920,5],[1920,1080,5]]){
  const env=setup(width,height,{touch});
  assert.equal(env.child.documentElement.dataset.layout,'kiosk');
  assert.equal(env.frame.style.width,'1080px');
  assert.equal(env.frame.style.height,'1920px');
  assert.equal(env.frame.style.transform,`scale(${Math.min(width/1080,height/1920)})`);
  assert.equal(env.input.inputmode,'none');
}
assert.equal(setup(820,1180,{noVisualViewport:true}).child.documentElement.dataset.layout,'tablet');
assert.equal(setup(820,1180,{touch:0,coarse:true}).child.documentElement.dataset.layout,'tablet');
assert.equal(setup(820,1180,{direct:true}).document.documentElement.dataset.layout,'tablet');
console.log('Tablet sizing passed: 10 portrait/landscape sizes, rotation, Split View, keyboard, zoom, safe areas, direct page, and kiosk/phone regressions.');
