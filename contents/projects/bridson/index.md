---
title: Bridson
template: article.jade
intro: A node module that generates Poisson-disc distributions using the Bridson algorithm. The code and docs could use some love, but it works pretty well.
links:
  GitHub: https://github.com/TuurDutoit/bridson
  NPM: https://npmjs.com/package/bridson
---

## What is Bridson?
The Bridson algorithm is used to generate so-called Poisson-disc distributions: random, but evenly distributed sets of points, inside a certain shape. Generating such a distribution seems easier than it is: at first, you'd think you can just generate some points using `Math.random()`. This works, but, unfortunately, results in a truly random distribution, which means there will be places where the points are nearly touching each other and places where they are too far apart. It doesn't look good or natural.  
That's where Bridson comes in. It is able to generate random distributions that look even and are easier on the eye.

I'm not going to explain how it works, because Mike Bostock can do that much better than I ever could. He wrote a very interesting article, [Visualizing algorithms](http://bost.ocks.org/mike/algorithms), in which he explains the Bridson algorithm (and a few others) in great detail, accompanied by some amazing animations and illustrations, visualizing what he's telling. It's on this article that I based myself on when writing the bridson module.

> __Disclaimer:__ *The code for this module isn't very tidy and probably not as efficient as it could be. But it works. It works well, in fact. And I plan on making it the absolute best it can be, whenever I find a little bit of free time.*

## How it works
Basically, you give bridson a shape to work inside and a minimum distance between points, and it returns a distribution. That would be the basic workflow, but, of course, this module is much more flexible than that and can be customized a great deal. Let's go over some options!

### Points
But first, a note on points. In bridson, points are simply represented by two-element arrays: `[x, y]` is a point at (x, y). An array of points is thus an array of two-element arrays: `[[x1, y1], [x2, y2]]` is an array of two points at (x1, y1) and (x2, y2), respectively.

### Minimum distance `r`
`options.r` basically defines the density of the distribution, but it's also a little more than that. Explaining what it exactly does would lead us too far, though, so check out the article I mentioned above: it explains it well.

### Shape
One of the most important options is the shape that contains the distributions. This option is really powerful with bridson: it not only works with rectangles, it works with any shape you can think of. Let's take a look!

#### Rectangle
The most straightforward shape is a simple rectangle. Begin by specifying the origin of the rectangle in `options.origin`, as a point. I write 'origin' instead of 'top-left corner', because it actually doesn't matter what coordinate system you use, as long you use it consistently.

Then specify either the opposite corner in `options.max` (as a point) or the width and height in `options.width` and `options.height`, respectively (in numbers).

> __Note:__ *`max` takes precedence over `width` and `height`.*

#### Custom shape
If a rectangle dosn"t work for you, you can specify a custom shape. This is achieved with just one options: `isInside`. This should be a function that takes two arguments, `x` and `y`, and returns a boolean indicating whether the point at (x, y) is inside your shape. It's as simple as that.