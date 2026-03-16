---
title: "Drag & Drop behavior"
category: behaviors
url: "https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/drag-drop"
lang: en
lastScraped: "2026-03-16T06:08:51.806Z"
---
# Drag & Drop behavior

# Drag & Drop behavior

The Drag & Drop behavior enables objects to be dragged and dropped either by mouse or touch. On multi-touch devices, multiple objects can be dragged and dropped at once.

An object starts dragging when a mouse click or touch falls inside the object's collision polygon. It is released when the mouse button is released or the touch ends.

### Scripting

When using JavaScript or TypeScript coding, the features of this behavior can be accessed via the IDragDropBehaviorInstance script interface.

[]()

## Drag & Drop properties

Axes
Optionally axis-limit the movement, for example only allowing the object to be dragged horizontally or vertically. The default is
*Both*
, allowing the object to be dragged anywhere.
Enabled
Whether the behavior is initially enabled or disabled. If disabled, it can be enabled at runtime using the
*Set enabled*
action.
[]()

## Drag & Drop conditions

Is dragging
True if the object is currently being dragged by mouse or touch.
Is enabled
True if the behavior is currently enabled; false if disabled by the
*Set enabled*
action.
On drag start
Triggered when the object is clicked or touched inside its collision polygon.
On drop
Triggered when the object is being dragged, and the mouse button is released or the touch ends.
[]()

## Drag & Drop actions

Set enabled
Enable or disable the Drag & Drop behavior. If disabled, clicking or touching the object has no effect and the object cannot be dragged. It also becomes 'transparent' to clicks and touches, meaning other objects underneath it can still be dragged and dropped. If the object is being dragged when it is disabled, the drag is cancelled, but
*On drop*
will not trigger.
Set axes
Set the
*Axes*
property, allowing changing which axes movement is limited to.
Drop
Stop dragging the object if it is currently being dragged. This also triggers
*On drop*
.
[]()

## Drag & Drop expressions

The Drag & Drop behavior has no expressions.

[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-21
2024-02-16
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Behavior reference
- Drag & Drop

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 16 Feb, 2024 at 16:26