/* ==========================================
   AWAIS BABRI PHARMACY - MAIN JAVASCRIPT
   Strict Mobile Menu Logic & Core Interaction
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;

  if (mobileMenuBtn && mobileNav && mobileMenuClose) {
    
    // Function to Open Mobile Drawer
    function openMenu() {
      mobileNav.classList.add('is-active');
      mobileNav.setAttribute('aria-hidden', 'false');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      body.classList.add('no-scroll');
    }

    // Function to Close Mobile Drawer
    function closeMenu() {
      mobileNav.classList.remove('is-active');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      body.classList.remove('no-scroll');
    }

    // Explicit Click/Tap Listeners ONLY
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMenu();
    });

    mobileMenuClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });

    // Close on clicking outside the drawer container
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('is-active')) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close on Escape key press for keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-active')) {
        closeMenu();
      }
    });
  }
});
