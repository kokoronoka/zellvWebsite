# ZÉLL-V Design System: Master File

> **How to use:** When building a page, first check `design-system/zell-v/pages/[page-name].md`.
> If that file exists, its rules override this file. Otherwise follow this file.

**Direction:** A. Luxury Editorial (chosen 2026-09-17)
**Feel:** premium, calm, confident, scientific but warm. Think high-end skincare or jewellery brand, not a pharmacy.
**Stack:** plain HTML + CSS + vanilla JS, hosted on SiteGround.
**Settings used:** layout variety 4/10 (balanced), motion 4/10 (subtle), density 3/10 (spacious)

---

## 1. Colour tokens

All text pairs below were contrast-checked (WCAG AA needs 4.5:1 for body text).

| Token | Hex | Use |
|---|---|---|
| `--c-ink` | `#171717` | Headings, primary text, dark sections, primary button |
| `--c-body` | `#5D5B59` | Body text on light backgrounds (6.4:1 on ivory) |
| `--c-ivory` | `#FAF8F3` | Main page background |
| `--c-sand` | `#F1ECE2` | Alternate section background, cards on ivory |
| `--c-white` | `#FFFFFF` | Cards, inputs |
| `--c-gold` | `#D4A647` | **Decoration only on light backgrounds** (lines, icons, borders, numbers on dark). Fine as text on ink (8:1). |
| `--c-gold-text` | `#7A5C14` | Gold-coloured **text** on ivory or sand (5.9:1) |
| `--c-muted-dark` | `#B5B0A8` | Secondary text on ink backgrounds (8.3:1) |
| `--c-line` | `#E4DDD0` | Borders and dividers on light backgrounds |
| `--c-error` | `#B42318` | Form errors |
| `--c-success` | `#2E7D4F` | Success messages |

**Rules**
- Never use `#D4A647` for text on ivory, sand or white. Use `--c-gold-text`.
- Gold is an accent: keep it to about 10% of any screen.
- Dark sections (ink background) are allowed for drama: hero overlays, awards strip, footer.

```css
:root {
  --c-ink: #171717;
  --c-body: #5D5B59;
  --c-ivory: #FAF8F3;
  --c-sand: #F1ECE2;
  --c-white: #FFFFFF;
  --c-gold: #D4A647;
  --c-gold-text: #7A5C14;
  --c-muted-dark: #B5B0A8;
  --c-line: #E4DDD0;
  --c-error: #B42318;
  --c-success: #2E7D4F;
}
```

## 2. Typography

- **Headings:** Cormorant Garamond (weights 500 and 600). It's an elegant serif. Don't use weights below 500, which are too thin to read.
- **Body and interface:** Outfit (weights 300, 400, 500, 600). This is the current brand font.
- **Small uppercase labels** (eyebrows, navigation, buttons): Outfit 500, uppercase, letter-spacing `0.14em`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
```

| Token | Size (mobile to desktop) | Font / weight | Line height |
|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 6vw, 5rem)` | Cormorant 500 | 1.05 |
| `--fs-h1` | `clamp(2.25rem, 4.5vw, 3.75rem)` | Cormorant 500 | 1.1 |
| `--fs-h2` | `clamp(1.875rem, 3.5vw, 2.75rem)` | Cormorant 500 | 1.15 |
| `--fs-h3` | `clamp(1.375rem, 2.2vw, 1.75rem)` | Cormorant 600 | 1.25 |
| `--fs-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | Outfit 300 | 1.6 |
| `--fs-body` | `1rem` (16px) | Outfit 400 | 1.7 |
| `--fs-small` | `0.875rem` | Outfit 400 | 1.5 |
| `--fs-eyebrow` | `0.75rem` | Outfit 500, uppercase, 0.14em | 1.4 |

- Keep text lines to 60–75 characters (`max-width: 65ch`).
- Headings use sentence case or title case, not all caps. Only eyebrows and buttons are uppercase.

## 3. Spacing and layout

| Token | Value | Use |
|---|---|---|
| `--space-xs` | 4px | Tight gaps |
| `--space-sm` | 8px | Icon gaps |
| `--space-md` | 24px | Standard padding |
| `--space-lg` | 32px | Card padding |
| `--space-xl` | 48px | Large gaps |
| `--space-2xl` | 64px | Section padding on mobile |
| `--space-3xl` | 96px | Section padding on desktop |
| `--space-4xl` | 144px | Hero and major section breaks on desktop |

- Container: `max-width: 1240px`, side padding 20px on mobile and 40px on desktop.
- Narrow text container for articles and story pages: `max-width: 720px`.
- Breakpoints (mobile-first): 600px, 900px, 1200px. Test at 375, 768, 1024 and 1440.
- Editorial layouts: alternate image-left and image-right, allow asymmetric 7/5 column splits, give images plenty of room.

## 4. Shape, depth and texture

- Border radius: `2px` for buttons and inputs, `4px` for cards and images. Keep corners sharp and refined, not bubbly.
- Shadows: rarely. Prefer borders `1px solid var(--c-line)` and colour blocks.
  - `--shadow-soft: 0 12px 40px -12px rgba(23,23,23,0.12)` for product cards on hover and the cart drawer
- Thin gold rule: `width: 48px; height: 1px; background: var(--c-gold)` under eyebrows or before headings.
- Images: warm, high quality, `object-fit: cover`, always with a set aspect ratio to prevent layout shift.

## 5. Components

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 48px; padding: 14px 32px;
  font: 500 0.8125rem/1 'Outfit', sans-serif; letter-spacing: 0.14em; text-transform: uppercase;
  border-radius: 2px; border: 1px solid transparent; cursor: pointer;
  transition: background-color 250ms ease, color 250ms ease, border-color 250ms ease;
}
.btn-primary   { background: var(--c-ink); color: var(--c-ivory); }
.btn-primary:hover { background: #2E2B27; }
.btn-gold      { background: var(--c-gold); color: var(--c-ink); }       /* 8:1 */
.btn-gold:hover { background: #C4943A; }
.btn-outline   { background: transparent; color: var(--c-ink); border-color: var(--c-ink); }
.btn-outline:hover { background: var(--c-ink); color: var(--c-ivory); }
.btn:focus-visible { outline: 2px solid var(--c-gold-text); outline-offset: 3px; }
```
- One primary button per section. Text links use `--c-ink` with a 1px gold underline.

