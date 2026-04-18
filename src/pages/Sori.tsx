import { useEffect, useRef } from 'react';
import ColorBends from '../components/ColorBends';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { soriAsset } from '../lib/soriAssets';
import '../styles/sori.css';

const DESIGN_W = 1920;

/** Figma 192:5305 — `public/sori/` */
const I = {
  iPhone: 'img/iPhone 16 Pro.png',
  /** UX Flow — Figma 227:2741 */
  img6346543: 'img/image 6346543.png',
  img6346533: 'img/image 6346533.png',
  img6346534: 'img/image 6346534.png',
  img6346535: 'img/image 6346535.png',
  img6346536: 'img/image 6346536.png',
  img6346537: 'img/image 6346537.png',
} as const;

const V = {
  comp2: 'video/Comp 2_1.mp4',
} as const;

export function Sori() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = root.clientWidth / DESIGN_W;
      frame.style.setProperty('--sori-scale', String(scale));
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

  return (
    <div className="sori-scale-root" ref={rootRef}>
      <div className="sori-frame" ref={frameRef} data-node-id="192:5305">
        <ProjectPageHeader
          embedded
          variant="light"
          breadcrumb="Projects - IAC - UX/UI"
        />

        <div className="sori-abs sori-hero-bends" aria-hidden>
          <ColorBends
            colors={['#ff5c7a', '#8a5cff', '#00ffd1']}
            rotation={99}
            speed={0.41}
            scale={2.2}
            frequency={1.2}
            warpStrength={0.955}
            mouseInfluence={0.4}
            noise={0.19}
            parallax={0.45}
            iterations={1}
            intensity={0.7}
            bandWidth={3.5}
            transparent
            autoRotate={1}
            hoverSpeedMultiplier={1.75}
            hoverSpeedSmooth={14}
          />
        </div>

        <div className="sori-abs sori-hero-device" data-node-id="193:5393">
          <img src={soriAsset(I.iPhone)} alt="" />
        </div>

        <h2 className="sori-abs sori-overview-h" data-node-id="193:5398">
          Overview
        </h2>
        <div className="sori-abs sori-overview-line" data-node-id="193:5397" aria-hidden />

        <p className="sori-abs sori-overview-p" data-node-id="193:5395">
          Designed and developed an AI agent SORI for COEX Plaza (Seoul, South Korea), integrating voice interaction and spatial UI
          within a web-based environment. This project was conducted as part of an industry-academic collaboration using NAVER Cloud
          STT/TTS services.
        </p>

        <ul className="sori-abs sori-overview-list" data-node-id="193:5396">
          <li>Designed a voice-enabled interface combined with a 3D interactive environment</li>
          <li>Created immersive UI interactions using Three.js</li>
          <li>Structured Google Sheets data into embeddings for semantic retrieval and response generation</li>
        </ul>

        <div className="sori-abs sori-overview-video" data-node-id="227:2739">
          <video
            ref={videoRef}
            src={soriAsset(V.comp2)}
            autoPlay
            muted
            playsInline
            loop
            controls
            controlsList="nodownload"
            preload="metadata"
          />
        </div>

        <h2 className="sori-abs sori-uxflow-h" data-node-id="193:5676">
          UX Flow
        </h2>

        <div className="sori-abs sori-img-flow" data-node-id="227:2741" data-name="image 6346543" data-project-reveal>
          <img src={soriAsset(I.img6346543)} alt="" />
        </div>

        <h2 className="sori-abs sori-content-h" data-node-id="193:6115">
          Content data creation_fixedQA
        </h2>
        <div className="sori-abs sori-content-p" data-node-id="193:7078">
          <p style={{ margin: '0 0 0.55em' }}>To reduce token usage, we designed a system in which</p>
          <p style={{ margin: 0 }}>
            pressing the recommendation button provides information only within a curated set of 20 commonly consumed spatial content
            categories.
          </p>
        </div>

        <div className="sori-abs sori-img-qa" data-node-id="197:93" data-project-reveal>
          <img src={soriAsset(I.img6346537)} alt="" />
        </div>

        <h2 className="sori-abs sori-process-h" data-node-id="193:7081">
          UI Design Process
        </h2>
        <p className="sori-abs sori-ver-label sori-ver-label--1" data-node-id="193:7086">
          Ver. 1
        </p>
        <div className="sori-abs sori-img-v1" data-node-id="193:7088" data-project-reveal>
          <img src={soriAsset(I.img6346533)} alt="" />
        </div>

        <p className="sori-abs sori-ver-label sori-ver-label--2" data-node-id="193:7094">
          Ver. 2
        </p>
        <div className="sori-abs sori-img-v2" data-node-id="197:95" data-project-reveal>
          <img src={soriAsset(I.img6346534)} alt="" />
        </div>

        <h2 className="sori-abs sori-details-h" data-node-id="193:6420">
          UI details_landing page
        </h2>

        <div className="sori-abs sori-img-landing" data-node-id="193:7104" data-project-reveal>
          <img src={soriAsset(I.img6346536)} alt="" />
        </div>

        <p className="sori-abs sori-meta-tools" data-node-id="193:6989">
          Tools - Figma / Adobe Photoshop
          <br />
          AI - Midjourney / Kling
        </p>
        <div className="sori-abs sori-meta-team" data-node-id="193:6988">
          <p>07.28.2025 - 02.01.2026</p>
          <p>Team Project(UX/UI 2, Dev 3),</p>
          <p>Participated as UI leader, UX researcher</p>
        </div>

        <div className="sori-abs sori-bottom-mark" data-node-id="193:7101">
          <img src={soriAsset(I.img6346535)} alt="" />
        </div>
      </div>
    </div>
  );
}
