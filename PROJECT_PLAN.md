# zell-v.com Rebuild — Project Plan & Progress

**Current site:** https://zell-v.com
**Product reference:** https://my.zell-v.com/#
**Started:** 2026-09-17

## Goals
- Redesign the whole site. The current one looks plain and outdated.
- Mostly reuse the current content and information.
- Add Google Analytics and other tracking.
- Add new products, with a cart and PayPal checkout.

Status key: `[ ]` not started · `[~]` in progress · `[x]` done

## Decisions
| Topic | Decision |
|-------|----------|
| Build | Plain HTML/CSS/JS, replacing the old WordPress site built by another vendor |
| Hosting | SiteGround (current host) |
| Content editing | Owner edits the code directly, no CMS |
| Tracking | Google Analytics only for now; other tools later |
| Retreat form | Submissions go to Google Sheets (via Google Apps Script) |
| Inquiry | Floating WhatsApp button on every page: **+65 9382 2879** (zell-v.com number) |
| Content source | **Global zell-v.com**, not my.zell-v.com. Keep its content and information; redesign the layout. |
| Language | English only |
| New products | Owner will add them later |
| Currency | USD for now, using the old shop prices |
| ZÉLL-V® Therapy | Enquiry only, not sold in the cart |
| Design | A. Luxury Editorial: ivory and black with gold accents, Cormorant Garamond headings, Outfit body text. Rules in `design-system/zell-v/MASTER.md` |
| Payment | PayPal, HTML only (option B). The browser sends the amount, so check each order amount in PayPal before shipping. |

---

## Sitemap

```
Home
├── About Us
│   ├── Cellular Therapy (include benefits)
│   ├── Brand Story
│   ├── Medical Panel
│   ├── Testimonials
│   └── History (timeline, with awards and credentials for trust)
├── Products
│   ├── Categories: Detoxification, Rejuvenation, Anti-Ageing, Beauty
│   ├── All Products
│   └── Add to Cart (PayPal)
├── Wellness Retreat
├── Global Presence / Business Associate
└── Articles
```

---

## Phase 0 — Setup & Discovery
- [x] Choose the tech stack and hosting (HTML on SiteGround)
- [x] Pull all content, images and copy from zell-v.com (see `_content/README.md`)
- [x] Pull the product list, categories, prices and images from my.zell-v.com
- [x] Set up the design direction: A. Luxury Editorial (see `design-system/zell-v/MASTER.md`)
- [x] Set up the project and version control (git initialised; `_content/images` and `_content/videos` are excluded)

## Phase 1 — Home Page
Keep the current content and restructure the design.
- [x] Home page (`index.html`), rebuilt on 2026-09-19 to follow zell-v.com content. Waiting for owner review.
- [x] Shared stylesheet `assets/css/main.css` and script `assets/js/site.js`
- [x] Optimised images in `assets/images/` (brand, home, products, doctors)
- [x] Parallax hero: 4 image layers move at different speeds on scroll (GSAP ScrollTrigger + Lenis smooth scroll, loaded from CDN; code in `assets/js/parallax.js`). Turned off for visitors who prefer reduced motion, gentler on phones.

## Phase 2 — About Us
- [x] Cellular Therapy, including all 16 benefits (`about/cellular-therapy.html`)
- [x] Brand Story (`about/brand-story.html`)
- [x] Medical Panel: 4 lead doctors and 8 panel doctors (`about/medical-panel.html`)
- [x] Testimonials: 10 stories with topic filters (`about/testimonials.html`)
- [x] History & Awards: 6 award cards and a 21-milestone timeline for 2016–2024 (`about/history.html`). Timeline photos and captions come from my.zell-v.com, because zell-v.com has no timeline. Owner will send the full awards list.

## Phase 3 — Products
- [ ] Category pages: Detoxification, Rejuvenation, Anti-Ageing, Beauty
- [ ] All Products page
- [ ] Product detail page
- [ ] Cart
- [ ] PayPal checkout
- [ ] Add the new products

## Phase 4 — Wellness Retreat
Keep the overall content and restructure the design.
- [ ] Wellness Retreat page
- [ ] Enquiry/booking form that saves to Google Sheets

## Site-wide
- [x] Shared header, navigation and footer. Edit the menu, contact details and footer links at the top of `assets/js/site.js`.
- [x] Floating WhatsApp button (+65 9382 2879), added to every page automatically by `assets/js/site.js`
- [ ] Contact, Privacy Policy, Terms and Disclaimer pages (linked from the header and footer, not built yet)

## Phase 5 — Global Presence / Business Associate
Keep the overall content and restructure the design.
- [ ] Global Presence / Business Associate page

## Phase 6 — Articles
zell-v.com has no articles, so use the 16 articles from my.zell-v.com (owner approved 2026-09-19).
- [ ] Articles listing page
- [ ] Article detail page
- [ ] Move the existing articles over

