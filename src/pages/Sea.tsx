import { useLayoutEffect, useRef, useState } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { seaAsset } from '../lib/seaAssets';
import '../styles/sea.css';

const DESIGN_W = 1920;
/** Figma 312:96 Sea 프레임 높이 */
const DESIGN_H = 5967;

function initialSeaFrameScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

/** Sea — Publication (Figma 312:96), Neri Oxman Material Ecology 참고 코랄 책 프로젝트 */
export function Sea() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameScale, setFrameScale] = useState(initialSeaFrameScale);

  useProjectScrollReveal(frameRef);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      root.style.setProperty('--sea-design-h', `${DESIGN_H}px`);
      setFrameScale(designScaleForRoot(root, DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="sea-scale-root" ref={rootRef}>
      <div
        className="sea-frame"
        ref={frameRef}
        data-name="Sea"
        data-node-id="312:96"
        style={{
          transform: `scale(${frameScale}) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <ProjectPageHeader
          embedded
          variant="dark"
          breadcrumb="Projects - Personal - Publication"
          className="sea-header"
        />

        <figure className="sea-hero" data-node-id="312:130" data-project-reveal>
          <img src={seaAsset('image 6346564.png')} alt="" decoding="async" />
        </figure>

        <h2 className="sea-overview-heading" data-node-id="312:98" data-project-reveal>
          Overview
        </h2>
        <div className="sea-overview-line-wrap" data-node-id="312:97" aria-hidden>
          <img className="sea-overview-line" src={seaAsset('line-overview.svg')} alt="" decoding="async" />
        </div>
        <div className="sea-overview-copy" data-node-id="312:99" data-project-reveal>
          <p>
            Inspired by Neri Oxman’s Material Ecology, this project explores the cycle between nature
            and humans. The book contrasts living and bleached coral, pairing abstract images of
            human actions with explanations that reveal their impact. An accompanying art video
            combines sound and visuals: as coral graphics fade and disappear, the lively bubbling of
            reefs gives way to silence, immersing viewers in the emotional weight of coral loss and
            prompting reflection.
          </p>
        </div>

        <figure className="sea-vv" data-node-id="313:249" data-project-reveal>
          <img src={seaAsset('vv 1.png')} alt="" decoding="async" />
        </figure>

        <figure className="sea-vf" data-node-id="313:254" data-name="vf 1 1" data-project-reveal>
          <img src={seaAsset('vf 1.png')} alt="" decoding="async" loading="lazy" />
        </figure>

        <p className="sea-copy-covers" data-node-id="312:138" data-project-reveal>
          The front and back covers feature living coral and bleached coral to create a
          before-and-after contrast, reflecting the publication’s central theme: the effects of
          human-caused environmental pollution.
        </p>

        <p className="sea-copy-magazine" data-node-id="312:135" data-project-reveal>
          Small everyday actions that contribute to global warming are arranged in a magazine-style
          format. By presenting them through concrete imagery, the design aims to evoke recognition
          and empathy from the reader. Blocks of text are treated as visual elements, arranged more
          like illustrations to integrate with the overall atmosphere.
        </p>

        <figure className="sea-spread-large" data-node-id="313:246" data-project-reveal>
          <img src={seaAsset('image 6346565.png')} alt="" decoding="async" />
        </figure>

        <figure className="sea-spread-narrow" data-node-id="313:250" data-project-reveal>
          <img src={seaAsset('image 6346565-1.png')} alt="" decoding="async" />
        </figure>

        <figure className="sea-flatlay" data-node-id="313:243" data-project-reveal>
          <img src={seaAsset('4 1.png')} alt="" decoding="async" />
        </figure>

        <figure className="sea-vb" data-node-id="313:247" data-project-reveal>
          <img src={seaAsset('vb 1.png')} alt="" decoding="async" />
        </figure>

        <div className="sea-meta-dates" data-node-id="312:114">
          <p>09.04. 2024 - 11. 28. 2024</p>
          <p>Personal Project</p>
        </div>
        <p className="sea-meta-tools" data-node-id="312:115">
          Tools - Illustrator / Indesign / Blender
        </p>
      </div>
    </div>
  );
}
