# Fresh and Bold

'Fresh and Bold' is an open source, image-centric portfolio theme for [Ghost](https://ghost.org) derived from [London](https://github.com/TryGhost/London) theme. It was orignially developed for the personal site of [Nihar Sawant](https://nihar.sawant.me) and now released under the MIT license.

**Demo: http://nihar.sawant.me**


&nbsp;

![fresh and bold](https://user-images.githubusercontent.com/731954/84570721-ebc8b180-adac-11ea-8221-5869edef2243.jpg)

&nbsp;

# Repository Structure 

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes. If you are interested in building a Ghost theme for yourself, please visit the full [API documentation](https://ghost.org/docs/themes/). Any Ghost theme contains the following files:

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

**In the case of Fresh and Bold theme, we have added a few custom templates as well:**
- `custom-articles.hbs`: Used to render the articles page in a list form
- `custom-photo-journal.hbs`: Used to render the main photo journal page 
- `custom-post-without-featured-image.hbs`: Renders post without any featured image
- `custom-subscribe.hbs`: Used for a dedicated subscribe page

> ⚠️ **Important Note:** Support for [Portal](https://ghost.org/changelog/portal/) feature is currently unavailable. 


# Development

All the styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
$ npm install
$ npm run dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ npm run zip
```

## 💡 Tip
During the development, establish a symbolic link inside the Ghost instance to view the changes in realtime. To set this, make sure you have a Ghost instance running. Inside this instance setup a symbolic using following commands:

```bash
$ cd /path-to-ghost-instance/content/theme
$ ln -s /absolute-path-to-theme-repo/fresh-and-bold fresh-and-bold
```

Ensure that the symbolic link is setup correctly by running `ls -la`. If setup correct, a new entry should appear in [the themes](http://localhost:2368/ghost/#/settings/theme) section in Ghost admin. Activate the theme. Now, whenever you make changes to your theme, they will be reflected immediately in the Ghost instance.

# PostCSS Features Used

- Autoprefixer: Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables: Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)


# Copyright & License

Copyright (c) 2013-2020 Nihar Sawant - Released under the [MIT license](LICENSE).
