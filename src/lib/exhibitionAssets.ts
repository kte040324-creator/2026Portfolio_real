/** `public/exhibition/` — Vite base URL 반영 */
export function exhibitionAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${base}exhibition/${encoded}`;
}
