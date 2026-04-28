import { Link } from 'react-router-dom';
import '../../css/site-back.css';

type SiteBackLinkProps = {
  className?: string;
};

export function SiteBackLink({ className }: SiteBackLinkProps) {
  return (
    <Link
      to="/"
      className={['site-back', className].filter(Boolean).join(' ')}
      aria-label="메인으로 돌아가기"
      data-node-id="site-back"
    >
      <span className="site-nav-next__label">back home</span>
    </Link>
  );
}
