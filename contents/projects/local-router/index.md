---
title: local-router
template: article.jade
intro: A small, hash-based router for the browser
links:
  GitHub: https://github.com/TuurDutoit/local-router
---

## What is this?
`local-router` is a little library, used to manage small Single Page Applications (SPAs). It's really simple: when the hash part of the page's URL changes, the Router will call the callbacks you registered for that specific route and it will add a (customizable) class to the document body. With `Router.go()`, you can programmatically browse through the website and by using the `hashchange` event, links work as expected. Small, simple, clean. And it just works.

Check out the GitHub repo for documentation.
