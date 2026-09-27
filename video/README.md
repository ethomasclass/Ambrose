# The Man Who Couldn't Sit Still: Ambrose Bierce (video project)

Built with the same pipeline and locked look as Fix Everything (`ethomasclass/Reform-Era`, folder `video/`):
Remotion for picture, ElevenLabs for narration, Gemini for images no archive can supply, Suno for music,
ffmpeg for mastering. The design rules are Reform-Era's `review/DESIGN_STYLE_GUIDE.md`.

## Setup (fresh session)

```sh
cd video
npm ci
pip install pillow numpy scipy imageio-ffmpeg opencv-python-headless
export REMOTION_CHROME=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell | head -1)
```

Keys go in `video/.env` (gitignored) or in the cloud environment's variables: `ELEVENLABS_API_KEY`,
`VOICE_ID=mI4rIAStSQeKeqsz4FwM` (the Fix Everything narrator), and optionally `GEMINI_API_KEY`.

## Narration

- Script: `script/ch01_cold_open.txt` … `script/ch09_off_the_map.txt` (one file per chapter, narration only).
- `tools/voice_all.sh` voices every chapter at the Fix Everything pace (chapters 7 and 9 slower).
  `tools/voice_all.sh --piper` makes the offline stand-in read used for the current scratch cut
  (needs `pip install piper-tts` and the `en_US-ryan-high` voice; set `PIPER_MODEL`).
- Every scene is timed off the word timings in `public/audio/*.words.json`, so re-voicing re-times the video.
- Pronunciations (Bierce = "Beers", Meigs, Ojinaga, Mojada, years) are in `PRONOUNCE` in `tools/voice.py`.

## Pictures

- Archival images: `public/img/<topic>/`, credits in `public/img/credits.json` (`tools/commons.py`, `tools/find_images.py`).
- Map: Mitchell's 1867 map of the United States (reaches into northern Mexico); places and the route are in `src/ch/map.tsx`.
- Gemini illustrations: drop them in `public/img/gen/<name>.png` (names in `../PROMPTS.md`). Until a file
  exists its scene shows a labelled placeholder. For a mask pass, save Gemini's magenta copy anywhere and run
  `python3 tools/trace.py fromfile <mask.png> public/img/gen/<name>.png <name>`; the subject is then tinted
  coral and outlined in teal automatically.

## Music

Suno cues go in `public/music/<cue>.mp3` (cue names in `../PROMPTS.md`). A chapter plays its cue only if
the file exists. `title_sting.mp3` is reused from Fix Everything.

## Render

- Stills: `node tools/stills_all.mjs '{"Ch03":[10,20]}'` → `out/stills/`; `python3 tools/sheet.py out/s.jpg out/stills/*.jpg` for a contact sheet.
- Thumbnails: `node tools/thumbs.mjs` renders the `Thumb-A/B/C` concepts (src/Thumbnail.tsx) at 1280x720 → `../review/thumbnails/`.
- Chapters: `tools/render_chapter.sh 01 Ch01_Unknown_Destination 02 Ch02_Thirteen_As …` → `../review/chapters/`.
- Whole video: `tools/render_full.sh` (after the chapters) → `out/Bierce_1080p.mp4`, `../review/Bierce_720p.mp4`.
