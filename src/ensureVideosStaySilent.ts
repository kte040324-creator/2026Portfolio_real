/**
 * Portfolio videos are visual-only: keep every HTMLVideoElement muted with volume 0
 * so native controls or autoplay policies cannot leave audible output on.
 */
export function ensureVideosStaySilent(): void {
  if (typeof document === 'undefined') return;

  const lock = (v: HTMLVideoElement) => {
    v.defaultMuted = true;
    v.muted = true;
    v.volume = 0;
  };

  const onMedia = (e: Event) => {
    if (e.target instanceof HTMLVideoElement) lock(e.target);
  };

  document.addEventListener('play', onMedia, true);
  document.addEventListener('volumechange', onMedia, true);

  const scan = (root: ParentNode) => {
    root.querySelectorAll?.('video').forEach((el) => lock(el as HTMLVideoElement));
  };
  scan(document);

  const mo = new MutationObserver((records) => {
    for (const r of records) {
      for (const n of r.addedNodes) {
        if (n instanceof HTMLVideoElement) lock(n);
        else if (n instanceof Element) scan(n);
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
