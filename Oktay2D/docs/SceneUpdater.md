# SceneUpdater

```ts
class SceneUpdater;
```

A ``SceneUpdater`` instance allows you to call a specific function in a animation loop. With this, you don't 
have to make a animation frame loop function by yourself. It has all the benifits you need to animate.

_Last edited: 05-01-2022_

- - -

## Arguments

When creating an instance, you will have to enter one argument which is required. 

```ts
new SceneUpdater(renderer: Renderer);
```

- ``renderer``: A ``Renderer`` instance.

## Properties

### ``id``

An unique generated ID specifically for each instance. Can be useful when you have a lot of instances made.

### ``renderer``

The ``Renderer`` instances you passed as argument when creating an instance.

### ``fps``

FPS or frapes per seconds the scene is running on. Speaks for itself.

### ``deltaTime``

Calculated delta time between frames. Can be really useful when you want smooth linear animations.

### ``events``

An object with all the public events stored.

### ``perfrectFrameRate``

Perfect frame rate to be steady on. Default is 60; the lower, the slower, the higher the faster. Can be changed.

## Methods

### ``Update()``

Will start the animation loop, can be fired once though. 
This method does not require any arguments, all it will do is give itself a kick start.

### ``On(event, callback)``

Event listener on instance, requires two arguments which has to be a string and a function.

- ``event``: String to determinate which event you want to listen for.
- ``callback``: Function when the provided event has been fired.

See down below for all available events.


## Events

### ``update``

```js
On("update", deltaTime => {});
```

Event which will be fired when the updater has been updated. Will pass the delta time through, allowing developers
to create linear constant animations.

## Examples

### Example 1: Create keep rendering a scene.

```js
import * as Oktay2D from "path_to_lib";

// Create a new scene.
const Scene = new Oktay2D.CanvasScene(500, 500, document.body),
    Renderer = new Oktay2D.Renderer(Scene);

// Initialize the updater and attach it to the renderer.
const SceneUpdater = new Oktay2D.SceneUpdater(Renderer);

...

// Start the scene updater by calling it each animation frame.
// ALl render objects applied to the render will be rendered automatically. 
SceneUpdater.Updater(); 
```

### Example 2: Move a ``RenderObject`` based on the delta (accurate) time.

```js
import * as Oktay2D from "path_to_lib";

// Create a new scene.
const Scene = new Oktay2D.CanvasScene(500, 500, document.body),
    Renderer = new Oktay2D.Renderer(Scene);

// Initialize the updater and attach it to the renderer.
const SceneUpdater = new Oktay2D.SceneUpdater(Renderer);

...

const MoveSpeed = 10;

SceneUpdater.On("update", function(DeltaTime) {

    // This will update the rectangle accurate, no matter what the frame rate is.
    MyRectangle.x += MoveSpeed * DeltaTime;
});

SceneUpdater.Updater(); 
```