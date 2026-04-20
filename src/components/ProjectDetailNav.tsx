import { Link, useLocation } from 'react-router-dom';
import { getNextProjectPath, isProjectNavOnDark } from '../lib/projectRouteOrder';
import { SiteBackLink } from './SiteBackLink';
import '../../css/site-back.css';

export function ProjectDetailNav() {
  const { pathname } = useLocation();
  const nextTo = getNextProjectPath(pathname);
  const onDark = isProjectNavOnDark(pathname);
  const themeClass = onDark ? 'site-nav--on-dark' : undefined;

  return (
    <>
      <SiteBackLink className={themeClass} />
      {nextTo ? (
        <Link
          to={nextTo}
          className={['site-nav-next', themeClass].filter(Boolean).join(' ')}
          aria-label="다음 프로젝트"
          data-node-id="site-nav-next"
        >
          <span className="site-nav-next__label">next project</span>
        </Link>
      ) : null}
    </>
  );
}
