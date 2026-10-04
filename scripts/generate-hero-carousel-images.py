import os
from PIL import Image, ImageEnhance

base_dir = r"c:\Users\SHIVAM\Downloads\AngelSalon-main\AngelSalon-main"
real_dir = os.path.join(base_dir, "public", "images", "real")
root_img_dir = os.path.join(base_dir, "public", "images")
output_dir = os.path.join(base_dir, "public", "images", "hero-carousel")
os.makedirs(output_dir, exist_ok=True)

# 1. Slide 1: Glass Hair (client_straight_glass.png)
with Image.open(os.path.join(real_dir, "client_straight_glass.png")) as im:
    img = im.convert("RGB")
    w, h = img.size
    # For desktop: 1920x1080 (16:9)
    # The client hair runs down from top to mid-bottom. Focus on upper-mid (y: 15% to 75%)
    crop_h = int(w * 9 / 16) # 1200 * 9 / 16 = 675
    crop_top = int(h * 0.12)  # focus on head, glossy hair drape
    crop_top = min(crop_top, h - crop_h)
    d_crop = img.crop((0, crop_top, w, crop_top + crop_h))
    
    # Slight contrast/warmth boost for luxury glow
    enh = ImageEnhance.Contrast(d_crop)
    d_crop = enh.enhance(1.08)
    enh = ImageEnhance.Brightness(d_crop)
    d_crop = enh.enhance(1.05)

    for width in [768, 1280, 1920]:
        height = int(width * 9 / 16)
        resized = d_crop.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide1_desktop_{width}.webp"), "WEBP", quality=88)

    # Mobile 4:5
    mob_h = int(w * 5 / 4) # 1200 * 5 / 4 = 1500
    mob_top = int(h * 0.05)
    mob_crop = img.crop((0, mob_top, w, mob_top + min(mob_h, h - mob_top)))
    mob_enh = ImageEnhance.Contrast(mob_crop).enhance(1.08)
    mob_enh = ImageEnhance.Brightness(mob_enh).enhance(1.05)
    for width in [480, 768]:
        height = int(width * 5 / 4)
        resized = mob_enh.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide1_mobile_{width}.webp"), "WEBP", quality=88)
    print("Slide 1 processed successfully")

# 2. Slide 2: Ruby Layers / Balayage (client_ruby_layers.png)
with Image.open(os.path.join(real_dir, "client_ruby_layers.png")) as im:
    img = im.convert("RGB")
    w, h = img.size
    crop_h = int(w * 9 / 16) # 675
    crop_top = int(h * 0.15)
    crop_top = min(crop_top, h - crop_h)
    d_crop = img.crop((0, crop_top, w, crop_top + crop_h))
    
    enh = ImageEnhance.Contrast(d_crop).enhance(1.1)
    enh = ImageEnhance.Brightness(enh).enhance(1.06)
    enh = ImageEnhance.Color(enh).enhance(1.12) # Rich ruby red balayage tones

    for width in [768, 1280, 1920]:
        height = int(width * 9 / 16)
        resized = enh.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide2_desktop_{width}.webp"), "WEBP", quality=88)

    mob_h = int(w * 5 / 4)
    mob_top = int(h * 0.08)
    mob_crop = img.crop((0, mob_top, w, mob_top + min(mob_h, h - mob_top)))
    mob_enh = ImageEnhance.Contrast(mob_crop).enhance(1.1)
    mob_enh = ImageEnhance.Brightness(mob_enh).enhance(1.06)
    mob_enh = ImageEnhance.Color(mob_enh).enhance(1.12)
    for width in [480, 768]:
        height = int(width * 5 / 4)
        resized = mob_enh.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide2_mobile_{width}.webp"), "WEBP", quality=88)
    print("Slide 2 processed successfully")

# 3. Slide 3: Bridal Look (client_bridal_paithani.jpg)
with Image.open(os.path.join(real_dir, "client_bridal_paithani.jpg")) as im:
    img = im.convert("RGB")
    w, h = img.size
    # Paithani bride has gold nath, jewellery, paithani pallu, intricate styling
    # Let's boost brightness & shadows so the bridal jewellery and makeup shine!
    enh = ImageEnhance.Brightness(img).enhance(1.4)
    enh = ImageEnhance.Contrast(enh).enhance(1.15)
    enh = ImageEnhance.Color(enh).enhance(1.15)
    
    # Desktop 16:9
    crop_h = int(w * 9 / 16) # 978 * 9 / 16 = 550
    crop_top = int(h * 0.15)
    crop_top = min(crop_top, h - crop_h)
    d_crop = enh.crop((0, crop_top, w, crop_top + crop_h))
    
    for width in [768, 1280, 1920]:
        height = int(width * 9 / 16)
        resized = d_crop.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide3_desktop_{width}.webp"), "WEBP", quality=88)

    # Mobile 4:5
    mob_h = int(w * 5 / 4)
    mob_top = 0
    mob_crop = enh.crop((0, mob_top, w, min(h, mob_h)))
    for width in [480, 768]:
        height = int(width * 5 / 4)
        resized = mob_crop.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(os.path.join(output_dir, f"slide3_mobile_{width}.webp"), "WEBP", quality=88)
    print("Slide 3 processed successfully")

# 4. Slide 4 Collage Images: Curated high quality crops
collage_sources = [
    {"name": "c1_academy", "path": os.path.join(root_img_dir, "academy_training.jpg")},
    {"name": "c2_haircut", "path": os.path.join(real_dir, "client_bob_cut.png")},
    {"name": "c3_styling", "path": os.path.join(real_dir, "client_vcut_straight.png")},
    {"name": "c4_nails", "path": os.path.join(real_dir, "client_almond_nails.png")},
    {"name": "c5_blowout", "path": os.path.join(real_dir, "client_feather_blowout.png")},
    {"name": "c6_salon", "path": os.path.join(real_dir, "salon_interior_real.jpg")},
]

for item in collage_sources:
    if os.path.exists(item["path"]):
        with Image.open(item["path"]) as im:
            img = im.convert("RGB")
            # Subtle boost
            enh = ImageEnhance.Contrast(img).enhance(1.06)
            enh = ImageEnhance.Brightness(enh).enhance(1.04)
            # Resize keeping aspect ratio, max 800px
            w, h = enh.size
            if max(w, h) > 800:
                scale = 800 / max(w, h)
                enh = enh.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
            out_path = os.path.join(output_dir, f"collage_{item['name']}.webp")
            enh.save(out_path, "WEBP", quality=88)
            print(f"Collage {item['name']} processed: {enh.size}")
