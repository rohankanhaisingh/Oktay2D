# TextNode

```ts
class TextNode extends RenderObject
```

A graphical element displaying text with a lot of styling possibilities.

_Last edited 31-01-2022_

- - -

## Arguments


- ``text``: A string that will be displayed.
- ``x``: Starting x coordinate.
- ``y``: Starting y coordinate.
- ``style``: Possible styles.

### Additional details

All available style attributes.

```ts
{
    textColor: string | Color;
    borderColor: string | Color;
    font: string;
    textAlign: "start" | "end" | "left" | "right" | "center";
    textBaseline: "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
    direction: "ltr" | "rtl" | "inherit";
    opacity: number;
    shadowColor: string | Color;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeColor: string;
}
```

## Methods

### ``SetTransform(...matrix);``

```ts
SetTransform(
    horizontalScaling: number
    verticalSkewing: number
    horizontalSkewing: number
    verticalScaling: number 
    horizontalTranslation: number
    verticalTranslation: number
);
```

Will set a matrix transform on the shape. This method requires 6 arguments, that has to be **all** a number.

- ``horizontalScaling``: Horizontal scaling. A value of '1' results in no scaling.
- ``verticalSkewing``: Vertical skewing.
- ``horizontalSkewing``: Horizontal skewing.
- ``verticalScaling``: Vertical scaling. A value of '1' results in no scaling.
- ``horizontalTranslation``: Horizontal translation.
- ``verticalTranslation``: etical translation.

### ``SetRotation(angle)``;

```ts
SetRotation(angle: number);
```

Sets a rotation angle on shape. This method requires **one** argument which has to be a ``number``.

-``angle``: The rotation angle, clockwise in radians. You can use ``degree * Math.PI / 180`` to calculate a radian from a degree.

## Properties

### ``x``

```ts
number: x;
```

Starting x coordinate.

### ``y``

```ts
number: y;
```

Starting y coordinate.


### ``style``

```ts
object: style;
```

All styles.


### ``width``

```ts
number: width;
```

Text node width.

### ``height``

```ts
number: height;
```

Text node height.

### ``rotation``

```ts
number: rotation;
```

Graphical element rotation in angle.

### ``transformation``

```ts
number: transformation;
```

Graphical element transform matrix.