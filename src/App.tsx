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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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
