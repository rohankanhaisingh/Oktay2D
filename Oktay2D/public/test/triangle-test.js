import * as Oktay2D from "../../lib/Oktay2D/index.js";

Oktay2D.SetFlag("new-canvas-2d-api");



const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene),
	updater = new Oktay2D.SceneUpdater(renderer);

// renderer.SetGlobalTranformation(1, 0, 1, 1, 0, 0);


const triangles = [];

async function createTriangleWithAnimation() {


	for (let i = 0; i < 320; i++) {

		const x = Oktay2D.Math.RandomBetween(0, scene.width),
			y = Oktay2D.Math.RandomBetween(0, scene.height),
			size = Oktay2D.Math.RandomBetween(1, 20);
		
		const triangle = new Oktay2D.IsoscelesTriangle(x, y, size, size, {
			backgroundColor: Oktay2D.Color.Random("rgb"),
			shadowBlur: 10,
			shadowColor: "auto",
			globalCompositeOperation: "lighten"
		});


		triangle.target = {
			x: Oktay2D.Math.RandomBetween(-scene.width, scene.width),
			y: Oktay2D.Math.RandomBetween(-scene.height, scene.height)
		};


		Oktay2D.AnimateSingleInteger(0, size, 2000, "easeOutElastic", function (s) {

			triangle.size = s;
			triangle.style.opacity = 1 / size * s;

		});

		Oktay2D.AnimateSingleInteger(0, Oktay2D.Math.CalculateAngle(triangle.x, triangle.y, triangle.target.x, triangle.target.y), 2000, "easeInOutElastic", function (r) {
			triangle.SetRotation((90 + r) * Math.PI / 180);
		}).On("end", function () {

			triangle.active = true;
            
		});

		renderer.Add(triangle);

		triangles.push(triangle);

		await Oktay2D.WaitFor(100);
	}


}


updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;

	triangles.forEach(function (triangle) {

		const direction = Oktay2D.Math.PolarDirection(triangle.x, triangle.y, triangle.target.x, triangle.target.y).addLength(2);

		if (triangle.active) {

			triangle.x += direction.directionX * deltaTime;
			triangle.y += direction.directionY * deltaTime;

        }
	});

});

updater.Update(Date.now);

await createTriangleWithAnimation();