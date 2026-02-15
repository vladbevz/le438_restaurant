// ===== GOOGLE MAPS =====
// Конфігурація
const CONFIG = {
  API_KEY: "AIzaSyBSoSw7RAlDDZaIddEzK53bS-xe44M8W1o",
  PLACE_ID: "ChIJKZImdsWDthIRW4IlXp8-TkA",
  BUSINESS_LOCATION: { lat: 43.6959, lng: 4.276 },
  BUSINESS_NAME: "LE 438",
  BUSINESS_ADDRESS: "Zone Industrielle, 30600 Vauvert",
};

// Ініціалізація карти
function initMap() {
  const mapElement = document.getElementById("map-with-reviews");
  if (!mapElement) return;

  try {
    const map = new google.maps.Map(mapElement, {
      center: CONFIG.BUSINESS_LOCATION,
      zoom: 16,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#1a1a1a" }],
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }],
        },
      ],
    });

    const marker = new google.maps.Marker({
      position: CONFIG.BUSINESS_LOCATION,
      map: map,
      title: CONFIG.BUSINESS_NAME,
      animation: google.maps.Animation.DROP,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#8B0000",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    const infowindow = new google.maps.InfoWindow({
      content: `
                <div style="padding: 15px; max-width: 250px;">
                    <h3 style="color: #8B0000; margin: 0 0 10px 0;">${CONFIG.BUSINESS_NAME}</h3>
                    <p style="margin: 0 0 10px 0; color: #333;">${CONFIG.BUSINESS_ADDRESS}</p>
                    <div style="color: #FFB400; font-size: 1.1rem; margin: 10px 0;">★★★★★</div>
                    <a href="https://maps.google.com/?q=${encodeURIComponent(CONFIG.BUSINESS_ADDRESS)}" 
                       target="_blank" 
                       style="display: inline-block; background: #4285F4; color: white; padding: 8px 15px; 
                              text-decoration: none; border-radius: 4px; font-weight: bold;">
                        Ouvrir dans Google Maps →
                    </a>
                </div>
            `,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    setTimeout(() => {
      infowindow.open(map, marker);
    }, 1000);
  } catch (error) {
    console.error("Map error:", error);
    const mapContainer = document.getElementById("map-with-reviews");
    if (mapContainer) {
      mapContainer.innerHTML = `
                <div class="fallback-map">
                    <h4>${CONFIG.BUSINESS_NAME}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${CONFIG.BUSINESS_ADDRESS}</p>
                    <a href="https://maps.google.com/?q=${encodeURIComponent(CONFIG.BUSINESS_ADDRESS)}" 
                       target="_blank" 
                       class="btn-map-link">
                        Voir sur Google Maps
                    </a>
                </div>
            `;
    }
  }
}

// Глобальна функція для Google Maps
window.initMap = initMap;
