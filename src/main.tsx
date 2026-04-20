import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ensureVideosStaySilent } from './ensureVideosStaySilent';
import './index.css';
import './styles/project-scroll-reveal.css';

ensureVideosStaySilent();

const boot = document.getElementById('vite-boot-notice');
if (boot) boot.remove();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
