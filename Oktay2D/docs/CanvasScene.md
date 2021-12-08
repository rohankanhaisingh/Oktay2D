# CanvasScene

```ts
class CanvasScene;
```

Creating a ``CanvasScene`` instance will create a canvas element to draw graphics on. This is required in order to continue
the drawing process.

- - -

## Arguments

When creating a new instance, three arguments are required.

```ts
new CanvasScene(width: number, height: number, domElement: HTMLElement);
```

- ``width``: Width of the canvas element.
- ``height``: height of the canvas element.
- ``domElement``: Parent element.

## Methods

### HandleEvents()

```ts
void HandleEvents();
```

Method that will automatically be called when a new instance of ``CanvasScene`` has been made. No need to re-call that method.

### HandleResizeEvent()

```ts
void HandleResizeEvent();
```

Method that will automatically be called when a new instance of ``CanvasScene`` has been made. No need to re-call that method.

### SetSize(width, height)

```ts
CanvasScene SetSize(width: number, height: number);
```

Calling this method will set the size of the created canvas element. Calling this method requires two arguments which has to be
either a ``number`` or ``null``.

- ``width`` Width of the canvas element. Enter ``null`` to skip this argument.
- ``height`` Width of the canvas element. Enter ``null`` to skip this argument.

This method will return the created ``CanvasScene`` instance.

### SetAttribute(attribute)

```ts
void SetAttribute(attribute: string);
```

Calling this method will set attributes on this instance, leading to change the behavior of the canvas element. This method
requires one argument which can be ``fitToScreen``, ``disableContextMenu`` or ``redrawOnResize``.

- ``fitToScreen`` Will set the size of the canvas element to the current window. Will also make an event listener on the window when it resizes, changing the size as well.
- ``disableContextMenu`` Will disallow users to open their context menu on the element.
- ``redrawOnResize`` Will redraw all ``RenderObject`` instances when the window resizes.

## Properties

- ``width`` Canvas width.
- ``height`` Canvas height.
- ``domElement`` Canvas parent element.
- ``attributes`` Attributes.
- ``mouse`` Object with mouse positions.
- ``canvas`` Created canvas element.

### Additional details

Possible attributes.
```ts
attributes: Array<"fitToScreen", "disableContextMenu", "redrawOnResize">
```

Mouse object properties.
```ts
mouse: {
    x: number,
    y: number
}
```

## Examples

### Example 1: Create a new scene.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);
```

### Example 2: Create a new scene and change the size.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

// Will change the size from 300 x 300, to 600 x 600.
Scene.SetSize(600, 600);
```

### Example 3: Create a new scene with attributes.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

Scene.SetAttribute("fitToScreen"); // Will set the to the window size.
Scene.SetAttribute("disableContextMenu"); // Will disable the context menu.
Scene.SetAttribute("redrawOnResize"); // Will redraw when window resized.
```