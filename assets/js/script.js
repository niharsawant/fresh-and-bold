(function () {
    // Please note, Swup removes all the navigaton level events like popState, etc. 
    
    var swup = new Swup({
        containers: [
            "#swup-body",
            "#swup-navigation-primary"
        ],
        plugins: [new SwupScrollPlugin(), new SwupScriptsPlugin()]
    });

    // Adds active state to the logo
    var updateLogoState = function () {
        var url = new URL(window.location.href);
        var sitelogo = document.getElementsByClassName('site-head-logo')[0];

        if (url.pathname == '/') {
            sitelogo.classList.add('nav-current');
        } else {
            sitelogo.classList.remove('nav-current');
        }
    };

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

        updateLogoState();
    });

    swup.on('contentReplaced', function (event) {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('site-head-open');
        updateLogoState();
    });
})();