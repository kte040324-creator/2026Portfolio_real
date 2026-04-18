import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Landing } from './Landing';
import { Main } from './pages/Main';
import { Hyundai } from './pages/Hyundai';
import { Mealtune } from './pages/Mealtune';
import { Sooin } from './pages/Sooin';
import { Sori } from './pages/Sori';
import { ProjectStub } from './pages/ProjectStub';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/projects/hyundai" element={<Hyundai />} />
        <Route path="/projects/mealtune" element={<Mealtune />} />
        <Route path="/projects/sooin" element={<Sooin />} />
        <Route path="/projects/sori" element={<Sori />} />
        <Route path="/projects/:slug" element={<ProjectStub />} />
      </Routes>
    </BrowserRouter>
  );
}
