---
title: "Persist behavior"
category: behaviors
url: "https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/persist"
lang: en
lastScraped: "2026-03-16T05:27:30.938Z"
---
# Persist behavior

# Persist behavior

The Persist behavior makes the object remember its state when going to a different layout, then coming back. If a layout has objects with the Persist behavior, it is also referred to as a persistent layout. For an interactive example of its use, click here to open the Persistent Layouts example.

Normally if you leave a layout then come back, all non-global objects reset to their initial design in the Layout View. However for many games this is undesirable; powerups come back, enemies respawn and return to full health, and so on. Adding the Persist behavior to certain objects means that they are restored to the same state you left them in when returning to a layout. Any objects that were previously destroyed remain destroyed; any new objects that were created will come back; and all properties such as instance variables are remembered. This is important for allowing the user to return to previous areas without having to redo the whole section.

[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-21
2022-07-18
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Behavior reference
- Persist

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 18 Jul, 2022 at 15:02