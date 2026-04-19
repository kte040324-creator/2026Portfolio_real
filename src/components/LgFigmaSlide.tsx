import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { lgAsset } from '../lib/lgAssets';
import ShinyText from './ShinyText';

/** Figma 244:40 — 244:39 프레임 내부 Vector */
const imgVector24440 = lgAsset('img/figma/b0eede578d913272c99d225d01e7976f12f20670.svg');
const imgImage6346085 = lgAsset('img/figma/747df2f32d8a1a5bd3cddb46b81bce59900cdc24.png');
const imgImage6346086 = lgAsset('img/figma/46dc5b26cfcf7b67e6d6a998f407f8a1fa5eacf1.png');
const imgImage6346087 = lgAsset('img/figma/59244c566ee2959a1a197a79d991e0c5eaf0a5b8.png');
const imgImage6346090 = lgAsset('img/figma/4a1af670b3239d116b60a904fbea1cb05450a371.png');
const imgA2 = lgAsset('img/figma/aa9e05fc95af9497cefb0b1f42174b468a76ac7b.png');
const imgA1 = lgAsset('img/figma/c0161f2e9470cf1fc42570751f25d5af8a37eeb9.png');
const imgA3 = lgAsset('img/figma/ceb193e5ef1bb7bbf1c405697e7f664ef7081fc3.png');
const imgTae = lgAsset('img/figma/1da89a2c3937ea7f78bbbd5df082d0b4dd5c8a52.png');
const imgIPhoneBlackFlatten = lgAsset('img/iPhone 15 Pro - Black Flatten.png');
const imgIPhoneBlackFlatten1 = lgAsset('img/iPhone 15 Pro - Black Flatten-1.png');
const imgIPhoneBlackFlatten2 = lgAsset('img/iPhone 15 Pro - Black Flatten-2.png');
/** Figma 246:64 — Ellipse 2850 1 (header gradient, raster), PNG intrinsic px */
const ELLIPSE_2850_INTRINSIC_W = 1806;
const ELLIPSE_2850_INTRINSIC_H = 1673;
/** 이미지 사각형 내부 기하 중심 (회전 피벗) */
const ellipse2850TransformOrigin: CSSProperties = {
  transformOrigin: `${ELLIPSE_2850_INTRINSIC_W / 2}px ${ELLIPSE_2850_INTRINSIC_H / 2}px`,
};
const imgEllipse28501 = lgAsset('img/figma/a681e6a942222a147503b227d0588079e428cda8.png');
/** Figma 246:61 — Ellipse 2767 1 / Ellipse 2847 1 (raster) */
const imgEllipse27671 = lgAsset('img/figma/06f02ef3fd75ac70cfbcba182239c9b715b80b2f.png');
const imgEllipse28471 = lgAsset('img/figma/ef1fe19e87bd55776ccb432aaf11d19d2b017c71.png');
const imgEllipse2846 = lgAsset('img/figma/f1d0cc113a89f3bbf4c062a42937bbe2447a232d.svg');
const imgEllipse2694 = lgAsset('img/figma/c530802998f1d594a36b54e8cbf72a7ae7ee6d0e.svg');
const imgLine70 = lgAsset('img/figma/05d914c0ed7c104d9d8ddfd7d357634e823cb281.svg');
const imgGroup = lgAsset('img/figma/36b17bd8dd9ba74ee847cb6f102bb41ec1c0cdc6.svg');
const imgGroup1 = lgAsset('img/figma/f56db8b94469d62d3afc2bf2b04896437abe68d5.svg');
const imgGroup2 = lgAsset('img/figma/5e8c720cabefdad549fe7e2b7536cd22b5854b34.svg');
const imgGroup3 = lgAsset('img/figma/ceb1e0b7bcdd10b6b4a2ec72b05bb8d8f175f88d.svg');
const imgGroup4 = lgAsset('img/figma/0b322e619bae3700984f874e0035d8ad9401f6f4.svg');
const imgGroup5 = lgAsset('img/figma/15f17a28eb591a51e5dc861010c86827004c4551.svg');
const imgGroup6 = lgAsset('img/figma/40800a73de2047496c8a9980af27d11820359754.svg');
const imgGroup7 = lgAsset('img/figma/892edf5dd46441a88e0e557440265e71997f6df0.svg');
const imgGroup8 = lgAsset('img/figma/cd209d85f5ecc9bf893f950c22f90c4e0631d9af.svg');
const imgGroup9 = lgAsset('img/figma/a79ab942c202de98e6de05a5fccb0c0d45333e86.svg');
const imgGroup10 = lgAsset('img/figma/c97e67c9b85aa4803ff3541c07e5ae0beb31265d.svg');
const imgGroup11 = lgAsset('img/figma/2fe1f9526c27ed1e41fd94d3296ea1181e5c60d9.svg');
const imgGroup12 = lgAsset('img/figma/a04690b3947067da567eecfc8923756d17b59c80.svg');
const imgGroup13 = lgAsset('img/figma/794d932ae6ac882e64281f6f05050b4646eb26d6.svg');
const imgGroup14 = lgAsset('img/figma/4f3b2740c2ee8242ad57d68d9e18c04b7b413f60.svg');
const imgGroup15 = lgAsset('img/figma/27e8dc051065995c95a67a5dab0400e3e81525a6.svg');
const imgLayer1 = lgAsset('img/figma/9951ddb4ddfdf535f686b6545938ea3dabf79d09.svg');
const imgEllipse2768 = lgAsset('img/figma/e24a83bb9c48ae4decef90d53ae3b03bc528e19d.svg');
const imgLine92 = lgAsset('img/figma/43e4f81070d0546daad9415e06d267655ea35699.svg');
const imgEllipse2822 = lgAsset('img/figma/791316051730b753ba71e3696e0ebfa34befef5c.svg');
const imgEllipse2848 = lgAsset('img/figma/a9530ed9260d6b50346d5c62d3e673f0b3af15d8.svg');
const imgEllipse2849 = lgAsset('img/figma/6e95f67d097fe19610fb2cf128861889c2b46fd7.svg');
const imgEllipse2828 = lgAsset('img/figma/b3db28147c95b5ee0ba845080994085e7a25f98b.svg');
const imgEllipse2834 = lgAsset('img/figma/3124fdf49ad04a06f723348122d61fb5f67ba402.svg');
const imgEllipse2837 = lgAsset('img/figma/95641eaebdfdad21238d103335ad3450a8e2a7e2.svg');
const imgEllipse2838 = lgAsset('img/figma/b64e81f8f76a04a9d4add6db13daafa740a58a9c.svg');
const imgEllipse2844 = lgAsset('img/figma/603750de7aff6f25dc17f0f668e16b9906628939.svg');
const imgEllipse2845 = lgAsset('img/figma/237cfea1ffeddadf8efd27d0202c39a5cff43a30.svg');
const imgEllipse2850 = lgAsset('img/figma/f568eac75d5889368c529d2e3814807f767f2f14.svg');
const imgEllipse2842 = lgAsset('img/figma/d2967f5a1ee3cbf10bccb9e006bfbc23337270c0.svg');
const imgEllipse2851 = lgAsset('img/figma/bf843b2db9b73d5a86c7ae74947cdb9543679dc4.svg');
const imgEllipse2841 = lgAsset('img/figma/4bc0a3b2151ba2b1ce33ed56a84b0d5924683e69.svg');
const imgLine86 = lgAsset('img/figma/7ded40a5992f68209ad900482791ccf7a120686d.svg');
const imgEllipse2833 = lgAsset('img/figma/2f9537c413b4492f7f54090a93674a83c247a092.svg');
const imgEllipse2829 = lgAsset('img/figma/e612e5bfa5332269441f19d0785f951cb87fb4e7.svg');
const imgEllipse2832 = lgAsset('img/figma/c94bb43a6a05feca9b796f97ed5bde52783de478.svg');
const imgEllipse2821 = lgAsset('img/figma/64cad5746b1852d10b3beb4abf818bcae991a7a5.svg');
const imgEllipse2824 = lgAsset('img/figma/733008c8b664648fb2d3317d4433472b44af314b.svg');
const imgEllipse2835 = lgAsset('img/figma/64bfb8bcd96116201cb61236a8a8343cc36fc9ff.svg');
const imgEllipse2836 = lgAsset('img/figma/e1270434b501b4a4fc3e116385006b20584c5440.svg');
const imgEllipse2826 = lgAsset('img/figma/999f644c0cc197507d541dc2f8d7da594c655ff8.svg');
const imgLine87 = lgAsset('img/figma/c742a16a9f7304f343ca253ca28a5fa2d311a003.svg');
const imgLine90 = lgAsset('img/figma/5bec27ba80991d8c2cc74f7f09cc1c302392efd6.svg');
const imgEllipse2840 = lgAsset('img/Ellipse 2840.png');
const imgPolygon4 = lgAsset('img/figma/a78ccc7b972c5a64c5b9edb375520644dc1da23a.svg');
const imgPolygon5 = lgAsset('img/figma/d038092f135b90ea37647641c4957b554a840627.svg');
const imgVector22782 = lgAsset('img/figma/e96f41166f17650f8dc193babfaa48812803aca8.svg');
const imgGroup1410167323 = lgAsset('img/figma/67b3c831bb8b3f7825862cc319ca360e219fc9fe.svg');
const imgGroup1410167324 = lgAsset('img/figma/72d3b040f56149b3ce19af027fdd2a3e02ada6fc.svg');
const imgLine95 = lgAsset('img/figma/4a517030716b510e2ee5402d565473d63f4be04e.svg');
const imgIcon1 = lgAsset('img/figma/e230e6a8db63c1fdedd029c0c7bf1c9e33a1fa34.svg');
const imgGroup1410167325 = lgAsset('img/figma/0b5b29069e9b4a5e757173887a4b27b6cd046c8b.svg');
const imgGroup1410167326 = lgAsset('img/figma/95ebe94333b7e99687131a4dc5664817e9279351.svg');
const imgVector22783 = lgAsset('img/figma/1c9f8c408550ca50f4c8381089e244f57b3ed3a7.svg');
const imgLine94 = lgAsset('img/figma/fd379872f4216dc9baaae57a958e3b49bbf3a583.svg');
const imgLine13 = lgAsset('img/figma/1942c3195e5f9b9dde667147612f62b35f38264c.svg');
const imgLine16 = lgAsset('img/figma/223fd9d820759c7b64476105d2c8a927e1ed869a.svg');
const imgEllipse2823 = lgAsset('img/figma/41cb7d8b14eb0cbfed5ed4d834e840a0d9506805.svg');
const imgPolygon7 = lgAsset('img/figma/6b59748df89bf7be594136a22393cd0b97d3a0be.svg');
const imgUnion = lgAsset('img/figma/c0d96aadf27e9adf771e04cab4cce7e3d9a07577.svg');
const imgRectangle34626605 = lgAsset('img/figma/bf2981711e031a1dfb847b5fe8a7abee556936c2.svg');
const imgRectangle34626606 = lgAsset('img/figma/b3b08a9e7389161cbf9c0c99bbcbef4301ff9962.svg');
const imgRectangle34626607 = lgAsset('img/figma/b2b11df9195d99ed5e304d2875f48961e80b5ec9.svg');
const imgRectangle34626608 = lgAsset('img/figma/fbe1bbd07b3bed1ca0b288a64f250cf48bfd8c80.svg');
const imgUnion1 = lgAsset('img/figma/d649d03eea7ae13fe2bd87a38b9543ec37fe4b1d.svg');
const imgLine97 = lgAsset('img/figma/5c48cada6c626d4e79c8011f234ccbf21d568c51.svg');
const imgGroup1410167674 = lgAsset('img/figma/5d7a6ce71e03985c96bef7605f673c349a0ed529.svg');
const imgFuronBlack24546 = lgAsset('img/figma/a6e24c516957cbf4da3425dab7cd18114c1cebc9.png');
const imgFuronBlack = lgAsset('img/furon_black.png');
const imgGroup1410167635 = lgAsset('img/figma/398855f666d8f3ef85d95cab726560a50461c444.png');
const imgDaajung245 = lgAsset('img/figma/63cdee193f5cb3b6877ce1cfacba89e94226ca7e.png');
const imgEllipse2843 = lgAsset('img/figma/a379344fa0f6729c5083e023a8c4c99742bdbb05.svg');
const imgFuronOrche1 = lgAsset('img/figma/fc849d8fffe72039b0845c7fb843309899054f25.png');

