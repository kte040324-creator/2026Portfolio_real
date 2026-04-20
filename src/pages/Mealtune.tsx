import { useEffect, useRef } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot } from '../lib/designRootWidth';
import { mealtuneAsset } from '../lib/mealtuneAssets';
import '../styles/mealtune.css';

const DESIGN_W = 1920;
/** Frame 74:786 artboard height (Figma); 8405+1321 bottom composite = 9726 — avoids extra scroll past content */
const DESIGN_H = 9726;

const I = {
  hero: 'img/2-1 1.png',
  logo: 'img/_레이어_1.png',
  iPhone: 'img/iPhone 15 Pro.png',
  journey: 'img/figma_73a265c18c48b198b93b52226356ff983270d661.png',
  typeRow: 'img/figma_c9a2baf4a30e428e02608811bf02adcbde5840f7.png',
  phases: 'img/figma_2c378fbfb214e57f4442ef81d6fca85003a15ac9.png',
  g19: 'img/19 1.png',
  g18: 'img/18 copy 1.png',
  gMid: 'img/그림1 1.png',
  g23: 'img/2-3 1.png',
  g24: 'img/24 1.png',
  g22: 'img/22 1.png',
  bottom: 'img/figma_b93d5ed2af2142fbd9423a1af424ad18fa3b4151.png',
} as const;

const V = {
  comp8: 'video/컴포지션 8.mp4',
  comp9: 'video/컴포지션 9.mp4',
  comp10: 'video/컴포지션 10_1.mp4',
  han: 'video/han-Picsart-BackgroundRemover.mov',
  hf: 'video/hf_20260414_180508_5601e1aa-6da3-4241-a95b-cae6d20429fd-Picsart-BackgroundRemover.mov',
} as const;

