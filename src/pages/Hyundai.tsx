import { useEffect, useRef } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { hyundaiAsset } from '../lib/hyundaiAssets';
import '../styles/hyundai.css';

const DESIGN_W = 1920;
const DESIGN_H = 10456;

/**
 * Figma 27:219 — 현대 (IAC, AI-Driven Automotive Exterior Design System)
 * 정적 자산: `public/hyundai/` (원본은 프로젝트 루트 `hyundai/`에서 복사)
 */
const I = {
  hero: 'img/hero-car.png',
  overview1: 'img/overview-1.png',
  overview2: 'img/overview-2.png',
  overview3: 'img/overview-3.png',
  deskLeft: 'img/test.png',
  deskRight: 'img/test-1.png',
  deskBg: 'img/user-scenario-bg.png',
  logoPikaso: 'img/logo-pikaso.png',
  logoVizcom: 'img/logo-vizcom.png',
  logoMidjourney: 'img/logo-midjourney.png',
  heart: 'img/heart.svg',
  ellipse1: 'img/ellipse-1.svg',
  ellipse2: 'img/ellipse-2.svg',
  ellipse3: 'img/ellipse-3.svg',
  scenarioCard1: 'img/scenario-card-1.png',
  scenarioCard2: 'img/scenario-card-2.png',
  scenarioCard3: 'img/scenario-card-3.png',
  scenarioCard4: 'img/scenario-card-4.png',
  scenarioDevice: 'img/scenario-device.png',
  mobile2: 'img/mobile-ui-2.png',
  mobile3: 'img/mobile-ui-3.png',
  mobile4: 'img/mobile-ui-4.png',
  pc2: 'img/pc-ui-2.png',
  pc3: 'img/pc-ui-3.png',
  tv: 'img/tv-ui.png',
  components1: 'img/components-1.png',
  components2: 'img/components-2.png',
  footer: 'img/footer-hyundai.png',
} as const;

const V = {
  /**
   * 왼쪽 Mobile UI — 원본은 QuickTime MOV라 Chrome 등에서 `<video>` 미재생인 경우가 많음.
   * `mobile-screen-recording.m4v`(H.264)를 우선 사용하고, Safari 등은 MOV 폴백.
   */
  mobileScreenH264: 'video/mobile-screen-recording.m4v',
  mobileScreenMov: 'video/Screen Recording 2026-04-16 at 22.28.02 1.mov',
  pcDemo: 'video/pc-demo.mp4',
} as const;

