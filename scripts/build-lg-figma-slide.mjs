import fs from 'node:fs';

const SRC =
  '/Users/kimtaeeun/.cursor/projects/Users-kimtaeeun-Desktop-Portfoilio2026/agent-tools/cfdc2399-794e-49dc-912c-3935b872974e.txt';
const OUT = new URL('../src/components/LgFigmaSlide.tsx', import.meta.url);

let s = fs.readFileSync(SRC, 'utf8');

s = s.replace(
  /const (\w+) = "http:\/\/localhost:3845\/assets\/([^.]+)\.(png|svg)";/g,
  "const $1 = lgAsset('img/figma/$2.$3');",
);

const header = `import type { CSSProperties } from 'react';\nimport { lgAsset } from '../lib/lgAssets';\n\n`;

s = s.replace(/^const img/m, `${header}const img`);

s = s.replace(/export default function Slide\(\)/g, 'export function LgFigmaSlide()');

s = s.replace(/ as React\.CSSProperties/g, ' as CSSProperties');

const posters = [
  "lgAsset('img/figma/747df2f32d8a1a5bd3cddb46b81bce59900cdc24.png')",
  "lgAsset('img/figma/46dc5b26cfcf7b67e6d6a998f407f8a1fa5eacf1.png')",
  "lgAsset('img/figma/59244c566ee2959a1a197a79d991e0c5eaf0a5b8.png')",
  "lgAsset('img/figma/4a1af670b3239d116b60a904fbea1cb05450a371.png')",
  "lgAsset('img/figma/b8ae3d2f62e79eae31d2435d467a2cf98ee0543f.png')",
  "lgAsset('img/figma/2e8ae2e2ca836ea48ceea779dac3f9eae8e55f47.png')",
];
let pi = 0;
function nextPoster() {
  return posters[pi++ % posters.length];
}

s = s.replace(/<video([^>]*)>\s*<source src="\/_videos\/v1\/[^"]+" \/>\s*<\/video>/gs, (_, attrs) => {
  const poster = nextPoster();
  return `<img alt=""${attrs} src={${poster}} />`;
});

fs.writeFileSync(OUT, s, 'utf8');
console.log('Wrote', OUT.pathname);