/** Interactive Exhibition 바닥도 — 라벨 박스 기준 중심 (Media wall → QR → TV1 → SBM1 → TV2 → SBM2) */
const INTERACTIVE_EXHIBITION_ELLIPSE_CENTERS = [
  { x: 1080 + 215 / 2, y: 9558 + 26 / 2 }, // 241:1195 Media Wall
  { x: 981 + 89.945 / 2, y: 9562 + 71.224 / 2 }, // 241:1196 QR Code
  { x: 848 + 26 / 2, y: 9558 + 158 / 2 }, // 241:1197 TV 1
  { x: 685 + 102.404 / 2, y: 9730 + 79.317 / 2 }, // 241:1198 SBM 1
  { x: 662 + 26 / 2, y: 9875 + 280 / 2 }, // 241:1199 TV 2
  { x: 692 + 95.674 / 2, y: 10185 + 89.846 / 2 }, // 241:1200 SBM 2
] as const;

const INTERACTIVE_EXHIBITION_DURATION_SEC = 6;

type InteractiveExhibitionCycleValue = {
  activeSegment: number;
  /** 비트 i = 1이면 구간 i 미디어는 한 번이라도 지나간 뒤 계속 표시 */
  revealedMask: number;
  reduceMotion: boolean;
};

const InteractiveExhibitionCycleContext = createContext<InteractiveExhibitionCycleValue | null>(null);

function useInteractiveExhibitionEllipse(reduceMotion: boolean, cycleActive: boolean) {
  const points = INTERACTIVE_EXHIBITION_ELLIPSE_CENTERS;
  const n = points.length;
  const duration = INTERACTIVE_EXHIBITION_DURATION_SEC;
  /** p0→p1→…→p5 한 번만 (루프 없음), 마지막 정점 인덱스 */
  const lastIdx = n - 1;
  const numLegs = lastIdx;

  const x = useMotionValue(points[0].x);
  const y = useMotionValue(points[0].y);
  const leftPx = useTransform(x, (v) => `${v}px`);
  const topPx = useTransform(y, (v) => `${v}px`);

  const [activeSegment, setActiveSegment] = useState(0);
  const [revealedMask, setRevealedMask] = useState(0);
  const prevSegRef = useRef(-1);
  const startRef = useRef(performance.now());
  const cycleActiveRef = useRef(cycleActive);
  cycleActiveRef.current = cycleActive;

  const startedOnceRef = useRef(false);
  useEffect(() => {
    if (reduceMotion || !cycleActive || startedOnceRef.current) return;
    startedOnceRef.current = true;
    startRef.current = performance.now();
    prevSegRef.current = -1;
  }, [cycleActive, reduceMotion]);

  useAnimationFrame(() => {
    if (reduceMotion) {
      x.set(points[0].x);
      y.set(points[0].y);
      if (prevSegRef.current !== 0) {
        prevSegRef.current = 0;
        setActiveSegment(0);
        setRevealedMask((1 << n) - 1);
      }
      return;
    }

    if (!cycleActiveRef.current) {
      x.set(points[0].x);
      y.set(points[0].y);
      return;
    }

    const elapsed = (performance.now() - startRef.current) / 1000;
    const uTotal = Math.min(1, Math.max(0, elapsed / duration));

    if (uTotal >= 1) {
      x.set(points[lastIdx].x);
      y.set(points[lastIdx].y);
      if (prevSegRef.current !== lastIdx) {
        prevSegRef.current = lastIdx;
        setActiveSegment(lastIdx);
        setRevealedMask((m) => m | (1 << lastIdx));
      }
      return;
    }

    const posAlong = uTotal * numLegs;
    const leg = Math.min(numLegs - 1, Math.floor(posAlong));
    const local = posAlong - leg;
    const p0 = points[leg];
    const p1 = points[leg + 1];
    x.set(p0.x + (p1.x - p0.x) * local);
    y.set(p0.y + (p1.y - p0.y) * local);

    const seg = Math.min(lastIdx - 1, Math.floor(posAlong));
    if (seg !== prevSegRef.current) {
      prevSegRef.current = seg;
      setActiveSegment(seg);
      setRevealedMask((m) => m | (1 << seg));
    }
  });

  return { activeSegment, revealedMask, leftPx, topPx };
}

/** 바닥도 구간(0=Media Wall … 5=SBM2)에 맞춰 기존 위치 미디어 표시 */
function ExhibitionFloorSlot({
  segment,
  className,
  children,
  ...rest
}: {
  segment: number;
  className: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>) {
  const ctx = useContext(InteractiveExhibitionCycleContext);
  const reduceMotion = ctx?.reduceMotion ?? true;
  const revealedMask = ctx?.revealedMask ?? 0;
  const revealed = ((revealedMask >> segment) & 1) === 1;
  const on = reduceMotion || revealed;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('video').forEach((el) => {
      const v = el as HTMLVideoElement;
      if (on) void v.play().catch(() => {});
      else v.pause();
    });
  }, [on]);

  return (
    <div
      ref={rootRef}
      className={`${className} transition-opacity duration-500 ease-out`}
      style={{ opacity: on ? 1 : 0 }}
      {...rest}
    >
      {children}
    </div>
  );
}

