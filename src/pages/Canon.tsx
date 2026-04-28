import { useLayoutEffect, useRef, useState } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { canonAsset } from '../lib/canonAssets';
import '../styles/canon.css';

const DESIGN_W = 1920;
/** Figma 215:2580 전체 프레임 높이 */
const DESIGN_H = 5964;

/** Canon Camera Museum — Personal (Figma 215:2580) */
function initialCanonFrameScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

export function Canon() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameScale, setFrameScale] = useState(initialCanonFrameScale);

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
          variant="dark"
          breadcrumb="Projects - Personal - Web Design"
          className="canon-header"
        />

        <figure className="canon-landing-video" data-node-id="309:76" data-project-reveal>
          <video muted playsInline loop autoPlay src={canonAsset('video/landing.mov')} />
        </figure>

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
          <video muted playsInline loop autoPlay src={canonAsset('video/gallery.mov')} />
        </figure>

        <figure className="canon-evolution-left" data-node-id="249:269" data-project-reveal>
          <img src={canonAsset('evolution-left.png')} alt="" decoding="async" />
        </figure>
        <figure className="canon-detail-video" data-node-id="309:74" data-project-reveal>
          <video muted playsInline loop autoPlay src={canonAsset('video/detail.mov')} />
        </figure>
        <div className="canon-line-dot" data-node-id="249:277" aria-hidden="true">
          <img src={canonAsset('line-dot.svg')} alt="" />
        </div>

        <p className="canon-bottom-wip" data-project-reveal>
          Work in Progress
        </p>
      </div>
    </div>
  );
}
