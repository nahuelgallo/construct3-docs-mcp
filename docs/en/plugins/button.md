---
title: "Button"
category: plugins
url: "https://www.construct.net/en/make-games/manuals/construct-3/plugin-reference/button"
lang: en
lastScraped: "2026-03-16T05:26:15.675Z"
---
# Button

# Button

The Button object creates a button control which the user can click to perform an action. It can also be set to be a checkbox.

### Scripting

When using JavaScript or TypeScript coding, the features of this object can be accessed via the IButtonInstance script interface.

[]()

## Layering HTML objects

This object displays using a HTML element rather than drawing in to the canvas. This means its layering works differently to other objects. To learn more about how to layer HTML objects, see HTML layers.

[]()

## Styling buttons

As Button objects are HTML elements, their appearance can be customised using CSS (Cascading Style Sheets). The ID and Class properties can be used to identify the HTML element, and a CSS project file added to apply some styles to it.

[]()

## Button properties

Type
Either
*Button*
for a push-button or
*Checkbox*
for a checked/unchecked control.
Text
The text appearing on the button face or checkbox label.
Tooltip
A tooltip that appears in most browsers if the user hovers the mouse over the button and waits. Leave blank for no tooltip.
Initially visibile
Whether or not the button is shown on startup. If Invisible, the button must be shown with the Set visible action.
Enabled
Whether the button is initially enabled. If disabled, the button will be greyed out and cannot be pushed.
Auto font size
Automatically set the font-size property of the element according to the layout and layer scale. This will prevent the font-size CSS property being manually set with the
*Set CSS style*
action. Disable if you intend to use
*Set CSS style*
to adjust the
*font-size*
property.
Checked
If
*Type*
is
*Checkbox*
, this is the initial check state of the control.
ID
Optional
An optional
*id*
attribute for the element in the DOM (Document Object Model). This can be useful for CSS styling.
Class
Optional
An optional
*class*
attribute for the element in the DOM (Document Object Model). This can be useful for CSS styling.
[]()

## Button conditions

See common conditions for features shared between form control objects.

Is checked
If
*Type*
is
*Checkbox*
, is true if the control is currently checked.
On clicked
Triggered when the user pushes the button or checks/unchecks the control, either by keyboard, mouse or touch input.
[]()

## Button actions

See common actions for features shared between form control objects.

Set checked
If
*Type*
is
*Checkbox*
, set the current check state of the control.
Set text
Set the text on the button face.
Set tooltip
Set the text that appears for the button tooltip. Leave blank for no tooltip.
Toggle checked
If
*Type*
is
*Checkbox*
, toggles the check state of the control.
[]()

## Button expressions

The Button object does not have any of its own expressions.

[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-23
2024-02-16
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Plugin reference
- Button

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 16 Feb, 2024 at 14:23