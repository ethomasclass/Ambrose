// Chapter 1 · An Unknown Destination (cold open) + channel intro + title card.
import React from 'react';
import {AbsoluteFill, interpolate, Sequence} from 'remotion';
import words from '../../public/audio/ch01_cold_open.words.json';
import {clamp} from '../lib/anim';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, JF, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag, useGFrame, usePal} from '../jh/Kit';
import {Card, DarkPaper, Sfx} from './common';
import {ChannelIntro, INTRO_FRAMES} from './Intro';
import {Chapter, Full, Gen, has, Quote, Stamp, TabCard} from './bits';
import {arc, P, RouteMap} from './map';

const N = words as Narration;
export const TITLE_FRAMES = 150;
const END = Math.ceil(N.duration * 30) + 20;
export const CH01_FRAMES = END + INTRO_FRAMES + TITLE_FRAMES;

const Letter: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch01_last_letter" t0={0} t1={t.at('A 71-year-old')} z0={1.02} z1={1.12} trace={t.at('Chihuahua') + 4} />
    <Highlight text="DECEMBER 26, 1913" x={110} y={100} size={88} at={t.at('December')} seed={11} rot={-2} />
    <Note text="Chihuahua, Mexico" x={150} y={240} size={60} at={t.at('Chihuahua')} />
    <Tag text="Illustration · Chihuahua, 1913" />
  </AbsoluteFill>
);

const Old: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/bierce_1892.jpg" x={130} y={90} w={600} h={810} rot={-3} at={t.at('A 71-year-old') - 1} />
    <Loop cx={430} cy={300} rx={140} ry={170} tilt={-6} at={t.at('American') + 2} dur={10} width={6} seed={13} />
    <Note text="71 years old" x={860} y={130} size={70} rot={-3} at={t.at('71-year-old')} />
    <Note text="asthma" x={880} y={260} size={60} rot={-2} at={t.at('asthma')} />
    <Note text="a bullet scar in his skull" x={880} y={370} size={60} rot={-3} at={t.at('scar')} />
    <Note text="(from 1864)" x={940} y={460} size={50} rot={-3} at={t.at('fifty')} color="#ffffff" />
    <Note text="riding with a" x={880} y={590} size={60} rot={-3} at={t.at('riding')} />
    <Highlight text="REVOLUTIONARY ARMY" x={870} y={690} size={76} at={t.at('revolutionary')} seed={15} rot={-2} />
    <Tag text="Ambrose Bierce, photograph, 1892 · Wikimedia Commons" />
  </AbsoluteFill>
);

const LastLine: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Quote t={t} n={N} from="As to me" text="“As to me, I leave here tomorrow for an unknown destination.”" source="— LETTER FROM CHIHUAHUA, DECEMBER 26, 1913" keys={['unknown', 'destination']} />
    <Note text="his last line:" x={170} y={140} size={60} at={t.at('He finishes')} />
  </AbsoluteFill>
);

const OffMap: React.FC<{t: Timeline}> = ({t}) => {
  const a = t.at('And then');
  const walk = t.at('walks');
  return (
    <RouteMap
      keys={[{f: a - 2, x: P.chihuahua[0] + 60, y: P.chihuahua[1] + 80, s: 1.4}, {f: t.at('map') + 20, x: P.chihuahua[0] + 160, y: P.chihuahua[1] + 180, s: 1.0}]}
      legs={[{pts: arc(P.chihuahua, [1700, 2330], 0.15), a: walk - 4, b: t.at('map') + 10, dashed: true}]}
      pins={[{p: P.chihuahua, at: a, label: 'Chihuahua', dx: -250, dy: -80}]}
      dim={0.1}
    >
      <Note text="no more letters." x={880} y={110} size={64} rot={-3} at={t.at('No more')} />
      <Note text="no body." x={900} y={210} size={64} rot={-3} at={t.at('No body')} />
      <Note text="no grave anyone can prove." x={920} y={310} size={64} rot={-3} at={t.at('No grave')} />
      <Stamp text="OFF THE MAP." x={130} y={860} size={110} at={t.at('off the map')} rot={-4} />
    </RouteMap>
  );
};

const Name: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/bierce/partington.jpg" w={1164} h={1471} fit="contain" t0={t.at('His name')} t1={t.at('Before that')} z0={1.0} z1={1.06} tag="J. H. E. Partington, portrait of Ambrose Bierce · Wikimedia Commons" />
    <Highlight text="AMBROSE BIERCE" x={100} y={100} size={100} at={t.at('Ambrose')} seed={17} rot={-2} />
    <Note text="1842 – ?" x={140} y={250} size={60} at={t.at('Bierce') + 6} />
    <Note text="vanishing at 71?" x={1300} y={700} size={58} rot={-4} at={t.at('vanishing')} />
    <Note text="not even the strangest part" x={1180} y={800} size={54} rot={-4} at={t.at('strangest')} />
  </AbsoluteFill>
);

const LIVES: [string, string, string, string?][] = [
  ['img/bierce/bierce_1866.jpg', 'SOLDIER', 'soldier', 'center 30%'],
  ['img/war/kennesaw_view.jpg', 'MAPMAKER', 'mapmaker'],
  ['img/west/london_dore_1872.jpg', 'LONDON HUMORIST', 'London'],
  ['img/west/deadwood_1876.jpg', 'MINE MANAGER', 'gold-mine'],
  ['img/news/examiner_1896.jpg', 'COLUMNIST', 'columnist', 'center 10%'],
  ['img/bierce/partington.jpg', 'HORROR WRITER', 'horror', 'center 40%'],
  ['img/news/huntington_octopus_1896.png', 'BRIBE BUSTER', 'bribe'],
];
const SLOTS = [[90, 60], [530, 90], [970, 60], [1410, 90], [310, 540], [750, 570], [1190, 540]];

