import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import DecryptedText from '../components/DecryptedText';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { canonAsset } from '../lib/canonAssets';
import '../styles/canon.css';

const DESIGN_W = 1920;
/** Figma 215:2580 — bottom ≈ 4950 + 918 */
const DESIGN_H = 5920;

/** Figma 249:219 — 위에서 아래로 쌓이고, THE는 pupil(1330×396) 왼쪽에 맞춤 */
const CANON_LINE_LEAD = 'WHAT YOU SEE               IS NEVER JUST WHAT IS THERE';
const CANON_LINE_THE = 'THE  ';
const CANON_LINE_SUB =
  '                         DOES NOT FREEZE TIME              IT DEFINES WHAT REMAINS';

const canonDecryptShared = {
  animateOn: 'view' as const,
  sequential: true,
  revealDirection: 'center' as const,
  /** ms/글자 — 작을수록 빠름 */
  speed: 10,
  maxIterations: 14,
  useOriginalCharsOnly: true,
  lineLayout: 'block' as const,
  parentClassName: 'canon-landing-decrypt',
  className: 'canon-landing-decrypt__revealed',
  encryptedClassName: 'canon-landing-decrypt__encrypted',
};

/** 랜딩: 복호 중·이후 병행 → mp4 페이드 → 로고 → 라인(좌→우) → museum wordmark → done */
type LandingAnimPhase = 'decrypt' | 'videos' | 'logo' | 'line' | 'museum' | 'done';

/** lead 끝 → sub → THE (복호는 THE 끝까지 계속, 타이밍은 영상 단계와 병행) */
type DecryptStage = 0 | 1 | 2;

const LANDING_HOLD_MS = 580;
/** 복호 시작 직후 곧바로 mp4 페이드( canon.css opacity 0.5s 와 병행 ) */
const DECRYPT_TO_VIDEO_MS = 120;
/** canon.css `.canon-landing-block ... transition: opacity 0.5s` 와 맞춤 */
const VIDEO_FADE_MS = 500;

const CANON_LOGO_PNG = 'img/image 32 [Vectorized].png';
const CANON_MUSEUM_PNG = 'img/image 35.png';

/** Canon Camera Museum — Personal (Figma 215:2580) */
function initialCanonFrameScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

