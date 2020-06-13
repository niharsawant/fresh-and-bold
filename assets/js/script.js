(function () {
    var swup = new Swup({
        containers: [
            "#swup-body",
            "#swup-navigation-primary"
        ],
        plugins: [new SwupScrollPlugin()]
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Mobile Menu Trigger
        var navBurger = document.getElementsByClassName('nav-burger')[0];
        var body = document.getElementsByTagName('body')[0];

        navBurger.addEventListener('click', function () {
            if (body.classList.contains('site-head-open')) {
                body.classList.remove('site-head-open');
            } else {
                body.classList.add('site-head-open');
            }
        });
    });

    swup.on('contentReplaced', function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('site-head-open');
    });
})();