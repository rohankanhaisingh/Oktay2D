/*
 * Example 10: Dynamic audio.
 * 
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";


const scene = new Oktay2D.CanvasScene(500, 500, document.body);

// Set the size of the scene to the window size.
scene.SetSize(window.innerWidth, window.innerHeight);

// Set attributes.
scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");


// Prevent new render objects being added to the global array.
Oktay2D.RenderObject.AddToGlobalArray = false;

const renderer = new Oktay2D.Renderer(scene), // Create a new renderer.
	updater = new Oktay2D.SceneUpdater(renderer), // Creates a new scene updater.
	camera = new Oktay2D.Camera(renderer, scene); // Creates a new camera.

// All possible audio sources.
const audioSources = ["big fart.mp3"];

// Creates a new empty dynamic audio controller.
const dynamicAudioController = new Oktay2D.DynamicAudioController(null);

dynamicAudioController.masterVolume = 1;

// Define the length of wanted tracks. For now, it's 5, but you can change it to whatever you want!
const trackLength = 21;

for (let i = 0; i < trackLength; i++) {

	const x = Oktay2D.Math.RandomBetween(0, scene.width), // Define a random x coordinate.
		y = Oktay2D.Math.RandomBetween(0, scene.height), // Define a random y coordinate.
		audioSource = "resources/audio/" + audioSources[Oktay2D.Math.RandomBetween(0, audioSources.length - 1)], // Select a random audio source from the array with sources.
		volumeRange = Oktay2D.Math.RandomBetween(100, 200); // Define a random volume range.

	// Creates a new dynamic media element track on the dynamic audio controller, with the defined arguments being passed.
	const audioTrack = dynamicAudioController.CreateDynamicMediaElementTrack(audioSource, x, y, volumeRange);

	audioTrack.On("ended", function () {

		dynamicAudioController.Destroy(audioTrack);

	});

	audioTrack.autoplay = true;
	audioTrack.loop = false;

	// Create a 'audio block' to represent the coordinates of each audio track.
	const audioBlock = new Oktay2D.Rectangle(x, y, 20, 20, {
		backgroundColor: Oktay2D.Color.Random("rgb"),
		glowStrength: 30
	});

	// Add the graphical element to the renderer.
	renderer.Add(audioBlock);
}

const mainRect = new Oktay2D.Rectangle(0, 0, 30, 30, {
	borderColor: "red"
});

renderer.Add(mainRect);
dynamicAudioController.LockToObject(mainRect);


scene.On("mouseMove", function (mouse) {

	mainRect.x = mouse.x;
	mainRect.y = mouse.y;

});

updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	document.querySelector(".gui-fps").innerText = "Frame rate: " + updater.fps + "FPS";
	document.querySelector(".gui-campos").innerText = "Camera position (normal): \n" + `x: ${camera.x}, y: ${camera.y}`;
	document.querySelector(".gui-campos_center").innerText = "Camera position (center): \n" + `x: ${camera.x + (scene.width / 2)}, y: ${camera.y + (scene.height / 2)}`;
	document.querySelector(".gui-mouse_pos").innerText = "Mouse position: \n" + `x: ${scene.mouse.x}, y: ${scene.mouse.y}`;


	dynamicAudioController.Update();

});

updater.Update();