export function Canon() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [decryptStage, setDecryptStage] = useState<DecryptStage>(0);
  const [frameScale, setFrameScale] = useState(initialCanonFrameScale);
  const [landingPhase, setLandingPhase] = useState<LandingAnimPhase>('decrypt');
  const clockVideoRef = useRef<HTMLVideoElement>(null);
  const eyeVideoRef = useRef<HTMLVideoElement>(null);
  const pupilVideoRef = useRef<HTMLVideoElement>(null);

  const landingVideosPreload = landingPhase !== 'decrypt';

  const onLeadDecryptComplete = useCallback(() => setDecryptStage(1), []);
  const onSubDecryptComplete = useCallback(() => setDecryptStage(2), []);

  /** 복호 진행 중에 mp4 등장(페이드) */
  useEffect(() => {
    const id = window.setTimeout(() => setLandingPhase('videos'), DECRYPT_TO_VIDEO_MS);
    return () => window.clearTimeout(id);
  }, []);

  /** mp4 opacity 등장이 끝난 뒤( transition 끝 ) → Canon 로고 */
  useEffect(() => {
    if (landingPhase !== 'videos') return;
    let cancelled = false;
    const videos = [clockVideoRef.current, eyeVideoRef.current, pupilVideoRef.current].filter(
      (v): v is HTMLVideoElement => v != null,
    );
    videos.forEach((v) => {
      v.muted = true;
      void v.play().catch(() => {});
    });
    const t = window.setTimeout(() => {
      if (!cancelled) setLandingPhase('logo');
    }, VIDEO_FADE_MS + 40);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [landingPhase]);

  useEffect(() => {
    if (landingPhase !== 'logo') return;
    const id = window.setTimeout(() => setLandingPhase('line'), LANDING_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [landingPhase]);

  useEffect(() => {
    if (landingPhase !== 'line') return;
    const id = window.setTimeout(() => setLandingPhase('museum'), LANDING_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [landingPhase]);

  useEffect(() => {
    if (landingPhase !== 'museum') return;
    const id = window.setTimeout(() => setLandingPhase('done'), LANDING_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [landingPhase]);

  useProjectScrollReveal(frameRef);

  /** Scale from the painted root width only — do not mix in window.innerWidth (scrollbar gap). */
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      root.style.setProperty('--canon-design-h', `${DESIGN_H}px`);
      setFrameScale(designScaleForRoot(root, DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="canon-scale-root" ref={rootRef}>
      <div
        className="canon-frame"
        ref={frameRef}
        data-name="Canon"
        data-node-id="215:2580"
        style={{
          transform: `scale(${frameScale}) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <ProjectPageHeader
          embedded
          variant="light"
          breadcrumb="Projects - Personal - Web Design"
          className="canon-header"
        />

        <section
          className="canon-landing-block"
          data-node-id="249:218"
          data-landing-phase={landingPhase}
        >
          <p className="canon-landing-copyright" data-node-id="249:232">
            © Canon Inc.
          </p>
          <div className="canon-landing-statement" data-node-id="249:219">
            <div className="canon-landing-statement__stack">
              <div className="canon-landing-statement__lead">
                <div className="canon-landing-statement__body">
                  <DecryptedText
                    text={CANON_LINE_LEAD}
                    {...canonDecryptShared}
                    onDecryptComplete={onLeadDecryptComplete}
                  />
                </div>
              </div>
              {decryptStage >= 1 ? (
                <div className="canon-landing-statement__sub">
                  <div className="canon-landing-statement__body">
                    <DecryptedText
                      text={CANON_LINE_SUB}
                      {...canonDecryptShared}
                      onDecryptComplete={onSubDecryptComplete}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="canon-landing-logo" data-node-id="249:220">
            <img src={canonAsset(CANON_LOGO_PNG)} alt="" />
          </div>
          <div className="canon-landing-clock" data-node-id="249:226">
            <div className="canon-landing-vid-slot" aria-hidden="true">
              <video
                ref={clockVideoRef}
                muted
                playsInline
                loop
                preload={landingVideosPreload ? 'auto' : 'none'}
              >
                <source src={canonAsset('video/clock.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="canon-landing-line" data-node-id="249:227" aria-hidden="true">
            <div className="canon-landing-line__draw">
              <div className="canon-landing-line__inner">
                <img src={canonAsset('line-landing.svg')} alt="" />
              </div>
            </div>
          </div>
          <div className="canon-landing-wordmark" data-node-id="249:228">
            <img src={canonAsset(CANON_MUSEUM_PNG)} alt="" />
          </div>
          <div className="canon-landing-eye" data-node-id="249:229">
            <div className="canon-landing-eye__clip" aria-hidden="true">
              <div className="canon-landing-vid-slot">
                <video
                  ref={eyeVideoRef}
                  muted
                  playsInline
                  loop
                  preload={landingVideosPreload ? 'auto' : 'none'}
                >
                  <source src={canonAsset('video/eyeblink.mp4')} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="canon-landing-the-row" data-node-id="249:219-the">
            {decryptStage >= 2 ? (
              <div className="canon-landing-statement__body canon-landing-statement__body--the">
                <DecryptedText text={CANON_LINE_THE} {...canonDecryptShared} />
              </div>
            ) : null}
          </div>
          <div className="canon-landing-pupil" data-node-id="249:230">
            <div className="canon-landing-pupil__clip" aria-hidden="true">
              <div className="canon-landing-vid-slot">
                <video
                  ref={pupilVideoRef}
                  muted
                  playsInline
                  loop
                  preload={landingVideosPreload ? 'auto' : 'none'}
                >
                  <source src={canonAsset('video/pupil.mp4')} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        <h2 className="canon-overview-heading" data-node-id="248:199" data-project-reveal>
          Overview
        </h2>
        <div className="canon-overview-line" data-node-id="248:198" aria-hidden="true">
          <div className="canon-overview-line__inner">
            <img src={canonAsset('line-overview.svg')} alt="" />
          </div>
        </div>
        <div className="canon-overview-copy" data-node-id="248:200" data-project-reveal>
          <p>
            The existing Canon Camera Museum webpage shows high user drop-off, complex UI, and a lack of
            clear brand identity.
            <br />
            Rather than presenting cameras as standalone products, this project repositions Canon as a medium
            for seeing, exploring how an online exhibition can embody the experience of capturing light.
          </p>
          <p className="canon-overview-copy__spacer" aria-hidden="true">
            {'\u200b'}
          </p>
          <p className="canon-overview-copy__wip">
            <span className="canon-overview-copy__wip-lead">Work in progress</span>
            <span className="canon-overview-copy__wip-date">
              <br />
              (Apr 2, 2026 – )
            </span>
          </p>
        </div>

        <figure className="canon-overview-shot" data-node-id="248:202" data-project-reveal>
          <img src={canonAsset('original-screenshot.png')} alt="" decoding="async" />
        </figure>
        <figure className="canon-overview-redesign" data-node-id="249:205" data-project-reveal>
          <img src={canonAsset('redesign-mockup.png')} alt="" decoding="async" />
        </figure>
        <p className="canon-label-original" data-node-id="249:213">
          Original Design
        </p>
        <p className="canon-label-redesign" data-node-id="249:214">
          Redesigned Version
        </p>
        <div className="canon-arrow-original" data-node-id="249:216" aria-hidden="true">
          <div className="canon-arrow-original__inner">
            <img src={canonAsset('arrow-curve-original.svg')} alt="" />
          </div>
        </div>

        <h2 className="canon-designed-pages-heading" data-node-id="249:234" data-project-reveal>
          Designed Pages
        </h2>

        <figure className="canon-gallery-strip" data-node-id="249:263" data-project-reveal>
          <img src={canonAsset('gallery-strip.png')} alt="" decoding="async" />
        </figure>

        <figure className="canon-evolution-left" data-node-id="249:269" data-project-reveal>
          <img src={canonAsset('evolution-left.png')} alt="" decoding="async" />
        </figure>
        <figure className="canon-evolution-right" data-node-id="249:266" data-project-reveal>
          <img src={canonAsset('evolution-right.png')} alt="" decoding="async" />
        </figure>
        <div className="canon-line-dot" data-node-id="249:277" aria-hidden="true">
          <img src={canonAsset('line-dot.svg')} alt="" />
        </div>
        <div className="canon-arrow-feature-h" data-node-id="249:274" aria-hidden="true">
          <img src={canonAsset('arrow-h.svg')} alt="" />
        </div>
        <div className="canon-arrow-feature-v" data-node-id="249:275" aria-hidden="true">
          <img className="canon-arrow-feature-v__img" src={canonAsset('arrow-v.svg')} alt="" />
        </div>
        <figure className="canon-featured-card" data-node-id="249:272" data-project-reveal>
          <img src={canonAsset('featured-card.png')} alt="" decoding="async" />
        </figure>
      </div>
    </div>
  );
}
