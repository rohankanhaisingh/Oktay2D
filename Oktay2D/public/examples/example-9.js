/*
 * Example 9: Spritesheet animations.
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
	mainSpritesheet = document.querySelector(".obunga-running-sprite");


const sprites = await Oktay2D.CutImageToSprites(mainSpritesheet, 25, 1),
	animator = new Oktay2D.SpritesheetAnimator(sprites);

// Creating animations from the cut sprites.
const walkingToRight = animator.CreateAnimation("walking-to-right", 0, 1, 11, 0),
	walkingToLeft = animator.CreateAnimation("waking-to-left", 0, 12, 11, 0),
	standingStill = animator.CreateAnimation("standing-still", 0, 0, 1, 0);

// Create the player.
const player = new Oktay2D.Rectangle(scene.width / 2, scene.height / 2, sprites.frameWidth, sprites.frameHeight, {
	backgroundImage: standingStill
});

// Add the player to the renderer.
renderer.Add(player);


// Custom physics controller.
let yVelocity = 0;

function updatePhysics(dt) {

	if (player.x > scene.width) player.x = -player.width;
	if (player.x < -player.width) player.x = scene.width;

	if (player.y < scene.height - player.height) {
		yVelocity += 1 * dt;

	} else {
		if (!Oktay2D.activeKeys.w) {
			yVelocity = 0;
			player.y = scene.height - player.height;
        }
    }

	player.y += yVelocity * dt;
}

// Function to update player movement.
function updatePlayerMovement(dt) {

	// If user is pressing the 'd' key.
	if (Oktay2D.activeKeys.d) {
		player.style.backgroundImage = walkingToRight;

		player.x += 10 * dt;
	}

	// If user is pressing the 'a' key.
	if (Oktay2D.activeKeys.a) {
		player.style.backgroundImage = walkingToLeft;

		player.x -= 10 * dt;
    }

	if (Oktay2D.activeKeys.w) {
		yVelocity = -15 * dt;
	}

	if ((!Oktay2D.activeKeys.a && !Oktay2D.activeKeys.d) || (Oktay2D.activeKeys.a && Oktay2D.activeKeys.d)) player.style.backgroundImage = standingStill;
}

Oktay2D.AnimateSingleInteger(0, scene.width / 2, 2000, "easeOutElastic", function (x) {
	player.x = x;
});

updater.On("update", function (deltaTime) {

	// Clear the scene to avoid visual glitches.
	renderer.ClearScene();

	updatePlayerMovement(deltaTime);
	updatePhysics(deltaTime);
});


updater.Update();