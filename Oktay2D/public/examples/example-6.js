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
	physicsController = new Oktay2D.PhysicsController(scene, renderer);

physicsController.globalGravityForce = 0;


function createScene() {

	const ground = new Oktay2D.Rectangle(0, scene.height - 50, scene.width * 2, 50, {
		backgroundColor: "#000"
	});

	renderer.Add(ground);
	physicsController.Add(ground);

	ground.physics.static = true;
	ground.physics.movable = false;


	// Generate rects
	for (let i = 0; i < 120; i++) {

		const x = Oktay2D.Math.RandomBetween(0, scene.width),
			y = Oktay2D.Math.RandomBetween(0, 700),
			size = 50;

		const rect = new Oktay2D.Rectangle(x, y, size, size, {
			borderColor: "red"
		});

		renderer.Add(rect);
		physicsController.Add(rect);

		rect.physics.movable = true;
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

		mainRect.x = mouse.x - (mainRect.width / 2);
		mainRect.y = mouse.y - (mainRect.height / 2);

	});
}


createScene();
createPlayer();


// Event when the updater has been updated.
updater.On("update", function (deltaTime) {

	// Clear the scene, remove this to create a cool copy-paste effect.
	renderer.ClearScene();

	physicsController.Update(deltaTime);
});

// Start the updater.
updater.Update();