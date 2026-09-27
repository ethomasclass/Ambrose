// Chapter 3 · Broke Like a Walnut
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch03_walnut.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Def, Full, Gen, Lives, Stamp, StrikeLine} from './bits';

const N = words as Narration;
export const CH03_FRAMES = Math.ceil(N.duration * 30) + 30;

const Enlist: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/bierce_1866.jpg" x={1240} y={120} w={560} h={560} rot={3} at={t.at('Bierce') - 1} />
    <Highlight text="1861" x={110} y={100} size={120} at={t.at('1861')} seed={301} rot={-2} />
    <Note text="the Civil War starts" x={140} y={280} size={60} at={t.at('Civil War')} />
    <Note text="Bierce: just 18" x={160} y={380} size={60} at={t.at('18')} />
    <Highlight text="9TH INDIANA INFANTRY" x={130} y={490} size={80} at={t.at('9th')} seed={303} rot={-2} />
    <Note text="makes the newspapers:" x={160} y={680} size={56} at={t.at('makes the')} />
    <Note text="drags a wounded soldier to safety, under fire" x={190} y={770} size={52} at={t.at('drag')} />
    <Tag text="Ambrose Bierce, c. 1866 · Wikimedia Commons" />
  </AbsoluteFill>
);

const Shiloh: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/war/shiloh_thulstrup.jpg" w={3840} h={2795} t0={t.at('The next')} t1={t.at("That's more")} z0={1.05} z1={1.16} fy={0.55} tag="Thure de Thulstrup, Battle of Shiloh, chromolithograph, 1888 · Library of Congress" />
    <Highlight text="SHILOH" x={110} y={100} size={120} at={t.at('Shiloh')} seed={305} rot={-2} />
    <Note text="April 1862 · Tennessee · two days" x={140} y={280} size={56} at={t.at('Two days')} />
    <Stamp text="23,000+" x={130} y={700} size={170} at={t.at('23,000')} rot={-4} color="#FF6F61" />
    <Note text="killed, wounded or missing" x={180} y={900} size={56} at={t.at('killed')} />
  </AbsoluteFill>
);

const Compare: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="more than..." x={140} y={110} size={60} at={t.at("That's more")} />
    <Note text="the Revolution" x={200} y={240} size={66} rot={-2} at={t.at('Revolution')} />
    <Note text="+ the War of 1812" x={200} y={350} size={66} rot={-2} at={t.at('1812')} />
    <Note text="+ the Mexican War" x={200} y={460} size={66} rot={-2} at={t.at('Mexican')} />
    <Highlight text="< SHILOH" after="(TWO DAYS)" x={190} y={640} size={110} at={t.at('together')} seed={307} rot={-2} />
  </AbsoluteFill>
);

const Dead: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/war/shiloh_thulstrup.jpg" w={3840} h={2795} t0={t.at('Most old')} t1={t.at('He was good')} z0={1.3} z1={1.38} fx={0.35} fy={0.7} bw="grayscale(1) contrast(1.3) brightness(0.55)" tag="Thure de Thulstrup, Battle of Shiloh, 1888 · Library of Congress" />
    <Note text="old soldiers' stories: flags and bravery" x={140} y={140} size={60} at={t.at('flags')} />
    <StrikeLine x={130} y={200} w={1000} at={t.at('When Bierce')} />
    <Note text="Bierce told you about the dead." x={160} y={300} size={70} at={t.at('the dead')} color="#ffffff" />
  </AbsoluteFill>
);

const Hazen: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/war/hazen_crop.jpg" x={120} y={80} w={520} h={810} rot={-3} at={t.at('He was good') - 1} />
    <Note text="promoted: lieutenant" x={760} y={120} size={60} at={t.at('lieutenant')} />
    <Highlight text="TOPOGRAPHICAL ENGINEER" x={740} y={260} size={80} at={t.at('topographical')} seed={309} rot={-2} />
    <Note text="on the staff of..." x={780} y={420} size={56} at={t.at('for General')} />
    <Highlight text="GEN. WILLIAM HAZEN" x={760} y={520} size={80} at={t.at('Hazen')} seed={311} rot={-1} />
    <Loop cx={390} cy={300} rx={130} ry={170} tilt={-5} at={t.at('Hazen') + 3} dur={10} width={6} seed={313} />
    <Tag text="Gen. William B. Hazen, Brady studio, c. 1860–65 · National Archives" />
  </AbsoluteFill>
);

const Mapmaker: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch03_mapmaker" t0={t.at('That sounds')} t1={t.at('Then', 2)} trace={t.at('mapmaker') + 2} />
    <Note text="sounds fancy..." x={120} y={100} size={60} at={t.at('fancy')} />
    <Highlight text="= MAPMAKER" x={110} y={200} size={100} at={t.at('mapmaker')} seed={315} rot={-2} />
    <Note text="the human Google Maps" x={140} y={360} size={60} at={t.at('Google')} />
    <Note text="...sometimes while it's happening" x={900} y={900} size={56} at={t.at('sometimes')} />
    <Tag text="Illustration · a Union topographical officer, 1863" y={40} />
  </AbsoluteFill>
);

