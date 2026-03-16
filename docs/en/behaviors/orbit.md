---
title: "Orbit behavior"
category: behaviors
url: "https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/orbit"
lang: en
lastScraped: "2026-03-16T05:27:22.872Z"
---
# Orbit behavior

# Orbit behavior

The Orbit behavior moves an object in a circle or ellipse around a point. The object's initial position is used as the point to orbit around.

### Scripting

When using JavaScript or TypeScript coding, the features of this behavior can be accessed via the IOrbitBehaviorInstance script interface.

[]()

## Orbit properties

Speed
The speed to orbit at, in degrees per second. Positive is clockwise and negative is anticlockwise.
Acceleration
The rate of change to the orbit speed, in degrees per second per second. Positive will accelerate in a clockwise direction and negative will accelerate in an anticlockwise direction.
Primary radius
The distance of the orbit from its center point, in pixels. For a circular orbit, ensure the primary and secondary radii are the same. For elliptical orbits, the primary radius is the one in the direction of the offset angle.
Secondary radius
The perpendicular distance of the orbit from its center point, in pixels. For a circular orbit, ensure the primary and secondary radii are the same. For elliptical orbits, the secondary radius is the one perpendicular to the offset angle.
Offset angle
For elliptical orbits, the rotation of the ellipse in degrees. For circular orbits, this does not affect the orbit path (since rotating a circle has no effect), but it changes the initial angle the orbit starts from.
Match rotation
If enabled, sets the object's angle to match the direction of travel in the orbit. If disabled the behavior only changes the object's position without affecting the angle.
Enabled
Whether the behavior is initially enabled or disabled. If disabled, it can be enabled at runtime using the
*Set enabled*
action.
Preview
Paid plans only
Enable to run a preview of the behavior directly in the Layout View.
[]()

## Orbit conditions

Is enabled
Test if the behavior is currently enabled.
[]()

## Orbit actions

Pin
Unpin
Set another object as the location to orbit around, following the object if it moves. The
*Unpin*
action will stop following the object.
Set acceleration
Set enabled
Set match rotation
Set offset angle
Set radius
Set speed
Set the corresponding behavior properties. See
*Orbit properties*
above.
Set rotation
Set the current orbit position by its angle from the center point in degrees.
Set target
Set the center point of the orbit in layout co-ordinates.
Reset total rotation
Sets the counters for the TotalRotation and AbsoluteTotalRotation to 0
[]()

## Orbit expressions

Acceleration
OffsetAngle
PrimaryRadius
SecondaryRadius
Speed
Return the corresponding behavior properties. See
*Orbit properties*
above.
DistanceToTarget
Return the distance from the object to the center point of the orbit, in pixels.
Rotation
Return the current position of the orbit as its rotation relative to the center point in degrees.
TargetX
TargetY
Return the current center point of the orbit in layout co-ordinates.
TotalRotation
Return the total rotation of the instance in degrees. This value does not wrap at 360 degrees. If the instance is rotating counter-clockwise then the value will decrease over time. This counter can be cleared using the
*Reset total rotation*
action.
TotalAbsoluteRotation
Return the total rotation of the instance in degrees, ignoring rotation direction. This expression is very similar to the
*TotalRotation*
expression, but rotation deltas are converted to absolute values. This means the counter will always increase even if the instance is rotating counter-clockwise. This counter can be cleared using the
*Reset total rotation*
action.
[Construct 3 Manual](https://www.construct.net/en/make-games/manuals/construct-3)
Construct.net
2019-03-18
2024-02-16
![image]

#### You are here:

- Online Manuals
- Construct 3 Documentation
- Behavior reference
- Orbit

#### Search this manual:

![Search this manual]
[Community Help](/en/forum)
[Contact Us](/en/contact)
This manual entry was last updated on 16 Feb, 2024 at 16:30