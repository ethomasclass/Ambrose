// Chapter 9 · Walking Off the Map (theories, the answer, the ending; read slower)
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch09_off_the_map.words.json';
import {clamp} from '../lib/anim';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {DarkPaper} from './common';
import {Chapter, Full, Gen, has, MusicBed, Quote, Stamp, StrikeLine, TabCard} from './bits';
import {LIFE, P, RouteMap} from './map';

const N = words as Narration;
const END = Math.ceil(N.duration * 30);
export const CH09_FRAMES = END + 45;

const Letter: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch01_last_letter" t0={0} t1={t.at('US officials')} z0={1.1} z1={1.18} trace={t.at('The letter') + 2} />
    <Highlight text="DECEMBER 26, 1913" x={110} y={100} size={88} at={t.at('December')} seed={901} rot={-2} />
    <Note text="the letter." x={140} y={240} size={60} at={t.at('The letter')} />
    <Note text="“unknown destination.”" x={170} y={330} size={60} at={t.at('unknown')} />
    <Note text="...and then, silence." x={1100} y={900} size={64} at={t.at('silence')} color="#ffffff" />
  </AbsoluteFill>
);

const Guessing: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('US officials'), x: 1330, y: 1850, s: 1.1}]} dim={0.25}
    pins={[{p: P.juarez, at: t.at('US officials'), label: 'Juárez', dx: -170, dy: -60}, {p: P.chihuahua, at: t.at('US officials') + 3, label: 'Chihuahua', dx: 20, dy: 10}]}>
    <Note text="U.S. officials asked around" x={140} y={110} size={60} at={t.at('asked')} />
    <Note text="even among Villa's own men" x={170} y={210} size={60} at={t.at("Villa's")} />
    <Note text="the stories didn't match" x={200} y={310} size={60} at={t.at('match')} color="#FF9F1C" />
    <Highlight text="100+ YEARS OF GUESSING" x={130} y={850} size={96} at={t.at('guessing')} seed={903} rot={-2} />
  </RouteMap>
);

const Ojinaga: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/mexico/ojinaga_1914.jpg" w={1920} h={1537} t0={t.at('Maybe he died')} t1={t.at('Maybe he was')} z0={1.1} z1={1.18} tag="Federal troops at Ojinaga, watching the rebels advance, 1914 · Library of Congress" />
    <Note text="theory 1:" x={120} y={100} size={60} at={t.at('Maybe he died')} />
    <Highlight text="KILLED AT OJINAGA" x={110} y={190} size={100} at={t.at('Ojinaga')} seed={905} rot={-2} />
    <Note text="January 1914" x={140} y={360} size={60} at={t.at('January')} />
  </AbsoluteFill>
);

const Mojada: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch09_sierra_mojada" t0={t.at('Maybe he was')} t1={t.at('It says')} trace={t.at('firing') + 2} quiet />
    <Note text="theory 2: a firing squad in..." x={120} y={100} size={56} at={t.at('Maybe he was')} />
    <Highlight text="SIERRA MOJADA" x={110} y={200} size={100} at={t.at('Sierra')} seed={907} rot={-2} />
    <Note text="a priest collects the old-timers' stories" x={130} y={840} size={52} at={t.at('priest')} />
    <Note text="2004: he puts up a gravestone" x={160} y={930} size={56} at={t.at('2004')} />
    <Tag text="Illustration · a desert cemetery, Coahuila" y={40} />
  </AbsoluteFill>
);

const Suppose: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Quote t={t} n={N} from="very trustworthy" text="“very trustworthy witnesses suppose”" source="— GRAVESTONE, SIERRA MOJADA, 2004" size={100} y={260} keys={['suppose']} />
    <Note text="it says..." x={170} y={140} size={60} at={t.at('It says')} />
    <Stamp text="SUPPOSE." x={180} y={620} size={130} at={t.at('Suppose not')} rot={-4} color="#FF6F61" />
    <Note text="not exactly proof." x={900} y={680} size={66} at={t.at('Not exactly')} />
  </AbsoluteFill>
);

