import { useEffect, useRef } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { SeoculusDiagram369 } from '../components/SeoculusDiagram369';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot } from '../lib/designRootWidth';
import { seoculusAsset } from '../lib/seoculusAssets';
import '../styles/seoculus.css';

const DESIGN_W = 1920;

const a = (path: string) => seoculusAsset(path);

export function Seoculus() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const mainLogoTitleRef = useRef<HTMLParagraphElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      frame.style.setProperty('--seo-scale', String(designScaleForRoot(root, DESIGN_W)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const v = heroVideoRef.current;
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

  /** Main Logo A → B → KOR 순차 등장 (스크롤로 섹션 진입 시) */
  useEffect(() => {
    const title = mainLogoTitleRef.current;
    const frame = frameRef.current;
    if (!title || !frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      frame.classList.add('seo-frame--main-logos-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          frame.classList.add('seo-frame--main-logos-in');
          io.disconnect();
        }
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(title);
    return () => io.disconnect();
  }, []);

  return (
    <div className="seo-scale-root" ref={rootRef}>
      <div className="seo-frame" ref={frameRef} data-node-id="109:1035">
        <div className="seo-abs seo-footer-gradient" data-node-id="215:2579" aria-hidden />

        <ProjectPageHeader
          embedded
          variant="dark"
          breadcrumb="Projects - Personal - BX, Visual Identity"
          className="seo-header"
        />

        <div className="seo-abs seo-hero-video" data-node-id="241:33" data-name="seoculuslogo 1">
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
          >
            <source src={a('video/seoculuslogo.webm')} type="video/webm" />
            <source src={a('video/seoculuslogo.mov')} type="video/quicktime" />
          </video>
        </div>

        <div className="seo-abs seo-mark-block" style={{ left: 1304, top: 1402, width: 450, height: 315 }} data-node-id="113:268" data-project-reveal>
          <img className="seo-fill" src={a('img/overview-panel-a.svg')} alt="" draggable={false} />
          <div className="seo-abs" style={{ inset: '18.96% 67.02% 72.95% 27.34%' }} data-node-id="113:310">
            <img className="seo-fill" src={a('img/mark-a-1.svg')} alt="" draggable={false} />
          </div>
          <div className="seo-abs" style={{ inset: '75.63% 59.88% 16.28% 34.49%' }} data-node-id="113:313">
            <img className="seo-fill" src={a('img/mark-a-2.svg')} alt="" draggable={false} />
          </div>
          <div className="seo-abs" style={{ inset: '51.26% 4.7% 40.65% 89.66%' }} data-node-id="113:316">
            <img className="seo-fill" src={a('img/mark-a-3.svg')} alt="" draggable={false} />
          </div>
        </div>

        <div className="seo-abs seo-mark-block" style={{ left: 747, top: 2594, width: 382, height: 268 }} data-node-id="211:1838" data-project-reveal>
          <img className="seo-fill" src={a('img/overview-panel-b.svg')} alt="" draggable={false} />
          <div className="seo-abs" style={{ inset: '18.96% 67.02% 72.95% 27.34%' }} data-node-id="211:1880">
            <img className="seo-fill" src={a('img/mark-b-1.svg')} alt="" draggable={false} />
          </div>
          <div className="seo-abs" style={{ inset: '75.63% 59.88% 16.28% 34.49%' }} data-node-id="211:1883">
            <img className="seo-fill" src={a('img/mark-b-2.svg')} alt="" draggable={false} />
          </div>
          <div className="seo-abs" style={{ inset: '51.26% 4.7% 40.65% 89.66%' }} data-node-id="211:1886">
            <img className="seo-fill" src={a('img/mark-b-3.svg')} alt="" draggable={false} />
          </div>
        </div>

        <p className="seo-abs seo-body-20" style={{ left: 69, top: 1380, width: 331, height: 250 }} data-node-id="211:1331" data-project-reveal>
          CIRCULUS imagines a post-nuclear future where Seoul&apos;s Line 2 subway becomes the base of an underground city. As a
          piece of speculative design, it uses a field research to study survival needs and movement patterns, then creates a
          modular identity system with four divisions and user-centered tools like survival kits and redesigned maps.{' '}
        </p>

        <div className="seo-abs" style={{ left: 69, top: 1330, width: 319, height: 1 }} data-node-id="211:1333" data-project-reveal>
          <img className="seo-fill" style={{ objectFit: 'fill', height: 2 }} src={a('img/overview-line.svg')} alt="" draggable={false} />
        </div>

        <p className="seo-abs seo-h30" style={{ left: 69, top: 1264 }} data-node-id="211:1334" data-project-reveal>
          Overview
        </p>

        <p ref={mainLogoTitleRef} className="seo-abs seo-h30" style={{ left: 69, top: 2289 }} data-node-id="211:1831" data-project-reveal>
          Main Logo Design
        </p>

        <p className="seo-abs seo-h30" style={{ left: 69, top: 4689 }} data-node-id="215:2498" data-project-reveal>
          Sub Logo Design
        </p>

        <div className="seo-abs seo-shadow" style={{ left: 757, top: 1264, width: 477, height: 676 }} data-node-id="211:1340" data-project-reveal>
          <img className="seo-fill" src={a('img/booklet-back.png')} alt="" draggable={false} />
        </div>

        <p className="seo-abs seo-caption seo-main-logo-stagger seo-main-logo--a" style={{ left: 263, top: 2431 }} data-node-id="211:1834">
          Main logo_ENG_TypeA
        </p>
        <p className="seo-abs seo-caption seo-main-logo-stagger seo-main-logo--b" style={{ left: 833, top: 2431 }} data-node-id="211:2176">
          Main logo_ENG_TypeB
        </p>
        <p className="seo-abs seo-caption seo-main-logo-stagger seo-main-logo--kor" style={{ left: 1460, top: 2431 }} data-node-id="211:1836">
          Main logo_KOR
        </p>

        <p className="seo-abs seo-caption" style={{ left: 322, top: 4810, transform: 'translateX(-50%)', textAlign: 'center' }} data-node-id="215:2493" data-project-reveal>
          Research Division
        </p>
        <p className="seo-abs seo-caption" style={{ left: 773.5, top: 4810, transform: 'translateX(-50%)', textAlign: 'center' }} data-node-id="215:2495" data-project-reveal>
          Medical Division
        </p>
        <p className="seo-abs seo-caption" style={{ left: 1198, top: 4810, transform: 'translateX(-50%)', textAlign: 'center' }} data-node-id="215:2496" data-project-reveal>
          Exploration Division
        </p>
        <p className="seo-abs seo-caption" style={{ left: 1593.5, top: 4810, transform: 'translateX(-50%)', textAlign: 'center' }} data-node-id="215:2497" data-project-reveal>
          Educaiton Division
        </p>

        <div className="seo-abs seo-main-logo-stagger seo-main-logo--a" style={{ left: 1296, top: 2618, width: 470, height: 220 }} data-node-id="113:240">
          <img className="seo-fill" src={a('img/logo-type-a.svg')} alt="" draggable={false} />
        </div>
        <div className="seo-abs seo-main-logo-stagger seo-main-logo--b" style={{ left: 1159, top: 3993, width: 428, height: 200 }} data-node-id="215:2457">
          <img className="seo-fill" src={a('img/logo-type-b.svg')} alt="" draggable={false} />
        </div>

        <div className="seo-abs seo-main-logo-stagger seo-main-logo--kor" style={{ left: 128, top: 2618, width: 503, height: 264 }} data-node-id="215:2575">
          <img className="seo-fill" src={a('img/image-6346498.png')} alt="" draggable={false} />
        </div>

        <div className="seo-abs" style={{ left: 70, top: 2995 }} data-node-id="211:2175" data-project-reveal>
          <SeoculusDiagram369 />
        </div>

        <div className="seo-abs" style={{ inset: '30.93% 3.94% 68.33% 93.9%' }} data-node-id="211:2008">
          <img className="seo-fill" src={a('img/corner-arrow.svg')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ inset: '30.88% 3.61% 68.27% 91.63%' }} data-node-id="211:2010">
          <img className="seo-fill" src={a('img/corner-group-1.svg')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ inset: '31.35% 7.91% 68.44% 90.89%' }} data-node-id="211:2014">
          <img className="seo-fill" src={a('img/corner-group-2.svg')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ inset: '31.14% 4.32% 68.57% 94.3%' }} data-node-id="211:2017">
          <img className="seo-fill" src={a('img/corner-vector.svg')} alt="" draggable={false} />
        </div>

        <p className="seo-abs seo-sub-arrow" style={{ left: 958, top: 4034, width: 49, height: 118, transform: 'translateX(-50%)' }} data-node-id="215:2456" data-project-reveal>
          →
        </p>

        <div className="seo-abs" style={{ left: 317, top: 3882, width: 453.356, height: 393 }} data-node-id="215:2484" data-project-reveal>
          <img className="seo-fill" src={a('img/image-9.png')} alt="" draggable={false} />
        </div>

        <div className="seo-abs" style={{ left: 547, top: 4964, width: 375, height: 262 }} data-node-id="215:2488" data-project-reveal>
          <img className="seo-fill" src={a('img/sublogo-1.png')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ left: 1420, top: 4964, width: 390.464, height: 262 }} data-node-id="215:2489" data-project-reveal>
          <img className="seo-fill" src={a('img/sublogo-2.png')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ left: 989, top: 4964, width: 364, height: 262 }} data-node-id="215:2490" data-project-reveal>
          <div className="seo-img-clip seo-shot-sub-11">
            <img className="seo-sublogo-11" src={a('img/image 11.png')} alt="" draggable={false} />
          </div>
        </div>
        <div className="seo-abs" style={{ left: 111, top: 4964, width: 369, height: 262 }} data-node-id="215:2491" data-project-reveal>
          <img className="seo-fill" src={a('img/sublogo-4.png')} alt="" draggable={false} />
        </div>

        <div className="seo-abs" style={{ left: 830, top: 5485, width: 991, height: 744 }} data-node-id="215:2503" data-project-reveal>
          <img className="seo-fill" src={a('img/application-center.png')} alt="" draggable={false} />
        </div>

        <p className="seo-abs seo-h30" style={{ left: 69, top: 6606 }} data-node-id="215:2505" data-project-reveal>
          Application
        </p>

        <div className="seo-abs seo-card" style={{ left: 150, top: 5479, width: 587, height: 370 }} data-node-id="215:2622" data-project-reveal>
          <img className="seo-fill" src={a('img/card-v1-1.png')} alt="" draggable={false} />
        </div>
        <div className="seo-abs seo-card" style={{ left: 150, top: 5871, width: 586, height: 370 }} data-node-id="215:2623" data-project-reveal>
          <img className="seo-fill" src={a('img/card-v1-2.png')} alt="" draggable={false} />
        </div>

        <div className="seo-abs" style={{ left: 414, top: 6696, width: 1102, height: 856 }} data-node-id="192:5294" data-project-reveal>
          <img className="seo-fill" src={a('img/screenshot-022522.png')} alt="" draggable={false} />
        </div>

        <div className="seo-abs seo-shot-022701" style={{ left: 576, top: 7968, width: 1344, height: 786 }} data-node-id="192:5304" data-project-reveal>
          <div className="seo-img-clip">
            <img src={a('img/screenshot-022701.png')} alt="" draggable={false} />
          </div>
        </div>

        <div className="seo-abs seo-shot-022609" style={{ left: 0, top: 8962, width: 1920, height: 1146 }} data-node-id="192:5297" data-project-reveal>
          <div className="seo-img-clip">
            <img src={a('img/screenshot-022609.png')} alt="" draggable={false} />
          </div>
        </div>

        <div className="seo-abs seo-shot-022635" style={{ left: 117, top: 7785, width: 530, height: 753 }} data-node-id="192:5300" data-project-reveal>
          <div className="seo-img-clip">
            <img src={a('img/screenshot-022635.png')} alt="" draggable={false} />
          </div>
        </div>

        <div className="seo-abs seo-shadow" style={{ left: 220, top: 10335, width: 700, height: 993 }} data-node-id="215:2507" data-project-reveal>
          <img className="seo-fill" src={a('img/booklet-back.png')} alt="" draggable={false} />
        </div>
        <div className="seo-abs" style={{ left: 1001, top: 10335, width: 700, height: 993 }} data-node-id="215:2509" data-project-reveal>
          <img className="seo-fill" src={a('img/booklet-front.png')} alt="" draggable={false} />
        </div>

        <div
          className="seo-abs seo-footer-meta seo-footer-foreground"
          style={{ left: 'calc(50% + 705px)', top: 11473, width: 177, height: 46 }}
          data-node-id="215:2511"
        >
          <p style={{ margin: 0 }}>09.18. 2024 - 12. 15. 2024</p>
          <p style={{ margin: 0 }}>Personal Project</p>
        </div>
        <p
          className="seo-abs seo-footer-meta seo-footer-foreground"
          style={{ left: 86, top: 11484, width: 384 }}
          data-node-id="215:2512"
        >
          Tools - Figma / Adobe Illustrator / Blender
        </p>

        <div className="seo-abs seo-footer-foreground" style={{ left: 853, top: 11433, width: 241, height: 126 }} data-node-id="215:2577">
          <img className="seo-fill" src={a('img/image-6346498.png')} alt="" draggable={false} />
        </div>
      </div>
    </div>
  );
}
