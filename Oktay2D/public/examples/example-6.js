/**
 * 
 * Example 6: Working with the physics controller.
 * 
 * By Babah Gee
 * 
*/

import * as Oktay2D from "../../lib/Oktay2D/index.js";

// Create a new scene.
const scene = new Oktay2D.CanvasScene(500, 500, document.body);

// Set the size of the scene to the window size.
scene.SetSize(window.innerWidth, window.innerHeight);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer), // Create a new updater
	camera = new Oktay2D.Camera(renderer, scene),
	physicsController = new Oktay2D.PhysicsController(scene, renderer); // Create a new physics controller

physicsController.globalGravityForce = 0;
physicsController.updateOnCameraMovement = true;

camera.offscreenRendering = false;


function createScene() {

	const ground = new Oktay2D.Rectangle(0, scene.height - 120, scene.width * 25, 120, {
		backgroundColor: "#000"
	});

	renderer.Add(ground);
	physicsController.Add(ground);

	ground.physics.static = true;
	ground.physics.movable = false;


	// Generate rects
	for (let i = 0; i < 3000; i++) {

		const x = Oktay2D.Math.RandomBetween(0, scene.width * 55),
			y = Oktay2D.Math.RandomBetween(0, 700),
			size = Oktay2D.Math.RandomBetween(20, 100);

		const rect = new Oktay2D.Rectangle(x, y, size, size, {
			backgroundColor: Oktay2D.Color.Random("rgb"),
			shadowColor: "rgba(0, 0, 0, .3)",
			globalCompositeOperation: "color"
		});

		renderer.Add(rect);
		physicsController.Add(rect);
	}

}


function createPlayer() {

	const mainRect = new Oktay2D.Rectangle(19, 40, 60, 60, {
		borderColor: "blue"
	});

	renderer.Add(mainRect);
	physicsController.Add(mainRect);

	mainRect.physics.movable = false;

	scene.On("mouseMove", function (mouse) {

		
		mainRect.x = (mouse.x - (mainRect.width / 2)) - camera.x * camera.scaleX;
		mainRect.y = (mouse.y - (mainRect.height / 2)) - camera.y * camera.scaleY;

	});
}

scene.On("mouseWheel", function (mouse, self) {

	Oktay2D.AnimateSingleInteger(0, 1, 500, "easeOutCirc", function (scale) {

		
		if (mouse.wheelDirection === "down") {

			camera.scaleX -= scale / 100;
			camera.scaleY -= scale / 100;

		}

		if (mouse.wheelDirection === "up") {

			camera.scaleX += scale / 100;
			camera.scaleY += scale / 100;


		}

	});

});

createScene();
createPlayer();


// Event when the updater has been updated.
updater.On("update", function (deltaTime) {

	// Clear the scene, remove this to create a cool copy-paste effect.
	renderer.ClearScene();

	const centerX = scene.width / 2,
		centerY = scene.height / 2;

	const distance = Oktay2D.Math.GetDistance(centerX, centerY, scene.mouse.x, scene.mouse.y),
		fixedDistance = 20 / (scene.width / 2) * distance;

	if (scene.mouse.x >= centerX) {
		camera.x -= fixedDistance * deltaTime;
	} else {
		camera.x += fixedDistance * deltaTime;
    }

	physicsController.Update(deltaTime);
});

// Start the updater.
updater.Update();