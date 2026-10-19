/* ZÉLL-V — Global Presence / Business page: activity carousel, world map regions,
   partner enquiry form (sends via WhatsApp) and the hero count-up. */
(function () {
  'use strict';

  /* ==========================================================
     EDIT HERE: WhatsApp number and the regions shown on the map
     ========================================================== */
  const WHATSAPP = '6593822879';
  const REGIONS = {
    'north-america': { name: 'North America', countries: ['United States'], outlets: [] },
    europe: { name: 'Europe', countries: ['Germany', 'Switzerland'], outlets: [] },
    'middle-east': { name: 'Middle East', countries: ['Lebanon'], outlets: [] },
    'east-asia': { name: 'East Asia', countries: ['Hong Kong', 'China', 'Macau', 'Taiwan'], outlets: ['Hong Kong', 'Macau'] },
    asean: { name: 'ASEAN', countries: ['Singapore', 'Malaysia', 'Brunei', 'Vietnam', 'Indonesia'], outlets: ['Marina Bay Sands, Singapore', 'Ngee Ann City, Singapore', 'Pavilion Kuala Lumpur, Malaysia', 'Brunei', 'Vietnam'] },
    'southern-africa': { name: 'Southern Africa', countries: ['South Africa'], outlets: [] },
    oceania: { name: 'Oceania', countries: ['New Zealand'], outlets: [] },
  };
  /* ========================================================== */

  const ROOT = new URL('../../', document.currentScript.src).pathname;
  const svg = (name) => `<svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const flag = (country) => `${ROOT}assets/images/global/flags/${country.toLowerCase().replace(/\s+/g, '-')}.webp`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Activity carousel arrows ---------- */
  function initCarousel() {
    const track = document.querySelector('[data-ag-track]');
    if (!track) return;
    const step = () => (track.querySelector('.ag-card')?.offsetWidth || 300) + 16;
    document.querySelector('[data-ag-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step() * 2, behavior: reduced ? 'auto' : 'smooth' }));
    document.querySelector('[data-ag-next]')?.addEventListener('click', () => track.scrollBy({ left: step() * 2, behavior: reduced ? 'auto' : 'smooth' }));
  }

  /* ---------- World map: pins and region chips open a region card ---------- */
  function initMap() {
    const shell = document.querySelector('[data-geo]');
    if (!shell) return;
    const card = shell.querySelector('[data-geo-card]');
    const pins = [...shell.querySelectorAll('.geo-pin')];
    const chips = [...shell.querySelectorAll('.geo-chips [data-region]')];
    let active = null;
    const close = () => {
      active = null;
      card.hidden = true;
      pins.forEach((p) => p.classList.remove('is-active'));
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
    };
    const open = (id) => {
      const r = REGIONS[id];
      if (!r) return;
      active = id;
      pins.forEach((p) => p.classList.toggle('is-active', p.dataset.region === id));
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.region === id)));
      const n = r.countries.length;
      card.innerHTML = `
        <button class="geo-close" type="button" aria-label="Close">${svg('x')}</button>
        <p class="geo-status"><span class="dot-live"></span>Active outlets</p>
        <h3>${esc(r.name)}</h3>
        <p class="geo-sub">${n} market${n > 1 ? 's' : ''}</p>
        <ul class="geo-countries">${r.countries.map((c) => `<li><img src="${flag(c)}" width="30" height="20" alt="">${esc(c)}</li>`).join('')}</ul>
        ${r.outlets.length ? `<p class="field-label">Flagship outlets</p><ul class="geo-outlets">${r.outlets.map((o) => `<li>${svg('building')}${esc(o)}</li>`).join('')}</ul>` : ''}
        <a class="btn btn-primary" href="${waLink(`Hi ZÉLL-V, I'm interested in partnering with ZÉLL-V in ${r.name}.`)}" target="_blank" rel="noopener">Enquire about this region ${svg('arrow')}</a>`;
      card.hidden = false;
      card.querySelector('.geo-close').addEventListener('click', close);
    };
    [...pins, ...chips].forEach((el) => el.addEventListener('click', () => (active === el.dataset.region ? close() : open(el.dataset.region))));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && active) close(); });
    open('asean');
  }

  /* ---------- Partner form → WhatsApp ---------- */
  function initPartnerForm() {
    const form = document.getElementById('partner-form');
    if (!form) return;
    const status = form.querySelector('.form-status');
    const RULES = {
      name: (v) => (v ? '' : 'Please enter your name.'),
      email: (v) => (!v ? 'Please enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address, e.g. name@example.com.'),
      phone: (v) => (!v ? 'Please enter your telephone number.' : v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid number, including the country code.'),
    };
    const setError = (el, msg) => {
      const field = el.closest('.field');
      let err = field.querySelector('.field-error');
      if (!msg) { el.removeAttribute('aria-invalid'); el.removeAttribute('aria-describedby'); err?.remove(); return true; }
      if (!err) { err = document.createElement('p'); err.className = 'field-error'; err.id = `${el.id}-error`; field.appendChild(err); }
      err.textContent = msg;
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
      return false;
    };
    const validate = (el) => setError(el, RULES[el.name](el.value.trim()));
    Object.keys(RULES).forEach((n) => {
      const el = form.elements[n];
      el.addEventListener('blur', () => { if (el.value.trim()) validate(el); });
      el.addEventListener('input', () => { if (el.hasAttribute('aria-invalid')) validate(el); });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = Object.keys(RULES).map((n) => form.elements[n]).filter((el) => !validate(el));
      if (bad.length) { bad[0].focus(); return; }
      const v = (n) => form.elements[n].value.trim();
      const lines = ['New partnership enquiry from the ZÉLL-V website:', `Name: ${v('name')}`, `Email: ${v('email')}`, `Telephone: ${v('phone')}`];
      if (v('company')) lines.push(`Company: ${v('company')}`);
      if (v('message')) lines.push(`Message: ${v('message')}`);
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
      status.textContent = `Thanks, ${v('name')}. We’ve opened WhatsApp with your details filled in. Just press send to reach our team.`;
      status.hidden = false;
      window.gtag?.('event', 'generate_lead', { form_name: 'partner_enquiry' });
      form.reset();
    });
  }

  /* ---------- Count-up for numbers marked data-count ---------- */
  function initCounters() {
    if (reduced || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el = entry.target, target = Number(el.dataset.count), suffix = el.dataset.suffix || '';
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1100);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
  }

  function init() {
    initCarousel();
    initMap();
    initPartnerForm();
    initCounters();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
