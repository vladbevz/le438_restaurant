// ===== MENU PAGE SCRIPTS =====
document.addEventListener("DOMContentLoaded", () => {
  // Додаємо ефект при наведенні на категорії
  const categories = document.querySelectorAll(".menu-category");

  categories.forEach((category) => {
    category.addEventListener("mouseenter", () => {
      const priceTag = category.querySelector(".price-tag");
      if (priceTag) {
        priceTag.style.transform = "scale(1.05)";
        priceTag.style.transition = "transform 0.3s ease";
      }
    });

    category.addEventListener("mouseleave", () => {
      const priceTag = category.querySelector(".price-tag");
      if (priceTag) {
        priceTag.style.transform = "scale(1)";
      }
    });
  });

  // Форматуємо ціни
  const prices = document.querySelectorAll(".price-tag, .option-price");
  prices.forEach((price) => {
    let text = price.textContent;
    if (!text.includes("€")) {
      price.textContent = text + "€";
    }
  });
});
