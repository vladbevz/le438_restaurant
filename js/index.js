(function () {
    'use strict';

    /* ===== LEAFLET MAP ===== */
    function initMap() {
        var mapEl = document.getElementById('map-le438');
        if (!mapEl || typeof L === 'undefined') return;

        var lat = 43.70606950353588, lng = 4.283461733731595;

        var map = L.map('map-le438', {
            center: [lat, lng],
            zoom: 16,
            scrollWheelZoom: false,
            zoomControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 20
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        var markerIcon = L.divIcon({
            className: '',
            html: '<div class="map-marker"><div class="map-marker__dot"></div><div class="map-marker__pulse"></div></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        L.marker([lat, lng], { icon: markerIcon }).addTo(map);

        setTimeout(function () { map.invalidateSize(); }, 400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMap);
    } else {
        initMap();
    }

    const IMAGES = [
        { src: 'images/terasse.webp',  caption: 'Notre terrasse' },
        { src: 'images/terasse2.webp', caption: 'Notre terrasse' }
    ];

    const lb      = document.getElementById('terraceLightbox');
    const lbImg   = document.getElementById('terraceLbImg');
    const lbCnt   = document.getElementById('terraceLbCounter');
    const lbClose = document.getElementById('terraceLbClose');
    const lbPrev  = document.getElementById('terraceLbPrev');
    const lbNext  = document.getElementById('terraceLbNext');

    if (!lb) return;

    let current = 0;

    function show(index) {
        current = index;
        lbImg.classList.add('is-loading');
        const tmp = new Image();
        tmp.onload = function () {
            lbImg.src = IMAGES[index].src;
            lbImg.alt = IMAGES[index].caption;
            lbImg.classList.remove('is-loading');
        };
        tmp.src = IMAGES[index].src;
        lbCnt.textContent = (index + 1) + ' / ' + IMAGES.length;
        lbPrev.disabled = index === 0;
        lbNext.disabled = index === IMAGES.length - 1;
    }

    function open(index) {
        show(index);
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }

    function close() {
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-terrace]').forEach(function (el) {
        el.addEventListener('click', function () {
            open(parseInt(el.dataset.terrace));
        });
    });

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', function () { if (current > 0) show(current - 1); });
    lbNext.addEventListener('click', function () { if (current < IMAGES.length - 1) show(current + 1); });

    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

    document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'ArrowLeft')  { if (current > 0) show(current - 1); }
        if (e.key === 'ArrowRight') { if (current < IMAGES.length - 1) show(current + 1); }
        if (e.key === 'Escape')     close();
    });

    let touchX = 0;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].screenX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].screenX - touchX;
        if (Math.abs(dx) > 50) { dx < 0 ? (current < IMAGES.length - 1 && show(current + 1)) : (current > 0 && show(current - 1)); }
    }, { passive: true });

}());
