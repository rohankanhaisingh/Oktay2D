/**
 * Example 8: Custom plugins
 * 
*/

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(500, 500, document.body);

// Set the size of the scene to the window size.
scene.SetSize(window.innerWidth, window.innerHeight);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer);


updater.Update();