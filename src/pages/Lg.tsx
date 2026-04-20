import { useEffect, useRef } from 'react';
import { ProjectPageHeader } from '../components/ProjectPageHeader';
import { LgFigmaSlide } from '../components/LgFigmaSlide';
import { useProjectScrollReveal } from '../hooks/useProjectScrollReveal';
import { designScaleForRoot } from '../lib/designRootWidth';
import '../styles/lg-tailwind.css';
import '../styles/lg.css';

const DESIGN_W = 1920;

/** LG IAC — Figma 241:888 */
export function Lg() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useProjectScrollReveal(frameRef);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame) return;
    const update = () => {
      frame.style.setProperty('--lg-scale', String(designScaleForRoot(root, DESIGN_W)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="lg-scale-root" ref={rootRef}>
      <div className="lg-frame" ref={frameRef} data-name="LG IAC">
        <div className="lg-figma-slide-wrap">
          <LgFigmaSlide />
        </div>
        <ProjectPageHeader
          embedded
          variant="light"
          breadcrumb="Projects - IAC - UX/UI Design, System"
          className="lg-header"
        />
      </div>
    </div>
  );
}
