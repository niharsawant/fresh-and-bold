# Fresh and Bold

'Fresh and Bold' is an open source, image-centric portfolio theme for [Ghost](https://ghost.org), derived from the [London theme](https://github.com/TryGhost/London). It was originally developed for [Nihar Sawant's personal site](https://nihar.sawant.me) and is released under the MIT license.

**Demo: https://nihar.sawant.me**


&nbsp;

![fresh and bold](https://user-images.githubusercontent.com/731954/84570721-ebc8b180-adac-11ea-8221-5869edef2243.jpg)

&nbsp;

## Repository Structure

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes. If you are interested in building a Ghost theme for yourself, please visit the full [API documentation](https://ghost.org/docs/themes/). Any Ghost theme contains the following files:

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

Fresh and Bold also includes these custom templates:

- `custom-articles.hbs`: Lists posts tagged `articles`.
- `custom-photo-journal.hbs`: Lists posts tagged `photo-journal`.
- `custom-portfolio.hbs`: A page template for portfolio content.
- `custom-post-without-featured-image.hbs`: Displays a post without requiring a featured image and includes related articles.
- `custom-subscribe.hbs`: Displays a dedicated subscribe form.

The theme uses Swup for client-side navigation. It keeps Ghost-injected head styles and page body classes in sync as visitors move between pages. Ghost editor cards, including bookmark cards, use the theme's font styles.

> ⚠️ **Important Note:** Support for [Portal](https://ghost.org/changelog/portal/) feature is currently unavailable. 


## Development

Styles are compiled with Gulp and PostCSS. Install [Node.js](https://nodejs.org/) and npm, then run these commands from the theme's root directory:

```bash
$ npm install
$ npm run dev
```

Edit files under `assets/css/`; the development task watches and compiles them to `assets/built/`.

Run the theme checks with:

```bash
$ npm test
```

This builds the theme and runs GScan.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ npm run zip
```

## Tips

### Configure routes and redirects

Ghost routes and redirects are configured separately from the theme and are not included in its ZIP. In a self-hosted Ghost install, these files are typically kept at `content/settings/routes.yaml` and `content/data/redirects.json`.

Before changing a live site, download its current files from **Ghost Admin → Settings → Labs** and merge the rules you need. See Ghost's [manual backup guide](https://ghost.org/docs/faq/manual-backup/) for the download workflow.

For a self-hosted install, `content/settings/routes.yaml` can define routes, collections, and taxonomy URLs. Adapt page slugs and templates to fit your site:

```yaml
routes:
  /:
    data: page.home
    template: index
  /rss/:
    template: rss-feed
    content_type: text/xml

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

For example, `content/data/redirects.json` can redirect previous tag and work URLs:

```json
[
  { "from": "/tag/articles/", "to": "/thoughts/", "permanent": true },
  { "from": "/tag/portfolio-projects/", "to": "/work/", "permanent": true },
  { "from": "/tag/photo-journal/", "to": "/photo-journal/", "permanent": true },
  { "from": "/work/", "to": "/portfolio/", "permanent": true }
]
```

Keep redirects that match URLs your site has published and change their destinations when your slugs differ. Ghost supports the older JSON redirect format, but recommends YAML for new redirect files. See [Implementing redirects in Ghost](https://ghost.org/tutorials/implementing-redirects/) for current format details. Upload the files in **Settings → Labs**, or place them at the paths above in a self-hosted install. Restart Ghost after editing routes directly on disk so the new routes load.

### Preview the theme with a symlink

To preview theme changes in a local Ghost instance, create a symbolic link from its themes directory to this repository:

```bash
$ cd /path-to-ghost-instance/content/theme
$ ln -s /absolute-path-to-theme-repo/fresh-and-bold fresh-and-bold
```

Check the link with `ls -la`, then activate the theme in Ghost Admin under **Settings → Theme**. Changes to the linked theme will be available in the local instance.

## PostCSS Features Used

- Autoprefixer: Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables: Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)


## Copyright & License

Copyright (c) 2013-2026 Nihar Sawant - Released under the [MIT license](LICENSE).
