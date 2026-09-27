// Chapter 6 · Name Your Price
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch06_my_price.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Arrow, Highlight, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Full, Gen, has, Quote, Stamp} from './bits';
import {arc, P, RouteMap} from './map';

const N = words as Narration;
export const CH06_FRAMES = Math.ceil(N.duration * 30) + 30;

const Capital: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/dc/washington_1901.jpg" w={3840} h={3061} t0={0} t1={t.at("Here's the")} z0={1.25} z1={1.35} fx={0.58} fy={0.3} tag="Washington, D.C., looking toward the Capitol, 1901 · Library of Congress" />
    <Note text="my favorite Bierce moment:" x={120} y={110} size={60} at={t.at('favorite')} />
    <Highlight text="1896" x={110} y={220} size={130} at={t.at('1896')} seed={601} rot={-2} />
  </AbsoluteFill>
);

const Loan: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="the setup:" x={120} y={90} size={60} at={t.at("Here's the")} />
    <Highlight text="U.S. GOVERNMENT" x={120} y={260} size={80} at={t.at('government')} seed={603} rot={-2} />
    <Arrow x1={900} y1={320} x2={1200} y2={320} bow={-30} at={t.at('loaned') - 4} width={6} />
    <Note text="a fortune in loans" x={880} y={400} size={56} at={t.at('fortune')} />
    <Highlight text="RAILROADS" x={1240} y={260} size={80} at={t.at('the railroads')} seed={605} rot={2} />
    <Note text="to build the transcontinental railroad" x={600} y={560} size={56} at={t.at('transcontinental')} />
  </AbsoluteFill>
);

const Huntington: React.FC<{t: Timeline}> = ({t}) => {
  const face = has('img/news/huntington_1890.jpg') ? 'img/news/huntington_1890.jpg' : 'img/news/huntington_octopus_1896.png';
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Card src={face} x={110} y={100} w={520} h={650} rot={-3} at={t.at('Now railroad') - 1} />
      <Loop cx={370} cy={330} rx={150} ry={190} tilt={-5} at={t.at('Collis') + 3} dur={10} width={6} seed={607} />
      <Highlight text="COLLIS HUNTINGTON" x={720} y={100} size={86} at={t.at('Collis')} seed={609} rot={-2} />
      <Note text="one of the richest men in America" x={740} y={250} size={54} at={t.at('richest')} />
      <Card src="img/news/huntington_octopus_1896.png" x={760} y={420} w={760} h={450} rot={2} at={t.at('bill') - 1} filter="grayscale(1) contrast(1.15)" />
      <Note text="his bill: off the hook" x={1100} y={920} size={58} at={t.at('hook')} color="#FF9F1C" />
      <Tag text="C. P. Huntington, c. 1890 · “Huntington as an octopus,” San Francisco Examiner, 1896 · Wikimedia Commons" />
    </AbsoluteFill>
  );
};

const Send: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('So Hearst'), x: 2686, y: 1674, s: 0.281}]}
    legs={[{pts: arc(P.sf, P.dc, -0.22), a: t.at('sends'), b: t.at('Washington') + 6}]}
    pins={[{p: P.sf, at: t.at('So Hearst'), label: 'San Francisco', dx: 20, dy: 10}, {p: P.dc, at: t.at('Washington'), label: 'Washington', dx: -280, dy: 10}]}>
    <Note text="Hearst sends Bierce east..." x={140} y={110} size={60} at={t.at('sends')} />
    <Stamp text="TO KILL IT." x={140} y={820} size={130} at={t.at('kill')} rot={-4} />
  </RouteMap>
);

const Steps: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch06_capitol_steps" t0={t.at('And one')} t1={t.at('Bierce did')} trace={t.at('walks up') + 2} />
    <Note text="the steps of the Capitol" x={120} y={100} size={60} at={t.at('steps')} />
    <Highlight text="“NAME YOUR PRICE.”" x={110} y={200} size={96} at={t.at('name his')} seed={611} rot={-2} />
    <Note text="everybody has a price, right?" x={1000} y={900} size={56} at={t.at('Everybody')} />
    <Tag text="Illustration · the Capitol steps, 1896" y={40} />
  </AbsoluteFill>
);

const Price: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="Bierce did." x={140} y={120} size={76} at={t.at('Bierce did')} />
    <Stamp text="$130,000,000" x={140} y={330} size={190} at={t.at('130')} rot={-4} color="#FF6F61" />
    <Note text="the exact amount the railroads owed" x={170} y={650} size={64} at={t.at('exact')} />
  </AbsoluteFill>
);

const Reply: React.FC<{t: Timeline}> = ({t}) => (
  <Quote t={t} n={N} from="If when you" text="“If, when you are ready to pay, I happen to be out of town, you may hand it over to my friend, the Treasurer of the United States.”"
    source="— AMBROSE BIERCE TO COLLIS HUNTINGTON, 1896" size={72} y={170} keys={['treasurer', 'united', 'states']} />
);

const Died: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/news/examiner_1896.jpg" w={1920} h={2587} t0={t.at('That line')} t1={t.at('So soldier')} z0={1.3} z1={1.45} fy={0.2} bw="grayscale(1) contrast(1.2) brightness(0.8)" tag="The Examiner, San Francisco, 1896 · Wikimedia Commons" />
    <Note text="the line runs in papers all over the country" x={120} y={110} size={56} at={t.at('ran')} />
    <Note text="people: furious" x={150} y={210} size={60} at={t.at('furious')} />
    <Stamp text="THE BILL DIED." x={140} y={800} size={140} at={t.at('died')} rot={-4} color="#FF6F61" />
  </AbsoluteFill>
);

const Tally: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="so far:" x={120} y={90} size={64} at={t.at('So soldier')} />
    <Note text="✓ soldier" x={170} y={220} size={70} at={t.at('soldier')} />
    <Note text="✓ mapmaker" x={170} y={330} size={70} at={t.at('mapmaker')} />
    <Note text="✓ failed mine manager" x={170} y={440} size={70} at={t.at('failed')} />
    <Highlight text="THE REPORTER WHO BEAT" x={160} y={600} size={90} at={t.at('reporter')} seed={613} rot={-2} />
    <Highlight text="A RAILROAD TYCOON" x={200} y={760} size={90} at={t.at('tycoon')} seed={615} rot={-1} />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH06_FRAMES} audio="audio/ch06_my_price.wav" music={has('music/price.mp3') ? 'music/price.mp3' : 'music/abolition_b.mp3'}
      cuts={[
        [0, <Capital t={t} />],
        [at("Here's the") - 1, <Loan t={t} />],
        [at('Now railroad') - 1, <Huntington t={t} />],
        [at('So Hearst') - 1, <Send t={t} />],
        [at('And one') - 1, <Steps t={t} />],
        [at('Bierce did') - 1, <Price t={t} />],
        [at('If when you') - 1, <Reply t={t} />],
        [at('That line') - 1, <Died t={t} />],
        [at('So soldier') - 1, <Tally t={t} />],
      ]}
      stamps={['1896', 'government', 'the railroads', 'Collis', 'kill', 'name his', '130', 'died', 'reporter', 'tycoon']}
      writes={['favorite', "Here's the", 'fortune', 'transcontinental', 'richest', 'hook', 'sends', 'steps', 'Everybody', 'Bierce did', 'exact', 'ran', 'furious', 'So soldier', 'soldier', 'mapmaker', 'failed']}
      ticks={['Washington']}
    />
  );
};

export const Ch06: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
