// Chapter 8 · One Last War
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch08_one_last_war.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Full, Gen, Quote, Stamp, StrikeLine} from './bits';
import {arc, P, RouteMap} from './map';

const N = words as Narration;
export const CH08_FRAMES = Math.ceil(N.duration * 30) + 30;

const Tour: React.FC<{t: Timeline}> = ({t}) => {
  const bf = t.at('battlefields');
  const no = t.at('New Orleans');
  const tx = t.at('Texas');
  const ep = t.at('El Paso');
  return (
    <RouteMap
      keys={[{f: 0, x: 2700, y: 1250, s: 0.8}, {f: bf + 20, x: 2550, y: 1450, s: 0.8}, {f: tx, x: 2100, y: 1650, s: 0.7}, {f: t.at('border') + 10, x: 1500, y: 1700, s: 0.8}]}
      faded={[{pts: arc(P.chattanooga, P.shiloh, 0.1), a: bf, b: bf + 12}]}
      legs={[
        {pts: arc(P.dc, P.kennesaw, 0.12), a: bf - 6, b: bf + 16},
        {pts: arc(P.kennesaw, P.neworleans, 0.1), a: no - 10, b: no + 6},
        {pts: arc(P.neworleans, P.sanantonio, 0.1), a: tx - 10, b: tx + 6},
        {pts: arc(P.sanantonio, P.elpaso, 0.1), a: ep - 10, b: ep + 6},
      ]}
      pins={[
        {p: P.dc, at: 0, label: 'Washington', dx: 20, dy: 10},
        {p: P.shiloh, at: bf + 4}, {p: P.chattanooga, at: bf + 7}, {p: P.kennesaw, at: bf + 10, label: 'the old battlefields', dx: 20, dy: 0},
        {p: P.neworleans, at: no, label: 'New Orleans', dx: 20, dy: 10},
        {p: P.sanantonio, at: tx, label: 'Texas', dx: 20, dy: 10},
        {p: P.elpaso, at: ep, label: 'El Paso', dx: -250, dy: -70},
      ]}
    >
      <Highlight text="OCTOBER 1913" x={110} y={100} size={96} at={t.at('October')} seed={801} rot={-2} />
      <Note text="a farewell tour" x={140} y={250} size={60} at={t.at('farewell')} />
      <Note text="...then he just keeps going" x={160} y={350} size={58} at={t.at('keeps going')} />
      <Note text="right up to the Mexican border" x={1000} y={900} size={56} at={t.at('border')} />
    </RouteMap>
  );
};

const War: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/mexico/juarez_1911_watchers.png" w={1536} h={1067} t0={t.at('And across')} t1={t.at('Quick')} z0={1.05} z1={1.12} tag="Battle of Ciudad Juárez, 1911 · Wikimedia Commons" />
    <Note text="across that border..." x={120} y={110} size={60} at={t.at('And across')} />
    <Stamp text="A WAR." x={140} y={760} size={180} at={t.at('a war')} rot={-5} color="#FF6F61" />
  </AbsoluteFill>
);

const Diaz: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="quick background:" x={120} y={90} size={58} at={t.at('Quick')} />
    <Card src="img/mexico/diaz_1911.jpg" x={1240} y={90} w={560} h={700} rot={3} at={t.at('dictator') - 1} />
    <Note text="30+ years, one man in charge" x={140} y={210} size={56} at={t.at('thirty')} />
    <Highlight text="PORFIRIO DÍAZ" x={120} y={320} size={96} at={t.at('Porfirio')} seed={803} rot={-2} />
    <Note text="a dictator" x={170} y={480} size={60} at={t.at('dictator')} />
    <StrikeLine x={120} y={380} w={760} at={t.at('threw')} />
    <Highlight text="1910: REVOLUTION" x={130} y={640} size={96} at={t.at('1910')} seed={805} rot={-2} />
    <Note text="Mexicans throw him out" x={170} y={800} size={60} at={t.at('threw')} />
    <Tag text="Porfirio Díaz, c. 1911 · Library of Congress" />
  </AbsoluteFill>
);

const Huerta: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Highlight text="1913" x={110} y={90} size={100} at={t.at('But in 1913')} seed={807} rot={-2} />
    <Card src="img/mexico/huerta_cabinet.jpg" x={110} y={240} w={720} h={478} rot={-2} at={t.at('Victoriano') - 1} />
    <Note text="Gen. Huerta seizes power" x={120} y={780} size={54} at={t.at('seized')} />
    <Card src="img/mexico/madero.jpg" x={1260} y={110} w={460} h={550} rot={3} at={t.at('elected') - 1} />
    <Note text="President Madero, elected:" x={1180} y={730} size={50} at={t.at('elected')} />
    <Stamp text="MURDERED" x={1200} y={830} size={90} at={t.at('murdered')} rot={-5} color="#FF6F61" />
    <Note text="now: the revolution vs. Huerta" x={140} y={900} size={56} at={t.at('So now')} />
    <Tag text="Huerta with his cabinet, c. 1913 · Francisco I. Madero, before 1913 · Wikimedia Commons" y={40} />
  </AbsoluteFill>
);

