/**
 * 메인 그리드(CARDS)와 동일한 순서 — 상세 페이지 "다음" 네비용
 */
export const PROJECT_ROUTES = [
  '/projects/hyundai',
  '/projects/lg',
  '/projects/sori',
  '/projects/loth',
  '/projects/sooin',
  '/projects/seoculus',
  '/projects/mealtune',
  '/projects/canon',
] as const;

export type ProjectRoute = (typeof PROJECT_ROUTES)[number];

export function getNextProjectPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const i = (PROJECT_ROUTES as readonly string[]).indexOf(normalized);
  if (i === -1) return null;
  const next = PROJECT_ROUTES[i + 1];
  return next ?? null;
}

/** 어두운 배경 — 고정 좌/우 네비 아이콘 흰색 (ProjectPageHeader variant=dark + Canon 등) */
export const PROJECT_NAV_ON_DARK = [
  '/projects/hyundai',
  '/projects/seoculus',
  '/projects/loth',
  '/projects/canon',
] as const;

export function isProjectNavOnDark(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return (PROJECT_NAV_ON_DARK as readonly string[]).includes(normalized);
}
