import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ProjectDetailNav } from './components/ProjectDetailNav';
import { SiteBackLink } from './components/SiteBackLink';
import { Home } from './pages/Home';

const Lg = lazy(() => import('./pages/Lg').then((m) => ({ default: m.Lg })));
import { Sooin } from './pages/Sooin';
import { Sori } from './pages/Sori';
import { Loth } from './pages/Loth';
import { Seoculus } from './pages/Seoculus';
import { Canon } from './pages/Canon';
import { ExhibitionWebsite } from './pages/ExhibitionWebsite';
import { ProjectStub } from './pages/ProjectStub';

const GA_MEASUREMENT_ID = 'G-JYWHJEWGD4';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** SPA 라우트 변경마다 GA4에 page_path 전송 (index.html gtag 로드 이후) */
function GtagPageView() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname + window.location.search,
    });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const showNav = pathname !== '/' && pathname !== '/main';

  return (
    <>
      {showNav && pathname.startsWith('/projects/') ? (
        <ProjectDetailNav />
      ) : showNav ? (
        <SiteBackLink />
      ) : null}
      <ScrollToTop />
      <GtagPageView />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Navigate to="/" replace />} />
        <Route
          path="/projects/lg"
          element={
            <Suspense fallback={null}>
              <Lg />
            </Suspense>
          }
        />
        <Route path="/projects/exhibition-archive" element={<ExhibitionWebsite />} />
        <Route path="/projects/sooin" element={<Sooin />} />
        <Route path="/projects/sori" element={<Sori />} />
        <Route path="/projects/loth" element={<Loth />} />
        <Route path="/projects/seoculus" element={<Seoculus />} />
        <Route path="/projects/canon" element={<Canon />} />
        <Route path="/projects/:slug" element={<ProjectStub />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
