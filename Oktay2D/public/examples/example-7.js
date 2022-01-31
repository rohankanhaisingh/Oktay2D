/**
 * Example 7: Playing with particle systems.
 * 
 * Each particle system has a different effect. Tweak with the arguments to change the effects.
 * 
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

// Create a new scene
const scene = new Oktay2D.CanvasScene(window.innerWidth, window.innerHeight, document.body);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

// Prevent render objects being added to the global array with render objects.
Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer), // Create and intialize a new updater.
	camera = new Oktay2D.Camera(renderer, scene); // Create and intialize a camera.

// Disable offscreen rendering.
camera.offscreenRendering = false;

// HTML elements.
const FPSMeter = document.querySelector(".gui-fpsmeter");

// ========= Particle system 1 =========
function createParticleSystem1() {

	// Create a new particle system at 1/4 of the scene it's width and the center of the scene it's height.
	const particleSystem = new Oktay2D.ParticleSystem((scene.width / 4) * 1, scene.height / 2, 10, 10);

	// Epic title displaying the effect of the particle system.
	const title = new Oktay2D.TextNode("KINETIC ENERGY", (scene.width / 4) * 1, 320, {
		font: "30px Montserrat",
		textColor: "#000",
		textAlign: "center"
	});

	// Emit particles to an angle.
	particleSystem.EmitParticlesToAngle(50, { x: 0, y: 1 }, 360, 2000, 1, {

		// Can use the same styles as for circles.

		borderColor: Oktay2D.Color.Random("rgb"),
		borderWidth: 5,

		radius: 50,
		fadeOutOnLifeTime: true
	});

	// Add the graphical elements to the renderer.
	renderer.Add([title, particleSystem]);

}


// ========= Particle system 2 =========
function createParticleSystem2() {

	// Object with options.
	const particleSystemOptions = {

		// Amount of particles being emitted.
		amount: 80,

		// Particle image source.
		imageSource: document.querySelector(".particle-cloud"),

		// Random particle image size between 20 and 40
		imageSize: { min: 50, max: 120 },

		// Particle styles, with a random rotation in radians.
		imageStyle: {
			rotation: { min: 0, max: 360 },
			globalCompositeOperation: "xor",
		},

		// Particle animation style.
		particleAnimationType: "pulse",

		// Set the animation duration of each particle.
		particleAnimationDuration: 440,

		// Set a random speed for each particle.
		particleAnimationSpeed: 3,

		// Particle effects on life time.
		particleLifeTimeEffects: {

			// Change the opacity during the liftime of each particle.
			changeOpacityOnLifeTime: {
				from: 1,
				to: 0
			},

			// Changes the velocity on life time, giving it a easing effect.
			changeVelocityOnLifeTime: {
				value: 0,
				speed: .05
			}
		},

		// Loop the particle system.
		loop: false
    }

	// Create a particle system.
	const particleSystem = new Oktay2D.ParticleSystem((scene.width / 4) * 2, scene.height / 2, 10, 10);

	// Create an epic title.
	const title = new Oktay2D.TextNode("EXPLOSION", (scene.width / 4) * 2, 320, {
		font: "30px Montserrat",
		textColor: "#000",
		textAlign: "center"
	});

	// Emit the particles.
	particleSystem.EmitParticlesAsImage(particleSystemOptions);

	// Event when the mouse pressed any mouse button down.
	scene.On("mouseDown", function (mouse, self) {

		// Remove the 'shake' class name from the scene canvas.
		if (scene.canvas.classList.contains("shake")) scene.canvas.classList.remove("shake");

		// Add the 'shake' class on delay to prevent bugs.
		setTimeout(function () {
			scene.canvas.classList.add("shake");
		}, 30);

		// Set the x and y coordinates of the particle system, on the coordinates of the mouse.
		particleSystem.x = mouse.x;
		particleSystem.y = mouse.y;

		// Emit the particles.
		particleSystem.EmitParticlesAsImage(particleSystemOptions);
	});

	// Add the graphical elements to the renderer.
	renderer.Add([particleSystem, title]);
}



// Create the particle systems.
createParticleSystem1();
createParticleSystem2();

updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	FPSMeter.innerHTML = `${updater.fps}FPS`;

});

updater.Update();