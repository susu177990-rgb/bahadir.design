#!/usr/bin/env python3
"""Generate the landscape PDF portfolio from the website's current assets."""

from __future__ import annotations

from pathlib import Path
from typing import Sequence

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / "tmp" / "pdfs"
THUMBS = TMP / "thumbs"
OUTPUT = ROOT / "output" / "pdf" / "bahadir-portfolio.pdf"

SITE = "https://bahadir.design"
W, H = landscape(A4)

PAPER = HexColor("#f1f0ed")
PAPER_2 = HexColor("#e8e6e1")
DARK = HexColor("#0a0a0a")
PANEL = HexColor("#171717")
INK = HexColor("#1a1915")
TEXT = HexColor("#d4d0c8")
MUTED = HexColor("#7a7870")
SOFT = HexColor("#9b9890")
LINE_DARK = HexColor("#2a2a28")
LINE_LIGHT = HexColor("#cfccc5")


def ensure_fonts() -> None:
    pdfmetrics.registerFont(TTFont("CN", "/System/Library/Fonts/STHeiti Light.ttc", subfontIndex=0))
    pdfmetrics.registerFont(TTFont("CN-Bold", "/System/Library/Fonts/STHeiti Medium.ttc", subfontIndex=0))
    pdfmetrics.registerFont(TTFont("DIN", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=7))
    pdfmetrics.registerFont(TTFont("DIN-Heavy", "/System/Library/Fonts/Avenir Next.ttc", subfontIndex=8))


def load_video_covers() -> list[Path]:
    results: list[Path] = []
    for index in range(1, 11):
        cover = ROOT / "public" / "image" / "video-posters" / f"01-{index:02d}.jpg"
        if not cover.exists():
            raise FileNotFoundError(f"Missing website video cover: {cover}")
        results.append(cover)
    return results


def image_fit(path: Path, box_w: int, box_h: int, key: str, position=(0.5, 0.5)) -> Path:
    THUMBS.mkdir(parents=True, exist_ok=True)
    output = THUMBS / f"{key}-{box_w}x{box_h}.jpg"
    if output.exists() and output.stat().st_mtime >= path.stat().st_mtime:
        return output
    with Image.open(path) as source:
        image = source.convert("RGB")
        image = ImageOps.fit(image, (box_w, box_h), method=Image.Resampling.LANCZOS, centering=position)
        image.save(output, quality=92, optimize=True)
    return output


def set_font(c: canvas.Canvas, bold: bool, size: float, english: bool = False) -> None:
    if english:
        c.setFont("DIN-Heavy" if bold else "DIN", size)
    else:
        c.setFont("CN-Bold" if bold else "CN", size)


def text_width(text: str, bold: bool, size: float, english: bool = False) -> float:
    font = "DIN-Heavy" if english and bold else "DIN" if english else "CN-Bold" if bold else "CN"
    return pdfmetrics.stringWidth(text, font, size)


def wrap_text(text: str, max_width: float, size: float, bold: bool = False) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        current = ""
        for char in paragraph:
            candidate = current + char
            if current and text_width(candidate, bold, size) > max_width:
                lines.append(current.rstrip())
                current = char.lstrip()
            else:
                current = candidate
        if current:
            lines.append(current.rstrip())
        if not paragraph:
            lines.append("")
    return lines


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    size: float,
    color,
    leading: float = 1.55,
    bold: bool = False,
    max_lines: int | None = None,
) -> float:
    lines = wrap_text(text, max_width, size, bold)
    if max_lines is not None:
        lines = lines[:max_lines]
    set_font(c, bold, size)
    c.setFillColor(color)
    step = size * leading
    for line in lines:
        c.drawString(x, y, line)
        y -= step
    return y


def draw_label(c: canvas.Canvas, text: str, x: float, y: float, color=MUTED) -> None:
    set_font(c, True, 7.5, english=True)
    c.setFillColor(color)
    c.drawString(x, y, text.upper())


def draw_rule(c: canvas.Canvas, x1: float, y: float, x2: float, color) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(0.6)
    c.line(x1, y, x2, y)


def page_footer(c: canvas.Canvas, page: int, dark: bool = True) -> None:
    color = MUTED if dark else HexColor("#726f68")
    draw_label(c, "BAHADIR.DESIGN / PORTFOLIO 2026", 42, 22, color)
    set_font(c, True, 8, english=True)
    c.setFillColor(color)
    c.drawRightString(W - 42, 22, f"{page:02d}")


