import { useLayoutEffect, useRef, useState } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot, designScaleFromRootWidth } from '../lib/designRootWidth';
import { angelAsset } from '../lib/angelAssets';
import '../styles/angel.css';

const DESIGN_W = 1920;
const DESIGN_H = 5967;

function initialAngelFrameScale(): number {
  if (typeof window === 'undefined') return 1;
  const w = document.documentElement?.clientWidth ?? window.innerWidth;
  return designScaleFromRootWidth(Math.max(w, 1), DESIGN_W);
}

/** Angel of Oblivion — Publication theater (Figma 312:139) */
export function Angel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameScale, setFrameScale] = useState(initialAngelFrameScale);

  useProjectScrollReveal(frameRef);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const update = () => {
      root.style.setProperty('--angel-design-h', `${DESIGN_H}px`);
      setFrameScale(designScaleForRoot(root, DESIGN_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="angel-scale-root" ref={rootRef}>
      <div
        className="angel-frame"
        ref={frameRef}
        data-name="angel"
        data-node-id="312:139"
        style={{
          transform: `scale(${frameScale}) translateZ(0)`,
          transformOrigin: 'top left',
        }}
      >
        <ProjectPageHeader
          embedded
          variant="light"
          breadcrumb="Projects - Personal - Publication"
          className="angel-header"
        />

        <figure className="angel-hero" data-node-id="313:238" data-project-reveal>
          <img src={angelAsset('mainposter.png')} alt="" decoding="async" />
        </figure>

        <h2 className="angel-about-heading" data-node-id="312:141" data-project-reveal>
          About this project
        </h2>

        <div className="angel-about" data-node-id="312:174" data-project-reveal>
          <ul className="angel-about__list">
            <li>
              <strong>Title: </strong>
              <span className="angel-about__reg">Angel of Oblivion</span>
            </li>
            <li>
              <strong>Original Work</strong>
              <span className="angel-about__reg">: The Good Person of Szechwan by Bertolt Brecht</span>
            </li>
            <li>
              <strong>Genre</strong>
              <span className="angel-about__reg">: Black Comedy</span>
            </li>
          </ul>

          <div className="angel-about__gap" aria-hidden="true" />

          <ul className="angel-about__list angel-about__concept-block">
            <li>
              <strong>Concept:</strong>
              <br />
              <span className="angel-about__quote">
                “How can one remain good in a harsh, capital-driven world?”{' '}
              </span>
              <span className="angel-about__reg">
                is a question that may never be resolved as long as humanity exists. This project explores
                the ambiguity of “good” and “evil” within systems of capital, drawing from{' '}
              </span>
              <span className="angel-about__title-italic">The Good Person </span>
              <span className="angel-about__reg">
                of Szechwan. In order to remain good, one must have money-yet money so easily leads people
                toward wrongdoing. Through a character positioned within these contradictions, the work
                reflects on the inconsistencies of social structures and the complexity of human nature.
                The reference to M. C. Escher stems from his ability to visually express paradox and
                ambiguity, which parallels the indistinguishable boundaries between good and evil under
                capitalism, as well as the hybrid nature of human identity.
              </span>
            </li>
          </ul>
        </div>

        <p className="angel-type-label" data-node-id="312:199" data-project-reveal>
          Typography Design
        </p>

        <div className="angel-type-strip" data-node-id="312:179" data-project-reveal>
          <img src={angelAsset('image 6346567.png')} alt="" decoding="async" />
        </div>

        <h2 className="angel-section-heading angel-heading-moodboard" data-node-id="312:169" data-project-reveal>
          Moodboard
        </h2>

        <figure className="angel-mood angel-mood--12" data-node-id="312:165" data-project-reveal>
          <img src={angelAsset('image 12.png')} alt="" decoding="async" loading="lazy" />
        </figure>
        <figure className="angel-mood angel-mood--13" data-node-id="312:164" data-project-reveal>
          <img src={angelAsset('image 13.png')} alt="" decoding="async" loading="lazy" />
        </figure>
        <figure className="angel-mood angel-mood--14" data-node-id="312:163" data-project-reveal>
          <img src={angelAsset('image 14.png')} alt="" decoding="async" loading="lazy" />
        </figure>
        <figure className="angel-mood angel-mood--1" data-node-id="312:171" data-project-reveal>
          <img src={angelAsset('image 1.png')} alt="" decoding="async" loading="lazy" />
        </figure>
        <figure className="angel-mood angel-mood--27" data-node-id="312:162" data-project-reveal>
          <img src={angelAsset('image 27.png')} alt="" decoding="async" loading="lazy" />
        </figure>
        <figure className="angel-mood angel-mood--29" data-node-id="312:167" data-project-reveal>
          <img src={angelAsset('image 29.png')} alt="" decoding="async" loading="lazy" />
        </figure>

        <h2 className="angel-section-heading angel-heading-reflet" data-node-id="312:213" data-project-reveal>
          Reflet
        </h2>

        <figure className="angel-finale angel-finale--reflet" data-node-id="313:239" data-project-reveal>
          <img src={angelAsset('reflet1.png')} alt="" decoding="async" loading="lazy" />
        </figure>

        <figure className="angel-finale angel-finale--bottom" data-node-id="313:240" data-project-reveal>
          <img src={angelAsset('reflet2.png')} alt="" decoding="async" loading="lazy" />
        </figure>

        <div className="angel-meta-dates" data-node-id="312:146">
          <p>10.04. 2024 - 12. 01. 2024</p>
          <p>Personal Project</p>
        </div>
        <p className="angel-meta-tools" data-node-id="312:147">
          Tools - Illustrator / Indesign / Blender
        </p>
      </div>
    </div>
  );
}
