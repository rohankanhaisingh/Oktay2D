import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer);

Oktay2D.SetFlag("new-canvas-2d-api");


const triangle = new Oktay2D.IsoscelesTriangle(scene.width / 2, scene.height / 2, 20, 60, {
	backgroundColor: Oktay2D.Color.Random("rgb"),
	shadowBlur: 10,
	shadowColor: "auto"
});

renderer.Add(triangle);


updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;


});

updater.Update(Date.now);