def new_page(c: canvas.Canvas, page: int, dark: bool = True) -> None:
    c.setFillColor(DARK if dark else PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    page_footer(c, page, dark)


def linked_image(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    w: float,
    h: float,
    url: str | None,
    key: str,
    position=(0.5, 0.5),
) -> None:
    fitted = image_fit(path, max(1, int(w * 2)), max(1, int(h * 2)), key, position)
    c.drawImage(str(fitted), x, y, width=w, height=h, mask="auto")
    if url:
        c.linkURL(url, (x, y, x + w, y + h), relative=0, thickness=0)


def cover(c: canvas.Canvas, page: int) -> None:
    new_page(c, page, dark=False)
    draw_label(c, "AIGC PRODUCTION / VIBE CODING SYSTEMS", 44, H - 42, INK)
    set_font(c, True, 88, english=True)
    c.setFillColor(INK)
    c.drawString(38, H - 160, "BAHADIR")
    set_font(c, True, 106)
    c.drawString(38, H - 278, "巴哈地尔")
    draw_rule(c, 44, 170, W - 44, LINE_LIGHT)
    y = draw_wrapped(
        c,
        "AI 视觉工程专家 / 全栈开发者 / AIGC 工作流自动化实践者",
        44,
        140,
        520,
        15,
        INK,
        leading=1.45,
        bold=True,
    )
    draw_wrapped(c, "把非标准化创作做成可复用、可扩展、可交付的生产系统。", 44, y - 12, 500, 10.5, HexColor("#66635d"), leading=1.6)
    c.linkURL(SITE, (44, 54, 270, 96), relative=0, thickness=0)
    set_font(c, True, 10, english=True)
    c.setFillColor(INK)
    c.drawString(44, 66, "BAHADIR.DESIGN  ↗")


def profile(c: canvas.Canvas, page: int) -> None:
    new_page(c, page)
    draw_label(c, "PROFILE / POSITIONING", 44, H - 42)
    set_font(c, True, 58)
    c.setFillColor(TEXT)
    c.drawString(42, H - 118, "我做的不只是图，")
    c.drawString(42, H - 180, "而是视觉生产系统。")
    draw_rule(c, 44, H - 220, W - 44, LINE_DARK)

    columns = [
        ("01", "AIGC CONTROL", "角色一致性、场景连续性、AI 视频分镜、虚拟 IP、风格 DNA 与 Prompt Library。"),
        ("02", "VIBE CODING", "用 Next.js、React、TypeScript、Supabase 与自动化工具把经验产品化。"),
        ("03", "WORKFLOW SYSTEMS", "把输入、判断、生成、复核与修正变成可安装、可维护、可交接的工作流资产。"),
    ]
    col_w = (W - 88 - 40) / 3
    for i, (num, title, body) in enumerate(columns):
        x = 44 + i * (col_w + 20)
        set_font(c, True, 28, english=True)
        c.setFillColor(TEXT)
        c.drawString(x, H - 278, num)
        draw_label(c, title, x, H - 308, TEXT)
        draw_wrapped(c, body, x, H - 338, col_w - 8, 10.5, SOFT, leading=1.65)

    draw_rule(c, 44, 108, W - 44, LINE_DARK)
    draw_label(c, "TARGET ROLES", 44, 82)
    set_font(c, True, 12)
    c.setFillColor(TEXT)
    c.drawString(150, 80, "AI 技术专家 / AI 产品经理 / AI 项目经理")


def chapter(c: canvas.Canvas, page: int, marker: str, title: str, subtitle: str) -> None:
    new_page(c, page)
    draw_label(c, "SELECTED WORKS / CHAPTER", 44, H - 42)
    set_font(c, True, 190)
    c.setFillColor(TEXT)
    c.drawString(34, H - 230, marker)
    set_font(c, True, 54)
    c.drawString(250, H - 132, title)
    draw_wrapped(c, subtitle, 254, H - 176, 480, 12, SOFT, leading=1.65)
    draw_rule(c, 254, H - 230, W - 44, LINE_DARK)


def video_overview(c: canvas.Canvas, page: int, frames: Sequence[Path]) -> None:
    new_page(c, page)
    draw_label(c, "AIGC CASE 01 / AI VIDEO", 44, H - 42)
    set_font(c, True, 64, english=True)
    c.setFillColor(TEXT)
    c.drawString(40, H - 112, "AI VIDEO")
    linked_image(c, frames[0], 392, 72, W - 436, H - 112, f"{SITE}/video/ai-video/01-01.mp4", "video-hero")
    draw_label(c, "CLICK IMAGE TO PLAY VIDEO", 404, 54, TEXT)

    y = H - 160
    y = draw_wrapped(c, "把导演或团队给到的脚本、参考图和模糊画面意图，翻译成可生成、可筛选、可进入剪辑流程的视频素材。", 44, y, 300, 12, TEXT, leading=1.65, bold=True)
    blocks = [
        ("MY ROLE", "负责 AI 视频生成执行：理解创作意图，拆成镜头语言，再把画面真正做出来。"),
        ("EXECUTION", "生成、筛选、修正动作、主体、风格与镜头可剪性，并按后期需求补齐素材。"),
        ("DELIVERY", "交付可进入剪辑 / 后期流程的视频片段，并继续配合导演、剪辑与后期修正。"),
    ]
    for label, body in blocks:
        y -= 22
        draw_label(c, label, 44, y)
        draw_rule(c, 44, y - 8, 344, LINE_DARK)
        y = draw_wrapped(c, body, 44, y - 28, 300, 9.5, SOFT, leading=1.55)


def video_gallery(c: canvas.Canvas, page: int, frames: Sequence[Path], start: int, end: int) -> None:
    new_page(c, page)
    draw_label(c, f"AI VIDEO / COVER GALLERY / {start:02d}-{end:02d}", 44, H - 42)
    set_font(c, True, 34, english=True)
    c.setFillColor(TEXT)
    c.drawString(42, H - 82, "CLICK A FRAME TO PLAY")

    selected = frames[start - 1 : end]
    gap = 14
    x0 = 44
    top = H - 118
    if len(selected) <= 4:
        cols, rows = 2, 2
    else:
        cols, rows = 3, 2
    box_w = (W - 88 - gap * (cols - 1)) / cols
    box_h = (top - 54 - gap * (rows - 1)) / rows
    for local_index, frame in enumerate(selected):
        row = local_index // cols
        col = local_index % cols
        x = x0 + col * (box_w + gap)
        y = top - (row + 1) * box_h - row * gap
        video_index = start + local_index
        linked_image(c, frame, x, y, box_w, box_h, f"{SITE}/video/ai-video/01-{video_index:02d}.mp4", f"video-{video_index:02d}")
        c.setFillColor(DARK)
        c.rect(x + 8, y + 8, 42, 18, stroke=0, fill=1)
        set_font(c, True, 8, english=True)
        c.setFillColor(TEXT)
        c.drawString(x + 14, y + 14, f"{video_index:02d}  PLAY ↗")


def case_page(
    c: canvas.Canvas,
    page: int,
    marker: str,
    title: str,
    intro: str,
    blocks: Sequence[tuple[str, str]],
    image_path: Path,
    image_label: str,
    url: str | None = None,
    image_position=(0.5, 0.5),
) -> None:
    new_page(c, page)
    draw_label(c, marker, 44, H - 42)
    set_font(c, True, 50)
    c.setFillColor(TEXT)
    title_lines = wrap_text(title, 330, 50, True)
    title_y = H - 102
    for line in title_lines[:2]:
        c.drawString(40, title_y, line)
        title_y -= 54
    y = title_y - 22
    y = draw_wrapped(c, intro, 44, y, 314, 11.5, TEXT, leading=1.55, bold=True)
    for label, body in blocks:
        y -= 17
        draw_label(c, label, 44, y)
        draw_rule(c, 44, y - 8, 350, LINE_DARK)
        y = draw_wrapped(c, body, 44, y - 26, 306, 9.2, SOFT, leading=1.48)

    linked_image(c, image_path, 390, 58, W - 434, H - 100, url, f"case-{page}", image_position)
    draw_label(c, image_label + (" / CLICK TO OPEN ↗" if url else ""), 402, 42, TEXT)
    if url:
        c.linkURL(url, (402, 34, W - 44, 56), relative=0, thickness=0)


def skills_page(c: canvas.Canvas, page: int) -> None:
    new_page(c, page)
    draw_label(c, "VIBE CODING CASE 05 / SKILL COLLECTION", 44, H - 42)
    set_font(c, True, 54)
    c.setFillColor(TEXT)
    c.drawString(40, H - 110, "Skill 合集")
    draw_wrapped(c, "把 AIGC 制作方法和开发经验做成可安装、可维护、可组合的工作模块。", 44, H - 150, 610, 11.5, SOFT, leading=1.5)

    rows = [
        ("01", "seedance-director-skill", "VIDEO", "导演级 Seedance 视频提示词、分镜与生成稳定性系统。", "https://github.com/susu177990-rgb/seedance-director-skill"),
        ("02", "XHS-write-image-skill", "CONTENT", "主题或长文转小红书封面、多页正文图与视觉档案。", "https://github.com/susu177990-rgb/XHS-write-image-skill"),
        ("03", "universal-gpt-image-2-storyboard-skill", "STORYBOARD", "素材锁定、导演推断、提示词审阅与预制作导演板。", "https://github.com/susu177990-rgb/universal-gpt-image-2-storyboard-skill"),
        ("04", "universal-image-reverse-prompt-skill", "VISION", "把图像拆成事实、推断、不确定项与重建提示词。", "https://github.com/susu177990-rgb/universal-image-reverse-prompt-skill"),
        ("05", "3x3-storyboard-skill", "STORYBOARD", "把创意转化为连续一致的 3x3 九宫格故事板。", "https://github.com/susu177990-rgb/3x3-storyboard-skill"),
        ("06", "ai-liveaction-pipeline-skill", "PIPELINE", "从视觉设计到镜头生产的 AI 实拍化工作流。", "https://github.com/susu177990-rgb/ai-liveaction-pipeline-skill"),
        ("07", "style-dna-prompt-skill", "STYLE", "从参考素材提炼可迁移的视觉风格 DNA 与控制协议。", "https://github.com/susu177990-rgb/style-dna-prompt-skill"),
    ]
    y = H - 198
    row_h = 48
    for index, name, kind, desc, url in rows:
        draw_rule(c, 44, y + 14, W - 44, LINE_DARK)
        set_font(c, True, 10, english=True)
        c.setFillColor(TEXT)
        c.drawString(46, y - 6, index)
        c.drawString(88, y - 6, name)
        draw_label(c, kind, 430, y - 6, SOFT)
        draw_wrapped(c, desc, 510, y - 3, 278, 8.2, SOFT, leading=1.35, max_lines=2)
        c.linkURL(url, (44, y - 24, W - 44, y + 14), relative=0, thickness=0)
        y -= row_h


def closing(c: canvas.Canvas, page: int) -> None:
    new_page(c, page, dark=False)
    draw_label(c, "CONTACT / COLLABORATION", 44, H - 42, INK)
    set_font(c, True, 66)
    c.setFillColor(INK)
    c.drawString(40, H - 132, "一起做点")
    c.drawString(40, H - 202, "有意思的事。")
    draw_rule(c, 44, H - 252, W - 44, LINE_LIGHT)
    links = [
        ("WEBSITE", "bahadir.design", SITE),
        ("EMAIL", "griffith_huo@outlook.com", "mailto:griffith_huo@outlook.com"),
        ("DOUYIN", "@去皮土豆oTATo", "https://v.douyin.com/582fXEnE_Ew/"),
        ("XIAOHONGSHU", "@去皮土豆oTATo", "https://xhslink.com/m/7fpkuw5vgYe"),
    ]
    y = H - 300
    for label, value, url in links:
        draw_label(c, label, 44, y, HexColor("#6f6c65"))
        set_font(c, True, 15)
        c.setFillColor(INK)
        c.drawString(190, y - 2, value + "  ↗")
        c.linkURL(url, (188, y - 12, 600, y + 16), relative=0, thickness=0)
        y -= 52


def build_pdf() -> Path:
    ensure_fonts()
    frames = load_video_covers()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=(W, H), pageCompression=1)
    c.setTitle("Bahadir - AIGC Production & Vibe Coding Portfolio")
    c.setAuthor("Bahadir")
    c.setSubject("AI visual production, full-stack products, and reusable workflow systems")

    page = 1
    cover(c, page); c.showPage(); page += 1
    profile(c, page); c.showPage(); page += 1
    chapter(c, page, "一", "AIGC 制作案例", "AI Video / 虚拟模特 / 儿童绘本 / 提效增质"); c.showPage(); page += 1
    video_overview(c, page, frames); c.showPage(); page += 1
    video_gallery(c, page, frames, 2, 5); c.showPage(); page += 1
    video_gallery(c, page, frames, 6, 10); c.showPage(); page += 1

    public_image = ROOT / "public" / "image"
    case_page(
        c, page, "AIGC CASE 02 / SOCIAL MEDIA", "虚拟模特 / 社媒内容",
        "把 AI 模特从单张图推进到可持续更新的社媒账号内容，重点控制人物一致性、穿搭场景与平台传播效率。",
        [("RESULT", "从零孵化虚拟穿搭博主 IP；两个月内抖音涨粉 2万，小红书涨粉 1万。"),
         ("CONTROL", "建立稳定人物资产，控制脸、身材、妆发、穿搭气质与拍摄风格。"),
         ("VALUE", "验证 AI 虚拟模特可以承担穿搭展示、品牌种草与账号矩阵内容生产。")],
        public_image / "02-01.webp", "OTATO / VIRTUAL MODEL", "https://v.douyin.com/6ERViDuBM6U/", (0.5, 0.34)
    ); c.showPage(); page += 1
    case_page(
        c, page, "AIGC CASE 03 / PICTURE BOOK", "儿童绘本",
        "用 AI 完成长篇儿童绘本视觉生产，核心不是单张插画，而是几十页里的角色、风格、场景与叙事节奏持续稳定。",
        [("SCALE", "参与并主导 30+ 本商业化 AI 绘本制作，个人独立完成 5 本精品绘本。"),
         ("CONSISTENCY", "先建立角色设定、风格边界与场景规则，再进入分页画面生产。"),
         ("DELIVERY", "形成可持续生产的绘本视觉管线，适合团队协作、批量制作与商业交付。")],
        public_image / "03-01.webp", "COMMERCIAL PICTURE BOOK"
    ); c.showPage(); page += 1
    case_page(
        c, page, "AIGC CASE 04 / EFFICIENCY", "提效增质",
        "把不可控的生成手感变成可复用、可检查、可交接的生产流程。",
        [("PROMPT LIBRARY", "把风格、镜头、角色、图像逆向与质量标准整理成可复用资产。"),
         ("SKILL WORKFLOW", "把复杂制作步骤封装成可安装、可调用的工作模块。"),
         ("VISUAL PROTOCOL", "把输入、判断、生成、复核与修正变成明确检查点。")],
        public_image / "04-01.webp", "WORKFLOW / QUALITY CONTROL", "https://github.com/susu177990-rgb/seedance-director-skill"
    ); c.showPage(); page += 1

    chapter(c, page, "二", "Vibe Coding 开发案例", "产品 / 工具 / Agent / 网站 / Skill"); c.showPage(); page += 1
    case_page(
        c, page, "VIBE CODING CASE 01 / PRODUCT", "OTATO.CN",
        "把 AI 模特生产从临时流程做成面向真实用户的商业平台。",
        [("PRODUCT", "面向真实用户的 AI 模特生产平台，而不是内部 Demo。"),
         ("FLOW", "围绕人物资产、服装、动作、场景与后续编辑组织生成链路。"),
         ("RESPONSIBILITY", "负责产品定位、前端工作台、后端能力、用户资产、部署与持续迭代。")],
        public_image / "05-01.webp", "OTATO.CN / LIVE PRODUCT", "https://otato.cn/"
    ); c.showPage(); page += 1
    case_page(
        c, page, "VIBE CODING CASE 02 / WORKBENCH", "OTATO.ART",
        "把对话、图片、视频、剧本、画布、画廊与提示词预设放进同一个长期创作工作台。",
        [("POSITION", "不是单次生成工具，而是用于长期创作项目的工作台。"),
         ("SYSTEM", "多媒体创作入口、项目资产、预设、画廊与提示词材料集中管理。"),
         ("STACK", "用 Next.js、React 与 Supabase 组织全栈结构，并通过 GitHub 持续维护。")],
        public_image / "06-01.webp", "OTATO.ART / OPEN SOURCE", "https://otato.art/"
    ); c.showPage(); page += 1
    case_page(
        c, page, "VIBE CODING CASE 03 / AUTOMATION", "自动化 AI 儿童绘本制作工具",
        "把 AI 绘本制作经验做成自动化工具，让高重复、高判断密度的流程变得可执行。",
        [("PIPELINE", "剧本解析、风格提取、角色审核、分页插画与 ZIP 交付。"),
         ("CONTROL", "每一步都能追踪状态，避免自动化放大错误。"),
         ("RESULT", "绘本制作效率提升 20 倍且不降质，并可继续迭代。")],
        public_image / "07-01.webp", "AI PICTURE BOOK TOOL", "https://ai-picture-book.zeabur.app/"
    ); c.showPage(); page += 1
    case_page(
        c, page, "VIBE CODING CASE 04 / VERTICAL TOOL", "福乐音乐工作室官网",
        "把音乐工作室官网与在线音频分析工具结合，让业务展示和实用工具在同一站点完成。",
        [("ANALYSIS", "支持 BPM、调性、LUFS、真峰值等专业音频指标分析。"),
         ("ARCHITECTURE", "Next.js 负责网站与交互，Python / Essentia 承载音频分析。"),
         ("MEANING", "证明开发能力可以落到 AIGC 之外的垂直业务工具。")],
        public_image / "08-01.webp", "FUEL MUSIC / AUDIO ANALYSIS", "https://fuelmusic.cn/"
    ); c.showPage(); page += 1
    skills_page(c, page); c.showPage(); page += 1
    closing(c, page); c.showPage()

    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(build_pdf())
