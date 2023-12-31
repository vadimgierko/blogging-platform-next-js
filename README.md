# Blogging Platform rewritten in Next.js, TypeScript & React Bootstrap

Here is my Blogging Platform ([created originally in 2021 using React 17](https://github.com/vadimgierko/blogging-platform)) rewritten from scratch in Next.js, TypeScript & React Bootstrap (in December 2023) for learning & exercise purposes & also for fun & fixing some bugs.

## `Update & Maintainance Note`

The [initital app built in 2021](https://github.com/vadimgierko/blogging-platform) is still working deployed on [GitHub Pages](https://vadimgierko.github.io/blogging-platform/) regardless of old versions of all dependencies, but:

- will not be maintained anymore;
- bugs in the previous version will not be fixed *(for example **issues with updating article or blog title - do not do this here; instead do it via current new Next.js version** - it's fixed there)*.

Instead of replacing the old code in the previous repo, I've decided to create a new (current) repo & start from scratch, but preserving the old UI appearance, existing urls (using hashes) & database architecture, despite now I could design the database better way.

The new rewritten app looks same way in the browser, but under the hood it is absolutely different + all known bugs were fixed & features/technologies were refined/updated:

- SEO support
- better Markdown Editor & features
- more intuitive Dashboard
- improved adding/updating articles/blogs UX
- pure Bootstrap was replaced by React Bootstrap
- Vercel Deployment instead of GitHub Pages
- TypeScript instead of Vanilla JavaScript

## Realtime Database Limitations

Becuase of use free Realtime Database tier, the number of simultanious signed in users is limited to 100, what means that if 100 registered bloggers are online on the site, the 101-st user cannot update his data. But this platform isn't as popular, so do not worry about this 😉

If we are talking about non-registered users, like usual readers of blogs, their number is not limited, because articles & blogs are public, so thousands of people can be on site & read articles without a porblem.

## About

Blogging Platform was one of my most complex & advanced responsive full-stack single-page application due to 2021.

Now it has been rewritten in Next.js & TypeScript & is a pretty standard app/ website I can build nowadays (2023).

*Besides, I've rewritten the old version only in a few days* 😏😎

## What you can do with Blogging Platform

- create & run your blog (or many blogs) for free after creating a free user account,
- write & edit your articles with simple & intuitive markdown text editor, which was also created by myself (see project repo here: https://github.com/vadimgierko/markdown-text-editor or try it here: https://vadimgierko.github.io/markdown-text-editor/),
- read published blogs/ articles without authentication

## Technologies used in the project

- Next.js 14+
- React ~~17~~ 18+
- ~~React Context~~
- ~~React Router 5.2 (dynamic & nested routing)~~ Next.js pages file-based built-in routing
- React Markdown ~~7~~ 9+ & remark-gfm
- Firebase ~~9.1~~ 10.7+ (authentication, realtime database, security rules)
- React Bootstrap 2.9.2
- Bootstrap ~~5.1~~ 5.3.2
- Bootswatch ~~5.1~~ 5.3.2
- ~~GitHub Pages 3.2~~ Vercel Deployment
- ~~Atomic Web Design pattern~~