// ===== CONTACT PAGE SCRIPTS =====
document.addEventListener("DOMContentLoaded", () => {

  // Leaflet map
  var mapEl = document.getElementById('map-contact');
  if (mapEl && typeof L !== 'undefined') {
    var lat = 43.70606950353588, lng = 4.283461733731595;
    var map = L.map('map-contact', { center: [lat, lng], zoom: 16, scrollWheelZoom: false, zoomControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    var markerIcon = L.divIcon({
      className: '',
      html: '<div class="map-marker"><div class="map-marker__dot"></div><div class="map-marker__pulse"></div></div>',
      iconSize: [40, 40], iconAnchor: [20, 20]
    });
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    setTimeout(function () { map.invalidateSize(); }, 400);
  }
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
