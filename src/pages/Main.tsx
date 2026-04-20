import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot } from '../lib/designRootWidth';
import { mainAsset } from '../lib/mainAssets';
import '../styles/main.css';

const DESIGN_W = 1920;

/** IAC: hyundai → lg → sori · Personal: loth → sooin → seoculus → mealtune → canon (위→아래) */
const CARDS = [
  { top: 1561, file: 'Frame 360.png', to: '/projects/hyundai', label: 'Hyundai IAC', panel: 'white' as const },
  { top: 2113, file: 'Frame 361.png', to: '/projects/lg', label: 'LG IAC', panel: 'white' as const },
  { top: 2665, file: 'Frame 362.png', to: '/projects/sori', label: 'Sori IAC', panel: 'white' as const },
  { top: 3540, file: 'Frame 363.png', to: '/projects/loth', label: 'Loth', panel: 'none' as const },
  { top: 4081, file: 'Frame 364.png', to: '/projects/sooin', label: 'Sooin', panel: 'none' as const },
  { top: 4622, file: 'Frame 365.png', to: '/projects/seoculus', label: 'Seoculus', panel: 'gray' as const },
  { top: 5163, file: 'Frame 366.png', to: '/projects/mealtune', label: 'MealTune', panel: 'gray' as const },
  { top: 5704, file: 'Frame 368.png', to: '/projects/canon', label: 'Canon', panel: 'gray' as const },
] as const;

export function Main() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      const scale = designScaleForRoot(root, DESIGN_W);
      root.style.setProperty('--main-v2-scale', String(scale));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="main-v2-root" ref={rootRef}>
      <a className="main-v2-mail main-v2-mail--fixed" href="mailto:taeeunclarakim@gmail.com" data-node-id="211:1399">
        taeeunclarakim@gmail.com
      </a>
      <span className="main-v2-year main-v2-year--fixed" data-node-id="211:1424">
        @2026
      </span>

      <div className="main-v2-frame">
        <h1 className="main-v2-hero-name main-v2-hero-name--fixed" data-node-id="211:1441">
          Tae Kim(Clara)
        </h1>

        <div className="main-v2-intro main-v2-hero-blend" data-node-id="211:1377">
          <p>Designing the Interaction Between Humans and Systems</p>
          <p>Based in Seoul, South Korea</p>
          <p>Currently in Baltimore, Maryland</p>
          <p>Looking for an Opportunity</p>
        </div>

        <a className="main-v2-cv" href="/pages/cv.html" data-node-id="211:1378">
          → CV
        </a>

        <p className="main-v2-skills main-v2-hero-blend" data-node-id="211:1379">
          Website, Branding Identity, Visual Coding, 3D Modeling
        </p>

        <div className="main-v2-frame-inner" ref={frameRef} data-node-id="211:1346">
          <p className="main-v2-section-label" data-node-id="211:1380">
            IAC Projects&quot;3
          </p>

          {CARDS.slice(0, 3).map((c) => (
            <ProjectCard key={c.file} {...c} variant="iac" />
          ))}

          <p className="main-v2-section-label main-v2-section-label--personal" data-node-id="211:1672">
            Personal Projects&quot;5
          </p>

          {CARDS.slice(3).map((c) => (
            <ProjectCard key={c.file} {...c} variant="personal" />
          ))}

          <footer className="main-v2-contact" data-node-id="211:1374">
            <a className="main-v2-contact__link" href="mailto:taeeunclarakim@gmail.com" data-node-id="211:1375">
              CONTACT ME →→→
            </a>
            <div className="main-v2-contact__line" aria-hidden data-node-id="211:1376" />
          </footer>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  top,
  file,
  label,
  to,
  variant,
  panel,
}: {
  top: number;
  file: string;
  label: string;
  to: string;
  variant: 'iac' | 'personal';
  panel: 'white' | 'gray' | 'none';
}) {
  const panelClass =
    panel === 'white' ? ' main-v2-card--panel-white' : panel === 'gray' ? ' main-v2-card--panel-gray' : '';

  const article = (
    <article
      className={`main-v2-card main-v2-card--${variant}${panelClass}`}
      aria-label={label}
    >
      <div className="main-v2-card__media">
        <img src={mainAsset(file)} alt="" draggable={false} />
      </div>
    </article>
  );

  const style = { top: `${top}px` } as const;

  return (
    <Link className="main-v2-card-slot" style={style} to={to} data-project-reveal>
      {article}
    </Link>
  );
}
