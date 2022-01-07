/*
 *  Creating an unique circle using shaped rectangles.
 * 
 *  Made by Babah Gee
 */

import * as Oktay2D from "../../lib/Oktay2D/index.js";

const scene = new Oktay2D.CanvasScene(500, 500, document.body);

scene.SetSize(window.innerWidth, window.innerHeight);

scene.SetAttribute("fitToScreen");
scene.SetAttribute("disableContextMenu");

const renderer = new Oktay2D.Renderer(scene, { willReadFrequently: true }),
	updater = new Oktay2D.SceneUpdater(renderer),
	squares = new Array();


const fps = new Oktay2D.TextNode("fps", 10, 10, {
	textColor: "#000"
});

renderer.Add(fps);

async function create() {

	for (var i = 0; i < 360; i++) {


		const r = new Oktay2D.Rectangle(scene.width / 2, scene.height / 2, 100, 200, {
			backgroundColor: Oktay2D.ColorNode.Random("rgb"),
			opacity: 0,
			shadowBlur: 10
		});

		r.SetTransform(1, .2, .8, 1, 0, 0);
		r.SetRotation(i / 180 * Math.PI);

		renderer.Add(r);

		squares.push(r);

		await Oktay2D.WaitFor(5);
	}

}

updater.On("update", function () {

	renderer.ClearScene();

	fps.text = updater.fps;

	squares.forEach(function (r) {

		if (r.style.opacity < 1) r.style.opacity += .1;

	});

	renderer.Render();
});

updater.Update();

await create();