import { LandingHeader } from '../components/LandingHeader';
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

      <main id="main" className="main-stage">
        {/* Figma 43:286 — mix-blend-mode: difference. 히어로와 같은 root stacking context에서 합성 */}
        <div className="main-intro" data-node-id="43:286">
          <p className="main-intro__line">Designing the medium of Human and Computer</p>
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
          <article className="main-card main-card--c1 main-iac-1">
            <div className="main-card__media">
              <img src={`${M}/42f78a027660eeb469d3ae09d39672883861ae52.png`} alt="" />
            </div>
            <img
              className="main-card__badge"
              src={`${M}/9e2882af7d40dc0fdffa87cccfd1e666f905981e.svg`}
              alt=""
            />
          </article>

          <article className="main-card main-card--c2 main-iac-2">
            <div className="main-card__media">
              <img src={`${M}/49fa54d9f1be7689ba156a3cdaa772e9d549ec75.png`} alt="" />
            </div>
            <img className="main-card__badge" src={`${M}/57d0f10cd8540074fc87ad7858ef6a84abef5535.svg`} alt="" />
          </article>

          <article className="main-card main-card--c3 main-iac-3">
            <div className="main-iac-phone">
              <img src={`${M}/590e83c7db7e98749b2a9a1badbf8fe6312657f3.png`} alt="" />
            </div>
            <img
              className="main-card__badge"
              src={`${M}/793c168006b2e9b7952c9dbd4309b92c5b96ec4c.svg`}
              alt=""
            />
          </article>
        </div>

        <p className="main-section-label main-section-label--personal">Personal Projects” </p>

        <div className="main-personal-row-1" aria-label="퍼스널 프로젝트 1행">
          <article className="main-card main-card--c1 main-p1">
            <div className="main-card__media">
              <img src={`${M}/ee0e77a7e8fbd24d05053eefedfd805e7774ffed.png`} alt="" />
            </div>
            <div className="main-p1__gradient" aria-hidden />
            <img className="main-p1__logo" src={`${M}/799f933f2bf219e23e3e1fff90751c9a0bc309b0.svg`} alt="" />
          </article>

          <article className="main-card main-card--c2 main-p2">
            <div className="main-card__media">
              <img src={`${M}/ae70dcbfdb2260776b7818d3310acbedaec8a645.png`} alt="" />
            </div>
            <div className="main-p2__blur-a">
              <img src={`${M}/6b5a343e6d9cbef8b93be73ef9ea1a3028dda6d5.png`} alt="" />
            </div>
            <div className="main-p2__blur-b">
              <img src={`${M}/d75b52c2d3b1bd81cfeafa017353646d68472acc.png`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c3 main-p3">
            <div className="main-p3__mark">
              <img src={`${M}/83b43b513cd9046edca765a95d6fbbace539ec18.png`} alt="" />
            </div>
            <div className="main-p3__art">
              <img src={`${M}/c8ace78a7a1dd274e6f300db2a8f114dbc84ef13.png`} alt="" />
            </div>
          </article>
        </div>

        <div className="main-personal-row-2" aria-label="퍼스널 프로젝트 2행">
          <article className="main-card main-card--c1 main-p4">
            <div className="main-p4__layer">
              <div className="main-p4__layer-inner">
                <img src={`${M}/7ee2aa24f63b9d6a1628dc070d5ff5fb4e7d3f34.png`} alt="" />
              </div>
            </div>
            <div className="main-p4__row">
              <img src={`${M}/9da5b714134a02f74997cfaa4485fd37b959457e.svg`} alt="" />
              <img src={`${M}/5e61c13915b9c5478876afd173a4e9f4a2785d11.svg`} alt="" />
              <img src={`${M}/ee85fef1216a9f6506b8f174cb4982eee0d44959.svg`} alt="" />
              <img src={`${M}/e10cddd623860f9f5631bf123f9a6970a297fcdb.svg`} alt="" />
              <img src={`${M}/8eed7547994c9300ba955a214d15efcfbce2eacd.svg`} alt="" />
            </div>
            <img className="main-p4__corner main-p4__corner--tl" src={`${M}/799aa88b776a24060a7047ffe5f29a0eeb4a1887.svg`} alt="" />
            <img className="main-p4__corner main-p4__corner--bl" src={`${M}/ff43e23765324e3a42e40ae9f6ba0c1aec57443d.svg`} alt="" />
            <img className="main-p4__corner main-p4__corner--tr" src={`${M}/126d5b1f48ed143813e7ce6ac0c7398ea07d394e.svg`} alt="" />
            <img className="main-p4__corner main-p4__corner--br" src={`${M}/5b4e7e7d81515a0ded63c461f81e7ed2aea7acc0.svg`} alt="" />
          </article>

          <article className="main-card main-card--c2 main-p5">
            <div className="main-card__media">
              <img src={`${M}/325e300f4587ab26a5f0260fe6492d5b5d54a614.png`} alt="" />
            </div>
            <div className="main-p5__tint" aria-hidden />
            <div className="main-p5__svg">
              <img className="main-p5__base" src={`${M}/80deda557c18b4149b4c00daef47119ccf108419.svg`} alt="" />
              <img className="main-p5__g8" src={`${M}/48be68eeaf4d240555236e1888a806c69412b111.svg`} alt="" />
              <img className="main-p5__g9" src={`${M}/dfd254a074608013e46db0d8d8c5a1080657609b.svg`} alt="" />
              <img className="main-p5__g10" src={`${M}/f9bdf5b72c5669116e67d689ed8bee3c5fdcce74.svg`} alt="" />
            </div>
          </article>

          <article className="main-card main-card--c3 main-p6">
            <div className="main-p6__bg">
              <img src={`${M}/cb311c6c9fdc747d63031f5466ac4fe2a3e9c71b.png`} alt="" />
            </div>
            <div className="main-p6__figure">
              <img src={`${M}/5df1a5f3fee48939af98945fc323e9774c498deb.png`} alt="" />
            </div>
            <div className="main-p6__fade" aria-hidden />
          </article>
        </div>

        <div className="main-contact">
          <p className="main-contact__text">CONTACT ME →→→</p>
        </div>

        <div className="main-line" aria-hidden>
          <img src={`${M}/9e3504827338628d22390531991811617b13533e.svg`} alt="" />
        </div>
      </main>
    </div>
  );
}
