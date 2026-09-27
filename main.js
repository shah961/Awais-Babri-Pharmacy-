/* ==========================================================================
   Awais Babri Pharmacy — animations.js
   Lightweight GSAP-powered motion. Respects prefers-reduced-motion.
   No ScrollTrigger plugin loaded — IntersectionObserver drives reveals
   to keep the network payload small.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";

  document.documentElement.classList.add("gsap-ready");

  /* ---- Hero reveal (single orchestrated moment) ---- */
  function heroReveal() {
    var hero = document.querySelector("[data-hero]");
    if (!hero) return;

    var targets = hero.querySelectorAll("[data-reveal]");
    if (!hasGSAP || prefersReduced) {
      targets.forEach(function (el) { el.style.opacity = 1; });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 22 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.1
    });
  }

  /* ---- Scroll reveals via IntersectionObserver (no ScrollTrigger needed) ---- */
  function scrollReveals() {
    var items = document.querySelectorAll("[data-reveal-scroll]");
    if (!items.length) return;

    if (!hasGSAP || prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.style.opacity = 1; });
      return;
    }

    gsap.set(items, { opacity: 0, y: 18 });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Staggered groups (card grids, list rows) ---- */
  function staggerGroups() {
    var groups = document.querySelectorAll("[data-reveal-group]");
    if (!groups.length) return;

    if (!hasGSAP || prefersReduced || !("IntersectionObserver" in window)) {
      groups.forEach(function (g) {
        Array.prototype.forEach.call(g.children, function (c) { c.style.opacity = 1; });
      });
      return;
    }

    groups.forEach(function (group) {
      var children = group.children;
      gsap.set(children, { opacity: 0, y: 16 });

      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              gsap.to(entry.target.children, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08
              });
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(group);
    });
  }

  /* ---- Mobile menu open/close animation ---- */
  window.PharmacyMenuAnimation = {
    open: function (menuEl, onComplete) {
      if (!hasGSAP || prefersReduced) {
        menuEl.style.transform = "translateX(0)";
        if (onComplete) onComplete();
        return;
      }
      gsap.killTweensOf(menuEl);
      gsap.set(menuEl, { transform: "translateX(100%)" });
      gsap.to(menuEl, {
        transform: "translateX(0%)",
        duration: 0.45,
        ease: "power3.out",
        onComplete: onComplete
      });

      var links = menuEl.querySelectorAll(".mobile-nav-list a");
      gsap.fromTo(
        links,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, delay: 0.15 }
      );
    },
    close: function (menuEl, onComplete) {
      if (!hasGSAP || prefersReduced) {
        menuEl.style.transform = "translateX(100%)";
        if (onComplete) onComplete();
        return;
      }
      gsap.killTweensOf(menuEl);
      gsap.to(menuEl, {
        transform: "translateX(100%)",
        duration: 0.35,
        ease: "power2.in",
        onComplete: onComplete
      });
    }
  };

  function init() {
    try { heroReveal(); } catch (e) { /* fail silent, layout still usable */ }
    try { scrollReveals(); } catch (e) {}
    try { staggerGroups(); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