function ArrowNext({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      className="mt-arrow"
      style={style}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M18 13L30 23L18 33" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mealtune() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = designScaleForRoot(root, DESIGN_W);
      frame.style.setProperty('--mt-scale', String(scale));
      root.style.height = `${DESIGN_H * scale}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mt-scale-root" ref={rootRef}>
      <div className="mt-frame" ref={frameRef} data-node-id="74:786">
        <div className="mt-bg-gradient" data-node-id="79:147" aria-hidden />

        <div className="mt-abs mt-bottom-composite" data-node-id="169:2111">
          <img src={mealtuneAsset(I.bottom)} alt="" />
        </div>

        <div className="mt-abs mt-hero" data-node-id="79:141">
          <div className="mt-hero__inner">
            <img src={mealtuneAsset(I.hero)} alt="" />
          </div>
        </div>

        <ProjectPageHeader embedded />

        <div className="mt-abs mt-logo" data-node-id="81:185">
          <img src={mealtuneAsset(I.logo)} alt="MEALTUNE" />
        </div>

        {/* Figma 209:1313 */}
        <p className="mt-abs mt-overview-title" data-node-id="209:1313">
          Overview
        </p>
        {/* Figma 209:1312 — Line 70 */}
        <div className="mt-abs mt-overview-line" data-node-id="209:1312" aria-hidden />
        {/* Figma 209:1310 */}
        <p className="mt-abs mt-overview-p1" data-node-id="209:1310">
          MealTune is a modular mixer system that combines a handheld device with a connected service for personalized meal
          experiences. It records family routines and transitions, tuning into each user’s life while preserving shared culinary memories.
        </p>
        {/* Figma 209:1311 */}
        <div className="mt-abs mt-overview-p2" data-node-id="209:1311">
          <p>Our lives begin and end with soft meals-baby food in early life, easily digestible food in later years.</p>
          <p>
            Parents cook for children, and later, children cook for aging parents. Meals become acts of care and remebrance, passed
            between generations.
          </p>
        </div>

        {/* Figma 191:5270 */}
        <div className="mt-abs mt-iphone" data-node-id="191:5270">
          <img src={mealtuneAsset(I.iPhone)} alt="" />
        </div>

        <div className="mt-abs mt-ux-scenario" data-node-id="209:1315">
          <p>UX Scenario:</p>
          <p>What If Objects could Live, Age, and Die with Users?</p>
        </div>

        <div className="mt-abs mt-sub-1" data-node-id="81:173">
          <p className="mt-sub-1__line1">
            MealTune challenges the conventional notion of kitchen appliances as short-term tools,
          </p>
          <p className="mt-sub-1__line2">
            by embedding long-term memory and intergenerational interaction into a familiar object, the blender.
          </p>
        </div>

        <div className="mt-abs mt-journey" data-node-id="169:2102" data-project-reveal>
          <div className="mt-journey__inner">
            <img src={mealtuneAsset(I.journey)} alt="" />
          </div>
        </div>

        <p className="mt-abs mt-product-heading" data-node-id="211:1322">
          Product Design
        </p>
        <p className="mt-abs mt-product-body" data-node-id="211:1323">
          A detachable handle stores user data and can be passed down as a living archive linking past, present, and future. It
          reframes death as a gentle handover and defines sustainability as a meaningful life cycle rather than endless durability.
        </p>

        <ArrowNext style={{ position: 'absolute', left: 686, top: 4135 }} />
        <ArrowNext style={{ position: 'absolute', left: 1213, top: 4135 }} />

        <p className="mt-abs mt-type-label mt-type-a" data-node-id="106:773">
          TYPE A
        </p>
        <p className="mt-abs mt-type-label mt-type-b" data-node-id="106:772">
          TYPE B
        </p>
        <p className="mt-abs mt-type-label mt-type-c" data-node-id="106:774">
          TYPE C
        </p>

        <div className="mt-abs mt-type-images" data-node-id="169:2105" data-project-reveal>
          <img src={mealtuneAsset(I.typeRow)} alt="" />
        </div>

        <div className="mt-abs mt-packages-bg" data-node-id="169:2108" data-project-reveal>
          <div className="mt-packages-bg__inner">
            <img src={mealtuneAsset(I.phases)} alt="" />
          </div>
        </div>

        <div className="mt-abs mt-video-comp8" data-node-id="97:516">
          <video muted playsInline loop autoPlay src={mealtuneAsset(V.comp8)} />
        </div>
        <div className="mt-abs mt-video-comp9" data-node-id="97:517" data-project-reveal>
          <video muted playsInline loop autoPlay src={mealtuneAsset(V.comp9)} />
        </div>
        <div className="mt-abs mt-video-comp10" data-node-id="97:518" data-project-reveal>
          <video muted playsInline loop autoPlay src={mealtuneAsset(V.comp10)} />
        </div>

        <p className="mt-abs mt-final-heading" data-node-id="117:323">
          Final Delievery
        </p>

        <div className="mt-abs mt-video-hf" data-node-id="122:381" data-project-reveal>
          <video muted playsInline loop autoPlay src={mealtuneAsset(V.hf)} />
        </div>
        <div className="mt-abs mt-video-han" data-node-id="122:380" data-project-reveal>
          <video muted playsInline loop autoPlay src={mealtuneAsset(V.han)} />
        </div>

        <div className="mt-abs mt-g19" data-node-id="117:333" data-project-reveal>
          <div className="mt-g19__inner">
            <img src={mealtuneAsset(I.g19)} alt="" />
          </div>
        </div>
        <div className="mt-abs mt-g-mid" data-node-id="118:336" data-project-reveal>
          <div className="mt-g-mid__inner">
            <img src={mealtuneAsset(I.gMid)} alt="" />
          </div>
        </div>
        <div className="mt-abs mt-g18" data-node-id="117:334" data-project-reveal>
          <div className="mt-g18__inner">
            <img src={mealtuneAsset(I.g18)} alt="" />
          </div>
        </div>

        <div className="mt-abs mt-g23" data-node-id="116:322" data-project-reveal>
          <div className="mt-g23__inner">
            <img src={mealtuneAsset(I.g23)} alt="" />
          </div>
        </div>
        <div className="mt-abs mt-g24" data-node-id="119:349" data-project-reveal>
          <div className="mt-g24__inner">
            <img src={mealtuneAsset(I.g24)} alt="" />
          </div>
        </div>
        <div className="mt-abs mt-g22" data-node-id="119:350" data-project-reveal>
          <div className="mt-g22__inner">
            <img src={mealtuneAsset(I.g22)} alt="" />
          </div>
        </div>

        <div className="mt-abs mt-footer-left" data-node-id="113:223">
          <p>Tools - Figma / Adobe Photoshop / Adobe Illustrator / Blender / Arduino / Processing /Shaper 3D</p>
          <p>AI - Google NanoBanana / Google Veo 2.3 /Topaz</p>
        </div>
        <div className="mt-abs mt-footer-logo" data-node-id="113:225">
          <img src={mealtuneAsset(I.logo)} alt="MEALTUNE" />
        </div>
        <div className="mt-abs mt-footer-right" data-node-id="113:222">
          <p>04.01.2025 - 07.12.2025</p>
          <p>Exhibited at Korea National Univ.of Arts, Seoul, South Korea</p>
          <p>Individual Project</p>
        </div>
      </div>
    </div>
  );
}
