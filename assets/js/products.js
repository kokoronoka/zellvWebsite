/* ==========================================================================
   ZÉLL-V PRODUCT CATALOGUE — the single place to edit products and prices.
   Listing pages, product pages, the cart and PayPal checkout all read from here.

   To change a price: edit "price" below (numbers only, no $ sign).
   To add a product:  copy one block, give it a new unique "id", then create
                      its page in /products/ (copy an existing product page).
   Image paths start with "/" (they are adjusted automatically for any hosting folder).
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
    url: '/products/nmn.html',
    image: '/assets/images/products/nmn-box.webp',
    options: [{ id: 'single', label: 'Single Box', price: 555 }],
  },
  {
    id: 'therapy',
    name: 'ZÉLL-V Therapy',
    shortName: 'ZÉLL-V Therapy',
    category: 'anti-ageing',
    tagline: 'Total skin revitalisation',
    summary: 'Stem cell regeneration therapy that revitalises health, beauty and youth. Available by consultation.',
    url: '/products/therapy.html',
    image: '/assets/images/products/therapy-skin.webp',
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
    url: '/products/phytocell-serum.html',
    image: '/assets/images/products/serum.webp',
    options: [
      { id: 'serum', label: 'Phytocell Serum 30ml', price: 170, image: '/assets/images/products/serum.webp' },
      { id: 'serum-cream-set', label: 'Serum 30ml + Wonder Cream 30ml Set', price: 300, image: '/assets/images/products/serum-cream-set.webp' },
    ],
  },
];
