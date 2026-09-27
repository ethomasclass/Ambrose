"""Contact sheet of rendered stills: python3 tools/sheet.py out/sheet.jpg out/stills/Ch01_*.jpg"""
import re, sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
files.sort(key=lambda f: [float(x) if x.replace('.', '').isdigit() else x for x in re.split(r'_([\d.]+)\.jpg$', f)])
cols, w, h = 3, 640, 360
sheet = Image.new('RGB', (cols * w, ((len(files) + cols - 1) // cols) * h), 'black')
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((w - 4, h - 4))
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(im, (x + 2, y + 2)); d.text((x + 8, y + 6), f.split('/')[-1], fill='yellow')
sheet.save(out, quality=82)
