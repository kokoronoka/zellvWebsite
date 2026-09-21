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

  // Background videos: <video data-bg-video data-src="..." data-src-mobile="...">.
  // Loads the smaller file on phones; keeps the poster image for reduced motion / data saver.
  function initBgVideos() {
    const videos = document.querySelectorAll('video[data-bg-video]');
    if (!videos.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) return;
    const small = window.matchMedia('(max-width: 699px)').matches;
    videos.forEach((video) => {
      video.src = (small && video.dataset.srcMobile) || video.dataset.src;
      video.muted = true;
      const play = () => video.play().catch(() => { /* autoplay blocked: poster stays */ });
      play();
      // Pause while off screen to save battery and CPU
      new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : video.pause())).observe(video);
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


  /* ==========================================================
     ICON SET (Lucide). Pages use <svg><use href="assets/images/icons.svg#i-NAME"/></svg>;
     this script puts the icons into the page and points those links here, so icons
     also work when a page is opened straight from disk. To add an icon, add a <symbol>.
     ========================================================== */
  const ICON_SPRITE = `
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
    <symbol id="i-play" viewBox="0 0 24 24"><path d="M6 3.5v17a.5.5 0 0 0 .77.42l13-8.5a.5.5 0 0 0 0-.84l-13-8.5A.5.5 0 0 0 6 3.5Z"/></symbol>
    <symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/></symbol>
    <symbol id="i-droplet" viewBox="0 0 24 24"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></symbol>
    <symbol id="i-gem" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></symbol>
    <symbol id="i-zap" viewBox="0 0 24 24"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></symbol>
    <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>
    <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
    <symbol id="i-pulse" viewBox="0 0 24 24"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-dna" viewBox="0 0 24 24"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5M14 8l-1-1m-6 11 2.5 2.5m-6-6 .5.5M20 9l.5.5m-14 3 1 1m9-3 1 1m-6.5 4.5 1.5 1.5"/></symbol>
    <symbol id="i-person" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></symbol>
    <symbol id="i-flower" viewBox="0 0 24 24"><circle cx="12" cy="8" r="2"/><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/></symbol>
    <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></symbol>
    <symbol id="i-mountain" viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></symbol>
    <symbol id="i-quote" viewBox="0 0 24 24"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></symbol>
    <symbol id="i-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
    <symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></symbol>
    <symbol id="i-flask" viewBox="0 0 24 24"><path d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.13a2 2 0 0 1-.21-.9V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></symbol>
    <symbol id="i-truck" viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-message" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></symbol>
  `;
  function injectIcons() {
    const holder = document.createElement('div');
    holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${ICON_SPRITE}</defs></svg>`;
    document.body.prepend(holder.firstChild);
    document.querySelectorAll('use').forEach((use) => {
      const href = use.getAttribute('href') || '';
      const i = href.indexOf('icons.svg#');
      if (i !== -1) use.setAttribute('href', '#' + href.slice(i + 10));
    });
  }

  function init() {
    injectIcons();
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
    initBgVideos();
    // Scroll the current page's pill into view in horizontally scrolling sub-menus (mobile)
    document.querySelectorAll('.subnav ul').forEach((ul) => {
      const active = ul.querySelector('[aria-current="page"]');
      if (active) ul.scrollLeft = active.offsetLeft - (ul.clientWidth - active.offsetWidth) / 2;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
