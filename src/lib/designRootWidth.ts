/**
 * Width used for `scale = width / 1920` on project pages.
 * WebKit often disagrees with Blink on `getBoundingClientRect().width` vs `clientWidth`
 * (subpixel, scrollbar, compositing). Use the smaller of the two when both are valid so
 * the scaled frame does not exceed the viewport; clamp to the layout viewport width.
 */
export function readDesignRootWidthPx(el: HTMLElement): number {
  const rw = el.getBoundingClientRect().width;
  const cw = el.clientWidth;
  const ow = el.offsetWidth;

  let w = 0;
  if (Number.isFinite(rw) && rw > 0 && Number.isFinite(cw) && cw > 0) {
    w = Math.min(rw, cw);
  } else if (Number.isFinite(rw) && rw > 0) {
    w = rw;
  } else if (Number.isFinite(cw) && cw > 0) {
    w = cw;
  } else if (Number.isFinite(ow) && ow > 0) {
    w = ow;
  }

  if (typeof document !== 'undefined') {
    const vw = document.documentElement?.clientWidth ?? window.innerWidth;
    if (Number.isFinite(vw) && vw > 0 && w > vw + 0.5) {
      w = vw;
    }
  }

  if (Number.isFinite(w) && w > 0) return w;

  if (typeof document !== 'undefined') {
    const vw = document.documentElement?.clientWidth ?? window.innerWidth;
    if (Number.isFinite(vw) && vw > 0) return vw;
  }
  return 1920;
}

/** Subpixels shaved off the root width so scaled paint stays inside overflow-x (fullscreen / large DPR). */
const SCALE_SAFETY_EPS_PX = 0.75;

/**
 * `transform: scale(w/designW)` with a tiny inward nudge so the scaled frame does not
 * paint 1px past the root when ancestors use overflow-x: hidden|clip (worse on wide viewports).
 *
 * If the measured width is still smaller than the epsilon (brief layout / subpixel), falling
 * back to `widthPx / designW` avoids scale 0 — which would hide the whole frame and break
 * IntersectionObserver-based scroll reveals (e.g. Canon).
 */
export function designScaleFromRootWidth(widthPx: number, designW: number): number {
  const numer = widthPx - SCALE_SAFETY_EPS_PX;
  if (numer > 0) return numer / designW;
  return Math.max(0, widthPx) / designW;
}

export function designScaleForRoot(el: HTMLElement, designW: number): number {
  const w = readDesignRootWidthPx(el);
  let s = designScaleFromRootWidth(w, designW);
  if (!Number.isFinite(s) || s <= 0) {
    const vw =
      typeof document !== 'undefined'
        ? document.documentElement?.clientWidth ?? window.innerWidth
        : designW;
    s = designScaleFromRootWidth(vw > 0 ? vw : designW, designW);
  }
  // Guard: absurdly small scale from bad early layout reads (use layout width, not innerWidth)
  if (s < 0.001 && typeof document !== 'undefined') {
    const vw = document.documentElement?.clientWidth ?? window.innerWidth;
    if (vw > 64) {
      s = designScaleFromRootWidth(vw, designW);
    }
  }
  return Number.isFinite(s) && s > 0 ? s : 1;
}
