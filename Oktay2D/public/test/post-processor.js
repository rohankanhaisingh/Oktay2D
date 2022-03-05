import * as Oktay2D from "../../lib/Oktay2D/index.js";

Oktay2D.SetFlag("new-canvas-2d-api");

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer),
	postProcessor = new Oktay2D.PostProcessor(renderer, scene);


for (var i = 0; i < 120; i++) {

	const x = Oktay2D.Math.RandomBetween(0, scene.width),
		y = Oktay2D.Math.RandomBetween(0, scene.height);

	const t = new Oktay2D.IsoscelesTriangle(x, y, Oktay2D.Math.RandomBetween(2, 40), 0, {
		backgroundColor: Oktay2D.Color.Random("rgb"),
		shadowColor: "auto",
		shadowBlur: 10
	});

	renderer.Add(t);


}

updater.On("update", function (deltaTime) {

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;

	// postProcessor.Brightness(brightness);
});

updater.Update(Date.now());