### Product card
- Image on a sand background (square, `aspect-ratio: 1`), category eyebrow, name in Cormorant h3, short benefit line, price, and "Add to cart" plus "Details".
- Hover: image zooms slightly (`scale 1.03`, inside `overflow: hidden`) and `--shadow-soft` appears. Nothing around the card moves.

### Header / navigation
- Sticky header, transparent over the hero, then ivory with a bottom border after scrolling.
- Desktop: logo left, menu centre (About ▾, Products ▾, Wellness Retreat, Global Presence, Articles), cart icon with item count on the right.
- Mobile: hamburger opens a full-screen ink-coloured menu with accordion submenus. All tap targets at least 44px.

### Forms (Wellness Retreat → Google Sheets)
- Labels always visible above fields; never use a placeholder as the label.
- Inputs: white background, `1px solid var(--c-line)`, 2px radius, 48px min height, focus border ink plus gold focus ring.
- Show errors below each field in `--c-error`. On submit, disable the button and show a loading state, then a success message in place of the form.

### WhatsApp floating button
- Bottom-right, 56px circle, WhatsApp green `#25D366` with a white icon, `aria-label="Chat with us on WhatsApp"`.
- Must not cover the cart button or cookie banner on mobile. Keep 16px from the screen edges.

### Timeline (History)
- Vertical line in `--c-gold`, year in Cormorant display size with gold text, photo and caption per milestone. Awards get a small laurel/badge icon.

## 6. Icons
- Use **Lucide** SVG icons, stroke 1.5, size 20 or 24px, colour ink or gold.
- No emojis as icons. Icon-only buttons need an `aria-label`.

## 7. Motion (subtle)
- Default transition 250ms ease. Entrances 500–700ms using `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal: fade in plus move up 24px, stagger 80ms for grids. Use IntersectionObserver. No GSAP library needed unless a page needs more.
- Hero: slow image zoom (1.06 to 1 over 1.6s) on load.
- With `prefers-reduced-motion: reduce`, turn off all movement and show final states immediately.
- Don't use: bouncy/back easing, parallax on mobile, auto-rotating carousels without a pause control.

## 8. Page pattern (Luxury Editorial storytelling)
Typical section rhythm for main pages:
1. **Hero:** full-bleed photo or video, eyebrow, display heading, one lead line, one call-to-action button
2. **Proof strip:** ink background with 3–4 stats or awards in gold (20+ years, 10+ countries, awards)
3. **Story chapter:** 7/5 split of image and text, gold rule, short copy, text link
4. **Showcase:** product or program grid on sand
5. **Authority:** medical panel portraits (black-and-white or warm tone) with credentials
6. **Social proof:** testimonials, one large quote at a time, with previous/next controls
7. **Closing call to action:** ink section with Cormorant heading and a gold button

## 9. Anti-patterns (don't)
- Cheap or stock-looking visuals, clip-art icons, emojis
- Gold text on light backgrounds (fails contrast)
- Rounded bubbly cards, heavy drop shadows, gradients, glassmorphism
- Fast or bouncy animation, auto-playing sliders without controls
- All-caps paragraphs or headings; text under 14px
- Layout shift on hover or when images load
- Walls of text: break long medical copy into sections with headings, lists and images

## 10. Pre-delivery checklist
- [ ] Text contrast at least 4.5:1 (check gold usage especially)
- [ ] Visible focus states on every link, button and field
- [ ] All tap targets at least 44×44px
- [ ] Images: WebP, `width`/`height` or `aspect-ratio` set, `loading="lazy"` below the fold, meaningful `alt`
- [ ] `prefers-reduced-motion` respected
- [ ] No horizontal scroll at 375px
- [ ] Sticky header doesn't cover anchor targets (`scroll-margin-top`)
- [ ] Tested at 375, 768, 1024 and 1440px
- [ ] Each page has a unique `<title>` and meta description, one `<h1>`, logical heading order
