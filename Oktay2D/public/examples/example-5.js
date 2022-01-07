/*
 * Example 5: Animations with a global transformation matrix being set.
 * 
 * Made by Babah Gee
 */

// Import Oktay2D
import * as Oktay2D from "../../lib/Oktay2D/index.js";

// Create a new scene.
const scene = new Oktay2D.CanvasScene(500, 500, document.body);

// Set the size of the scene to the window size.
scene.SetSize(window.innerWidth, window.innerHeight);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer); // Create a new updater

// Set a tranformation matrix on the main renderer.
renderer.SetGlobalTranformation(1, 0, .3, 1, 0, 0);


// Create graphical nodes.
const infoText = new Oktay2D.TextNode("Click somewhere in the scene to change the size", 10, scene.height - 100, {
	font: "30px Montserrat",
	textColor: "#000",
	shadowBlur: 10,
	shadowOffsetX: -10,
	shadowOffsetY: 10,
	shadowColor: "rgba(0, 0, 0, .1)"
}), // Info text node.
	toast = new Oktay2D.Rectangle(scene.width / 2, 60, 1, 0, {
	backgroundImage: document.querySelector(".zamn"),
	shadowOffsetX: -30,
	shadowOffsetY: 30,
	shadowBlur: 10,
	glowStrength: 10,
	shadowColor: "rgba(0, 0, 0, .1)"
}); // Toast

// Add the two graphical objects to the renderer.
renderer.Add([infoText, toast]);


function startAnimation() {

	// Event when the mouse is pressing any mouse button down.
	scene.On("mouseDown", function (mouse, self) {

		// Get the distance between the center of the scene, and the x- and y coordinates of the mouse.
		const distance = Oktay2D.Math.GetDistance(scene.width / 2, scene.height / 2, mouse.x, mouse.y);

		// Animate a single integer which is one number from 0 to the calculated distance. Animate it using the 'easeOutElastic' animation with a duration of one second.
		Oktay2D.AnimateSingleInteger(0, distance, 1000, "easeOutElastic", function (size) {

			// Change the toast size.
			toast.height = size;
			toast.width = size;

			// Simple calculation to keep everything in the center.
			toast.y = scene.height / 2 - (size / 2)
			toast.x = scene.width / 2 - (size / 2)
		});

	});


	// Animate each 6 seconds.
	setInterval(function () {

		// Animate a single integer which is the rotation angle, from 0 to 360 using the 'easeInOutElastic' animation with a duration of 5 seconds.
		Oktay2D.AnimateSingleInteger(0, 360, 5000, "easeInOutElastic", function (angle) {

			// Rotate using the passed angle.
			toast.SetRotation(angle * Math.PI / 180);
		});

	}, 6000);
}

// Start the animation.
startAnimation();

// Event when the updater has been updated.
updater.On("update", function () {

	// Clear the scene, remove this to create a cool copy-paste effect.
	renderer.ClearScene();

});

// Start the updater.
updater.Update();