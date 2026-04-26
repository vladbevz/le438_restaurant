(function () {
    'use strict';

    const lightbox    = document.getElementById('lightbox');
    const lbImg       = document.getElementById('lightboxImg');
    const lbCaption   = document.getElementById('lightboxCaption');
    const lbCounter   = document.getElementById('lightboxCounter');
    const lbClose     = document.getElementById('lightboxClose');
    const lbPrev      = document.getElementById('lightboxPrev');
    const lbNext      = document.getElementById('lightboxNext');

    if (!lightbox) return;

    let currentImages  = [];
    let currentCaptions = [];
    let currentIndex   = 0;
    let currentGallery = null;

    /* ── open / close ── */

    function openLightbox(gallery, index) {
        currentImages   = gallery.images;
        currentCaptions = gallery.captions;
        currentIndex    = index;
        currentGallery  = gallery.id;
        showImage(index);
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lbClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    /* ── image display ── */

    function showImage(index) {
        lbImg.classList.add('is-loading');
        const src = currentImages[index];
        const tmp = new Image();
        tmp.onload = function () {
            lbImg.src = src;
            lbImg.alt = currentCaptions[index] || '';
            lbImg.classList.remove('is-loading');
        };
        tmp.src = src;

        lbCaption.textContent  = currentCaptions[index] || '';
        lbCounter.textContent  = (index + 1) + ' / ' + currentImages.length;

        // sync thumbnails
        const thumbWrap = document.querySelector('[data-thumbs-for="' + currentGallery + '"]');
        if (thumbWrap) {
            thumbWrap.querySelectorAll('.thumb').forEach(function (t) {
                t.classList.toggle('is-active', parseInt(t.dataset.index) === index);
            });
        }

        lbPrev.disabled = index === 0;
        lbNext.disabled = index === currentImages.length - 1;
    }

    function prev() {
        if (currentIndex > 0) { currentIndex--; showImage(currentIndex); }
    }

    function next() {
        if (currentIndex < currentImages.length - 1) { currentIndex++; showImage(currentIndex); }
    }

    /* ── build gallery map from DOM ── */

    const galleries = {};

    document.querySelectorAll('.cat-image[data-gallery]').forEach(function (el) {
        const id       = el.dataset.gallery;
        const images   = JSON.parse(el.dataset.images   || '[]');
        const captions = JSON.parse(el.dataset.captions || '[]');
        galleries[id]  = { id: id, images: images, captions: captions };

        el.addEventListener('click', function () {
            if (images.length === 0) return;
            openLightbox(galleries[id], 0);
        });
    });

    /* ── thumbnail clicks ── */

    document.querySelectorAll('.cat-thumbs').forEach(function (wrap) {
        const galleryId = wrap.dataset.thumbsFor;
        wrap.querySelectorAll('.thumb[data-index]').forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                const idx = parseInt(thumb.dataset.index);
                openLightbox(galleries[galleryId], idx);
            });
        });
    });

    /* ── controls ── */

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape')     closeLightbox();
    });

    /* ── touch / swipe ── */

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    }, { passive: true });

}());
