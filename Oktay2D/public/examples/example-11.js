/*
 * Uhhhhh more advanced sprites 
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

// scene.canvas.style.display = "none";


async function createSpace() {

	let start = Date.now();

	const star = await Oktay2D.LoadImageSync("resources/4018480489.png"),
		spaceWallpaper = await Oktay2D.LoadImageSync("resources/Space Background.png");


	const starsprites = await Oktay2D.CutEntireImageToSprites(star, 15, 15);

	console.log(starsprites);

	const background = new Oktay2D.Rectangle(0, 0, 1920, 1080, {
		backgroundImage: spaceWallpaper
	});

	const rect = new Oktay2D.Rectangle(20, 20, 450, 450, {
		backgroundImage: new Oktay2D.SpritesheetAnimationController(starsprites.frames, starsprites.framesLength, 1),
		imageSmoothingEnabled: false
	});



	renderer.Add([background, rect]);
}


await createSpace();

updater.On("update", function (deltaTime) {

	// Clear the scene to avoid visual glitches.
	renderer.ClearScene();

});


updater.Update();
