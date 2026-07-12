from __future__ import annotations

import io
import json
import math
import urllib.request
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "banners" / "bsc-real"
CACHE = ROOT / ".asset-cache" / "bsc-real"
OUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)

HERO_PATH = ROOT / "public" / "banners" / "homepage_hero.webp"
LOGO_PATH = ROOT / "public" / "storeFavicon.webp"
FLOWERS_PATH = ROOT / "app" / "lib" / "flowers.json"
ITEMS_PATH = ROOT / "app" / "lib" / "items.json"

HERO = Image.open(HERO_PATH).convert("RGB")
LOGO = Image.open(LOGO_PATH).convert("RGBA")
FLOWERS = json.loads(FLOWERS_PATH.read_text(encoding="utf-8"))
ITEMS = json.loads(ITEMS_PATH.read_text(encoding="utf-8"))

GREEN = (47, 190, 93)
GREEN_LIGHT = (160, 245, 178)
PURPLE = (109, 43, 157)
PURPLE_LIGHT = (185, 108, 255)
GOLD = (214, 174, 82)
INK = (6, 8, 14)
WHITE = (248, 255, 246)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = Path("C:/Windows/Fonts") / name
    return ImageFont.truetype(str(path), size)


FONT_BLACK = "arialbd.ttf"
FONT_REGULAR = "arial.ttf"
FONT_IMPACT = "impact.ttf"


def text_size(draw: ImageDraw.ImageDraw, text: str, size: int, font_name: str = FONT_BLACK) -> tuple[int, int]:
    bbox = draw.textbbox((0, 0), text, font=font(font_name, size))
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, font_name: str = FONT_BLACK) -> int:
    size = start
    while size > 18 and text_size(draw, text, size, font_name)[0] > max_width:
        size -= 2
    return size


def draw_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    size: int,
    fill: str | tuple[int, int, int] | tuple[int, int, int, int],
    font_name: str = FONT_BLACK,
    stroke: int = 0,
    stroke_fill: str | tuple[int, int, int] | tuple[int, int, int, int] = "#000000",
) -> None:
    draw.text(
        xy,
        text,
        font=font(font_name, size),
        fill=fill,
        stroke_width=stroke,
        stroke_fill=stroke_fill,
    )


def rounded(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    radius: int,
    fill,
    outline=None,
    width: int = 1,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def cache_name(url: str) -> Path:
    safe = "".join(ch if ch.isalnum() else "-" for ch in url.split("/")[-1])[:100]
    if not safe:
        safe = "asset"
    return CACHE / safe


def load_remote_image(url: str) -> Image.Image | None:
    if not url:
        return None
    cached = cache_name(url)
    try:
        if cached.exists():
            raw = cached.read_bytes()
        else:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=25) as response:
                raw = response.read()
            cached.write_bytes(raw)
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        img.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
        return img
    except Exception as exc:
        print(f"[asset] Could not load {url}: {exc}")
        return None


def remove_white_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            brightness = (r + g + b) / 3
            spread = max(r, g, b) - min(r, g, b)
            if brightness > 244 and spread < 20:
                px[x, y] = (r, g, b, 0)
            elif brightness > 228 and spread < 32:
                fade = int(max(0, min(255, (244 - brightness) / 16 * 255)))
                px[x, y] = (r, g, b, min(a, fade))
    alpha = img.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    img.putalpha(alpha)
    bbox = alpha.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img


def product_images(records: Iterable[dict], limit: int = 4) -> list[Image.Image]:
    images: list[Image.Image] = []
    seen: set[str] = set()
    for record in records:
        url = str(record.get("image") or record.get("promoImage") or "")
        if not url or url in seen:
            continue
        seen.add(url)
        img = load_remote_image(url)
        if img is None:
            continue
        cutout = remove_white_background(img)
        cutout = ImageEnhance.Sharpness(cutout).enhance(1.16)
        cutout = ImageEnhance.Contrast(cutout).enhance(1.08)
        cutout = ImageEnhance.Color(cutout).enhance(1.05)
        images.append(cutout)
        if len(images) >= limit:
            break
    return images


