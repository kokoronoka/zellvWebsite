/* ZÉLL-V — shared site script: header, footer, menus, animations. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Site root, worked out from this script's own URL (.../assets/js/site.js).
  // Lets the site run at the domain root (zell-v.com/) or in a subfolder (GitHub Pages).
  const SITE_ROOT = new URL('../../', document.currentScript.src).pathname;
  const u = (path) => SITE_ROOT + String(path).replace(/^\//, '');

  /* ==========================================================
     EDIT HERE: navigation menu and footer details
     Write links starting with "/" (e.g. "/about/brand-story.html"). They are automatically
     rewritten to match wherever the site is hosted (domain root or a subfolder).
     ========================================================== */
  const NAV = [
    {
      label: 'About',
      children: [
        { label: 'Cellular Therapy', href: '/about/cellular-therapy.html' },
        { label: 'Brand Story', href: '/about/brand-story.html' },
        { label: 'Medical Panel', href: '/about/medical-panel.html' },
        { label: 'Testimonials', href: '/about/testimonials.html' },
        { label: 'History & Awards', href: '/about/history.html' },
      ],
    },
    {
      label: 'Products',
      children: [
        { label: 'All Products', href: '/products/' },
        { label: 'Detoxification', href: '/products/detoxification.html' },
        { label: 'Rejuvenation', href: '/products/rejuvenation.html' },
        { label: 'Anti-Ageing', href: '/products/anti-ageing.html' },
        { label: 'Beauty', href: '/products/beauty.html' },
      ],
    },
    { label: 'Wellness Retreat', href: '/wellness-retreat.html' },
    { label: 'Global Presence', href: '/global-presence.html' },
    { label: 'Articles', href: '/articles/' },
  ];

  const CONTACT = {
    company: 'ZÉLL-V Group of Companies',
    address: '190 Clemenceau Avenue, #05-13-18 Singapore Shopping Centre, Singapore 239924',
    phone: '+65 9382 2879',
    email: 'enquiry@zell-v.com',
    whatsapp: '6593822879',
  };

  const SOCIAL = [
    { label: 'Facebook', href: 'https://www.facebook.com/zellv', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/zellvmy/', icon: 'instagram' },
    { label: 'YouTube', href: 'https://www.youtube.com/user/zellvsheepplacenta', icon: 'youtube' },
  ];

  const FOOTER_PRODUCTS = [
    { label: 'ZÉLL-V Platinum Plus 3', href: '/products/platinum-plus-3.html' },
    { label: 'ZÉLL-V Platinum Plus', href: '/products/platinum-plus.html' },
    { label: 'ZÉLL-V NMN', href: '/products/nmn.html' },
    { label: 'ZÉLL-V Phytogreen', href: '/products/phytogreen.html' },
    { label: 'ZÉLL-V Phytocell Serum', href: '/products/phytocell-serum.html' },
    { label: 'Wellness Retreat', href: '/wellness-retreat.html' },
  ];

  const FOOTER_LEGAL = [
    { label: 'Terms & Conditions', href: '/terms.html' },
    { label: 'Disclaimer Notice', href: '/disclaimer.html' },
    { label: 'Privacy Policy', href: '/privacy-policy.html' },
    { label: 'Product Update (PDF)', href: '/assets/docs/product-update-platinum-plus-new-packaging.pdf' },
  ];

  const COUNTRIES = [
    { label: 'Malaysia', href: 'https://my.zell-v.com/' },
    { label: 'Singapore', href: 'https://sg.zell-v.com/' },
  ];
  /* ========================================================== */

  const ICONS = {
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  };
  const icon = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  const normalise = (p) => p.replace(/index\.html$/, '').replace(/\/+$/, '/') || '/';
  const here = normalise(location.pathname);
  const current = (href) => (normalise(u(href)) === here ? ' aria-current="page"' : '');
  const li = (items) => items.map((i) => `<li><a href="${u(i.href)}"${current(i.href)}>${i.label}</a></li>`).join('');

  /* ---------- Header ---------- */
  function renderHeader(slot) {
    const desktop = NAV.map((item, n) => {
      if (!item.children) {
        return `<li class="nav-item"><a class="nav-link" href="${u(item.href)}"${current(item.href)}>${item.label}</a></li>`;
      }
      return `<li class="nav-item has-dropdown">
        <button class="nav-link" type="button" aria-expanded="false" aria-controls="dd-${n}">${item.label}${icon('chevronDown')}</button>
        <ul class="dropdown" id="dd-${n}">${li(item.children)}</ul>
      </li>`;
    }).join('');

    const mobile = NAV.map((item, n) => {
      if (!item.children) return `<li><a href="${u(item.href)}"${current(item.href)}>${item.label}</a></li>`;
      return `<li>
        <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="m-sub-${n}">${item.label}${icon('chevronDown')}</button>
        <ul class="sub-list" id="m-sub-${n}">${li(item.children)}</ul>
      </li>`;
    }).join('');

    slot.outerHTML = `
    <header class="site-header" id="top">
      <div class="container header-inner">
        <a class="logo" href="${u('/')}" aria-label="ZÉLL-V home">
          <img class="logo-dark" src="${u('/assets/images/brand/logo.png')}" alt="ZÉLL-V" width="350" height="78">
          <img class="logo-light" src="${u('/assets/images/brand/logo-white.png')}" alt="" width="350" height="78">
        </a>
        <nav class="main-nav" aria-label="Main"><ul class="nav-list">${desktop}</ul></nav>
        <div class="header-actions">
          <a class="btn btn-outline header-contact" href="${u('/contact.html')}">Contact</a>
          <a class="icon-btn" href="${u('/cart.html')}" aria-label="Shopping cart">${icon('bag')}<span class="cart-count" hidden>0</span></a>
          <button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
            ${icon('menu', 'icon-open')}${icon('close', 'icon-close')}
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile">
      <ul>${mobile}</ul>
      <div class="mobile-menu-foot">
        <a class="btn btn-gold" href="${u('/contact.html')}">Contact Us</a>
        <a class="btn btn-outline-light" href="tel:${CONTACT.phone.replace(/[^+\d]/g, '')}">Call ${CONTACT.phone}</a>
      </div>
    </nav>`;
  }

  /* ---------- Footer ---------- */
  function renderFooter(slot) {
    const year = new Date().getFullYear();
    slot.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <img src="${u('/assets/images/brand/logo-white.png')}" alt="ZÉLL-V" width="350" height="78" loading="lazy">
          <p>With over two decades of expertise in anti-ageing and regenerative wellness, ZÉLL-V is a pioneer in cellular therapy, powered by Swiss and German scientific expertise.</p>
          <h2 class="footer-label">Follow Us</h2>
          <ul class="footer-social">${SOCIAL.map((s) => `<li><a class="icon-btn" href="${s.href}" rel="noopener" target="_blank" aria-label="ZÉLL-V on ${s.label}">${icon(s.icon)}</a></li>`).join('')}</ul>
        </div>
        <div class="footer-col"><h2>Products</h2><ul>${li(FOOTER_PRODUCTS)}</ul></div>
        <div class="footer-col"><h2>Legal</h2><ul>${li(FOOTER_LEGAL)}</ul>
          <h2 class="footer-label">Select Country</h2>
          <div class="footer-countries" aria-label="Country websites">${COUNTRIES.map((c) => `<a href="${c.href}" rel="noopener">${c.label}</a>`).join('')}</div>
        </div>
        <div class="footer-col"><h2>Customer Care</h2>
          <ul class="footer-contact">
            <li>${icon('pin')}<span><strong>${CONTACT.company}</strong><br>${CONTACT.address}</span></li>
            <li>${icon('phone')}<span>Hotline: <a href="tel:${CONTACT.phone.replace(/[^+\d]/g, '')}">${CONTACT.phone}</a></span></li>
            <li>${icon('chat')}<a href="https://wa.me/${CONTACT.whatsapp}" rel="noopener" target="_blank">WhatsApp us</a></li>
            <li>${icon('mail')}<a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© ${year} ZÉLL-V. All rights reserved.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>`;
  }

  /* ---------- Behaviour ---------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Desktop dropdowns: hover on pointer devices, click/keyboard everywhere
    const items = header.querySelectorAll('.has-dropdown');
    const setOpen = (item, open) => {
      item.classList.toggle('is-open', open);
      item.querySelector('.nav-link').setAttribute('aria-expanded', String(open));
    };
    const closeAll = (except) => items.forEach((i) => i !== except && setOpen(i, false));
    const canHover = window.matchMedia('(hover: hover)').matches;

    items.forEach((item) => {
      const btn = item.querySelector('.nav-link');
      let timer;
      btn.addEventListener('click', () => {
        const open = !item.classList.contains('is-open');
        closeAll(item);
        setOpen(item, open);
      });
      if (canHover) {
        item.addEventListener('mouseenter', () => { clearTimeout(timer); closeAll(item); setOpen(item, true); });
        item.addEventListener('mouseleave', () => { timer = setTimeout(() => setOpen(item, false), 150); });
      }
      item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setOpen(item, false); });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const open = header.querySelector('.has-dropdown.is-open');
      if (open) { setOpen(open, false); open.querySelector('.nav-link').focus(); }
      if (header.classList.contains('menu-open')) toggleMenu(false);
    });
    document.addEventListener('click', (e) => { if (!header.contains(e.target)) closeAll(); });

    // Mobile menu
    const toggle = header.querySelector('.menu-toggle');
    const menu = document.getElementById('mobile-menu');
    function toggleMenu(open) {
      header.classList.toggle('menu-open', open);
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
      window.ZV.lenis?.[open ? 'stop' : 'start']();
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open) toggle.focus();
    }
    toggle.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
    menu.querySelectorAll('.sub-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
      });
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => { if (e.matches && menu.classList.contains('is-open')) toggleMenu(false); });
  }

  // Cart count badge. The cart itself (localStorage "zv-cart") is built in Phase 3.
  function updateCartCount() {
    const badge = document.querySelector('.cart-count');
    if (!badge) return;
    let count = 0;
    try {
      const cart = JSON.parse(localStorage.getItem('zv-cart') || '[]');
      count = cart.reduce((sum, line) => sum + (Number(line.qty) || 0), 0);
    } catch (e) { /* storage unavailable */ }
    badge.textContent = count;
    badge.hidden = count === 0;
  }
  window.ZV = Object.assign(window.ZV || {}, { updateCartCount });

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach((el) => io.observe(el));
  }

  // Testimonial slider: manual only (no autoplay), keyboard and screen-reader friendly
  function initSliders() {
    document.querySelectorAll('[data-slider]').forEach((slider) => {
      const slides = [...slider.querySelectorAll('.quote-slide')];
      const status = slider.querySelector('.slider-status');
      let index = 0;
      const show = (i) => {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => {
          s.classList.toggle('is-active', n === index);
          s.setAttribute('aria-hidden', String(n !== index));
        });
        if (status) status.textContent = `${index + 1} / ${slides.length}`;
      };
      slider.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
      slider.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
      show(0);
    });
  }

  // Video pop-up: <button data-video="YOUTUBE_ID" data-video-title="...">. The player loads only on click.
  function initVideoModal() {
    const triggers = document.querySelectorAll('[data-video]');
    if (!triggers.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'video-modal';
    dialog.innerHTML = `<div class="video-modal-inner">
      <button class="video-modal-close" type="button" aria-label="Close video">${icon('close')}</button>
      <div class="video-frame"></div></div>`;
    document.body.appendChild(dialog);
    const frame = dialog.querySelector('.video-frame');
    const close = () => dialog.close();
    dialog.addEventListener('close', () => { frame.innerHTML = ''; window.ZV.lenis?.start(); });
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    dialog.querySelector('.video-modal-close').addEventListener('click', close);
    triggers.forEach((btn) => btn.addEventListener('click', () => {
      const id = encodeURIComponent(btn.dataset.video);
      const title = btn.dataset.videoTitle || 'Video';
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${title.replace(/"/g, '&quot;')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      window.ZV.lenis?.stop();
      dialog.showModal();
    }));
  }

  // Tabs: [data-tabs] containing [role=tab] buttons and [role=tabpanel] panels, arrow-key navigation
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach((wrap) => {
      const tabs = [...wrap.querySelectorAll('[role="tab"]')];
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tab.focus();
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', (e) => {
          const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
          if (next === undefined) return;
          e.preventDefault();
          select(tabs[(next + tabs.length) % tabs.length], true);
        });
      });
      select(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]);
    });
  }

  // Filter buttons: [data-filter-group] with buttons[data-filter] and items[data-tags="a b"]
  function initFilters() {
    document.querySelectorAll('[data-filter-group]').forEach((group) => {
      const buttons = [...group.querySelectorAll('[data-filter]')];
      const target = document.getElementById(group.dataset.filterGroup);
      if (!target) return;
      const items = [...target.querySelectorAll('[data-tags]')];
      const status = document.querySelector(`[data-filter-status="${group.dataset.filterGroup}"]`);
      buttons.forEach((btn) => {
        const f = btn.dataset.filter;
        const n = f === 'all' ? items.length : items.filter((i) => i.dataset.tags.split(' ').includes(f)).length;
        btn.insertAdjacentHTML('beforeend', `<span class="count">${n}</span>`);
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          let shown = 0;
          items.forEach((item) => {
            const match = f === 'all' || item.dataset.tags.split(' ').includes(f);
            item.hidden = !match;
            item.classList.toggle('is-entering', match);
            if (match) shown++;
          });
          if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'story' : 'stories'}`;
        });
      });
    });
  }

  // Highlight the in-view section's link in a jump bar: [data-scrollspy] containing a[href="#id"]
  function initScrollSpy() {
    document.querySelectorAll('[data-scrollspy]').forEach((nav) => {
      const links = [...nav.querySelectorAll('a[href^="#"]')];
      const map = new Map(links.map((a) => [document.getElementById(a.getAttribute('href').slice(1)), a]));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.classList.remove('is-active'));
          const link = map.get(e.target);
          link.classList.add('is-active');
          link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      map.forEach((_, section) => section && io.observe(section));
    });
  }

  function renderWhatsApp() {
    const message = encodeURIComponent('Hi ZÉLL-V, I would like to enquire about ');
    document.body.insertAdjacentHTML('beforeend', `
      <a class="whatsapp-float" href="https://wa.me/${CONTACT.whatsapp}?text=${message}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9 3 3.28 8.72 3.28 15.76c0 2.25.59 4.45 1.71 6.39L3.17 29l7.03-1.84a12.7 12.7 0 0 0 5.84 1.42h.01c7.04 0 12.76-5.72 12.76-12.76 0-3.41-1.33-6.62-3.74-9.03A12.67 12.67 0 0 0 16.04 3Zm0 23.43h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.17 1.09 1.11-4.07-.25-.42a10.57 10.57 0 0 1-1.62-5.56c0-5.85 4.76-10.61 10.62-10.61 2.83 0 5.5 1.11 7.5 3.11a10.54 10.54 0 0 1 3.1 7.51c0 5.85-4.76 10.66-10.49 10.66Zm5.82-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"/></svg>
        <span class="whatsapp-label">Chat with us</span>
      </a>`);
  }

  function init() {
    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) renderHeader(headerSlot);
    if (footerSlot) renderFooter(footerSlot);
    initHeader();
    renderWhatsApp();
    updateCartCount();
    initReveal();
    initSliders();
    initVideoModal();
    initTabs();
    initFilters();
    initScrollSpy();
    // Scroll the current page's pill into view in horizontally scrolling sub-menus (mobile)
    document.querySelectorAll('.subnav ul').forEach((ul) => {
      const active = ul.querySelector('[aria-current="page"]');
      if (active) ul.scrollLeft = active.offsetLeft - (ul.clientWidth - active.offsetWidth) / 2;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
