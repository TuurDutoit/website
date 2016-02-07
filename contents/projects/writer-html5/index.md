---
title: Writer (HTML5)
template: article.jade
intro: An attempt at a simple word processor, using HTML5 and inspired by the elementary OS project.
links:
  GitHub: https://github.com/TuurDutoit/writer
---

> This is the precursor of [Writer](writer). More info can be found on that page.

## How it works
Let's take a look at how I built the things that are already working.

### Editor
The editor itself is based on WYSIHTML5, a framework that allows building WYSIWYG editors in HTML5 quite easily, I must say.

Basic text editing is working, but unfortunately I got stuck at the exact same point I got stuck with Writer: spreading text over multiple pages. I still haven't figured out how to do that.

### Packaging
The whole interface is actually just a static webpage. I use nodewebkit, or NW.js, as it's called these days, to make it available as an app to the operating system. This works surprisingly well.

### Theme
I developed the theme in a separate repository, to make it easy make other apps with it.