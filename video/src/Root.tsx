import React from 'react';
import {Composition, Series} from 'remotion';
import {FPS, H, W} from './lib/look';
import {JFonts} from './jh/Kit';
import {ChannelIntro, INTRO_FRAMES} from './ch/Intro';
import {Ch01, CH01_FRAMES} from './ch/Ch01';
import {Ch02, CH02_FRAMES} from './ch/Ch02';
import {Ch03, CH03_FRAMES} from './ch/Ch03';
import {Ch04, CH04_FRAMES} from './ch/Ch04';
import {Ch05, CH05_FRAMES} from './ch/Ch05';
import {Ch06, CH06_FRAMES} from './ch/Ch06';
import {Ch07, CH07_FRAMES} from './ch/Ch07';
import {Ch08, CH08_FRAMES} from './ch/Ch08';
import {Ch09, CH09_FRAMES} from './ch/Ch09';
import {ThumbnailA, ThumbnailB, ThumbnailC, THUMB_FRAMES} from './Thumbnail';

export const CHAPTERS: [string, React.FC, number][] = [
  ['Ch01', Ch01, CH01_FRAMES], ['Ch02', Ch02, CH02_FRAMES], ['Ch03', Ch03, CH03_FRAMES],
  ['Ch04', Ch04, CH04_FRAMES], ['Ch05', Ch05, CH05_FRAMES], ['Ch06', Ch06, CH06_FRAMES],
  ['Ch07', Ch07, CH07_FRAMES], ['Ch08', Ch08, CH08_FRAMES], ['Ch09', Ch09, CH09_FRAMES],
];

/** The whole programme in one timeline, for previewing in the studio (renders go chapter by chapter). */
const Full: React.FC = () => (
  <Series>
    {CHAPTERS.map(([id, C, frames]) => <Series.Sequence key={id} durationInFrames={frames}><C /></Series.Sequence>)}
  </Series>
);

export const Root: React.FC = () => (
  <>
    <Composition id="Intro" width={W} height={H} fps={FPS} durationInFrames={INTRO_FRAMES} component={() => <JFonts><ChannelIntro /></JFonts>} />
    {CHAPTERS.map(([id, C, frames]) => (
      <Composition key={id} id={id} width={W} height={H} fps={FPS} durationInFrames={frames} component={() => <JFonts><C /></JFonts>} />
    ))}
    <Composition id="Full" width={W} height={H} fps={FPS} durationInFrames={CHAPTERS.reduce((a, c) => a + c[2], 0)} component={() => <JFonts><Full /></JFonts>} />
    <Composition id="Thumb-A" width={W} height={H} fps={FPS} durationInFrames={THUMB_FRAMES} component={() => <JFonts><ThumbnailA /></JFonts>} />
    <Composition id="Thumb-B" width={W} height={H} fps={FPS} durationInFrames={THUMB_FRAMES} component={() => <JFonts><ThumbnailB /></JFonts>} />
    <Composition id="Thumb-C" width={W} height={H} fps={FPS} durationInFrames={THUMB_FRAMES} component={() => <JFonts><ThumbnailC /></JFonts>} />
  </>
);
