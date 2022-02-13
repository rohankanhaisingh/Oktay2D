/**
 * Example 8: Drawing!!!!
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
	updater = new Oktay2D.SceneUpdater(renderer),
	camera = new Oktay2D.Camera(renderer, scene);

// HTML elements.
const FPSMeter = document.querySelector(".gui-fpsmeter");


function drawRainbow() {

	const lineWidth = 15;

	for (let i = 0; i < 25; i++) {

		const rainbow = new Oktay2D.QuadraticCurve(i * lineWidth, scene.height, [], {
			lineColor: Oktay2D.Color.Random("rgb"),
			lineWidth: lineWidth,
		});

		rainbow.CreatePoint(scene.width / 2, i * lineWidth, i * lineWidth, i * lineWidth);
		rainbow.CreatePoint(scene.width - (i * lineWidth), scene.height, scene.width + (i * 10),i * lineWidth);

		renderer.Add(rainbow);

    }
}

drawRainbow();


updater.On("update", function (deltaTime) {

	renderer.ClearScene();



	FPSMeter.innerHTML = `${updater.fps}FPS`;

});

updater.Update();