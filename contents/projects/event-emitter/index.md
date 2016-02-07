---
title: EventEmitter
template: article.jade
intro: The last EventEmitter you'll ever need. Small, full-featured, for node.js and the browser.
links:
  GitHub: https://github.com/TuurDutoit/eventemitter
---

## Yet another EventEmitter?!
Yes indeed, another one! But there's good reason for that: this one has some extra features that node.js's EventEmitter has not, while being completely API compatible! Let's look at the differences.

### `handleEvent` objects
An often overlooked feature of the browser's `addEventListener`, is that it can take in objects as listeners. When the event is fired, it calls this object's `handleEvent` method, setting `this` to the object. This makes it way easier to keep track of context and variables.

### Wildcards & regular expressions
The event strings you pass to all the methods are converted to RegExps under the hood (`*` is converted to `.*`). This means you can use special syntax, like `*` to denote anything or `(something|else)` to choose between multiple options, in the event strings you pass to all the methods.

### Scopes
A result of these wildcards is that working with scopes, which are usually separated by `:`, gets really easy:

```javasscript
ee.on("scope:*", listener);
```

This will listen for any event that starts with `scope:`. Now, events like `scope:event` or `scope:other`, will trigger the listener.

## Try it out!
EventEmitter is API compatible with the most popular EventEmitter implementations out there, and works perfectly on the server __and__ in the browser. So go ahead and give it a try!