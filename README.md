# Oktay2D

### A 2D graphics library for the web, made by Babah Gee

- - -

Oktay2D is a graphics library made with Javascript to draw simple graphics on the web. This library has all the benefits 
you need to draw graphics.

The name 'Oktay2D' has been chosen because a friend of mine his name is Oktay, so that's why I named this library to 'Oktay2D'.

Good story, I know right.

- - - 

## Usage

Since this library is dynamic, you have to **import** it into your script.

```js
import * as Oktay2D from "./Oktay2D/index.js";

// Start writing code here.

...
```

## Quick setup.

```js
import * as Oktay2D from "./Oktay2D/index.js";

// Create a scene to draw on.
const Scene = new Oktay2D.Scene(window.innerWidth, window.innerHeight);

// Set attributes on scene.
Scene.SetAttribute("fitToScreen");
Scene.SetAttribute("disableContextMenu");


// Create a renderer.
const Renderer = new Oktay2D.Renderer(Scene, {
	// Options goes here.
});


// Create a text node.
const MyText = new Oktay2D.TextNode("Yooo! It's a vibe check!", 50, 50, {
	// Styles goes here.

	textColor: new Oktay2D.ColorNode("#ffffff"),
	font: "30px Arial"
});


Renderer.Render(MyText);  