const Nickell: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="theory 3: maybe he never went deep into Mexico" x={120} y={100} size={54} at={t.at('Or maybe')} />
    <Highlight text="JOE NICKELL" after="INVESTIGATOR" x={120} y={220} size={80} at={t.at('Nickell')} seed={909} rot={-2} />
    <Note text="the original of that last letter?" x={150} y={420} size={60} at={t.at('original')} />
    <Stamp text="NEVER FOUND." x={180} y={560} size={110} at={t.at('never been found')} rot={-4} color="#FF6F61" />
    <Note text="only a copy, in his secretary's notebook" x={170} y={760} size={56} at={t.at('copy')} />
  </AbsoluteFill>
);

const Canyon: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    {has('img/mexico/grand_canyon_1906.jpg')
      ? <Full src="img/mexico/grand_canyon_1906.jpg" w={1211} h={1536} t0={t.at('Nickell thinks')} t1={t.at('And yes')} z0={1.02} z1={1.1} fy={0.4} bw="grayscale(1) contrast(1.25) brightness(0.75)" tag="Grand Canyon, from near Grand View Hotel, 1906 · Library of Congress" />
      : <DarkPaper />}
    <Note text="Nickell's guess:" x={120} y={100} size={58} at={t.at('Nickell thinks')} />
    <Highlight text="THE GRAND CANYON" x={110} y={200} size={100} at={t.at('Grand Canyon')} seed={911} rot={-2} />
    <Note text="to quietly end his own life" x={140} y={360} size={56} at={t.at('quietly')} color="#ffffff" />
  </AbsoluteFill>
);

const Aliens: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="aliens took him?" x={160} y={200} size={80} at={t.at('aliens')} />
    <Note text="← a 1955 sci-fi story" x={260} y={340} size={60} at={t.at('1955')} />
    <StrikeLine x={150} y={260} w={600} at={t.at('Not evidence')} />
    <Note text="fun story. not evidence." x={200} y={500} size={70} at={t.at('Fun story')} color="#FF9F1C" />
  </AbsoluteFill>
);

const Nobody: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill style={{background: '#0b0a08'}}>
    <Note text="the truth is..." x={300} y={300} size={70} at={t.at('The truth')} />
    <Stamp text="NOBODY KNOWS." x={300} y={440} size={170} at={t.at('nobody')} rot={-4} color="#FF6F61" />
  </AbsoluteFill>
);

const Question: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: 0, x: 1900, y: 1300, s: 0.44}]} dim={0.55}>
    <Note text="so, back to our question..." x={200} y={200} size={60} at={t.at('So back')} />
    <Highlight text="HOW DOES ONE MAN" x={200} y={330} size={110} at={t.at('How does')} seed={913} rot={-2} />
    <Highlight text="LIVE THAT MANY LIVES?" x={240} y={510} size={110} at={t.at('live that')} seed={915} rot={-1} />
  </RouteMap>
);

const FOUR: [string, string, string][] = [
  ['img/gen/ch02_printers_devil.png', "PRINTER'S DEVIL", 'devil'],
  ['img/war/kennesaw_view.jpg', 'MAPMAKER', 'mapmaker'],
  ['img/news/examiner_1896.jpg', 'COLUMNIST', 'columnist'],
  ['img/mexico/villa_riding_1914.jpg', 'WAR CORRESPONDENT', 'correspondent'],
];

const Again: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="look at them again:" x={120} y={80} size={58} at={t.at('Look at them')} />
    {FOUR.map(([src, label, cue], i) => (
      <TabCard key={label} src={has(src) ? src : 'img/news/wasp_1881.jpg'} label={label} x={110 + i * 440} y={220} w={400} h={320} rot={i % 2 ? 3 : -3} at={t.at(cue) - 1} pos={i === 2 ? 'center 10%' : 'center'} />
    ))}
    <Note text="remember that kid covered in ink?" x={200} y={700} size={64} at={t.at('Remember that')} />
    <Highlight text="SAME JOB, EVERY TIME." x={200} y={820} size={96} at={t.at('same job')} seed={917} rot={-2} />
  </AbsoluteFill>
);

