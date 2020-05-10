(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Mobile Menu Trigger
        var navBurger = document.getElementsByClassName('nav-burger')[0];
        var body = document.getElementsByTagName('body')[0];

        // Initiate Swup transitions
        var swup = new Swup({
            plugins: [new SwupScrollPlugin()]
        });

        navBurger.addEventListener('click', function () {
            if (body.classList.contains('site-head-open')) {
                body.classList.remove('site-head-open');
            } else {
                body.classList.add('site-head-open');
            }
        });
    });

    document.addEventListener('swup:contentReplaced', function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('site-head-open');
    });
})();