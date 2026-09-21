/* ZÉLL-V shop: product listings, add to cart, mini cart, cart page and PayPal checkout.
   Products and prices live in assets/js/products.js. The cart is saved in the visitor's
   browser (localStorage "zv-cart"), so it survives page changes and return visits. */
(function () {
  'use strict';
  const SHOP = window.ZV_SHOP;
  const PRODUCTS = window.ZV_PRODUCTS || [];
  if (!SHOP) return;

  const SITE_ROOT = new URL('../../', document.currentScript.src).pathname;
  const u = (path) => SITE_ROOT + String(path).replace(/^\//, '');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => `${SHOP.currencySymbol}${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const moneyShort = (n) => `${SHOP.currencySymbol}${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const round2 = (n) => Math.round(n * 100) / 100;
  const ICON = (name) => `<svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="${u('/assets/images/icons.svg')}#i-${name}"/></svg>`;

  const product = (id) => PRODUCTS.find((p) => p.id === id);
  const option = (p, optId) => p && p.options.find((o) => o.id === optId);
  const fromPrice = (p) => Math.min(...p.options.map((o) => o.price));
  const categoryLabel = (id) => (SHOP.categories.find((c) => c.id === id) || {}).label || '';

  /* ---------- Cart storage ---------- */
  const KEY = 'zv-cart';
  function readCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      // drop anything that no longer exists in the catalogue (e.g. a removed product)
      return raw.filter((l) => option(product(l.id), l.option) && l.qty > 0);
    } catch (e) { return []; }
  }
  function writeCart(lines) {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) { /* storage blocked */ }
    window.ZV?.updateCartCount?.();
    document.dispatchEvent(new CustomEvent('zv:cart-change'));
  }
  function addToCart(id, optId, qty) {
    const lines = readCart();
    const line = lines.find((l) => l.id === id && l.option === optId);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else lines.push({ id, option: optId, qty });
    writeCart(lines);
  }
  function setQty(id, optId, qty) {
    let lines = readCart();
    if (qty <= 0) lines = lines.filter((l) => !(l.id === id && l.option === optId));
    else lines.forEach((l) => { if (l.id === id && l.option === optId) l.qty = Math.min(99, qty); });
    writeCart(lines);
  }
  function detailed(lines) {
    return lines.map((l) => {
      const p = product(l.id), o = option(p, l.option);
      return { ...l, product: p, opt: o, unit: o.price, total: round2(o.price * l.qty) };
    });
  }
  function totals(lines) {
    const subtotal = round2(detailed(lines).reduce((s, l) => s + l.total, 0));
    const free = SHOP.shipping.freeOver != null && subtotal >= SHOP.shipping.freeOver;
    const shipping = subtotal === 0 || free ? 0 : round2(SHOP.shipping.flatFee || 0);
    return { subtotal, shipping, total: round2(subtotal + shipping), count: lines.reduce((s, l) => s + l.qty, 0) };
  }

  /* ---------- Product cards / listings ---------- */
  function card(p) {
    const multi = p.options.length > 1;
    const action = p.enquiryOnly
      ? `<a class="btn btn-outline btn-sm" href="${u(p.url)}">Enquire</a>`
      : multi
        ? `<a class="btn btn-outline btn-sm" href="${u(p.url)}">Choose Option</a>`
        : `<button class="btn btn-primary btn-sm" type="button" data-quick-add="${esc(p.id)}">Add to Cart</button>`;
    const price = p.enquiryOnly
      ? '<span class="price price-note">By consultation</span>'
      : `<span class="price">${multi ? '<small class="from">From</small>' : ''}${moneyShort(fromPrice(p))}<small>${SHOP.currency}</small></span>`;
    return `<article class="product-card shop-card" data-category="${esc(p.category)}">
      <a class="product-card-media" href="${u(p.url)}" tabindex="-1" aria-hidden="true">
        ${p.badge ? `<span class="card-badge">${esc(p.badge)}</span>` : ''}
        <img src="${u(p.image)}" alt="" loading="lazy" width="600" height="600">
      </a>
      <div class="product-card-body">
        <p class="eyebrow">${esc(categoryLabel(p.category))}</p>
        <h3><a href="${u(p.url)}">${esc(p.shortName)}</a></h3>
        <p class="tagline">${esc(p.tagline)}</p>
        <p>${esc(p.summary)}</p>
        <div class="product-card-foot">${price}${action}</div>
      </div>
    </article>`;
  }

  function initGrids() {
    document.querySelectorAll('[data-product-grid]').forEach((grid) => {
      const cat = grid.dataset.productGrid;
      const exclude = (grid.dataset.exclude || '').split(' ');
      const list = PRODUCTS.filter((p) => (cat === 'all' || p.category === cat) && !exclude.includes(p.id));
      grid.innerHTML = list.map(card).join('') || '<p>No products in this category yet.</p>';
    });

    // Category filter chips (All Products page)
    document.querySelectorAll('[data-shop-filter]').forEach((bar) => {
      const grid = document.getElementById(bar.dataset.shopFilter);
      const cats = [{ id: 'all', label: 'All Products' }, ...SHOP.categories];
      bar.innerHTML = cats.map((c) => {
        const n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
        return `<button class="filter-btn" type="button" data-cat="${c.id}" aria-pressed="${c.id === 'all'}">${esc(c.label)}<span class="count">${n}</span></button>`;
      }).join('');
      bar.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cat]');
        if (!btn) return;
        bar.querySelectorAll('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        grid.querySelectorAll('.shop-card').forEach((c) => {
          const show = btn.dataset.cat === 'all' || c.dataset.category === btn.dataset.cat;
          c.hidden = !show;
          c.classList.toggle('is-entering', show);
        });
      });
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quick-add]');
      if (!btn) return;
      const p = product(btn.dataset.quickAdd);
      addToCart(p.id, p.options[0].id, 1);
      openDrawer();
    });
  }

  /* ---------- Product page ---------- */
  function initProductPage() {
    const root = document.querySelector('[data-product-page]');
    if (!root) return;
    const p = product(root.dataset.productPage);
    if (!p || p.enquiryOnly) return;
    const priceEl = root.querySelector('[data-price]');
    const imgEl = document.querySelector('[data-product-image]');
    const optWrap = root.querySelector('[data-options]');
    const qtyInput = root.querySelector('[data-qty]');
    let current = p.options[0];

    if (optWrap) {
      if (p.options.length > 1) {
        optWrap.innerHTML = `<legend class="field-label">Choose option</legend>` + p.options.map((o, i) => `
          <label class="option-card">
            <input type="radio" name="option" value="${esc(o.id)}" ${i === 0 ? 'checked' : ''}>
            <span class="option-body"><span class="option-label">${esc(o.label)}</span><span class="option-price">${money(o.price)}</span></span>
          </label>`).join('');
        optWrap.addEventListener('change', (e) => {
          current = option(p, e.target.value);
          render();
          if (current.image && imgEl) { imgEl.src = u(current.image); imgEl.alt = `${p.name} – ${current.label}`; }
        });
      } else optWrap.remove();
    }
    const render = () => { if (priceEl) priceEl.textContent = money(current.price); };
    render();

    root.querySelectorAll('[data-qty-step]').forEach((btn) => btn.addEventListener('click', () => {
      const v = Math.max(1, Math.min(99, (parseInt(qtyInput.value, 10) || 1) + Number(btn.dataset.qtyStep)));
      qtyInput.value = v;
    }));
    qtyInput?.addEventListener('change', () => { qtyInput.value = Math.max(1, Math.min(99, parseInt(qtyInput.value, 10) || 1)); });

    root.querySelector('[data-add-to-cart]')?.addEventListener('click', () => {
      addToCart(p.id, current.id, parseInt(qtyInput?.value, 10) || 1);
      openDrawer();
    });
  }

  /* ---------- Mini cart drawer ---------- */
  let drawer;
  function buildDrawer() {
    drawer = document.createElement('dialog');
    drawer.className = 'cart-drawer';
    drawer.setAttribute('aria-labelledby', 'drawer-title');
    drawer.innerHTML = `
      <div class="drawer-head"><h2 id="drawer-title">Your Cart</h2>
        <button class="icon-btn" type="button" data-close-drawer aria-label="Close cart">${ICON('x')}</button></div>
      <div class="drawer-body" data-drawer-lines></div>
      <div class="drawer-foot" data-drawer-foot></div>`;
    document.body.appendChild(drawer);
    drawer.addEventListener('click', (e) => { if (e.target === drawer || e.target.closest('[data-close-drawer]')) closeDrawer(); });
    drawer.addEventListener('close', () => window.ZV?.lenis?.start());
    bindLineControls(drawer);
    document.addEventListener('zv:cart-change', renderDrawer);
  }
  function lineHTML(l, compact) {
    return `<li class="cart-line" data-line="${esc(l.id)}" data-option="${esc(l.option)}">
      <a class="cart-thumb" href="${u(l.product.url)}"><img src="${u(l.opt.image || l.product.image)}" alt="" width="96" height="96"></a>
      <div class="cart-info">
        <a class="cart-name" href="${u(l.product.url)}">${esc(l.product.shortName)}</a>
        ${l.product.options.length > 1 ? `<span class="cart-option">${esc(l.opt.label)}</span>` : ''}
        <span class="cart-unit">${money(l.unit)}${compact ? '' : ' each'}</span>
        <div class="qty qty-sm" role="group" aria-label="Quantity for ${esc(l.product.shortName)}">
          <button type="button" data-line-step="-1" aria-label="Decrease quantity">−</button>
          <span aria-live="polite">${l.qty}</span>
          <button type="button" data-line-step="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-line-end">
        <span class="cart-line-total">${money(l.total)}</span>
        <button class="cart-remove" type="button" data-line-remove aria-label="Remove ${esc(l.product.shortName)}">Remove</button>
      </div>
    </li>`;
  }
  function bindLineControls(scope) {
    scope.addEventListener('click', (e) => {
      const line = e.target.closest('[data-line]');
      if (!line) return;
      const { line: id, option: opt } = line.dataset;
      const cur = readCart().find((l) => l.id === id && l.option === opt);
      if (!cur) return;
      if (e.target.closest('[data-line-step]')) setQty(id, opt, cur.qty + Number(e.target.closest('[data-line-step]').dataset.lineStep));
      if (e.target.closest('[data-line-remove]')) setQty(id, opt, 0);
    });
  }
  function renderDrawer() {
    if (!drawer) return;
    const lines = readCart(), t = totals(lines);
    drawer.querySelector('[data-drawer-lines]').innerHTML = lines.length
      ? `<ul class="cart-lines">${detailed(lines).map((l) => lineHTML(l, true)).join('')}</ul>`
      : `<div class="cart-empty"><p>Your cart is empty.</p><a class="link-arrow" href="${u('/products/')}">Browse Products</a></div>`;
    drawer.querySelector('[data-drawer-foot]').innerHTML = lines.length ? `
      <div class="summary-row"><span>Subtotal (${t.count} ${t.count === 1 ? 'item' : 'items'})</span><strong>${money(t.subtotal)}</strong></div>
      <p class="drawer-note">Prices in ${SHOP.currency}. Shipping and payment on the next step.</p>
      <a class="btn btn-primary" href="${u('/cart.html')}">View Cart &amp; Checkout</a>
      <button class="btn btn-outline" type="button" data-close-drawer>Continue Shopping</button>` : '';
  }
  function openDrawer() {
    if (!drawer) buildDrawer();
    renderDrawer();
    window.ZV?.lenis?.stop();
    if (!drawer.open) drawer.showModal();
  }
  function closeDrawer() { drawer?.close(); }

  /* ---------- Cart page + PayPal ---------- */
  function initCartPage() {
    const page = document.querySelector('[data-cart-page]');
    if (!page) return;
    const linesEl = page.querySelector('[data-cart-lines]');
    const summaryEl = page.querySelector('[data-cart-summary]');
    const checkoutEl = page.querySelector('[data-checkout]');
    bindLineControls(linesEl);

    const render = () => {
      const lines = readCart(), t = totals(lines);
      page.classList.toggle('is-empty', !lines.length);
      linesEl.innerHTML = lines.length
        ? `<ul class="cart-lines">${detailed(lines).map((l) => lineHTML(l, false)).join('')}</ul>`
        : `<div class="cart-empty cart-empty-lg">${ICON('bag')}<h2>Your cart is empty</h2><p>Discover ZÉLL-V cellular therapy products.</p><a class="btn btn-primary" href="${u('/products/')}">Shop Products</a></div>`;
      const shippingText = t.shipping ? money(t.shipping) : (SHOP.shipping.flatFee || SHOP.shipping.freeOver != null ? 'Free' : 'To be confirmed');
      summaryEl.innerHTML = `
        <div class="summary-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shippingText}</span></div>
        <div class="summary-row summary-total"><span>Total</span><strong>${money(t.total)} <small>${SHOP.currency}</small></strong></div>
        ${SHOP.shipping.note ? `<p class="drawer-note">${esc(SHOP.shipping.note)}</p>` : ''}`;
      checkoutEl.hidden = !lines.length;
    };
    render();
    document.addEventListener('zv:cart-change', render);
    if (readCart().length) loadPayPal(checkoutEl);
    document.addEventListener('zv:cart-change', () => { if (readCart().length) loadPayPal(checkoutEl); });
  }

  let paypalLoading = false;
  function loadPayPal(container) {
    if (paypalLoading) return;
    paypalLoading = true;
    const target = container.querySelector('#paypal-buttons');
    const status = container.querySelector('[data-checkout-status]');
    const s = document.createElement('script');
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(SHOP.paypalClientId)}&currency=${SHOP.currency}&intent=capture&components=buttons`;
    s.onload = () => renderPayPal(target, status);
    s.onerror = () => { status.textContent = 'PayPal could not be loaded. Please check your connection or contact us to order.'; };
    document.head.appendChild(s);
  }
  function renderPayPal(target, status) {
    if (!window.paypal) return;
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'black', shape: 'rect', label: 'checkout', height: 48 },
      createOrder: (data, actions) => {
        const lines = detailed(readCart()), t = totals(readCart());
        if (!lines.length) throw new Error('Cart is empty');
        const amt = (v) => ({ currency_code: SHOP.currency, value: v.toFixed(2) });
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            description: 'ZÉLL-V online order',
            amount: { ...amt(t.total), breakdown: { item_total: amt(t.subtotal), shipping: amt(t.shipping) } },
            items: lines.map((l) => ({
              name: `${l.product.shortName}${l.product.options.length > 1 ? ` – ${l.opt.label}` : ''}`.slice(0, 127),
              sku: `${l.id}:${l.option}`,
              unit_amount: amt(l.unit),
              quantity: String(l.qty),
              category: 'PHYSICAL_GOODS',
            })),
          }],
          application_context: { brand_name: 'ZÉLL-V', shipping_preference: 'GET_FROM_FILE', user_action: 'PAY_NOW' },
        });
      },
      onApprove: (data, actions) => actions.order.capture().then((order) => {
        const t = totals(readCart());
        try {
          sessionStorage.setItem('zv-last-order', JSON.stringify({
            id: order.id, total: t.total, currency: SHOP.currency,
            name: order.payer?.name?.given_name || '', email: order.payer?.email_address || '',
          }));
        } catch (e) { /* ignore */ }
        writeCart([]);
        location.href = u('/order-success.html');
      }),
      onError: () => { status.textContent = 'Something went wrong with PayPal. Your cart is saved, so please try again or contact us.'; },
      onCancel: () => { status.textContent = 'Payment cancelled. Your cart is still saved.'; },
    }).render(target).catch(() => { status.textContent = 'PayPal could not be displayed. Please contact us to complete your order.'; });
  }

  /* ---------- Order success page ---------- */
  function initSuccess() {
    const el = document.querySelector('[data-order-success]');
    if (!el) return;
    let order = null;
    try { order = JSON.parse(sessionStorage.getItem('zv-last-order') || 'null'); } catch (e) { /* ignore */ }
    if (order) {
      el.querySelector('[data-order-name]').textContent = order.name ? `, ${order.name}` : '';
      el.querySelector('[data-order-id]').textContent = order.id;
      el.querySelector('[data-order-total]').textContent = `${money(order.total)} ${order.currency}`;
      el.querySelector('[data-order-details]').hidden = false;
    }
  }

  window.ZV = Object.assign(window.ZV || {}, { cart: { read: readCart, add: addToCart, open: openDrawer } });

  function init() {
    initGrids();
    initProductPage();
    initCartPage();
    initSuccess();
    document.querySelectorAll('[data-open-cart]').forEach((b) => b.addEventListener('click', openDrawer));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
