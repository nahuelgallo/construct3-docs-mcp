---
title: "The Z Order Bar"
category: interface
url: "https://www.construct.net/en/make-games/manuals/construct-3/interface/bars/z-order-bar"
lang: en
lastScraped: "2026-03-16T06:10:23.882Z"
---
# The Z Order Bar

# The Z Order Bar

Paid plans only The Z Order Bar allows precise control over which objects appear in front of others. Although Construct is a 2D engine, the term Z order is used to refer to the display order of each individual object.

[](https://construct-static.com/images/v1740/uploads/articleuploadobject/0/images/878/z-order-bar.png)
The Z Order Bar

To open the Z Order Bar, either right click in the Layout View and select Z Order►Open Z Order bar..., or tick the check at Menu►View►Bars►Z Order.

[]()

## The Z Order list

Instances are listed in the Z Order bar in front-to-back order, i.e. instances at the top of the list appear at the front, and instances at the bottom of the list appear at the back. Instances are grouped by the layer they belong to.

If no objects are selected, the Z Order Bar displays all instances in the layout. If some instances are selected in the Layout View, the list is filtered down to only those instances and any other instances overlapping them. This makes it convenient to see the relative Z order of a small area without having to take in to account the rest of the layout.

[]()

## Identifying instances

With lots of the same instances in the list, it can sometimes be difficult to tell precisely where a particular instance occurs in the list. To help identify each instance, its UID (unique identifier) appears after its name, e.g. Player 41 (meaning a Player instance with UID 41).

Instances in the list which were selected in the Layout View are also selected in the Z Order bar. Selecting instances from the Z Order Bar itself will also select objects in the Layout View and show their properties, but will not affect the filtering of the list.

Sprite objects which have a different initial image set by changing the Initial frame or Initial animation properties also display an icon for that initial image in the Z Order list.

Instances can be double-clicked to make them flash briefly in the Layout View. Alternatively an instance can be right-clicked and then Flash this instance selected. This helps visually identify the instance in the layout.

The context menu also has the option Scroll selection into view, which will make the Layout View change it's scrolling to show all the selected instances.

[]()

## Editing the Z Order

To move an object in the Z Order - adjusting which other objects it appears in front or behind - drag and drop it in the list. You can also move objects to other layers this way. You can also select multiple objects by holding Control or Shift and drag them all as a block to another layer or location in the Z Order. When doing this, the relative order of the selection is also preserved.

If you want to add, remove or reorder layers themselves, use the Layers Bar instead.

[]()

## View options

You can right-click the Z Order Bar and select Show active layer only. This further filters down the list to only display objects on the current active layer (the selected layer in the Layers Bar), which can be useful when working with a single layer.

[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2017-08-11
2024-09-24
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Interface
- Bars
- Z Order Bar

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 24 Sep, 2024 at 10:35