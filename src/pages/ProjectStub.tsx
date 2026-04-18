import { useParams } from 'react-router-dom';

const TITLES: Record<string, string> = {
  lg: 'LG',
  sori: 'Sori',
  loth: 'Loth',
  seoculus: 'Seoculus',
  canon: 'Canon',
};

export function ProjectStub() {
  const { slug } = useParams<{ slug: string }>();
  const key = slug ?? '';
  const title = TITLES[key] ?? (key ? key.replace(/-/g, ' ') : 'Project');

  return (
    <div
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        margin: 0,
        padding: '48px 56px',
        background: '#000',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ margin: '0 0 12px', fontSize: 32, fontWeight: 600 }}>{title}</h1>
      <p style={{ margin: 0, opacity: 0.65, maxWidth: 520, lineHeight: 1.5 }}>
        This route is wired from the main grid. Replace this stub with the full project layout when ready.
      </p>
    </div>
  );
}
