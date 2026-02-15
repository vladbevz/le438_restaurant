// ===== CONTACT PAGE SCRIPTS =====
document.addEventListener("DOMContentLoaded", () => {
  // Додаємо копіювання телефону при кліку
  const phoneLinks = document.querySelectorAll(".phone-link, .footer__phone");

  phoneLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Нічого не робимо, просто даємо зателефонувати
      // Це для майбутнього функціоналу
    });
  });

  // Анімація появи карток
  const cards = document.querySelectorAll(".contact-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 * index);
  });
});
