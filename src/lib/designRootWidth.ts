/**
 * Width used for `scale = width / 1920` on project pages.
 * Prefer `getBoundingClientRect().width` so Safari/WebKit match the painted layout
 * (avoids occasional clientWidth vs subpixel mismatch with transformed content).
 */
export function readDesignRootWidthPx(el: HTMLElement): number {
  const w = el.getBoundingClientRect().width;
  if (Number.isFinite(w) && w > 0) return w;
  const cw = el.clientWidth;
  if (Number.isFinite(cw) && cw > 0) return cw;
  // Never return 1 here: that made scale ≈ 1/1920 and the whole scaled page vanish
  // when layout hadn’t given the root a width yet (Canon / project pages looked empty).
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
  // Guard: absurdly small scale from bad early layout reads
  if (s < 0.001 && typeof window !== 'undefined' && window.innerWidth > 64) {
    s = designScaleFromRootWidth(window.innerWidth, designW);
  }
  return Number.isFinite(s) && s > 0 ? s : 1;
}
