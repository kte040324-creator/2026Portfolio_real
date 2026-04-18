/** `public/sooin/` 기준 경로 → Vite base URL 반영 (Figma 171:2354 내보내기) */
export function sooinAsset(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  const encoded = relativePath.split('/').map(encodeURIComponent).join('/');
  return `${base}sooin/${encoded}`;
}
