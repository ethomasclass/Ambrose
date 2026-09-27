// Bierce's route on Mitchell's 1867 map of the United States (it reaches into northern Mexico, so
// one map carries the whole story). Camera keys are in map pixels; the camera glides smoothly while
// pins, legs and labels step at 12 fps like every other mark.
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {clamp} from '../lib/anim';
import {INK, JF, Tag, useGFrame, usePal} from '../jh/Kit';

export const MAP = {w: 3840, h: 2438, src: 'img/maps/mitchell_us_1867.jpg'};
export const MAP_TAG = "Mitchell's Map of the United States and Territories, 1867 · Geographicus via Wikimedia Commons";

/** Places in map pixels (read off the 3840 px scan). */
export const P = {
  meigs: [2765, 1120], warsaw: [2470, 965], shiloh: [2290, 1440], chattanooga: [2540, 1440], kennesaw: [2540, 1522],
  omaha: [1882, 997], kearny: [1745, 1045], laramie: [1440, 905], saltlake: [880, 905], sf: [300, 1100],
  deadwood: [1470, 760], dc: [2958, 1113], neworleans: [2230, 1878], sanantonio: [1800, 1905],
  elpaso: [1228, 1690], juarez: [1222, 1702], tierrablanca: [1240, 1728], chihuahua: [1312, 1910],
  ojinaga: [1322, 1848], sierramojada: [1460, 2035],
} satisfies Record<string, number[]>;

export type Cam = {f: number; x: number; y: number; s: number};

export const camAt = (keys: Cam[], frame: number): Cam => {
  if (frame <= keys[0].f) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame < b.f) {
      const t = Easing.inOut(Easing.cubic)((frame - a.f) / Math.max(1, b.f - a.f));
      return {f: frame, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * t)};
    }
  }
  return keys[keys.length - 1];
};

/** A leg of the journey: drawn on between frames a and b; `dashed` for the last leg off the map. */
export type Leg = {pts: number[][]; a: number; b: number; dashed?: boolean; color?: string};
export type Pin = {p: number[]; at: number; label?: string; dx?: number; dy?: number; x?: boolean};

const pathLen = (pts: number[][]) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

/** A gently bowed curve through two points, as a polyline (so it can be drawn on and dashed). */
export const arc = (a: number[], b: number[], bow = 0.18, n = 40) => {
  const mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bow;
  const my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bow;
  return Array.from({length: n + 1}, (_, i) => {
    const u = i / n;
    return [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * my + u * u * b[1]];
  });
};