/** 여러 구간 중 하나라도 reveal 되면 표시 (연결선 등) */
function ExhibitionFloorSlotAny({
  anyOf,
  className,
  children,
  style,
  ...rest
}: {
  anyOf: readonly number[];
  className: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children'>) {
  const ctx = useContext(InteractiveExhibitionCycleContext);
  const reduceMotion = ctx?.reduceMotion ?? true;
  const revealedMask = ctx?.revealedMask ?? 0;
  const anyMask = anyOf.reduce((acc, s) => acc | (1 << s), 0);
  const revealed = reduceMotion || (revealedMask & anyMask) !== 0;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('video').forEach((el) => {
      const v = el as HTMLVideoElement;
      if (revealed) void v.play().catch(() => {});
      else v.pause();
    });
  }, [revealed]);

  return (
    <div
      ref={rootRef}
      className={`${className} transition-opacity duration-500 ease-out`}
      style={{ ...style, opacity: revealed ? 1 : 0 }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function LgFigmaSlide() {
  const reduceMotion = useReducedMotion();
  const exhibitionZoneRef = useRef<HTMLDivElement>(null);
  const [exhibitionStarted, setExhibitionStarted] = useState(!!reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setExhibitionStarted(true);
      return;
    }
    const el = exhibitionZoneRef.current;
    if (!el) return;
    const sync = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const inset = vh * 0.06;
      if (r.bottom > inset && r.top < vh - inset) setExhibitionStarted(true);
    };
    sync();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setExhibitionStarted(true);
      },
      { root: null, threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [reduceMotion]);

  const exhibition = useInteractiveExhibitionEllipse(!!reduceMotion, exhibitionStarted);
  const exhibitionCycle = useMemo<InteractiveExhibitionCycleValue>(
    () => ({
      activeSegment: exhibition.activeSegment,
      revealedMask: exhibition.revealedMask,
      reduceMotion: !!reduceMotion,
    }),
    [exhibition.activeSegment, exhibition.revealedMask, reduceMotion],
  );

  return (
    <InteractiveExhibitionCycleContext.Provider value={exhibitionCycle}>
    <div className="bg-gradient-to-b from-[#f3f3f3] relative size-full to-[#e9feff] to-[140.49%]" data-node-id="241:888" data-name="Slide 16:9 - 2">
      <div
        className="pointer-events-none absolute left-[57px] top-[-711px] h-[1673px] w-[1806px]"
        aria-hidden
        data-node-id="246:64"
        data-name="Ellipse 2850 1"
      >
        <img
          alt=""
          className="lg-img-ellipse-2850-rotate pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          src={imgEllipse28501}
          style={ellipse2850TransformOrigin}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        data-node-id="241:889"
        style={
          {
            opacity: 0.59,
            background:
              'linear-gradient(172deg, rgba(255, 249, 238, 0.49) 9.92%, rgba(248, 156, 248, 0.49) 67.7%, rgba(99, 117, 89, 0.49) 109.37%)',
            filter: 'blur(2px)',
          } as CSSProperties
        }
      />
      <div className="absolute h-[423px] left-[244px] top-[6506px] w-[700px]" data-node-id="241:890" data-name="SBM_@ 1">
        <div className="relative size-full overflow-clip rounded-[10px]">
          <video
            className="absolute size-full max-w-none rounded-[10px] object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/SBM_at.mp4')} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="contents relative size-full" data-node-id="246:61">
        <div className="absolute h-[437px] left-[307px] top-[5280px] w-[1305px]" data-node-id="246:59" data-name="Ellipse 2767 1">
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            src={imgEllipse27671}
          />
        </div>
        <div className="absolute h-[453px] left-[211px] top-[5616px] w-[1497px]" data-node-id="246:60" data-name="Ellipse 2847 1">
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            src={imgEllipse28471}
          />
        </div>
      </div>
      <div className="absolute flex h-[449.216px] items-center justify-center left-[787.9px] top-[2346.39px] w-[255.063px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
        <div className="flex-none rotate-[75.23deg]">
          <div className="h-[151.878px] relative w-[424.526px]" data-node-id="241:893">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2846} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2008px] left-[calc(50%+1.46px)] top-[calc(50%-6507px)] w-[2179px]" data-node-id="241:894">
        <div className="absolute inset-[-2.49%_-2.29%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse2694} />
        </div>
      </div>
      <p className="absolute font-['Helvetica:Regular',sans-serif] h-[270px] leading-[1.5] left-[69px] not-italic text-[20px] text-black top-[1766px] w-[331px]" data-node-id="241:895">
        Emotions are often difficult to express in a single form, making alignment within everyday living environments both complex and essential. Positioned as an ambient presence, the agent interprets and mediates between these differences, translating them into a cohesive and balanced spatial experience.
      </p>
      <div className="absolute h-0 left-[69px] top-[1330px] w-[319px]" data-node-id="241:896">
        <div className="absolute inset-[-0.7px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine70} />
        </div>
      </div>
      <p className="absolute font-['Helvetica:Bold',sans-serif] leading-[1.5] left-[69px] not-italic text-[30px] text-black top-[1264px] tracking-[-0.33px] whitespace-nowrap" data-node-id="241:897">
        Overview
      </p>
      <motion.p
        className="absolute font-['Helvetica:Bold',sans-serif] leading-[1.5] left-[69px] not-italic text-[30px] text-black top-[2626px] tracking-[-0.33px] whitespace-nowrap"
        data-node-id="241:898"
        initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
        }
      >
        UX Flow
      </motion.p>
      <div className="-translate-x-1/2 absolute h-[108px] left-[calc(50%+0.5px)] overflow-clip top-[12765px] w-[259px]" data-node-id="241:899" data-name="title">
        <div className="absolute contents inset-[39.38%_2.7%_0_3.09%]" data-node-id="241:900" data-name="Clip path group">
          <div className="absolute contents inset-[43.69%_4.99%_4.04%_4.7%]" data-node-id="241:903" data-name="Group">
            <div className="absolute inset-[48.46%_87.61%_19.36%_4.7%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.169px_-9.807px] mask-size-[244px_65.469px]" data-node-id="241:904" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-0.91%_-1.59%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
            <div className="absolute inset-[43.69%_73.3%_39.38%_18.22%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-39.189px_-4.648px] mask-size-[244px_65.469px]" data-node-id="241:907" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-1.73%_-1.44%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
            <div className="absolute inset-[45.7%_57.47%_22.57%_30.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-71.001px_-6.82px] mask-size-[244px_65.469px]" data-node-id="241:910" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-0.92%_-1.62%_-1.17%_-1.64%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup3} />
              </div>
            </div>
            <div className="absolute inset-[49.39%_47.57%_21.22%_44.74%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-107.878px_-10.813px] mask-size-[244px_65.469px]" data-node-id="241:913" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-0.99%_-1.59%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup4} />
              </div>
            </div>
            <div className="absolute inset-[46.62%_27.28%_38.89%_58.8%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-144.292px_-7.82px] mask-size-[244px_65.469px]" data-node-id="241:916" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-2.02%_-0.88%_-2.02%_-1.42%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup5} />
              </div>
            </div>
            <div className="absolute inset-[46.62%_16.29%_4.04%_76.02%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-188.895px_-7.82px] mask-size-[244px_65.469px]" data-node-id="241:919" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-0.59%_-1.59%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup6} />
              </div>
            </div>
            <div className="absolute inset-[46.62%_4.99%_6.86%_87.32%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-218.165px_-7.82px] mask-size-[244px_65.469px]" data-node-id="241:922" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-0.63%_-1.59%_-0.63%_-1.58%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup7} />
              </div>
            </div>
            <div className="absolute inset-[47.53%_63.57%_41.67%_31.53%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-73.659px_-8.799px] mask-size-[244px_65.469px]" data-node-id="241:925" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-2.71%_-2.48%_-2.71%_-2.49%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup8} />
              </div>
            </div>
            <div className="absolute inset-[51.42%_77.75%_34.93%_16.08%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-33.643px_-13.008px] mask-size-[244px_65.469px]" data-node-id="241:928" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-2.9%_-2.92%_-2.94%_-2.92%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup9} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_81.27%_23.83%_16.62%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-35.039px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:931" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup10} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_77.51%_23.83%_20.38%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-44.787px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:934" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup11} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_73.74%_23.83%_24.14%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-54.532px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:937" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup12} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_38.32%_23.83%_59.57%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-146.284px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:940" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup13} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_34.56%_23.83%_63.33%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-156.03px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:943" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup14} />
              </div>
            </div>
            <div className="absolute inset-[71.5%_30.79%_23.83%_67.1%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-165.777px_-34.689px] mask-size-[244px_65.469px]" data-node-id="241:946" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
              <div className="absolute inset-[-6.26%_-5.77%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup15} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-[15.62%_2.56%_66.21%_2.28%]" data-node-id="241:949" data-name="Layer_1">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayer1} />
        </div>
      </div>
      <div className="absolute font-['Helvetica:Regular',sans-serif] leading-[0] left-[calc(50%+477px)] not-italic text-[0px] text-black top-[12773px] tracking-[-0.165px] w-[414px] whitespace-pre-wrap" data-node-id="241:975">
        <p className="leading-[1.5] mb-0 text-[15px]">09.01.2025 - 12.18.2025</p>
        <p className="leading-[1.5] mb-0 text-[15px]">Exhibited at Geumsung Electronics Refresh Center,</p>
        <p className="mb-0 text-[15px]">
          <span className="leading-[1.5]">Seoul, South Korea</span>
          <span className="leading-[1.5]">{` (4months)`}</span>
        </p>
        <p className="mb-0 text-[15px]">
          <span className="leading-[1.5]">{`Team Project/   `}</span>
          <span className="font-['Helvetica:Bold_Oblique',sans-serif] italic leading-[1.5] text-black">UX/UI(2)</span>
          <span className="font-['Helvetica:Oblique',sans-serif] italic leading-[1.5] text-black">{`  `}</span>
          <span className="leading-[1.5]">{`|  Dev(3)  |  Exhibition Management(4)`}</span>
        </p>
        <p className="leading-[1.5] text-[15px]">​</p>
      </div>
      <div className="absolute font-['Helvetica:Regular',sans-serif] h-[46px] leading-[0] left-[calc(50%-891px)] not-italic text-[15px] text-black top-[12796px] tracking-[-0.165px] w-[409px] whitespace-pre-wrap" data-node-id="241:976">
        <p className="leading-[1.5] mb-0">{`Tools - Figma / Adobe Photoshop / Adobe Illustrator / Blender `}</p>
        <p className="leading-[1.5] mb-0">AI - Midjourney / Google NanoBanana / Google Veo 3.1 /Topaz</p>
        <p className="leading-[1.5]">​</p>
      </div>
      <div
        className="absolute left-[268px] top-[606px] flex min-h-[120px] w-[1385px] flex-col items-center justify-center font-['Helvetica:Bold',sans-serif] not-italic text-center tracking-[1px] whitespace-pre-wrap"
        data-node-id="241:977"
      >
        <h1 className="m-0 flex w-full flex-col items-center gap-0 font-['Neue Haas Grotesk Display Pro',sans-serif] text-[50px] font-normal leading-[1.2]">
          <ShinyText
            className="block w-full text-center font-light leading-[1.2]"
            color="#ff5c94"
            delay={0}
            direction="left"
            pauseOnHover={false}
            shineColor="#ffffff"
            speed={4}
            spread={158}
            text="Harmonic Intelligence-Fusion for Furon:"
            yoyo={false}
          />
          <ShinyText
            className="block w-full text-center font-bold leading-[1.2]"
            color="#ff5c94"
            delay={0}
            direction="left"
            pauseOnHover={false}
            shineColor="#ffffff"
            speed={4}
            spread={158}
            text="LG AI Agent Design"
            yoyo={false}
          />
        </h1>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[2005.875px] items-center justify-center left-[calc(50%-1.69px)] top-[calc(50%-6282.94px)] w-[2176.702px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
        <div className="flex-none skew-x-[-3.13deg] rotate-[67.38deg]">
          <div
            className="relative h-[1668.308px] w-[1570.114px]"
            data-node-id="241:978"
            style={{ containerType: 'size' }}
          >
            <div className="absolute inset-[-3.6%_-3.82%]">
              <img
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 block max-w-none size-full scale-[1.08] object-cover opacity-[0.42] blur-[36px]"
                src={imgEllipse2768}
              />
              <img alt="" className="relative z-[1] block max-w-none size-full" src={imgEllipse2768} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-[834px] top-[292px] h-[250px] w-[252px]"
        data-node-id="244:39"
        data-name="_레이어_1"
      >
        <div className="relative size-full" data-node-id="244:40" data-name="Vector">
          <div className="absolute inset-[-0.2%]">
            <img alt="" className="block max-w-none size-full" src={imgVector24440} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[2202px] items-center justify-center left-[137px] top-[4783px] w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[2202px]" data-node-id="241:981">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine92} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[219px] not-italic text-[32px] text-black top-[3391px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:982">
        <p className="leading-[1.5]">{`01 `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[594px] not-italic text-[32px] text-black top-[3391px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:983">
        <p className="leading-[1.5]">{`02 `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[1038px] not-italic text-[32px] text-black top-[3391px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:984">
        <p className="leading-[1.5]">03</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[1384px] not-italic text-[32px] text-black top-[3391px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:985">
        <p className="leading-[1.5]">04</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[219px] not-italic text-[32px] text-black top-[3443px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:986">
        <p className="leading-[1.3]">Emotion Input</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[594px] not-italic text-[32px] text-black top-[3443px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:987">
        <p className="leading-[1.3]">Emotion Interpretation</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[1038px] not-italic text-[32px] text-black top-[3457px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:988">
        <p className="leading-[1.1] mb-0">Emotion</p>
        <p className="leading-[1.1]">Coordination</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] left-[1384px] not-italic text-[32px] text-black top-[3443px] tracking-[-0.352px] whitespace-nowrap" data-node-id="241:989">
        <p className="leading-[1.3]">Visualization of Coordination</p>
      </div>
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[1.8] left-[219px] not-italic text-[14px] text-black top-[3530px] w-[308px]" data-node-id="241:990">
        User inputs and external data (e.g., Weather/Time APIs) are integrated to identify the user’s current emotional state and context.
      </p>
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[0] left-[594px] not-italic text-[14px] text-black top-[3530px] tracking-[-0.308px] w-[385px]" data-node-id="241:991">
        <p className="leading-[1.8] mb-0">Abstract expressions such as “stuffy” or “tense,”</p>
        <p className="leading-[1.8] mb-0">which users may not explicitly recognize, are translated</p>
        <p className="leading-[1.8]">into key signals. Based on these, the system suggests appropriate environmental responses.</p>
      </div>
      <div className="absolute font-['Pretendard:Light',sans-serif] leading-[0] left-[1038px] not-italic text-[0px] text-black top-[3530px] tracking-[-0.308px] w-[278px]" data-node-id="241:992">
        <p className="font-['Pretendard:Regular',sans-serif] leading-[1.8] mb-0 text-[14px]">The system analyzes conflicting emotions and preferences across multiple users, calculates</p>
        <p className="font-['Pretendard:Regular',sans-serif] mb-0 text-[14px]">
          <span className="leading-[1.8]">{`a weighted `}</span>
          <span className="leading-[1.8]">Fusion Point</span>
          <span className="leading-[1.8]">, and determines</span>
        </p>
        <p className="font-['Pretendard:Regular',sans-serif] leading-[1.8] text-[14px]">a balanced state acceptable to all.</p>
      </div>
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[0] left-[1384px] not-italic text-[14px] text-black top-[3530px] tracking-[-0.308px] w-[412px]" data-node-id="241:993">
        <p className="leading-[1.8] mb-0">Environmental parameters (e.g., lighting, temperature, sound)</p>
        <p className="leading-[1.8]">are adjusted automatically, while the reasoning and balance between users’ emotions and preferences are visualized for transparency.</p>
      </div>
      <div className="absolute contents left-[93px] top-[2671px]" data-node-id="241:994">
        <div className="absolute flex h-[172.87px] items-center justify-center left-[998px] top-[3176.96px] w-[164px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[164px] relative w-[172.87px]" data-node-id="241:995">
              <div className="absolute inset-[-60.98%_-57.85%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2822} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[426.915px] items-center justify-center left-[799px] top-[3192.77px] w-[371.541px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-scale-y-100 flex-none rotate-[-51.03deg] skew-x-[-2.98deg]">
            <div className="h-[129.235px] relative w-[437.97px]" data-node-id="241:996">
              <div className="absolute inset-[-77.38%_-22.83%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2848} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[453.523px] items-center justify-center left-[856px] top-[3436.27px] w-[147.152px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-scale-y-100 flex-none rotate-[-87.31deg] skew-x-[-0.3deg]">
            <div className="h-[126.333px] relative w-[447.433px]" data-node-id="241:997">
              <div className="absolute inset-[-79.16%_-22.35%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2849} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[166.546px] left-[931px] top-[3088.42px] w-[158px]" data-node-id="241:998">
          <div className="absolute inset-[-38.37%_-40.44%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse2828} />
          </div>
        </div>
        <div className="absolute h-[225.574px] left-[93px] top-[3059.96px] w-[550px]" data-node-id="241:1000">
          <div className="absolute inset-[-44.33%_-18.18%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse2837} />
          </div>
        </div>
        <div className="absolute h-[221.387px] left-[446px] top-[3075.77px] w-[607.035px]" data-node-id="241:1001">
          <div className="absolute inset-[-45.17%_-16.47%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse2838} />
          </div>
        </div>
        <div className="absolute h-[221.358px] left-[958px] top-[3071.55px] w-[442px]" data-node-id="241:1002">
          <div className="absolute inset-[-45.18%_-22.62%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse2844} />
          </div>
        </div>
        <div className="absolute flex h-[410.571px] items-center justify-center left-[825.34px] top-[2754.12px] w-[389.504px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[46.51deg] skew-x-[3.02deg]">
            <div className="h-[129.776px] relative w-[436.158px]" data-node-id="241:1003">
              <div className="absolute inset-[-77.06%_-22.93%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2845} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[177.579px] items-center justify-center left-[1108px] top-[3075.77px] w-[308.694px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[179.62deg] skew-x-[-0.04deg]">
            <div className="h-[175.539px] relative w-[307.652px]" data-node-id="241:1004">
              <div className="absolute inset-[-56.97%_-32.5%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2850} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[138.694px] items-center justify-center left-[966px] top-[3094.77px] w-[400.566px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[138.694px] relative w-[400.566px]" data-node-id="241:1005">
              <div className="absolute inset-[-72.1%_-24.96%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2842} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[203.509px] items-center justify-center left-[1037.77px] top-[3094.74px] w-[317.542px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-scale-y-100 flex-none rotate-[174.04deg] skew-x-[-0.59deg]">
            <div className="h-[172.823px] relative w-[303.021px]" data-node-id="241:1006">
              <div className="absolute inset-[-57.86%_-33%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2851} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[667.82px] items-center justify-center left-[calc(50%+385.78px)] top-[calc(50%-3278.87px)] w-[633.553px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[-133.49deg] skew-x-[3.02deg]">
            <div className="h-[459.805px] relative w-[460.723px]" data-node-id="241:1007">
              <div className="absolute inset-[-10.87%_-10.85%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2841} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-0 left-[93px] top-[3165.37px] w-[1696px]" data-node-id="241:1009">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine86} />
          </div>
        </div>
        <div className="absolute h-[147.572px] left-[858px] top-[3408.86px] w-[140px]" data-node-id="241:1010">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2833} />
        </div>
        <div className="absolute flex h-[148.789px] items-center justify-center left-[1076px] top-[3027.28px] w-[141.154px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[0.5deg] skew-x-[0.05deg]">
            <div className="h-[147.572px] relative w-[140.001px]" data-node-id="241:1011">
              <div className="absolute inset-[-59.63%_-62.86%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2829} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[109.625px] left-[876px] top-[2817.52px] w-[104px]" data-node-id="241:1012">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2832} />
        </div>
        <div className="absolute left-[534px] top-[3129px] h-[72px] w-[73px]" data-node-id="245:47" data-name="furon_black 2">
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none border-0 object-cover outline-none ring-0"
            src={imgFuronBlack}
          />
        </div>
        <div className="absolute h-[15.811px] left-[187px] top-[3157.99px] w-[15px]" data-node-id="241:1014">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2821} />
        </div>
        <div className="absolute h-[15.811px] left-[1006px] top-[3156.93px] w-[15px]" data-node-id="241:1015">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2821} />
        </div>
        <div className="absolute h-[15.811px] left-[1134px] top-[3102.12px] w-[15px]" data-node-id="241:1016">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2824} />
        </div>
        <div className="absolute h-[15.811px] left-[1074px] top-[3254.96px] w-[15px]" data-node-id="241:1017">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2821} />
        </div>
        <div className="absolute h-[15.811px] left-[917px] top-[3466.83px] w-[15px]" data-node-id="241:1018">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2835} />
        </div>
        <div className="absolute h-[15.811px] left-[920px] top-[2863.9px] w-[15px]" data-node-id="241:1019">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2836} />
        </div>
        <div className="absolute h-[494.366px] left-[887px] top-[2671px] w-[469px]" data-node-id="241:1020">
          <div className="absolute inset-[0_0_-0.1%_-0.11%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse2826} />
          </div>
        </div>
        <div className="absolute flex h-[494.366px] items-center justify-center left-[891px] top-[3165.37px] w-[469px]">
          <div className="-scale-y-100 flex-none">
            <div className="h-[494.366px] relative w-[469px]" data-node-id="241:1021">
              <div className="absolute inset-[0_0_-0.1%_-0.11%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse2826} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[1251.2px] items-center justify-center left-[1014px] top-[2863.9px] w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[1251.2px]" data-node-id="241:1022">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine87} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[1251.2px] items-center justify-center left-[1360px] top-[2863.9px] w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[1251.2px]" data-node-id="241:1023">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine90} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[1251.2px] items-center justify-center left-[570px] top-[2863.9px] w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[1251.2px]" data-node-id="241:1024">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine90} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[1251.2px] items-center justify-center left-[195px] top-[2863.9px] w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[1251.2px]" data-node-id="241:1025">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine90} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-[1182px] top-[2981px] h-[369px] w-[355px] overflow-hidden"
          data-node-id="247:71"
          data-name="Ellipse 2840 1"
        >
          <div className="relative size-full overflow-hidden">
            <img
              alt=""
              className="lg-ellipse-2840-spin pointer-events-none absolute inset-0 size-full max-w-none border-0 object-cover outline-none ring-0"
              src={imgEllipse2840}
            />
          </div>
        </div>
        <div
          className="absolute left-[1301px] top-[3104.665px] h-[116px] w-[117px]"
          data-node-id="245:46"
          data-name="furon_black 1"
        >
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none border-0 object-cover outline-none ring-0"
            src={imgFuronBlack24546}
          />
        </div>
        <div className="absolute flex h-[22.136px] items-center justify-center left-[428px] top-[3153.77px] w-[36px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[36px] relative w-[22.136px]" data-node-id="241:1028">
              <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
                <img alt="" className="block max-w-none size-full" src={imgPolygon4} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[22.136px] items-center justify-center left-[1757px] top-[3153.77px] w-[36px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-90">
            <div className="h-[36px] relative w-[22.136px]" data-node-id="241:1029">
              <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
                <img alt="" className="block max-w-none size-full" src={imgPolygon5} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[1693.13px] top-[3838.8px]" data-node-id="241:1031">
        <div className="absolute contents left-[1693.13px] top-[3838.8px]" data-node-id="241:1032">
          <div className="absolute border border-black border-solid h-[52.037px] left-[1693.13px] rounded-[7px] top-[3838.8px] w-[86.198px]" data-node-id="241:1033" />
          <div className="absolute border border-black border-solid h-[6.356px] left-[1720.94px] top-[3890.04px] w-[30.586px]" data-node-id="241:1034" />
        </div>
      </div>
      <div className="absolute contents left-[71px] top-[7039px]" data-node-id="241:1035">
        <div className="absolute border border-black border-solid h-[78.479px] left-[71px] rounded-[7px] top-[7039px] w-[130px]" data-node-id="241:1036" />
        <div className="absolute border border-black border-solid h-[9.585px] left-[112.94px] top-[7116.28px] w-[46.129px]" data-node-id="241:1037" />
      </div>
      <div className="absolute h-[106px] left-[1612px] top-[3792px] w-[50px]" data-node-id="241:1038">
        <div className="absolute inset-[-0.47%_-1%]">
          <img alt="" className="block max-w-none size-full" src={imgVector22782} />
        </div>
      </div>
      <div className="absolute h-[202px] left-[1433.67px] top-[3696px] w-[50.5px]" data-node-id="241:1039">
        <div className="absolute inset-[-0.25%_-0.99%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1410167323} />
        </div>
      </div>
      <div className="absolute h-[181.672px] left-[1520.74px] top-[3716.03px] w-[53.856px]" data-node-id="241:1044">
        <div className="absolute inset-[-0.28%_-0.93%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1410167324} />
        </div>
      </div>
      <div className="absolute left-[1126px] top-[3775px] h-[87px] w-[107px]" data-node-id="245:50" data-name="다중 1 1">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgDaajung245} />
      </div>
      <div className="absolute bg-[rgba(255,255,255,0.3)] border border-[rgba(0,0,0,0.5)] border-solid h-[172px] left-[601px] rounded-[19px] top-[3726px] w-[169px]" data-node-id="241:1049" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] border border-[rgba(0,0,0,0.5)] border-solid h-[172px] left-[806px] rounded-[19px] top-[3726px] w-[169px]" data-node-id="241:1050" />
      <div className="absolute h-0 left-[824px] top-[3768px] w-[136px]" data-node-id="241:1051">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine95} />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] h-[19px] leading-[1.5] left-[686px] not-italic text-[#7c787c] text-[13px] text-center top-[3743px] tracking-[-0.143px] w-[144px]" data-node-id="241:1052">
        Weather / Time APIs
      </p>
      <div className="absolute font-['Pretendard:Light',sans-serif] h-[92px] leading-[0] left-[624px] not-italic text-[12px] text-black top-[3777px] tracking-[-0.132px] w-[135px]" data-node-id="241:1053">
        <p className="leading-[1.5] mb-0">Derives temporal and environmental context from real-time data</p>
        <p className="leading-[1.5]">to enable emotion-aware interactions</p>
      </div>
      <p className="-translate-x-1/2 absolute font-['Pretendard:Bold',sans-serif] h-[20px] leading-[1.5] left-[892px] not-italic text-[#7c787c] text-[13px] text-center top-[3743px] tracking-[-0.143px] w-[136px]" data-node-id="241:1054">
        LLM-based interaction
      </p>
      <p className="absolute font-['Pretendard:Light',sans-serif] h-[70px] leading-[1.5] left-[826px] not-italic text-[12px] text-black top-[3778px] tracking-[-0.132px] w-[139px]" data-node-id="241:1055">
        Uses AI APIs to process user inputs and generate contextually relevant outcomes
      </p>
      <div className="absolute left-[289px] top-[3704px] h-[216px] w-[157px]" data-node-id="245:49" data-name="Group 1410167635 1">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgGroup1410167635} />
      </div>
      <p className="absolute font-['Helvetica:Bold',sans-serif] leading-[1.32] left-[69px] not-italic text-[30px] text-[color:var(--black,black)] top-[8650px] tracking-[-0.6px] w-[300px]" data-node-id="241:1059">
        Interactive Exhibition
      </p>
      <div
        ref={exhibitionZoneRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-[9080px] h-[520px] w-[1920px]"
        data-name="Interactive Exhibition scroll gate"
      />
      <motion.p
        className="absolute font-['Helvetica:Bold',sans-serif] leading-[1.32] left-[68px] not-italic text-[30px] text-[color:var(--black,black)] top-[4297px] tracking-[-0.6px] w-[300px]"
        data-node-id="241:1060"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
        }
      >{`Agent Visualization & Technical Structure`}</motion.p>
      <div className="absolute left-[95px] top-[4527px] h-[69px] w-[85px]" data-node-id="245:51" data-name="다중 1 2">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgDaajung245} />
      </div>
      <div className="absolute h-[161px] left-[78px] top-[4617px] w-[118px]" data-node-id="241:1062" data-name="Component">
        <div className="absolute inset-[10%_20%]" data-node-id="I241:1062;101:2938" data-name="Icon">
          <div className="absolute inset-[-0.39%_-0.71%]">
            <img alt="" className="block max-w-none size-full" src={imgIcon1} />
          </div>
        </div>
      </div>
      <div className="absolute h-[301.639px] left-[1255px] top-[5996px] w-[75.409px]" data-node-id="241:1063">
        <div className="absolute inset-[-0.33%_-1.33%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1410167325} />
        </div>
      </div>
      <div className="absolute h-[271.285px] left-[1395px] top-[6027px] w-[80.42px]" data-node-id="241:1068">
        <div className="absolute inset-[-0.37%_-1.24%]">
          <img alt="" className="block max-w-none size-full" src={imgGroup1410167326} />
        </div>
      </div>
      <div className="absolute h-[158px] left-[557px] top-[6140px] w-[75px]" data-node-id="241:1073">
        <div className="absolute inset-[-0.63%_-1.33%]">
          <img alt="" className="block max-w-none size-full" src={imgVector22783} />
        </div>
      </div>
      <div className="absolute h-[207px] left-[202px] rounded-[9px] top-[8094px] w-[386px]" data-node-id="241:1074" data-name="image 6346085">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute h-[105%] left-[-0.21%] max-w-none top-0 w-[100.43%]" src={imgImage6346085} />
        </div>
      </div>
      <div className="absolute h-[202px] left-[1015px] rounded-[9px] top-[8096px] w-[387px]" data-node-id="241:1075" data-name="image 6346086">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute h-[107.17%] left-0 max-w-none top-[-0.16%] w-full" src={imgImage6346086} />
        </div>
      </div>
      <div className="absolute h-[207px] left-[609px] rounded-[9px] top-[8094px] w-[385px]" data-node-id="241:1076" data-name="image 6346087">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute h-[105%] left-[-0.37%] max-w-none top-0 w-[100.73%]" src={imgImage6346087} />
        </div>
      </div>
      <div className="absolute h-[202px] left-[1423px] rounded-[9px] top-[8096px] w-[386px]" data-node-id="241:1077" data-name="image 6346090">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute h-[107.69%] left-[-0.11%] max-w-none top-0 w-[100.23%]" src={imgImage6346090} />
        </div>
      </div>
      <div className="absolute h-[756px] left-[598px] top-[1272px] w-[1253px]" data-node-id="241:1078" data-name="SBM2_1">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/SBM2_1.mp4')} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="absolute h-0 left-[624px] top-[3766px] w-[122px]" data-node-id="241:1079">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine94} />
        </div>
      </div>
      <p className="absolute font-['Helvetica:Regular',sans-serif] h-[330px] leading-[1.5] left-[69px] not-italic text-[20px] text-black top-[1380px] tracking-[-0.22px] w-[319px]" data-node-id="241:1080">
        Reimagining LG’s AI agent “Furon” as an empathic orchestrator, this project explores how shared environments can be shaped through the coordination of multiple users’ emotions and preferences. Rather than responding to individuals in isolation, the agent focuses on finding a harmonious balance across users within a shared space.
      </p>
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[1.3] left-[1388px] not-italic text-[#7c787c] text-[18px] top-[6326px] tracking-[-0.198px] whitespace-nowrap" data-node-id="241:1081">
        LG PuriCare
      </p>
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[1.3] left-[1251px] not-italic text-[#7c787c] text-[18px] top-[6326px] tracking-[-0.198px] whitespace-nowrap" data-node-id="241:1082">
        LG Tower I
      </p>
      <div className="absolute left-[787px] top-[5497px] h-[364px] w-[346px]" data-node-id="246:58" data-name="furon_orche 1">
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          src={imgFuronOrche1}
        />
      </div>
      <p className="absolute z-[1] font-['Pretendard:Regular',sans-serif] leading-[1.3] left-[calc(50%-88px)] not-italic text-[18px] text-black top-[5779px] tracking-[-0.198px] whitespace-nowrap" data-node-id="241:1083">
        AI Furon Orchestrating
      </p>
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[1.3] left-[553px] not-italic text-[#7c787c] text-[18px] top-[6326px] tracking-[-0.198px] whitespace-nowrap" data-node-id="241:1084">
        LG XBoom
      </p>
      <div className="absolute h-[423px] left-[1038px] top-[6506px] w-[700px]" data-node-id="241:1120" data-name="SBM2_1">
        <div className="relative size-full overflow-clip rounded-[10px]">
          <div className="absolute inset-0 overflow-hidden rounded-[10px]">
            <video
              className="absolute left-[-0.32%] top-[-0.01%] h-[100.03%] w-[100.63%] max-w-none"
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload"
            >
              <source src={lgAsset('video/SBM2_1.mp4')} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <ExhibitionFloorSlotAny anyOf={[5]} className="absolute h-0 left-[1418.36px] top-[9837px] w-[33px]" data-node-id="241:1121">
        <div className="absolute inset-[-0.73px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine13} />
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny
        anyOf={[5]}
        className="absolute flex h-[30px] items-center justify-center left-[1451.36px] top-[9807px] w-0"
        style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}
      >
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[30px]" data-node-id="241:1122">
            <div className="absolute inset-[-0.73px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine16} />
            </div>
          </div>
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlot
        segment={5}
        className="absolute z-[11] h-[249px] left-[1144px] top-[10100px] w-[412px]"
        data-node-id="241:1124"
        data-name="SBM2 3"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <video
            className="absolute h-[100.03%] left-[-0.32%] max-w-none top-[-0.01%] w-[100.63%] object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/SBM2_3.mp4')} type="video/mp4" />
          </video>
        </div>
      </ExhibitionFloorSlot>
      <div className="-translate-x-1/2 absolute h-[785px] left-[calc(50%-3.5px)] top-[10766px] w-[729.759px]" data-node-id="241:1125" data-name="a2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[163.36%] left-[-14.87%] max-w-none top-[-27.74%] w-[117.2%]" src={imgA2} />
        </div>
      </div>
      <div className="absolute h-[786px] left-0 top-[10766px] w-[592px]" data-node-id="241:1126" data-name="a1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.02%] left-[-36.94%] max-w-none top-[-0.02%] w-[199.49%]" src={imgA1} />
        </div>
      </div>
      <div className="absolute h-[786px] left-[1321px] top-[10766px] w-[599px]" data-node-id="241:1127" data-name="a3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[114.27%] left-0 max-w-none top-[-11.51%] w-[100.02%]" src={imgA3} />
        </div>
      </div>
      <div className="absolute border-[0.5px] border-black border-solid h-[435px] left-[532px] rounded-[10px] top-[11982px] w-[308px]" data-node-id="241:1128" data-name="tae">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]">
          <img alt="" className="absolute h-[135.49%] left-[-35.22%] max-w-none top-[-26.72%] w-[135.22%]" src={imgTae} />
        </div>
      </div>
      <div className="absolute contents left-[1058px] top-[11981px]" data-node-id="241:1129">
        <div className="absolute bg-white border-[0.5px] border-black border-solid h-[436px] left-[1058px] rounded-[10px] top-[11981px] w-[306px]" data-node-id="241:1130" />
      </div>
      <p className="-translate-x-1/2 absolute font-['Pretendard:SemiBold',sans-serif] leading-[1.32] left-[calc(50%-0.5px)] not-italic text-[22px] text-[color:var(--black,black)] text-center top-[11888px] tracking-[-0.44px] w-[125px]" data-node-id="241:1132">
        UI Team
      </p>
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[0] left-[532px] not-italic text-[0px] text-[color:var(--black,black)] top-[12441px] tracking-[-0.44px] w-[270px]" data-node-id="241:1133">
        <p className="font-['Pretendard:Medium',sans-serif] leading-[1.8] mb-0 text-[20px]">Tae Clara Kim</p>
        <p className="leading-[1.8] text-[18px]">taeeunclarakim@gmail.com</p>
      </div>
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[0] left-[1060px] not-italic text-[0px] text-[color:var(--black,black)] top-[12441px] tracking-[-0.44px] w-[270px]" data-node-id="241:1134">
        <p className="font-['Pretendard:Medium',sans-serif] leading-[1.8] mb-0 text-[20px]">Eunseol Kim</p>
        <p className="leading-[1.8] text-[18px]">taeeunclarakim@gmail.com</p>
      </div>
      <div className="absolute left-[129px] size-[15px] top-[4778px]" data-node-id="241:1135">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2823} />
      </div>
      <div className="absolute left-[129px] size-[15px] top-[6042px]" data-node-id="241:1136">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2823} />
      </div>
      <div className="absolute left-[129px] size-[15px] top-[5666px]" data-node-id="241:1137">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2823} />
      </div>
      <ExhibitionFloorSlot
        segment={0}
        className="absolute z-[11] h-[314px] left-[1472px] top-[9581px] w-[332px]"
        data-node-id="241:1138"
        data-name="active_1211"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <video
            className="absolute max-w-none object-cover size-full"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/active_1211.mp4')} type="video/mp4" />
          </video>
        </div>
      </ExhibitionFloorSlot>
      <div className="absolute flex h-[36px] items-center justify-center left-[126px] top-[6949px] w-[21px]">
        <div className="flex-none rotate-180">
          <div className="h-[36px] relative w-[21px]" data-node-id="241:1139">
            <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
              <img alt="" className="block max-w-none size-full" src={imgPolygon7} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[854px] left-[249px] rounded-[10px] top-[7167px] w-[1514px]" data-node-id="241:1140" data-name="tv2_2 1">
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <video
            className="absolute h-full left-[-0.25%] max-w-none top-0 w-[100.42%] object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/tv2_2.mp4')} type="video/mp4" />
          </video>
        </div>
      </div>
      <ExhibitionFloorSlot
        segment={4}
        className="absolute z-[11] h-[271px] left-[69px] top-[10137px] w-[480px]"
        data-node-id="241:1191"
        data-name="tv2_2 2"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <video
            className="absolute h-full left-[-0.25%] max-w-none top-0 w-[100.42%] object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/tv2_2.mp4')} type="video/mp4" />
          </video>
        </div>
      </ExhibitionFloorSlot>
      <div className="absolute h-[779.429px] left-[652px] top-[9546px] w-[657.021px]" data-node-id="241:1141" data-name="Union">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUnion} />
      </div>
      <ExhibitionFloorSlot
        segment={3}
        className="absolute z-[11] h-[250px] left-[107px] top-[9638px] w-[413.907px]"
        data-node-id="241:1123"
        data-name="SBM_@ 2"
      >
        <video
          className="absolute max-w-none object-cover rounded-[10px] size-full"
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload"
        >
          <source src={lgAsset('video/SBM_@.mp4')} type="video/mp4" />
          <source src={lgAsset('video/SBM_at.mp4')} type="video/mp4" />
        </video>
      </ExhibitionFloorSlot>
      <div className="absolute contents left-[835px] top-[10088px]" data-node-id="241:1203">
        <div className="absolute bg-[#d9d9d9] border-[0.5px] border-black border-solid h-[37px] left-[835px] rounded-[10px] top-[10088px] w-[71px]" data-node-id="241:1145" />
        <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[871px] not-italic text-[10px] text-black text-center top-[10096px] tracking-[-0.19px] w-[60px] whitespace-pre-wrap" data-node-id="241:1148">
          <p className="leading-[1.1] mb-0">{`Light / `}</p>
          <p className="leading-[1.1]">Speaker</p>
        </div>
      </div>
      <div className="absolute contents left-[912px] top-[9883px]" data-node-id="241:1202">
        <div className="absolute flex h-[153.642px] items-center justify-center left-[912px] top-[9883px] w-[120.518px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="flex-none rotate-[121.68deg]">
            <div className="bg-[#d9d9d9] border-[0.5px] border-black border-solid h-[48.77px] rounded-[10px] w-[150.449px]" data-node-id="241:1147" />
          </div>
        </div>
        <div className="absolute flex h-[33.801px] items-center justify-center left-[959.32px] top-[9943.73px] w-[25.866px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-60 flex-none">
            <p className="font-['Pretendard:Light',sans-serif] leading-[1.1] not-italic relative text-[10px] text-black tracking-[-0.19px] w-[32.679px]" data-node-id="241:1149">
              Couch
            </p>
          </div>
        </div>
      </div>
      <div className="absolute h-[26px] left-[1080px] top-[9558px] w-[215px]" data-node-id="241:1195">
        <div className="absolute bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26px] left-0 rounded-[10px] top-0 w-[215px]" data-node-id="241:1150" />
        <p className="-translate-x-1/2 absolute font-['Pretendard:SemiBold',sans-serif] leading-[1.5] left-[102.45px] not-italic text-[13.2px] text-black text-center top-[3px] tracking-[-0.2508px] whitespace-nowrap" data-node-id="241:1152">
          Media Wall
        </p>
      </div>
      <div className="absolute h-[158px] left-[848px] top-[9558px] w-[26px]" data-node-id="241:1197">
        <div className="absolute flex h-[158px] items-center justify-center left-0 top-0 w-[26px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26px] rounded-[10px] w-[158px]" data-node-id="241:1153" />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute flex h-[26.4px] items-center justify-center left-[12.9px] top-[62px] w-[19.8px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic relative text-[13.2px] text-black text-center tracking-[-0.2508px] whitespace-nowrap" data-node-id="241:1155">
              TV 1
            </p>
          </div>
        </div>
      </div>
      <div className="absolute h-[280px] left-[662px] top-[9875px] w-[26px]" data-node-id="241:1199">
        <div className="absolute flex h-[280px] items-center justify-center left-0 top-0 w-[26px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26px] rounded-[10px] w-[280px]" data-node-id="241:1154" />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute flex h-[29px] items-center justify-center left-[13px] top-[111px] w-[20px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="-rotate-90 flex-none">
            <p className="font-['Pretendard:SemiBold',sans-serif] h-[20px] leading-[1.5] not-italic relative text-[13.2px] text-black text-center tracking-[-0.2508px] w-[29px]" data-node-id="241:1156">
              TV 2
            </p>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[660px] top-[9817px]" data-node-id="241:1204">
        <div className="absolute bg-[#d9d9d9] border-[0.5px] border-black border-solid h-[37px] left-[660px] rounded-[10px] top-[9817px] w-[71px]" data-node-id="241:1146" />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.1] left-[695.5px] not-italic text-[10px] text-black text-center top-[9825px] tracking-[-0.19px] w-[43px]" data-node-id="241:1157">
          Air Purifier
        </p>
      </div>
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.1] left-[695px] not-italic text-[10px] text-black text-center top-[10270px] tracking-[-0.19px] w-[60px]" data-node-id="241:1158">
        Air Conditioner
      </p>
      <div className="absolute h-[79.317px] left-[685px] top-[9730px] w-[102.404px]" data-node-id="241:1198">
        <div className="absolute flex h-[79.317px] items-center justify-center left-0 top-0 w-[102.404px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="flex-none rotate-[-33.01deg]">
            <div className="bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26.4px] rounded-[10px] w-[104.964px]" data-node-id="241:1151" />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute flex h-[36.378px] items-center justify-center left-[50.61px] top-[20px] w-[41.227px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[-33.01deg]">
            <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic relative text-[13.2px] text-black text-center tracking-[-0.2508px] whitespace-nowrap" data-node-id="241:1159">
              SBM 1
            </p>
          </div>
        </div>
      </div>
      <div className="absolute h-[89.846px] left-[692px] top-[10185px] w-[95.674px]" data-node-id="241:1200">
        <div className="absolute flex h-[89.846px] items-center justify-center left-0 top-0 w-[95.674px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="flex-none rotate-[41.99deg]">
            <div className="bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26.4px] rounded-[10px] w-[104.964px]" data-node-id="241:1160" />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute flex h-[40.474px] items-center justify-center left-[48.72px] top-[24.98px] w-[41.861px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[41.99deg]">
            <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic relative text-[13.2px] text-black text-center tracking-[-0.2508px] whitespace-nowrap" data-node-id="241:1161">
              SBM 2
            </p>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(50%-414.5px)] not-italic text-[18px] text-black text-center top-[calc(50%-985.5px)] whitespace-nowrap" data-node-id="241:1162">
        <p className="leading-[1.4]">Speech recognition</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[18px] text-black text-center top-[calc(50%-985.5px)] whitespace-nowrap" data-node-id="241:1163">
        <p className="leading-[1.4]">Emotion analysis</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-[calc(50%+423px)] not-italic text-[18px] text-black text-center top-[calc(50%-985.5px)] whitespace-nowrap" data-node-id="241:1164">
        <p className="leading-[1.4]">Derivation of coordination results</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] left-[947.5px] not-italic text-[18px] text-black text-center top-[calc(50%-577px)] w-[549px]" data-node-id="241:1165">
        <p className="leading-[1.4]">Interpretation of the user’s abstract words into appropriate parameters for temperature, lighting, and music</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Pretendard:Regular',sans-serif] h-[50px] justify-center leading-[0] left-[1388px] not-italic text-[18px] text-black text-center top-[calc(50%+3px)] w-[422px]" data-node-id="241:1166">
        <p className="leading-[1.4]">Visualization in color and text by applying temperature and humidity parameters</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] left-[594px] not-italic text-[18px] text-black text-center top-[calc(50%+3px)] w-[362px]" data-node-id="241:1167">
        <p className="leading-[1.4]">Visualization in color and text by applying music and lighting parameters</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] left-[294px] not-italic text-[18px] text-black top-[calc(50%+620px)] w-[493px]" data-node-id="241:1168">
        <p className="leading-[1.4]">Visualization in color and text by applying spatial parameters such as temperature, humidity, and lighting</p>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.5] left-[277px] not-italic text-[18px] text-black top-[4548px] tracking-[-0.198px] w-[744px]" data-node-id="241:1169">
        Voice recognition and analysis of the user’s voice through an LLM-based agent
      </p>
      <ExhibitionFloorSlot
        segment={2}
        className="absolute z-[11] h-[458px] left-[348px] top-[8913px] w-[734px]"
        data-node-id="241:1170"
        data-name="tv1_@"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <video
            className="absolute h-[101.6%] left-0 max-w-none top-0 w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controlsList="nodownload"
          >
            <source src={lgAsset('video/tv1_at.mp4')} type="video/mp4" />
          </video>
        </div>
      </ExhibitionFloorSlot>
      <ExhibitionFloorSlotAny anyOf={[1]} className="absolute h-[259px] left-[651px] top-[9373px] w-[197px]" data-node-id="241:1171">
        <div className="absolute inset-[0_0_0_-0.13%]">
          <img alt="" className="block max-w-none size-full" src={imgRectangle34626605} />
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny
        anyOf={[0]}
        className="absolute flex h-[69px] items-center justify-center left-[1188px] top-[9584px] w-[278px]"
        style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}
      >
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[278px] relative w-[69px]" data-node-id="241:1172">
            <div className="absolute inset-[0_0_0_-0.36%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle34626606} />
            </div>
          </div>
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny
        anyOf={[3]}
        className="absolute flex h-[57px] items-center justify-center left-[506px] top-[9699px] w-[226px]"
        style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}
      >
        <div className="-scale-y-100 flex-none rotate-90">
          <div className="h-[226px] relative w-[57px]" data-node-id="241:1173">
            <div className="absolute inset-[0_0_-0.11%_-0.44%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle34626607} />
            </div>
          </div>
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny
        anyOf={[4]}
        className="absolute flex h-[136px] items-center justify-center left-[358px] top-[10001px] w-[304px]"
        style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}
      >
        <div className="flex-none rotate-90">
          <div className="h-[304px] relative w-[136px]" data-node-id="241:1174">
            <div className="absolute inset-[0_0_0_-0.18%]">
              <img alt="" className="block max-w-none size-full" src={imgRectangle34626608} />
            </div>
          </div>
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlot
        segment={1}
        className="absolute z-[11] border-[0.5px] border-black border-solid h-[305px] left-[1384px] rounded-[10px] top-[9158px] w-[172px]"
        data-node-id="241:1175"
        data-name="qr"
      >
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[10px] object-cover"
          src={lgAsset('img/qr.png')}
        />
      </ExhibitionFloorSlot>
      <div className="absolute h-[71.224px] left-[981px] top-[9562px] w-[89.945px]" data-node-id="241:1196">
        <div className="absolute flex h-[71.224px] items-center justify-center left-0 top-0 w-[89.945px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "0" } as CSSProperties}>
          <div className="flex-none rotate-[-33.01deg]">
            <div className="bg-[#ffb2d1] border-[0.55px] border-black border-solid h-[26.4px] rounded-[10px] w-[90.106px]" data-node-id="241:1176" />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute flex h-[45.367px] items-center justify-center left-[44.25px] top-[12.5px] w-[55.064px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as CSSProperties}>
          <div className="flex-none rotate-[-33.01deg]">
            <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic relative text-[13.2px] text-black text-center tracking-[-0.2508px] whitespace-nowrap" data-node-id="241:1177">
              QR Code
            </p>
          </div>
        </div>
      </div>
      <ExhibitionFloorSlotAny anyOf={[1]} className="absolute h-[156.796px] left-[1016.99px] top-[9424.2px] w-[367.008px]" data-node-id="241:1178" data-name="Union">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUnion1} />
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny anyOf={[5]} className="absolute h-0 left-[750px] top-[10223px] w-[394px]" data-node-id="241:1180">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <img alt="" className="block max-w-none size-full" src={imgLine97} />
        </div>
      </ExhibitionFloorSlotAny>
      <ExhibitionFloorSlotAny anyOf={[0, 1]} className="absolute h-[79px] left-[1184.27px] top-[9738px] w-[16.454px]" data-node-id="241:1201">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1410167674} />
      </ExhibitionFloorSlotAny>
      <p className="-translate-x-1/2 absolute font-['Pretendard:Regular',sans-serif] leading-[1.5] left-[1193.5px] not-italic text-[12px] text-black text-center top-[9690px] tracking-[-0.228px] whitespace-nowrap" data-node-id="241:1185">
        Entrance
      </p>
      <div className="absolute h-[109.625px] left-[966px] top-[9519px] w-[104px]" data-node-id="241:1186">
        <div className="absolute inset-[-58.29%_-61.44%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse2843} />
        </div>
      </div>
      <motion.div
        className="absolute h-[803px] left-[350px] top-[4646px] w-[390px]"
        data-node-id="241:1193"
        data-name="iPhone 15 Pro - Black Flatten-2 1"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -12% 0px' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgIPhoneBlackFlatten2} />
      </motion.div>
      <motion.div
        className="absolute h-[802px] left-[772px] top-[4646px] w-[390px]"
        data-node-id="241:1194"
        data-name="iPhone 15 Pro - Black Flatten 1"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -12% 0px' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgIPhoneBlackFlatten} />
      </motion.div>
      <motion.div
        className="absolute h-[804px] left-[1200px] top-[4645px] w-[390px]"
        data-node-id="241:1192"
        data-name="iPhone 15 Pro - Black Flatten-1 1"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -12% 0px' }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.44, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgIPhoneBlackFlatten1} />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-[12] h-[109.625px] w-[104px] -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
        data-name="Ellipse 2834 exhibition path"
        style={{ left: exhibition.leftPx, top: exhibition.topPx }}
      >
        <div className="absolute inset-[-58.29%_-61.44%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse2834} />
        </div>
      </motion.div>
    </div>
    </InteractiveExhibitionCycleContext.Provider>
  );
}