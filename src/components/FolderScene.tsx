import { useMemo, useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { motion, animate, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { interpolate } from 'flubber';

const BACK_CLOSED =
  'M612 765.207C612 776.253 603.046 785.207 592 785.207H20C8.9543 785.207 0 776.253 0 765.207V25.207C0 14.1613 8.95431 5.20703 20 5.20703H592C603.046 5.20703 612 14.1613 612 25.207V765.207Z';
const BACK_OPEN =
  'M612 780.838C612 791.884 603.046 800.838 592 800.838H20C8.9543 800.838 0 791.884 0 780.838V40.8379C0 29.7922 8.95431 20.8379 20 20.8379H592C603.046 20.8379 612 29.7922 612 40.8379V780.838Z';

const FRONT_CLOSED =
  'M612 765.559C612 776.604 603.046 785.559 592 785.559H20C8.9543 785.559 0 776.604 0 765.559V25.5586C0 14.5129 8.9543 5.55859 20 5.55859H477.828C488.874 5.55859 497.828 14.5129 497.828 25.5586V73.5586C497.828 84.6043 506.782 93.5586 517.828 93.5586H592C603.046 93.5586 612 102.513 612 113.559V765.559Z';
const FRONT_OPEN =
  'M527 780.838C527 791.884 518.046 800.838 507 800.838H20C8.95429 800.838 0 791.884 0 780.838V40.8379C0 29.7922 8.95431 20.8379 20 20.8379H408.686C419.731 20.8379 428.686 29.7922 428.686 40.8379V88.8379C428.686 99.8836 437.64 108.838 448.686 108.838H507C518.046 108.838 527 117.792 527 128.838V780.838Z';

const PURPLE = {
  closed: { x: 222.742, y: 0, width: 347.851, height: 714.586, rotate: 8.43 },
  open: { x: 331.436, y: 2.38867, width: 348.587, height: 780, rotate: 20.0087 },
};

const WHITE = {
  closed: { x: 128.879, y: 14.1504, width: 383.998, height: 712.792, rotate: -0.38 },
  open: { x: 236.334, y: 0, width: 384, height: 780, rotate: 10.3908 },
};

const spring = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.85 };

function safeMorph(from: string, to: string) {
  try {
    return interpolate(from, to, { maxSegmentLength: 3 });
  } catch {
    return (t: number) => (t < 0.999 ? from : to);
  }
}

export function FolderScene() {
  const [open, setOpen] = useState(false);
  const progress = useMotionValue(0);
  const backRef = useRef<SVGPathElement>(null);
  const frontRef = useRef<SVGPathElement>(null);

  const morphBack = useMemo(() => safeMorph(BACK_CLOSED, BACK_OPEN), []);
  const morphFront = useMemo(() => safeMorph(FRONT_CLOSED, FRONT_OPEN), []);

  useLayoutEffect(() => {
    const t = progress.get();
    if (backRef.current) backRef.current.setAttribute('d', morphBack(t));
    if (frontRef.current) frontRef.current.setAttribute('d', morphFront(t));
  }, [morphBack, morphFront, progress]);

  useEffect(() => {
    const c = animate(progress, open ? 1 : 0, {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => c.stop();
  }, [open, progress]);

  useMotionValueEvent(progress, 'change', (t) => {
    const dB = morphBack(t);
    const dF = morphFront(t);
    if (backRef.current) backRef.current.setAttribute('d', dB);
    if (frontRef.current) frontRef.current.setAttribute('d', dF);
  });

  const onEnter = useCallback(() => setOpen(true), []);
  const onLeave = useCallback(() => setOpen(false), []);

  const helloSpring = { type: 'spring' as const, stiffness: 400, damping: 22, mass: 0.72 };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', lineHeight: 0, cursor: 'pointer' }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={
          open
            ? { opacity: 1, x: 0, rotate: -6, scale: 1 }
            : { opacity: 0, x: 18, rotate: 0, scale: 0.88 }
        }
        transition={helloSpring}
        style={{
          position: 'absolute',
          right: '100%',
          marginRight: 16,
          top: 'calc(50% - 0.55em)',
          fontFamily: "'FFFAcidGrotesk', 'FFF Acid Grotesk Variable TRIAL', system-ui, sans-serif",
          fontSize: 34,
          lineHeight: 1,
          fontWeight: 500,
          color: '#FFFFFF',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontVariationSettings: "'wght' 190, 'ital' 30",
          fontSynthesis: 'none',
          WebkitFontSmoothing: 'antialiased',
          textShadow: '0 2px 18px rgba(236, 92, 240, 0.25)',
          transformOrigin: '100% 50%',
        }}
      >
        Hello!
      </motion.span>

      <svg viewBox="0 0 660 856" width={659} height={855} style={{ display: 'block', overflow: 'visible' }} aria-hidden>
        <title>Portfolio folder</title>
        <path ref={backRef} fill="#A43FA7" d={BACK_CLOSED} />

        <motion.rect
          rx={10}
          fill="#EFEDED"
          initial={false}
          animate={open ? PURPLE.open : PURPLE.closed}
          transition={spring}
        />

        <motion.rect
          rx={10}
          fill="white"
          initial={false}
          animate={open ? WHITE.open : WHITE.closed}
          transition={{ ...spring, delay: open ? 0.02 : 0 }}
        />

        <path ref={frontRef} fill="#EC5CF0" d={FRONT_CLOSED} />
      </svg>
    </div>
  );
}
