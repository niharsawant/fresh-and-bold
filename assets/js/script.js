(function () {
    if (window.freshAndBoldSwupInitialized) {
        return;
    }
    window.freshAndBoldSwupInitialized = true;

    // Please note, Swup removes all the navigaton level events like popState, etc. 
    
    var swup = new Swup({
        containers: [
            "#swup-body",
            "#swup-navigation-primary"
        ],
        plugins: [new SwupScrollPlugin(), new SwupScriptsPlugin()]
    });

    // Swup replaces selected body containers, but Ghost can output page-specific
    // styles in {{ghost_head}} and page classes on <body>. Preserve both in its
    // page cache and synchronize them before each client-side render.
    var managedHeadStyleSelector = 'style, link[rel~="stylesheet"]';
    var managedHeadStyleAttribute = 'data-swup-managed-head-style';
    var isThemeStylesheet = function (element) {
        return element.tagName.toLowerCase() === 'link' &&
            /\/assets\/built\/screen\.css(?:[?#]|$)/.test(element.getAttribute('href') || '');
    };

    var getHeadStyles = function (doc, baseUrl) {
        return Array.prototype.map.call(doc.head.querySelectorAll(managedHeadStyleSelector), function (element) {
            if (isThemeStylesheet(element)) {
                return null;
            }

            var copy = element.cloneNode(true);
            if (copy.tagName.toLowerCase() === 'link') {
                var href = copy.getAttribute('href');
                if (href) {
                    copy.setAttribute('href', new URL(href, baseUrl).href);
                }
            }

            return copy.outerHTML;
        }).filter(Boolean);
    };

    var insertHeadStyle = function (html) {
        var parsedStyle = new DOMParser().parseFromString(html, 'text/html').head.firstElementChild;
        if (!parsedStyle) {
            return;
        }

        parsedStyle.setAttribute(managedHeadStyleAttribute, 'true');
        var themeStylesheet = document.head.querySelector('link[href*="/assets/built/screen.css"]');
        if (themeStylesheet) {
            document.head.insertBefore(parsedStyle, themeStylesheet);
        } else {
            document.head.appendChild(parsedStyle);
        }
    };

    var currentHeadStyles = getHeadStyles(document, window.location.href);
    document.head.querySelectorAll(managedHeadStyleSelector).forEach(function (element) {
        if (!isThemeStylesheet(element)) {
            element.setAttribute(managedHeadStyleAttribute, 'true');
        }
    });

    var initialPage = swup.cache.getCurrentPage();
    if (initialPage) {
        initialPage.headStyles = currentHeadStyles;
        initialPage.bodyClass = document.body.className;
    }

    var originalGetPageData = swup.getPageData;
    swup.getPageData = function (response) {
        var page = originalGetPageData.call(this, response);
        if (!page) {
            return page;
        }

        var parsedPage = new DOMParser().parseFromString(response.responseText, 'text/html');
        page.headStyles = getHeadStyles(parsedPage, response.responseURL || window.location.href);
        page.bodyClass = parsedPage.body ? parsedPage.body.className : '';
        return page;
    };

    var originalRenderPage = swup.renderPage;
    swup.renderPage = function (page, popstate) {
        if (page.headStyles && JSON.stringify(page.headStyles) !== JSON.stringify(currentHeadStyles)) {
            document.head.querySelectorAll('[' + managedHeadStyleAttribute + '="true"]').forEach(function (element) {
                element.remove();
            });
            page.headStyles.forEach(insertHeadStyle);
            currentHeadStyles = page.headStyles;
        }

        if (typeof page.bodyClass === 'string') {
            document.body.className = page.bodyClass;
        }

        originalRenderPage.call(this, page, popstate);
    };

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
