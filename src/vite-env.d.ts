/// <reference types="vite/client" />

/** Google tag (gtag.js) — loaded from index.html */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export {};
