/**
 * Example 12: Post processing
 * 
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

scene.canvas.style.filter = "url(#turbulence)";


for (var i = 0; i < 22; i++) {

	const x = Oktay2D.Math.RandomBetween(0, scene.width),
		y = Oktay2D.Math.RandomBetween(0, scene.height),
		size = Oktay2D.Math.RandomBetween(10, 100);

	const obamaRenderObject = new Oktay2D.Rectangle(x, y, size, size, {
		backgroundColor: Oktay2D.Color.Random("rgb"),
		glowStrength: 100,
		shadowBlur: 10,
		shadowColor: "#fff"
	});

	renderer.Add(obamaRenderObject);

}


scene.On("mouseDown", function () {

	Oktay2D.AnimateSingleInteger(0, 10, 1000, "easeOutElastic", function (deviation) {

		const filterElement = document.querySelector("#turbulence feTurbulence");

		const d = deviation / 1000;

		filterElement.setAttribute("baseFrequency", d);

	});

});


updater.On("update", function (deltaTime) {

	// Clear the scene to avoid visual glitches.
	renderer.ClearScene();


	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;


});


updater.Update();
