# The Man Who Couldn't Sit Still: 1080p upload master

`Bierce_1080p.mp4` (10:44, 1920×1080, 30 fps, H.264 + AAC 48 kHz, −14 LUFS) is split into 3 parts because
GitHub refuses files over 100 MB. Download all 3 `.part_` files into one folder, then join them.

**Mac / Linux** (Terminal, in that folder):

```
cat Bierce_1080p.mp4.part_* > Bierce_1080p.mp4
```

**Windows PowerShell** (in that folder):

```
cmd /c "copy /b Bierce_1080p.mp4.part_0 + Bierce_1080p.mp4.part_1 + Bierce_1080p.mp4.part_2 Bierce_1080p.mp4"
```

**Check it** (optional): the joined file's SHA-256 should be

```
bce082621f7ca73b669f220633f3c2eb4868c9cc93307f35ca85cbc4fcea08ee
```

Mac: `shasum -a 256 Bierce_1080p.mp4` · Windows PowerShell: `Get-FileHash Bierce_1080p.mp4`

To rebuild the master from source instead: render the chapters with `video/tools/render_chapter.sh`,
then run `video/tools/render_full.sh`.
