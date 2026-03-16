---
title: "Jump-thru behavior"
category: behaviors
url: "https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/jump-thru"
lang: en
lastScraped: "2026-03-16T06:08:29.703Z"
---
# Jump-thru behavior

# Jump-thru behavior

The Jump-thru behavior allows the Platform behavior to stand on the object, and jump on to it from underneath. This differs from the Solid behavior, which the Platform behavior can stand on, but not jump on to from underneath. The image below illustrates the difference.

Note the Jump-thru behavior does not support slopes. Any slopes in your game should use the Solid behavior instead.

[](https://construct-static.com/images/v1740/uploads/articleuploadobject/0/images/976/jumpthru-solid.png)
Jump-thru vs. Solid behaviors

### Scripting

When using JavaScript or TypeScript coding, the features of this behavior can be accessed via the IJumpthruBehaviorInstance script interface.

[]()

## Jump-thru properties

Enabled
Set whether the behavior is initially enabled or disabled. If disabled, the object no longer acts as if it is a Jump-thru, and the Platform behavior will always fall through it.
[]()

## Jump-thru conditions

Is enabled
True if the behavior is currently enabled. This can be changed by the
*Enabled*
property or the
*Set enabled*
action.
[]()

## Jump-thru actions

Set enabled
Enable or disable the Jump-thru behavior for this object.
[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-22
2024-02-16
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Behavior reference
- Jump-thru

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 16 Feb, 2024 at 16:28