import '../styles/project-page-header.css';

/** Figma 74:787 기본 문구 */
export const DEFAULT_PROJECT_BREADCRUMB =
  'Projects - Personal - UX/UI, UED, Physical Computing';

export type ProjectPageHeaderProps = {
  /** 중앙 브레드크럼 (Figma 74:787 타이포) */
  breadcrumb?: string;
  className?: string;
  /** false: sticky 상단바(일반 세부 페이지). true: 절대 배치(스케일 프레임 내부 등) */
  embedded?: boolean;
  /** 'light' (default): 검정 텍스트 / 'dark': 밝은 텍스트 */
  variant?: 'light' | 'dark';
};

/**
 * 세부 프로젝트 페이지 상단 — 카테고리 한 줄 (Figma 74:787).
 */
export function ProjectPageHeader({
  breadcrumb = DEFAULT_PROJECT_BREADCRUMB,
  className = '',
  embedded = false,
  variant = 'light',
}: ProjectPageHeaderProps) {
  const rootClass = [
    'project-page-header',
    embedded ? 'project-page-header--embedded' : 'project-page-header--sticky',
    `project-page-header--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={rootClass}>
      <p className="project-page-header__breadcrumb" data-node-id="74:787">
        {breadcrumb}
      </p>
    </header>
  );
}
