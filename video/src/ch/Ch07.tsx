// Chapter 7 · Not a Highlight Reel (heavy chapter: teal lines only, quiet titles, slower read)
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch07_highlight_reel.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Note, PALETTES, PaletteCtx, StepCtx} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Full, Gen} from './bits';

const N = words as Narration;
export const CH07_FRAMES = Math.ceil(N.duration * 30) + 30;
const W = '#EDE7DC';

const Reel: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Highlight text="NOT A HIGHLIGHT REEL" x={140} y={380} size={100} at={t.at('highlight')} seed={701} rot={-1} />
    <Note text="his personal life was hard" x={180} y={560} size={60} at={t.at('hard')} color={W} />
  </AbsoluteFill>
);

const Family: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="1871 · marries Mollie Day" x={160} y={160} size={64} at={t.at('married')} />
    <Note text="three kids" x={200} y={270} size={64} at={t.at('three kids')} />
    <Note text="1888 · they separate" x={160} y={420} size={64} at={t.at('1888')} />
    <Note text="years later · divorce" x={200} y={530} size={64} at={t.at('divorced')} />
  </AbsoluteFill>
);

const Sons: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="both of his sons died young" x={160} y={150} size={66} at={t.at('Both')} color={W} />
    <Note text="Day · 1889 · still a teenager" x={200} y={330} size={62} at={t.at('oldest')} />
    <Note text="Leigh · 1901 · pneumonia" x={200} y={460} size={62} at={t.at('younger')} />
  </AbsoluteFill>
);

const Wound: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/bierce/bierce_1892.jpg" w={905} h={1222} fit="contain" t0={t.at('And Bierce himself')} t1={t.at('By 1913')} z0={1} z1={1.05} bw="grayscale(1) contrast(1.2) brightness(0.7)" tag="Ambrose Bierce, 1892 · Wikimedia Commons" />
    <Note text="asthma, his whole life" x={70} y={760} size={52} at={t.at('asthma')} />
    <Note text="...and that head wound" x={90} y={860} size={52} at={t.at('head wound')} />
  </AbsoluteFill>
);

const Washington: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/dc/washington_1901.jpg" w={3840} h={3061} t0={t.at('By 1913')} t1={t.at("He's earned")} z0={1.1} z1={1.18} fy={0.35} bw="grayscale(1) contrast(1.2) brightness(0.55)" tag="Washington, D.C., 1901 · Library of Congress" />
    <Highlight text="WASHINGTON, D.C. · 1913" x={110} y={100} size={80} at={t.at('By 1913')} seed={703} rot={-1} />
    <Note text="famous." x={140} y={250} size={64} at={t.at('famous')} />
    <Card src="img/bierce/bierce_1896.png" x={1360} y={90} w={420} h={700} rot={3} at={t.at('twelve-volume') - 1} filter="grayscale(1) contrast(1.1)" />
    <Note text="12 volumes of everything he wrote" x={900} y={850} size={54} at={t.at('twelve-volume')} />
    <Note text="71 years old" x={160} y={360} size={64} at={t.at('71')} />
    <Note text="by any normal standard: done" x={180} y={470} size={60} at={t.at('normal')} />
  </AbsoluteFill>
);

const Porch: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch07_empty_porch" t0={t.at("He's earned")} t1={CH07_FRAMES} z0={1.02} z1={1.12} quiet trace={t.at('porch') + 2} brightness={0.85} />
    <Note text="he's earned the right to sit on a porch" x={120} y={100} size={58} at={t.at("He's earned")} color={W} />
    <Highlight text="AMBROSE BIERCE DOES NOT" x={120} y={760} size={80} at={t.at('does not')} seed={705} rot={-1} />
    <Highlight text="WANT TO SIT ON A PORCH." x={160} y={880} size={80} at={t.at('want to')} seed={707} rot={-1} />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH07_FRAMES} audio="audio/ch07_highlight_reel.wav" music="music/dix.mp3" musicVol={0.14}
      cuts={[
        [0, <Reel t={t} />],
        [at('He married') - 1, <Family t={t} />],
        [at('Both') - 1, <Sons t={t} />],
        [at('And Bierce himself') - 1, <Wound t={t} />],
        [at('By 1913') - 1, <Washington t={t} />],
        [at("He's earned") - 1, <Porch t={t} />],
      ]}
      stamps={['highlight', 'By 1913', 'does not']}
      writes={['hard', 'married', 'three kids', '1888', 'divorced', 'Both', 'oldest', 'younger', 'asthma', 'head wound', 'famous', 'twelve-volume', '71', 'normal', "He's earned"]}
    />
  );
};

export const Ch07: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.quiet}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
