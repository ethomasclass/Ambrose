// YouTube thumbnail concepts, drawn at 1920x1080 with the video's own kit and exported at 1280x720.
// Render the last frame so every write-on and stamp is finished: tools render stills at frame 140.
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import crossing from '../public/img/jh/masks/ch08_crossing.json';
import road from '../public/img/jh/masks/ch09_off_the_map.json';
import {Wordmark} from './ch/Intro';
import {MAP} from './ch/map';
import {Arrow, Finish, Highlight, INK, JF, Loop, MaskData, Note, PALETTES, PaletteCtx, Picture, Place, Tint, Traced} from './jh/Kit';

export const THUMB_FRAMES = 150;
const X = crossing as unknown as MaskData;
const R = road as unknown as MaskData;
const TEAL = '#2FE0C4';
const CORAL = '#FF6F61';
const ETCH = 'grayscale(1) contrast(1.3) brightness(0.92)';

/** Channel logo, top-left (YouTube covers the bottom-right with the running time). */
const Logo: React.FC = () => {
  const s = 0.27;
  return (
    <div style={{position: 'absolute', left: 36, top: 30, width: 1440 * s, height: 530 * s, overflow: 'hidden', borderRadius: 14, background: 'rgba(13,12,9,0.78)', boxShadow: '0 8px 24px rgba(0,0,0,0.6)'}}>
      <div style={{position: 'absolute', left: -170 * s, top: -275 * s, width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: '0 0'}}>
        <Wordmark clockAt={0} numAt={0} minAt={0} hisAt={0} />
      </div>
    </div>
  );
};

/** A · The crossing: Bierce in coral, walking into Mexico, and the title beside him. */
const ThumbA: React.FC = () => {
  const place: Place = {left: 250, top: -30, scale: 1.6};
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <Picture src="img/gen/ch08_crossing.png" place={place} size={X.size} bw={ETCH} />
      <Tint mask="img/jh/masks/ch08_crossing_magenta_a.png" place={place} size={X.size} />
      <Traced paths={X.shapes.magenta} place={place} at={0} dur={1} width={7} />
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(8,7,5,0.97) 0%, rgba(8,7,5,0.9) 38%, rgba(8,7,5,0.35) 56%, rgba(8,7,5,0) 64%)'}} />
      <Note text="Mexico, 1913. Age 71." x={80} y={225} size={62} rot={-2} color={TEAL} />
      <Highlight text="WALKED OFF" x={60} y={340} size={150} at={0} seed={31} rot={-3} />
      <Highlight text="THE MAP" x={110} y={580} size={190} at={0} seed={33} rot={-2} />
      <Note text="never seen again" x={120} y={860} size={70} rot={-3} color={TEAL} />
      <Arrow x1={720} y1={900} x2={1150} y2={820} bow={-60} at={0} dur={1} width={7} color={TEAL} />
      <Logo />
      <Finish vignette={0.35} />
    </AbsoluteFill>
  );
};

/** B · Seven lives: Bierce at three ages across his route, and a fourth card with no face. */
const ThumbB: React.FC = () => {
  const cards: [string, number, number, number, number, string][] = [
    ['img/bierce/bierce_1866.jpg', 80, 400, 380, -4, '50% 30%'],
    ['img/bierce/bierce_1892.jpg', 520, 360, 390, 3, '50% 18%'],
    ['img/bierce/partington.jpg', 960, 390, 390, -3, '50% 12%'],
  ];
  return (
    <AbsoluteFill style={{background: '#15130f', overflow: 'hidden'}}>
      <Picture src={MAP.src} place={{left: -700, top: -380, scale: 0.5}} size={[MAP.w, MAP.h]} bw="grayscale(0.6) sepia(0.3) contrast(1.1) brightness(0.45)" />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 60%, rgba(8,6,4,0.25) 30%, rgba(8,6,4,0.85) 100%)'}} />
      {cards.map(([src, x, y, w, rot, pos]) => (
        <div key={src} style={{position: 'absolute', left: x, top: y, width: w, transform: `rotate(${rot}deg)`, background: '#efe9dd', padding: 12, boxShadow: '0 24px 50px rgba(0,0,0,0.75)'}}>
          <Img src={staticFile(src)} style={{width: w - 24, height: (w - 24) * 1.25, objectFit: 'cover', objectPosition: pos, display: 'block', filter: 'grayscale(1) contrast(1.2)'}} />
        </div>
      ))}
      <div style={{position: 'absolute', left: 1400, top: 350, width: 390, transform: 'rotate(4deg)', background: '#efe9dd', padding: 12, boxShadow: '0 24px 50px rgba(0,0,0,0.75)', outline: `8px solid ${CORAL}`, outlineOffset: 8}}>
        <div style={{width: 366, height: 457, background: '#1a1814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: JF.display, fontSize: 300, color: CORAL}}>?</div>
      </div>
      <Note text="one man," x={830} y={70} size={80} rot={-3} color={TEAL} />
      <Highlight text="7 LIVES" x={1090} y={140} size={170} at={0} seed={41} rot={-2} />
      <Logo />
      <Finish vignette={0.35} />
    </AbsoluteFill>
  );
};

/** C · Off the map: the empty desert road, his footprints, and the question. */
const ThumbC: React.FC = () => {
  const place: Place = {left: -60, top: -40, scale: 1.5};
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <Picture src="img/gen/ch09_off_the_map.png" place={place} size={R.size} bw={ETCH} />
      <Traced paths={R.shapes.magenta} place={place} at={0} dur={1} width={7} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(8,7,5,0.85) 0%, rgba(8,7,5,0.55) 40%, rgba(8,7,5,0) 60%)'}} />
      <Highlight text="WHERE DID" x={560} y={50} size={140} at={0} seed={51} rot={-3} />
      <Highlight text="HE GO?" x={720} y={250} size={180} at={0} seed={53} rot={-2} />
      <Loop cx={985} cy={560} rx={110} ry={55} tilt={-4} at={0} dur={1} width={8} color={CORAL} seed={55} />
      <Note text="Ambrose Bierce, 1913" x={1260} y={560} size={60} rot={-3} color={TEAL} />
      <Logo />
      <Finish vignette={0.35} />
    </AbsoluteFill>
  );
};

const wrap = (C: React.FC) => () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <C />
  </PaletteCtx.Provider>
);
export const ThumbnailA = wrap(ThumbA);
export const ThumbnailB = wrap(ThumbB);
export const ThumbnailC = wrap(ThumbC);
