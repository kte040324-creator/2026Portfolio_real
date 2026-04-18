import { Link } from 'react-router-dom';
import { FolderScene } from './components/FolderScene';
import { LandingHeader } from './components/LandingHeader';

export function Landing() {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        maxWidth: '100%',
        minHeight: 1100,
        margin: '0 auto',
        background: '#000',
      }}
    >
      <LandingHeader />

      <div
        style={{
          position: 'absolute',
          left: 'calc(654 / 1920 * 100%)',
          top: 147,
        }}
      >
        <Link
          to="/main"
          aria-label="포트폴리오 메인으로 이동"
          style={{ display: 'inline-block', lineHeight: 0 }}
        >
          <FolderScene />
        </Link>
      </div>
    </div>
  );
}
