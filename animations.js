/* ==========================================
   AWAIS BABRI PHARMACY - ANIMATIONS
   Lightweight GSAP Reveal Effects
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and reduced motion settings permit animation
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Section Reveal
    gsap.from('.hero-content > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });

    gsap.from('.hero-visual', {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    });

    // Scroll Triggered Staggered Animations for Cards
    if (typeof ScrollTrigger !== 'undefined') {
      const cardGrids = document.querySelectorAll('.grid-3, .grid-4');

      cardGrids.forEach(grid => {
        gsap.from(grid.children, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%'
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      });
    }
  }
});