const Villa: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Full src="img/mexico/villa_riding_1914.jpg" w={1067} h={714} t0={t.at('One of the')} t1={t.at('So Bierce')} z0={1.04} z1={1.14} fx={0.45} fy={0.4} tag="Pancho Villa, 1914 · Bain News Service, Library of Congress" />
    <Note text="one of the most famous rebel generals:" x={120} y={100} size={54} at={t.at('famous rebel')} />
    <Highlight text="PANCHO VILLA" x={110} y={190} size={110} at={t.at('Pancho')} seed={809} rot={-2} />
    <Note text="former outlaw → general" x={140} y={820} size={60} at={t.at('outlaw')} />
    <Note text="a huge army, moving by train" x={160} y={910} size={56} at={t.at('train')} />
    <Note text="American papers: obsessed" x={1200} y={400} size={56} at={t.at('obsessed')} color="#FF9F1C" />
  </AbsoluteFill>
);

const Crossing: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch08_crossing" t0={t.at('So Bierce')} t1={t.at('In late')} trace={t.at('crosses') + 2} />
    <Note text="age 71" x={120} y={100} size={70} at={t.at('71')} />
    <Highlight text="CIUDAD JUÁREZ" x={110} y={200} size={100} at={t.at('Ciudad')} seed={811} rot={-2} />
    <Note text="papers to ride with Villa's army, as an observer" x={130} y={900} size={52} at={t.at('observer')} />
    <Tag text="Illustration · the bridge from El Paso to Juárez, 1913" y={40} />
  </AbsoluteFill>
);

const TierraBlanca: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('In late'), x: P.juarez[0] + 80, y: P.juarez[1] + 60, s: 1.7}]}
    legs={[{pts: arc(P.juarez, P.tierrablanca, 0.1), a: t.at('Battle'), b: t.at('Tierra') + 4}]}
    pins={[{p: P.juarez, at: t.at('In late'), label: 'Juárez', dx: -180, dy: -60}, {p: P.tierrablanca, at: t.at('Tierra'), label: 'Tierra Blanca', dx: 20, dy: 10}]}>
    <Highlight text="NOVEMBER 1913" x={110} y={100} size={90} at={t.at('November')} seed={813} rot={-2} />
    <Note text="a big win for Villa" x={140} y={240} size={60} at={t.at('big win')} />
    <Note text="grabbed a rifle? won a sombrero?" x={960} y={640} size={56} at={t.at('rifle')} color="#FF9F1C" />
    <Note text="(hard to confirm)" x={1000} y={740} size={54} at={t.at('confirm')} color="#ffffff" />
    <Note text="...not out of character" x={1040} y={840} size={56} at={t.at('character')} />
  </RouteMap>
);

const Chihuahua: React.FC<{t: Timeline}> = ({t}) => (
  <RouteMap keys={[{f: t.at('He rides'), x: 1270, y: 1790, s: 1.5}]}
    legs={[{pts: arc(P.juarez, P.chihuahua, -0.1), a: t.at('rides'), b: t.at('Chihuahua') + 6}]}
    pins={[{p: P.juarez, at: t.at('He rides'), label: 'Juárez', dx: -180, dy: -60}, {p: P.chihuahua, at: t.at('Chihuahua'), label: 'Chihuahua City', dx: 20, dy: 10}]}>
    <Note text="he writes home..." x={140} y={880} size={60} at={t.at('writes')} />
  </RouteMap>
);

const Wall: React.FC<{t: Timeline}> = ({t}) => (
  <Quote t={t} n={N} from="If you hear" size={56} y={150}
    text="“If you hear of my being stood up against a Mexican stone wall and shot to rags please know that I think that a pretty good way to depart this life. It beats old age, disease, or falling down the cellar stairs.”"
    source="— BIERCE, LETTER FROM MEXICO, LATE 1913 (AS QUOTED BY TIME)" keys={['stone', 'wall', 'beats', 'old', 'age']} />
);

const Punchline: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/partington.jpg" x={1220} y={100} w={560} h={740} rot={3} at={t.at("That's Bierce") - 1} />
    <Note text="that's Bierce." x={160} y={300} size={80} at={t.at("That's Bierce")} />
    <Note text="even his goodbye is a punchline." x={190} y={440} size={66} at={t.at('goodbye')} color="#FF9F1C" />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH08_FRAMES} audio="audio/ch08_one_last_war.wav" music="music/mexico.mp3"
      cuts={[
        [0, <Tour t={t} />],
        [at('And across') - 1, <War t={t} />],
        [at('Quick') - 1, <Diaz t={t} />],
        [at('But in 1913') - 1, <Huerta t={t} />],
        [at('One of the') - 1, <Villa t={t} />],
        [at('So Bierce') - 1, <Crossing t={t} />],
        [at('In late') - 1, <TierraBlanca t={t} />],
        [at('He rides') - 1, <Chihuahua t={t} />],
        [at('If you hear') - 1, <Wall t={t} />],
        [at("That's Bierce") - 1, <Punchline t={t} />],
      ]}
      stamps={['October', 'a war', 'Porfirio', '1910', 'But in 1913', 'murdered', 'Pancho', 'Ciudad', 'November']}
      writes={['farewell', 'keeps going', 'border', 'And across', 'Quick', 'thirty', 'dictator', 'threw', 'seized', 'elected', 'So now', 'famous rebel', 'outlaw', 'train', 'obsessed', '71', 'observer', 'big win', 'rifle', 'confirm', 'character', 'writes', "That's Bierce", 'goodbye']}
      ticks={['New Orleans', 'Texas', 'El Paso', 'Tierra', 'Chihuahua']}
    />
  );
};

export const Ch08: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