const Kennesaw: React.FC<{t: Timeline}> = ({t}) => {
  const frame = useCurrentFrame();
  const hit = t.at('head');
  return (
    <AbsoluteFill style={{transform: `scale(${frame >= hit ? 1.14 : 1})`}}>
      <Full src="img/war/kennesaw_view.jpg" w={1920} h={1297} t0={t.at('Then', 2)} t1={t.at('The bullet')} z0={1.04} z1={1.12} tag="George N. Barnard, view from Kennesaw Mountain, Georgia, c. 1864 · National Archives" />
      <Highlight text="JUNE 23, 1864" x={110} y={100} size={100} at={t.at('June')} seed={317} rot={-2} />
      <Note text="Kennesaw Mountain, Georgia" x={140} y={260} size={60} at={t.at('Kennesaw')} />
      <Note text="a Confederate sharpshooter" x={160} y={360} size={60} at={t.at('sharpshooter')} />
    </AbsoluteFill>
  );
};

const Flatcar: React.FC<{t: Timeline}> = ({t}) => (
  <PaletteCtx.Provider value={PALETTES.quiet}>
    <AbsoluteFill>
      <Gen name="ch03_flatcar" t0={t.at('The bullet')} t1={t.at('And he survives')} quiet brightness={0.8} trace={t.at('flatcar') + 2} />
      <Note text="skull cracked · bullet behind his left ear" x={120} y={100} size={54} at={t.at('cracks')} />
      <Note text="an open flatcar · two days · no roof" x={140} y={190} size={54} at={t.at('flatcar')} />
      <Highlight text="“BROKE LIKE A WALNUT”" x={120} y={840} size={96} at={t.at('broke')} seed={319} rot={-2} />
      <Tag text="Illustration · wounded soldiers on a flatcar, Georgia, 1864" y={40} />
    </AbsoluteFill>
  </PaletteCtx.Provider>
);

const Resign: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="he survives." x={140} y={120} size={70} at={t.at('And he survives')} />
    <Note text="back on duty that fall" x={170} y={240} size={60} at={t.at('back on')} />
    <Note text="but: headaches · fainting spells" x={170} y={350} size={60} at={t.at('headaches')} />
    <Highlight text="RESIGNS" after="JANUARY 1865" x={140} y={520} size={110} at={t.at('resigns')} seed={321} rot={-2} />
  </AbsoluteFill>
);

const Done: React.FC<{t: Timeline}> = ({t}) => {
  return (
    <AbsoluteFill>
      <DarkPaper />
      <Card src="img/bierce/bierce_1866.jpg" x={1180} y={160} w={600} h={600} rot={3} at={t.at("So that's") - 1} filter="grayscale(1) contrast(1.2)" />
      <Highlight text="LIFE #1: SOLDIER" x={120} y={180} size={100} at={t.at('life number')} seed={323} rot={-2} />
      <Stamp text="DONE." x={160} y={360} size={150} at={t.at('done')} rot={-5} color="#FF6F61" />
      <Note text="he is..." x={160} y={620} size={60} at={t.at('He is')} />
      <Stamp text="22" x={420} y={600} size={200} at={t.at('22')} rot={-4} />
      <Lives n={1} at={t.at('done')} />
    </AbsoluteFill>
  );
};

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH03_FRAMES} audio="audio/ch03_walnut.wav" music="music/civil_war.mp3"
      cuts={[
        [0, <Enlist t={t} />],
        [at('The next') - 1, <Shiloh t={t} />],
        [at("That's more") - 1, <Compare t={t} />],
        [Math.max(at('Most old') - 1, at('together') + 60), <Dead t={t} />],
        [at('He was good') - 1, <Hazen t={t} />],
        [Math.max(at('That sounds') - 1, at('Hazen') + 60), <Mapmaker t={t} />],
        [at('Then', 2) - 1, <Kennesaw t={t} />],
        [at('The bullet') - 1, <Flatcar t={t} />],
        [Math.max(at('And he survives') - 1, at('broke') + 60), <Resign t={t} />],
        [Math.max(at("So that's") - 1, at('resigns') + 60), <Done t={t} />],
      ]}
      stamps={['1861', '9th', 'Shiloh', '23,000', 'together', 'topographical', 'Hazen', 'mapmaker', 'June', 'broke', 'resigns', 'life number', 'done', '22']}
      writes={['Civil War', '18', 'makes the', 'drag', 'Two days', 'killed', "That's more", 'Revolution', '1812', 'Mexican', 'flags', 'the dead', 'lieutenant', 'for General', 'fancy', 'Google', 'sometimes', 'Kennesaw', 'sharpshooter', 'cracks', 'flatcar', 'And he survives', 'back on', 'headaches', 'He is']}
      booms={['head']}
    />
  );
};

export const Ch03: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