def records_for_tier(tier: str, limit: int = 6) -> list[dict]:
    matches = [f for f in FLOWERS if str(f.get("tier", "")).upper() == tier.upper()]
    matches.sort(key=lambda f: (not f.get("isSale", False), not f.get("isHot", False), str(f.get("sku", ""))))
    return matches[:limit]


def records_for_category(category: str, limit: int = 6) -> list[dict]:
    target = category.upper()
    if target == "PREROLLS":
        matches = [
            i
            for i in ITEMS
            if str(i.get("category", "")).upper() == "PREROLLS"
            or "PRE-ROLL" in str(i.get("name", "")).upper()
            or "PREROLL" in str(i.get("name", "")).upper()
        ]
    elif target == "ACCESSORIES":
        matches = [i for i in ITEMS if str(i.get("category", "")).upper() == "ADD ONS"]
    elif target == "MAGIC":
        matches = [i for i in ITEMS if "MAGIC" in str(i.get("category", "")).upper() or "MAGIC" in str(i.get("name", "")).upper()]
    else:
        matches = [i for i in ITEMS if str(i.get("category", "")).upper() == target]
    matches.sort(key=lambda i: str(i.get("sku", "")))
    return matches[:limit]


def paste_contained(
    canvas: Image.Image,
    img: Image.Image,
    box: tuple[int, int, int, int],
    opacity: int = 255,
    shadow: bool = True,
    rotate: float = 0,
) -> None:
    x1, y1, x2, y2 = box
    bw, bh = x2 - x1, y2 - y1
    scale = min(bw / img.width, bh / img.height)
    nw = max(1, int(img.width * scale))
    nh = max(1, int(img.height * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    if rotate:
        resized = resized.rotate(rotate, expand=True, resample=Image.Resampling.BICUBIC)
    if opacity < 255:
        alpha = resized.getchannel("A").point(lambda p: int(p * opacity / 255))
        resized.putalpha(alpha)
    px = x1 + (bw - resized.width) // 2
    py = y1 + (bh - resized.height) // 2
    if shadow:
        shadow_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        mask = resized.getchannel("A").filter(ImageFilter.GaussianBlur(16))
        sh = Image.new("RGBA", resized.size, (0, 0, 0, 185))
        sh.putalpha(mask)
        shadow_layer.alpha_composite(sh, (px + 18, py + 26))
        canvas.alpha_composite(shadow_layer)
    canvas.alpha_composite(resized, (px, py))


def paste_logo(canvas: Image.Image, xy: tuple[int, int], size: int = 76) -> None:
    logo = LOGO.copy()
    logo.thumbnail((size, size), Image.Resampling.LANCZOS)
    halo = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    hx, hy = xy
    hd = ImageDraw.Draw(halo)
    hd.rounded_rectangle((hx - 8, hy - 8, hx + size + 8, hy + size + 8), radius=18, fill=(255, 255, 255, 34), outline=(160, 245, 178, 120), width=2)
    halo = halo.filter(ImageFilter.GaussianBlur(2))
    canvas.alpha_composite(halo)
    canvas.alpha_composite(logo, xy)


def neon_frame(canvas: Image.Image, accent: tuple[int, int, int], radius: int = 26, strong: bool = False) -> None:
    w, h = canvas.size
    box = (24, 24, w - 24, h - 24)
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.rounded_rectangle(box, radius=radius, outline=(*accent, 160), width=5 if strong else 4)
    gd.rounded_rectangle((36, 36, w - 36, h - 36), radius=max(12, radius - 8), outline=(*PURPLE, 130), width=2)
    canvas.alpha_composite(glow.filter(ImageFilter.GaussianBlur(14)))
    canvas.alpha_composite(glow)
    d = ImageDraw.Draw(canvas)
    d.rectangle((0, 0, w, 14), fill=(*accent, 235))
    d.rectangle((0, h - 14, w, h), fill=(*PURPLE, 170))


def hero_background(size: tuple[int, int], centering: tuple[float, float] = (0.52, 0.48), bright: bool = False) -> Image.Image:
    bg = ImageOps.fit(HERO, size, method=Image.Resampling.LANCZOS, centering=centering).convert("RGBA")
    bg = bg.filter(ImageFilter.GaussianBlur(6 if not bright else 4))
    bg = ImageEnhance.Contrast(bg).enhance(1.18)
    bg = ImageEnhance.Color(bg).enhance(1.20)

    base = Image.new("RGBA", size, (6, 8, 14, 178 if not bright else 118))
    if bright:
        base = Image.new("RGBA", size, (247, 255, 244, 210))
    bg.alpha_composite(base)

    w, h = size
    radial = Image.new("RGBA", size, (0, 0, 0, 0))
    pix = radial.load()
    for y in range(h):
        for x in range(w):
            nx = (x - w * 0.75) / (w * 0.65)
            ny = (y - h * 0.36) / (h * 0.72)
            a = max(0, 1 - math.sqrt(nx * nx + ny * ny))
            if a > 0:
                if bright:
                    pix[x, y] = (*GREEN, int(a * 74))
                else:
                    pix[x, y] = (*GREEN, int(a * 88))
    bg.alpha_composite(radial)

    sweep = Image.new("RGBA", size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sweep)
    for i in range(0, w, 120):
        sd.line((i - h, h, i + 360, 0), fill=(*PURPLE, 35 if not bright else 24), width=18)
    bg.alpha_composite(sweep.filter(ImageFilter.GaussianBlur(10)))

    vignette = Image.new("RGBA", size, (0, 0, 0, 0))
    vpix = vignette.load()
    for y in range(h):
        for x in range(w):
            dx = abs(x / w - 0.5) * 2
            dy = abs(y / h - 0.5) * 2
            edge = max(dx, dy)
            a = max(0, edge - 0.45) / 0.55
            if a > 0:
                vpix[x, y] = (0, 0, 0, int(min(165, a * 165)))
    bg.alpha_composite(vignette)
    return bg


def make_chip(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, accent: tuple[int, int, int], dark: bool = True) -> int:
    tw, _ = text_size(draw, text, 23, FONT_BLACK)
    width = tw + 44
    fill = (6, 12, 9, 210) if dark else (255, 255, 255, 210)
    color = "#ffffff" if dark else "#08100a"
    rounded(draw, (x, y, x + width, y + 54), 27, fill, outline=(*accent, 170), width=2)
    draw_text(draw, (x + 22, y + 15), text, 23, color, FONT_BLACK)
    return width


def add_corner_marks(draw: ImageDraw.ImageDraw, size: tuple[int, int], accent: tuple[int, int, int]) -> None:
    w, h = size
    for x, y, sx, sy in [(54, 54, 1, 1), (w - 54, 54, -1, 1), (54, h - 54, 1, -1), (w - 54, h - 54, -1, -1)]:
        draw.line((x, y, x + sx * 70, y), fill=(*accent, 180), width=3)
        draw.line((x, y, x, y + sy * 70), fill=(*accent, 180), width=3)


def make_tile(file: str, accent: tuple[int, int, int], records: list[dict], label: str, product_kind: str = "flower") -> None:
    size = (1200, 760)
    canvas = hero_background(size, centering=(0.56, 0.48), bright=False)
    d = ImageDraw.Draw(canvas)
    neon_frame(canvas, accent, strong=False)
    add_corner_marks(d, size, accent)

    images = product_images(records, limit=3)
    if not images and product_kind == "flower":
        images = product_images(records_for_tier("EXOTIC", 4), limit=3)
    elif not images:
        images = product_images(records_for_category("EDIBLES", 4), limit=3)

    if images:
        if len(images) == 1:
            paste_contained(canvas, images[0], (300, 100, 1080, 670))
        else:
            paste_contained(canvas, images[0], (100, 95, 540, 690), rotate=-5)
            paste_contained(canvas, images[1], (430, 70, 970, 665), opacity=242, rotate=4)
            if len(images) > 2:
                paste_contained(canvas, images[2], (805, 210, 1130, 690), opacity=232, rotate=-3)

    label_panel = Image.new("RGBA", size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(label_panel)
    ld.rectangle((0, 500, 1200, 760), fill=(0, 0, 0, 126))
    ld.rectangle((0, 0, 1200, 145), fill=(255, 255, 255, 26))
    canvas.alpha_composite(label_panel)
    paste_logo(canvas, (58, 52), 80)
    draw_text(d, (152, 70), "BSC", 38, GREEN_LIGHT, FONT_IMPACT, stroke=2, stroke_fill="#041006")
    small_size = fit_font(d, label.upper(), 430, 38, FONT_BLACK)
    draw_text(d, (58, 592), label.upper(), small_size, "#ffffff", FONT_BLACK, stroke=3, stroke_fill="#03070a")
    draw_text(d, (965, 650), "FALBY RD", 30, (*accent, 230), FONT_BLACK, stroke=2, stroke_fill="#03070a")
    canvas.convert("RGB").save(OUT / file, "WEBP", quality=92, method=6)


def make_banner(
    file: str,
    title: str,
    kicker: str,
    subtitle: str,
    chips: list[str],
    accent: tuple[int, int, int],
    records: list[dict],
    bright: bool = False,
) -> None:
    size = (1600, 760)
    canvas = hero_background(size, centering=(0.54, 0.5), bright=bright)
    d = ImageDraw.Draw(canvas)
    neon_frame(canvas, accent, strong=True)
    add_corner_marks(d, size, accent)

    images = product_images(records, limit=4)
    if not images:
        images = product_images(records_for_tier("EXOTIC", 3), limit=3)
    if images:
        paste_contained(canvas, images[0], (850, 84, 1235, 650), opacity=250, rotate=-4)
        if len(images) > 1:
            paste_contained(canvas, images[1], (1115, 86, 1510, 650), opacity=238, rotate=5)
        if len(images) > 2:
            paste_contained(canvas, images[2], (675, 305, 1010, 690), opacity=228, rotate=-2)
        if len(images) > 3:
            paste_contained(canvas, images[3], (1260, 335, 1560, 700), opacity=220, rotate=3)

    panel = Image.new("RGBA", size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    panel_fill = (0, 0, 0, 142) if not bright else (255, 255, 255, 218)
    panel_outline = (*accent, 130)
    pd.rounded_rectangle((78, 86, 820, 666), radius=26, fill=panel_fill, outline=panel_outline, width=2)
    pd.rounded_rectangle((98, 104, 800, 646), radius=22, outline=(*PURPLE, 90), width=2)
    canvas.alpha_composite(panel)

    paste_logo(canvas, (116, 126), 92)
    title_color = "#ffffff" if not bright else "#10140f"
    sub_color = "#eaffdc" if not bright else "#1b3a24"
    draw_text(d, (224, 132), "BRAMPTON SMOKE CANNABIS", 34, title_color, FONT_BLACK, stroke=2, stroke_fill="#061006" if not bright else "#ffffff")
    draw_text(d, (116, 244), kicker.upper(), 27, (*accent, 255), FONT_BLACK, stroke=2, stroke_fill="#061006" if not bright else "#ffffff")
    title_size = fit_font(d, title.upper(), 650, 92, FONT_IMPACT)
    draw_text(d, (112, 296), title.upper(), title_size, title_color, FONT_IMPACT, stroke=3, stroke_fill="#041006" if not bright else "#ffffff")
    draw_text(d, (118, 418), subtitle, 30, sub_color, FONT_BLACK, stroke=2, stroke_fill="#041006" if not bright else "#ffffff")

    x = 116
    y = 532
    for chip in chips[:3]:
        x += make_chip(d, x, y, chip, accent, dark=not bright) + 18

    draw_text(d, (1390, 632), "BSC", 62, (*accent, 220), FONT_IMPACT, stroke=3, stroke_fill="#041006")
    canvas.convert("RGB").save(OUT / file, "WEBP", quality=93, method=6)


def make_welcome() -> None:
    size = (1800, 560)
    canvas = hero_background(size, centering=(0.5, 0.48), bright=True)
    d = ImageDraw.Draw(canvas)
    neon_frame(canvas, GREEN, radius=28, strong=True)
    add_corner_marks(d, size, GREEN)

    records = records_for_tier("EXOTIC", 2) + records_for_tier("PREMIUM", 2) + records_for_category("EDIBLES", 2)
    images = product_images(records, limit=5)
    if images:
        paste_contained(canvas, images[0], (1055, 40, 1380, 520), opacity=245, rotate=-6)
        if len(images) > 1:
            paste_contained(canvas, images[1], (1300, 42, 1680, 522), opacity=240, rotate=5)
        if len(images) > 2:
            paste_contained(canvas, images[2], (850, 245, 1135, 540), opacity=224, rotate=-2)

    panel = Image.new("RGBA", size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    pd.rounded_rectangle((72, 62, 940, 498), radius=30, fill=(255, 255, 255, 230), outline=(*GREEN, 150), width=3)
    pd.rounded_rectangle((92, 82, 920, 478), radius=24, outline=(*PURPLE, 95), width=2)
    canvas.alpha_composite(panel)

    paste_logo(canvas, (116, 112), 112)
    draw_text(d, (254, 116), "BRAMPTON SMOKE CANNABIS", 42, "#102114", FONT_BLACK, stroke=2, stroke_fill="#ffffff")
    draw_text(d, (116, 218), "WELCOME TO", 48, PURPLE + (255,), FONT_BLACK, stroke=2, stroke_fill="#ffffff")
    draw_text(d, (114, 274), "BSC", 122, GREEN + (255,), FONT_IMPACT, stroke=4, stroke_fill="#512378")
    draw_text(d, (328, 318), "MENU HUB", 48, "#122015", FONT_BLACK, stroke=2, stroke_fill="#ffffff")
    draw_text(d, (118, 392), "EXPLORE EVERY TIER", 38, "#122015", FONT_BLACK, stroke=2, stroke_fill="#ffffff")
    draw_text(d, (118, 452), "Flower, vapes, edibles, pre-rolls and more.", 20, "#25432d", FONT_BLACK)

    x = 1010
    for chip in ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"]:
        w = make_chip(d, x, 438, chip, GREEN, dark=True)
        x += w + 12
    canvas.convert("RGB").save(OUT / "welcome-real.webp", "WEBP", quality=94, method=6)


TIER_ASSETS = [
    ("exotic", "EXOTIC", "Top shelf flower lane", ["35-39% THC", "$10-$12/g", "Falby Rd"], (205, 62, 218), records_for_tier("EXOTIC")),
    ("premium", "PREMIUM", "Connoisseur flower picks", ["32-34% THC", "$7-$10/g", "BSC flower"], GOLD, records_for_tier("PREMIUM")),
    ("aaa", "AAA+", "Strong quality and value", ["30-32% THC", "$5-$6/g", "Popular tier"], (80, 225, 245), records_for_tier("AAA+")),
    ("aa", "AA", "Daily flower value", ["27-29% THC", "$4/g", "Daily picks"], GREEN, records_for_tier("AA")),
    ("budget", "BUDGET", "Value flower options", ["From $3/g", "Budget lane", "BSC value"], (230, 235, 232), records_for_tier("BUDGET")),
]

CATEGORY_ASSETS = [
    ("edibles", "EDIBLES", "Gummies, chocolates and drinks", ["Gummies", "Chocolate", "Menu"], (255, 128, 42), records_for_category("EDIBLES")),
    ("thc-vape", "THC VAPE", "Vape menu categories", ["Carts", "Pens", "Menu"], PURPLE_LIGHT, records_for_category("VAPE PENS")),
    ("nic-vape", "NIC VAPE", "Disposable vape browsing", ["Disposable", "Flavours", "Menu"], (146, 104, 255), records_for_category("VAPE DISPOSABLE")),
    ("concentrates", "CONCENTRATES", "Hash, resin and extracts", ["Hash", "Resin", "Extracts"], GOLD, records_for_category("CONCENTRATES")),
    ("prerolls", "PRE-ROLLS", "Ready-to-go pre-roll picks", ["Singles", "Packs", "Pre-rolls"], GREEN, records_for_category("PREROLLS")),
    ("accessories", "ACCESSORIES", "Smoke-shop essentials", ["Papers", "Tools", "Add-ons"], (85, 230, 205), records_for_category("ACCESSORIES")),
    ("cigarettes", "CIGARETTES", "Native smoke category", ["Brands", "Cartons", "Current menu"], (230, 220, 198), records_for_category("CIGARETTES")),
    ("magic", "MAGIC STUFF", "Specialty menu category", ["Specialty", "Menu", "Varies"], (188, 102, 255), records_for_category("MAGIC") or records_for_category("EDIBLES")),
]


def main() -> None:
    make_welcome()

    for slug, title, subtitle, chips, accent, records in TIER_ASSETS:
        make_tile(f"tile-{slug}.webp", accent, records, title)
        make_banner(f"tier-{slug}.webp", title, "BSC flower tier", subtitle, chips, accent, records)

    menu_records = records_for_category("EDIBLES", 2) + records_for_category("PREROLLS", 2) + records_for_category("VAPE PENS", 2)
    make_tile("tile-menu-plus.webp", (255, 130, 40), menu_records, "EDIBLES - PRE-ROLLS - MORE", product_kind="items")
    make_banner(
        "category-menu-plus.webp",
        "EDIBLES / PRE-ROLLS / MORE",
        "BSC menu shortcut",
        "Quick access to non-flower categories",
        ["Edibles", "Pre-rolls", "Vapes"],
        (255, 130, 40),
        menu_records,
    )

    for slug, title, subtitle, chips, accent, records in CATEGORY_ASSETS:
        make_tile(f"tile-{slug}.webp", accent, records, title, product_kind="items")
        make_banner(f"category-{slug}.webp", title, "BSC menu category", subtitle, chips, accent, records)

    page_records = records_for_tier("EXOTIC", 2) + records_for_tier("PREMIUM", 2) + records_for_category("CONCENTRATES", 2)
    for file, title, kicker, subtitle, chips, accent in [
        ("page-faq.webp", "FAQ", "BSC answers", "Store questions, hours and menu details", ["Open 24 hours", "Falby Rd", "Adults 19+"], GREEN),
        ("page-contact.webp", "VISIT BSC", "BSC store info", "132 Falby Rd Unit B, Brampton", ["Falby Rd", "Open 24 hours", "Walk in"], GREEN),
        ("page-resources.webp", "RESOURCE HUB", "BSC local guides", "Brampton menu planning without the guesswork", ["Flower tiers", "Value lanes", "Native smokes"], PURPLE_LIGHT),
        ("page-delivery.webp", "DELIVERY PREVIEW", "BSC delivery", "Delivery information when this lane opens", ["Menu first", "Store info", "Adults 19+"], GREEN),
        ("page-brampton.webp", "BRAMPTON MENU HUB", "BSC local page", "Falby Road cannabis menu stop", ["Falby Rd", "Steeles area", "Open 24 hours"], GOLD),
        ("page-budget.webp", "BUDGET CANNABIS", "BSC value guide", "Value flower and tier options", ["Budget", "AA", "Current menu"], (230, 235, 232)),
        ("page-cigarettes.webp", "NATIVE SMOKES", "BSC cigarette guide", "Current cigarette listings and visit details", ["Brands", "Cartons", "Menu"], (230, 220, 198)),
        ("page-near-me.webp", "DISPENSARY NEAR ME", "BSC local guide", "Brampton store details for nearby shoppers", ["Brampton", "Falby Rd", "Resources"], GREEN),
    ]:
        make_banner(file, title, kicker, subtitle, chips, accent, page_records)

    print(f"Generated BSC real assets in {OUT}")


if __name__ == "__main__":
    main()
