// Chapter 5 · Bitter Bierce
import React from 'react';
import {AbsoluteFill} from 'remotion';
import words from '../../public/audio/ch05_bitter_bierce.words.json';
import {makeTimeline, type Narration, type Timeline} from '../lib/timing';
import {Highlight, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag} from '../jh/Kit';
import {Card, DarkPaper} from './common';
import {Chapter, Gen, has, MusicBed, Quote, Stamp} from './bits';

const N = words as Narration;
export const CH05_FRAMES = Math.ceil(N.duration * 30) + 30;

const Wasp: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/news/wasp_1881.jpg" x={1180} y={70} w={580} h={855} rot={3} at={t.at('1881') - 1} filter="grayscale(1) contrast(1.15)" />
    <Note text="this is where Bierce becomes..." x={120} y={110} size={60} at={t.at('This is')} />
    <Highlight text="BIERCE." x={120} y={220} size={130} at={t.wordAt(t.idx('becomes') + 1)} seed={501} rot={-2} />
    <Note text="1881: takes over a magazine called..." x={140} y={460} size={54} at={t.at('1881')} />
    <Highlight text="THE WASP" x={130} y={560} size={110} at={t.at('Wasp')} seed={503} rot={-2} />
    <Note text="(perfect name)" x={200} y={740} size={60} at={t.at('perfect')} />
    <Tag text="The Wasp, San Francisco, December 16, 1881 (cover by G. F. Keller) · Wikimedia Commons" />
  </AbsoluteFill>
);

const Hearst: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/news/hearst_1887.jpg" x={110} y={120} w={500} h={690} rot={-3} at={t.at('A few') - 1} />
    <Card src="img/news/examiner_1896.jpg" x={1260} y={90} w={540} h={730} rot={3} at={t.at('Examiner') - 1} filter="grayscale(1) contrast(1.15)" />
    <Note text="a young newspaper owner..." x={700} y={130} size={54} at={t.at('young')} />
    <Highlight text="W. R. HEARST" x={680} y={240} size={96} at={t.at('William')} seed={505} rot={-2} />
    <Note text="hires him to write a column" x={700} y={420} size={54} at={t.at('column')} />
    <Note text="San Francisco Examiner" x={1240} y={880} size={56} at={t.at('Examiner')} />
    <Tag text="W. R. Hearst, c. 1887 · The Examiner, 1896 · Wikimedia Commons" />
  </AbsoluteFill>
);

const Internet: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="no radio." x={160} y={130} size={76} at={t.at('no radio')} />
    <Note text="no TV." x={560} y={130} size={76} at={t.at('no TV')} />
    <Note text="no internet." x={880} y={130} size={76} at={t.at('no internet')} />
    <Highlight text="NEWSPAPERS" x={150} y={400} size={130} at={t.at('Newspapers were')} seed={507} rot={-2} />
    <Highlight text="WERE THE INTERNET." x={190} y={590} size={130} at={t.at('were the')} seed={509} rot={-2} />
  </AbsoluteFill>
);

const Bitter: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/bierce_1892.jpg" x={120} y={90} w={600} h={810} rot={-3} at={t.at('And Bierce was') - 1} />
    <Loop cx={420} cy={300} rx={140} ry={170} tilt={-6} at={t.at('attack dog') + 2} dur={10} width={6} seed={511} />
    <Note text="Hearst's star attack dog" x={820} y={110} size={60} at={t.at('attack dog')} />
    <Highlight text="“BITTER BIERCE”" x={800} y={230} size={100} at={t.at('Bitter')} seed={513} rot={-2} />
    <Note text="the most brutal critic online..." x={830} y={420} size={54} at={t.at('brutal')} />
    <Note text="...with the biggest megaphone in the West" x={830} y={510} size={44} at={t.at('megaphone')} />
    <Note text="everybody read him." x={830} y={660} size={60} at={t.at('Everybody')} />
    <Note text="a lot of people were scared of him." x={850} y={760} size={56} at={t.at('scared')} color="#FF9F1C" />
    <Tag text="Ambrose Bierce, 1892 · Wikimedia Commons" />
  </AbsoluteFill>
);

const Dictionary: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Card src="img/bierce/bierce_1896.png" x={1280} y={60} w={500} h={860} rot={3} at={t.at('His columns') - 1} filter="grayscale(1) contrast(1.1)" />
    <Note text="his columns became a book:" x={120} y={130} size={58} at={t.at('His columns')} />
    <Note text="a fake dictionary" x={150} y={230} size={60} at={t.at('fake')} />
    <Highlight text="THE DEVIL'S" x={120} y={370} size={120} at={t.at("Devil's")} seed={515} rot={-2} />
    <Highlight text="DICTIONARY" x={160} y={540} size={120} at={t.wordAt(t.idx("Devil's") + 1)} seed={517} rot={-1} />
    <Note text="(this is a history channel, so...)" x={150} y={780} size={52} at={t.at('history channel')} />
    <Tag text="Frontispiece, The Collected Works of Ambrose Bierce, vol. 1, 1909 · Wikimedia Commons" />
  </AbsoluteFill>
);

const History: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Quote t={t} n={N} from="History an account" text="“HISTORY: an account mostly false, of events mostly unimportant, which are brought about by rulers mostly knaves, and soldiers mostly fools.”"
      source="— THE DEVIL'S DICTIONARY, 1911" size={70} y={170} keys={['false', 'unimportant', 'knaves', 'fools']} />
    <Note text="okay. rude." x={1250} y={720} size={70} rot={-5} at={t.at('Okay')} />
    <Note text="(he'd know)" x={1330} y={820} size={60} rot={-5} at={t.at("he'd know")} />
  </AbsoluteFill>
);

