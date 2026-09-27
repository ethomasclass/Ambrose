// Chapter 4 · Go West, Young Grump
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch04_young_grump.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Full, has, Stamp} from './bits';
import {arc, P, RouteMap} from './map';

const N = words as Narration;
export const CH04_FRAMES = Math.ceil(N.duration * 30) + 30;

const West: React.FC<{t: Timeline}> = ({t}) => {
  const o = t.at('Omaha');
  const sf = t.at('Francisco');
  return (
    <RouteMap
      keys={[{f: 0, x: 1700, y: 1050, s: 0.62}, {f: o, x: 1500, y: 1000, s: 0.62}, {f: sf + 10, x: 1100, y: 1000, s: 0.5}, {f: t.at('stays') + 10, x: 900, y: 1050, s: 0.55}]}
      legs={[{pts: [P.omaha, P.kearny, P.laramie, P.saltlake, P.sf], a: o + 2, b: sf + 6}]}
      pins={[{p: P.omaha, at: o, label: 'Omaha', dx: 10, dy: 20}, {p: P.sf, at: sf, label: 'San Francisco', dx: 20, dy: 20}]}
    >
      <Highlight text="1866" x={110} y={100} size={110} at={t.at('1866')} seed={401} rot={-2} />
      <Note text="inspecting army forts on the Great Plains" x={140} y={260} size={50} at={t.at('inspect')} />
      <Card src="img/west/plains_1866.jpg" x={1440} y={520} w={380} h={420} rot={4} at={t.at('Horseback') - 1} />
      <Note text="quits the army for good..." x={140} y={820} size={58} at={t.at('quits')} />
      <Stamp text="...AND STAYS." x={150} y={900} size={100} at={t.at('stays')} rot={-4} />
    </RouteMap>
  );
};

const City: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/west/sf_panorama_1878.jpg" w={3840} h={409} t0={t.at('San Francisco', 2)} t1={t.at('And Bierce figures')} z0={1} z1={1} panX={[0.15, 0.6]} tag="Eadweard Muybridge, Panorama of San Francisco, 1878 · Wikimedia Commons" />
    <Highlight text="A GOLD RUSH BOOMTOWN" x={110} y={100} size={90} at={t.at('boomtown')} seed={403} rot={-2} />
    <Note text="miners · gamblers · con men" x={140} y={250} size={60} at={t.at('miners')} />
    <Note text="+ a whole lot of newspapers" x={170} y={350} size={60} at={t.at('newspapers')} />
  </AbsoluteFill>
);

const Talent: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/bierce_1866.jpg" x={1260} y={140} w={520} h={520} rot={3} at={t.at('And Bierce figures') - 1} />
    <Note text="his real talent:" x={140} y={110} size={64} at={t.at('real talent')} />
    <Highlight text="ROASTING PEOPLE." x={120} y={230} size={120} at={t.at('roasting')} seed={405} rot={-2} />
    {['Politicians', 'Preachers', 'Poets', 'Anybody'].map((w, i) => (
      <Note key={w} text={w.toLowerCase() + '.'} x={180 + i * 40} y={460 + i * 110} size={64} rot={-3} at={t.at(w)} color={i === 3 ? '#FF9F1C' : undefined} />
    ))}
    <Tag text="Ambrose Bierce, c. 1866 · Wikimedia Commons" />
  </AbsoluteFill>
);

const London: React.FC<{t: Timeline}> = ({t}) => {
  const dore = has('img/west/london_dore_1872.jpg');
  const src = dore ? 'img/west/london_dore_1872.jpg' : 'img/news/wasp_1881.jpg';
  return (
    <AbsoluteFill>
      <Full src={src} w={960} h={1223} fit="contain" t0={t.at('In 1872')} t1={t.at('Pen names')} z0={1} z1={1.06} tag={dore ? 'Gustave Doré, Ludgate Hill, from London: A Pilgrimage, 1872 · Wikimedia Commons' : 'The Wasp, 1881 (stand-in until the London picture arrives)'} />
      <Highlight text="LONDON, 1872" x={110} y={100} size={100} at={t.at('England')} seed={407} rot={-2} />
      <Note text="writing for a humor magazine called Fun" x={140} y={260} size={52} at={t.at('humor')} />
      <Note text="his first books, under a fake name:" x={120} y={760} size={50} at={t.at('first books')} />
      <Highlight text="“DOD GRILE”" x={110} y={850} size={96} at={t.at('Dod')} seed={409} rot={-2} />
    </AbsoluteFill>
  );
};

