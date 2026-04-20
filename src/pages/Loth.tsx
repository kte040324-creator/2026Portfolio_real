import { useEffect, useRef, type CSSProperties } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot } from '../lib/designRootWidth';
import { lothAsset } from '../lib/lothAssets';
import '../styles/loth.css';

const DESIGN_W = 1920;
const DESIGN_H = 16932;

/** Figma 197:98 — moodboard (layer names → `public/loth/img/`) */
const MOOD_IMAGES: { src: string; left: number; top: number; w: number; h: number }[] = [
  { src: 'img/image 40.png', left: 1304.98, top: 2363, w: 326.48, h: 407.45 },
  { src: 'img/image 54.png', left: 790.71, top: 2461, w: 497.04, h: 372.99 },
  { src: 'img/image 73.png', left: 343.64, top: 2487, w: 382.47, h: 322.17 },
  { src: 'img/image 71.png', left: 186, top: 2632, w: 169.7, h: 225.69 },
  { src: 'img/image 55.png', left: 655.47, top: 2649, w: 158.5, h: 158.5 },
  { src: 'img/image 74.png', left: 1081.01, top: 2690, w: 329.92, h: 199.85 },
  { src: 'img/image 45.png', left: 665.81, top: 2807, w: 249.81, h: 310.11 },
  { src: 'img/image 46.png', left: 309.18, top: 2807, w: 356.63, h: 267.04 },
  { src: 'img/image 47.png', left: 892.36, top: 2829, w: 136.1, h: 205.02 },
  { src: 'img/image 43.png', left: 1028.46, top: 2835, w: 242.06, h: 302.36 },
  { src: 'img/image 50.png', left: 1268.8, top: 2770, w: 230, h: 261.01 },
  { src: 'img/image 72.png', left: 1498.79, top: 2770, w: 234.3, h: 292.88 },
];

/** 각 Mood 셀마다 다른 방향·거리로 퍼졌다가 모이도록 (라디얼 + 인덱스 오프셋) */
function moodScatterForIndex(i: number, n: number): { nx: number; ny: number } {
  const base = (i / n) * Math.PI * 2 + 0.35;
  const r = 118 + (i % 4) * 22;
  return {
    nx: Math.round(Math.cos(base) * r),
    ny: Math.round(Math.sin(base) * r * 0.85),
  };
}