const Wall: React.FC<{t: Timeline}> = ({t}) => {
  const g = useGFrame();
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Note text="before that, this man was..." x={640} y={470} size={56} at={t.at('Before that')} out={t.at('soldier')} />
      {LIVES.map(([src, label, cue, pos], i) => {
        const s = has(src) ? src : 'img/news/wasp_1881.jpg';
        return <TabCard key={i} src={s} label={label} x={SLOTS[i][0]} y={SLOTS[i][1]} w={400} h={300} rot={i % 2 ? 3 : -3} at={t.at(cue) - 1} pos={pos} />;
      })}
      <div style={{position: 'absolute', right: 60, bottom: 40, fontFamily: JF.mono, fontSize: 34, color: '#fff', opacity: g >= t.at('soldier') ? 1 : 0}}>
        LIVES: <span style={{color: '#FF6F61'}}>{LIVES.filter(([, , c]) => g >= t.at(c) - 1).length}</span>
      </div>
    </AbsoluteFill>
  );
};

const Seven: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="most people get..." x={200} y={170} size={64} rot={-3} at={t.at('Most people')} />
    <Highlight text="ONE LIFE." x={200} y={290} size={120} at={t.at('one life')} seed={19} rot={-2} />
    <Note text="maybe two." x={280} y={480} size={70} rot={-4} at={t.at('Maybe two')} />
    <Note text="Bierce got about..." x={200} y={640} size={64} rot={-3} at={t.at('Bierce got')} />
    <Stamp text="SEVEN." x={880} y={600} size={200} at={t.at('seven')} rot={-5} color="#FF6F61" />
  </AbsoluteFill>
);

const Question: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: 0, x: 1900, y: 1300, s: 0.44}]} dim={0.55}>
    <Note text="so here's the question..." x={200} y={200} size={60} at={t.at("So here's")} />
    <Highlight text="HOW DOES ONE MAN" x={200} y={330} size={110} at={t.at('How does')} seed={21} rot={-2} />
    <Highlight text="LIVE THAT MANY LIVES?" x={240} y={510} size={110} at={t.at('live that')} seed={23} rot={-1} />
  </RouteMap>
);

const Ink: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch02_printers_devil" t0={t.at('And the answer')} t1={END} z0={1.04} z1={1.12} />
    <Note text="it starts with..." x={120} y={110} size={60} at={t.at('And the answer')} />
    <Note text="a kid covered in ink" x={160} y={210} size={70} at={t.at('kid')} />
  </AbsoluteFill>
);

const Title: React.FC = () => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <RouteMap keys={[{f: 0, x: 1900, y: 1300, s: 0.44}, {f: TITLE_FRAMES, x: 1900, y: 1300, s: 0.47}]} dim={0.5}>
      <Highlight text="THE MAN WHO" x={250} y={250} size={130} at={4} seed={61} rot={-2} />
      <Highlight text="COULDN'T SIT STILL" x={250} y={450} size={130} at={8} seed={63} rot={-2} />
      {g >= 16 && <div style={{position: 'absolute', left: 300, top: 690, fontFamily: JF.display, fontSize: 72, color: pal.mark, textShadow: '0 3px 16px rgba(0,0,0,0.8)', opacity: interpolate(g, [16, 22], [0, 1], clamp)}}>Ambrose Bierce</div>}
      <Note text="1842 – 1914?" x={1240} y={760} size={56} rot={-5} at={26} />
    </RouteMap>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Letter t={t} />],
    [at('A 71-year-old') - 1, <Old t={t} />],
    [at('He finishes') - 1, <LastLine t={t} />],
    [at('And then') - 1, <OffMap t={t} />],
    [at('His name') - 1, <Name t={t} />],
    [at('Before that') - 1, <Wall t={t} />],
    [at('Most people') - 1, <Seven t={t} />],
    [at("So here's") - 1, <Question t={t} />],
    [at('And the answer') - 1, <Ink t={t} />],
    [END, <Sequence from={END} layout="none"><ChannelIntro /></Sequence>],
    [END + INTRO_FRAMES, <Sequence from={END + INTRO_FRAMES} layout="none"><Title /></Sequence>],
  ];
  return (
    <Chapter cuts={cuts.slice(0, -2).concat(cuts.slice(-2))} audio="audio/ch01_cold_open.wav" music="music/cold_open.mp3" musicVol={0.17} frames={END + 30} t={t}
      stamps={['December', 'revolutionary', 'off the map', 'Ambrose', 'one life', 'seven', 'How does', 'live that']}
      writes={['Chihuahua', '71-year-old', 'asthma', 'scar', 'fifty', 'riding', 'He finishes', 'No more', 'No body', 'No grave', 'vanishing', 'strangest', 'Most people', 'Maybe two', 'Bierce got', "So here's", 'And the answer', 'kid']}
      ticks={['soldier', 'mapmaker', 'London', 'gold-mine', 'columnist', 'horror', 'bribe']}
      extra={<Sfx at={END + INTRO_FRAMES + 4} src="sfx/stamp.wav" volume={0.4} />}
    />
  );
};

export const Ch01: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
