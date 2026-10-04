import os
from PIL import Image, ImageStat

files = [
    'public/images/real/client_straight_glass.png',
    'public/images/real/client_ruby_layers.png',
    'public/images/real/client_bridal_paithani.jpg',
    'public/images/real/client_feather_blowout.jpg',
    'public/images/real/client_bob_cut.jpg',
    'public/images/real/client_vcut_straight.jpg',
    'public/images/real/client_magenta_balayage.jpg',
    'public/images/hair_service.png',
    'public/images/gallery_balayage.jpg',
    'public/images/bridal_service.png',
    'public/images/academy_training.jpg',
    'public/images/real/salon_interior_real.jpg'
]

for f in files:
    if os.path.exists(f):
        with Image.open(f) as im:
            stat = ImageStat.Stat(im.convert('L'))
            print(f'{f}: {im.size}, mean brightness={stat.mean[0]:.1f}')
