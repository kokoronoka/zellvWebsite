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
- [x] Hero background is a looping Swiss Alps sunrise video (`hero-alps-1280.mp4` desktop, `hero-alps-854.mp4` phones, `hero-alps-poster.webp` still frame), Original video kept in `_content/hero-source/`.
- [x] ~~Parallax hero~~ removed on 2026-09-21 at owner's request. The hero is now the video with the text on top.

## Phase 2 — About Us
- [x] Cellular Therapy, including all 16 benefits (`about/cellular-therapy.html`)
- [x] Brand Story (`about/brand-story.html`)
- [x] Medical Panel: 4 lead doctors and 8 panel doctors (`about/medical-panel.html`)
- [x] Testimonials: 10 stories with topic filters (`about/testimonials.html`)
- [x] History & Awards: 6 award cards and a 21-milestone timeline for 2016–2024 (`about/history.html`). Timeline photos and captions come from my.zell-v.com, because zell-v.com has no timeline. Owner will send the full awards list.

## Phase 3 — Products
- [x] Product catalogue in one file: `assets/js/products.js` (names, categories, options, **prices**, shipping and PayPal settings)
- [x] All Products page with category filters (`products/index.html`)
- [x] Category pages: Detoxification, Rejuvenation, Anti-Ageing, Beauty
- [x] Category pages now explain each topic before the products (2026-09-28): banner, what it is, benefits, the ZÉLL-V approach, then products, FAQs and a category menu. All Products is unchanged. Text comes from zell-v.com product pages and the approved my.zell-v.com articles. **Owner to review the wording.** Edit the text directly in `products/detoxification.html`, `rejuvenation.html`, `anti-ageing.html` and `beauty.html`.
- [x] Product pages: Platinum Plus 3, Platinum Plus, NMN, Phytogreen, Phytocell Serum (with option pickers), and Therapy (enquiry only)
- [x] Slide-out mini cart and cart page (`cart.html`), cart saved in the visitor's browser
- [x] PayPal checkout in **test mode** (`paypalClientId: 'sb'`) and an order confirmation page (`order-success.html`)
- [ ] Switch PayPal to live: put the real Client ID in `assets/js/products.js`
- [ ] Set the shipping rule in `assets/js/products.js` (currently shows "To be confirmed" and charges $0)
- [x] ZÉLL-V NMN Plus added under Anti-Ageing (`products/nmn-plus.html`), content and images from zellvnmn.com. Enquiry only, because zellvnmn.com shows no price. **To sell it online:** in `assets/js/products.js` remove `enquiryOnly: true` and add a price option.
- [ ] Add the new products (owner will send details)

## Phase 4 — Wellness Retreat
Keep the overall content and restructure the design.
- [x] Wellness Retreat page (`wellness-retreat.html`): hero with the retreat film, intro, 8 programme cards with detail pop-ups (text taken from the zell-v.com "View More" images), 4-stage journey, 16-photo facilities gallery with a photo viewer, 3 awards, enquiry form
- [x] Enquiry form built and tested; "Enquire about this plan" in each pop-up ticks the matching box in the form
- [x] Form connected to Google Sheets (2026-10-19): the Web app URL is set in `assets/js/retreat.js` (`FORM_ENDPOINT`). The endpoint responds. Owner to send one real test enquiry and confirm the row and notification email arrive.

## Site-wide
- [x] Shared header, navigation and footer. Edit the menu, contact details and footer links at the top of `assets/js/site.js`.
- [x] Floating WhatsApp button (+65 9382 2879), added to every page automatically by `assets/js/site.js`
- [ ] Contact, Privacy Policy, Terms and Disclaimer pages (linked from the header and footer, not built yet)

## Phase 5 — Global Presence / Business Associate
Keep the overall content and restructure the design.
- [x] Global Presence / Business page (`global-presence.html`): uses selected content from the owner's business page (kokoronoka.github.io/businessZellv): hero with stats, the opportunity, the business model, an activity carousel, an interactive map (edit `REGIONS` in `assets/js/global.js`), centres, press, and a partner form that sends via WhatsApp. Products, retreats, doctors and testimonials are left to their own pages to avoid repeating them.

## Phase 6 — Articles
zell-v.com has no articles, so use the articles from my.zell-v.com (owner approved 2026-09-19). There are 14, not 16 as first counted.
- [x] Articles listing page (`articles/index.html`): newest first, with the latest as a large feature card, and topic filters (Cellular Therapy, Anti-Ageing, Skin & Beauty, Nutrition & Detox, Healthy Living)
- [x] Article pages (`articles/<name>.html`): date and reading time, main image, contents list that highlights the current section, featured product for the topic, WhatsApp help, share buttons, health disclaimer, older/newer links, related articles, and Article SEO data
- [x] All 14 articles moved over with their images. Links to my.zell-v.com pages now point to the matching pages on this site, the old Malaysian WhatsApp buttons were removed, and the unlinked "Learn More" teasers were dropped.
- To add an article: copy an existing article page, change the text, and add a card to `articles/index.html` (set `data-tags` to a topic).

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
| Products | `products/index.html`, category pages `products/detoxification.html`, `rejuvenation.html`, `anti-ageing.html`, `beauty.html`, product pages `products/platinum-plus-3.html`, `platinum-plus.html`, `nmn.html`, `nmn-plus.html`, `phytogreen.html`, `phytocell-serum.html` (zell-v.com product names) |
| Other | `wellness-retreat.html`, `global-presence.html`, `articles/index.html`, `contact.html`, `cart.html`, `privacy-policy.html`, `terms.html`, `disclaimer.html` |

