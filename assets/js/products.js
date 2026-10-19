/* ==========================================================================
   ZÉLL-V PRODUCT CATALOGUE — the single place to edit products and prices.
   Listing pages, product pages, the cart and PayPal checkout all read from here.

   To change a price: edit "price" below (numbers only, no $ sign).
   To add a product:  copy one block, give it a new unique "id", then create
                      its page in /products/ (copy an existing product page).
   Image paths start with "/" (they are adjusted automatically for any hosting folder).

   Text fields:
     summary     – short text on product cards (All Products, "You may also like")
     description – full description on the category pages (Detoxification, Rejuvenation…)
     highlights  – key points listed under the description on the category pages
   photo: true  – the image is a photograph, so it fills its frame instead of sitting on white
   enquiryOnly  – no price or cart; visitors are asked to enquire on WhatsApp
   ========================================================================== */
window.ZV_SHOP = {
  currency: 'USD',
  currencySymbol: '$',

  // PayPal: replace 'sb' (sandbox/test mode) with your live PayPal Client ID before launch.
  paypalClientId: 'sb',

  // Shipping charged per order. TODO: confirm the shipping rule with the owner.
  shipping: {
    flatFee: 0,               // e.g. 15 for a $15 flat fee
    freeOver: null,           // e.g. 500 for free shipping on orders of $500 or more
    note: 'Shipping details will be confirmed by our team after your order.',
  },

  categories: [
    { id: 'detoxification', label: 'Detoxification', href: '/products/detoxification.html' },
    { id: 'rejuvenation', label: 'Rejuvenation', href: '/products/rejuvenation.html' },
    { id: 'anti-ageing', label: 'Anti-Ageing', href: '/products/anti-ageing.html' },
    { id: 'beauty', label: 'Beauty', href: '/products/beauty.html' },
  ],
};

