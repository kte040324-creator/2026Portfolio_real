import { useLayoutEffect, useRef, useState } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { canonAsset } from '../lib/canonAssets';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { exhibitionAsset } from '../lib/exhibitionAssets';
import '../styles/exhibition.css';

const DESIGN_W = 1920;
/** Figma 309:41 exhibition 프레임 높이 */
const DESIGN_H = 8117;

function initialExhibitionFrameScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

/** Exhibition 웹사이트 — Personal (Figma 309:41) */
export function ExhibitionWebsite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameScale, setFrameScale] = useState(initialExhibitionFrameScale);

  useProjectScrollReveal(frameRef);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      root.style.setProperty('--exhibition-design-h', `${DESIGN_H}px`);
      setFrameScale(designScaleForRoot(root, DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="exhibition-scale-root" ref={rootRef}>
      <div
        className="exhibition-frame"
        ref={frameRef}
        data-name="exhibition"
        data-node-id="309:41"
        style={{
          transform: `scale(${frameScale}) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <ProjectPageHeader
          embedded
          variant="light"
          breadcrumb="Projects - Personal - Web Design"
          className="exhibition-header"
        />

        <figure className="exhibition-hero" data-node-id="309:1624" data-project-reveal>
          <img
            src={exhibitionAsset('img/image 6346556.png')}
            alt=""
            decoding="async"
          />
        </figure>

        <div className="exhibition-wire-rect" data-node-id="309:101" data-project-reveal>
          <img src={exhibitionAsset('img/Rectangle.png')} alt="" decoding="async" />
        </div>

        <h2 className="exhibition-overview-heading" data-node-id="309:44" data-project-reveal>
          Overview
        </h2>
        <div className="exhibition-overview-line" data-node-id="309:43" aria-hidden="true" />
        <div className="exhibition-overview-copy" data-node-id="309:45" data-project-reveal>
          <p>
            This project responds to the lack of physical space to display all student works. I
            designed a monotone archival website showcasing the works of 18 students in one place.
            The landing page shows only images to spark curiosity, and clicking opens a pop-up
            description with links to detail pages. Custom grid layouts were created to
            accommodate different media types such as video, images, and websites while keeping a
            consistent visual tone.
          </p>
          <p className="exhibition-overview-copy__spacer" aria-hidden="true">
            {'\u200b'}
          </p>
          <p>Exhibited At Karts Gallery, 2025. 07</p>
        </div>

        <h2 className="exhibition-wire-heading" data-node-id="309:67" data-project-reveal>
          Wireframe
        </h2>

        <p className="exhibition-label-popup" data-node-id="309:1635" data-project-reveal>
          Pop-Up Banner
        </p>

        <figure className="exhibition-wire-img-a" data-node-id="309:1627" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346557.png')} alt="" decoding="async" />
        </figure>

        <figure className="exhibition-wire-img-b" data-node-id="309:1630" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346558.png')} alt="" decoding="async" />
        </figure>

        <figure className="exhibition-wire-img-c" data-node-id="309:1633" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346559.png')} alt="" decoding="async" />
        </figure>

        <div className="exhibition-label-video" data-node-id="309:1636" data-project-reveal>
          <p>Detail Page-</p>
          <p>Video</p>
        </div>

        <div className="exhibition-label-photo" data-node-id="309:1637" data-project-reveal>
          <p>Detail Page-</p>
          <p>Photo</p>
        </div>

        <div className="exhibition-line-connector" data-node-id="309:73" aria-hidden="true">
          <img src={canonAsset('line-dot.svg')} alt="" />
        </div>

        <h2 className="exhibition-designed-heading" data-node-id="309:1638" data-project-reveal>
          Designed Pages
        </h2>

        <figure className="exhibition-designed-img-a" data-node-id="309:1664" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346560.png')} alt="" decoding="async" />
        </figure>
        <figure className="exhibition-designed-img-b" data-node-id="309:1665" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346561.png')} alt="" decoding="async" />
        </figure>
        <figure className="exhibition-designed-img-d" data-node-id="309:1666" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346563.png')} alt="" decoding="async" />
        </figure>
        <figure className="exhibition-designed-img-c" data-node-id="309:1663" data-project-reveal>
          <img src={exhibitionAsset('img/image 6346562.png')} alt="" decoding="async" />
        </figure>

        <h2 className="exhibition-proto-heading" data-node-id="309:1652" data-project-reveal>
          Prototype
        </h2>

        <figure className="exhibition-prototype-video" data-node-id="309:1654" data-project-reveal>
          <video
            muted
            playsInline
            loop
            autoPlay
            src={exhibitionAsset('prototype-exhibition.mp4')}
          />
        </figure>

        <div className="exhibition-meta-dates" data-node-id="309:1655">
          <p>07.01. 2025 - 07. 04. 2025</p>
          <p>Personal Project</p>
        </div>
        <p className="exhibition-meta-tools" data-node-id="309:1656">
          Tools - Figma / Cursor
        </p>
      </div>
    </div>
  );
}
