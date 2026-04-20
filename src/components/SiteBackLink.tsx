import { Link } from 'react-router-dom';
import '../../css/site-back.css';

type SiteBackLinkProps = {
  className?: string;
};

export function SiteBackLink({ className }: SiteBackLinkProps) {
  return (
    <Link
      to="/main"
      className={['site-back', className].filter(Boolean).join(' ')}
      aria-label="메인으로 돌아가기"
      data-node-id="site-back"
    >
      <span className="site-back__arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 6L8 12L14 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
