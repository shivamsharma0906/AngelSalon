import os
from PIL import Image, ImageStat

files = [
    'public/images/hero-carousel/slide1_desktop_1920.webp',
    'public/images/hero-carousel/slide2_desktop_1920.webp',
    'public/images/hero-carousel/slide3_desktop_1920.webp',
    'public/images/hero-carousel/slide1_mobile_768.webp',
    'public/images/hero-carousel/slide2_mobile_768.webp',
    'public/images/hero-carousel/slide3_mobile_768.webp',
]

for f in files:
    if os.path.exists(f):
        with Image.open(f) as im:
            stat = ImageStat.Stat(im.convert('L'))
            print(f'{f}: {im.size}, mean brightness={stat.mean[0]:.1f}')
