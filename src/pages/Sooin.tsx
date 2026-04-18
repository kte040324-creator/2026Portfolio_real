import { useEffect, useRef } from 'react';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { sooinAsset } from '../lib/sooinAssets';
import '../styles/sooin.css';

const DESIGN_W = 1920;

/**
 * Process strip: 같은 구간에서 가로 패닝을 더 천천히(세로로 더 오래) 하려면 이 값을 **곱한 만큼** 분모를 키움.
 * `progress = (뷰포트 기준) / (기본길이 × 이 값)` → 값이 클수록 느리게 끝까지 도달 = 스크롤을 더 길게 해야 함.
 */
const SOOIN_STRIP_SCROLL_DWELL = 2.4;

/** Figma 171:2354 — `public/sooin/img/` (보낸 파일명과 동일) */
const PATH = {
  hero: 'img/image 1.png',
  overviewMain: 'img/image 6346521.png',
  overviewSide: 'img/overviewposter.png',
  group9: 'img/Group 9.png',
  moodBoard: 'img/Group 1410167659.png',
  processStrip: 'img/Group 1410167660.png',
  image13: 'img/image 13.png',
  shotLeft: 'img/process1.png',
  shotRight: 'img/process2.png',
  finalHero: 'img/ㅇㄹㅇㄹㅇㄹㅇㅇ 1.png',
  poster: 'img/02 A4 Poster Mockup On Concrete 1.png',
  tall: 'img/image 6346520.png',
  bottomLogo: 'img/image 6346525.png',
} as const;

const V = {
  prototype: 'video/sooinweb.mov',
} as const;