const Job: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Highlight text="GO WHERE THE TROUBLE IS." x={160} y={220} size={100} at={t.at('Go where')} seed={919} rot={-2} />
    <Highlight text="LOOK AT IT HARD." x={200} y={420} size={100} at={t.at('Look at it')} seed={921} rot={-1} />
    <Highlight text="WRITE DOWN WHAT YOU SEE." x={240} y={620} size={100} at={t.at('Write down')} seed={923} rot={-2} />
  </AbsoluteFill>
);

const Leaving: React.FC<{t: Timeline}> = ({t}) => {
  const a = t.at('The jobs');
  const legs = LIFE.map((pts, i) => ({pts, a: a + i * 5, b: a + i * 5 + 8}));
  return (
    <RouteMap keys={[{f: a, x: 1700, y: 1350, s: 0.42}, {f: t.at('stone wall') + 20, x: 1500, y: 1500, s: 0.5}]} legs={legs} dim={0.2}
      pins={[{p: P.meigs, at: a}, {p: P.chihuahua, at: a + LIFE.length * 5 + 8}]}>
      <Note text="the jobs kept changing..." x={140} y={100} size={60} at={a} />
      <Note text="because he kept leaving" x={170} y={200} size={64} at={t.at('kept leaving')} color="#FF9F1C" />
      <Note text="never settled down" x={1200} y={760} size={58} at={t.at('settle')} />
      <Note text="even at 71" x={1220} y={850} size={58} at={t.at('Even at')} />
      <Note text="“a stone wall beats old age”" x={140} y={940} size={56} at={t.at('stone wall')} color="#ffffff" />
    </RouteMap>
  );
};

const End: React.FC<{t: Timeline}> = ({t}) => {
  const frame = useCurrentFrame();
  const black = interpolate(frame, [END - 10, END + 25], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Gen name="ch09_off_the_map" t0={t.at('He spent')} t1={END + 45} z0={1.0} z1={1.16} fy={0.55} trace={t.at('never got') + 2} quiet />
      <Note text="being here... being gone" x={140} y={110} size={58} at={t.at('blurry')} out={t.at('He said')} color="#ffffff" />
      <Tag text="Illustration · the Chihuahua desert, 1914" y={40} />
      <AbsoluteFill style={{background: '#000', opacity: black}} />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH09_FRAMES} audio="audio/ch09_off_the_map.wav"
      extra={<><MusicBed src="music/cold_open.mp3" from={0} to={at('So back') + 10} /><MusicBed src="music/ending.mp3" from={at('So back') - 5} to={CH09_FRAMES - 10} vol={0.16} /></>}
      cuts={[
        [0, <Letter t={t} />],
        [at('US officials') - 1, <Guessing t={t} />],
        [at('Maybe he died') - 1, <Ojinaga t={t} />],
        [at('Maybe he was') - 1, <Mojada t={t} />],
        [at('It says') - 1, <Suppose t={t} />],
        [at('Or maybe') - 1, <Nickell t={t} />],
        [at('Nickell thinks') - 1, <Canyon t={t} />],
        [at('And yes') - 1, <Aliens t={t} />],
        [at('The truth') - 1, <Nobody t={t} />],
        [at('So back') - 1, <Question t={t} />],
        [at('Look at them') - 1, <Again t={t} />],
        [at('Go where') - 1, <Job t={t} />],
        [at('The jobs') - 1, <Leaving t={t} />],
        [at('He spent') - 1, <End t={t} />],
      ]}
      stamps={['December', 'guessing', 'Ojinaga', 'Sierra', 'Suppose not', 'Nickell', 'never been found', 'Grand Canyon', 'nobody', 'How does', 'live that', 'same job', 'Go where', 'Look at it', 'Write down']}
      writes={['The letter', 'unknown', 'silence', 'asked', "Villa's", 'match', 'Maybe he died', 'January', 'Maybe he was', 'priest', '2004', 'It says', 'Not exactly', 'Or maybe', 'original', 'copy', 'Nickell thinks', 'quietly', 'aliens', '1955', 'Fun story', 'The truth', 'So back', 'Look at them', 'Remember that', 'kept leaving', 'settle', 'Even at', 'stone wall', 'blurry']}
      ticks={['devil', 'mapmaker', 'columnist', 'correspondent']}
    />
  );
};

export const Ch09: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
