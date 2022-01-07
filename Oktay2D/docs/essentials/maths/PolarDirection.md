# Polar direction

```ts
PolarDirection();
```

Giving you the direction from a position to another position, in a angled way. 

This function returns an object within the calculated x and y direction (``directionX``, ``directionY``) and also some methods.

_Last edited: 07-01-2022_

## Arguments

This function requires four arguments, which all has to be a ``number``;

```ts
PolarDirection(x1: number, y1: number, x2: number, y2: number);
```

- ``x1``: Start x position.
- ``y1``: Start y position.
- ``x2``: End x position.
- ``y2``: End y position.

## Methods

### ``normalize()``

This methods will normalize both direction values to a number fixed to 2 digits after the comma. Returns an object
with the changed directional values.

### ``complete()``

This method will complete both directional values to a full integer. Returns an object with the two changed directional values,

### ``addlength(length)``

This method will multiply both directional values by the given paramater. Requires one argument which has to be a number.
Returns an object with the two changed directional values.