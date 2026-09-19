/* Layered parallax hero + Lenis smooth scrolling (GSAP ScrollTrigger).
   Markup: [data-parallax-layers] containing children with data-parallax-layer="1".."4".
   Layer 1 moves the most (farthest back), layer 4 the least (closest). */
(function () {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    const lenis = new Lenis({ anchors: { offset: -80 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.ZV = Object.assign(window.ZV || {}, { lenis });
  }

  const LAYERS = { desktop: [70, 55, 40, 10], mobile: [40, 30, 22, 6] };

  document.querySelectorAll('[data-parallax-layers]').forEach((trigger) => {
    const mm = gsap.matchMedia();
    const build = (speeds) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger, start: '0% 0%', end: '100% 0%', scrub: 0 },
      });
      speeds.forEach((yPercent, i) => {
        tl.to(trigger.querySelectorAll(`[data-parallax-layer="${i + 1}"]`), { yPercent, ease: 'none' }, i === 0 ? 0 : '<');
      });
    };
    mm.add('(min-width: 700px)', () => build(LAYERS.desktop));
    mm.add('(max-width: 699px)', () => build(LAYERS.mobile));
  });
})();
