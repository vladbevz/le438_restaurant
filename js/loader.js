(function () {
    'use strict';

    var loader = document.getElementById('pageLoader');
    if (!loader) return;

    // Skip loader on repeat visits within the same session
    if (sessionStorage.getItem('le438_loaded')) {
        loader.remove();
        return;
    }
    sessionStorage.setItem('le438_loaded', '1');

    var MIN_DISPLAY = 1600; // ms — loader visible at minimum this long
    var start = Date.now();

    function dismiss() {
        var elapsed  = Date.now() - start;
        var remaining = Math.max(0, MIN_DISPLAY - elapsed);
        setTimeout(function () {
            loader.classList.add('is-done');
            // Remove from DOM after slide-up transition ends
            loader.addEventListener('transitionend', function () {
                loader.remove();
                document.body.style.overflow = '';
            }, { once: true });
        }, remaining);
    }

    // Prevent scroll during load
    document.body.style.overflow = 'hidden';

    if (document.readyState === 'complete') {
        dismiss();
    } else {
        window.addEventListener('load', dismiss);
    }
}());
