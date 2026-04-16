import { LandingHeader } from '../components/LandingHeader';
import { MainScrollSnapTrack } from '../components/MainScrollSnapTrack';
import '../styles/main.css';

/** Figma-exported assets for frame "main" (node 43:134) */
const M = '/assets/main';

export function Main() {
  return (
    <div className="main-page">
      <LandingHeader />

      {/* 히어로: main-stage 밖, main-page 직속 — stacking context를 main-stage와 분리 */}
      <div className="main-hero-title-wrap" data-node-id="76:841">
        <img
          className="main-hero-title"
          src={`${M}/5da30443c02f969c0e187e655127a7b4deaf470f.svg`}
          alt="김태은 @Taeeun Clara Kim"
          draggable={false}
        />
      </div>

      <MainScrollSnapTrack />

      <main id="main" className="main-stage">
        {/* Figma 43:286 — mix-blend-mode: difference. 히어로(fixed)와 같은 root에서 합성 — main-page 직속, 래퍼 없음 */}
        <div className="main-intro" data-node-id="43:286">
          <p className="main-intro__line">Designing the Interaction Between Humans and Systems</p>
          <p className="main-intro__spacer" aria-hidden="true">&nbsp;</p>
          <p className="main-intro__line">Based in Seoul, South Korea</p>
          <p className="main-intro__line">Currently in Baltimore, Maryland</p>
          <p className="main-intro__line main-intro__line--last">Looking for an Opportunity</p>
        </div>

        {/* Figma 52:128 */}
        <a className="main-cv" href="/pages/cv.html" data-node-id="52:128">
          → CV
        </a>

        {/* Figma 43:280 */}
        <div className="main-skills-line" data-node-id="43:280">
          <p className="main-skills-line__spacer">&nbsp;</p>
          <p className="main-skills-line__text">
            Website, Branding Identity, Visual Coding, 3D Modeling
          </p>
        </div>

        {/* Figma 54:142 — IAC section label */}
        <p className="main-section-label main-section-label--iac" data-node-id="54:142">
          IAC Projects”
        </p>

        <div className="main-iac-row" aria-label="IAC 프로젝트">
          <article className="main-card main-card--c1 main-iac-1" data-node-id="163:1430">
            <div className="main-card__media">
              <img src={`${M}/e0ecda186bdbb1e1f60ca19811130732fff49590.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c2 main-iac-2" data-node-id="163:1434">
            <div className="main-card__media">
              <img src={`${M}/bf74cf1eaa5556b48b185bb1fe238c6e40db7116.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c3 main-iac-3" data-node-id="163:1438">
            <div className="main-card__media">
              <img src={`${M}/7dc16bb717fcd4511b4feaa4589cc56f4bcb7740.png`} alt="" />
            </div>
          </article>
        </div>

        <p className="main-section-label main-section-label--personal" data-node-id="54:139">
          Personal Projects- UX/UI
        </p>

        <div className="main-personal-row-1" aria-label="퍼스널 프로젝트 1행">
          <article className="main-card main-card--c1 main-p1" data-node-id="71:329">
            <div className="main-card__media" data-node-id="163:1410">
              <img src={`${M}/d006ed60e5acf9a69cf8f68c6b90027935708f54.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c2 main-p2" data-node-id="163:1422">
            <div className="main-card__media" data-node-id="163:1422">
              <img src={`${M}/f81bd83f813d1061925d9e9a950f40a0f1e6bdad.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c3 main-p3" data-node-id="71:337">
            <div className="main-p3__art" data-node-id="71:342">
              <img src={`${M}/c8ace78a7a1dd274e6f300db2a8f114dbc84ef13.png`} alt="" />
            </div>
            <div className="main-p3__mark" data-node-id="71:344">
              <img src={`${M}/83b43b513cd9046edca765a95d6fbbace539ec18.png`} alt="" />
            </div>
          </article>
        </div>

        <div className="main-personal-row-2" aria-label="퍼스널 프로젝트 2행">
          <article className="main-card main-card--c1 main-mangwoo-hands" data-node-id="71:354">
            <div className="main-mangwoo-hands__bg" data-node-id="71:206">
              <img src={`${M}/cb311c6c9fdc747d63031f5466ac4fe2a3e9c71b.png`} alt="" />
            </div>
            <div className="main-mangwoo-hands__figure" data-node-id="71:187">
              <img src={`${M}/5df1a5f3fee48939af98945fc323e9774c498deb.png`} alt="" />
            </div>
            <div className="main-mangwoo-hands__fade" aria-hidden data-node-id="71:189" />
          </article>

          <article className="main-card main-card--c2 main-mangwoo-poster" data-node-id="161:1385">
            <div className="main-mangwoo-poster__image" data-node-id="161:1383">
              <img src={`${M}/dca4d42d492f9972d7c8ab937cde4688b4f9e2cc.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c3 main-p5" data-node-id="71:351">
            <div className="main-card__media">
              <img src={`${M}/325e300f4587ab26a5f0260fe6492d5b5d54a614.png`} alt="" />
            </div>
            <div className="main-p5__tint" aria-hidden data-node-id="63:632" />
            <div className="main-p5__svg" data-node-id="161:1387">
              <img className="main-p5__overlay" src={`${M}/887c5f9f45c29641aee6ada10c48ad5763f2b807.png`} alt="" />
            </div>
          </article>
        </div>

        <div className="main-footer">
          <div className="main-contact" data-node-id="163:1415">
            <p className="main-contact__text" data-node-id="54:443">CONTACT ME →→→</p>
          </div>
        </div>
      </main>
    </div>
  );
}
