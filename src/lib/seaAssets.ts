/** `public/sea/<파일>` — BASE_URL + 인코딩만 (파일명은 ASCII 권장) */
export function seaAsset(filename: string): string {
  return `${import.meta.env.BASE_URL}sea/${encodeURIComponent(filename)}`;
}