export function Loth() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const moodRootRef = useRef<HTMLDivElement>(null);
  const compVideoRef = useRef<HTMLVideoElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = designScaleForRoot(root, DESIGN_W);
      frame.style.setProperty('--loth-scale', String(scale));
      root.style.height = `${DESIGN_H * scale}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  /** MoodBoard: 스크롤에 따라 셀마다 다른 벡터로 퍼진 뒤 제자리로 모임 (--loth-mood-gather 0→1) */
  useEffect(() => {
    const mood = moodRootRef.current;
    if (!mood) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = () => {
      if (reduced) {
        mood.style.setProperty('--loth-mood-gather', '1');
        return;
      }
      const r = mood.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = vh * 0.85;
      const raw = (vh - r.top) / span;
      const p = Math.max(0, Math.min(1, raw));
      const eased = 1 - (1 - p) * (1 - p);
      mood.style.setProperty('--loth-mood-gather', String(eased));
    };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, []);

  /** Comp 영역: 스크롤 리빌 없이 항상 보이게 + 자동재생 정책 보강 */
  useEffect(() => {
    const v = compVideoRef.current;
    if (!v) return;
    const nudge = () => {
      v.muted = true;
      void v.play().catch(() => {});
    };
    v.addEventListener('loadeddata', nudge);
    v.addEventListener('canplay', nudge);
    nudge();
    return () => {
      v.removeEventListener('loadeddata', nudge);
      v.removeEventListener('canplay', nudge);
    };
  }, []);

  return (
    <div className="loth-scale-root" ref={rootRef}>
      <div className="loth-frame" ref={frameRef} data-node-id="197:98">
        {/* Figma 197:99 — page background */}
        <div className="loth-abs loth-bg-page" data-node-id="197:99" aria-hidden />
        {/* Figma 197:212 — hero 1920×1080 radial film */}
        <div className="loth-abs loth-hero-bg" aria-hidden data-node-id="197:212" />

        <ProjectPageHeader
          embedded
          variant="dark"
          breadcrumb="Projects - Personal - Web Design"
          className="loth-header"
        />

        <p className="loth-abs loth-hero-line" data-node-id="197:213">
          Each Bead Carries Time
          <br />
          with Every Touch
        </p>

        <div className="loth-abs loth-hero-mark" data-node-id="197:217">
          <img src={lothAsset('img/or아트보드 2 1.png')} alt="" />
        </div>

        <h2 className="loth-abs loth-overview-h" data-node-id="197:222">
          Overview
        </h2>
        <div className="loth-abs loth-overview-line" data-node-id="197:221" aria-hidden />

        <p className="loth-abs loth-overview-p1" data-node-id="197:219">
          LOTH is an online platform for mala bracelets, reinterpreted through a contemporary fashion lens. While mala has
          traditionally been associated with religious use, it is now widely embraced as a fashion accessory.
        </p>
        <p className="loth-abs loth-overview-p2" data-node-id="197:220">
          This project redefines the visual identity of conventional mala e-commerce by introducing a unified design language
          inspired by Buddhist aesthetic, featuring lotus motifs and muted, low-saturation color palettes to create a calm and
          cohesive user experience.
        </p>

        <div className="loth-abs loth-overview-video" data-node-id="206:1306">
          <video
            src={lothAsset('video/herovideo.mov')}
            autoPlay
            muted
            playsInline
            loop
            controls
            preload="metadata"
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              void v.play();
            }}
          />
        </div>

        <h2 className="loth-abs loth-vi-h" data-node-id="200:112">
          Visual Identity
        </h2>
        <p className="loth-abs loth-vi-sub" data-node-id="200:114">
          MoodBoard
        </p>

        <div ref={moodRootRef} className="loth-abs loth-mood-root" data-project-reveal>
          {MOOD_IMAGES.map((m, i) => {
            const { nx, ny } = moodScatterForIndex(i, MOOD_IMAGES.length);
            return (
              <div
                key={`${m.src}-${i}`}
                className="loth-mood-cell"
                style={
                  {
                    left: m.left,
                    top: m.top - 2363,
                    width: m.w,
                    height: m.h,
                    ['--mood-nx' as string]: `${nx}px`,
                    ['--mood-ny' as string]: `${ny}px`,
                  } as CSSProperties
                }
              >
                <img src={lothAsset(m.src)} alt="" draggable={false} />
              </div>
            );
          })}
        </div>

        <p className="loth-abs loth-lc-sub" data-node-id="200:120">
          Logo &amp; Color Palette
        </p>
        <div className="loth-abs loth-lc-board" data-node-id="197:163" data-project-reveal>
          <img src={lothAsset('img/or아트보드 2 1.png')} alt="" />
        </div>

        <div className="loth-abs loth-swatch loth-swatch--a" data-node-id="197:154" aria-hidden />
        <div className="loth-abs loth-swatch loth-swatch--b" data-node-id="197:153" aria-hidden />
        <div className="loth-abs loth-swatch loth-swatch--c" data-node-id="197:157" aria-hidden />
        <div className="loth-abs loth-swatch loth-swatch--d" data-node-id="197:156" aria-hidden />
        <div className="loth-abs loth-swatch loth-swatch--e" data-node-id="197:155" aria-hidden />

        <span className="loth-abs loth-hex loth-hex--1" data-node-id="197:158">
          #5D0F08
        </span>
        <span className="loth-abs loth-hex loth-hex--2" data-node-id="197:159">
          #000000
        </span>
        <span className="loth-abs loth-hex loth-hex--3" data-node-id="197:160">
          #E7DCDC
        </span>
        <span className="loth-abs loth-hex loth-hex--4" data-node-id="197:161">
          #1E2521
        </span>
        <span className="loth-abs loth-hex loth-hex--5" data-node-id="197:162">
          #FFFFFF
        </span>

        <p className="loth-abs loth-gen-label" data-node-id="200:129">
          Generated Images
        </p>
        <div className="loth-abs loth-gen-row" data-project-reveal>
          <div className="loth-gen-cell loth-gen-cell--1" data-node-id="200:211">
            <img src={lothAsset('img/SEEDS 1.png')} alt="" />
          </div>
          <div className="loth-gen-cell loth-gen-cell--2" data-node-id="200:212">
            <img src={lothAsset('img/woods 1.png')} alt="" />
          </div>
          <div className="loth-gen-cell loth-gen-cell--3" data-node-id="200:213">
            <img src={lothAsset('img/gems 1.png')} alt="" />
          </div>
        </div>

        <div className="loth-abs loth-strip loth-strip--a" data-node-id="230:35" data-project-reveal>
          <div className="loth-strip-track loth-strip-track--ltr" aria-hidden>
            <div className="loth-strip-unit">
              <img className="loth-strip-img" src={lothAsset('img/image 6346545.png')} alt="" draggable={false} />
            </div>
            <div className="loth-strip-unit">
              <img className="loth-strip-img" src={lothAsset('img/image 6346545.png')} alt="" draggable={false} />
            </div>
          </div>
        </div>
        <div className="loth-abs loth-strip loth-strip--b" data-node-id="230:32" data-project-reveal>
          <div className="loth-strip-track loth-strip-track--rtl" aria-hidden>
            <div className="loth-strip-unit">
              <img className="loth-strip-img" src={lothAsset('img/image 6346544.png')} alt="" draggable={false} />
            </div>
            <div className="loth-strip-unit">
              <img className="loth-strip-img" src={lothAsset('img/image 6346544.png')} alt="" draggable={false} />
            </div>
          </div>
        </div>

        {/* Figma 239:32 — Comp 1 2 (`public/loth/Comp 1.webm`) — 리빌 미적용(항상 표시) */}
        <div className="loth-abs loth-frame-371" data-node-id="239:32" data-name="Comp 1 2">
          <video
            ref={compVideoRef}
            className="loth-frame-371__media"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
          >
            <source src={lothAsset('Comp 1.webm')} type="video/webm" />
          </video>
        </div>

        <h2 className="loth-abs loth-ui-h" data-node-id="203:1279">
          UI Design
        </h2>
        <div className="loth-abs loth-ui-col loth-ui-col--a" data-node-id="203:1270" data-project-reveal>
          <img src={lothAsset('img/image 6346540.png')} alt="" />
        </div>
        <div className="loth-abs loth-ui-col loth-ui-col--b" data-node-id="203:1277" data-project-reveal>
          <img src={lothAsset('img/image 6346542.png')} alt="" />
        </div>
        <div className="loth-abs loth-ui-col loth-ui-col--c" data-node-id="203:1274" data-project-reveal>
          <img src={lothAsset('img/image 6346541.png')} alt="" />
        </div>

        <p className="loth-abs loth-pages-label" data-node-id="203:1285">
          All Pages
        </p>
        <div className="loth-abs loth-page-cap loth-page-cap--a" data-node-id="203:1282" data-project-reveal>
          <img src={lothAsset('img/Screenshot 2026-04-17 at 13.44.15 1.png')} alt="" />
        </div>
        {/* Figma 203:1284: 두 번째 캡처는 별도 export 후 블록 추가 (동일 PNG 이중 사용 시 중복·겹침) */}

        <p className="loth-abs loth-proto-label" data-node-id="206:1295">
          Prototype Video_Frontend Dev.
        </p>
        <div className="loth-abs loth-proto-video" data-node-id="206:1290">
          <video
            src={lothAsset('video/react1.mp4')}
            autoPlay
            muted
            playsInline
            loop
            controls
            controlsList="nodownload"
            preload="metadata"
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              void v.play();
            }}
          />
        </div>

        <div className="loth-abs loth-react-pair loth-react-pair--top">
          <div className="loth-react-slot" data-node-id="206:1293">
            <div className="loth-react-cell" data-node-id="211:1336">
              <video
                src={lothAsset('video/react2.mp4')}
                autoPlay
                muted
                playsInline
                loop
                controls
                preload="metadata"
                onEnded={(e) => {
                  const v = e.currentTarget;
                  v.currentTime = 0;
                  void v.play();
                }}
              />
            </div>
          </div>
          <div className="loth-react-slot" data-node-id="206:1294">
            <div className="loth-react-cell" data-node-id="211:1337">
              <video
                src={lothAsset('video/react3.mp4')}
                autoPlay
                muted
                playsInline
                loop
                controls
                preload="metadata"
                onEnded={(e) => {
                  const v = e.currentTarget;
                  v.currentTime = 0;
                  void v.play();
                }}
              />
            </div>
          </div>
        </div>

        <p className="loth-abs loth-mobile-label" data-node-id="206:1297">
          Mobile UI
        </p>
        <div className="loth-abs loth-react-pair loth-react-pair--btm">
          <video
            src={lothAsset('video/react4.mp4')}
            autoPlay
            muted
            playsInline
            loop
            controls
            preload="metadata"
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              void v.play();
            }}
          />
          <video
            src={lothAsset('video/react5.mp4')}
            autoPlay
            muted
            playsInline
            loop
            controls
            preload="metadata"
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              void v.play();
            }}
          />
        </div>

        <div className="loth-abs loth-mobile-video" data-node-id="197:206" data-name="mobile 1">
          <video
            className="loth-mobile-video__media"
            src={lothAsset('video/mobile 1.mp4')}
            autoPlay
            muted
            playsInline
            loop
            controls
            controlsList="nodownload"
            preload="metadata"
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              void v.play();
            }}
          />
        </div>

        <div className="loth-abs loth-iphone" data-node-id="197:203" data-project-reveal>
          <img src={lothAsset('img/iPhone 16.png')} alt="" draggable={false} />
        </div>

        <div className="loth-abs loth-footer-logo" data-node-id="208:1307">
          <img src={lothAsset('img/logo_red_fill.png')} alt="" />
        </div>

        <p className="loth-abs loth-footer-tools" data-node-id="206:1301">
          Tools - Figma / Adobe Photoshop / Cursor AI - Midjourney / GoogleNanoBanana / Meshy
        </p>
        <p className="loth-abs loth-footer-date" data-node-id="206:1300">
          02.05.2026 - 03.19.2026 Personal Project (Design, Front-end Dev.)
        </p>
      </div>
    </div>
  );
}
