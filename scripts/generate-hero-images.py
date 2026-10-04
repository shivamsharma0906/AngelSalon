import os
from PIL import Image

def generate_hero_images():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_dir = os.path.join(base_dir, "public", "images", "real")
    output_dir = os.path.join(base_dir, "public", "images", "hero")
    os.makedirs(output_dir, exist_ok=True)

    slides = [
        {"name": "salon_interior", "file": "studio_interior.jpg", "crop_y": 0.5},
        {"name": "client_glass_hair", "file": "client_straight_glass.jpg", "crop_y": 0.25},
        {"name": "client_styling", "file": "client_butterfly_cut.jpg", "crop_y": 0.3},
        {"name": "client_nails", "file": "client_almond_nails.jpg", "crop_y": 0.5},
    ]

    for slide in slides:
        in_path = os.path.join(input_dir, slide["file"])
        if not os.path.exists(in_path):
            print(f"Warning: {in_path} not found")
            continue

        with Image.open(in_path) as img:
            img = img.convert("RGB")
            orig_w, orig_h = img.size

            # 1. Desktop WebP (max 1920 width, maintaining aspect ratio)
            desktop_img = img.copy()
            if orig_w > 1920:
                new_h = int(orig_h * (1920 / orig_w))
                desktop_img = desktop_img.resize((1920, new_h), Image.Resampling.LANCZOS)
            out_desktop = os.path.join(output_dir, f"{slide['name']}_desktop.webp")
            desktop_img.save(out_desktop, "WEBP", quality=85)
            print(f"Generated: {out_desktop} ({desktop_img.size})")

            # 2. Mobile WebP (4:5 portrait crop, e.g. 800x1000)
            target_ratio = 4.0 / 5.0
            # Calculate crop box centered on crop_y
            current_ratio = orig_w / orig_h
            if current_ratio > target_ratio:
                # Image is too wide: crop left & right
                crop_w = int(orig_h * target_ratio)
                crop_h = orig_h
                left = (orig_w - crop_w) // 2
                top = 0
            else:
                # Image is too tall: crop top & bottom around crop_y
                crop_w = orig_w
                crop_h = int(orig_w / target_ratio)
                left = 0
                center_y = int(orig_h * slide["crop_y"])
                top = max(0, min(orig_h - crop_h, center_y - crop_h // 2))

            crop_box = (left, top, left + crop_w, top + crop_h)
            mobile_crop = img.crop(crop_box)
            mobile_crop = mobile_crop.resize((800, 1000), Image.Resampling.LANCZOS)
            out_mobile = os.path.join(output_dir, f"{slide['name']}_mobile.webp")
            mobile_crop.save(out_mobile, "WEBP", quality=85)
            print(f"Generated: {out_mobile} ({mobile_crop.size})")

if __name__ == "__main__":
    generate_hero_images()
