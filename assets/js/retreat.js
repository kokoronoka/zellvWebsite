/* ZÉLL-V — Wellness Retreat page: programme pop-ups, facilities photo viewer, enquiry form. */
(function () {
  'use strict';

  /* ==========================================================
     EDIT HERE: Google Sheets connection
     Paste the Web app URL from Google Apps Script between the quotes
     (setup steps: integrations/google-sheets-retreat-form.gs).
     While it is empty, the form asks visitors to send their details on WhatsApp instead.
     ========================================================== */
  const FORM_ENDPOINT = '';
  const WHATSAPP = '6593822879';
  const EMAIL = 'enquiry@zell-v.com';
  /* ========================================================== */

  const svg = (name) => `<svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const lockScroll = (on) => document.body.classList.toggle('no-scroll', on);

  /* ---------- Programme pop-ups ---------- */
  function initPlans() {
    document.querySelectorAll('[data-plan-open]').forEach((btn) => {
      const dialog = document.getElementById(btn.dataset.planOpen);
      if (dialog) btn.addEventListener('click', () => { dialog.showModal(); lockScroll(true); });
    });
    document.querySelectorAll('.plan-modal').forEach((dialog) => {
      dialog.addEventListener('close', () => lockScroll(false));
      dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
      dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
      dialog.querySelector('[data-plan-enquire]')?.addEventListener('click', (e) => {
        const interest = e.currentTarget.dataset.planEnquire;
        dialog.close();
        goToForm(interest);
      });
    });
  }

  // Scrolls to the form and ticks the matching "I would like to know more about" box
  function goToForm(interest) {
    const form = document.getElementById('retreat-form');
    document.getElementById('enquire').scrollIntoView();
    if (!form || form.hidden) return;
    const box = [...form.querySelectorAll('input[name="interests"]')].find((i) => i.value === interest);
    if (box) {
      box.checked = true;
      const option = box.closest('.check-option');
      option.classList.remove('is-flash');
      void option.offsetWidth; // restart the highlight animation
      option.classList.add('is-flash');
    }
    setTimeout(() => form.elements.firstName.focus({ preventScroll: true }), 700);
  }

  /* ---------- Facilities photo viewer ---------- */
  function initGallery() {
    const items = [...document.querySelectorAll('[data-lightbox]')];
    if (!items.length) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Facilities photos');
    dialog.innerHTML = `
      <figure><img alt=""><figcaption><span class="cap"></span><span class="count"></span></figcaption></figure>
      <button class="lightbox-nav prev" type="button" aria-label="Previous photo">${svg('left')}</button>
      <button class="lightbox-nav next" type="button" aria-label="Next photo">${svg('right')}</button>
      <button class="modal-close" type="button" aria-label="Close photos">${svg('x')}</button>`;
    document.body.appendChild(dialog);

    const img = dialog.querySelector('img');
    const cap = dialog.querySelector('.cap');
    const count = dialog.querySelector('.count');
    let index = 0;
    const show = (i) => {
      index = (i + items.length) % items.length;
      const thumb = items[index].querySelector('img');
      img.src = thumb.currentSrc || thumb.src;
      img.alt = thumb.alt;
      cap.textContent = thumb.alt;
      count.textContent = `${index + 1} / ${items.length}`;
    };

    items.forEach((item, i) => item.addEventListener('click', () => { show(i); dialog.showModal(); lockScroll(true); }));
    dialog.querySelector('.prev').addEventListener('click', () => show(index - 1));
    dialog.querySelector('.next').addEventListener('click', () => show(index + 1));
    dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { lockScroll(false); items[index].focus(); });
    dialog.addEventListener('click', (e) => { if (e.target === dialog || e.target.tagName === 'FIGURE') dialog.close(); });
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    // Swipe on phones
    let startX = null;
    dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    dialog.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- Enquiry form → Google Sheets ---------- */
  function initForm() {
    const form = document.getElementById('retreat-form');
    if (!form) return;
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('.form-submit');
    const success = form.parentElement.querySelector('.form-success');

    const RULES = {
      firstName: (v) => (v ? '' : 'Please enter your first name.'),
      lastName: (v) => (v ? '' : 'Please enter your last name.'),
      email: (v) => (!v ? 'Please enter your email address.'
        : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address, e.g. name@example.com.'),
      phone: (v) => (!v ? 'Please enter your phone number.'
        : v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number, including the country code.'),
      consent: (v, el) => (el.checked ? '' : 'Please tick this box so we can reply to you.'),
    };

    const setError = (el, message) => {
      const field = el.closest('.field');
      let error = field.querySelector('.field-error');
      if (!message) {
        el.removeAttribute('aria-invalid');
        el.removeAttribute('aria-describedby');
        error?.remove();
        return true;
      }
      if (!error) {
        error = document.createElement('p');
        error.className = 'field-error';
        error.id = `${el.id}-error`;
        field.appendChild(error);
      }
      error.textContent = message;
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', error.id);
      return false;
    };
    const validate = (el) => setError(el, RULES[el.name](el.value.trim(), el));

    Object.keys(RULES).forEach((name) => {
      const el = form.elements[name];
      el.addEventListener('blur', () => { if (el.type !== 'checkbox' && el.value.trim()) validate(el); });
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'input', () => { if (el.hasAttribute('aria-invalid')) validate(el); });
    });

    const values = () => ({
      firstName: form.elements.firstName.value.trim(),
      lastName: form.elements.lastName.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      interests: [...form.querySelectorAll('input[name="interests"]:checked')].map((i) => i.value).join(', '),
      message: form.elements.message.value.trim(),
    });

    // Pre-filled WhatsApp message, used when the form cannot be sent
    const whatsappLink = (v) => {
      const text = [
        'Hi ZÉLL-V, I would like to enquire about the Wellness Retreat.',
        `Name: ${v.firstName} ${v.lastName}`, `Email: ${v.email}`, `Phone: ${v.phone}`,
        v.interests && `Interested in: ${v.interests}`, v.message && `Message: ${v.message}`,
      ].filter(Boolean).join('\n');
      return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    };

    const showStatus = (html) => { status.innerHTML = html; status.hidden = false; };
    const setBusy = (busy) => {
      submit.disabled = busy;
      submit.setAttribute('aria-busy', String(busy));
      submit.querySelector('.btn-text').textContent = busy ? 'Sending…' : 'Send Enquiry';
    };
    const showSuccess = () => {
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
      window.gtag?.('event', 'generate_lead', { form_name: 'wellness_retreat' });
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.hidden = true;
      const invalid = Object.keys(RULES).map((n) => form.elements[n]).filter((el) => !validate(el));
      if (invalid.length) { invalid[0].focus(); return; }
      if (form.elements.website.value) { showSuccess(); return; } // spam bot filled the hidden field

      const v = values();
      const fallback = `<a href="${whatsappLink(v)}" target="_blank" rel="noopener">send your details on WhatsApp</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a>`;
      if (!FORM_ENDPOINT) {
        showStatus(`Online enquiries are not switched on yet. Please ${fallback}.`);
        return;
      }

      setBusy(true);
      try {
        const body = new URLSearchParams({ ...v, page: location.href });
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', body });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.result !== 'success') throw new Error(json.error || `HTTP ${res.status}`);
        showSuccess();
      } catch (err) {
        console.error('Retreat form:', err);
        showStatus(`Sorry, your enquiry could not be sent. Please try again, or ${fallback}.`);
      } finally {
        setBusy(false);
      }
    });
  }

  function init() {
    initPlans();
    initGallery();
    initForm();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
