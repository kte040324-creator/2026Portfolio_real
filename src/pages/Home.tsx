import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { mainAsset } from '../lib/mainAssets';
import '../styles/home.css';

const DESIGN_W = 1920;
/** Figma 291:210 — 하단 CONTACT·라인 포함 */
const DESIGN_H = 8790;

/** `public/assets/` 루트 기준 (header SVG 등) */
function publicAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${base}${encoded}`;
}

/**
 * Figma main 프레임 썸네일 노드(Frame 377, 402, …)와 동일한 파일명 —
 * MCP `get_design_context`로부터 내려받은 PNG를 `public/assets/main/`에 둠.
 */
const THUMB_BY_FIGMA = {
  frame402: 'Frame 402.png',
  frame378: 'Frame 378.png',
  frame396: 'Frame 396.png',
  frame379: 'Frame 379.png',
  frame400: 'Frame 400.png',
  frame398: 'Frame 398.png',
} as const;

/** Figma 303:792–796 히어로 스티커 이미지 */
const HERO_STICKERS: { nodeId: string; file: string; className: string }[] = [
  { nodeId: '303:792', file: 'Frame 383.png', className: 'home-hero-sticker home-hero-sticker--383' },
  { nodeId: '303:793', file: 'Frame 384.png', className: 'home-hero-sticker home-hero-sticker--384' },
  { nodeId: '303:794', file: 'Frame 385.png', className: 'home-hero-sticker home-hero-sticker--385' },
  { nodeId: '303:795', file: 'Frame 386.png', className: 'home-hero-sticker home-hero-sticker--386' },
  { nodeId: '303:796', file: 'Frame 387.png', className: 'home-hero-sticker home-hero-sticker--387' },
];

function initialHomeScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

type ProjectRow = {
  slug: string;
  to: string;
  thumbTop: number;
  panelTop: number;
  /** Figma `calc(60% + Npx)` — 패널 이미지(665×343) 왼쪽 기준과 정렬 */
  panelOffsetPx: number;
  thumbFile: string;
  thumbTone: 'gradient' | 'teal' | 'gradient2' | 'black';
  /** Figma 291:210 — 패널을 PNG로 내보낸 파일 (`public/assets/main/`) */
  panelImageFile: string;
  /** 스크린리더용 */
  panelLabel: string;
};

const PROJECTS: ProjectRow[] = [
  {
    slug: 'lg',
    to: '/projects/lg',
    thumbTop: 1749,
    panelTop: 1813,
    panelOffsetPx: 22,
    thumbFile: 'lg-thumb.png',
    thumbTone: 'gradient',
    panelImageFile: 'Frame 393.png',
    panelLabel: 'Furon: a new AI orchestrator for LG',
  },
  {
    slug: 'sori',
    to: '/projects/sori',
    thumbTop: 2728,
    panelTop: 2792,
    panelOffsetPx: 10,
    thumbFile: THUMB_BY_FIGMA.frame402,
    thumbTone: 'teal',
    panelImageFile: 'Frame 403.png',
    panelLabel: 'COEX Guide: SORI',
  },
  {
    slug: 'loth',
    to: '/projects/loth',
    thumbTop: 3707,
    panelTop: 3771,
    panelOffsetPx: 22,
    thumbFile: THUMB_BY_FIGMA.frame378,
    thumbTone: 'gradient2',
    panelImageFile: 'Frame 394.png',
    panelLabel: 'LOTH',
  },
  {
    slug: 'exhibition',
    to: '/projects/exhibition-archive',
    thumbTop: 4685,
    panelTop: 4750,
    panelOffsetPx: 22,
    thumbFile: THUMB_BY_FIGMA.frame396,
    thumbTone: 'black',
    panelImageFile: 'Frame 397.png',
    panelLabel: 'Exhibition Archive',
  },
  {
    slug: 'sooin',
    to: '/projects/sooin',
    thumbTop: 5664,
    panelTop: 5729,
    panelOffsetPx: 2,
    thumbFile: THUMB_BY_FIGMA.frame379,
    thumbTone: 'black',
    panelImageFile: 'Frame 395.png',
    panelLabel: 'SooIn',
  },
  {
    slug: 'canon',
    to: '/projects/canon',
    thumbTop: 6643,
    panelTop: 6708,
    panelOffsetPx: 10,
    thumbFile: THUMB_BY_FIGMA.frame400,
    thumbTone: 'black',
    panelImageFile: 'Frame 401.png',
    panelLabel: 'Canon Camera Museum',
  },
  {
    slug: 'seoculus',
    to: '/projects/seoculus',
    thumbTop: 7622,
    panelTop: 7687,
    panelOffsetPx: 10,
    thumbFile: THUMB_BY_FIGMA.frame398,
    thumbTone: 'black',
    panelImageFile: 'Frame 399.png',
    panelLabel: 'Seoculus',
  },
];

function ThumbBox({
  tone,
  src,
  alt,
}: {
  tone: ProjectRow['thumbTone'];
  src: string;
  alt: string;
}) {
  return (
    <div className={`home-thumb home-thumb--${tone}`}>
      <img src={src} alt={alt} className="home-thumb__img" loading="lazy" decoding="async" />
    </div>
  );
}

export function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameScale, setFrameScale] = useState(initialHomeScale);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      root.style.setProperty('--home-design-h-num', String(DESIGN_H));
      setFrameScale(designScaleForRoot(root, DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = '#efe9e9';
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  const thumbLeft = 'calc(12.5% - 14px)';

  return (
    <div className="home-scale-root" ref={rootRef}>
      <div
        className="home-frame"
        ref={frameRef}
        data-name="main"
        data-node-id="291:210"
        style={{
          transform: `scale(${frameScale}) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <div className="home-top-fade" data-node-id="292:386" aria-hidden />

        <a className="home-mail" href="mailto:taeeunclarakim@gmail.com" data-node-id="291:223">
          <img src={publicAsset('assets/header-email.svg')} alt="taeeunclarakim@gmail.com" />
        </a>
        <div className="home-year" data-node-id="291:248">
          <img src={publicAsset('assets/header-2026.svg')} alt="@2026" />
        </div>

        <h1 className="home-hero-title" data-node-id="291:254">
          Welcome! I’m Tae Kim.
        </h1>
        <p className="home-hero-sub" data-node-id="291:303">
          Designing the Interaction Between Humans and Systems
        </p>

        {HERO_STICKERS.map((s) => (
          <div key={s.nodeId} className={s.className} data-node-id={s.nodeId}>
            <img src={mainAsset(s.file)} alt="" decoding="async" loading="lazy" />
          </div>
        ))}

        <h2 className="home-works-heading" data-node-id="291:325">
          Works →
        </h2>

        {PROJECTS.map((p) => (
          <article key={p.slug} className="home-row" aria-label={p.panelLabel}>
            <div
              className="home-thumb-wrap"
              style={{ left: thumbLeft, top: p.thumbTop }}
              aria-hidden
            >
              <ThumbBox tone={p.thumbTone} src={mainAsset(p.thumbFile)} alt="" />
            </div>
            <div
              className="home-panel-slot"
              style={{ left: `calc(60% + ${p.panelOffsetPx}px)`, top: p.panelTop }}
            >
              <div className="home-panel-stack">
                <img
                  className="home-panel-image"
                  src={mainAsset(p.panelImageFile)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <Link
                  className="home-panel-cta home-panel-cta--fig389 home-panel-cta-link"
                  to={p.to}
                  aria-label={`${p.panelLabel} — View Project`}
                >
                  <span className="home-panel-cta__inner">
                    <span className="home-panel-cta__label">View Project</span>
                    <span className="home-panel-cta__arrow-holder" aria-hidden>
                      <img
                        className="home-panel-cta__arrow"
                        src={mainAsset('view-project-arrow.svg')}
                        alt=""
                        draggable={false}
                      />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}

        <div className="home-footer-line" data-node-id="303:671" aria-hidden />
        <footer className="home-contact" data-node-id="291:217">
          <a className="home-contact__link" href="mailto:taeeunclarakim@gmail.com" data-node-id="291:218">
            CONTACT ME →→→
          </a>
        </footer>
      </div>
    </div>
  );
}
