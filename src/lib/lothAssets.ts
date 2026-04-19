/** `public/loth/` 기준 경로 → Vite base URL 반영 */
export function lothAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${base}loth/${encoded}`;
}
