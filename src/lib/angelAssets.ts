/** `public/angel/<filename>` — BASE_URL + encodeURIComponent만 사용 */
export function angelAsset(filename: string): string {
  return `${import.meta.env.BASE_URL}angel/${encodeURIComponent(filename)}`;
}