export function Hyundai() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = root.clientWidth / DESIGN_W;
      frame.style.setProperty('--hy-scale', String(scale));
      root.style.height = `${DESIGN_H * scale}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const v = mobileVideoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <div className="hy-scale-root" ref={rootRef}>
      <div className="hy-frame" ref={frameRef} data-node-id="27:219">
        {/* Hero car */}
        <div className="hy-abs hy-hero" data-node-id="27:221">
          <img src={hyundaiAsset(I.hero)} alt="" />
        </div>

        {/* Blurred top bar behind header */}
        <div className="hy-abs hy-top-blur" data-node-id="27:228" aria-hidden />

        {/* Mid blur under hero */}
        <div className="hy-abs hy-mid-blur" data-node-id="27:225" aria-hidden />

        {/* Breadcrumb header */}
        <ProjectPageHeader
          embedded
          variant="dark"
          breadcrumb="Projects - IAC - UX/UI Design, System"
        />

        {/* ── Overview ──────────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-overview-h" data-node-id="28:129">
          Overview
        </h2>
        <div className="hy-abs hy-overview-line" data-node-id="28:131" aria-hidden />
        <div className="hy-abs hy-text-20 hy-overview-p1" data-node-id="28:128">
          <p>This project reimagines the generative AI pipeline for automotive exterior designers.</p>
          <p>
            <span>In collaboration with </span>
            <em>Hyundai Motors, </em>
            <span>I explored how AI tools can be integrated into a unified workflow to enhance design efficiency, security, and collaboration.</span>
          </p>
        </div>
        <p className="hy-abs hy-text-20 hy-text-20--sub hy-overview-p2" data-node-id="28:130">
          Through a four-month embedded research process, I worked alongside automotive design students and professors, directly engaging in AI-assisted vehicle design workflows.
        </p>
        <div className="hy-abs hy-overview-img hy-overview-1" data-node-id="139:656">
          <img src={hyundaiAsset(I.overview1)} alt="" />
        </div>
        <div className="hy-abs hy-overview-img hy-overview-2" data-node-id="139:659">
          <img src={hyundaiAsset(I.overview2)} alt="" />
        </div>
        <div className="hy-abs hy-overview-img hy-overview-3" data-node-id="139:676">
          <img src={hyundaiAsset(I.overview3)} alt="" />
        </div>

        {/* ── Problem ──────────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-problem-h" data-node-id="139:583">
          Problem
        </h2>
        <div className="hy-abs hy-problem-left" data-node-id="139:635" data-project-reveal>
          <div className="hy-problem-rot">
            <div className="hy-problem-float-wrap hy-problem-float-wrap--left">
              <img src={hyundaiAsset(I.deskLeft)} alt="" />
            </div>
          </div>
        </div>
        <div className="hy-abs hy-problem-right" data-node-id="139:638" data-project-reveal>
          <div className="hy-problem-float-wrap hy-problem-float-wrap--right">
            <img src={hyundaiAsset(I.deskRight)} alt="" />
          </div>
        </div>
        <div className="hy-abs hy-logo-freepik" data-node-id="139:548" data-project-reveal>
          <img src={hyundaiAsset(I.logoPikaso)} alt="Freepik Pikaso" />
        </div>
        <div className="hy-abs hy-logo-midjourney" data-node-id="139:572" data-project-reveal>
          <img src={hyundaiAsset(I.logoMidjourney)} alt="Midjourney" />
        </div>
        <div className="hy-abs hy-logo-vizcom" data-node-id="139:562" data-project-reveal>
          <img src={hyundaiAsset(I.logoVizcom)} alt="Vizcom" />
        </div>

        {/* ── Desk Research ────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-desk-h" data-node-id="139:592">
          Desk Research
        </h2>
        <div className="hy-abs hy-text-20 hy-desk-p" data-node-id="163:1445">
          <p>Trained a 3D model–based LoRA</p>
          <p>on exterior designs from various automotive brands, and developed custom sliders informed by hands-on experience in real-world automotive design workflows.</p>
        </div>
        <div className="hy-abs hy-desk-bg" data-node-id="143:719" data-project-reveal>
          <img src={hyundaiAsset(I.deskBg)} alt="" />
        </div>

        {/* ── User Scenario ────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-scenario-h" data-node-id="143:721">
          User Scenario
        </h2>

        {/* Figma 189:5119 Frame 335 — portfoliowebsite User Scenario block */}
        <div className="hy-abs hy-sc-frame335" data-node-id="189:5119">
        <div className="hy-abs hy-ellipse hy-ellipse-1" aria-hidden data-node-id="189:5081" data-project-reveal>
          <div>
            <img src={hyundaiAsset(I.ellipse1)} alt="" />
          </div>
        </div>
        <div className="hy-abs hy-ellipse hy-ellipse-2" aria-hidden data-node-id="189:5082" data-project-reveal>
          <div>
            <img src={hyundaiAsset(I.ellipse2)} alt="" />
          </div>
        </div>
        <div className="hy-abs hy-ellipse hy-ellipse-3" aria-hidden data-node-id="189:5078" data-project-reveal>
          <div>
            <img src={hyundaiAsset(I.ellipse3)} alt="" />
          </div>
        </div>

        <div className="hy-abs hy-sc-cluster-slot hy-sc-cluster-slot--pc" data-project-reveal>
          <div className="hy-sc-cluster-body hy-sc-cluster-body--pc" data-node-id="189:5083">
            <div className="hy-sc-card hy-sc-1" data-node-id="171:2352">
              <img src={hyundaiAsset(I.scenarioCard1)} alt="" />
            </div>
            <p className="hy-text-16 hy-sc-p1" data-node-id="165:1630">
              Designers input prompts on their personal PCs to generate new design concepts.
            </p>
          </div>
        </div>
        <div className="hy-abs hy-sc-cluster-slot hy-sc-cluster-slot--tv" data-project-reveal>
          <div className="hy-sc-cluster-body hy-sc-cluster-body--tv" data-node-id="189:5084">
            <div className="hy-sc-card hy-sc-2" data-node-id="189:5057">
              <img src={hyundaiAsset(I.scenarioCard2)} alt="" />
            </div>
            <p className="hy-text-16 hy-sc-p2" data-node-id="165:1640">
              Designers can review and vote on how others’ designs were generated, including the prompts and parameters used.
            </p>
          </div>
        </div>
        <div className="hy-abs hy-sc-cluster-slot hy-sc-cluster-slot--mob" data-project-reveal>
          <div className="hy-sc-cluster-body hy-sc-cluster-body--mob" data-node-id="189:5085">
            <div className="hy-sc-card hy-sc-3" data-node-id="189:5058">
              <img src={hyundaiAsset(I.scenarioCard3)} alt="" />
            </div>
            <p className="hy-text-16 hy-sc-p3" data-node-id="165:1632">
              {`Results are ranked and organized based on user “likes     ”, with prompts and parameters transparently displayed.`}
            </p>
            <div className="hy-heart" data-node-id="165:1637">
              <img src={hyundaiAsset(I.heart)} alt="" />
            </div>
          </div>
        </div>

        <div className="hy-abs hy-sc-card hy-sc-4" data-node-id="189:5056" data-project-reveal>
          <img src={hyundaiAsset(I.scenarioCard4)} alt="" />
        </div>
        <div className="hy-abs hy-sc-device" data-node-id="165:1660" data-project-reveal>
          <img src={hyundaiAsset(I.scenarioDevice)} alt="" />
        </div>
        </div>

        {/* ── Mobile UI ────────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-mobile-h" data-node-id="139:538">
          Mobile UI
        </h2>

        <div className="hy-abs hy-mobile-screen" data-node-id="189:5116" data-project-reveal>
          <video
            ref={mobileVideoRef}
            autoPlay
            muted
            playsInline
            loop
            controlsList="nodownload"
            preload="auto"
            poster={hyundaiAsset(I.mobile2)}
          >
            <source src={hyundaiAsset(V.mobileScreenH264)} type="video/mp4" />
            <source src={hyundaiAsset(V.mobileScreenMov)} type="video/quicktime" />
          </video>
        </div>

        <div className="hy-abs hy-mobile-img hy-mobile-2" data-node-id="171:2315" data-project-reveal>
          <img src={hyundaiAsset(I.mobile2)} alt="" />
        </div>
        <div className="hy-abs hy-mobile-img hy-mobile-3" data-node-id="171:2318" data-project-reveal>
          <img src={hyundaiAsset(I.mobile3)} alt="" />
        </div>
        <div className="hy-abs hy-mobile-img hy-mobile-4" data-node-id="171:2340" data-project-reveal>
          <img src={hyundaiAsset(I.mobile4)} alt="" />
        </div>

        {/* ── PC/Laptop UI ─────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-pc-h" data-node-id="143:727">
          PC/Laptop UI
        </h2>

        <div className="hy-abs hy-pc-video" data-node-id="180:3869" data-project-reveal>
          <video
            autoPlay
            muted
            playsInline
            loop
            controlsList="nodownload"
            poster={hyundaiAsset(I.pc2)}
          >
            <source src={hyundaiAsset(V.pcDemo)} type="video/mp4" />
          </video>
        </div>
        <div className="hy-abs hy-pc-img-2" data-node-id="182:4131" data-project-reveal>
          <img src={hyundaiAsset(I.pc2)} alt="" />
        </div>
        <div className="hy-abs hy-pc-img-3" data-node-id="183:4134">
          <img src={hyundaiAsset(I.pc3)} alt="" />
        </div>

        {/* ── TV UI ────────────────────────────────── */}
        <h2 className="hy-abs hy-section-h hy-tv-h" data-node-id="143:728">
          TV UI
        </h2>
        <div className="hy-abs hy-tv-img" data-node-id="143:1143" data-project-reveal>
          <img src={hyundaiAsset(I.tv)} alt="" />
        </div>

        {/* ── Design Components ───────────────────── */}
        <h2 className="hy-abs hy-section-h hy-components-h" data-node-id="143:1349">
          Design Components
        </h2>
        <div className="hy-abs hy-components-1" data-node-id="171:2343" data-project-reveal>
          <img src={hyundaiAsset(I.components1)} alt="" />
        </div>
        <div className="hy-abs hy-components-2" data-node-id="171:2346" data-project-reveal>
          <img src={hyundaiAsset(I.components2)} alt="" />
        </div>

        {/* ── Footer (HYUNDAI wordmark) ───────────── */}
        <div className="hy-abs hy-footer" data-node-id="171:2349">
          <img src={hyundaiAsset(I.footer)} alt="HYUNDAI" />
        </div>
      </div>
    </div>
  );
}
