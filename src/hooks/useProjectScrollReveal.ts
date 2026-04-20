import { useEffect, type RefObject } from 'react';

function revealIfInViewport(el: HTMLElement, onReveal: (el: HTMLElement) => void) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const inset = vh * 0.1;
  if (r.bottom > inset && r.top < vh - inset) {
    onReveal(el);
    return true;
  }
  return false;
}

/** 빠른 스크롤 시 IntersectionObserver가 한 프레임에 건너뛰는 경우를 보완 */
function scanUnrevealed(elements: NodeListOf<HTMLElement>, onReveal: (el: HTMLElement) => void) {
  elements.forEach((el) => {
    if (!el.classList.contains('project-reveal--visible')) {
      revealIfInViewport(el, onReveal);
    }
  });
}

/**
 * Scaled project frame 내부 `[data-project-reveal]` 요소에 스크롤 등장 클래스를 붙인다.
 */
export function useProjectScrollReveal(frameRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = frameRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('[data-project-reveal]');
    if (elements.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      elements.forEach((el) => el.classList.add('project-reveal--visible'));
      return;
    }

    /** 다음 프레임에 붙여 opacity/transform 트랜지션이 항상 한 번은 재생되게 */
    const revealNow = (el: HTMLElement) => {
      if (el.classList.contains('project-reveal--visible')) return;
      requestAnimationFrame(() => {
        if (el.classList.contains('project-reveal--visible')) return;
        el.classList.add('project-reveal--visible');
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      /* 음수 bottom: 뷰포트 안으로 더 들어온 뒤 등장 → 스크롤 시 모션이 잘 보임 */
      { root: null, threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    const sync = () => {
      elements.forEach((el) => {
        if (el.classList.contains('project-reveal--visible')) return;
        if (revealIfInViewport(el, revealNow)) return;
        io.observe(el);
      });
    };

    let scrollRaf = 0;
    const onScrollOrResize = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        scanUnrevealed(elements, revealNow);
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    if ('onscrollend' in window) {
      window.addEventListener('scrollend', onScrollOrResize, { passive: true });
    }

    // 첫 페인트에서 opacity:0 이 커밋된 뒤에 visible 을 붙여야 transition 이 재생된다.
    let cancelled = false;
    let innerRaf = 0;
    let fallbackTimeout = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        if (cancelled) return;
        sync();
        fallbackTimeout = window.setTimeout(() => {
          if (cancelled) return;
          scanUnrevealed(elements, revealNow);
        }, 0);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      window.clearTimeout(fallbackTimeout);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if ('onscrollend' in window) {
        window.removeEventListener('scrollend', onScrollOrResize);
      }
      io.disconnect();
    };
  }, [frameRef]);
}