## Phase 7 — Tracking & Analytics
- [ ] Google Analytics 4
- [ ] Other tracking (on hold)
- [ ] Conversion events: add to cart, checkout, retreat form submission

## Phase 8 — Launch
- [ ] Test on mobile and desktop
- [ ] SEO: meta tags, sitemap.xml, redirects from old URLs
- [ ] Performance and accessibility check
- [ ] Deploy and switch the domain over

---

## Link paths (important)
Links in the HTML are **relative** (`assets/css/main.css` on the home page, `../assets/...` inside `about/`). This lets the same files work at the domain root (zell-v.com) **and** in a subfolder (GitHub Pages: kokoronoka.github.io/zellvWebsite/). Do not change them to start with `/`, or the styles will not load on GitHub Pages.

In `assets/js/site.js` the menu and footer links are still written starting with `/`. That file works out the site's folder from its own address and fixes them automatically, so keep writing them that way there.

## How to preview the site locally
Opening `index.html` by double-clicking mostly works now, but a local server behaves exactly like the real site. Run this in the project folder:
```
python -m http.server 8080
```
Then open http://localhost:8080 in a browser.

## Page URLs (planned)
| Page | File |
|---|---|
| Home | `index.html` |
| About pages | `about/cellular-therapy.html`, `about/brand-story.html`, `about/medical-panel.html`, `about/testimonials.html`, `about/history.html` |
| Products | `products/index.html`, category pages `products/detoxification.html`, `rejuvenation.html`, `anti-ageing.html`, `beauty.html`, product pages `products/platinum-plus-3.html`, `platinum-plus.html`, `nmn.html`, `phytogreen.html`, `phytocell-serum.html` (zell-v.com product names) |
| Other | `wellness-retreat.html`, `global-presence.html`, `articles/index.html`, `contact.html`, `cart.html`, `privacy-policy.html`, `terms.html`, `disclaimer.html` |

---

## Open Questions
- PayPal Business account and Client ID? Which currency (MYR?) *(owner will update)*
- Shipping: flat fee, free shipping, or depends on the country? Which countries? *(owner will update)*
- New product details (the owner will send these later)
- Final product prices (using the old USD prices for now)
- Full awards list with years for the History page *(owner will send once confirmed)*

---

## Progress Log
| Date | Update |
|------|--------|
| 2026-09-17 | Plan created. No work started yet. |
| 2026-09-17 | Decided: HTML on SiteGround, no CMS, retreat form saves to Google Sheets, WhatsApp widget, English only. |
| 2026-09-17 | PayPal: chose option B (HTML only). Waiting on PayPal account, currency, shipping and WhatsApp details. |
| 2026-09-17 | Phase 0: collected 50 pages (live + old site), 16 articles, 10 products with old prices, 400 images and 2 videos into `_content/`. Proposed 3 design directions. |
| 2026-09-17 | Owner chose direction A (Luxury Editorial). Design system saved, git initialised. **Phase 0 complete.** |
| 2026-09-19 | Decided: USD pricing for now; ZÉLL-V Therapy is enquiry only. Awards list to follow. |
| 2026-09-19 | Phase 1: built the home page plus the shared header, footer, styles and scripts. Tested at 390, 768, 820, 1024 and 1440 px with no errors or sideways scrolling. Waiting for owner review. |
| 2026-09-19 | Owner: content must follow **zell-v.com** (global), not my.zell-v.com. zell-v.com redirects Malaysian visitors, so it was re-crawled with a cookie to get the real site. Home page rebuilt with zell-v.com sections: hero with film, cellular therapy, medical experts, About tiles, Our Product, Benefits tabs, testimonials, Global Presence. Footer now uses zell-v.com details (Singapore office, hotline, social links, Legal, Product Update PDF). |
| 2026-09-19 | WhatsApp number confirmed (+65 9382 2879); floating button added. Articles will use my.zell-v.com content. Added parallax scrolling to the home hero (owner's React/GSAP example rebuilt in plain JS, no React needed). |
| 2026-09-19 | Hero now uses the owner's Swiss Alps artwork in 3 parallax layers (sky, Matterhorn range, foreground ridge); green backgrounds removed, same scroll effect. Originals kept in `_content/hero-source/` (1252×699; a higher-resolution set would look sharper on large screens). |
| 2026-09-19 | **Phase 2 done**: 5 About pages built from zell-v.com content, with a shared page banner, About sub-menu, shared icon file (`assets/images/icons.svg`), testimonial filters and a timeline with year jump-bar. Tested desktop and mobile with no errors. |
| 2026-09-20 | Fixed styles not loading on GitHub Pages: all page links converted from root-absolute (`/assets/...`) to relative, and `assets/js/site.js` now detects the site folder for the menu, footer and logo. Verified at the domain root and in a `/zellvWebsite/` subfolder. Added `.nojekyll`. |
