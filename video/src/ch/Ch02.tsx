// Chapter 2 · Thirteen A's
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch02_thirteen_as.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {DarkPaper} from './common';
import {Chapter, Def, Gen, Stamp, StrikeLine} from './bits';
import {P, RouteMap} from './map';

const N = words as Narration;
export const CH02_FRAMES = Math.ceil(N.duration * 30) + 30;

const Ohio: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: 0, x: P.meigs[0] - 245, y: P.meigs[1] - 98, s: 0.55}, {f: t.at('Ohio') + 10, x: P.meigs[0] - 65, y: P.meigs[1] - 33, s: 0.917}]}
    pins={[{p: P.meigs, at: t.at('Meigs'), label: 'Meigs County, Ohio', dx: -300, dy: 30}]}>
    <Highlight text="1842" x={110} y={100} size={110} at={t.at('1842')} seed={201} rot={-2} />
    <Note text="born in a log cabin" x={140} y={270} size={60} at={t.at('log')} />
  </RouteMap>
);

const NAMES = ['Abigail', 'Amelia', 'Ann', 'Addison', 'Aurelius'];

const As: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="kid number ten..." x={120} y={90} size={60} at={t.at('number ten')} />
    <Highlight text="OF THIRTEEN" x={760} y={70} size={96} at={t.at('thirteen')} seed={203} rot={-2} />
    <Note text="every single name started with..." x={140} y={250} size={56} at={t.at('every single')} />
    <Stamp text="A" x={1250} y={170} size={220} at={t.at('with A') + 6} color="#FF6F61" />
    {NAMES.map((n, i) => <Highlight key={n} text={n.toUpperCase()} x={170 + (i % 3) * 540} y={480 + Math.floor(i / 3) * 170} size={76} at={t.at(n)} seed={210 + i} rot={i % 2 ? 2 : -2} />)}
    <Note text="...you get the idea." x={1250} y={680} size={60} at={t.at('You get')} />
  </AbsoluteFill>
);

const Devil: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch02_printers_devil" t0={t.at('The family')} t1={t.at("Don't worry")} z0={1.02} z1={1.1} trace={t.at('devil') + 2} />
    <Note text="poor... but they read constantly" x={120} y={100} size={56} at={t.at('poor')} out={t.at('And at')} />
    <Note text="age 15:" x={120} y={100} size={64} at={t.at('And at')} />
    <Highlight text="PRINTER'S DEVIL" x={110} y={200} size={96} at={t.at("printer's devil")} seed={220} rot={-2} />
    <Note text="at an anti-slavery newspaper in Indiana" x={140} y={360} size={52} at={t.at('anti-slavery')} />
    <Tag text="Illustration · a small-town print shop, 1857" />
  </AbsoluteFill>
);

const Intern: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="a demon?" x={140} y={110} size={70} at={t.at("Don't worry")} />
    <StrikeLine x={130} y={165} w={300} at={t.at('spooky')} />
    <Highlight text="PRINTER'S DEVIL" x={110} y={250} size={90} at={t.at("printer's devil", 2)} seed={222} rot={-2} />
    <Def term="print·er's dev·il" text="the lowest kid in a print shop, stuck with the dirtiest jobs" x={130} y={410} at={t.at('lowest')} />
    <Note text="= an unpaid intern" x={170} y={600} size={64} rot={-3} at={t.at('unpaid')} />
    <Note text="+ hauling heavy metal type" x={200} y={700} size={60} rot={-3} at={t.at('hauling')} />
    <Note text="+ ink all over yourself" x={230} y={800} size={60} rot={-3} at={t.at('ink')} />
  </AbsoluteFill>
);

const Thought: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('But notice'), x: P.warsaw[0], y: P.warsaw[1] + 98, s: 0.734}, {f: t.at('Hold') + 20, x: P.warsaw[0], y: P.warsaw[1] + 98, s: 0.825}]}
    pins={[{p: P.warsaw, at: t.at('But notice'), label: 'Indiana', dx: 20, dy: -70}]} dim={0.1}>
    <Note text="not old enough to shave..." x={140} y={120} size={58} at={t.at('shave')} />
    <Note text="already working at a newspaper" x={170} y={220} size={58} at={t.at('already')} />
    <Highlight text="HOLD THAT THOUGHT." x={130} y={820} size={110} at={t.at('Hold')} seed={224} rot={-2} />
  </RouteMap>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH02_FRAMES} audio="audio/ch02_thirteen_as.wav" music="music/schools.mp3"
      cuts={[
        [0, <Ohio t={t} />],
        [at('He was number') - 1, <As t={t} />],
        [at('The family') - 1, <Devil t={t} />],
        [at("Don't worry") - 1, <Intern t={t} />],
        [at('But notice') - 1, <Thought t={t} />],
      ]}
      stamps={['1842', 'thirteen', ...NAMES, "printer's devil", 'Hold']}
      writes={['log', 'number ten', 'every single', 'You get', 'poor', 'And at', 'anti-slavery', "Don't worry", 'unpaid', 'hauling', 'ink', 'shave', 'already']}
      ticks={['Meigs']}
    />
  );
};

export const Ch02: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