window.ZV_PRODUCTS = [
  {
    id: 'platinum-plus-3',
    name: 'ZÉLL-V Platinum Plus 3 Sheep Placenta',
    shortName: 'ZÉLL-V Platinum Plus 3',
    category: 'rejuvenation',
    tagline: 'Renew. Rejuvenate.',
    summary: 'An enhanced formula with new ingredients for complete cell rejuvenation, using a unique triple-extraction method for sheep placenta.',
    description: 'Utilising a unique triple-extraction method for sheep placenta, this advanced formulation enhances potency and bioactivity. Blended with sacha inchi seed oil, grape seed oil and lycopene, it supports cellular regeneration and holistic wellness.',
    highlights: [
      'Triple-extraction sheep placenta at a 120:1 ratio',
      'With sacha inchi seed oil, grape seed oil and lycopene',
      '24-hour cellular repair and rejuvenation',
      'One vegetable-based softgel daily',
    ],
    url: '/products/platinum-plus-3.html',
    image: '/assets/images/products/pp3-box.webp',
    badge: 'New',
    options: [
      { id: 'single', label: 'Single Box', price: 410, image: '/assets/images/products/pp3-box.webp' },
      { id: '45-softgels', label: 'Limited Edition 45 Softgels Pack', price: 410, image: '/assets/images/products/pp3-45-pack.webp' },
      { id: '6-free-1', label: '6 Free 1 Exclusive Set', price: 2460, image: '/assets/images/products/pp3-6free1.webp' },
    ],
  },
  {
    id: 'platinum-plus',
    name: 'ZÉLL-V Platinum Plus Sheep Placenta',
    shortName: 'ZÉLL-V Platinum Plus',
    category: 'rejuvenation',
    tagline: 'Reinforcing vitality to the cells',
    summary: 'Powered by 30,000mg of fresh placenta extraction to reduce cell degeneration and help your skin cells repair better.',
    description: 'Powered by 30,000mg of fresh placenta extraction, this youth-enhancing oral supplement reduces cell degeneration and triggers your skin cells to repair better. With every daily capsule, cells are repaired for a re-energised body, and skin is visibly more supple and vibrant.',
    highlights: [
      '600mg of active material from 30,000mg of fresh sheep placenta',
      'With grape seed oil and shark liver oil',
      'Advanced Encapsulation for full absorption',
      '1–2 capsules daily',
    ],
    url: '/products/platinum-plus.html',
    image: '/assets/images/products/pp-box.webp',
    options: [
      { id: 'single', label: 'Single Box', price: 380, image: '/assets/images/products/pp-box.webp' },
      { id: '6-free-1', label: '6 Free 1 Set', price: 2280, image: '/assets/images/products/pp-6free1.webp' },
    ],
  },
  {
    id: 'nmn',
    name: 'ZÉLL-V NMN',
    shortName: 'ZÉLL-V NMN',
    category: 'anti-ageing',
    tagline: 'Reset your age, always 25',
    summary: 'NMN, resveratrol, memophenol and astaxanthin in a precise 4-pronged anti-ageing approach that targets ageing at its core.',
    description: 'Developed from a precise formulation of NMN, resveratrol, Memophenol® and astaxanthin, ZÉLL-V NMN reverses ageing by promoting DNA repair and reducing telomere damage, inflammation and free radical damage, as well as enhancing cognitive and organ functions for the best life possible.',
    highlights: [
      '500mg four-ingredient extract in every capsule',
      'Supports DNA repair and reduces telomere damage',
      'Powerful antioxidant and anti-inflammatory protection',
      'Enhances cognitive and organ functions',
    ],
    url: '/products/nmn.html',
    image: '/assets/images/products/nmn-box.webp',
    options: [{ id: 'single', label: 'Single Box', price: 555 }],
  },
  {
    id: 'nmn-plus',
    name: 'ZÉLL-V NMN Plus',
    shortName: 'ZÉLL-V NMN Plus',
    category: 'anti-ageing',
    tagline: 'Swiss longevity science',
    summary: 'A complete Swiss-made longevity formula: Longevir® NMN, Trans-Resveratrol, Sharp-PS® Green and AstaReal® astaxanthin. Available by consultation.',
    description: 'What if growing older didn’t mean slowing down? Formulated and manufactured in Switzerland, ZÉLL-V NMN Plus combines four premium, trademarked ingredients in one synergistic formula to restore NAD⁺, defend cells against oxidative stress and support healthy ageing from within.',
    highlights: [
      'Made in Switzerland in a SwissMedic-approved facility',
      'Longevir® NMN, over 99% pure, to restore NAD⁺ levels',
      'With Trans-Resveratrol, Sharp-PS® Green and AstaReal® astaxanthin',
      '60 capsules in Miron® violet glass, a full month of daily use',
    ],
    url: '/products/nmn-plus.html',
    image: '/assets/images/products/nmn-plus.webp',
    badge: 'New',
    enquiryOnly: true,
    options: [],
  },
  {
    id: 'therapy',
    name: 'ZÉLL-V Therapy',
    shortName: 'ZÉLL-V Therapy',
    category: 'anti-ageing',
    tagline: 'Total skin revitalisation',
    summary: 'Stem cell regeneration therapy that revitalises health, beauty and youth. Available by consultation.',
    description: 'ZÉLL-V stem cell regeneration therapy revitalises health, beauty and youth with advanced stem cell technology, promoting skin rejuvenation, vitality and holistic well-being.',
    highlights: [
      'Stem cell regeneration therapy',
      'At the core of S.P.A. Total Skin System Therapy',
      'Renews skin for a youthful, vibrant appearance',
      'Available by consultation',
    ],
    url: '/products/therapy.html',
    image: '/assets/images/products/therapy-box.webp',
    photo: true,
    enquiryOnly: true,
    options: [],
  },
  {
    id: 'phytogreen',
    name: 'ZÉLL-V Phytogreen',
    shortName: 'ZÉLL-V Phytogreen',
    category: 'detoxification',
    tagline: 'Cellular nutrition for optimal revitalisation',
    summary: 'Organic marine algae cells with the complete range of nutrients for cell health. Suitable for the whole family.',
    description: 'To ensure the health and vitality of our cells, the key lies in supplying them with complete, sufficient and quality nutrients – all of which can be found in a single capsule of ZÉLL-V Phytogreen with Organic Marine Cell Factors.',
    highlights: [
      'Organic marine algae cells, cultivated in a pristine environment',
      'Antioxidants, amino acids, fatty acids, minerals and vitamins',
      'Researched by Swiss, German and New Zealand scientists',
      'Suitable for the whole family',
    ],
    url: '/products/phytogreen.html',
    image: '/assets/images/products/phytogreen-box.webp',
    options: [{ id: 'single', label: 'Single Box', price: 230 }],
  },
  {
    id: 'phytocell-serum',
    name: 'ZÉLL-V Phytocell Serum 30ml',
    shortName: 'ZÉLL-V Phytocell Serum',
    category: 'beauty',
    tagline: 'Wrinkle refining youth activator',
    summary: 'Formulated with the stem cell ingredient StemPlus and the AGE-Reverse system to prevent visible signs of ageing and increase luminosity.',
    description: 'ZÉLL-V Phytocell Serum is specially formulated with the new-generation quantifiable stem cell ingredient StemPlus for cell regeneration and skin layer restoration, and enhanced with the AGE-Reverse system to prevent visible signs of ageing and increase luminosity.',
    highlights: [
      'StemPlus stem cell ingredient for cell regeneration',
      'AGE-Reverse system against visible signs of ageing',
      'Increases skin luminosity',
      'Also available as a set with Wonder Cream SPF50',
    ],
    url: '/products/phytocell-serum.html',
    image: '/assets/images/products/serum.webp',
    options: [
      { id: 'serum', label: 'Phytocell Serum 30ml', price: 170, image: '/assets/images/products/serum.webp' },
      { id: 'serum-cream-set', label: 'Serum 30ml + Wonder Cream 30ml Set', price: 300, image: '/assets/images/products/serum-cream-set.webp' },
    ],
  },
];
