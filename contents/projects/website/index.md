---
title: Website
template: article.jade
intro: A short history of this website, and an overview of the technologies used.
links:
  Home: http://tuurdutoit.be
  GitHub: https://github.com/TuurDutoit/website
---

## The humble beginnings
A few years ago, I was just starting to learn node.js, so one day I followed a tutorial about Express, Jade and Stylus and how to make them work together. I really liked the design, so I contacted the author and asked if I could use it for my personal website. He agreed and I uploaded my website, which consisted of just one page: the homepage that still looks approximately the same.

For hosting, I chose [DigitalOcean](https://m.do.co/c/7cf26c25a983) (that's my referral link: if you use this one to sign up, I get some credit), which I still use. They have been absolutely great, working without a hitch and providing amazing support: they replied to me within 2 minutes (I swear!) some time ago.

## Moving to static pages
When 2016 came along, I got fed up with my current setup: I had to make sure node.js kept running and I had to make sure Nginx proxied the site correctly. Updating the site wasn't the most pleasant experience, and I figured building out the site, with more info on my projects and maybe some of my photography, wouldn't be very easy. So I decided to switch to a static website.

First, I planned on hosting the site on GitHub.io, but that meant I had to work with Jekyll, which, after some messing around, I had to admit I didn't like. So I searched for another static site generator and discovered Wintersmith. It is everything I want from such a tool: simplicity, hackability, easy setup. I switched from Stylus to Less, ported some of the Jade templates, wrote some content and added styles for the new parts. Everything went smoothly, Wintersmith kept working like a charm.  
Updating the site is now much easier: just upload the files that changed, done. And it's a lot more efficient: Nginx just serves up static files, no extra processes involved.

## Responsive images
When building the website in Wintersmith, I quickly realized something: I'm gonna need some way to resize images. Luckily, Wintersmith has a great plugin system, which allowed me to get a rudimentary version working in one day, using the `gm` module from NPM. I originally wanted to use the plugin to make responsive images, but that proved to be pretty hard: I would have to somehow hijack the Markdown parser, but due to the loading order of modules, that's hard to achieve. I decided I didn't want to waste my time on an unnecessary gimmick, so I left it as is (for now, at least).  
I don't think I uploaded the module to GitHub. I really should, though...