const Burner: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Highlight text="PEN NAME" x={120} y={140} size={110} at={t.at('Pen names')} seed={411} rot={-2} />
    <Note text="= the 1800s burner account" x={170} y={330} size={70} at={t.at('burner')} />
    <Note text="say savage things..." x={200} y={480} size={64} at={t.at('savage')} />
    <Note text="...keep a little distance" x={240} y={580} size={64} at={t.at('distance')} />
  </AbsoluteFill>
);

const Dakota: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('Back in'), x: 1000, y: 950, s: 0.6}, {f: t.at('Deadwood') + 10, x: P.deadwood[0], y: P.deadwood[1] + 40, s: 1.3}]}
    legs={[{pts: arc(P.sf, P.deadwood, -0.15), a: t.at('heads'), b: t.at('Deadwood') + 4}]}
    pins={[{p: P.deadwood, at: t.at('Deadwood'), label: 'Deadwood', dx: 20, dy: -70}]}>
    <Note text="something totally different..." x={140} y={110} size={58} at={t.at('totally')} />
    <Highlight text="AROUND 1880" x={120} y={210} size={90} at={t.at('1880')} seed={413} rot={-2} />
    <Note text="Dakota Territory" x={150} y={360} size={60} at={t.at('Dakota')} />
  </RouteMap>
);

const Deadwood: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/west/deadwood_1876.jpg" w={1920} h={2234} t0={t.at('Yes that')} t1={t.at('The company')} z0={1.02} z1={1.1} fy={0.55} tag="S. J. Morrow, Deadwood in 1876 · National Archives" />
    <Note text="yes, THAT Deadwood" x={120} y={110} size={70} at={t.at('Wild West')} />
    <Note text="his job:" x={140} y={760} size={58} at={t.at('His job')} />
    <Highlight text="GOLD-MINE MANAGER" x={130} y={850} size={96} at={t.at('managing')} seed={415} rot={-2} />
  </AbsoluteFill>
);

const Fails: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/west/gayville_1876.jpg" w={1920} h={1337} t0={t.at('The company')} t1={CH04_FRAMES} z0={1.05} z1={1.1} bw="grayscale(1) contrast(1.3) brightness(0.6)" tag="Gayville, Deadwood Gulch, Dakota Territory, 1876 · National Archives" />
    <Stamp text="FAILED." x={600} y={330} size={220} at={t.at('fails')} rot={-8} color="#FF6F61" />
    <Note text="that life lasts about a year" x={140} y={110} size={60} at={t.at('about a year')} />
    <Highlight text="BACK TO THE NEWSPAPERS." x={120} y={840} size={100} at={t.at('Back to')} seed={417} rot={-2} />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH04_FRAMES} audio="audio/ch04_young_grump.wav" music="music/temperance.mp3"
      cuts={[
        [0, <West t={t} />],
        [at('San Francisco', 2) - 1, <City t={t} />],
        [at('And Bierce figures') - 1, <Talent t={t} />],
        [at('In 1872') - 1, <London t={t} />],
        [at('Pen names') - 1, <Burner t={t} />],
        [at('Back in') - 1, <Dakota t={t} />],
        [at('Yes that') - 1, <Deadwood t={t} />],
        [at('The company') - 1, <Fails t={t} />],
      ]}
      stamps={['1866', 'stays', 'boomtown', 'roasting', 'England', 'Dod', 'Pen names', '1880', 'managing', 'fails', 'Back to']}
      writes={['inspect', 'quits', 'miners', 'newspapers', 'real talent', 'Politicians', 'Preachers', 'Poets', 'Anybody', 'humor', 'first books', 'burner', 'savage', 'distance', 'totally', 'Dakota', 'Wild West', 'His job', 'about a year']}
      ticks={['Omaha', 'Francisco', 'Deadwood']}
    />
  );
};

export const Ch04: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