export function Sooin() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stripViewportRef = useRef<HTMLDivElement>(null);
  const stripSlideRef = useRef<HTMLDivElement>(null);
  const stripImgRef = useRef<HTMLImageElement>(null);
  /** 스크롤 기준 translateX에 더하는 드래그 오프셋(디자인 px) */
  const stripDragOffsetRef = useRef(0);
  const stripDraggingRef = useRef(false);
  const stripDragStartClientXRef = useRef(0);
  const stripDragStartOffsetRef = useRef(0);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = root.clientWidth / DESIGN_W;
      frame.style.setProperty('--sooin-scale', String(scale));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  /** Design Process strip: 세로 스크롤 + 포인터 드래그 → 가로 이동 (191:5268 / Group 1410167660) */
  useEffect(() => {
    const viewport = stripViewportRef.current;
    const slide = stripSlideRef.current;
    const img = stripImgRef.current;
    const root = rootRef.current;
    if (!viewport || !slide || !img || !root) return;

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const getScale = () => Math.max(root.clientWidth / DESIGN_W, 0.0001);

    const innerVisibleWidth = () => {
      const cs = getComputedStyle(viewport);
      const pl = parseFloat(cs.paddingLeft) || 0;
      const pr = parseFloat(cs.paddingRight) || 0;
      return Math.max(0, viewport.clientWidth - pl - pr);
    };

    const applyStripTransform = () => {
      const vw = innerVisibleWidth();
      const imgW = img.offsetWidth;
      const maxTx = Math.max(0, imgW - vw);

      const rect = viewport.getBoundingClientRect();
      const wh = window.innerHeight;
      const base = wh + rect.height;
      const progress = mqReduce.matches
        ? 0
        : Math.max(0, Math.min(1, (wh - rect.top) / (base * SOOIN_STRIP_SCROLL_DWELL)));
      const scrollTx = -progress * maxTx;
      const raw = scrollTx + stripDragOffsetRef.current;
      const tx = Math.max(-maxTx, Math.min(0, raw));
      stripDragOffsetRef.current = tx - scrollTx;
      slide.style.transform = `translateX(${tx}px)`;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      stripDraggingRef.current = true;
      viewport.classList.add('sooin-process-strip-viewport--dragging');
      stripDragStartClientXRef.current = e.clientX;
      stripDragStartOffsetRef.current = stripDragOffsetRef.current;
      viewport.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stripDraggingRef.current) return;
      const scale = getScale();
      stripDragOffsetRef.current =
        stripDragStartOffsetRef.current + (e.clientX - stripDragStartClientXRef.current) / scale;
      applyStripTransform();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!stripDraggingRef.current) return;
      stripDraggingRef.current = false;
      viewport.classList.remove('sooin-process-strip-viewport--dragging');
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
      applyStripTransform();
    };

    const onReduce = () => applyStripTransform();
    mqReduce.addEventListener('change', onReduce);

    window.addEventListener('scroll', applyStripTransform, { passive: true });
    window.addEventListener('resize', applyStripTransform);
    const ro = new ResizeObserver(applyStripTransform);
    ro.observe(viewport);
    ro.observe(img);
    img.addEventListener('load', applyStripTransform);

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);

    applyStripTransform();

    return () => {
      mqReduce.removeEventListener('change', onReduce);
      window.removeEventListener('scroll', applyStripTransform);
      window.removeEventListener('resize', applyStripTransform);
      ro.disconnect();
      img.removeEventListener('load', applyStripTransform);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  return (
    <div className="sooin-scale-root" ref={rootRef}>
      <div className="sooin-frame" ref={frameRef} data-node-id="171:2354">
        <p className="sooin-abs sooin-subject-line" data-node-id="171:2355">
          Projects -Personal - UX/UI Design, Graphic
        </p>

        <div className="sooin-abs sooin-hero" data-node-id="172:2359">
          <img src={sooinAsset(PATH.hero)} alt="" />
        </div>

        <h2 className="sooin-abs sooin-section-h sooin-overview-h" data-node-id="176:3789">
          Overview
        </h2>
        <div className="sooin-abs sooin-overview-line" data-node-id="176:3763" aria-hidden />

        <div className="sooin-abs sooin-text-20 sooin-overview-p1" data-node-id="176:3760">
          <p>While taking a Buddhist art course,</p>
          <p>
            I identified a need for clearer visual organization, especially in classical art, where information is often difficult for first-time viewers to interpret.
          </p>
          <p>In response, I designed an infographic system and developed a companion website to support intuitive learning and exploration.</p>
        </div>

        <div className="sooin-abs sooin-overview-p2" data-node-id="176:3761">
          <p className="sooin-text-20 sooin-text-20--sub">{`手印(Hand Gestures of Buddha): `}</p>
          <p className="sooin-text-20 sooin-text-20--sub">&nbsp;</p>
          <p className="sooin-text-20 sooin-text-20--sub">
            A Buddhist term referring to symbolic hand gestures that represent the vows of Buddhas and Bodhisattvas, or ritual hand signs formed by practitioners.
          </p>
        </div>

        <div className="sooin-abs sooin-overview-img-main" data-node-id="176:3784">
          <img src={sooinAsset(PATH.overviewMain)} alt="" />
        </div>
        <div
          className="sooin-abs sooin-overview-img-side"
          data-node-id="172:2412"
          data-name="overviewposter"
        >
          <img src={sooinAsset(PATH.overviewSide)} alt="" />
        </div>

        <h2 className="sooin-abs sooin-section-h sooin-dp-h" data-node-id="176:3793">
          Design Process
        </h2>

        <p className="sooin-abs sooin-label-20 sooin-label-existing" data-node-id="176:3762">
          Existing Resources
        </p>
        <p className="sooin-abs sooin-label-20 sooin-label-mood" data-node-id="176:3791">
          MoodBoard
        </p>

        <div className="sooin-abs sooin-dp-group9" data-node-id="191:5267">
          <img src={sooinAsset(PATH.group9)} alt="" />
        </div>
        <div className="sooin-abs sooin-dp-mood" data-node-id="191:5266" data-project-reveal>
          <img src={sooinAsset(PATH.moodBoard)} alt="" />
        </div>
        <div className="sooin-abs sooin-ex-img" data-node-id="172:2382">
          <img src={sooinAsset(PATH.image13)} alt="" />
        </div>

        <div className="sooin-abs sooin-shot-left" data-node-id="172:2408" data-name="process1" data-project-reveal>
          <img src={sooinAsset(PATH.shotLeft)} alt="" />
        </div>
        <div className="sooin-abs sooin-shot-right" data-node-id="172:2407" data-name="process2" data-project-reveal>
          <div className="sooin-shot-right-inner">
            <img src={sooinAsset(PATH.shotRight)} alt="" />
          </div>
        </div>

        <div
          className="sooin-abs sooin-process-strip-viewport"
          ref={stripViewportRef}
          data-node-id="191:5268"
          data-project-reveal
          aria-label="Design process — horizontal pan (scroll or drag)"
        >
          <div className="sooin-process-strip-slide" ref={stripSlideRef}>
            <img ref={stripImgRef} src={sooinAsset(PATH.processStrip)} alt="" />
          </div>
        </div>

        <h2 className="sooin-abs sooin-section-h sooin-final-h" data-node-id="177:3812">
          Final Delievery
        </h2>

        <div className="sooin-abs sooin-final-hero" data-node-id="177:3815" data-project-reveal>
          <img src={sooinAsset(PATH.finalHero)} alt="" />
        </div>

        <div
          className="sooin-abs sooin-poster"
          data-node-id="172:2417"
          data-name="02 A4 Poster Mockup On Concrete 1"
          data-project-reveal
        >
          <img src={sooinAsset(PATH.poster)} alt="" />
        </div>

        <p className="sooin-abs sooin-label-20 sooin-web-label" data-node-id="183:4145">
          Webstie Prototype
        </p>

        <div className="sooin-abs sooin-video-slot" data-node-id="179:3868" data-project-reveal>
          <video
            ref={videoRef}
            src={sooinAsset(V.prototype)}
            autoPlay
            muted
            playsInline
            loop
            controls
            controlsList="nodownload"
            preload="metadata"
            poster={sooinAsset(PATH.hero)}
          />
        </div>

        <div className="sooin-abs sooin-tall" data-node-id="172:3756" data-project-reveal>
          <img src={sooinAsset(PATH.tall)} alt="" />
        </div>

        <p className="sooin-abs sooin-text-15 sooin-meta-tools" data-node-id="177:3857">
          Tools - Figma / Adobe Photoshop / Adobe Illustrator / Blender
        </p>
        <div className="sooin-abs sooin-meta-exhibit" data-node-id="177:3856">
          <p className="sooin-text-15">05.07.2025 - 07.14.2025</p>
          <p className="sooin-text-15">Exhibited at Korea National Univ.of Arts, Seoul, South Korea</p>
          <p className="sooin-text-15">Individual Project</p>
          <p className="sooin-text-15">&nbsp;</p>
        </div>

        <div className="sooin-abs sooin-bottom-logo" data-node-id="183:4141">
          <img src={sooinAsset(PATH.bottomLogo)} alt="" />
        </div>
      </div>
    </div>
  );
}
