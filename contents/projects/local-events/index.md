---
title: localStorage events
template: article.jade
intro: An EventEmitter shared between multiple tabs, over localStorage
links:
  GitHub: https://github.com/TuurDutoit/local-events
  Demo: http://tuurdutoit.be/local-events
---

## Why?
Because it's awesome.

## How it works
The inner workings under the hood are actually fairly simple: to emit en event, the `__events__` key in localStorage is changed to a specific string, formatted like this: `<room ID>,<random ID>,<data>`.

* `<room ID>` is the room ID of the source emitter. Other emitters will check if it matches their ID.
* `<random ID>` is a randomly generated 20-digit number. When the same event is emitted, with the same data in the same room, the string saved in localStorage wouldn't change without this random ID. In this case, the `storage` event wouldn't fire on the other pages.
* `<data>` is an stringified JSON object, containing some info about the event. It is parsed at the other end of the line.

All EventEmitters you create listen for the `storage` event on their `window`, check if the room ID matches theirs and calls the listeners registered to it. Simple and easy.