---

## Open Questions
- PayPal Business account and Client ID? Which currency (MYR?) *(owner will update)*
- Shipping: flat fee, free shipping, or depends on the country? Which countries? *(owner will update)*
- New product details (the owner will send these later)
- Final product prices (using the old USD prices for now)
- Platinum Plus 3: keep all 3 options? "Single Box" and "Limited Edition 45 Softgels Pack" are both $410 on zell-v.com
- ZÉLL-V Therapy page text comes from my.zell-v.com (zell-v.com has no Therapy page). OK?
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
| 2026-09-21 | **Phase 3 done** (except live PayPal and shipping): shop built from zell-v.com products and USD prices. 6 product pages, 4 category pages, All Products, mini cart, cart page, PayPal checkout in test mode and an order confirmation page. Tested add to cart, option switching, quantity changes, remove, totals and PayPal buttons on desktop and mobile. |
| 2026-09-21 | Home hero now uses the owner's Alps sunrise video as the back layer. Plays forwards then backwards (16 s) so the loop has no jump; audio removed. 2.2 MB on desktop, 0.8 MB on phones. The still frame shows while loading and replaces the video when the visitor prefers reduced motion or uses data saver. Pauses when scrolled off screen. |
| 2026-09-21 | Removed the parallax scroll effect and the smooth-scrolling library from the home hero (GSAP, Lenis and `parallax.js` deleted). The page scrolls normally; the video and ridge stay. |
| 2026-09-21 | Removed the pine-ridge layer that covered the Shop Now button; the bottom fade now sits behind the buttons. Icons are now built into `assets/js/site.js`, so they also show when a page is opened straight from disk (add new icons there). |
| 2026-09-21 | **Phase 4 built**: Wellness Retreat page from zell-v.com content, with programme pop-ups, facilities photo viewer and an enquiry form. Google Apps Script for the Sheet is in `integrations/`; waiting for the owner to deploy it and paste the URL. Tested at 390, 820 and 1440 px: no errors or sideways scrolling. Form checks, the WhatsApp fallback and a simulated Google Sheets submission all work. |
| 2026-09-28 | Category pages (Detoxification, Rejuvenation, Anti-Ageing, Beauty) redesigned to explain each topic before showing the products, with benefits cards, the ZÉLL-V approach, a Platinum Plus 3 vs Platinum Plus comparison, FAQs and a category menu. All Products unchanged. Tested desktop and mobile: no errors or sideways scrolling. |
| 2026-09-28 | Category pages now show each product in full instead of cards: large photo beside the full description, key points, price, option choice, quantity and Add to Cart, alternating sides. The description and key points are the new `description` and `highlights` fields in `assets/js/products.js`. All Products and the other card lists are unchanged. Tested buying from the category pages, the product pages and the cart: no errors. |
| 2026-10-15 | Added ZÉLL-V NMN Plus (Anti-Ageing) from zellvnmn.com: product page with the formula, Swiss origin, capsule and Miron glass sections, two short silent videos (under 1 MB each) and a WhatsApp enquiry button. It also appears on All Products, the Anti-Ageing page (product, approach card and FAQ) and in the footer. Background videos now download only when scrolled near. |
| 2026-10-19 | Owner's new photos: ZÉLL-V Therapy now shows the Therapy box (`therapy-box.webp`); ZÉLL-V NMN Plus now shows the bottle and box cut out onto white (`nmn-plus.webp`); Brand Story's "A one-stop rejuvenation centre" now shows the ZÉLL-V reception (`about/hub-reception.webp`). |
| 2026-10-19 | **Phase 5 done**: Global Presence / Business Associate page built from zell-v.com content. The photo viewer moved into `assets/js/site.js`, so any page can use it (`data-gallery` and `data-lightbox`). Tested desktop, tablet and mobile: no errors or sideways scrolling. |
| 2026-10-19 | Global Presence rebuilt to follow the owner's business page design and content (kokoronoka.github.io/businessZellv), adapted to this site's fonts and colours. Page script: `assets/js/global.js`. Tested on desktop, tablet and mobile with no errors; tabs, doctor filters, stories, map, carousel, photo viewer and the WhatsApp form all work. |
| 2026-10-19 | Global Presence trimmed at the owner's request: removed the Science/products, retreats, doctors, testimonials and "The Beginning" sections, because they repeat other pages. Unused images, styles and script removed. Retested on desktop, tablet and mobile with no errors. |
| 2026-10-19 | Retreat form connected to the owner's Google Apps Script web app. Endpoint check OK. |
| 2026-10-19 | **Phase 6 done**: Articles listing plus 14 article pages from my.zell-v.com. Tested on desktop and mobile: no errors, missing images or broken links. |
| 2026-10-19 | Home page "Our Product" now includes ZÉLL-V NMN Plus (New, by consultation). The 5 cards sit in one row on desktop and become a swipeable row on tablets and phones. Note: the home page product cards are written by hand in `index.html`, so new products must be added there too. |
| 2026-10-19 | Owner: the home page "Our Product" section shows only Platinum Plus 3, NMN Plus and Phytogreen. They sit three across on desktop and tablet, and in a swipeable row on phones. All products are still on the Products pages. |
