import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer);

Oktay2D.SetFlag("new-canvas-2d-api")

function createCircles() {

    for (var i = 0; i < 10; i++) {


		const x = Oktay2D.Math.RandomBetween(0, scene.width),
			y = Oktay2D.Math.RandomBetween(0, scene.height),
			size = Oktay2D.Math.RandomBetween(25, 100);

		const gradient = renderer.CreateRadialGradient(0, 0, size / 4, 0, 0, size, [
			{
				offset: 0,
				color: Oktay2D.Color.Random("rgb")
			},
			{
				offset: 1,
				color: Oktay2D.Color.Random("rgb")
			}
		]);


		const circle = new Oktay2D.Circle(x, y, size, 0, 2 * Math.PI, {
			borderColor: gradient,
			borderWidth: Oktay2D.Math.RandomBetween(5, 60)
		});

		circle.SetRotation(-90 * Math.PI / 180);

		renderer.Add(circle);

		Oktay2D.AnimateSingleInteger(0, 2, Oktay2D.Math.RandomBetween(100, 4000), "easeInOutExpo", function (end) {

			circle.endAngle = end * Math.PI;
		});

    }
}

function createFlash() {

	const flash = new Oktay2D.Circle(scene.width / 2, scene.height / 2, 100, 0, 2 * Math.PI, {
		backgroundColor: renderer.CreateRadialGradient(0, 0, 0, 0, 0, 100, [{ offset: 0, color: "#000" }, { offset: 1, color: "rgba(0, 0, 0, 0)" }]),
	});

	renderer.Add(flash);

	scene.On("mouseMove", function (mouse) {

		flash.x = mouse.x;
		flash.y = mouse.y;

	});
}

createCircles();
createFlash();

updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;


});

updater.Update(Date.now);