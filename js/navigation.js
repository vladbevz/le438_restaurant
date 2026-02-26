// Mobile menu functionality
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".nav__toggle");
    const navMenu = document.querySelector(".nav__menu");

    if (!toggleButton || !navMenu) return;

    // Toggle menu on button click
    toggleButton.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("nav__menu--visible");

      // Toggle icon between bars and times
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav__menu--visible");
        const icon = toggleButton.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !toggleButton.contains(e.target)) {
        navMenu.classList.remove("nav__menu--visible");
        const icon = toggleButton.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        navMenu.classList.contains("nav__menu--visible")
      ) {
        navMenu.classList.remove("nav__menu--visible");
        const icon = toggleButton.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
})();
