import * as Oktay2D from "../../lib/Oktay2D/index.js";

Oktay2D.SetFlag("new-canvas-2d-api");



const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");


Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer),
	camera = new Oktay2D.Camera(renderer, scene);

camera.offscreenRendering = false;

camera.width = scene.width / 2;

const t = new Oktay2D.IsoscelesTriangle(20, 20, 40, 0, {
	backgroundColor: "red"
});

renderer.Add(t);

scene.On("mouseMove", function (mouse) {

	t.x = mouse.x;
	t.y = mouse.y;

});


updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;

	camera.ProjectCamera();
});

updater.Update(Date.now());