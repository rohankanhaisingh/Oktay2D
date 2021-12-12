# Rectangle

```ts
class Rectangle extends RenderObject;
```

Creates a graphical rectangle. 

- - - 


## Arguments

Creating a ``Rectangle`` instance requires 5 arguments, ``x``, ``y``, ``width``, ``height`` and ``style``.

- ``x``: The x-axis coordinate of the rectangle's starting point.
- ``y``: The y-axis coordinate of the rectangle's starting point.
- ``width``: The rectangle's width. Positive values are to the right, and negative to the left.
- ``height``: The rectangle's height. Positive values are down, and negative are up.
- ``style``: Rectangle styles, making it look cool ??.

### Additional details

```ts
{
    x: number;
    y: number;
    width: number;
    height: number;
    style: {
        backgroundColor: string | ColorNode;
        backgroundImage: Image;
        borderColor: string | ColorNode;
        borderWidth: number;
        shadowOffsetX: number;
        shadowOffsetY: number;
        shadowColor: string | ColorNode;
        shadowBlur: number;
        opacity: number;
    }
}
```

## Methods

Public methods that comes with the ``Rectangle`` instance.


### ~~Draw(ctx, deltaTime);~~

```ts
void Draw(ctx: CanvasRenderingsContext2D, deltaTime: number);
```

Unnecessary method to call manualy. This method will be called automatically when a ``RenderObject`` instance has been created
and you are calling the ``Render()`` method of any ``Renderer`` instance, where this instance has been applied to.

### SetTransformation(..args);

```ts
Rectangle: SetTransform(
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


### SetRotation(angle);

```ts
Rectangle: SetRotation(angle: number);
```

Sets a rotation angle on shape. This method requires **one** argument which has to be a ``number``.

-``angle``: The rotation angle, clockwise in radians. You can use ``degree * Math.PI / 180`` to calculate a radian from a degree.

## Properties

- ``x``: Position on x-axis.
- ``y``: Position on y-axis.
- ``width``: Rectangle width.
- ``height``: Rectangle height.
- ``style``: Rectangle visual styles.

### Additional details

```ts
style: {
    backgroundColor: string | ColorNode;
    backgroundImage: Image;
    borderColor: string | ColorNode;
    borderWidth: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowColor: string | ColorNode;
    shadowBlur: number;
    opacity: number;
}
```

## Examples

### Example 1: Create a simple rectangle

```js
import * as Oktay2D from "path_to_lib_here";

// Make sure to have everything ready to draw. If not, read the documentation on how you can setup your environment.

...

// Create a rectangle and set a red background color.
const MyEpicRectangle = new Oktay2D.Rectangle(20, 20, 55, 30, {
    backgroundColor: "red"
});


// Render the rectangle.
MyRenderer.Render(MyEpicRectangle);
```

### Example 2: Create a rectangle and render it in a loop.

```js
import * as Oktay2D from "path_to_lib_here";

// Make sure to have everything ready to draw. If not, read the documentation on how you can setup your environment.

...

// Create a scene updater, a function that will call it's update method each every possible frame.
const Updater = new Oktay2D.SceneUpdater(MyScene);

// Create a rectangle and set a red background color.
const MyEpicRectangle = new Oktay2D.Rectangle(20, 20, 55, 30, {
    backgroundColor: "red"
});

// Add the rectangle to an existing renderer.
MyRenderer.Add(MyEpicRectangle);

// Event that will be fired if the updater got updated.
Updater.On("update", function() {

    // Render all applied RenderObject instances.
    MyRenderer.Render();

});
```

### Example 3: Set a transformation on a rectangle.

```js
import * as Oktay2D from "path_to_lib_here";

// Make sure to have everything ready to draw. If not, read the documentation on how you can setup your environment.

...

// Create a rectangle and set a red background color.
const MyEpicRectangle = new Oktay2D.Rectangle(20, 20, 55, 30, {
    backgroundColor: "red"
});

// Skew and translate the rectangle.
MyEpicRectangle.SetTransform(1, .5, .8, 1, 0, 0);

// Render the rectangle.
MyRenderer.Render(MyEpicRectangle);
```

### Example 4: Set a rotation angle on a rectangle.

```js
import * as Oktay2D from "path_to_lib_here";

// Make sure to have everything ready to draw. If not, read the documentation on how you can setup your environment.

...

// Create a rectangle and set a red background color.
const MyEpicRectangle = new Oktay2D.Rectangle(20, 20, 55, 30, {
    backgroundColor: "red"
});

const Degree = 90;

// Rotate the rectangle 90 degrees.
MyEpicRectangle.SetRotation(Degree * Math.PI / 180);

// Render the rectangle.
MyRenderer.Render(MyEpicRectangle);
```