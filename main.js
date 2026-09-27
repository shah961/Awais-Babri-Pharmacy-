/* ==========================================================================
   Awais Babri Pharmacy — main.js
   Mobile navigation (click-only, no swipe), FAQ accordion,
   contact form placeholder handling, small utilities.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initFaq();
    initContactForm();
    initFooterYear();
  });

  /* ---------------------------------------------------------------------
     Mobile navigation
     - Opens ONLY on click/tap of the hamburger button
     - No swipe gestures are attached anywhere
     - Escape key and outside click close it
     - Body scroll is locked while open
     - aria-expanded / aria-controls kept in sync
  --------------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-mobile-menu]");
    var closeBtn = document.querySelector("[data-menu-close]");
    if (!toggle || !menu) return;

    var lastFocused = null;

    function trapFocus(e) {
      if (e.key !== "Tab") return;
      var focusables = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openMenu() {
      lastFocused = document.activeElement;
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");

      if (window.PharmacyMenuAnimation) {
        window.PharmacyMenuAnimation.open(menu);
      }

      document.addEventListener("keydown", onKeydown);
      document.addEventListener("click", onOutsideClick, true);
      document.addEventListener("keydown", trapFocus);

      window.setTimeout(function () {
        if (closeBtn) closeBtn.focus();
      }, 60);
    }

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");

      var finish = function () {
        menu.classList.remove("is-open");
      };

      if (window.PharmacyMenuAnimation) {
        window.PharmacyMenuAnimation.close(menu, finish);
      } else {
        finish();
      }

      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("click", onOutsideClick, true);
      document.removeEventListener("keydown", trapFocus);

      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function onKeydown(e) {
      if (e.key === "Escape") closeMenu();
    }

    function onOutsideClick(e) {
      if (!menu.classList.contains("is-open")) return;
      var withinMenu = menu.contains(e.target);
      var isToggle = toggle.contains(e.target);
      if (!withinMenu && !isToggle) closeMenu();
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    var menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------------------------------------------------------------------
     FAQ accordion (contact page)
  --------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll("[data-faq-item]");
    if (!items.length) return;

    items.forEach(function (item) {
      var question = item.querySelector(".faq-q");
      var answer = item.querySelector(".faq-a");
      if (!question || !answer) return;

      question.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";

        items.forEach(function (other) {
          if (other !== item) {
            other.setAttribute("data-open", "false");
            other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
            other.querySelector(".faq-a").style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.setAttribute("data-open", "false");
          question.setAttribute("aria-expanded", "false");
          answer.style.maxHeight = null;
        } else {
          item.setAttribute("data-open", "true");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Contact form
     There is no backend on this site. The form does not send data
     anywhere. We only confirm receipt visually and point the visitor
     to the phone number for anything time-sensitive.
  --------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var successBox = form.querySelector(".form-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#contact-name");
      var phone = form.querySelector("#contact-phone");
      var valid = true;

      [name, phone].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          valid = false;
        } else if (field) {
          field.removeAttribute("aria-invalid");
        }
      });

      if (!valid) return;

      if (successBox) {
        successBox.classList.add("is-visible");
        successBox.setAttribute("role", "status");
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  function initFooterYear() {
    var els = document.querySelectorAll("[data-year]");
    var year = new Date().getFullYear();
    els.forEach(function (el) { el.textContent = year; });
  }
})();
