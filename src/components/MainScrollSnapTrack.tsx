/**
 * 스크롤 스냅용 보이지 않는 트랙. 구간 높이 합 = 문서 높이(3364px)와 main-stage 절대 좌표가 맞아야 함.
 */
export const MAIN_SCROLL_SNAP_SECTIONS = [
  { id: 'intro', height: 1350 },
  { id: 'iac', height: 489 },
  { id: 'bridge', height: 200 },
  { id: 'personal-1', height: 477 },
  { id: 'personal-2', height: 656 },
  { id: 'footer', height: 192 },
] as const;

export const MAIN_SCROLL_SNAP_TOTAL_PX = MAIN_SCROLL_SNAP_SECTIONS.reduce(
  (sum, s) => sum + s.height,
  0,
);

export function MainScrollSnapTrack() {
  return (
    <div className="main-scroll-snap-track" aria-hidden="true">
      {MAIN_SCROLL_SNAP_SECTIONS.map((s) => (
        <div
          key={s.id}
          className={`main-scroll-snap${s.id === 'bridge' ? ' main-scroll-snap--bridge' : ''}`}
          style={{ height: s.height }}
          data-snap-section={s.id}
        />
      ))}
    </div>
  );
}
