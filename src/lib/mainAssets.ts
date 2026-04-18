/** `public/assets/main/` — Figma 211:1346 카드 PNG */
export function mainAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${base}assets/main/${encoded}`;
}