export const RouteMap: React.FC<{keys: Cam[]; legs?: Leg[]; pins?: Pin[]; dim?: number; children?: React.ReactNode; tagTop?: boolean; faded?: Leg[]}> = ({keys, legs = [], pins = [], dim = 0, children, tagTop, faded = []}) => {
  const frame = useCurrentFrame();
  const g = useGFrame();
  const pal = usePal();
  const cam = camAt(keys, frame);
  const s = cam.s;
  const toScreen = ([x, y]: number[]) => [960 + (x - cam.x) * s, 540 + (y - cam.y) * s];
  const lw = 7 / Math.max(s, 0.35);
  const drawLeg = (l: Leg, i: number, opacity = 1) => {
    const p = interpolate(g, [l.a, l.b], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
    if (p <= 0) return null;
    const L = pathLen(l.pts);
    let d = 0;
    const out: number[][] = [l.pts[0]];
    for (let k = 1; k < l.pts.length; k++) {
      const seg = Math.hypot(l.pts[k][0] - l.pts[k - 1][0], l.pts[k][1] - l.pts[k - 1][1]);
      if (d + seg >= p * L) {
        const u = (p * L - d) / seg;
        out.push([l.pts[k - 1][0] + (l.pts[k][0] - l.pts[k - 1][0]) * u, l.pts[k - 1][1] + (l.pts[k][1] - l.pts[k - 1][1]) * u]);
        break;
      }
      out.push(l.pts[k]);
      d += seg;
    }
    const dStr = 'M' + out.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
    const head = out[out.length - 1];
    return (
      <g key={i} opacity={opacity}>
        <path d={dStr} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={lw * 1.45} strokeLinejoin="round" strokeLinecap="round" transform={`translate(${4 / s} ${6 / s})`}
          strokeDasharray={l.dashed ? `${40} ${30}` : undefined} />
        <path d={dStr} fill="none" stroke={l.color ?? pal.mark} strokeWidth={lw} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={l.dashed ? `${40} ${30}` : undefined} />
        {p < 1 && <circle cx={head[0]} cy={head[1]} r={8 / Math.max(s, 0.35)} fill={l.color ?? pal.mark} stroke={INK} strokeWidth={3 / Math.max(s, 0.35)} />}
      </g>
    );
  };
  return (
    <AbsoluteFill style={{background: '#15130f', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 960 - cam.x * s, top: 540 - cam.y * s, width: MAP.w * s, height: MAP.h * s}}>
        <Img src={staticFile(MAP.src)} style={{width: '100%', height: '100%', filter: `grayscale(1) sepia(0.25) contrast(1.2) brightness(${0.8 - dim})`, boxShadow: '0 30px 80px rgba(0,0,0,0.8)'}} />
        <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={MAP.w * s} height={MAP.h * s} viewBox={`0 0 ${MAP.w} ${MAP.h}`}>
          {faded.map((l, i) => drawLeg(l, 100 + i, 0.35))}
          {legs.map((l, i) => drawLeg(l, i))}
        </svg>
      </div>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(8,6,4,0.8) 100%)'}} />
      {pins.map((pin, i) => {
        if (g < pin.at) return null;
        const [x, y] = toScreen(pin.p);
        const k = interpolate(g, [pin.at, pin.at + 3, pin.at + 6], [0, 1.35, 1], clamp);
        return (
          <React.Fragment key={i}>
            {pin.x
              ? <div style={{position: 'absolute', left: x - 24, top: y - 42, fontFamily: JF.sans, fontWeight: 800, fontSize: 70, color: pal.subject, transform: `scale(${k})`, textShadow: '0 2px 8px #000'}}>✕</div>
              : <div style={{position: 'absolute', left: x - 12, top: y - 12, width: 24, height: 24, borderRadius: '50%', background: pal.mark, border: `4px solid ${INK}`, transform: `scale(${k})`, boxShadow: '0 0 0 4px rgba(47,224,196,0.35)'}} />}
            {pin.label && (
              <div style={{position: 'absolute', left: x + (pin.dx ?? 18), top: y + (pin.dy ?? -60), fontFamily: '"Nanum Pen Script", cursive', fontSize: 62, color: pal.mark, whiteSpace: 'nowrap', transform: 'rotate(-3deg)',
                textShadow: '0 0 2px #111, 0 0 4px #111, 2px 2px 0 #111, -2px 2px 0 #111, 2px -2px 0 #111, -2px -2px 0 #111, 0 3px 12px rgba(0,0,0,0.7)',
                clipPath: `inset(-20% ${(1 - interpolate(g, [pin.at + 2, pin.at + 10], [0, 1], clamp)) * 100}% -20% -5%)`}}>{pin.label}</div>
            )}
          </React.Fragment>
        );
      })}
      {children}
      <Tag text={MAP_TAG} y={tagTop ? 40 : 1030} />
    </AbsoluteFill>
  );
};

/** Bierce's whole life as one line across the map (schematic), for the recap in chapter 9. */
export const LIFE: number[][][] = [
  arc(P.meigs, P.warsaw, 0.1), arc(P.warsaw, P.shiloh, 0.1), arc(P.shiloh, P.kennesaw, -0.15), arc(P.kennesaw, P.omaha, 0.12),
  [P.omaha, P.kearny, P.laramie, P.saltlake, P.sf], arc(P.sf, P.deadwood, -0.15), arc(P.deadwood, P.sf, -0.1), arc(P.sf, P.dc, -0.2),
  arc(P.dc, P.kennesaw, 0.1), arc(P.kennesaw, P.neworleans, 0.1), arc(P.neworleans, P.sanantonio, 0.1), arc(P.sanantonio, P.elpaso, 0.1),
  arc(P.juarez, P.chihuahua, -0.1),
];
