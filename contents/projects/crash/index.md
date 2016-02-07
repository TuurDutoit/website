---
title: Crash
template: article.jade
intro: Bundles RBush and SAT.js for easy 2D collisions.
links:
  GitHub: https://github.com/TuurDutoit/crash
  SAT.js: https://github.com/jriecken/sat-js
  RBush: https://github.com/mourner/rbush
---

## What is Crash?
Simply put, Crash bundles and optimizes some other modules, in order to make 2D collisions as easy and efficient as possible. I won't go into too much detail here, because the [docs] are way better at that.

## How does it work?
Crash exposes a base `Collider` class and some subclasses, one for each shape (`Circle`, `Polygon`, `Box` and `Point`). When a collider is added to Crash, it is inserted into a [RBush], which will help speed up collision checks.

Every time you want to check for collisions, you call `Crash.check()`. This will run through all Colliders that moved since the last call (Colliders track this automatically), gets possible collisions from RBush and uses [SAT] to handle the fine-grained checks.

To respond to collisions, a listener should be added using `Crash.onCollision(listener)`. The listener then gets some info for every collision and can react to that whatever way it wants.

Crash is small: only 6kB minified; with RBush and SAT included, the total rises to a mere 18kB  
By combining multiple optimization techniques, Crash is also very fast and efficient.

The latest version, 2.0.0, is stable by now, so try it out!




[docs]: https://github.com/TuurDutoit/crash
[RBush]: https://github.com/mourner/rbush
[SAT]: https://github.com/jriecken/sat-js