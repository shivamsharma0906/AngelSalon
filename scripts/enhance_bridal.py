import os
from PIL import Image, ImageEnhance

base_dir = r"c:\Users\SHIVAM\Downloads\AngelSalon-main\AngelSalon-main"
real_dir = os.path.join(base_dir, "public", "images", "real")
output_dir = os.path.join(base_dir, "public", "images", "hero-carousel")

# Process Slide 3 (Bridal) to be vivid, luminous and glamorous
with Image.open(os.path.join(real_dir, "client_bridal_paithani.jpg")) as im:
    img = im.convert("RGB")
    w, h = img.size
    
    # Boost brightness & shadows so the bridal look shines like the Ruya reference!
    enh = ImageEnhance.Brightness(img).enhance(1.65)
    enh = ImageEnhance.Contrast(enh).enhance(1.12)
    enh = ImageEnhance.Color(enh).enhance(1.15)
    
    # Desktop 16:9
    crop_h = int(w * 9 / 16)
    crop_top = int(h * 0.12)
    crop_top = min(crop_top, h - crop_h)
    d_crop = enh.crop((0, crop_top, w, crop_top + crop_h))
    
    for width in [768, 1280, 1920]:
        height = int(width * 9 / 16)
        resized = d_crop.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide3_desktop_{width}.webp"), "WEBP", quality=88)

    # Mobile 4:5
    mob_h = int(w * 5 / 4)
    mob_crop = enh.crop((0, 0, w, min(h, mob_h)))
    for width in [480, 768]:
        height = int(width * 5 / 4)
        resized = mob_crop.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide3_mobile_{width}.webp"), "WEBP", quality=88)
    print("Slide 3 enhanced with golden bridal radiance!")