const OwlCreek: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch05_owl_creek" t0={t.at('And in his')} t1={t.at('He falls')} trace={t.at('hanged') + 2} />
    <Note text="in his spare time: war + horror stories" x={120} y={100} size={54} at={t.at('spare')} />
    <Highlight text="“AN OCCURRENCE AT OWL CREEK BRIDGE”" x={110} y={190} size={66} at={t.at('Occurrence')} seed={519} rot={-2} />
    <Stamp text="SPOILER WARNING" x={1080} y={320} size={70} at={t.at('Spoiler')} rot={-6} color="#FF6F61" />
    <Note text="about to be hanged from a railroad bridge" x={140} y={860} size={54} at={t.at('hanged')} />
    <Note text="the rope snaps!" x={160} y={950} size={60} at={t.at('rope snaps')} color="#FF9F1C" />
    <Tag text="Illustration · a railroad bridge in northern Alabama, 1862" y={40} />
  </AbsoluteFill>
);

const Home: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <Gen name="ch05_owl_creek_home" t0={t.at('He falls')} t1={t.at("And he's dead")} z0={1.02} z1={1.2} trace={t.at('hug') - 4} />
    <Note text="into the creek" x={120} y={100} size={60} at={t.at('falls')} />
    <Note text="dodges the bullets" x={150} y={200} size={60} at={t.at('dodges')} />
    <Note text="runs all day, all night" x={180} y={300} size={60} at={t.at('runs')} />
    <Note text="home to his wife..." x={210} y={400} size={60} at={t.at('wife')} />
    <Tag text="Illustration · the homecoming, as the story imagines it" y={40} />
  </AbsoluteFill>
);

const Snap: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill style={{background: '#0b0a08'}}>
    <Stamp text="HE'S DEAD." x={200} y={220} size={150} at={t.at("he's dead")} rot={-4} color="#FF6F61" />
    <Highlight text="THE ROPE NEVER SNAPPED." x={200} y={480} size={96} at={t.at('never snapped')} seed={521} rot={-2} />
    <Note text="the whole escape happened in his head..." x={230} y={680} size={58} at={t.at('whole escape')} />
    <Note text="...in the second before he died" x={260} y={780} size={58} at={t.at('the second')} />
  </AbsoluteFill>
);

const Line: React.FC<{t: Timeline}> = ({t}) => (
  <AbsoluteFill>
    <DarkPaper />
    <Note text="later: an episode of The Twilight Zone" x={140} y={110} size={54} at={t.at('Twilight')} />
    <Note text="Kurt Vonnegut: “the greatest American short story”" x={160} y={210} size={52} at={t.at('greatest')} />
    <Note text="notice what it's about:" x={160} y={380} size={60} at={t.at('Notice')} />
    <Highlight text="BEING HERE" x={200} y={500} size={110} at={t.at('being here')} seed={523} rot={-2} />
    <Highlight text="BEING GONE" x={980} y={660} size={110} at={t.at('being gone')} seed={525} rot={2} />
    <Note text="he kept coming back to it" x={220} y={880} size={60} at={t.at('kept')} />
  </AbsoluteFill>
);

const Body: React.FC = () => {
  const t = makeTimeline(N, 30);
  const at = t.at;
  return (
    <Chapter t={t} frames={CH05_FRAMES} audio="audio/ch05_bitter_bierce.wav"
      extra={<><MusicBed src={has('music/newsroom.mp3') ? 'music/newsroom.mp3' : 'music/nativism.mp3'} from={0} to={at('And in his') + 10} skip={has('music/newsroom.mp3') ? 0 : 50} /><MusicBed src="music/spirits_dark.mp3" from={at('And in his') - 5} to={CH05_FRAMES - 10} vol={0.16} /></>}
      cuts={[
        [0, <Wasp t={t} />],
        [at('A few') - 1, <Hearst t={t} />],
        [at('Back then') - 1, <Internet t={t} />],
        [Math.max(at('And Bierce was') - 1, at('Newspapers were') + 60, at('were the') + 60), <Bitter t={t} />],
        [at('His columns') - 1, <Dictionary t={t} />],
        [at('History an account') - 1, <History t={t} />],
        [at('And in his') - 1, <OwlCreek t={t} />],
        [at('He falls') - 1, <Home t={t} />],
        [at("And he's dead") - 1, <Snap t={t} />],
        [at('It later') - 1, <Line t={t} />],
      ]}
      stamps={['becomes', 'Wasp', 'William', 'Newspapers were', 'were the', 'Bitter', "Devil's", 'Occurrence', 'Spoiler', "he's dead", 'never snapped', 'being here', 'being gone']}
      writes={['This is', '1881', 'perfect', 'young', 'column', 'Examiner', 'no radio', 'no TV', 'no internet', 'attack dog', 'brutal', 'megaphone', 'Everybody', 'scared', 'His columns', 'fake', 'history channel', 'Okay', "he'd know", 'spare', 'hanged', 'rope snaps', 'falls', 'dodges', 'runs', 'wife', 'whole escape', 'the second', 'Twilight', 'greatest', 'Notice', 'kept']}
    />
  );
};

export const Ch05: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2.5}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
