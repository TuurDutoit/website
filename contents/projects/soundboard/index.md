---
title: Soundboard
template: article.jade
intro: An app and remote control for the soundboard at ISW
---

## The soundboard
At ISW, a small club for students applied computer science, we have a networked soundboard, which plays various sounds in the room when triggered through a REST API. I made both an mobile app, and a remote control for this soundboard.

## The app
The app is a pretty simple React Native app (so it's cross-platform), that retrieves a list of sounds from the soundboard and displays this in a list. When you tap a sound's name, it sends an HTTP request to the soundboard. It also supports folders, allowing to group related sounds, and has a search function for quickly finding your favorites.

## The remote
I must admit, someone started this project a little while before me. They made a sort of box, with 12 buttons on top, welding resistors between them, and installing an CarPC RC JoyCon controller to detect pushed buttons. This uses the resistance on the circuit to determine which button(s) is pressed, and maskerades as a USB keyboard, producing key up/down events. Using `pynput`, I wrote a small script, running on a Raspberry Pi in the box, that listens for these key presses and reacts by sending requests to the soundboard.

This was my first project really working with hardware and electronics, so that was pretty interesting and fun!