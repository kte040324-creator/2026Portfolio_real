import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProjectDetailNav } from './components/ProjectDetailNav';
import { SiteBackLink } from './components/SiteBackLink';
import { Landing } from './Landing';
import { Main } from './pages/Main';
import { Hyundai } from './pages/Hyundai';

const Lg = lazy(() => import('./pages/Lg').then((m) => ({ default: m.Lg })));
import { Mealtune } from './pages/Mealtune';
import { Sooin } from './pages/Sooin';
import { Sori } from './pages/Sori';
import { Loth } from './pages/Loth';
import { Seoculus } from './pages/Seoculus';
import { Canon } from './pages/Canon';
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
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/projects/hyundai" element={<Hyundai />} />
        <Route
          path="/projects/lg"
          element={
            <Suspense fallback={null}>
              <Lg />
            </Suspense>
          }
        />
        <Route path="/projects/mealtune" element={<Mealtune />} />
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
