/*
 * Example 4: Projecting a 3D perspective in a 2D simulation using tranform matrixes.
 * 
 * Made by Babah Gee
*/

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(500, 500, document.body);

scene.SetSize(window.innerWidth, window.innerHeight);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

scene.canvas.style.background = "rgb(21 27 26)";

const renderer = new Oktay2D.Renderer(scene, { willReadFrequently: true }),
	updater = new Oktay2D.SceneUpdater(renderer),
	camera = new Oktay2D.Camera(renderer, scene),
	squares = [];

renderer.SetGlobalTranformation(1, 0, 1, 1, 0, 0);

/**@type {Oktay2D.ColorNode} */
let backgroundColorNode;

function createBackground() {

	backgroundColorNode = new Oktay2D.ColorNode([197, 250, 236]);

	const background = new Oktay2D.Rectangle(0, 0, scene.width, scene.height, {
		backgroundColor: backgroundColorNode,
		shadowOffsetY: 150,
		shadowBlur: 0,
		glowStrength: 50,
		shadowColor: "#222b29",
		globalCompositeOperation: "lighten"
	});

	renderer.Add(background);

	const text = new Oktay2D.TextNode("Yoooo! What the dawg doing?", scene.width / 2 - 200, scene.height / 2, {
		textColor: "#000",
		font: "50px Montserrat",
		shadowOffsetY: 10,
		shadowColor: "rgba(0, 0, 0, .5)",
		shadowBlur: 2,
	});

	renderer.Add(text);
	
	const squareCount = 100;

	for (var i = 0; i < squareCount; i++) {

		const x = Oktay2D.Math.RandomBetween(0, scene.width),
			y = Oktay2D.Math.RandomBetween(0, scene.height),
			size = Oktay2D.Math.RandomBetween(0, 60),
			shadowOffset = Oktay2D.Math.RandomBetween(5, 60);

		const rect = new Oktay2D.Rectangle(x, y, size, size, {
			backgroundColor: Oktay2D.ColorNode.Random("rgb"),
			borderWidth: 2,
			shadowBlur: 2 + (5 / 60 * shadowOffset),
			shadowOffsetX: -shadowOffset,
			shadowOffsetY: shadowOffset,
			shadowColor: `rgba(0, 0, 0, ${(40 / 60 * size) / 100})`
		});

		rect.speed = Oktay2D.Math.RandomBetween(10, 100);

		squares.push(rect);

		renderer.Add(rect);
    }

}

createBackground();


updater.On("update", function (deltaTime) {

	renderer.ClearScene();

	camera.x = (scene.width / 2) - scene.mouse.x;
	camera.y = (scene.height / 2) - scene.mouse.y;

	const green = backgroundColorNode.green > 0 ? backgroundColorNode.green - 1 : 255;

	backgroundColorNode.SetColor([backgroundColorNode.red, green, backgroundColorNode.blue]);

	squares.forEach(function (rect) {

		rect.y += rect.speed / 100 * deltaTime;

		if (rect.y > scene.height) rect.y = -rect.height;

	});

	renderer.Render();
});

updater.Update();
