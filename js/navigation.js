(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var header  = document.querySelector('.header');
        var toggle  = document.querySelector('.nav__toggle');
        var drawer  = document.getElementById('navDrawer');

        if (!header) return;

        /* ── Scroll ── */
        if (document.querySelector('.hero')) {
            function onScroll() {
                header.classList.toggle('scrolled', window.scrollY > 40);
            }
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        if (!toggle || !drawer) return;

        /* ── Drawer toggle ── */
        function openDrawer() {
            drawer.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            toggle.querySelector('i').className = 'fas fa-times';
        }
        function closeDrawer() {
            drawer.classList.remove('is-open');
            document.body.style.overflow = '';
            toggle.querySelector('i').className = 'fas fa-bars';
        }
        function isOpen() { return drawer.classList.contains('is-open'); }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            isOpen() ? closeDrawer() : openDrawer();
        });

        drawer.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeDrawer);
        });

        document.addEventListener('click', function (e) {
            if (isOpen() && !drawer.contains(e.target) && !toggle.contains(e.target)) {
                closeDrawer();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) closeDrawer();
        });
    });
}());
