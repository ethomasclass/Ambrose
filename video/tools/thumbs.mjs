// Render the thumbnail concepts at 1280x720: node tools/thumbs.mjs [Thumb-A Thumb-B ...]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['Thumb-A', 'Thumb-B', 'Thumb-C'];
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = process.env.REMOTION_CHROME || null;
for (const id of ids) {
  const composition = await selectComposition({serveUrl, id, browserExecutable});
  const output = path.resolve('../review/thumbnails', `Thumbnail_Bierce_${id.slice(-1)}.png`);
  await renderStill({composition, serveUrl, frame: 140, output, imageFormat: 'png', scale: 2 / 3, browserExecutable});
  console.log('wrote', output);
}
