---
title: "No Save behavior"
category: behaviors
url: "https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/no-save"
lang: en
lastScraped: "2026-03-16T05:27:28.963Z"
---
# No Save behavior

# No Save behavior

The No Save behavior simply causes the object to be omitted from save states when using the Save and Load system actions.

Normally all objects are saved and loaded with these actions. Adding the No Save behavior will skip saving any data for the object when saving, and will not affect the object when loading. After a load, all the same objects that were there before the load are still present, and with the same properties.

It is a good idea to add the No Save behavior to objects which don't need to be saved, like scenery and background objects. It can also be used on automatically updated objects, like interface elements and text objects which update their text every tick. This will help make the saves smaller in size, and also complete saving and loading quicker.

For more information see the tutorial How to make savegames.

[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-22
2022-07-18
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Behavior reference
- No save

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 18 Jul, 2022 at 13:47