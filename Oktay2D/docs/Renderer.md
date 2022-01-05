# Renderer

```ts
class Renderer;
```

Creating a ``Renderer`` instance will allow you to draw graphics. 

_Last edited: 05-01-2022_
- - - 

## Arguments

When creating a new instance, one argument is required and one is optional.

```ts
new Renderer(scene: CanvasScene, attributes: object)
```

- ``scene`` Scene to draw graphics on.
- ``attributes`` Optional CanvasRenderingContext2D attributes.

```ts
{
    willReadFrequently: boolean // Allowing the canvas to read pixel data frequently, will optimise renderer.
}
```

## Methods

### ``SetBackgroundColor(color)``

```ts
Renderer: SetBackgroundColor(color: string);
```

Calling this method will set a background color, which requires one argument that has to be a ``string``.

- ``color``: Provided color.

Calling this method will return the created ``Renderer`` instance.

### ``Render(renderObject)``

```ts
Renderer: Render(renderObject: RenderObject);
```

Calling this method will render a specific ``RenderObject`` instance, which requires one argument that has to be a
``RenderObject`` instance. 

**Note:** Leaving the parameter empty will render all ``RenderObject`` instances added to the created ``Renderer`` instance.

- ``renderObject``: ``RenderObject`` instance that will be created when creating graphical nodes.

Calling this method will return the created ``Renderer`` instance.

### ``ClearScene()``

```ts
void ClearScene();
```

Calling this method will clear the entire scene, can be used in animation frames.


### ``Add(renderObject)``

```ts
Renderer: Add(renderObject: RenderObject | Array)
```

Calling this method will add a ``RenderObject`` instance to the array of renderObjects in the created ``Renderer`` instance.
This will give developers the ability to render objects from specific renderers.

This method requires one argument that has to be either a ``RenderObject`` or an array with ``RenderObject`` instances in it.

- ``renderObject``: ``RenderObject`` instance or an array with ``RenderObject`` instances in it.

Calling this method will return the created ``Renderer`` instance.

### ``SetGlobalTransformation(..args)``

```ts
Rectangle: SetGlobalTransformation(
    horizontalScaling: number
    verticalSkewing: number
    horizontalSkewing: number
    verticalScaling: number 
    horizontalTranslation: number
    verticalTranslation: number
);
```

Will set a global matrix transformation. This method requires 6 arguments, that has to be **all** a number.

- ``horizontalScaling``: Horizontal scaling. A value of '1' results in no scaling.
- ``verticalSkewing``: Vertical skewing.
- ``horizontalSkewing``: Horizontal skewing.
- ``verticalScaling``: Vertical scaling. A value of '1' results in no scaling.
- ``horizontalTranslation``: Horizontal translation.
- ``verticalTranslation``: etical translation.


## Properties
- ``scene``: Applied ``CanvasScene`` instance.
- ``attributes``: Attributes.
- ``renderObjects``: Array with ``RenderObject`` instances stored.
- ``ctx``: CanvasRenderingContext2D.
- ``camera``: Camera instance if one has been applied.

### Additional details

Possible attributes.
```ts
{
    willReadFrequently: boolean
}
```

## Examples

### Example 1: Creating a new instance.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

// Creating a new Renderer instance that will read pixeldata frequently.
const Renderer = new Oktay2D.Renderer(Scene, {
    willReadFrequently: true
});
```

### Example 2: Creating a new instance and setting a background

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

// Creating a new Renderer instance that will read pixeldata frequently.
const Renderer = new Oktay2D.Renderer(Scene, {
    willReadFrequently: true
});

// Will make the background red.
Renderer.SetBackgroundColor("red");
```

### Example 2: Creating a new instance and add a RenderObject.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

// Creating a new Renderer instance that will read pixeldata frequently.
const Renderer = new Oktay2D.Renderer(Scene, {
    willReadFrequently: true
});

// Creating a new rectangle. See the documentation for 'Rectangle' in 'Shapes' for more info.
const Rect = new Oktay2D.Rectangle(10, 30, 10, 10, {
    backgroundColor: "#000",
});

// Adding the rectangle to the Renderer.
Renderer.Add(Rect);
```

### Example 3: Creating a new instance, add a RenderObject and render it.

```js
import * as Oktay2D from "path_to_lib_here";

// Will create a canvas element in the body.
const Scene = new Oktay2D.Scene(300, 300, document.body);

// Creating a new Renderer instance that will read pixeldata frequently.
const Renderer = new Oktay2D.Renderer(Scene, {
    willReadFrequently: true
});

// Creating a new rectangle. See the documentation for 'Rectangle' in 'Shapes' for more info.
const Rect = new Oktay2D.Rectangle(10, 30, 10, 10, {
    backgroundColor: "#000",
});

// Adding the rectangle to the Renderer.
Renderer.Add(Rect);


Renderer.Render(Rect); // Render the object.
Renderer.Render(); // Render all added objects.
```