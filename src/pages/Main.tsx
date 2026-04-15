import { Link } from 'react-router-dom';
import { LandingHeader } from '../components/LandingHeader';

/**
 * Figma "main" — 풀 스크롤 포트폴리오 (1920×3453 등). 콘텐츠는 이후 채움.
 */
export function Main() {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        maxWidth: '100%',
        minHeight: '100vh',
        margin: '0 auto',
        background: '#f8f8f8',
      }}
    >
      <LandingHeader />

      <Link
        to="/"
        style={{
          position: 'absolute',
          left: 'calc(48.28 / 1920 * 100%)',
          top: 56,
          fontFamily: "'FFFAcidGrotesk', system-ui, sans-serif",
          fontSize: 14,
          color: '#ec5cf0',
          textDecoration: 'none',
        }}
      >
        ←
      </Link>

      <main
        id="main"
        style={{
          paddingTop: 120,
          paddingLeft: 'calc(48 / 1920 * 100%)',
          paddingRight: 'calc(48 / 1920 * 100%)',
          paddingBottom: 80,
        }}
      >
        {/* 포트폴리오 본문 */}
      </main>
    </div>
  );
}
